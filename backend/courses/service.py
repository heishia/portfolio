from sqlalchemy.orm import Session
from typing import List
from core.exceptions import NotFoundException
from core.models import Course
from courses.schemas import CourseListResponse, CourseDetailResponse


def get_courses(db: Session) -> List[CourseListResponse]:
    courses = db.query(Course).order_by(Course.created_at.desc()).all()
    return [CourseListResponse.model_validate(course) for course in courses]


def get_course_by_id(db: Session, course_id: int) -> CourseDetailResponse:
    course = db.query(Course).filter(Course.id == course_id).first()
    
    if not course:
        raise NotFoundException("Course", str(course_id))
    
    course_dict = {
        **{k: v for k, v in course.__dict__.items() if not k.startswith("_")},
        "instructor": {
            "name": course.instructor_name,
            "bio": course.instructor_bio
        },
        "whatYouLearn": course.what_you_learn or [],
        "curriculum": course.curriculum or [],
        "requirements": course.requirements or []
    }
    
    return CourseDetailResponse.model_validate(course_dict)

