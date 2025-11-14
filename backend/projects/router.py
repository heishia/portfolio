from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from core.database import get_db
from projects.service import get_projects, get_project_by_id
from projects.schemas import ProjectListResponse, ProjectDetailResponse

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("", response_model=List[ProjectListResponse])
def list_projects(
    project_type: Optional[str] = Query(None, description="Filter by project type (web, mobile, desktop, fullstack, backend, frontend)"),
    db: Session = Depends(get_db)
) -> List[ProjectListResponse]:
    return get_projects(db, project_type)


@router.get("/{project_id}", response_model=ProjectDetailResponse)
def get_project(
    project_id: str,
    db: Session = Depends(get_db)
) -> ProjectDetailResponse:
    return get_project_by_id(db, project_id)

