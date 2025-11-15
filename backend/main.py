from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from core.config import settings
from core.database import engine, Base, test_connection
from core.exceptions import BaseAPIException
from core.logger import logger
from projects.router import router as projects_router
from courses.router import router as courses_router
from inquiries.router import router as inquiries_router


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION
    )
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.get_cors_origins(),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    app.include_router(projects_router, prefix=settings.API_V1_PREFIX)
    app.include_router(courses_router, prefix=settings.API_V1_PREFIX)
    app.include_router(inquiries_router, prefix=settings.API_V1_PREFIX)
    
    @app.exception_handler(BaseAPIException)
    async def custom_exception_handler(request, exc: BaseAPIException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail}
        )
    
    @app.on_event("startup")
    async def startup_event():
        if test_connection():
            Base.metadata.create_all(bind=engine)
            logger.info("Database tables created")
        else:
            logger.warning("Database connection failed, tables not created")
    
    @app.get("/")
    def root():
        return {"message": "Portfolio API", "version": settings.VERSION}
    
    @app.get("/health")
    def health_check():
        return {"status": "ok"}
    
    return app


app = create_app()

