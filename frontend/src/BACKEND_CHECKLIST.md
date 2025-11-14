# 백엔드 구현 체크리스트

## 📧 이메일 기능

### ✅ 프론트엔드에서 구현 완료
- [x] 이메일 아이콘 클릭 시 팝업 다이얼로그 표시
- [x] Gmail/Naver 메일 선택 옵션
- [x] 선택한 메일 서비스로 새 탭에서 이동
- [x] 수신자(bluejin1130@gmail.com) 자동 입력

### ⏳ 백엔드 구현 필요 (선택사항)

현재 프론트엔드 구현만으로 완전히 작동합니다. 하지만 다음 기능들을 추가하려면 백엔드가 필요합니다:

#### 1. 직접 이메일 전송 기능
- [ ] **서버 사이드 이메일 발송 API**
  - 사용자가 사이트 내에서 바로 이메일 작성/전송 가능
  - 외부 메일 서비스로 이동하지 않음
  - 필요 기술: Node.js + Nodemailer, SendGrid API, AWS SES 등
  
- [ ] **이메일 템플릿 시스템**
  - 문의 유형별 이메일 템플릿
  - 자동 회신 메일
  
#### 2. 문의 내역 관리
- [ ] **문의 내역 데이터베이스 저장**
  - 발신자 정보, 제목, 내용, 날짜 저장
  - 관리자 대시보드에서 문의 내역 확인
  - 필요 기술: PostgreSQL/MongoDB + Supabase/Firebase
  
#### 3. 스팸 방지
- [ ] **reCAPTCHA 적용**
  - 자동화된 스팸 메일 방지
  - Google reCAPTCHA v3 권장
  
- [ ] **Rate Limiting**
  - 동일 IP에서 반복 전송 제한
  - 필요 기술: Redis + Express-rate-limit

#### 4. 알림 시스템
- [ ] **실시간 알림**
  - 새 문의 시 관리자에게 푸시 알림/SMS 전송
  - 필요 기술: Firebase Cloud Messaging, Twilio

---

## 💡 현재 구현 상태 요약

### ✅ 작동 중인 기능
- 사용자가 이메일 아이콘 클릭
- Gmail 또는 Naver 메일 선택
- 선택한 서비스의 메일 작성 페이지가 새 탭에서 열림
- 수신자(bluejin1130@gmail.com)가 자동으로 입력됨

### 📌 참고사항
현재 프론트엔드 구현은 다음 URL을 사용합니다:
- **Gmail**: `https://mail.google.com/mail/?view=cm&to=bluejin1130@gmail.com`
- **Naver**: `https://mail.naver.com/write/popup?srvid=note&to=bluejin1130@gmail.com`

이 방식은 백엔드 없이 완전히 작동하며, 사용자는 자신의 메일 계정으로 로그인하여 메일을 보낼 수 있습니다.

---

## 📅 우선순위 제안

1. **현재 상태 유지 (권장)**: 백엔드 없이도 완전히 작동
2. **추가 시 우선순위**:
   - Priority 1: 문의 내역 데이터베이스 저장
   - Priority 2: 직접 이메일 전송 기능
   - Priority 3: 스팸 방지 시스템
   - Priority 4: 실시간 알림

---

## 🔧 기술 스택 제안 (백엔드 구축 시)

### 간단한 구현 (Serverless)
- **Vercel Serverless Functions** + **SendGrid API**
- **Netlify Functions** + **Nodemailer**
- **Supabase** (데이터베이스 + Auth + Edge Functions)

### 풀스택 구현
- **Next.js API Routes** + **Prisma** + **PostgreSQL**
- **Express.js** + **MongoDB** + **Redis**
- **NestJS** + **TypeORM** + **PostgreSQL**

---

_이 문서는 현재 프론트엔드 구현 상태와 향후 확장 가능성을 정리한 것입니다._
