import React from "react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  Quote,
  Eye,
  EyeOff,
  Copy,
  Download,
  Info,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

interface ToolbarProps {
  actions: {
    bold: () => void;
    italic: () => void;
    heading1: () => void;
    heading2: () => void;
    heading3: () => void;
    bulletList: () => void;
    numberedList: () => void;
    link: () => void;
    image: () => void;
    code: () => void;
    codeBlock: () => void;
    quote: () => void;
    note: () => void;
    noteWarning: () => void;
    noteSuccess: () => void;
    noteError: () => void;
    callout: () => void;
    copy: () => void;
    download: () => void;
  };
  showPreview: boolean;
  onTogglePreview: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  actions,
  showPreview,
  onTogglePreview,
}) => {
  const ToolbarButton = ({
    onClick,
    title,
    children,
    variant = "default",
  }: {
    onClick: () => void;
    title: string;
    children: React.ReactNode;
    variant?: "default" | "toggle";
  }) => (
    <button
      onClick={onClick}
      title={title}
      className={`
        p-2 rounded-md transition-all duration-200 flex items-center justify-center
        ${
          variant === "toggle" && showPreview
            ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-2">
      <div className="flex items-center gap-1 flex-wrap">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 mr-3">
          <ToolbarButton onClick={actions.bold} title="Bold (Ctrl+B)">
            <Bold size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={actions.italic} title="Italic (Ctrl+I)">
            <Italic size={16} />
          </ToolbarButton>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 mr-3">
          <ToolbarButton onClick={actions.heading1} title="Heading 1">
            <Heading1 size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={actions.heading2} title="Heading 2">
            <Heading2 size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={actions.heading3} title="Heading 3">
            <Heading3 size={16} />
          </ToolbarButton>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 mr-3">
          <ToolbarButton onClick={actions.bulletList} title="Bullet List">
            <List size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={actions.numberedList} title="Numbered List">
            <ListOrdered size={16} />
          </ToolbarButton>
        </div>

        {/* Links and Media */}
        <div className="flex items-center gap-1 mr-3">
          <ToolbarButton onClick={actions.link} title="Insert Link">
            <Link size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={actions.image} title="Insert Image">
            <Image size={16} />
          </ToolbarButton>
        </div>

        {/* Code and Quote */}
        <div className="flex items-center gap-1 mr-3">
          <ToolbarButton onClick={actions.code} title="Inline Code">
            <Code size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={actions.quote} title="Quote">
            <Quote size={16} />
          </ToolbarButton>
        </div>

        {/* Custom Components */}
        <div className="flex items-center gap-1 mr-3">
          <ToolbarButton onClick={actions.note} title="Info Note">
            <Info size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={actions.noteWarning} title="Warning Note">
            <AlertTriangle size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={actions.noteSuccess} title="Success Note">
            <CheckCircle size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={actions.noteError} title="Error Note">
            <AlertCircle size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={actions.callout} title="Callout">
            <MessageSquare size={16} />
          </ToolbarButton>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Actions */}
        <div className="flex items-center gap-1">
          <ToolbarButton onClick={actions.copy} title="Copy to Clipboard">
            <Copy size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={actions.download} title="Download as .md">
            <Download size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={onTogglePreview}
            title={showPreview ? "Hide Preview" : "Show Preview"}
            variant="toggle"
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
          </ToolbarButton>
        </div>
      </div>
    </div>
  );
};
