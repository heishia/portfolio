-- ============================================
-- 모든 테이블 삭제 SQL
-- 주의: 모든 데이터가 삭제됩니다!
-- ============================================

-- 외래 키 제약 조건 때문에 자식 테이블을 먼저 삭제
DROP TABLE IF EXISTS project_roles CASCADE;
DROP TABLE IF EXISTS inquiries CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- 인덱스는 테이블 삭제 시 자동으로 삭제됩니다.

