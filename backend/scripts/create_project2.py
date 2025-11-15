"""
프로젝트2 (priority=2) 생성 스크립트
제공된 Bluroutine 프로젝트 데이터를 데이터베이스에 추가합니다.
"""
import sys
import os
from pathlib import Path

# 프로젝트 루트를 Python 경로에 추가
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from sqlalchemy.orm import Session
from datetime import date
from projects.service import create_project
from projects.schemas import ProjectCreate, Technology, Feature, CodeSnippet
from core.database import SessionLocal
from core.logger import logger


def transform_technologies(tech_list: list) -> list:
    """문자열 배열을 Technology 객체 리스트로 변환"""
    # 기술 스택을 카테고리별로 그룹화
    # 간단하게 "기술 스택" 카테고리로 묶음
    if not tech_list:
        return []
    
    return [Technology(category="기술 스택", items=tech_list)]


def transform_features(feature_list: list) -> list:
    """문자열 배열을 Feature 객체 리스트로 변환"""
    if not feature_list:
        return []
    
    features = []
    for feature_str in feature_list:
        # 문자열을 name과 description으로 분리
        # ":" 또는 "-"로 구분된 경우 처리
        if ":" in feature_str:
            parts = feature_str.split(":", 1)
            name = parts[0].strip()
            description = parts[1].strip() if len(parts) > 1 else feature_str
        elif " - " in feature_str:
            parts = feature_str.split(" - ", 1)
            name = parts[0].strip()
            description = parts[1].strip() if len(parts) > 1 else feature_str
        else:
            name = feature_str
            description = feature_str
        
        features.append(Feature(
            name=name,
            description=description,
            category=None
        ))
    
    return features


def transform_code_snippets(snippets: list) -> list:
    """CodeSnippet 리스트를 변환 (description, file_path 필드 확인)"""
    if not snippets:
        return []
    
    transformed = []
    for snippet in snippets:
        # description 필드가 없으면 title을 description으로 사용
        description = snippet.get("description", snippet.get("title", ""))
        # file_path 필드가 없으면 빈 문자열로 설정
        file_path = snippet.get("file_path", "")
        
        transformed.append(CodeSnippet(
            title=snippet.get("title", ""),
            description=description,
            language=snippet.get("language", ""),
            file_path=file_path,
            code=snippet.get("code", "")
        ))
    
    return transformed


def main():
    """프로젝트2 데이터 생성"""
    # 제공된 JSON 데이터
    project_data = {
        "title": "Bluroutine - 루틴 관리 및 집중 시간 추적 앱",
        "subtitle": "일상 루틴을 체계적으로 관리하고 집중 시간을 추적하는 몰입형 생산성 앱",
        "description": "Bluroutine은 사용자가 일상 루틴을 체계적으로 관리하고, 집중 시간을 추적하며, 주간/월간 통계를 통해 자신의 성장을 시각화할 수 있는 풀스택 모바일 애플리케이션입니다. React와 TypeScript로 구축된 현대적인 프론트엔드와 FastAPI 기반의 RESTful 백엔드 API를 통해 안정적인 데이터 관리를 제공합니다.",
        "project_type": "fullstack",
        "app_icon": None,
        "start_date": "2024-01-01",
        "end_date": None,
        "is_ongoing": True,
        "technologies": [
            "React",
            "TypeScript",
            "Vite",
            "Tailwind CSS",
            "Radix UI",
            "React DnD",
            "Capacitor",
            "FastAPI",
            "Python",
            "JWT",
            "Pydantic",
            "Uvicorn",
            "Axios",
            "React Hook Form",
            "Recharts",
            "Lucide React"
        ],
        "features": [
            "사용자 인증 및 회원가입 (JWT 토큰 기반)",
            "루틴 CRUD 관리 (생성, 수정, 삭제, 순서 변경)",
            "드래그 앤 드롭을 통한 루틴 순서 재배치",
            "일일/주간 루틴 완료 상태 추적",
            "주간 진행률 시각화 (WeeklyProgress 컴포넌트)",
            "데이 세션 관리 (집중 시간 추적)",
            "활동(Activity) 관리 및 커스터마이징",
            "통계 페이지 (월별/주간 완료율, 차트 시각화)",
            "캘린더 모달을 통한 날짜 선택",
            "이모지 피커를 통한 루틴 커스터마이징",
            "모바일 최적화 (Capacitor를 통한 Android/iOS 빌드)",
            "반응형 UI (모바일/데스크톱 지원)",
            "실시간 진행률 업데이트",
            "100% 완료 시 축하 메시지 및 시각적 피드백",
            "스플래시 스크린 및 부드러운 페이지 전환"
        ],
        "code_snippets": [
            {
                "title": "루틴 완료 상태 토글",
                "language": "typescript",
                "file_path": "",
                "code": "const handleToggleComplete = useCallback(async (routineId: string) => {\n  const { RoutineProgressService } = await import('./api/routineProgressService');\n  await RoutineProgressService.toggleRoutineProgress({\n    routineId,\n    date: selectedDate\n  });\n}, [selectedDate]);"
            },
            {
                "title": "FastAPI 루틴 생성 엔드포인트",
                "language": "python",
                "file_path": "",
                "code": "@router.post(\"/\", response_model=RoutineResponse)\nasync def create_routine(\n    routine_data: RoutineCreate, \n    current_user: dict = Depends(get_current_user)\n):\n    # 루틴 생성 로직"
            },
            {
                "title": "주간 진행률 계산",
                "language": "typescript",
                "file_path": "",
                "code": "const weekData = useMemo(() => {\n  const completedRoutines = weekProgress.filter(\n    p => p.date === dateString && p.isCompleted\n  ).length;\n  const achievement = totalRoutines === 0 ? 0 : \n    Math.round((completedRoutines / totalRoutines) * 100);\n  return { day, date, dateString, achievement };\n}, [routines.length, routineProgress]);"
            }
        ],
        "github_url": None,
        "demo_url": None,
        "documentation_url": None,
        "screenshots": [],
        "detailed_description": "Bluroutine은 사용자의 일상 루틴을 체계적으로 관리하고 집중 시간을 추적하는 것을 목표로 하는 생산성 애플리케이션입니다.\n\n**주요 기능 상세:**\n\n1. **루틴 관리 시스템**: 사용자는 시간대별(예: '일어나면', '화사')로 루틴을 분류하여 관리할 수 있습니다. 각 루틴은 이모지, 텍스트, 체크박스 옵션을 포함할 수 있으며, 드래그 앤 드롭을 통해 순서를 자유롭게 재배치할 수 있습니다.\n\n2. **진행률 추적**: 일일 및 주간 단위로 루틴 완료 상태를 추적하며, 시각적인 진행률 바와 퍼센트로 사용자에게 명확한 피드백을 제공합니다. 100% 완료 시 축하 메시지와 시각적 효과를 통해 동기부여를 제공합니다.\n\n3. **데이 세션 관리**: 사용자는 하루 동안의 집중 세션을 기록할 수 있습니다. 각 세션은 시작/종료 시간, 활동 유형, 휴식 시간 등을 포함하며, 세트 단위로 관리됩니다.\n\n4. **통계 및 시각화**: Recharts를 활용하여 월별/주간 완료율을 차트로 시각화하며, 사용자의 성장 추이를 한눈에 파악할 수 있습니다.\n\n5. **활동 관리**: 사용자 정의 활동을 생성하고 관리할 수 있으며, 각 활동은 색상으로 구분됩니다.\n\n**기술적 특징:**\n- React 18.3과 TypeScript를 활용한 타입 안전한 프론트엔드\n- FastAPI를 활용한 현대적이고 빠른 백엔드 API\n- JWT 토큰 기반 인증 시스템\n- React DnD를 통한 직관적인 드래그 앤 드롭 인터페이스\n- Capacitor를 통한 크로스 플랫폼 모바일 앱 빌드\n- Radix UI와 Tailwind CSS를 활용한 현대적이고 접근성 높은 UI\n- React Hook Form을 통한 효율적인 폼 관리\n- useMemo와 useCallback을 활용한 성능 최적화",
        "challenges": "1. **복잡한 상태 관리**: 루틴, 진행률, 데이 세션, 활동 등 다양한 상태를 효율적으로 관리하고 동기화하는 것이 주요 도전 과제였습니다. React의 useMemo와 useCallback을 활용하여 불필요한 리렌더링을 최소화했습니다.\n\n2. **드래그 앤 드롭 구현**: 모바일과 데스크톱 환경 모두에서 작동하는 드래그 앤 드롭 기능을 구현하기 위해 React DnD의 HTML5Backend와 TouchBackend를 동적으로 전환하는 로직이 필요했습니다.\n\n3. **실시간 데이터 동기화**: 프론트엔드의 로컬 상태와 백엔드 API 간의 실시간 동기화를 보장하면서도 오프라인 상황에서의 사용자 경험을 유지하는 것이 중요했습니다.\n\n4. **모바일 최적화**: Capacitor를 통한 네이티브 앱 빌드 과정에서 웹뷰와 네이티브 기능 간의 통합, 스플래시 스크린 설정, 상태바 관리 등 다양한 모바일 특화 기능을 구현해야 했습니다.\n\n5. **타입 안전성**: TypeScript를 활용하여 프론트엔드와 백엔드 간의 API 인터페이스를 일관되게 유지하고, Pydantic 모델을 통해 런타임 검증을 보장했습니다.",
        "achievements": "1. **완전한 풀스택 애플리케이션 구축**: 프론트엔드부터 백엔드 API, 데이터베이스 스키마 설계까지 전체 시스템을 성공적으로 구현했습니다.\n\n2. **사용자 경험 최적화**: 직관적인 드래그 앤 드롭 인터페이스, 부드러운 애니메이션, 실시간 피드백을 통해 사용자 친화적인 경험을 제공합니다.\n\n3. **크로스 플랫폼 지원**: 웹, Android, iOS를 모두 지원하는 단일 코드베이스를 구축하여 유지보수성을 높였습니다.\n\n4. **확장 가능한 아키텍처**: 모듈화된 컴포넌트 구조와 서비스 레이어 패턴을 통해 기능 추가와 수정이 용이한 구조를 설계했습니다.\n\n5. **성능 최적화**: React의 최적화 훅(useMemo, useCallback)을 적극 활용하여 불필요한 리렌더링을 방지하고, 효율적인 상태 관리로 빠른 응답 속도를 달성했습니다.\n\n6. **타입 안전성**: TypeScript와 Pydantic을 활용하여 개발 단계에서 오류를 사전에 발견하고, 안정적인 코드베이스를 구축했습니다.\n\n7. **현대적인 UI/UX**: Radix UI와 Tailwind CSS를 활용하여 접근성과 디자인 시스템을 모두 고려한 현대적인 인터페이스를 구현했습니다.",
        "lines_of_code": None,
        "commit_count": None,
        "contributor_count": 1,
        "tags": [
            "루틴관리",
            "생산성",
            "시간추적",
            "모바일앱",
            "React",
            "TypeScript",
            "FastAPI",
            "Python",
            "Capacitor",
            "JWT",
            "드래그앤드롭",
            "통계시각화"
        ],
        "status": "development",
        "priority": 2,
        "client": None
    }
    
    # 데이터 변환
    technologies = transform_technologies(project_data["technologies"])
    features = transform_features(project_data["features"])
    code_snippets = transform_code_snippets(project_data["code_snippets"])
    
    # 날짜 변환
    start_date = date.fromisoformat(project_data["start_date"])
    end_date = date.fromisoformat(project_data["end_date"]) if project_data["end_date"] else None
    
    # ProjectCreate 객체 생성
    project_create = ProjectCreate(
        title=project_data["title"],
        subtitle=project_data["subtitle"],
        description=project_data["description"],
        project_type=project_data["project_type"],
        app_icon=project_data["app_icon"],
        start_date=start_date,
        end_date=end_date,
        is_ongoing=project_data["is_ongoing"],
        technologies=technologies,
        features=features,
        code_snippets=code_snippets,
        github_url=project_data["github_url"],
        demo_url=project_data["demo_url"],
        documentation_url=project_data["documentation_url"],
        screenshots=project_data["screenshots"],
        detailed_description=project_data["detailed_description"],
        challenges=project_data["challenges"],
        achievements=project_data["achievements"],
        lines_of_code=project_data["lines_of_code"],
        commit_count=project_data["commit_count"],
        contributor_count=project_data["contributor_count"],
        tags=project_data["tags"],
        status=project_data["status"],
        priority=project_data["priority"],
        client=project_data["client"]
    )
    
    # 데이터베이스에 추가
    db = SessionLocal()
    try:
        result = create_project(db, project_create)
        logger.info(f"프로젝트2 (priority=2) 생성 완료: {result.title} (ID: {result.id})")
        print(f"✅ 프로젝트2 생성 완료!")
        print(f"   제목: {result.title}")
        print(f"   ID: {result.id}")
        print(f"   Priority: {result.priority}")
    except Exception as e:
        logger.error(f"프로젝트2 생성 실패: {str(e)}")
        print(f"❌ 프로젝트2 생성 실패: {str(e)}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()

