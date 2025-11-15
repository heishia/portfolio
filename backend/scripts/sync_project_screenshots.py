"""

뒤에 숫자 붙여서 하기!! 

프로젝트 스크린샷 자동 동기화 스크립트

Supabase Storage의 screenshots 버킷에서 특정 프로젝트 폴더의 이미지들을 가져와서
데이터베이스의 프로젝트 테이블에 자동으로 업데이트합니다.

사용법:
    python -m scripts.sync_project_screenshots <project_number>
    
예시:
    python -m scripts.sync_project_screenshots 1  # project1 폴더의 이미지를 priority=1인 프로젝트에 업데이트
    python -m scripts.sync_project_screenshots 2  # project2 폴더의 이미지를 priority=2인 프로젝트에 업데이트
"""
import sys
import os
from pathlib import Path

# 프로젝트 루트를 Python 경로에 추가
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from sqlalchemy.orm import Session
from core.database import SessionLocal
from core.storage import get_storage_images
from projects.service import get_project_by_priority, update_project_screenshots
from core.logger import logger


def sync_project_screenshots(project_number: int, bucket: str = "screenshots") -> bool:
    """
    특정 프로젝트 번호에 해당하는 Storage 폴더의 이미지를 데이터베이스에 동기화
    
    Args:
        project_number: 프로젝트 번호 (1, 2, 3...)
        bucket: Storage 버킷 이름 (기본값: "screenshots")
    
    Returns:
        성공 여부
    """
    db: Session = SessionLocal()
    
    try:
        # 1. Storage에서 이미지 URL 리스트 가져오기
        folder_name = f"project{project_number}"
        logger.info(f"Storage에서 '{folder_name}' 폴더의 이미지를 가져오는 중...")
        logger.info(f"버킷: {bucket}, 폴더: {folder_name}")
        
        image_urls = get_storage_images(bucket, folder_name)
        
        # 디버깅: 응답 확인
        if not image_urls:
            logger.warning("⚠️ 이미지 URL이 비어있습니다. 다음을 확인해주세요:")
            logger.warning("  1. Supabase Storage에 'screenshots' 버킷이 존재하는지")
            logger.warning(f"  2. '{folder_name}/' 폴더에 파일이 있는지")
            logger.warning("  3. 버킷이 Public으로 설정되어 있는지")
            logger.warning("  4. SUPABASE_URL과 SUPABASE_KEY가 올바르게 설정되었는지")
            logger.warning(f"'{folder_name}' 폴더에서 이미지를 찾을 수 없습니다.")
            return False
        
        logger.info(f"총 {len(image_urls)}개의 이미지를 찾았습니다.")
        
        # 2. 데이터베이스에서 해당 priority의 프로젝트 찾기
        logger.info(f"Priority {project_number}인 프로젝트를 찾는 중...")
        project = get_project_by_priority(db, project_number)
        
        if not project:
            logger.error(f"Priority {project_number}인 프로젝트를 데이터베이스에서 찾을 수 없습니다.")
            logger.info("프로젝트를 먼저 생성하고 priority를 설정해주세요.")
            return False
        
        logger.info(f"프로젝트 '{project.title}' (ID: {project.id})를 찾았습니다.")
        
        # 3. 프로젝트의 screenshots 업데이트
        logger.info(f"프로젝트의 screenshots를 업데이트하는 중...")
        updated_project = update_project_screenshots(db, project.id, image_urls)
        
        logger.info(f"✅ 성공! 프로젝트 '{updated_project.title}'의 screenshots가 {len(image_urls)}개로 업데이트되었습니다.")
        
        # 업데이트된 URL 일부 출력
        if image_urls:
            logger.info("업데이트된 이미지 URL (처음 3개):")
            for i, url in enumerate(image_urls[:3], 1):
                logger.info(f"  {i}. {url}")
            if len(image_urls) > 3:
                logger.info(f"  ... 외 {len(image_urls) - 3}개")
        
        return True
    
    except Exception as e:
        logger.error(f"스크린샷 동기화 중 오류 발생: {e}")
        db.rollback()
        return False
    
    finally:
        db.close()


def main():
    """메인 함수"""
    if len(sys.argv) < 2:
        print("사용법: python -m scripts.sync_project_screenshots <project_number>")
        print("예시: python -m scripts.sync_project_screenshots 1")
        sys.exit(1)
    
    try:
        project_number = int(sys.argv[1])
        
        if project_number < 1:
            print("❌ 프로젝트 번호는 1 이상이어야 합니다.")
            sys.exit(1)
        
        print(f"🚀 프로젝트 {project_number}의 스크린샷 동기화를 시작합니다...")
        print("-" * 60)
        
        success = sync_project_screenshots(project_number)
        
        print("-" * 60)
        if success:
            print(f"✅ 프로젝트 {project_number}의 스크린샷 동기화가 완료되었습니다!")
            sys.exit(0)
        else:
            print(f"❌ 프로젝트 {project_number}의 스크린샷 동기화에 실패했습니다.")
            sys.exit(1)
    
    except ValueError:
        print(f"❌ 잘못된 프로젝트 번호입니다: {sys.argv[1]}")
        print("프로젝트 번호는 숫자여야 합니다.")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n⚠️ 사용자에 의해 중단되었습니다.")
        sys.exit(1)
    except Exception as e:
        print(f"❌ 예상치 못한 오류 발생: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()

