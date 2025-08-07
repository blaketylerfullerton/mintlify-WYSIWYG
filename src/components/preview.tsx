import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  parseCustomComponents,
  customComponentRenderer,
} from "./custom-markdown-plugin";

interface FrontMatterMeta {
  title?: string;
  description?: string;
  // Allow additional arbitrary keys without breaking
  [key: string]: any;
}

function parseFrontMatter(input: string): { meta: FrontMatterMeta; content: string } {
  // Match YAML front matter at the very start of the document
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*(\n|$)/;
  const match = input.match(frontMatterRegex);

  if (!match) {
    return { meta: {}, content: input };
  }

  const yamlBlock = match[1] || "";
  const remaining = input.slice(match[0].length);

  const meta: FrontMatterMeta = {};

  yamlBlock.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) return;

    // Split on first ':' to allow values that contain ':'
    const parts = line.split(/:(.*)/);
    if (parts.length < 3) return;

    const key = parts[0].trim();
    let value = (parts[1] ?? "").trim();

    // Remove surrounding quotes if any
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    meta[key] = value;
  });

  return { meta, content: remaining };
}

interface PreviewProps {
  markdown: string;
  onChange?: (value: string) => void;
}

export const Preview: React.FC<PreviewProps> = ({ markdown, onChange }) => {
  // Extract front matter (title, description, etc.) and strip from content
  const { meta, content } = React.useMemo(() => parseFrontMatter(markdown), [markdown]);

  // Process custom components before passing to ReactMarkdown
  // Use useMemo to prevent unnecessary re-processing
  const processedMarkdown = React.useMemo(() => {
    return parseCustomComponents(content);
  }, [content]);

  // Optionally set document title from front matter
  React.useEffect(() => {
    if (meta?.title) {
      document.title = meta.title as string;
    }
  }, [meta?.title]);

  // Helpers to safely update the source markdown by editing common elements in the preview
  const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const rebuildWithContent = React.useCallback(
    (originalMarkdown: string, newContent: string) => {
      // If there is front matter, keep it intact and replace only the content part
      const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*(\n|$)/;
      const match = originalMarkdown.match(frontMatterRegex);
      if (match) {
        return originalMarkdown.slice(0, match[0].length) + newContent;
      }
      return newContent;
    },
    []
  );

  const replaceOutsideCodeFences = (source: string, search: string, replacement: string) => {
    if (!search) return source;
    // Find code fence ranges so we avoid replacing within them
    const codeFenceRegex = /```[\s\S]*?```/g;
    const fenceRanges: Array<{ start: number; end: number }> = [];
    let m: RegExpExecArray | null;
    while ((m = codeFenceRegex.exec(source)) !== null) {
      fenceRanges.push({ start: m.index, end: m.index + m[0].length });
    }

    const idx = source.indexOf(search);
    if (idx === -1) return source;
    const inFence = fenceRanges.some((r) => idx >= r.start && idx < r.end);
    if (inFence) return source; // skip if first match is inside code fence
    return source.slice(0, idx) + replacement + source.slice(idx + search.length);
  };

  const applyEdit = React.useCallback(
    (params: { type: "heading" | "paragraph" | "list" | "meta-title" | "meta-description"; oldText: string; newText: string; level?: number }) => {
      if (!onChange) return;
      const { type, oldText, newText, level } = params;
      let updatedContent = content;
      let nextMarkdown = markdown;

      if (type === "heading" && level) {
        const pattern = new RegExp(`^${"#".repeat(level)}\\s+${escapeRegExp(oldText)}\\s*$`, "m");
        updatedContent = updatedContent.replace(pattern, `${"#".repeat(level)} ${newText}`);
        nextMarkdown = rebuildWithContent(markdown, updatedContent);
      } else if (type === "list") {
        const pattern = new RegExp(`^(\\s*(?:[-*+]|\\d+\.)\\s+)${escapeRegExp(oldText)}\\s*$`, "m");
        updatedContent = updatedContent.replace(pattern, `$1${newText}`);
        nextMarkdown = rebuildWithContent(markdown, updatedContent);
      } else if (type === "meta-title" || type === "meta-description") {
        const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*(\n|$)/;
        const hasFrontMatter = frontMatterRegex.test(markdown);
        if (hasFrontMatter) {
          nextMarkdown = markdown.replace(frontMatterRegex, (_m, yamlBlock, trailingNewline) => {
            const lines = String(yamlBlock)
              .split(/\r?\n/)
              .filter(Boolean);
            const key = type === "meta-title" ? "title" : "description";
            let found = false;
            const updatedLines = lines.map((line) => {
              if (line.trim().startsWith(`${key}:`)) {
                found = true;
                return `${key}: "${newText}"`;
              }
              return line;
            });
            if (!found) {
              updatedLines.push(`${key}: "${newText}"`);
            }
            return `---\n${updatedLines.join("\n")}\n---${trailingNewline || "\n"}`;
          });
        } else {
          const key = type === "meta-title" ? "title" : "description";
          nextMarkdown = `---\n${key}: "${newText}"\n---\n` + markdown;
        }
      } else {
        // paragraph or fallback: replace first occurrence outside code fences
        updatedContent = replaceOutsideCodeFences(updatedContent, oldText, newText);
        nextMarkdown = rebuildWithContent(markdown, updatedContent);
      }

      onChange(nextMarkdown);
    },
    [content, markdown, onChange, rebuildWithContent]
  );

  const useEditableHandlers = (type: "heading" | "paragraph" | "list", level?: number) => {
    const originalTextRef = React.useRef<string>("");
    return {
      contentEditable: true,
      suppressContentEditableWarning: true,
      onFocus: (e: React.FocusEvent<HTMLElement>) => {
        originalTextRef.current = (e.currentTarget.innerText || "").trim();
      },
      onBlur: (e: React.FocusEvent<HTMLElement>) => {
        const newText = (e.currentTarget.innerText || "").trim();
        const oldText = originalTextRef.current;
        if (newText !== oldText) {
          applyEdit({ type, oldText, newText, level });
        }
      },
      onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
        // Commit on Enter without inserting newline
        if (e.key === "Enter") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      },
    } as const;
  };

  return (
    <div className="w-1/2 overflow-auto bg-white relative">
      <div className="absolute inset-0 overflow-auto">
        <div className="p-4 prose prose-gray max-w-none">
          {(meta.title || meta.description) && (
            <div className="mb-6">
              {meta.title && (
                <h1
                  className="text-3xl font-bold text-gray-900 mb-2 mt-2"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newText = (e.currentTarget.innerText || "").trim();
                    if (newText && newText !== String(meta.title)) {
                      applyEdit({ type: "meta-title", oldText: String(meta.title), newText });
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      (e.currentTarget as HTMLElement).blur();
                    }
                  }}
                >
                  {meta.title}
                </h1>
              )}
              {meta.description && (
                <p
                  className="text-gray-600 mb-0 leading-relaxed"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newText = (e.currentTarget.innerText || "").trim();
                    if (newText && newText !== String(meta.description)) {
                      applyEdit({ type: "meta-description", oldText: String(meta.description), newText });
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      (e.currentTarget as HTMLElement).blur();
                    }
                  }}
                >
                  {meta.description}
                </p>
              )}
            </div>
          )}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              // Include custom component renderer
              ...customComponentRenderer,
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-md"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              blockquote({ children }) {
                return (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 bg-blue-50 py-2 my-4">
                    {children}
                  </blockquote>
                );
              },
              h1({ children }) {
                const editable = useEditableHandlers("heading", 1);
                return (
                  <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-6" {...editable}>
                    {children}
                  </h1>
                );
              },
              h2({ children }) {
                const editable = useEditableHandlers("heading", 2);
                return (
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-5" {...editable}>
                    {children}
                  </h2>
                );
              },
              h3({ children }) {
                const editable = useEditableHandlers("heading", 3);
                return (
                  <h3 className="text-xl font-medium text-gray-800 mb-2 mt-4" {...editable}>
                    {children}
                  </h3>
                );
              },
              p({ children }) {
                const editable = useEditableHandlers("paragraph");
                return (
                  <p className="text-gray-700 mb-4 leading-relaxed" {...editable}>
                    {children}
                  </p>
                );
              },
              ul({ children }) {
                return (
                  <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">
                    {children}
                  </ul>
                );
              },
              ol({ children }) {
                return (
                  <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-1">
                    {children}
                  </ol>
                );
              },
              li({ children }) {
                const editable = useEditableHandlers("list");
                return (
                  <li className="ml-2" {...editable}>
                    {children}
                  </li>
                );
              },
              a({ href, children }) {
                return (
                  <a
                    href={href}
                    className="text-blue-600 hover:text-blue-800 underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                );
              },
              img({ src, alt }) {
                return (
                  <img
                    src={src}
                    alt={alt}
                    className="max-w-full h-auto rounded-lg shadow-md my-4"
                  />
                );
              },
              table({ children }) {
                return (
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full border-collapse border border-gray-300">
                      {children}
                    </table>
                  </div>
                );
              },
              th({ children }) {
                return (
                  <th className="border border-gray-300 bg-gray-50 px-4 py-2 text-left font-semibold text-gray-900">
                    {children}
                  </th>
                );
              },
              td({ children }) {
                return (
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {children}
                  </td>
                );
              },
            }}
          >
            {processedMarkdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
