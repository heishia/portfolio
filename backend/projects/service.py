from sqlalchemy.orm import Session
from typing import List, Optional
from core.exceptions import NotFoundException
from core.models import Project
from projects.schemas import ProjectListResponse, ProjectDetailResponse


def get_projects(
    db: Session,
    project_type: Optional[str] = None
) -> List[ProjectListResponse]:
    query = db.query(Project)
    
    if project_type:
        query = query.filter(Project.project_type == project_type)
    
    projects = query.order_by(Project.priority.desc(), Project.created_at.desc()).all()
    
    return [ProjectListResponse.model_validate(project) for project in projects]


def get_project_by_id(
    db: Session,
    project_id: str
) -> ProjectDetailResponse:
    project = db.query(Project).filter(Project.id == project_id).first()
    
    if not project:
        raise NotFoundException("Project", project_id)
    
    return ProjectDetailResponse.model_validate(project)

