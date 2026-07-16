# 📅 Paul Bhang Schedule

**Paul Bhang** 개인용 스케줄러 — 중국 대학 + 온라인 수업 + 개인 일정을 한 곳에서 관리합니다.

---

## ✨ 기능

| 기능 | 설명 |
|------|------|
| **오늘 일정** | 오늘 수업/일정 카드로 한눈에 확인 |
| **주간 시간표** | 월~일 시간표 그리드 뷰 |
| **월간 캘린더** | 달력에 일정 점(dot)으로 표시, 날짜 탭하면 상세 보기 |
| **🎤 음성 입력** | "내일 오후 3시 수업 추가" 같이 말하면 자동 인식 |
| **추가/변경/삭제** | 수동 폼 또는 음성으로 CRUD |
| **실시간 동기화** | Supabase 연결 시 Android ↔ Windows 즉시 반영 |
| **PWA** | Chrome/Edge에서 "홈 화면에 추가" → 네이티브 앱처럼 사용 |

---

## 🚀 설치 방법

### 1. 파일 받기
이 폴더의 3개 파일을 동일한 경로에 두세요:
- `index.html`
- `manifest.json`
- `sw.js`

### 2. 로컬에서 실행 (Windows)
**방법 A: 간단**
```
index.html 파일을 더블클릭하면 Chrome/Edge에서 열립니다.
```

**방법 B: 로컬 서버 (권장)**
VS Code에서 **Live Server** 확장 프로그램 설치 후 `index.html` 우클릭 → "Open with Live Server"

### 3. PWA 설치 (Android & Windows)
1. Chrome/Edge에서 페이지 열기
2. 주소창 오른쪽 **➕ 설치 아이콘** 클릭 (또는 메뉴 → "홈 화면에 추가")
3. "Paul Bhang Schedule" 앱이 설치됩니다
4. 이제 오프라인에서도 사용 가능!

---

## 🔗 Supabase 실시간 동기화 설정

### 1. Supabase 가입
https://supabase.com 에서 GitHub 계정으로 무료 가입

### 2. 프로젝트 생성
- "New Project" → 이름: `paul-schedule` → Region: `Seoul` (한국/중국 접근 가장 빠름)
- Database Password 설정
- Create

### 3. 테이블 생성
SQL Editor에서 아래 SQL 실행:

```sql
CREATE TABLE schedules (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  date TEXT,
  day TEXT,
  start TEXT,
  end TEXT,
  type TEXT DEFAULT 'personal',
  loc TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON schedules
  FOR ALL USING (true) WITH CHECK (true);
```

### 4. API Key 복사
- Project Settings → API
- `URL` 복사 (예: `https://xxxxx.supabase.co`)
- `anon public` API Key 복사
- 앱 "관리" 탭에 붙여넣고 "연결하기" 클릭

---

## 🎤 음성 명령어 가이드

| 목적 | 예시 |
|------|------|
| **추가** | "내일 오후 3시 한국어 회화 추가해줘" |
| **추가** | "월요일에 Ingrid 수업 4시반으로 등록" |
| **변경** | "월요일 Ingrid 수업 5시로 바꿔줘" |
| **삭제** | "목요일 Veronica 수업 취소해줘" |
| **조회** | "이번 주 일정 뭐 있어?" |
| **조회** | "오늘 뭐 해야 돼?" |

---

## 🛠️ 기술 스택

- **프론트엔드**: HTML5 + CSS3 + Vanilla JS (PWA)
- **동기화**: Supabase (PostgreSQL + Realtime)
- **음성 인식**: Web Speech API (Chrome/Edge 내장)
- **NLP**: 규칙 기반 자연어 파싱 (JavaScript)
- **오프라인**: Service Worker + Cache API

---

## ⚠️ 알려진 제한

- **음성 인식**: Android Chrome/Edge, Windows Chrome/Edge에서만 지원. Safari는 지원 불확실.
- **중국 접근**: VPN 연결 시 Supabase/Gemini 모두 정상 동작. VPN 없으면 로컬 모드로 사용.
- **알림**: 브라우저 푸시 알림은 PWA 설치 후에만 작동.

---

## 📝 파일 구조

```
paul-schedule/
├── index.html       # 메인 앱 (모든 기능 포함)
├── manifest.json    # PWA 설치 설정
├── sw.js            # Service Worker (오프라인 캐시)
└── README.md        # 이 파일
```

---

## 🔄 버전

**v1.0** — 2026.07.14
- 실시간 동기화, 음성 입력, PWA 지원

---

만든이: Paul Bhang
