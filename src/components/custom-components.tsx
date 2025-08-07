import React from "react";
import {
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { Card } from "./ui/card";
export interface NoteProps {
  type?: "info" | "warning" | "success" | "error";
  title?: string;
  children: React.ReactNode;
}

export const Note: React.FC<NoteProps> = ({
  type = "info",
  title,
  children,
}) => {
  const getStyles = () => {
    switch (type) {
      case "warning":
        return {
          container: "bg-yellow-50 border-yellow-200 text-yellow-900",
          icon: AlertTriangle,
          iconColor: "text-yellow-600",
        };
      case "success":
        return {
          container: "bg-green-50 border-green-200 text-green-900",
          icon: CheckCircle,
          iconColor: "text-green-600",
        };
      case "error":
        return {
          container: "bg-red-50 border-red-200 text-red-900",
          icon: AlertCircle,
          iconColor: "text-red-600",
        };
      default:
        return {
          container: "bg-blue-50 border-blue-200 text-blue-900",
          icon: Info,
          iconColor: "text-blue-600",
        };
    }
  };

  const styles = getStyles();
  const IconComponent = styles.icon;

  return (
    <Card className={`border-l-4 rounded-r-lg p-4 my-4 ${styles.container}`}>
      <div className="flex items-start">
        <IconComponent className={`w-5 h-5 mt-0.5 mr-3 ${styles.iconColor}`} />
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-2">{title}</h4>}
          <div className="prose prose-sm max-w-none">{children}</div>
        </div>
      </div>
    </Card>
  );
};

export interface CalloutProps {
  emoji?: string;
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({
  emoji = "💡",
  title,
  children,
}) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4">
      <div className="flex items-start">
        <span className="text-2xl mr-3">{emoji}</span>
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-2 text-gray-900">{title}</h4>
          )}
          <div className="prose prose-sm max-w-none text-gray-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export interface CardProps {
  title?: string;
  icon?: string;
  href?: string;
  children: React.ReactNode;
}

export const CardProp: React.FC<CardProps> = ({
  title,
  icon,
  href,
  children,
}) => {
  const CardContent = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 my-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start">
        {icon && <span className="text-2xl mr-3 flex-shrink-0">{icon}</span>}
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-2 text-gray-900 flex items-center">
              {title}
              {href && <ExternalLink className="w-4 h-4 ml-2 text-gray-500" />}
            </h4>
          )}
          <div className="prose prose-sm max-w-none text-gray-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline hover:no-underline"
      >
        <CardContent />
      </a>
    );
  }

  return <CardContent />;
};

export interface CodeProps {
  language?: string;
  filename?: string;
  children: React.ReactNode;
}

export const Code: React.FC<CodeProps> = ({ language, filename, children }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      // Extract text content from children
      const textContent =
        typeof children === "string"
          ? children
          : React.Children.toArray(children)
              .map((child) => (typeof child === "string" ? child : ""))
              .join("");

      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const getLanguageColor = (lang?: string) => {
    const colors: Record<string, string> = {
      javascript: "bg-yellow-100 text-yellow-800",
      typescript: "bg-blue-100 text-blue-800",
      python: "bg-green-100 text-green-800",
      java: "bg-orange-100 text-orange-800",
      cpp: "bg-purple-100 text-purple-800",
      c: "bg-gray-100 text-gray-800",
      html: "bg-red-100 text-red-800",
      css: "bg-blue-100 text-blue-800",
      json: "bg-gray-100 text-gray-800",
      bash: "bg-green-100 text-green-800",
      shell: "bg-green-100 text-green-800",
    };

    return colors[lang?.toLowerCase() || ""] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-4 shadow-lg">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Traffic light dots */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          {filename && (
            <span className="text-gray-300 text-sm font-medium">
              {filename}
            </span>
          )}

          {language && (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getLanguageColor(
                language
              )}`}
            >
              {language.toUpperCase()}
            </span>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 px-2 py-1 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-100 font-mono leading-relaxed">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
};
