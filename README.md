# 🎯 Claude Slide Generator MCP Server

Claude Code용 AI 기반 슬라이드 생성 MCP 서버 - 완벽한 뷰포트 최적화와 함께

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP](https://img.shields.io/badge/MCP-Compatible-blue.svg)](https://modelcontextprotocol.io)
[![Claude Code](https://img.shields.io/badge/Powered%20by-Claude%20Code-blue.svg)](https://claude.ai/code)

## ✨ 주요 특징

- 🎬 **YouTube/Markdown → HTML 슬라이드 자동 변환**
- 🎨 **AI 기반 테마 자동 선택** (5가지 전문 테마)
- 📱 **완벽한 뷰포트 최적화** (노트북 화면 100% 호환)
- 🌐 **reveal.js 기반** 전체화면 프레젠테이션
- 🇰🇷 **한국어 최적화** 폰트 및 레이아웃
- 📄 **PDF/PPT 변환 지원**
- 🔧 **MCP 서버** - Claude Code 네이티브 통합

## 🚀 설치 방법

### 1단계: MCP 서버 설치
```bash
npm install -g @reallygood83/claude-slide-mcp
```

### 2단계: Claude Code 설정
`~/.claude-code-mcp.json` 파일에 다음 내용 추가:

```json
{
  "mcpServers": {
    "claude-slide-generator": {
      "command": "claude-slide-mcp",
      "args": []
    }
  }
}
```

### 3단계: Claude Code 재시작
```bash
claude-code --restart
```

## 🎯 사용법

Claude Code에서 MCP 도구를 직접 호출:

### YouTube 슬라이드 생성
```
YouTube 링크로 슬라이드를 생성해주세요:
- 소스: https://www.youtube.com/watch?v=dQw4w9WgXcQ
- 작성자: 김문정
- 소속: 박달초등학교
```

### Markdown 슬라이드 생성
```
Markdown 파일로 슬라이드를 생성해주세요:
- 소스: ~/Documents/presentation.md
- 작성자: 홍길동
- 소속: ABC 회사
- 테마: business
```

### MCP 도구 직접 호출
```typescript
// Claude Code에서 자동으로 감지되어 사용 가능
generate_slides({
  source: "https://youtube.com/watch?v=abc123",
  author: "김문정",
  organization: "박달초등학교",
  theme: "developer" // 선택사항
})
```

## 🎨 AI 테마 시스템

### 자동 테마 선택
AI가 콘텐츠를 분석하여 최적의 테마를 자동 선택합니다:

- **Business** - 비즈니스 키워드 감지 시
- **Developer** - 기술/개발 키워드 감지 시  
- **Academic** - 연구/학술 키워드 감지 시
- **Creative** - 창작/디자인 키워드 감지 시
- **Minimalist** - 기본 테마 (키워드 없을 시)

### 수동 테마 지정
원하는 테마를 직접 지정할 수도 있습니다:
```
테마: business | developer | minimalist | creative | academic
```

## 📐 뷰포트 최적화 기술

### ✅ 검증된 최적화 결과
- **상단 여백 최소화**: 15px → 5px (67% 감소)
- **하단 콘텐츠 보호**: 내용 잘림 현상 완전 해결
- **정확한 높이 활용**: 100vh 뷰포트 높이 정확 적용
- **다중 해상도 지원**: 1366×768 ~ 1920×1080

### 🔧 핵심 최적화 CSS
```css
.reveal .slides section {
    padding: 5px 40px 20px 40px !important;
    height: 100vh !important;
    justify-content: flex-start !important;
}

.reveal h1, .reveal h2, .reveal h3 {
    margin-top: 0 !important;
}
```

## 📊 MCP 도구 명세

### `generate_slides`
HTML 슬라이드를 생성하는 주요 도구입니다.

#### 입력 매개변수
```typescript
{
  source: string;        // YouTube URL 또는 Markdown 파일 경로
  author: string;        // 발표자 이름
  organization: string;  // 소속 기관/회사명
  theme?: string;        // 테마 (선택사항, AI 자동 선택)
}
```

#### 출력 결과
- 생성된 HTML 파일 경로
- 적용된 테마 정보
- 총 슬라이드 수
- 사용 팁 및 PDF 변환 가이드

## 🛠️ 기술 스택

- **MCP SDK**: Model Context Protocol 서버
- **reveal.js 4.3.1**: 프레젠테이션 프레임워크
- **TypeScript**: 타입 안전성
- **Node.js**: 런타임 환경

## 📁 생성 파일

### 저장 위치
`~/slides/` 디렉토리에 자동 저장

### 파일명 규칙
`[제목]_[작성자명]_YYYY-MM-DD.html`

### 브라우저 호환성
- ✅ Chrome, Firefox, Safari, Edge
- ✅ 모든 현대적 웹 브라우저 지원

## 💡 사용 팁

### 프레젠테이션 조작
- **F11**: 전체화면 모드
- **Space/화살표**: 슬라이드 이동
- **Esc**: 슬라이드 개요 보기
- **S**: 발표자 노트 모드

### PDF 변환
1. 브라우저에서 생성된 HTML 파일 열기
2. **Ctrl/Cmd + P** (인쇄 메뉴)
3. **대상**: PDF로 저장 선택
4. **설정**: 여백 없음, 배경 그래픽 포함

## 🤝 개발 및 기여

### 로컬 개발 환경 설정
```bash
# 저장소 클론
git clone https://github.com/reallygood83/claude-code-slide.git
cd claude-code-slide

# 의존성 설치
npm install

# 개발 모드 실행
npm run dev

# 빌드
npm run build
```

### MCP 서버 테스트
```bash
# 로컬에서 MCP 서버 시작
npm start

# Claude Code 설정에서 로컬 경로 사용
{
  "mcpServers": {
    "claude-slide-generator": {
      "command": "node",
      "args": ["./dist/index.js"]
    }
  }
}
```

## 📝 변경 이력

### v1.0.0 (2025-08-05)
- ✨ MCP 서버 첫 릴리스
- 🎨 AI 기반 테마 자동 선택
- 📱 완벽한 뷰포트 최적화
- 🇰🇷 한국어 폰트 최적화
- 📄 PDF/PPT 변환 지원

## 📞 지원 및 문의

- **GitHub Issues**: [버그 리포트](https://github.com/reallygood83/claude-code-slide/issues)
- **GitHub Discussions**: [기능 요청 및 질문](https://github.com/reallygood83/claude-code-slide/discussions)
- **Email**: reallygood83@gmail.com

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

## 🙏 감사의 말

- **Claude Code 팀**: 훌륭한 AI 개발 환경 제공
- **reveal.js**: 강력한 프레젠테이션 프레임워크
- **MCP 프로토콜**: 확장 가능한 AI 도구 생태계

---

**⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!**

[🎯 MCP 서버 설치](https://www.npmjs.com/package/@reallygood83/claude-slide-mcp) | [📖 상세 가이드](https://github.com/reallygood83/claude-code-slide/wiki) | [🐛 버그 리포트](https://github.com/reallygood83/claude-code-slide/issues/new)