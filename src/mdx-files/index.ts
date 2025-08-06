import { claudeCodeContent } from "./claude-code.tsx";
import { cursorContent } from "./cursor.tsx";
import { windsurfContent } from "./windsurf.tsx";
import { introductionContent } from "./introduction.tsx";
import { customComponents } from "./custom-components.tsx";
// Re-export all content
export {
  claudeCodeContent,
  cursorContent,
  windsurfContent,
  introductionContent,
  customComponents,
};

// Re-export all content as a single object for convenience
export const mdxContents = {
  claudeCode: claudeCodeContent,
  cursor: cursorContent,
  windsurf: windsurfContent,
  introduction: introductionContent,
  customComponents: customComponents,
} as const;

// Export content by file name for dynamic access
export const contentByFileName: Record<string, string> = {
  "claude-code.mdx": claudeCodeContent,
  "cursor.mdx": cursorContent,
  "windsurf.mdx": windsurfContent,
  "introduction.mdx": introductionContent,
  "custom-components.mdx": customComponents,
};
