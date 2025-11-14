-- ============================================
-- 프로젝트 테이블 마이그레이션 SQL
-- 기존 테이블을 새 스키마로 변경
-- ============================================

-- 주의: 이 마이그레이션은 기존 데이터를 백업한 후 실행해야 합니다.

-- 1. 기존 테이블 백업 (선택사항)
-- CREATE TABLE projects_backup AS SELECT * FROM projects;

-- 2. 기존 테이블 삭제 (주의: 데이터 손실)
-- DROP TABLE IF EXISTS projects CASCADE;

-- 3. 새 스키마로 테이블 생성
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR PRIMARY KEY,  -- UUID as string
    
    -- 기본 정보
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(500),
    description TEXT NOT NULL,
    project_type VARCHAR(50) NOT NULL CHECK (project_type IN ('web', 'mobile', 'desktop', 'fullstack', 'backend', 'frontend')),
    
    -- 이미지
    app_icon VARCHAR(500),
    thumbnail_url TEXT,
    
    -- 프로젝트 기간
    start_date DATE NOT NULL,
    end_date DATE,
    is_ongoing BOOLEAN DEFAULT FALSE,
    
    -- 기술 스택 및 기능 (JSON 배열)
    technologies JSON NOT NULL DEFAULT '[]',
    features JSON NOT NULL DEFAULT '[]',
    code_snippets JSON DEFAULT '[]',
    
    -- 링크 및 리소스
    github_url VARCHAR(500),
    demo_url VARCHAR(500),
    documentation_url VARCHAR(500),
    
    -- 이미지 및 미디어
    screenshots JSON DEFAULT '[]',
    
    -- 상세 설명
    detailed_description TEXT,
    challenges TEXT,  -- 도전 과제 및 해결 방법 (TEXT로 변경)
    achievements TEXT,  -- 주요 성과 (TEXT로 변경)
    
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

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(project_type);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_priority ON projects(priority DESC);
CREATE INDEX IF NOT EXISTS idx_projects_start_date ON projects(start_date DESC);

-- 4. 기존 데이터 마이그레이션 (기존 데이터가 있는 경우)
-- 주의: 이 부분은 기존 데이터 구조에 따라 수정이 필요합니다.
-- 예시:
/*
INSERT INTO projects (
    id, title, subtitle, description, project_type, 
    app_icon, thumbnail_url, start_date, end_date, is_ongoing,
    technologies, features, code_snippets,
    github_url, demo_url, documentation_url,
    screenshots, detailed_description, challenges, achievements,
    lines_of_code, commit_count, contributor_count,
    tags, status, priority, created_at, updated_at
)
SELECT 
    CAST(id AS VARCHAR) as id,
    title,
    NULL as subtitle,  -- 기존 데이터에 없으면 NULL
    COALESCE(summary, '') as description,  -- summary를 description으로
    CASE 
        WHEN category = 'Web' THEN 'web'
        WHEN category = 'Mobile' THEN 'mobile'
        WHEN category = 'Automation' THEN 'backend'
        ELSE 'web'
    END as project_type,
    app_icon,
    NULL as thumbnail_url,
    CURRENT_DATE as start_date,  -- 기존 period에서 파싱 필요
    NULL as end_date,
    FALSE as is_ongoing,
    '[]'::json as technologies,  -- 기존 데이터 변환 필요
    '[]'::json as features,
    '[]'::json as code_snippets,
    github_url,
    demo_url,
    NULL as documentation_url,
    '[]'::json as screenshots,
    overview as detailed_description,
    NULL as challenges,  -- 기존 challenges JSON을 TEXT로 변환 필요
    NULL as achievements,  -- 기존 results를 achievements로 변환 필요
    NULL as lines_of_code,
    NULL as commit_count,
    1 as contributor_count,
    tags,
    'completed' as status,
    0 as priority,
    created_at,
    updated_at
FROM projects_backup;
*/

-- 5. 프로젝트 역할 테이블 (선택사항 - data 폴더의 스키마에 있음)
CREATE TABLE IF NOT EXISTS project_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id VARCHAR NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    
    -- 역할 정보
    role_name VARCHAR(100) NOT NULL,
    responsibility TEXT,
    contribution_percentage INTEGER CHECK (contribution_percentage >= 0 AND contribution_percentage <= 100),
    
    -- 기술적 기여
    backend_contribution BOOLEAN DEFAULT FALSE,
    frontend_contribution BOOLEAN DEFAULT FALSE,
    database_contribution BOOLEAN DEFAULT FALSE,
    devops_contribution BOOLEAN DEFAULT FALSE,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_project_roles_project ON project_roles(project_id);

