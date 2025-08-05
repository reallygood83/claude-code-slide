import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { generateSlides } from "./slideGenerator.js";
import { z } from "zod";

// Tool input schema
const GenerateSlidesSchema = z.object({
  source: z.string().describe("YouTube URL or Markdown file path"),
  author: z.string().describe("Author name"),
  organization: z.string().describe("Organization/Company name"),
  theme: z.enum(["business", "developer", "minimalist", "creative", "academic"])
    .optional()
    .describe("Slide theme (optional, auto-selected if not provided)"),
});

// Create MCP server
const server = new Server(
  {
    name: "claude-slide-generator",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "generate_slides",
        description: "Generate beautiful HTML slides from YouTube URL or Markdown file with AI-powered theme selection and perfect viewport optimization",
        inputSchema: {
          type: "object",
          properties: {
            source: {
              type: "string",
              description: "YouTube URL (https://youtube.com/watch?v=...) or Markdown file path",
            },
            author: {
              type: "string",
              description: "Presenter's name",
            },
            organization: {
              type: "string",
              description: "Organization/Company/School name",
            },
            theme: {
              type: "string",
              enum: ["business", "developer", "minimalist", "creative", "academic"],
              description: "Slide theme (optional - AI will auto-select if not provided)",
            },
          },
          required: ["source", "author", "organization"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "generate_slides") {
    try {
      const args = GenerateSlidesSchema.parse(request.params.arguments);
      
      // Generate slides
      const result = await generateSlides({
        source: args.source,
        author: args.author,
        organization: args.organization,
        theme: args.theme,
      });

      return {
        content: [
          {
            type: "text",
            text: `✅ 슬라이드가 성공적으로 생성되었습니다!

📁 저장 위치: ${result.filePath}
🎨 적용된 테마: ${result.theme}
📊 총 슬라이드 수: ${result.slideCount}
📐 뷰포트 최적화: 적용됨 (상단 여백 67% 감소)

🌐 브라우저에서 열기:
file://${result.filePath}

💡 사용 팁:
- F11: 전체화면 모드
- Space/Arrow: 슬라이드 이동
- Esc: 개요 보기
- S: 발표자 노트

📄 PDF로 변환하기:
1. 브라우저에서 파일 열기
2. Ctrl/Cmd + P (인쇄)
3. 대상: PDF로 저장
4. 설정: 여백 없음, 배경 그래픽 포함`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ 슬라이드 생성 중 오류가 발생했습니다: ${error.message}`,
          },
        ],
      };
    }
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Claude Slide Generator MCP Server started");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});