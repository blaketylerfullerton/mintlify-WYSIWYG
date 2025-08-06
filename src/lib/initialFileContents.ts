import { claudeCodeContent } from "../mdx-files/claude-code";
import { cursorContent } from "../mdx-files/cursor";
import { windsurfContent } from "../mdx-files/windsurf";
import { introductionContent } from "../mdx-files/introduction";
import { customComponents } from "../mdx-files/custom-components";
export interface FileConfig {
  path: string;
  title: string;
  folder: string;
  tags?: string[];
}

export const fileConfigs: Record<string, FileConfig> = {
  "custom-components.mdx": {
    path: "blakes-mintlify-app/custom-components.mdx",
    title: "Custom Components",
    folder: "blakes-mintlify-app",
  },
  "claude-code.mdx": {
    path: "ai-tools/claude-code.mdx",
    title: "Claude Code Guide",
    folder: "ai-tools",
    tags: ["ai", "coding", "claude"],
  },
  "cursor.mdx": {
    path: "ai-tools/cursor.mdx",
    title: "Cursor Editor Guide",
    folder: "ai-tools",
    tags: ["editor", "ai", "cursor"],
  },
  "windsurf.mdx": {
    path: "ai-tools/windsurf.mdx",
    title: "Windsurf IDE Guide",
    folder: "ai-tools",
    tags: ["ide", "ai", "collaboration"],
  },
  "introduction.mdx": {
    path: "api-reference/introduction.mdx",
    title: "Introduction",
    folder: "api-reference",
  },
};

// Helper function to get file content (can be extended to load from actual files)
export async function getFileContent(fileName: string): Promise<string> {
  const config = fileConfigs[fileName];
  if (!config) {
    throw new Error(`File configuration not found: ${fileName}`);
  }

  // For now, return template content - can be extended to load from actual files
  return getTemplateContent(fileName, config);
}

function getTemplateContent(fileName: string, config: FileConfig): string {
  switch (fileName) {
    case "claude-code.mdx":
      return claudeCodeContent.replace(
        "# Claude Code Guide",
        `# ${config.title}`
      );

    case "cursor.mdx":
      return cursorContent.replace(
        "# Cursor Editor Guide",
        `# ${config.title}`
      );

    case "windsurf.mdx":
      return windsurfContent.replace(
        "# Windsurf IDE Guide",
        `# ${config.title}`
      );

    case "custom-components.mdx":
      return customComponents.replace(
        "# Custom Components",
        `# ${config.title}`
      );

    case "introduction.mdx":
      return introductionContent.replace("# Introduction", `# ${config.title}`);

    default:
      return `# ${config.title}

## Getting Started
This is a new document. Start writing your content here...`;
  }
}

// Helper functions for working with file configurations
export function getFilesByFolder(folder: string): FileConfig[] {
  return Object.values(fileConfigs).filter(
    (config) => config.folder === folder
  );
}

export function getAllFolders(): string[] {
  return [
    ...new Set(Object.values(fileConfigs).map((config) => config.folder)),
  ];
}

export function createNewFileConfig(
  fileName: string,
  config: Omit<FileConfig, "path">
): void {
  fileConfigs[fileName] = {
    ...config,
    path: `${config.folder}/${fileName}`,
  };
}
