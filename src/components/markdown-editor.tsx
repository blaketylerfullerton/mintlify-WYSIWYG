import React, { useState, useCallback, useRef } from "react";

import { Toolbar } from "./toolbar";
import { generateMegaMarkdown } from "../utils/test-content-generator";
import { Preview } from "./preview";
export interface MarkdownEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialValue = `# Welcome to the Markdown Editor

Start typing your **markdown** here!

## Features

- Live preview
- Syntax highlighting
- WYSIWYG toolbar
- Responsive design
- **Custom Components** (Notes and Callouts)

## Custom Components

### Notes
You can create different types of notes:

:::note type="info" title="Information"
This is an informational note. Perfect for providing additional context or helpful tips.
:::

:::note type="warning" title="Important Warning"
This is a warning note. Use this to highlight important information that users should pay attention to.
:::

:::note type="success" title="Success!"
This is a success note. Great for confirmation messages or positive feedback.
:::

:::note type="error" title="Error"
This is an error note. Use this for error messages or critical warnings.
:::

### Callouts
Create eye-catching callouts with custom emojis:

:::callout emoji="💡" title="Pro Tip"
Use callouts to highlight important information or provide helpful tips that stand out from regular content.
:::

:::callout emoji="🚀" title="Getting Started"
Custom components make your documentation more engaging and easier to read!
:::

## Code Examples

\`\`\`javascript
const example = "Hello World!";
console.log(example);
\`\`\`

> This is a blockquote example

### Links and Images

[Visit GitHub](https://github.com)

![Sample Image](https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400)`,
  onChange,
  className = "",
}) => {
  const [markdown, setMarkdown] = useState(initialValue);
  const [showPreview, setShowPreview] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleMarkdownChange = useCallback(
    (value: string) => {
      setMarkdown(value);
      onChange?.(value);
    },
    [onChange]
  );

  const insertText = useCallback(
    (before: string, after: string = "", placeholder: string = "") => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = markdown.substring(start, end);
      const replacement = selectedText || placeholder;

      const newText =
        markdown.substring(0, start) +
        before +
        replacement +
        after +
        markdown.substring(end);

      handleMarkdownChange(newText);

      // Restore focus and set cursor position
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + before.length + replacement.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [markdown, handleMarkdownChange]
  );

  const toolbarActions = {
    bold: () => insertText("**", "**", "bold text"),
    italic: () => insertText("*", "*", "italic text"),
    heading1: () => insertText("# ", "", "Heading 1"),
    heading2: () => insertText("## ", "", "Heading 2"),
    heading3: () => insertText("### ", "", "Heading 3"),
    bulletList: () => insertText("- ", "", "List item"),
    numberedList: () => insertText("1. ", "", "List item"),
    link: () => insertText("[", "](https://example.com)", "Link text"),
    image: () =>
      insertText("![", "](https://example.com/image.jpg)", "Alt text"),
    code: () => insertText("`", "`", "code"),
    codeBlock: () => insertText("```javascript\n", "\n```", "Your code here"),
    quote: () => insertText("> ", "", "Quote text"),
    note: () =>
      insertText(
        ':::note type="info" title="Note"\n',
        "\n:::",
        "Your note content here"
      ),
    noteWarning: () =>
      insertText(
        ':::note type="warning" title="Warning"\n',
        "\n:::",
        "Your warning content here"
      ),
    noteSuccess: () =>
      insertText(
        ':::note type="success" title="Success"\n',
        "\n:::",
        "Your success message here"
      ),
    noteError: () =>
      insertText(
        ':::note type="error" title="Error"\n',
        "\n:::",
        "Your error message here"
      ),
    callout: () =>
      insertText(
        ':::callout emoji="💡" title="Tip"\n',
        "\n:::",
        "Your callout content here"
      ),
    copy: () => {
      navigator.clipboard.writeText(markdown);
    },
    download: () => {
      const blob = new Blob([markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.md";
      a.click();
      URL.revokeObjectURL(url);
    },

    testLargeContent: () => {
      const largeContent = generateMegaMarkdown();
      handleMarkdownChange(largeContent);
      // Ensure preview is visible to see virtualization in action
      if (!showPreview) {
        setShowPreview(true);
      }
    },
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden ${className}`}
    >
      <Toolbar
        actions={toolbarActions}
        showPreview={showPreview}
        onTogglePreview={() => setShowPreview(!showPreview)}
      />

      <div className="flex h-96 md:h-[700px] relative">
        {/* Editor Pane */}
        <div
          className={`${
            showPreview ? "w-1/2" : "w-full"
          } border-r border-gray-200 bg-gray-50 relative flex-shrink-0`}
        >
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => handleMarkdownChange(e.target.value)}
            className="absolute inset-0 p-4 resize-none border-none outline-none bg-transparent font-mono text-sm leading-6 text-gray-800"
            placeholder="Start typing your markdown here..."
            spellCheck={false}
          />
        </div>

        {/* Preview Pane */}
        {showPreview && <Preview markdown={markdown} />}
      </div>
    </div>
  );
};
