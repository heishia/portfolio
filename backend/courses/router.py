from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from core.database import get_db
from courses.service import get_courses, get_course_by_id
from courses.schemas import CourseListResponse, CourseDetailResponse

router = APIRouter(prefix="/courses", tags=["courses"])


@router.get("", response_model=List[CourseListResponse])
def list_courses(db: Session = Depends(get_db)) -> List[CourseListResponse]:
    return get_courses(db)


@router.get("/{course_id}", response_model=CourseDetailResponse)
def get_course(
    course_id: int,
    db: Session = Depends(get_db)
) -> CourseDetailResponse:
    return get_course_by_id(db, course_id)

