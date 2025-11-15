from sqlalchemy import Column, Integer, String, Text, Float, DateTime, JSON, Boolean, Date
from sqlalchemy.sql import func
from core.database import Base


class Project(Base):
    __tablename__ = "projects"
    
    id = Column(String, primary_key=True, index=True)  # UUID as string
    title = Column(String(200), nullable=False)
    subtitle = Column(String(500), nullable=True)
    description = Column(Text, nullable=False)
    project_type = Column(String(50), nullable=False)  # web, mobile, desktop, fullstack, backend, frontend
    app_icon = Column(String(500), nullable=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    is_ongoing = Column(Boolean, default=False)
    technologies = Column(JSON, nullable=False, default=[])
    features = Column(JSON, nullable=False, default=[])
    code_snippets = Column(JSON, nullable=True, default=[])
    github_url = Column(String(500), nullable=True)
    demo_url = Column(String(500), nullable=True)
    documentation_url = Column(String(500), nullable=True)
    screenshots = Column(JSON, nullable=True, default=[])
    detailed_description = Column(Text, nullable=True)
    challenges = Column(Text, nullable=True)  # Changed from JSON to Text
    achievements = Column(Text, nullable=True)  # Changed from JSON to Text
    lines_of_code = Column(Integer, nullable=True)
    commit_count = Column(Integer, nullable=True)
    contributor_count = Column(Integer, default=1)
    tags = Column(JSON, nullable=True, default=[])
    status = Column(String(20), default='completed')  # planning, development, completed, maintenance
    priority = Column(Integer, default=0)
    client = Column(String(200), nullable=True)  # 외주회사명
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Course(Base):
    __tablename__ = "courses"
    
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(20), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    thumbnail = Column(String(500))
    price = Column(Integer, default=0)
    duration = Column(String(50), nullable=True)
    pages = Column(Integer, nullable=True)
    chapters = Column(Integer, nullable=True)
    rating = Column(Float, default=0.0)
    reviews = Column(Integer, default=0)
    students = Column(Integer, default=0)
    level = Column(String(20))
    instructor_name = Column(String(100))
    instructor_bio = Column(String(500))
    what_you_learn = Column(JSON)
    curriculum = Column(JSON)
    requirements = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Inquiry(Base):
    __tablename__ = "inquiries"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(200), nullable=False)
    phone = Column(String(50), nullable=False)
    company = Column(String(200), nullable=True)
    message = Column(Text, nullable=True)
    service_type = Column(String(50), nullable=True)
    selected_features = Column(JSON, nullable=True)
    additional_features = Column(Text, nullable=True)
    estimated_price = Column(Integer, nullable=True)
    status = Column(String(20), default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

