"""
RSS 피드 생성 스크립트
API에서 프로젝트 목록을 가져와서 동적으로 RSS feed.xml을 생성합니다.
"""
import os
import sys
from datetime import datetime
from pathlib import Path
from email.utils import formatdate

# 프로젝트 루트 경로 추가
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from core.database import SessionLocal
from core.models import Project

# 기본 URL
BASE_URL = "https://www.kimppop.site"
SITE_TITLE = "바이브코딩 개발자 김뽑희 포트폴리오"
SITE_DESCRIPTION = "바이브코딩 개발자 김뽑희의 포트폴리오. React, Next.js, Python, FastAPI 풀스택 개발 서비스."


def format_rfc822_date(dt):
    """datetime을 RFC 822 형식으로 변환"""
    if dt:
        return formatdate(dt.timestamp())
    return formatdate()


def escape_xml(text):
    """XML 특수 문자 이스케이프"""
    if not text:
        return ""
    return (text
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace('"', "&quot;")
            .replace("'", "&apos;"))


def clean_description(text):
    """RSS description을 위한 텍스트 정리 (HTML 태그 제거)"""
    if not text:
        return ""
    import re
    # HTML 태그 제거
    text = re.sub(r'<[^>]+>', '', text)
    # 여러 공백을 하나로
    text = re.sub(r'\s+', ' ', text)
    # 300자로 제한
    if len(text) > 300:
        text = text[:300] + "..."
    return text.strip()


def generate_rss():
    """RSS XML 생성"""
    now = datetime.now()
    build_date = format_rfc822_date(now)
    
    # RSS 헤더
    rss_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{escape_xml(SITE_TITLE)}</title>
    <link>{BASE_URL}</link>
    <description>{escape_xml(SITE_DESCRIPTION)}</description>
    <language>ko-KR</language>
    <managingEditor>contact@kimppop.site</managingEditor>
    <webMaster>contact@kimppop.site</webMaster>
    <lastBuildDate>{build_date}</lastBuildDate>
    <pubDate>{build_date}</pubDate>
    <ttl>60</ttl>
    <atom:link href="{BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
"""
    
    # 프로젝트 아이템 추가
    try:
        db = SessionLocal()
        projects = db.query(Project).order_by(
            Project.created_at.desc()
        ).limit(20).all()  # 최신 20개 프로젝트만
        
        for project in projects:
            # 프로젝트 상세 페이지 URL
            project_url = f"{BASE_URL}/projects/{project.id}"
            
            # 날짜 처리
            pub_date = project.updated_at if project.updated_at else project.created_at
            pub_date_str = format_rfc822_date(pub_date) if pub_date else build_date
            
            # 설명 생성 (HTML 태그 없이 순수 텍스트)
            description = project.description
            if project.subtitle:
                description = f"{project.subtitle} - {description}"
            
            # 추가 정보 구성
            additional_info = []
            
            # 태그 추가
            if project.tags:
                tags = ", ".join(project.tags[:5])
                additional_info.append(f"태그: {tags}")
            
            # 기술 스택 추가
            if project.technologies:
                tech_list = []
                for tech in project.technologies:
                    if isinstance(tech, dict) and 'items' in tech:
                        tech_list.extend(tech['items'][:3])
                if tech_list:
                    additional_info.append(f"기술 스택: {', '.join(tech_list[:10])}")
            
            # 프로젝트 타입
            type_labels = {
                'web': '웹',
                'mobile': '모바일',
                'desktop': '데스크톱',
                'fullstack': '풀스택',
                'backend': '백엔드',
                'frontend': '프론트엔드'
            }
            type_label = type_labels.get(project.project_type, project.project_type)
            additional_info.append(f"프로젝트 유형: {type_label}")
            
            # 전체 설명 조합 (HTML 없이)
            if additional_info:
                full_description = f"{description}\n\n{chr(10).join(additional_info)}"
            else:
                full_description = description
            
            # description 정리 (HTML 태그 제거, 길이 제한)
            full_description = clean_description(full_description)
            full_description = escape_xml(full_description)
            
            rss_content += f"""    <item>
      <title>{escape_xml(project.title)}</title>
      <link>{project_url}</link>
      <guid isPermaLink="true">{project_url}</guid>
      <description>{full_description}</description>
      <pubDate>{pub_date_str}</pubDate>
      <category>{escape_xml(type_label)}</category>
    </item>
"""
        
        db.close()
    except Exception as e:
        print(f"프로젝트 목록을 가져오는 중 오류 발생: {e}")
        print("프로젝트 없이 RSS 피드를 생성합니다.")
    
    rss_content += """  </channel>
</rss>
"""
    
    return rss_content


def save_rss(content: str, output_path: str = None):
    """RSS 파일 저장"""
    if output_path is None:
        # frontend/public 폴더에 저장
        frontend_dir = Path(__file__).parent.parent.parent / "frontend" / "public"
        output_path = frontend_dir / "feed.xml"
    
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    item_count = content.count("<item>")
    print(f"RSS 피드가 생성되었습니다: {output_path}")
    print(f"총 {item_count}개의 프로젝트가 포함되었습니다.")


if __name__ == "__main__":
    print("RSS 피드 생성 중...")
    rss_content = generate_rss()
    save_rss(rss_content)
    print("완료!")

