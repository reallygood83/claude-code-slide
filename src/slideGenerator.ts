import * as fs from "fs/promises";
import * as path from "path";
import { homedir } from "os";

interface SlideGenerationOptions {
  source: string;
  author: string;
  organization: string;
  theme?: string;
}

interface SlideGenerationResult {
  filePath: string;
  theme: string;
  slideCount: number;
}

// AI-powered theme selection based on content analysis
function selectTheme(content: string, userTheme?: string): string {
  if (userTheme) return userTheme;

  const businessKeywords = ['business', 'company', 'revenue', 'profit', 'strategy', 'market', 'sales'];
  const developerKeywords = ['code', 'programming', 'development', 'api', 'framework', 'technical', 'software'];
  const academicKeywords = ['research', 'study', 'analysis', 'methodology', 'findings', 'conclusion', 'paper'];
  const creativeKeywords = ['design', 'creative', 'art', 'workshop', 'brainstorm', 'innovation', 'ideas'];

  const lowerContent = content.toLowerCase();

  const scores = {
    business: businessKeywords.filter(keyword => lowerContent.includes(keyword)).length,
    developer: developerKeywords.filter(keyword => lowerContent.includes(keyword)).length,
    academic: academicKeywords.filter(keyword => lowerContent.includes(keyword)).length,
    creative: creativeKeywords.filter(keyword => lowerContent.includes(keyword)).length,
    minimalist: 0
  };

  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return 'minimalist';

  return Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] || 'minimalist';
}

// Generate optimized CSS for perfect viewport compatibility
function generateOptimizedCSS(theme: string): string {
  const themeColors = {
    business: { primary: '#1e40af', secondary: '#3b82f6', accent: '#60a5fa', bg: '#f8fafc' },
    developer: { primary: '#059669', secondary: '#10b981', accent: '#34d399', bg: '#f0fdf4' },
    minimalist: { primary: '#374151', secondary: '#6b7280', accent: '#9ca3af', bg: '#ffffff' },
    creative: { primary: '#7c3aed', secondary: '#a855f7', accent: '#c084fc', bg: '#faf5ff' },
    academic: { primary: '#dc2626', secondary: '#ef4444', accent: '#f87171', bg: '#fef2f2' }
  };

  const colors = themeColors[theme] || themeColors.minimalist;

  return `
    <style>
      /* 핵심 뷰포트 최적화 - 검증된 솔루션 */
      .reveal .slides section {
        padding: 5px 40px 20px 40px !important; /* 상단 5px, 하단 20px */
        height: 100vh !important; /* 정확한 뷰포트 높이 */
        display: flex !important;
        flex-direction: column !important;
        justify-content: flex-start !important; /* 상단 정렬로 여백 최소화 */
        box-sizing: border-box !important;
      }

      /* 헤더 마진 완전 제거 - 상단 여백 최소화 */
      .reveal h1, .reveal h2, .reveal h3, .reveal h4, .reveal h5, .reveal h6 {
        margin-top: 0 !important;
        margin-bottom: 0.5em !important;
      }

      /* reveal.js 컨테이너 최적화 */
      .reveal .slides {
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
      }

      /* 테마별 색상 적용 */
      .reveal {
        font-family: 'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
        background: ${colors.bg};
        color: ${colors.primary};
      }

      .reveal h1, .reveal h2, .reveal h3 {
        color: ${colors.primary};
        font-weight: 700;
      }

      .reveal .slides section {
        background: ${colors.bg};
        border: none;
        box-shadow: none;
      }

      .reveal .progress {
        color: ${colors.accent};
      }

      /* 한국어 폰트 최적화 */
      @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

      /* 반응형 텍스트 크기 */
      .reveal h1 { font-size: 2.5em; line-height: 1.2; }
      .reveal h2 { font-size: 1.8em; line-height: 1.3; }
      .reveal h3 { font-size: 1.4em; line-height: 1.4; }
      .reveal p, .reveal li { font-size: 1.1em; line-height: 1.6; }

      /* 리스트 스타일 개선 */
      .reveal ul, .reveal ol {
        margin-left: 1em;
      }

      .reveal li {
        margin-bottom: 0.5em;
      }

      /* 강조 텍스트 */
      .reveal strong, .reveal b {
        color: ${colors.secondary};
        font-weight: 600;
      }

      /* 코드 블록 (개발자 테마용) */
      .reveal code {
        background: ${colors.primary}20;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
      }

      .reveal pre {
        background: ${colors.primary}10;
        padding: 1em;
        border-radius: 8px;
        font-size: 0.8em;
      }
    </style>
  `;
}

// Extract content from YouTube URL (mock implementation)
async function extractYouTubeContent(url: string): Promise<{ title: string; content: string }> {
  // In real implementation, this would use YouTube API or transcript extraction
  // For now, return mock data
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
  
  return {
    title: `YouTube Video Content - ${videoId}`,
    content: `This is extracted content from YouTube video ${videoId}. In a real implementation, this would contain the actual transcript or video description.`
  };
}

// Read Markdown file
async function readMarkdownFile(filePath: string): Promise<{ title: string; content: string }> {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(filePath);
  const content = await fs.readFile(absolutePath, 'utf-8');
  
  // Extract title from first heading or filename
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch?.[1] || path.basename(filePath, path.extname(filePath));
  
  return { title, content };
}

// Generate HTML slides
function generateSlidesHTML(options: {
  title: string;
  content: string;
  author: string;
  organization: string;
  theme: string;
}): string {
  const { title, content, author, organization, theme } = options;
  const css = generateOptimizedCSS(theme);
  
  // Convert content to slides (basic implementation)
  const slides = content
    .split(/\n\n+/)
    .filter(section => section.trim())
    .map(section => {
      const lines = section.trim().split('\n');
      const firstLine = lines[0];
      
      // Check if it's a heading
      if (firstLine.startsWith('#')) {
        const level = firstLine.match(/^#+/)?.[0].length || 1;
        const headingText = firstLine.replace(/^#+\s*/, '');
        const content = lines.slice(1).join('\n').trim();
        
        return `
          <section>
            <h${Math.min(level, 3)}>${headingText}</h${Math.min(level, 3)}>
            ${content ? `<div>${content.replace(/\n/g, '<br>')}</div>` : ''}
          </section>
        `;
      }
      
      return `
        <section>
          <div>${section.replace(/\n/g, '<br>')}</div>
        </section>
      `;
    })
    .join('');

  const currentDate = new Date().toLocaleDateString('ko-KR');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/dist/reveal.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/dist/theme/white.css">
  ${css}
</head>
<body>
  <div class="reveal">
    <div class="slides">
      <!-- 타이틀 슬라이드 -->
      <section>
        <h1>${title}</h1>
        <p style="margin-top: 2em;">
          <strong>${author}</strong><br>
          ${organization}<br>
          <small>${currentDate}</small>
        </p>
      </section>
      
      <!-- 내용 슬라이드 -->
      ${slides}
      
      <!-- 마무리 슬라이드 -->
      <section>
        <h2>감사합니다</h2>
        <p style="margin-top: 2em;">
          <strong>${author}</strong><br>
          ${organization}
        </p>
      </section>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/dist/reveal.js"></script>
  <script>
    Reveal.initialize({
      hash: true,
      controls: true,
      progress: true,
      center: false, // 중앙 정렬 비활성화 (상단 정렬 사용)
      margin: 0, // 여백 완전 제거
      width: 1920,
      height: 1080,
      minScale: 0.2,
      maxScale: 2.0,
      transition: 'slide',
      transitionSpeed: 'default',
      backgroundTransition: 'fade'
    });
  </script>
</body>
</html>
  `;
}

export async function generateSlides(options: SlideGenerationOptions): Promise<SlideGenerationResult> {
  let title: string;
  let content: string;

  // Extract content based on source type
  if (options.source.includes('youtube.com') || options.source.includes('youtu.be')) {
    const extracted = await extractYouTubeContent(options.source);
    title = extracted.title;
    content = extracted.content;
  } else {
    const extracted = await readMarkdownFile(options.source);
    title = extracted.title;
    content = extracted.content;
  }

  // AI-powered theme selection
  const selectedTheme = selectTheme(content, options.theme);

  // Generate HTML
  const html = generateSlidesHTML({
    title,
    content,
    author: options.author,
    organization: options.organization,
    theme: selectedTheme,
  });

  // Save file
  const slidesDir = path.join(homedir(), 'slides');
  await fs.mkdir(slidesDir, { recursive: true });
  
  const sanitizedTitle = title.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_');
  const currentDate = new Date().toISOString().split('T')[0];
  const fileName = `${sanitizedTitle}_${options.author}_${currentDate}.html`;
  const filePath = path.join(slidesDir, fileName);
  
  await fs.writeFile(filePath, html, 'utf-8');

  // Count slides
  const slideCount = (html.match(/<section>/g) || []).length;

  return {
    filePath,
    theme: selectedTheme,
    slideCount,
  };
}