-- ============================================
-- thumbnail_url 컬럼 삭제 마이그레이션
-- 기존 projects 테이블에서 thumbnail_url 컬럼을 제거합니다.
-- ============================================

-- 주의: 이 마이그레이션은 기존 데이터베이스의 thumbnail_url 컬럼을 삭제합니다.
-- 실행 전에 데이터 백업을 권장합니다.

-- thumbnail_url 컬럼이 존재하는 경우에만 삭제
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'projects' 
        AND column_name = 'thumbnail_url'
    ) THEN
        ALTER TABLE projects DROP COLUMN thumbnail_url;
        RAISE NOTICE 'thumbnail_url 컬럼이 삭제되었습니다.';
    ELSE
        RAISE NOTICE 'thumbnail_url 컬럼이 존재하지 않습니다. 마이그레이션이 필요하지 않습니다.';
    END IF;
END $$;

