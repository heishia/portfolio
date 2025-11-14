from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


class InstructorSchema(BaseModel):
    name: str
    bio: str


class LessonSchema(BaseModel):
    title: str
    duration: str
    isFree: bool = Field(alias="is_free")


class ChapterSchema(BaseModel):
    title: str
    lessons: List[LessonSchema]


class CourseBase(BaseModel):
    type: str
    title: str
    description: Optional[str] = None
    thumbnail: Optional[str] = None
    price: int = 0
    duration: Optional[str] = None
    pages: Optional[int] = None
    chapters: Optional[int] = None
    rating: float = 0.0
    students: int = 0
    level: str


class CourseCreate(CourseBase):
    reviews: int = 0
    instructor_name: str
    instructor_bio: str
    what_you_learn: Optional[List[str]] = None
    curriculum: Optional[List[Dict[str, Any]]] = None
    requirements: Optional[List[str]] = None


class CourseListResponse(BaseModel):
    id: int
    type: str
    title: str
    description: Optional[str] = None
    thumbnail: Optional[str] = None
    price: int
    duration: Optional[str] = None
    pages: Optional[int] = None
    chapters: Optional[int] = None
    rating: float
    students: int
    level: str
    isPurchased: bool = False
    
    class Config:
        from_attributes = True


class CourseDetailResponse(CourseBase):
    id: int
    reviews: int
    instructor: InstructorSchema
    whatYouLearn: List[str] = Field(alias="what_you_learn")
    curriculum: List[Dict[str, Any]]
    requirements: List[str]
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
        populate_by_name = True

