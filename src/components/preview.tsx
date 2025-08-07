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

interface PreviewProps {
  markdown: string;
}

export const Preview: React.FC<PreviewProps> = ({ markdown }) => {
  // Process custom components before passing to ReactMarkdown
  // Use useMemo to prevent unnecessary re-processing
  const processedMarkdown = React.useMemo(() => {
    return parseCustomComponents(markdown);
  }, [markdown]);

  return (
    <div className="w-1/2 overflow-auto bg-white relative">
      <div className="absolute inset-0 overflow-auto">
        <div className="p-4 prose prose-gray max-w-none">
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
                return (
                  <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-6">
                    {children}
                  </h1>
                );
              },
              h2({ children }) {
                return (
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-5">
                    {children}
                  </h2>
                );
              },
              h3({ children }) {
                return (
                  <h3 className="text-xl font-medium text-gray-800 mb-2 mt-4">
                    {children}
                  </h3>
                );
              },
              p({ children }) {
                return (
                  <p className="text-gray-700 mb-4 leading-relaxed">
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
                return <li className="ml-2">{children}</li>;
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
