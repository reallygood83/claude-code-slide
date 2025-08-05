#!/bin/bash

echo "🗑️ Claude Code 슬라이드 명령어 제거 중..."

CLAUDE_MD="$HOME/.claude/../CLAUDE.md"
if [ ! -f "$CLAUDE_MD" ]; then
    CLAUDE_MD="$HOME/.claude/CLAUDE.md"
fi

if [ -f "$CLAUDE_MD" ]; then
    # 슬라이드 명령어 섹션 제거
    sed -i.bak '/## 슬라이드: 명령어/,/^$/d' "$CLAUDE_MD"
    echo "✅ 슬라이드 명령어가 제거되었습니다."
else
    echo "❌ CLAUDE.md 파일을 찾을 수 없습니다."
fi

echo "🔄 Claude Code를 재시작해주세요."