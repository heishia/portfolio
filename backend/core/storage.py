"""
Supabase Storage 유틸리티 모듈
Storage에서 이미지 리스트를 가져오고 Public URL을 생성하는 함수들
"""
from typing import List, Optional
from supabase import create_client, Client
from core.config import settings
from core.logger import logger


def get_supabase_client() -> Optional[Client]:
    """Supabase 클라이언트 생성"""
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        logger.warning("Supabase URL 또는 Key가 설정되지 않았습니다.")
        return None
    
    try:
        client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        return client
    except Exception as e:
        logger.error(f"Supabase 클라이언트 생성 실패: {e}")
        return None


def _build_public_url(supabase_url: str, bucket: str, file_path: str) -> str:
    """
    Supabase Storage Public URL 직접 구성
    
    형식: https://{project_ref}.supabase.co/storage/v1/object/public/{bucket}/{path}
    """
    # supabase_url에서 프로젝트 참조 추출
    # 예: https://abc123.supabase.co -> abc123
    from urllib.parse import urlparse
    parsed = urlparse(supabase_url)
    project_ref = parsed.netloc.replace('.supabase.co', '')
    
    # URL 인코딩된 경로 생성
    from urllib.parse import quote
    encoded_path = quote(file_path, safe='/')
    
    return f"{supabase_url}/storage/v1/object/public/{bucket}/{encoded_path}"


def get_storage_images(
    bucket: str,
    folder: str,
    limit: int = 1000
) -> List[str]:
    """
    Supabase Storage에서 특정 폴더의 이미지 파일 리스트를 가져와서 Public URL 배열로 반환
    
    Args:
        bucket: Storage 버킷 이름 (예: "screenshots")
        folder: 폴더 경로 (예: "project1" 또는 "project1/")
        limit: 가져올 최대 파일 수 (기본값: 1000)
    
    Returns:
        Public URL 문자열 리스트
    """
    client = get_supabase_client()
    if not client:
        logger.error("Supabase 클라이언트를 사용할 수 없습니다.")
        return []
    
    if not settings.SUPABASE_URL:
        logger.error("SUPABASE_URL이 설정되지 않았습니다.")
        return []
    
    try:
        # 폴더 경로 정규화 (끝에 / 추가)
        folder_path = folder if folder.endswith("/") else f"{folder}/"
        
        logger.info(f"Storage 버킷 '{bucket}'의 폴더 '{folder_path}'에서 파일 리스트를 가져오는 중...")
        
        # Storage에서 파일 리스트 가져오기
        storage_api = client.storage.from_(bucket)
        response = storage_api.list(
            folder_path,
            {
                "limit": limit,
                "offset": 0,
            }
        )
        
        logger.debug(f"Storage 응답 타입: {type(response)}, 값: {response}")
        
        if not response:
            logger.warning(f"폴더 '{folder_path}'에서 파일을 찾을 수 없습니다.")
            return []
        
        # response가 리스트인지 확인
        if not isinstance(response, list):
            logger.warning(f"예상과 다른 응답 형식입니다. 타입: {type(response)}")
            # response가 다른 형식일 수 있으므로 확인
            if hasattr(response, '__iter__'):
                response = list(response)
            else:
                return []
        
        logger.info(f"총 {len(response)}개의 항목을 찾았습니다.")
        
        # 파일명으로 Public URL 생성
        image_urls = []
        for idx, file_info in enumerate(response):
            file_name = None
            is_directory = False
            
            # response가 dict인 경우와 객체인 경우 모두 처리
            if isinstance(file_info, dict):
                file_name = file_info.get("name")
                # 디렉토리 체크: id가 None이거나 없으면 디렉토리일 수 있음
                # 또는 metadata가 없으면 디렉토리일 수 있음
                file_id = file_info.get("id")
                metadata = file_info.get("metadata")
                if file_id is None and metadata is None:
                    is_directory = True
                logger.debug(f"항목 {idx+1}: name={file_name}, id={file_id}, metadata={metadata is not None}")
            elif hasattr(file_info, "name"):
                file_name = file_info.name
                # 객체인 경우도 디렉토리 체크
                if hasattr(file_info, "id"):
                    is_directory = file_info.id is None
                elif hasattr(file_info, "metadata"):
                    is_directory = file_info.metadata is None
                logger.debug(f"항목 {idx+1}: name={file_name}, is_directory={is_directory}")
            else:
                logger.warning(f"항목 {idx+1}: 예상과 다른 형식 - {type(file_info)}, 값: {file_info}")
                continue
            
            if not file_name:
                logger.warning(f"항목 {idx+1}: 파일명을 찾을 수 없습니다.")
                continue
            
            # 디렉토리는 건너뛰기
            if is_directory:
                logger.debug(f"'{file_name}'는 디렉토리이므로 건너뜁니다.")
                continue
            
            # 플레이스홀더 파일 및 특수 파일 제외
            if (file_name.startswith('.') or 
                file_name.endswith('.gitkeep') or 
                '.emptyFolderPlaceholder' in file_name):
                logger.debug(f"'{file_name}'는 플레이스홀더 파일이므로 건너뜁니다.")
                continue
            
            # 이미지 파일 확장자만 허용
            image_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']
            file_name_lower = file_name.lower()
            if not any(file_name_lower.endswith(ext) for ext in image_extensions):
                logger.debug(f"'{file_name}'는 이미지 파일이 아니므로 건너뜁니다.")
                continue
            
            # Public URL 생성 (직접 구성)
            file_path = f"{folder_path}{file_name}"
            try:
                # 방법 1: get_public_url 사용 시도
                public_url_response = storage_api.get_public_url(file_path)
                
                # 다양한 응답 형식 처리
                public_url = None
                if isinstance(public_url_response, dict):
                    if "data" in public_url_response:
                        public_url = public_url_response["data"].get("publicUrl")
                    else:
                        public_url = public_url_response.get("publicUrl")
                elif hasattr(public_url_response, "data"):
                    if hasattr(public_url_response.data, "publicUrl"):
                        public_url = public_url_response.data.publicUrl
                    elif isinstance(public_url_response.data, dict):
                        public_url = public_url_response.data.get("publicUrl")
                elif hasattr(public_url_response, "publicUrl"):
                    public_url = public_url_response.publicUrl
                elif isinstance(public_url_response, str):
                    public_url = public_url_response
                
                # 방법 2: 직접 URL 구성 (방법 1이 실패한 경우)
                if not public_url:
                    public_url = _build_public_url(settings.SUPABASE_URL, bucket, file_path)
                    logger.debug(f"직접 URL 구성: {public_url}")
                
                if public_url:
                    # URL 끝의 불필요한 ? 제거
                    if public_url.endswith('?'):
                        public_url = public_url.rstrip('?')
                    image_urls.append(public_url)
                    logger.debug(f"✅ URL 생성 성공: {public_url}")
                else:
                    logger.warning(f"⚠️ '{file_name}'의 Public URL을 생성할 수 없습니다.")
            except Exception as e:
                # get_public_url 실패 시 직접 URL 구성
                logger.debug(f"get_public_url 실패, 직접 URL 구성 시도: {e}")
                public_url = _build_public_url(settings.SUPABASE_URL, bucket, file_path)
                # URL 끝의 불필요한 ? 제거
                if public_url.endswith('?'):
                    public_url = public_url.rstrip('?')
                image_urls.append(public_url)
                logger.debug(f"✅ 직접 URL 구성 성공: {public_url}")
        
        logger.info(f"폴더 '{folder_path}'에서 {len(image_urls)}개의 이미지를 가져왔습니다.")
        return image_urls
    
    except Exception as e:
        logger.error(f"Storage에서 이미지 가져오기 실패: {e}")
        import traceback
        logger.error(traceback.format_exc())
        return []

