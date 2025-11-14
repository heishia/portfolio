-- ============================================
-- GUILD 프로젝트 포트폴리오 데이터
-- Supabase에 바로 삽입 가능한 형식
-- ============================================

-- 프로젝트 메인 데이터 삽입
INSERT INTO projects (
    id,
    title,
    subtitle,
    description,
    project_type,
    start_date,
    end_date,
    is_ongoing,
    technologies,
    features,
    code_snippets,
    github_url,
    demo_url,
    documentation_url,
    thumbnail_url,
    screenshots,
    detailed_description,
    challenges,
    achievements,
    lines_of_code,
    commit_count,
    contributor_count,
    tags,
    status,
    priority
) VALUES (
    gen_random_uuid(),
    'GUILD (GUILDIN)',
    '투자 콘텐츠 플랫폼 - PC 데스크톱 애플리케이션',
    '호스트(콘텐츠 제공자)와 게스트(구독자)를 연결하는 실시간 투자 정보 공유 플랫폼입니다. 전문 투자자들이 종목 분석 리포트와 투자 인사이트를 제공하고, 구독자들은 실시간 채팅을 통해 소통하며 프리미엄 콘텐츠에 접근할 수 있습니다.',
    'desktop',
    '2024-09-01',
    '2025-01-31',
    TRUE,
    '[
        {
            "category": "Frontend",
            "items": ["React 18.3", "TypeScript", "Vite 6.3", "Tailwind CSS 3.4", "Radix UI", "Electron 38"]
        },
        {
            "category": "Backend",
            "items": ["FastAPI", "Python 3.12", "Uvicorn", "WebSocket"]
        },
        {
            "category": "Database",
            "items": ["Supabase (PostgreSQL)", "Supabase Storage"]
        },
        {
            "category": "Authentication",
            "items": ["JWT", "bcrypt", "python-jose"]
        },
        {
            "category": "Real-time",
            "items": ["WebSocket", "FastAPI WebSocket"]
        },
        {
            "category": "Build Tools",
            "items": ["PyInstaller", "electron-builder", "Vite"]
        },
        {
            "category": "External APIs",
            "items": ["FinanceDataReader", "yfinance"]
        }
    ]'::jsonb,
    '[
        {
            "name": "다중 역할 사용자 시스템",
            "description": "게스트, 호스트, 코호스트, 관리자 역할을 지원하는 유연한 권한 관리 시스템",
            "details": "사용자는 여러 역할을 동시에 보유할 수 있으며, current_mode로 현재 활성 모드를 전환합니다. 코호스트는 초대 전용 계정으로 호스트의 채널에 협업할 수 있습니다."
        },
        {
            "name": "실시간 채팅 시스템",
            "description": "WebSocket 기반 양방향/단방향 실시간 채팅",
            "details": "채널별 WebSocket 연결 관리, 타이핑 인디케이터, 메시지 반응(이모지), 공지사항 기능을 지원합니다."
        },
        {
            "name": "콘텐츠 발행 시스템",
            "description": "종목 리포트와 일반 포스트 작성 및 관리",
            "details": "리치 텍스트 에디터, 다중 종목 지원(최대 10개), 미디어 콘텐츠(이미지/동영상/파일/표/코드 블록) 삽입, 프리미엄 콘텐츠 설정을 지원합니다."
        },
        {
            "name": "채널 및 구독 관리",
            "description": "호스트가 운영하는 주제별 커뮤니티 채널",
            "details": "채널 생성/수정, 구독 관리, 구독료 설정(최소 1000원), 공개/비공개 설정, 채팅 모드 설정을 지원합니다."
        },
        {
            "name": "코호스트 협업 시스템",
            "description": "호스트가 코호스트를 초대하여 채널을 협업 운영",
            "details": "이메일 초대, 권한별 접근 제어(콘텐츠 작성/채팅 관리/구독자 관리/통계 조회/설정), 코호스트 전용 계정 시스템을 지원합니다."
        },
        {
            "name": "폴더/블록 시스템",
            "description": "게스트가 관심 호스트를 그룹으로 관리",
            "details": "폴더 생성/수정/삭제, 호스트 그룹화, 색상 및 설명 설정을 지원합니다."
        },
        {
            "name": "실시간 주가 연동",
            "description": "종목 리포트에 실시간 주가 정보 표시",
            "details": "FinanceDataReader, yfinance API 연동, 30초마다 자동 갱신, 투자 성과 계산(발행 당시 가격 대비 수익률)을 지원합니다."
        },
        {
            "name": "Electron 데스크톱 앱",
            "description": "크로스 플랫폼 데스크톱 애플리케이션",
            "details": "Windows 설치 파일(.exe) 생성, 내장 백엔드 서버, 자동 업데이트 준비, 개발자 도구 통합을 지원합니다."
        },
        {
            "name": "Supabase 통합",
            "description": "PostgreSQL 데이터베이스 및 Storage 활용",
            "details": "Supabase 클라이언트를 통한 데이터베이스 CRUD, 프로필 이미지 및 콘텐츠 미디어를 Supabase Storage에 저장, Row Level Security 준비를 지원합니다."
        },
        {
            "name": "JWT 인증 시스템",
            "description": "안전한 사용자 인증 및 권한 관리",
            "details": "bcrypt 비밀번호 해싱, JWT 토큰 발급/검증, 토큰 기반 API 인증, WebSocket 인증을 지원합니다."
        }
    ]'::jsonb,
    '[
        {
            "title": "WebSocket 실시간 채팅 연결 관리",
            "description": "채널별 WebSocket 연결을 관리하고 메시지를 브로드캐스트하는 핵심 로직",
            "language": "python",
            "file_path": "backend/app/chat/websocket.py",
            "code": "class ConnectionManager:\n    def __init__(self):\n        # 채널별 활성 연결 관리\n        self.active_connections: Dict[str, List[WebSocket]] = {}\n        # 사용자별 연결 정보\n        self.user_connections: Dict[WebSocket, dict] = {}\n\n    async def connect(self, websocket: WebSocket, channel_id: str, user_id: str, username: str):\n        await websocket.accept()\n        if channel_id not in self.active_connections:\n            self.active_connections[channel_id] = []\n        self.active_connections[channel_id].append(websocket)\n        self.user_connections[websocket] = {\n            \"user_id\": user_id,\n            \"username\": username,\n            \"channel_id\": channel_id\n        }\n\n    async def broadcast_to_channel(self, message: dict, channel_id: str):\n        if channel_id in self.active_connections:\n            message_str = json.dumps(message)\n            disconnected = []\n            for connection in self.active_connections[channel_id]:\n                try:\n                    await connection.send_text(message_str)\n                except Exception as e:\n                    disconnected.append(connection)\n            for connection in disconnected:\n                self.disconnect(connection)"
        },
        {
            "title": "다중 역할 사용자 인증",
            "description": "JWT 기반 인증 및 다중 역할(게스트/호스트/코호스트/관리자) 지원",
            "language": "python",
            "file_path": "backend/app/auth/routes.py",
            "code": "def get_current_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)):\n    if credentials is None:\n        raise HTTPException(status_code=401, detail=\"Authorization header is missing\")\n    \n    try:\n        token = credentials.credentials\n        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])\n        user_id: str = payload.get(\"sub\")\n        if user_id is None:\n            raise HTTPException(status_code=401, detail=\"Could not validate credentials\")\n    except JWTError:\n        raise HTTPException(status_code=401, detail=\"Could not validate credentials\")\n    \n    user = db.get_user_by_user_id(user_id)\n    if user is None:\n        raise HTTPException(status_code=401, detail=\"User not found\")\n    return user"
        },
        {
            "title": "FastAPI 전역 예외 처리",
            "description": "모든 예외를 JSON 형식으로 일관되게 반환하는 전역 예외 핸들러",
            "language": "python",
            "file_path": "backend/app/main.py",
            "code": "@app.exception_handler(Exception)\nasync def general_exception_handler(request: Request, exc: Exception):\n    import traceback as tb\n    error_detail = f\"서버 오류 발생: {type(exc).__name__}: {str(exc)}\"\n    print(f\"[ERROR] [Global Exception Handler] {error_detail}\")\n    print(f\"   요청 경로: {request.url.path}\")\n    print(tb.format_exc())\n    \n    return JSONResponse(\n        status_code=500,\n        content={\n            \"detail\": error_detail,\n            \"status_code\": 500,\n            \"type\": type(exc).__name__\n        }\n    )"
        },
        {
            "title": "React 통합 앱 구조",
            "description": "메인 앱, 호스트보드, 에디터를 통합 관리하는 앱 구조",
            "language": "typescript",
            "file_path": "frontend/src/App.tsx",
            "code": "const UnifiedApp = () => {\n  const [currentApp, setCurrentApp] = useState<AppVersion>('main');\n  \n  const handleAppChange = async (app: AppVersion, options?: { \n    initialPage?: string; \n    initialModal?: 'stock' | null; \n    roomId?: string \n  }) => {\n    setCurrentApp(app);\n    if (app === 'main' && options?.roomId) {\n      setMainAppInitialPage('chatRoom');\n      localStorage.setItem('pendingRoomId', options.roomId);\n    }\n  };\n  \n  const renderCurrentApp = () => {\n    switch (currentApp) {\n      case 'main':\n        return <MainApp onAppChange={handleAppChange} initialPage={mainAppInitialPage} />;\n      case 'hostboard':\n        return <HostboardApp onAppChange={handleAppChange} />;\n      case 'editor':\n        return <EditorApp onAppChange={handleAppChange} initialModal={editorInitialModal} />;\n      default:\n        return <MainApp onAppChange={handleAppChange} />;\n    }\n  };\n  \n  return <div className=\"min-h-screen\">{renderCurrentApp()}</div>;\n};"
        },
        {
            "title": "Supabase 클라이언트 설정",
            "description": "Supabase 데이터베이스 및 Storage 클라이언트 초기화",
            "language": "python",
            "file_path": "backend/app/core/supabase_client.py",
            "code": "from supabase import create_client, Client\nfrom .config import settings\n\nsupabase: Client = create_client(\n    settings.SUPABASE_URL,\n    settings.SUPABASE_SERVICE_KEY\n)\n\n# Storage 버킷\nPROFILE_IMAGES_BUCKET = 'profile-images'\nCONTENT_BUCKET = 'content'"
        }
    ]'::jsonb,
    'https://github.com/heishia/guild',
    NULL,
    NULL,
    NULL,
    '[]'::jsonb,
    'GUILD는 투자 정보 공유를 위한 데스크톱 애플리케이션입니다. 전문 투자자(호스트)가 종목 분석 리포트와 투자 인사이트를 제공하고, 일반 사용자(게스트)가 구독하여 실시간으로 소통할 수 있는 플랫폼입니다.

## 핵심 아키텍처

### 프론트엔드
- **React 18 + TypeScript**: 타입 안정성을 갖춘 모던 프론트엔드
- **Electron 38**: 크로스 플랫폼 데스크톱 앱
- **Tailwind CSS + Radix UI**: 접근성과 디자인 시스템을 고려한 UI 컴포넌트
- **Vite**: 빠른 개발 경험과 HMR

### 백엔드
- **FastAPI**: 고성능 비동기 Python 웹 프레임워크
- **WebSocket**: 실시간 채팅을 위한 양방향 통신
- **Supabase**: PostgreSQL 데이터베이스 및 Storage
- **JWT**: 안전한 인증 시스템

### 데이터베이스 설계
- **정규화된 스키마**: Users, Channels, Reports, Posts, Messages 등 10개 이상의 테이블
- **역할 기반 권한**: 다중 역할 시스템 (게스트/호스트/코호스트/관리자)
- **JSON 필드 활용**: 폴더 관리, 미디어 콘텐츠 등 유연한 데이터 구조

## 주요 기능 상세

### 1. 사용자 인증 및 권한 관리
- JWT 기반 인증 시스템
- bcrypt를 사용한 비밀번호 해싱
- 다중 역할 지원: 한 사용자가 게스트이면서 동시에 호스트일 수 있음
- 코호스트 초대 시스템: 호스트가 이메일로 코호스트를 초대하여 협업

### 2. 실시간 채팅
- WebSocket 기반 양방향 통신
- 채널별 연결 관리 및 메시지 브로드캐스트
- 타이핑 인디케이터
- 메시지 반응(이모지) 기능
- 채팅 모드 설정: 양방향/호스트 전용

### 3. 콘텐츠 관리
- 종목 리포트: 다중 종목 지원(최대 10개), 실시간 주가 연동
- 일반 포스트: 자유 형식의 투자 인사이트
- 리치 텍스트 에디터: 이미지, 동영상, 파일, 표, 코드 블록 삽입
- 프리미엄 콘텐츠: 구독자만 접근 가능

### 4. 채널 및 구독
- 호스트가 채널 생성 및 관리
- 구독 시스템: 월 구독료 설정(최소 1000원)
- 공개/비공개 채널
- 채널별 공지사항

### 5. 실시간 주가 연동
- FinanceDataReader, yfinance API 활용
- 30초마다 자동 갱신
- 투자 성과 계산: 발행 당시 가격 대비 수익률

## 기술적 도전 과제 및 해결

### 1. WebSocket 연결 관리
**도전**: 여러 채널에 동시 접속하는 사용자들의 연결을 효율적으로 관리
**해결**: 
- 채널별 연결 딕셔너리 구조로 관리
- 연결이 끊어진 WebSocket 자동 정리
- 사용자별 연결 정보 추적

### 2. 다중 역할 시스템
**도전**: 한 사용자가 여러 역할을 동시에 보유하면서도 명확한 권한 관리
**해결**:
- `roles` JSON 배열로 다중 역할 저장
- `current_mode`로 현재 활성 모드 관리
- API 엔드포인트에서 역할 기반 권한 체크

### 3. Electron 앱 내 백엔드 통합
**도전**: 데스크톱 앱에 백엔드 서버를 내장하고 자동으로 실행
**해결**:
- PyInstaller로 Python 백엔드를 exe로 패키징
- Electron 메인 프로세스에서 백엔드 프로세스 관리
- 포트 충돌 감지 및 처리

### 4. Supabase 마이그레이션
**도전**: JSON 파일 기반에서 Supabase PostgreSQL로 마이그레이션
**해결**:
- SQL 스키마 파일로 테이블 구조 정의
- Supabase 클라이언트를 통한 CRUD 작업
- Storage 버킷을 활용한 미디어 파일 관리

### 5. 실시간 주가 데이터 처리
**도전**: DB에 실시간 데이터를 저장하지 않으면서도 효율적으로 주가 정보 제공
**해결**:
- `price_at_publication`만 DB에 저장 (발행 당시 가격)
- 프론트엔드에서 30초마다 API 호출하여 실시간 주가 갱신
- 투자 성과는 클라이언트에서 계산

## 주요 성과

1. **완전한 풀스택 개발**: 프론트엔드부터 백엔드, 데이터베이스까지 전 과정 개발
2. **실시간 통신 구현**: WebSocket을 활용한 실시간 채팅 시스템 구축
3. **복잡한 권한 시스템**: 다중 역할 및 코호스트 협업 시스템 구현
4. **데스크톱 앱 패키징**: Electron + PyInstaller를 활용한 설치 파일 생성
5. **외부 API 통합**: 주식 데이터 API 연동 및 실시간 갱신
6. **확장 가능한 아키텍처**: 모듈화된 코드 구조로 유지보수성 향상

## 개발 환경 및 배포

- **개발 환경**: Windows, Node.js 18+, Python 3.12+
- **버전 관리**: Git, GitHub
- **CI/CD**: GitHub Actions를 통한 자동 빌드 및 릴리즈
- **배포**: Windows 설치 파일(.exe) 자동 생성 및 배포',
    '## 주요 도전 과제

### 1. WebSocket 연결 관리
여러 채널에 동시 접속하는 사용자들의 WebSocket 연결을 효율적으로 관리해야 했습니다. 채널별로 연결을 그룹화하고, 연결이 끊어진 경우 자동으로 정리하는 로직을 구현했습니다.

### 2. 다중 역할 시스템 설계
한 사용자가 게스트이면서 동시에 호스트일 수 있는 복잡한 권한 시스템을 설계했습니다. `roles` JSON 배열과 `current_mode`를 조합하여 유연하면서도 명확한 권한 관리를 구현했습니다.

### 3. Electron 앱 내 백엔드 통합
데스크톱 앱에 Python 백엔드를 내장하고 자동으로 실행하는 것이 까다로웠습니다. PyInstaller로 exe를 만들고 Electron 메인 프로세스에서 관리하는 방식으로 해결했습니다.

### 4. Supabase 마이그레이션
초기에는 JSON 파일 기반 데이터베이스를 사용했지만, 확장성을 위해 Supabase PostgreSQL로 마이그레이션했습니다. SQL 스키마를 체계적으로 설계하고 Supabase 클라이언트를 통한 CRUD 작업을 구현했습니다.

### 5. 실시간 주가 데이터 처리
DB에 실시간 데이터를 저장하지 않으면서도 효율적으로 주가 정보를 제공해야 했습니다. 발행 당시 가격만 저장하고, 프론트엔드에서 주기적으로 API를 호출하여 실시간 주가를 갱신하는 방식으로 해결했습니다.',
    '## 주요 성과

1. **완전한 풀스택 개발 경험**
   - 프론트엔드(React + TypeScript), 백엔드(FastAPI), 데이터베이스(Supabase) 전 과정 개발
   - Electron 데스크톱 앱 개발 및 패키징

2. **실시간 통신 시스템 구축**
   - WebSocket을 활용한 양방향 실시간 채팅 구현
   - 채널별 연결 관리 및 메시지 브로드캐스트

3. **복잡한 비즈니스 로직 구현**
   - 다중 역할 사용자 시스템 (게스트/호스트/코호스트/관리자)
   - 코호스트 협업 시스템 및 권한 관리
   - 구독 및 프리미엄 콘텐츠 시스템

4. **외부 API 통합**
   - FinanceDataReader, yfinance를 활용한 실시간 주가 데이터 연동
   - 30초마다 자동 갱신 및 투자 성과 계산

5. **확장 가능한 아키텍처 설계**
   - 모듈화된 코드 구조
   - 타입 안정성을 위한 TypeScript 활용
   - 체계적인 데이터베이스 스키마 설계

6. **개발 프로세스 개선**
   - GitHub Actions를 통한 CI/CD 파이프라인 구축
   - 자동 빌드 및 릴리즈 프로세스',
    50000,
    500,
    1,
    '["투자", "실시간 채팅", "WebSocket", "Electron", "FastAPI", "Supabase", "풀스택", "데스크톱 앱"]'::jsonb,
    'completed',
    1
);

-- 프로젝트 역할 데이터 삽입
INSERT INTO project_roles (
    project_id,
    role_name,
    responsibility,
    contribution_percentage,
    backend_contribution,
    frontend_contribution,
    database_contribution,
    devops_contribution
)
SELECT 
    p.id,
    'Full Stack Developer',
    '프로젝트 전체 설계 및 개발을 담당했습니다. 프론트엔드(React + TypeScript + Electron), 백엔드(FastAPI), 데이터베이스(Supabase) 설계 및 구현, WebSocket 실시간 채팅 시스템, 사용자 인증 및 권한 관리, 콘텐츠 관리 시스템, 실시간 주가 연동, Electron 앱 패키징 및 배포까지 전 과정을 개발했습니다.',
    100,
    TRUE,
    TRUE,
    TRUE,
    TRUE
FROM projects p
WHERE p.title = 'GUILD (GUILDIN)';

