from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime, date


class Technology(BaseModel):
    category: str
    items: List[str]


class Feature(BaseModel):
    name: str
    description: str
    details: Optional[str] = None
    category: Optional[str] = None


class CodeSnippet(BaseModel):
    title: str
    description: str
    language: str
    file_path: str
    code: str


class ProjectBase(BaseModel):
    title: str
    subtitle: Optional[str] = None
    description: str
    project_type: str  # web, mobile, desktop, fullstack, backend, frontend
    app_icon: Optional[str] = None
    start_date: date
    end_date: Optional[date] = None
    is_ongoing: bool = False
    technologies: List[Technology] = []
    features: List[Feature] = []
    code_snippets: Optional[List[CodeSnippet]] = []
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    documentation_url: Optional[str] = None
    screenshots: Optional[List[str]] = []
    detailed_description: Optional[str] = None
    challenges: Optional[str] = None
    achievements: Optional[str] = None
    lines_of_code: Optional[int] = None
    commit_count: Optional[int] = None
    contributor_count: int = 1
    tags: List[str] = []
    status: str = 'completed'  # planning, development, completed, maintenance
    priority: int = 0
    client: Optional[str] = None  # 외주회사명


class ProjectCreate(ProjectBase):
    pass


class ProjectListResponse(BaseModel):
    id: str
    title: str
    subtitle: Optional[str] = None
    description: str
    project_type: str
    app_icon: Optional[str] = None
    start_date: date
    end_date: Optional[date] = None
    is_ongoing: bool
    technologies: List[Technology] = []
    tags: List[str] = []
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    status: str
    priority: int
    
    class Config:
        from_attributes = True
        populate_by_name = True


class ProjectDetailResponse(ProjectBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
        populate_by_name = True
