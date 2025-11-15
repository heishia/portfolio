from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID, uuid4
from core.exceptions import NotFoundException
from core.models import Project
from projects.schemas import ProjectListResponse, ProjectDetailResponse, ProjectCreate
from core.logger import logger


def get_projects(
    db: Session,
    project_type: Optional[str] = None
) -> List[ProjectListResponse]:
    query = db.query(Project)
    
    if project_type:
        query = query.filter(Project.project_type == project_type)
    
    projects = query.order_by(Project.priority.desc(), Project.created_at.desc()).all()
    
    # Convert UUID to string if needed
    result = []
    for project in projects:
        project_dict = {
            k: str(v) if k == 'id' and isinstance(v, UUID) else v
            for k, v in project.__dict__.items() if not k.startswith('_')
        }
        result.append(ProjectListResponse.model_validate(project_dict))
    
    return result


def get_project_by_id(
    db: Session,
    project_id: str
) -> ProjectDetailResponse:
    project = db.query(Project).filter(Project.id == project_id).first()
    
    if not project:
        raise NotFoundException("Project", project_id)
    
    # Convert UUID to string if needed
    project_dict = {
        k: str(v) if k == 'id' and isinstance(v, UUID) else v
        for k, v in project.__dict__.items() if not k.startswith('_')
    }
    return ProjectDetailResponse.model_validate(project_dict)


def update_project_screenshots(
    db: Session,
    project_id: str,
    screenshots: List[str]
) -> ProjectDetailResponse:
    """
    프로젝트의 screenshots 필드를 업데이트
    
    Args:
        db: 데이터베이스 세션
        project_id: 프로젝트 ID
        screenshots: 스크린샷 URL 리스트
    
    Returns:
        업데이트된 프로젝트 정보
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    
    if not project:
        raise NotFoundException("Project", project_id)
    
    project.screenshots = screenshots
    db.commit()
    db.refresh(project)
    
    logger.info(f"프로젝트 '{project.title}' (ID: {project_id})의 screenshots를 {len(screenshots)}개로 업데이트했습니다.")
    
    project_dict = {
        k: str(v) if k == 'id' and isinstance(v, UUID) else v
        for k, v in project.__dict__.items() if not k.startswith('_')
    }
    return ProjectDetailResponse.model_validate(project_dict)


def get_project_by_priority(
    db: Session,
    priority: int
) -> Optional[ProjectDetailResponse]:
    """
    priority로 프로젝트 찾기 (project1=1, project2=2 등)
    
    Args:
        db: 데이터베이스 세션
        priority: 프로젝트 우선순위 (1, 2, 3...)
    
    Returns:
        프로젝트 정보 또는 None
    """
    project = db.query(Project).filter(Project.priority == priority).first()
    
    if not project:
        logger.warning(f"Priority {priority}인 프로젝트를 찾을 수 없습니다.")
        return None
    
    project_dict = {
        k: str(v) if k == 'id' and isinstance(v, UUID) else v
        for k, v in project.__dict__.items() if not k.startswith('_')
    }
    return ProjectDetailResponse.model_validate(project_dict)


def create_project(
    db: Session,
    project_data: ProjectCreate
) -> ProjectDetailResponse:
    """
    새 프로젝트 생성
    
    Args:
        db: 데이터베이스 세션
        project_data: 프로젝트 생성 데이터
    
    Returns:
        생성된 프로젝트 정보
    """
    # UUID 생성
    project_id = str(uuid4())
    
    # Project 모델 생성
    project = Project(
        id=project_id,
        title=project_data.title,
        subtitle=project_data.subtitle,
        description=project_data.description,
        project_type=project_data.project_type,
        app_icon=project_data.app_icon,
        start_date=project_data.start_date,
        end_date=project_data.end_date,
        is_ongoing=project_data.is_ongoing,
        technologies=[tech.model_dump() for tech in project_data.technologies],
        features=[feature.model_dump() for feature in project_data.features],
        code_snippets=[snippet.model_dump() for snippet in (project_data.code_snippets or [])],
        github_url=project_data.github_url,
        demo_url=project_data.demo_url,
        documentation_url=project_data.documentation_url,
        screenshots=project_data.screenshots or [],
        detailed_description=project_data.detailed_description,
        challenges=project_data.challenges,
        achievements=project_data.achievements,
        lines_of_code=project_data.lines_of_code,
        commit_count=project_data.commit_count,
        contributor_count=project_data.contributor_count,
        tags=project_data.tags or [],
        status=project_data.status,
        priority=project_data.priority,
        client=project_data.client
    )
    
    db.add(project)
    db.commit()
    db.refresh(project)
    
    logger.info(f"새 프로젝트 '{project.title}' (ID: {project_id}, Priority: {project.priority})를 생성했습니다.")
    
    project_dict = {
        k: str(v) if k == 'id' and isinstance(v, UUID) else v
        for k, v in project.__dict__.items() if not k.startswith('_')
    }
    return ProjectDetailResponse.model_validate(project_dict)

