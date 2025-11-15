from pydantic_settings import BaseSettings
from typing import List, Optional
from urllib.parse import quote_plus


class Settings(BaseSettings):
    PROJECT_NAME: str = "Portfolio API"
    VERSION: str = "1.0.0"
    API_V1_PREFIX: str = "/api"
    
    DATABASE_URL: Optional[str] = None
    
    DB_USER: Optional[str] = None
    DB_PASSWORD: Optional[str] = None
    DB_HOST: Optional[str] = None
    DB_PORT: Optional[str] = None
    DB_NAME: Optional[str] = None
    
    user: Optional[str] = None
    password: Optional[str] = None
    host: Optional[str] = None
    port: Optional[str] = None
    dbname: Optional[str] = None
    
    use_pooler: bool = False
    pooler_host: Optional[str] = None
    
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]
    
    LOG_LEVEL: str = "INFO"
    
    # Supabase Storage 설정
    SUPABASE_URL: Optional[str] = None
    SUPABASE_KEY: Optional[str] = None  # Service Role Key 또는 Anon Key
    
    class Config:
        env_file = [".env", "../.env"]
        case_sensitive = False
        extra = "ignore"
    
    def get_database_url(self) -> str:
        if self.DATABASE_URL:
            return self.DATABASE_URL
        
        user = self.DB_USER or self.user
        password = self.DB_PASSWORD or self.password
        host = self.DB_HOST or self.host
        port = self.DB_PORT or self.port
        dbname = self.DB_NAME or self.dbname
        
        if all([user, password, host, port, dbname]):
            encoded_password = quote_plus(password)
            if self.use_pooler:
                project_ref = host.replace("db.", "").replace(".supabase.co", "")
                
                if self.pooler_host:
                    pooler_host = self.pooler_host
                else:
                    pooler_host = f"aws-1-ap-south-1.pooler.supabase.com"
                
                pooler_port = port
                pooler_user = f"{user}.{project_ref}"
                return f"postgresql+psycopg2://{pooler_user}:{encoded_password}@{pooler_host}:{pooler_port}/{dbname}?sslmode=require"
            else:
                return f"postgresql+psycopg2://{user}:{encoded_password}@{host}:{port}/{dbname}?sslmode=require"
        
        return "postgresql://user:password@localhost:5432/database"


settings = Settings()

