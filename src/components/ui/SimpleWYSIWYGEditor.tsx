import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
} from "lucide-react";

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
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

const SimpleWYSIWYGEditor: React.FC<EditorProps> = ({
  value = "",
  onChange,
  placeholder = "Start typing...",
  className = "",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const isInternalUpdate = useRef<boolean>(false);
  const lastValue = useRef<string>(value);

  // Only update innerHTML when value changes externally (not from internal typing)
  useEffect(() => {
    if (
      editorRef.current &&
      value !== lastValue.current &&
      !isInternalUpdate.current
    ) {
      editorRef.current.innerHTML = value;
      lastValue.current = value;
    }
    isInternalUpdate.current = false;
  }, [value]);

  // Set initial content
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
      lastValue.current = value;
    }
  }, []);

  const execCommand = (command: string, commandValue?: string): void => {
    document.execCommand(command, false, commandValue);
    editorRef.current?.focus();
    updateContent();
  };

  const updateContent = (): void => {
    if (editorRef.current && onChange) {
      isInternalUpdate.current = true;
      const newContent = editorRef.current.innerHTML;
      lastValue.current = newContent;
      onChange(newContent);
    }
    updateButtonStates();
  };

  const updateButtonStates = (): void => {
    setIsBold(document.queryCommandState("bold"));
    setIsItalic(document.queryCommandState("italic"));
    setIsUnderline(document.queryCommandState("underline"));
  };

  const handleInput = (): void => {
    updateContent();
  };

  const handleKeyUp = (): void => {
    updateButtonStates();
  };

  const handleMouseUp = (): void => {
    updateButtonStates();
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault();
          execCommand("bold");
          break;
        case "i":
          e.preventDefault();
          execCommand("italic");
          break;
        case "u":
          e.preventDefault();
          execCommand("underline");
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className={`wysiwyg-editor ${className}`}>
      {/* Toolbar */}
      <div className="editor-toolbar">
        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => execCommand("bold")}
          isActive={isBold}
          title="Bold (Ctrl+B)"
        >
          <Bold size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => execCommand("italic")}
          isActive={isItalic}
          title="Italic (Ctrl+I)"
        >
          <Italic size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => execCommand("underline")}
          isActive={isUnderline}
          title="Underline (Ctrl+U)"
        >
          <Underline size={16} />
        </ToolbarButton>

        <Separator />

        {/* Lists */}
        <ToolbarButton
          onClick={() => execCommand("insertUnorderedList")}
          title="Bullet List"
        >
          <List size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => execCommand("insertOrderedList")}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </ToolbarButton>

        <Separator />

        {/* Alignment */}
        <ToolbarButton
          onClick={() => execCommand("justifyLeft")}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => execCommand("justifyCenter")}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => execCommand("justifyRight")}
          title="Align Right"
        >
          <AlignRight size={16} />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        className="editor-content"
        onInput={handleInput}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onMouseUp={handleMouseUp}
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default SimpleWYSIWYGEditor;
