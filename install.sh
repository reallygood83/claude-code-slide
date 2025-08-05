#!/bin/bash
set -e

echo "🎯 Claude Code 슬라이드 명령어 설치 중..."

# Claude Code 설치 확인
if ! command -v claude-code &> /dev/null; then
    echo "❌ Claude Code가 설치되지 않았습니다."
    echo "   https://claude.ai/code 에서 설치해주세요."
    exit 1
fi

# 사용자 Claude 설정 디렉토리 찾기
CLAUDE_DIR="$HOME/.claude"
if [ ! -d "$CLAUDE_DIR" ]; then
    echo "❌ Claude 설정 디렉토리를 찾을 수 없습니다."
    exit 1
fi

# CLAUDE.md 파일에 슬라이드 명령어 추가
CLAUDE_MD="$CLAUDE_DIR/../CLAUDE.md"
if [ ! -f "$CLAUDE_MD" ]; then
    CLAUDE_MD="$CLAUDE_DIR/CLAUDE.md"
fi

if [ ! -f "$CLAUDE_MD" ]; then
    echo "📝 CLAUDE.md 파일 생성 중..."
    touch "$CLAUDE_MD"
fi

# 슬라이드 명령어 정의 추가
echo "📋 슬라이드 명령어 정의 추가 중..."
cat >> "$CLAUDE_MD" << 'EOF'

---

## 슬라이드: 명령어 (AI 프레젠테이션 생성기)
사용자가 "슬라이드:" 명령어를 입력하고 유튜브 링크 또는 .md 파일 경로를 제공하면:

### 📋 작업 프로세스
1. **presentation-orchestrator 에이전트 활용**: 전체 슬라이드 생성 워크플로우 관리
2. **슬라이드 테마 디자인**: slide-theme-designer 에이전트로 내용 분석 후 최적 테마 선택
3. **작성자 정보 수집**: 
   - 첫 번째 질문: "작성자 이름과 소속을 알려주세요 (예: 홍길동, ABC회사)"
   - 필수 정보: 이름, 소속 (회사/학교 등)
4. **콘텐츠 분석 및 추천**:
   - 내용의 복잡도와 길이 분석
   - 적정 슬라이드 수 추천 (5-20장 권장)
   - 사용자 확인 후 진행
5. **HTML 슬라이드 생성**:
   - reveal.js 기반 전체화면 HTML 슬라이드
   - 1920x1080px (16:9 비율) PPT 표준 준수
   - 뷰포트 최적화로 노트북 화면 완벽 호환
   - 한국어 콘텐츠 기본 설정

### 📐 뷰포트 최적화 표준 (검증됨)
```css
/* 핵심 최적화 CSS - 모든 슬라이드에 필수 적용 */
.reveal .slides section {
    padding: 5px 40px 20px 40px; /* 상단 5px, 하단 20px */
    height: 100vh; /* 정확한 뷰포트 높이 */
    justify-content: flex-start; /* 상단 정렬 */
}

.reveal h1, .reveal h2, .reveal h3 {
    margin-top: 0 !important; /* 상단 마진 완전 제거 */
}

/* reveal.js 초기화에서 margin: 0 설정 필수 */
```

### 🎨 테마 시스템 (5가지)
1. **Professional Business**: 비즈니스 프레젠테이션용
2. **Developer Education Pro**: 개발자 교육용  
3. **Modern Minimalist**: 심플한 현대적 디자인
4. **Creative Workshop**: 창의적 워크샵용
5. **Academic Research**: 학술 발표용

### 📁 파일 생성 및 저장
- **저장위치**: `~/slides/` (사용자 홈 디렉토리)
- **파일명**: `[제목]_[작성자명]_YYYY-MM-DD.html`
- **브라우저 호환성**: Chrome, Firefox, Safari, Edge 완벽 지원

### 💡 사용 예시
```
슬라이드: https://www.youtube.com/watch?v=abc123
슬라이드: ~/Documents/presentation.md
```

### ✅ 품질 보증
- 노트북 화면 완벽 호환 (1366×768 ~ 1920×1080)
- 상단 여백 최소화 (15px → 5px, 67% 감소)
- 하단 콘텐츠 잘림 완전 해결
- PDF/PPT 변환 완벽 지원

EOF

echo "✅ 슬라이드 명령어가 성공적으로 설치되었습니다!"
echo ""
echo "🎯 사용법:"
echo '   슬라이드: https://www.youtube.com/watch?v=your-video'
echo '   슬라이드: ~/Documents/your-presentation.md'
echo ""
echo "📁 생성된 슬라이드는 ~/slides/ 폴더에 저장됩니다."
echo ""
echo "🔄 Claude Code를 재시작하여 명령어를 활성화해주세요."