#!/bin/bash

# 🎯 Claude Slide Generator - 원클릭 설치 스크립트
# 검증된 CLAUDE.md 슬라이드 명령어를 자동으로 설치합니다

set -e

echo "🎯 Claude Slide Generator 설치를 시작합니다..."
echo ""

# Claude Code 설정 디렉토리 확인
CLAUDE_DIR="$HOME/.claude"
CLAUDE_MD="$CLAUDE_DIR/CLAUDE.md"

# .claude 디렉토리가 없으면 생성
if [ ! -d "$CLAUDE_DIR" ]; then
    echo "📁 .claude 디렉토리를 생성합니다..."
    mkdir -p "$CLAUDE_DIR"
fi

# CLAUDE.md 파일이 없으면 생성
if [ ! -f "$CLAUDE_MD" ]; then
    echo "📝 CLAUDE.md 파일을 생성합니다..."
    cat > "$CLAUDE_MD" << 'EOF'
# Claude Code 사용자 설정

EOF
fi

# 기존 슬라이드 명령어가 있는지 확인
if grep -q "## 슬라이드: 명령어" "$CLAUDE_MD" 2>/dev/null; then
    echo "⚠️  기존 슬라이드 명령어를 발견했습니다."
    echo -n "   기존 명령어를 업데이트하시겠습니까? (y/N): "
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "❌ 설치가 취소되었습니다."
        exit 0
    fi
    
    # 기존 슬라이드 명령어 섹션 제거
    echo "🔄 기존 명령어를 제거하고 업데이트합니다..."
    # 임시 파일 사용하여 기존 섹션 제거
    awk '
    /^## 슬라이드: 명령어/ { skip = 1; next }
    /^## / && skip { skip = 0 }
    /^# / && skip { skip = 0 }
    !skip { print }
    ' "$CLAUDE_MD" > "$CLAUDE_MD.tmp" && mv "$CLAUDE_MD.tmp" "$CLAUDE_MD"
fi

echo "📝 검증된 슬라이드 명령어를 추가합니다..."

# 슬라이드 명령어 정의 추가
cat >> "$CLAUDE_MD" << 'EOF'

## 슬라이드: 명령어 (AI 프레젠테이션 생성기)
사용자가 "슬라이드:" 명령어를 입력하고 콘텐츠 소스를 제공하면:

### 📝 작업 프로세스
1. **Time MCP 연동**: `mcp__time-mcp__current_time`으로 현재 날짜와 시간 확인
2. **콘텐츠 처리**: YouTube URL 또는 Markdown 파일에서 내용 추출
3. **AI 테마 선택**: 콘텐츠 분석을 통한 최적 테마 자동 선택
4. **HTML 슬라이드 생성**: reveal.js 기반 완전한 프레젠테이션 생성

### 🎨 AI 테마 시스템 (5가지)
- **business**: 비즈니스, 회사, 전략, 수익 키워드 감지 시
- **developer**: 코드, 프로그래밍, 개발, API, 기술 키워드 감지 시  
- **academic**: 연구, 학습, 분석, 방법론, 결과 키워드 감지 시
- **creative**: 디자인, 창작, 예술, 워크숍, 아이디어 키워드 감지 시
- **minimalist**: 기본 테마 (특별한 키워드 없을 시)

### 📐 뷰포트 최적화 (검증된 솔루션)
모든 슬라이드에 다음 최적화 CSS 적용:
```css
.reveal .slides section {
    padding: 5px 40px 20px 40px !important; /* 상단 5px, 하단 20px */
    height: 100vh !important; /* 정확한 뷰포트 높이 */
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important; /* 상단 정렬로 여백 최소화 */
}

/* 헤더 마진 완전 제거 - 상단 여백 최소화 */
.reveal h1, .reveal h2, .reveal h3, .reveal h4, .reveal h5, .reveal h6 {
    margin-top: 0 !important;
    margin-bottom: 0.5em !important;
}
```

### 📁 파일 생성 및 저장
- **저장 위치**: `~/slides/` 디렉토리
- **파일명**: `[제목]_[작성자명]_YYYY-MM-DD.html`
- **브라우저 호환**: Chrome, Firefox, Safari, Edge 완벽 지원

### 💡 사용법 예시
```
슬라이드: https://www.youtube.com/watch?v=dQw4w9WgXcQ, 김문정, 박달초등학교
슬라이드: ~/Documents/발표자료.md, 홍길동, ABC회사, business
슬라이드: presentation.md, 이수진, 대학교, academic
```

### 🎯 프레젠테이션 기능
- **전체화면**: F11 키
- **슬라이드 이동**: Space/화살표 키
- **개요 보기**: Esc 키  
- **발표자 노트**: S 키
- **PDF 변환**: Ctrl+P → PDF 저장

### 🔧 기술 구현
- **reveal.js 4.3.1**: 최신 프레젠테이션 프레임워크
- **한국어 최적화**: Pretendard + Noto Sans KR 폰트
- **반응형 디자인**: 1366×768 ~ 1920×1080 해상도 지원
- **PPT 호환**: 16:9 비율 표준 준수

EOF

echo ""
echo "✅ 설치가 완료되었습니다!"
echo ""
echo "🎯 사용 방법:"
echo "1. Claude Code 실행"
echo "2. '슬라이드: [YouTube URL/파일경로], [작성자], [소속]' 명령어 사용"
echo ""
echo "📋 예시:"
echo "   슬라이드: https://youtube.com/watch?v=abc123, 김문정, 박달초등학교"
echo "   슬라이드: ~/Documents/발표.md, 홍길동, ABC회사, business"
echo ""
echo "🌐 프로젝트: https://github.com/reallygood83/claude-code-slide"
echo ""
echo "🎉 이제 Claude Code에서 '슬라이드:' 명령어를 사용하실 수 있습니다!"