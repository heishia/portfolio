"""
사이트맵 생성 스크립트
API에서 프로젝트 목록을 가져와서 동적으로 sitemap.xml을 생성합니다.
"""
import os
import sys
from datetime import datetime
from pathlib import Path

# 프로젝트 루트 경로 추가
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from core.database import get_db, SessionLocal
from core.models import Project

# 기본 URL
BASE_URL = "https://www.kimppop.site"

# 정적 페이지 목록
STATIC_PAGES = [
    {
        "loc": f"{BASE_URL}/",
        "priority": "1.0",
        "changefreq": "weekly"
    },
    {
        "loc": f"{BASE_URL}/about",
        "priority": "0.8",
        "changefreq": "monthly"
    },
    {
        "loc": f"{BASE_URL}/projects",
        "priority": "0.9",
        "changefreq": "weekly"
    },
    {
        "loc": f"{BASE_URL}/services",
        "priority": "0.8",
        "changefreq": "monthly"
    },
    {
        "loc": f"{BASE_URL}/courses",
        "priority": "0.9",
        "changefreq": "weekly"
    },
]


def generate_sitemap():
    """사이트맵 XML 생성"""
    today = datetime.now().strftime("%Y-%m-%d")
    
    # XML 헤더
    xml_content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
"""
    
    # 정적 페이지 추가
    for page in STATIC_PAGES:
        xml_content += f"""  <url>
    <loc>{page['loc']}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{page['changefreq']}</changefreq>
    <priority>{page['priority']}</priority>
  </url>
"""
    
    # 동적 페이지: 프로젝트 상세 페이지
    try:
        db = SessionLocal()
        projects = db.query(Project).order_by(Project.priority.desc(), Project.created_at.desc()).all()
        
        for project in projects:
            # updated_at이 있으면 사용, 없으면 created_at 사용
            lastmod = project.updated_at if project.updated_at else project.created_at
            if lastmod:
                lastmod_str = lastmod.strftime("%Y-%m-%d")
            else:
                lastmod_str = today
            
            xml_content += f"""  <url>
    <loc>{BASE_URL}/projects/{project.id}</loc>
    <lastmod>{lastmod_str}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
"""
        db.close()
    except Exception as e:
        print(f"프로젝트 목록을 가져오는 중 오류 발생: {e}")
        print("정적 페이지만 포함된 사이트맵을 생성합니다.")
    
    # 강의 상세 페이지는 현재 Mock 데이터이므로 주석 처리
    # 추후 강의 API가 구현되면 아래 코드를 활성화하세요
    # try:
    #     courses = get_courses(db, None)
    #     for course in courses:
    #         xml_content += f"""  <url>
    #     <loc>{BASE_URL}/courses/{course.id}</loc>
    #     <lastmod>{today}</lastmod>
    #     <changefreq>monthly</changefreq>
    #     <priority>0.7</priority>
    #   </url>
    # """
    # except Exception as e:
    #     print(f"강의 목록을 가져오는 중 오류 발생: {e}")
    
    xml_content += "</urlset>\n"
    
    return xml_content


def save_sitemap(content: str, output_path: str = None):
    """사이트맵 파일 저장"""
    if output_path is None:
        # frontend/public 폴더에 저장
        frontend_dir = Path(__file__).parent.parent.parent / "frontend" / "public"
        output_path = frontend_dir / "sitemap.xml"
    
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"사이트맵이 생성되었습니다: {output_path}")
    print(f"총 {content.count('<url>')}개의 URL이 포함되었습니다.")


if __name__ == "__main__":
    print("사이트맵 생성 중...")
    sitemap_content = generate_sitemap()
    save_sitemap(sitemap_content)
    print("완료!")

