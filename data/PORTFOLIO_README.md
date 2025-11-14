# GUILD (GUILDIN) - 포트폴리오 프로젝트

## 📋 프로젝트 개요

**GUILD**는 투자 정보 공유를 위한 PC 데스크톱 애플리케이션입니다. 전문 투자자(호스트)가 종목 분석 리포트와 투자 인사이트를 제공하고, 일반 사용자(게스트)가 구독하여 실시간으로 소통할 수 있는 플랫폼입니다.

- **프로젝트명**: GUILD (GUILDIN)
- **개발 기간**: 2024년 9월 ~ 2025년 1월 (진행 중)
- **프로젝트 유형**: 데스크톱 애플리케이션 (Electron)
- **개발 역할**: Full Stack Developer (100% 기여)
- **GitHub**: https://github.com/heishia/guild

---

## 🎯 프로젝트 목표

1. **투자 정보 접근성 향상**: 전문 투자자의 분석을 일반 사용자에게 쉽게 제공
2. **실시간 소통 플랫폼**: 호스트와 게스트 간의 양방향 실시간 채팅
3. **프리미엄 콘텐츠 모델**: 구독 기반 수익화 구조
4. **확장 가능한 아키텍처**: 모듈화된 구조로 유지보수성 및 확장성 확보

---

## 🛠 기술 스택

### Frontend
- **React 18.3**: UI 라이브러리
- **TypeScript**: 타입 안정성
- **Vite 6.3**: 빌드 도구 (빠른 HMR)
- **Tailwind CSS 3.4**: 유틸리티 기반 스타일링
- **Radix UI**: 접근성 좋은 UI 컴포넌트
- **Electron 38**: 크로스 플랫폼 데스크톱 앱

### Backend
- **FastAPI**: 고성능 Python 웹 프레임워크
- **Python 3.12**: 백엔드 언어
- **Uvicorn**: ASGI 서버
- **WebSocket**: 실시간 양방향 통신

### Database & Storage
- **Supabase (PostgreSQL)**: 관계형 데이터베이스
- **Supabase Storage**: 파일 저장소 (프로필 이미지, 콘텐츠 미디어)

### Authentication & Security
- **JWT (python-jose)**: 토큰 기반 인증
- **bcrypt**: 비밀번호 해싱
- **cryptography**: 결제 정보 암호화

### External APIs
- **FinanceDataReader**: 한국 주식 데이터
- **yfinance**: 해외 주식 데이터

### Build & Deployment
- **PyInstaller**: Python → Windows exe 패키징
- **electron-builder**: Electron 앱 설치 파일 생성
- **GitHub Actions**: CI/CD 자동화

---

## 🏗 시스템 아키텍처

### 전체 구조
```
┌─────────────────────────────────────────┐
│         Electron Desktop App             │
│  ┌───────────────────────────────────┐  │
│  │   React Frontend (Vite)           │  │
│  │   - Main App (게스트/호스트)      │  │
│  │   - Hostboard (호스트 대시보드)   │  │
│  │   - Editor (콘텐츠 에디터)        │  │
│  └───────────────────────────────────┘  │
│              ↕ HTTP/WebSocket            │
│  ┌───────────────────────────────────┐  │
│  │   FastAPI Backend (내장)          │  │
│  │   - REST API                      │  │
│  │   - WebSocket Server              │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                    ↕
        ┌───────────────────────┐
        │   Supabase            │
        │   - PostgreSQL        │
        │   - Storage           │
        └───────────────────────┘
                    ↕
        ┌───────────────────────┐
        │   External APIs       │
        │   - FinanceDataReader │
        │   - yfinance          │
        └───────────────────────┘
```

### 데이터베이스 스키마

**주요 테이블**:
- `users`: 사용자 정보 (다중 역할 지원)
- `channels`: 채널 정보
- `reports`: 종목 리포트
- `posts`: 일반 포스트
- `messages`: 채팅 메시지
- `chatting_rooms`: 채팅방
- `subscriptions`: 구독 관계
- `cohosts`: 코호스트 관계
- `message_reactions`: 메시지 반응

**관계**:
- User 1:1 Channel (호스트만)
- User 1:N Report/Post
- Channel 1:N Message
- User M:N Channel (via Subscription)

---

## ✨ 주요 기능

### 1. 사용자 인증 및 권한 관리

**다중 역할 시스템**:
- **게스트 (Guest)**: 기본 사용자, 채널 구독 및 콘텐츠 조회
- **호스트 (Host)**: 채널 생성, 콘텐츠 작성, 코호스트 초대
- **코호스트 (Cohost)**: 호스트의 채널에 협업 (초대 전용)
- **관리자 (Admin)**: 시스템 전체 관리

**특징**:
- 한 사용자가 여러 역할 동시 보유 가능 (예: 게스트이면서 호스트)
- `current_mode`로 현재 활성 모드 전환
- JWT 기반 토큰 인증
- bcrypt 비밀번호 해싱

**코드 예시**:
```python
# backend/app/auth/routes.py
def get_current_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    token = credentials.credentials
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    user_id: str = payload.get("sub")
    user = db.get_user_by_user_id(user_id)
    return user
```

### 2. 실시간 채팅 시스템

**WebSocket 기반 실시간 통신**:
- 채널별 WebSocket 연결 관리
- 메시지 브로드캐스트
- 타이핑 인디케이터
- 메시지 반응(이모지)
- 공지사항 기능

**채팅 모드**:
- **양방향 (bidirectional)**: 모든 사용자가 메시지 전송 가능
- **호스트 전용 (host_only)**: 호스트만 메시지 전송 가능

**코드 예시**:
```python
# backend/app/chat/websocket.py
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}
        self.user_connections: Dict[WebSocket, dict] = {}

    async def broadcast_to_channel(self, message: dict, channel_id: str):
        if channel_id in self.active_connections:
            message_str = json.dumps(message)
            for connection in self.active_connections[channel_id]:
                try:
                    await connection.send_text(message_str)
                except Exception as e:
                    self.disconnect(connection)
```

### 3. 콘텐츠 발행 시스템

**종목 리포트 (Report)**:
- 다중 종목 지원 (최대 10개)
- 실시간 주가 연동 (FinanceDataReader, yfinance)
- 리치 텍스트 에디터
- 미디어 콘텐츠 삽입 (이미지, 동영상, 파일, 표, 코드 블록)
- 프리미엄 콘텐츠 설정

**일반 포스트 (Post)**:
- 자유 형식의 투자 인사이트
- 카테고리 분류 (시장분석, 투자전략, 초보가이드 등)
- 태그 시스템

**실시간 주가 처리**:
- 발행 당시 가격(`price_at_publication`)만 DB 저장
- 프론트엔드에서 30초마다 API 호출하여 실시간 주가 갱신
- 투자 성과 계산: `(현재가 - 발행가) / 발행가 * 100`

### 4. 채널 및 구독 관리

**채널 기능**:
- 호스트가 채널 생성 및 관리
- 채널 설명, 카테고리 설정
- 공개/비공개 설정
- 구독료 설정 (최소 1000원)
- 채널별 공지사항

**구독 시스템**:
- 게스트가 채널 구독
- 구독 취소
- 구독자 목록 관리

### 5. 코호스트 협업 시스템

**초대 프로세스**:
1. 호스트가 이메일로 코호스트 초대
2. 초대 토큰 생성
3. 코호스트가 초대 링크로 가입
4. 권한별 접근 제어

**권한 관리**:
- `content`: 콘텐츠 작성/수정
- `chat`: 채팅 관리
- `subscriber`: 구독자 관리
- `analytics`: 통계 조회
- `settings`: 채널 설정 (일반적으로 false)

### 6. 폴더/블록 시스템

**게스트 전용 기능**:
- 관심 호스트를 폴더로 그룹화
- 폴더별 색상 및 설명 설정
- 호스트 중복 포함 가능

### 7. Electron 데스크톱 앱

**특징**:
- Windows 설치 파일(.exe) 생성
- 내장 백엔드 서버 (PyInstaller로 패키징)
- 자동 포트 감지 및 충돌 처리
- 개발자 도구 통합

**빌드 프로세스**:
1. 백엔드: PyInstaller로 `app.exe` 생성
2. 프론트엔드: Vite로 빌드
3. Electron: electron-builder로 설치 파일 생성

---

## 🔧 기술적 도전 과제 및 해결

### 1. WebSocket 연결 관리

**도전**:
- 여러 채널에 동시 접속하는 사용자들의 연결을 효율적으로 관리
- 연결이 끊어진 WebSocket 자동 정리

**해결**:
- 채널별 연결 딕셔너리 구조 (`Dict[str, List[WebSocket]]`)
- 사용자별 연결 정보 추적 (`Dict[WebSocket, dict]`)
- 브로드캐스트 시 예외 처리 및 자동 정리

```python
# 연결이 끊어진 WebSocket 자동 정리
disconnected = []
for connection in self.active_connections[channel_id]:
    try:
        await connection.send_text(message_str)
    except Exception as e:
        disconnected.append(connection)
for connection in disconnected:
    self.disconnect(connection)
```

### 2. 다중 역할 시스템 설계

**도전**:
- 한 사용자가 여러 역할을 동시에 보유하면서도 명확한 권한 관리
- 코호스트는 게스트/호스트와 분리된 독립적인 계정

**해결**:
- `roles` JSON 배열로 다중 역할 저장
- `current_mode`로 현재 활성 모드 관리
- API 엔드포인트에서 역할 기반 권한 체크

```python
# 역할 검증 예시
user_roles = user.get("roles", ["guest"])
if "host" not in user_roles:
    raise HTTPException(status_code=403, detail="Host role required")
```

### 3. Electron 앱 내 백엔드 통합

**도전**:
- 데스크톱 앱에 Python 백엔드를 내장하고 자동으로 실행
- 포트 충돌 감지 및 처리

**해결**:
- PyInstaller로 Python 백엔드를 exe로 패키징
- Electron 메인 프로세스에서 백엔드 프로세스 관리
- 포트 감지 및 자동 재시작 로직

```javascript
// electron/main.js
const backendProcess = spawn(backendPath, [], {
    cwd: backendDir,
    stdio: ['ignore', 'pipe', 'pipe']
});
```

### 4. Supabase 마이그레이션

**도전**:
- JSON 파일 기반에서 Supabase PostgreSQL로 마이그레이션
- 기존 데이터 구조 유지하면서 스키마 설계

**해결**:
- SQL 스키마 파일로 테이블 구조 정의
- Supabase 클라이언트를 통한 CRUD 작업
- Storage 버킷을 활용한 미디어 파일 관리

```python
# Supabase 클라이언트 사용
from supabase import create_client

supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SERVICE_KEY
)

# 데이터 조회
result = supabase.table("users").select("*").eq("id", user_id).execute()
```

### 5. 실시간 주가 데이터 처리

**도전**:
- DB에 실시간 데이터를 저장하지 않으면서도 효율적으로 주가 정보 제공
- 투자 성과 계산

**해결**:
- `price_at_publication`만 DB에 저장 (발행 당시 가격)
- 프론트엔드에서 30초마다 API 호출하여 실시간 주가 갱신
- 투자 성과는 클라이언트에서 계산

```typescript
// 프론트엔드에서 실시간 주가 갱신
useEffect(() => {
    const interval = setInterval(async () => {
        const stockData = await fetchStockPrice(stockCode);
        setCurrentPrice(stockData.current_price);
        setChangePercent(
            ((stockData.current_price - priceAtPublication) / priceAtPublication) * 100
        );
    }, 30000); // 30초마다 갱신
    
    return () => clearInterval(interval);
}, [stockCode, priceAtPublication]);
```

---

## 📊 프로젝트 통계

- **코드 라인 수**: 약 50,000줄
- **커밋 수**: 500+ 커밋
- **기여자**: 1명 (개인 프로젝트)
- **버전**: 1.3.0 (진행 중)
- **테이블 수**: 10개 이상
- **API 엔드포인트**: 50개 이상

---

## 🎯 주요 성과

### 1. 완전한 풀스택 개발 경험
- 프론트엔드(React + TypeScript), 백엔드(FastAPI), 데이터베이스(Supabase) 전 과정 개발
- Electron 데스크톱 앱 개발 및 패키징

### 2. 실시간 통신 시스템 구축
- WebSocket을 활용한 양방향 실시간 채팅 구현
- 채널별 연결 관리 및 메시지 브로드캐스트

### 3. 복잡한 비즈니스 로직 구현
- 다중 역할 사용자 시스템 (게스트/호스트/코호스트/관리자)
- 코호스트 협업 시스템 및 권한 관리
- 구독 및 프리미엄 콘텐츠 시스템

### 4. 외부 API 통합
- FinanceDataReader, yfinance를 활용한 실시간 주가 데이터 연동
- 30초마다 자동 갱신 및 투자 성과 계산

### 5. 확장 가능한 아키텍처 설계
- 모듈화된 코드 구조
- 타입 안정성을 위한 TypeScript 활용
- 체계적인 데이터베이스 스키마 설계

### 6. 개발 프로세스 개선
- GitHub Actions를 통한 CI/CD 파이프라인 구축
- 자동 빌드 및 릴리즈 프로세스

---

## 📁 프로젝트 구조

```
guild/
├── backend/                      # FastAPI 백엔드
│   ├── app/
│   │   ├── auth/                # 인증 API
│   │   ├── channels/            # 채널 관리
│   │   ├── chat/                # 실시간 채팅 (WebSocket)
│   │   ├── content/             # 콘텐츠 API
│   │   ├── cohosts/             # 코호스트 관리
│   │   └── core/                # 설정, 보안, 데이터베이스
│   ├── dist/                    # PyInstaller 빌드 결과
│   └── requirements.txt
│
├── frontend/                     # React + Electron
│   ├── src/
│   │   ├── apps/                # 앱별 엔트리 포인트
│   │   │   ├── main/           # 메인 앱
│   │   │   ├── hostboard/      # 호스트 대시보드
│   │   │   └── editor/         # 콘텐츠 에디터
│   │   ├── components/          # UI 컴포넌트
│   │   ├── pages/               # 페이지 컴포넌트
│   │   ├── services/            # API 클라이언트
│   │   └── hooks/               # 커스텀 훅
│   ├── electron/                # Electron 메인 프로세스
│   └── dist-electron/           # 빌드 결과
│
├── database/                     # 데이터베이스 스키마
│   └── schemas/                 # SQL 스키마 파일
│
└── docs/                         # 문서
    ├── domain-model.md          # 도메인 모델 정의
    └── development/             # 개발 가이드
```

---

## 🚀 배포 및 실행

### 개발 환경 실행
```bash
# 백엔드
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python run.py --dev

# 프론트엔드
cd frontend
npm install
npm run dev
```

### Electron 앱 실행
```bash
cd frontend
npm run electron-dev
```

### 빌드
```bash
# 백엔드 빌드
cd backend
pyinstaller app.spec

# 프론트엔드 + Electron 빌드
cd frontend
npm run build
npm run dist
```

---

## 📝 학습한 내용

1. **WebSocket 실시간 통신**: 채널별 연결 관리, 메시지 브로드캐스트, 예외 처리
2. **복잡한 권한 시스템**: 다중 역할, 모드 전환, 권한 기반 접근 제어
3. **Electron 데스크톱 앱**: 내장 백엔드, 프로세스 관리, 패키징
4. **Supabase 활용**: PostgreSQL, Storage, 클라이언트 라이브러리
5. **외부 API 통합**: 주식 데이터 API, 실시간 갱신, 성능 최적화
6. **타입 안정성**: TypeScript를 활용한 타입 시스템 구축

---

## 🔮 향후 계획

1. **모바일 앱 개발**: React Native로 모바일 버전 개발
2. **결제 시스템 통합**: 구독 결제 기능 추가
3. **알림 시스템**: 실시간 알림 (푸시, 이메일)
4. **분석 대시보드**: 호스트용 통계 및 분석 도구
5. **AI 기능**: 투자 추천, 콘텐츠 요약 등

---

## 📄 라이선스

이 프로젝트는 개발 중입니다.

---

## 📧 문의

프로젝트 관련 문의사항은 [GitHub Issues](https://github.com/heishia/guild/issues)에 남겨주세요.

