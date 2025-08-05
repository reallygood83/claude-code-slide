# 🎯 Claude Slide Generator

Claude Code용 AI 기반 슬라이드 생성 명령어 - 완벽한 뷰포트 최적화와 함께

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Powered%20by-Claude%20Code-blue.svg)](https://claude.ai/code)

## ✨ 주요 특징

- 🎬 **YouTube/Markdown → HTML 슬라이드 자동 변환**
- 🎨 **AI 기반 테마 자동 선택** (5가지 전문 테마)
- 📱 **완벽한 뷰포트 최적화** (노트북 화면 100% 호환)
- 🌐 **reveal.js 기반** 전체화면 프레젠테이션
- 🇰🇷 **한국어 최적화** 폰트 및 레이아웃
- 📄 **PDF/PPT 변환 지원**
- ⚡ **원클릭 설치** - 복잡한 설정 불필요

## 🚀 원클릭 설치 (30초 완료!)

### macOS/Linux
```bash
curl -fsSL https://raw.githubusercontent.com/reallygood83/claude-code-slide/main/install.sh | bash
```

### Windows (Git Bash/WSL)
```bash
curl -fsSL https://raw.githubusercontent.com/reallygood83/claude-code-slide/main/install.sh | bash
```

### 수동 설치
```bash
# 저장소 클론
git clone https://github.com/reallygood83/claude-code-slide.git
cd claude-code-slide

# 설치 스크립트 실행
chmod +x install.sh
./install.sh
```

## 🎯 사용법

Claude Code에서 `슬라이드:` 명령어 사용:

### YouTube 슬라이드 생성
```
슬라이드: https://www.youtube.com/watch?v=dQw4w9WgXcQ, 김문정, 박달초등학교
```

### Markdown 슬라이드 생성
```
슬라이드: ~/Documents/presentation.md, 홍길동, ABC회사, business
```

### 명령어 구조
```
슬라이드: [소스], [작성자명], [소속], [테마(선택)]
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
슬라이드: content.md, 김문정, 회사명, developer
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

## 🛠️ 기술 스택

- **reveal.js 4.3.1**: 프레젠테이션 프레임워크
- **Claude Code**: AI 기반 개발 환경
- **Bash**: 자동 설치 스크립트

## 📋 설치 과정

### 자동 수행 작업
1. **환경 확인**: Claude Code 설정 디렉토리 검색
2. **CLAUDE.md 생성**: 없으면 자동 생성
3. **명령어 추가**: 검증된 슬라이드 명령어 정의 추가
4. **중복 방지**: 기존 명령어 감지 및 업데이트 확인

### 설치 후 확인
```bash
# Claude Code에서 테스트
슬라이드: 테스트, 내이름, 내회사
```

## 🔧 문제 해결

### 설치 문제
```bash
# 권한 문제 시
chmod +x install.sh
sudo ./install.sh
```

### 명령어 인식 안됨
1. Claude Code 재시작
2. `~/.claude/CLAUDE.md` 파일 확인
3. "## 슬라이드: 명령어" 섹션 존재 확인

## 📝 변경 이력

### v1.0.0 (2025-08-05)
- ✨ 원클릭 설치 스크립트 구현
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

---

**⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!**

[🚀 원클릭 설치](#원클릭-설치-30초-완료) | [📖 사용법](#사용법) | [🐛 버그 리포트](https://github.com/reallygood83/claude-code-slide/issues/new)