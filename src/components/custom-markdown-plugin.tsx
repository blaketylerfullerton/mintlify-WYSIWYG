import { Note, Callout } from "./custom-components";

// Simple custom component parser that works with ReactMarkdown
export function parseCustomComponents(markdown: string): string {
  // Replace custom component syntax with HTML-like syntax that ReactMarkdown can handle
  let processed = markdown;

  // Handle :::note syntax
  const noteRegex = /:::note(?:\s+([^:\n]+))?\n([\s\S]*?)\n:::/g;
  processed = processed.replace(noteRegex, (attributes, content) => {
    const attrs = parseAttributes(attributes || "");
    const type = attrs.type || "info";
    const title = attrs.title || "";

    return `<div data-component="note" data-type="${type}" data-title="${title}">${content.trim()}</div>`;
  });

  // Handle :::callout syntax
  const calloutRegex = /:::callout(?:\s+([^:\n]+))?\n([\s\S]*?)\n:::/g;
  processed = processed.replace(calloutRegex, (attributes, content) => {
    const attrs = parseAttributes(attributes || "");
    const emoji = attrs.emoji || "💡";
    const title = attrs.title || "";

    return `<div data-component="callout" data-emoji="${emoji}" data-title="${title}">${content.trim()}</div>`;
  });

  return processed;
}

// Parse attributes from string like: type="warning" title="Important Note"
function parseAttributes(attributeString: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const regex = /(\w+)="([^"]*)"/g;
  let match;

  while ((match = regex.exec(attributeString)) !== null) {
    attrs[match[1]] = match[2];
  }

  return attrs;
}

// Custom component renderer for ReactMarkdown
export const customComponentRenderer = {
  div: ({ node, children, ...props }: any) => {
    const component = props["data-component"];

    if (component === "note") {
      const type = props["data-type"] as
        | "info"
        | "warning"
        | "success"
        | "error";
      const title = props["data-title"];

      return (
        <Note type={type} title={title}>
          {children}
        </Note>
      );
    }

    if (component === "callout") {
      const emoji = props["data-emoji"];
      const title = props["data-title"];

      return (
        <Callout emoji={emoji} title={title}>
          {children}
        </Callout>
      );
    }

    // Default div rendering
    return <div {...props}>{children}</div>;
  },
};
