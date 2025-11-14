-- ============================================
-- 포트폴리오 프로젝트 테이블 (Supabase)
-- ============================================

-- 프로젝트 메인 테이블
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- 기본 정보
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(500),
    description TEXT NOT NULL,
    project_type VARCHAR(50) NOT NULL CHECK (project_type IN ('web', 'mobile', 'desktop', 'fullstack', 'backend', 'frontend')),
    
    -- 프로젝트 기간
    start_date DATE NOT NULL,
    end_date DATE,
    is_ongoing BOOLEAN DEFAULT FALSE,
    
    -- 기술 스택 (JSON 배열)
    technologies JSON NOT NULL DEFAULT '[]',
    
    -- 주요 기능 (JSON 배열)
    features JSON NOT NULL DEFAULT '[]',
    
    -- 코드 스니펫 (JSON 배열) - 중요한 코드 일부
    code_snippets JSON DEFAULT '[]',
    
    -- 링크 및 리소스
    github_url VARCHAR(500),
    demo_url VARCHAR(500),
    documentation_url VARCHAR(500),
    
    -- 이미지 및 미디어
    thumbnail_url TEXT,
    screenshots JSON DEFAULT '[]',
    
    -- 상세 설명
    detailed_description TEXT,
    challenges TEXT,  -- 도전 과제 및 해결 방법
    achievements TEXT,  -- 주요 성과
    
    -- 통계
    lines_of_code INTEGER,
    commit_count INTEGER,
    contributor_count INTEGER DEFAULT 1,
    
    -- 메타데이터
    tags JSON DEFAULT '[]',
    status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('planning', 'development', 'completed', 'maintenance')),
    priority INTEGER DEFAULT 0,  -- 표시 순서
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(project_type);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_priority ON projects(priority DESC);
CREATE INDEX IF NOT EXISTS idx_projects_start_date ON projects(start_date DESC);

-- 프로젝트 역할 테이블 (개발자 역할 및 기여도)
CREATE TABLE IF NOT EXISTS project_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    
    -- 역할 정보
    role_name VARCHAR(100) NOT NULL,  -- 'Full Stack Developer', 'Backend Lead', 'Frontend Developer' 등
    responsibility TEXT,  -- 담당 업무 상세
    contribution_percentage INTEGER CHECK (contribution_percentage >= 0 AND contribution_percentage <= 100),
    
    -- 기술적 기여
    backend_contribution BOOLEAN DEFAULT FALSE,
    frontend_contribution BOOLEAN DEFAULT FALSE,
    database_contribution BOOLEAN DEFAULT FALSE,
    devops_contribution BOOLEAN DEFAULT FALSE,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_project_roles_project ON project_roles(project_id);

