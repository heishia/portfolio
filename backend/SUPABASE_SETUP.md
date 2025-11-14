# Supabase PostgreSQL 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 로그인
2. "New Project" 클릭
3. 프로젝트 이름, 데이터베이스 비밀번호, 리전 설정
4. 프로젝트 생성 완료 대기 (약 2분)

## 2. 연결 정보 확인

1. Supabase 대시보드에서 프로젝트 선택
2. Settings > Database 메뉴로 이동
3. "Connection string" 섹션에서 연결 정보 확인
4. "URI" 탭에서 연결 문자열 복사

## 3. 환경 변수 설정

`backend` 폴더에 `.env` 파일을 생성하고 다음 중 하나의 방법을 사용하세요:

### 방법 1: 개별 환경 변수 (Supabase 가이드 권장)

**중요**: IPv4 네트워크에서는 Session Pooler를 사용해야 합니다.

#### Direct Connection (IPv6 지원 네트워크용)

```env
# Supabase Database Connection (개별 변수)
user=postgres
password=[YOUR-PASSWORD]
host=db.[YOUR-PROJECT-REF].supabase.co
port=5432
dbname=postgres
use_pooler=false

# CORS Origins (JSON array format)
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]

# Log Level
LOG_LEVEL=INFO
```

#### Session Pooler (IPv4 네트워크용 - 권장)

Supabase 대시보드에서 Session Pooler 연결 정보를 확인하세요.

```env
# Supabase Database Connection with Session Pooler
user=postgres
password=[YOUR-PASSWORD]
host=db.[YOUR-PROJECT-REF].supabase.co
port=5432
dbname=postgres
use_pooler=true
pooler_host=aws-1-ap-south-1.pooler.supabase.com

# CORS Origins (JSON array format)
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]

# Log Level
LOG_LEVEL=INFO
```

**중요**: 
- `pooler_host`는 Supabase 대시보드의 Session Pooler 설정에서 확인한 정확한 호스트를 입력하세요
- 사용자명은 자동으로 `postgres.[PROJECT-REF]` 형식으로 변환됩니다
- 포트는 5432를 사용합니다 (Session Pooler도 5432 사용)

### 방법 2: DATABASE_URL 직접 사용

```env
# Supabase PostgreSQL Database URL
DATABASE_URL=postgresql+psycopg2://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?sslmode=require

# CORS Origins (JSON array format)
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]

# Log Level
LOG_LEVEL=INFO
```

### 연결 문자열 형식

Supabase 연결 문자열은 다음과 같은 형식입니다:

```
postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

- `[YOUR-PASSWORD]`: 프로젝트 생성 시 설정한 데이터베이스 비밀번호
- `[YOUR-PROJECT-REF]`: Supabase 프로젝트 참조 ID (대시보드 URL에서 확인 가능)

### 예시

```
DATABASE_URL=postgresql://postgres:mySecurePassword123@db.abcdefghijklmnop.supabase.co:5432/postgres
```

## 4. 의존성 설치

```bash
cd backend
pip install -r requirements.txt
```

## 5. 데이터베이스 테이블 생성

서버를 시작하면 자동으로 테이블이 생성됩니다:

```bash
uvicorn main:app --reload
```

또는 수동으로 마이그레이션을 실행하려면:

```python
from core.database import engine, Base
from core.models import Project, Course, Inquiry

Base.metadata.create_all(bind=engine)
```

## 6. 연결 확인

서버 시작 후 다음 엔드포인트로 연결을 확인할 수 있습니다:

- Health check: `http://localhost:8000/health`
- API 문서: `http://localhost:8000/docs`

## 주의사항

- `.env` 파일은 절대 Git에 커밋하지 마세요
- 프로덕션 환경에서는 환경 변수를 안전하게 관리하세요
- Supabase 무료 플랜에는 연결 제한이 있으니 주의하세요

