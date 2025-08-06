import React, { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Eye,
  Edit3,
} from "lucide-react";

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  showPreview?: boolean;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive = false,
  children,
  title,
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`toolbar-btn ${isActive ? "active" : ""}`}
  >
    {children}
  </button>
);

const Separator: React.FC = () => <div className="toolbar-separator" />;

const SimpleMarkdownEditor: React.FC<EditorProps> = ({
  value = "",
  onChange,
  placeholder = "Start typing markdown...",
  className = "",
  showPreview = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  const insertMarkdown = (
    prefix: string,
    suffix: string = "",
    placeholder: string = "text"
  ): void => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;

    const beforeSelection = value.substring(0, start);
    const afterSelection = value.substring(end);

    const newValue =
      beforeSelection + prefix + textToInsert + suffix + afterSelection;

    if (onChange) {
      onChange(newValue);
    }

    // Set cursor position after the inserted text
    setTimeout(() => {
      const newCursorPos = selectedText
        ? start + prefix.length + selectedText.length + suffix.length
        : start + prefix.length + placeholder.length + suffix.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  const insertBold = (): void => {
    insertMarkdown("**", "**", "bold text");
  };

  const insertItalic = (): void => {
    insertMarkdown("*", "*", "italic text");
  };

  const insertUnderline = (): void => {
    insertMarkdown("<u>", "</u>", "underlined text");
  };

  const insertUnorderedList = (): void => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const beforeCursor = value.substring(0, start);
    const afterCursor = value.substring(start);

    // Check if we're at the start of a line
    const lines = beforeCursor.split("\n");
    const currentLine = lines[lines.length - 1];

    let newValue: string;
    if (currentLine.trim() === "") {
      // We're on an empty line, just add the bullet
      newValue = beforeCursor + "- " + afterCursor;
    } else {
      // Add a new line with bullet
      newValue = beforeCursor + "\n- " + afterCursor;
    }

    if (onChange) {
      onChange(newValue);
    }

    setTimeout(() => {
      const newCursorPos = currentLine.trim() === "" ? start + 2 : start + 3;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  const insertOrderedList = (): void => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const beforeCursor = value.substring(0, start);
    const afterCursor = value.substring(start);

    // Check if we're at the start of a line
    const lines = beforeCursor.split("\n");
    const currentLine = lines[lines.length - 1];

    let newValue: string;
    if (currentLine.trim() === "") {
      // We're on an empty line, just add the number
      newValue = beforeCursor + "1. " + afterCursor;
    } else {
      // Add a new line with number
      newValue = beforeCursor + "\n1. " + afterCursor;
    }

    if (onChange) {
      onChange(newValue);
    }

    setTimeout(() => {
      const newCursorPos = currentLine.trim() === "" ? start + 3 : start + 4;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault();
          insertBold();
          break;
        case "i":
          e.preventDefault();
          insertItalic();
          break;
        case "u":
          e.preventDefault();
          insertUnderline();
          break;
        default:
          break;
      }
    }

    // Handle enter key for lists
    if (e.key === "Enter") {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const beforeCursor = value.substring(0, start);
      const lines = beforeCursor.split("\n");
      const currentLine = lines[lines.length - 1];

      // Check if current line is a list item
      const unorderedMatch = currentLine.match(/^(\s*)- (.*)$/);
      const orderedMatch = currentLine.match(/^(\s*)(\d+)\. (.*)$/);

      if (unorderedMatch) {
        const [, indent, text] = unorderedMatch;
        if (text.trim() === "") {
          // Empty list item, remove it
          e.preventDefault();
          const newValue =
            value.substring(0, start - currentLine.length) +
            value.substring(start);
          if (onChange) onChange(newValue);
        } else {
          // Continue the list
          e.preventDefault();
          const newValue =
            value.substring(0, start) +
            "\n" +
            indent +
            "- " +
            value.substring(start);
          if (onChange) onChange(newValue);
          setTimeout(() => {
            textarea.setSelectionRange(
              start + indent.length + 3,
              start + indent.length + 3
            );
          }, 0);
        }
      } else if (orderedMatch) {
        const [, indent, num, text] = orderedMatch;
        if (text.trim() === "") {
          // Empty list item, remove it
          e.preventDefault();
          const newValue =
            value.substring(0, start - currentLine.length) +
            value.substring(start);
          if (onChange) onChange(newValue);
        } else {
          // Continue the list with next number
          e.preventDefault();
          const nextNum = parseInt(num) + 1;
          const newValue =
            value.substring(0, start) +
            "\n" +
            indent +
            nextNum +
            ". " +
            value.substring(start);
          if (onChange) onChange(newValue);
          setTimeout(() => {
            textarea.setSelectionRange(
              start + indent.length + nextNum.toString().length + 3,
              start + indent.length + nextNum.toString().length + 3
            );
          }, 0);
        }
      }
    }
  };

  const renderMarkdownPreview = (markdown: string): React.ReactNode => {
    const lines = markdown.split("\n");
    return lines.map((line, index) => {
      // Handle bold text **text**
      if (line.includes("**")) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <div key={index} className="preview-line">
            {parts.map((part, partIndex) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </div>
        );
      }

      // Handle italic text *text*
      if (line.includes("*") && !line.includes("**")) {
        const parts = line.split(/(\*.*?\*)/g);
        return (
          <div key={index} className="preview-line">
            {parts.map((part, partIndex) => {
              if (
                part.startsWith("*") &&
                part.endsWith("*") &&
                !part.includes("**")
              ) {
                return <em key={partIndex}>{part.slice(1, -1)}</em>;
              }
              return part;
            })}
          </div>
        );
      }

      // Handle underlined text <u>text</u>
      if (line.includes("<u>") && line.includes("</u>")) {
        const parts = line.split(/(<u>.*?<\/u>)/g);
        return (
          <div key={index} className="preview-line">
            {parts.map((part, partIndex) => {
              if (part.startsWith("<u>") && part.endsWith("</u>")) {
                return <u key={partIndex}>{part.slice(3, -4)}</u>;
              }
              return part;
            })}
          </div>
        );
      }

      // Handle unordered list items
      if (line.trim().startsWith("- ")) {
        return (
          <div key={index} className="preview-line list-item">
            • {line.trim().slice(2)}
          </div>
        );
      }

      // Handle ordered list items
      const orderedMatch = line.trim().match(/^(\d+)\. (.+)$/);
      if (orderedMatch) {
        return (
          <div key={index} className="preview-line list-item">
            {orderedMatch[1]}. {orderedMatch[2]}
          </div>
        );
      }

      // Handle empty lines
      if (line.trim() === "") {
        return (
          <div key={index} className="preview-line empty-line">
            &nbsp;
          </div>
        );
      }

      // Regular text
      return (
        <div key={index} className="preview-line">
          {line}
        </div>
      );
    });
  };

  return (
    <div className={`markdown-editor ${className}`}>
      {/* Toolbar */}
      <div className="editor-toolbar">
        {/* Text Formatting */}
        <ToolbarButton onClick={insertBold} title="Bold (Ctrl+B) - **text**">
          <Bold size={16} />
        </ToolbarButton>

        <ToolbarButton onClick={insertItalic} title="Italic (Ctrl+I) - *text*">
          <Italic size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={insertUnderline}
          title="Underline (Ctrl+U) - <u>text</u>"
        >
          <Underline size={16} />
        </ToolbarButton>

        <Separator />

        {/* Lists */}
        <ToolbarButton
          onClick={insertUnorderedList}
          title="Bullet List - - item"
        >
          <List size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={insertOrderedList}
          title="Numbered List - 1. item"
        >
          <ListOrdered size={16} />
        </ToolbarButton>

        {showPreview && (
          <>
            <Separator />
            <ToolbarButton
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              isActive={isPreviewMode}
              title={isPreviewMode ? "Edit Mode" : "Preview Mode"}
            >
              {isPreviewMode ? <Edit3 size={16} /> : <Eye size={16} />}
            </ToolbarButton>
          </>
        )}
      </div>

      {/* Editor Content */}
      <div className="editor-content-wrapper">
        {isPreviewMode && showPreview ? (
          <div className="editor-preview">{renderMarkdownPreview(value)}</div>
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="editor-content markdown-textarea"
          />
        )}
      </div>
    </div>
  );
};

export default SimpleMarkdownEditor;
