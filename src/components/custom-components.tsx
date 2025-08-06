import React from "react";
import { AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react";

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
    <div className={`border-l-4 rounded-r-lg p-4 my-4 ${styles.container}`}>
      <div className="flex items-start">
        <IconComponent className={`w-5 h-5 mt-0.5 mr-3 ${styles.iconColor}`} />
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-2">{title}</h4>}
          <div className="prose prose-sm max-w-none">{children}</div>
        </div>
      </div>
    </div>
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
