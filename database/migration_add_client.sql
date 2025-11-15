-- ============================================
-- 클라이언트 필드 추가 마이그레이션
-- Supabase에서 실행
-- ============================================

-- 프로젝트 테이블에 client 필드 추가
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS client VARCHAR(200);

