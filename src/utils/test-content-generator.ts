// Utility to generate large markdown content for testing virtualization

export const generateLargeMarkdown = (sections: number = 100): string => {
  const sections_content = [];

  for (let i = 1; i <= sections; i++) {
    const sectionContent = `
## Section ${i}: Performance Testing


### Code Example ${i}

\`\`\`javascript
function section${i}() {
  console.log("This is section ${i}");
  return {
    id: ${i},
    title: "Section ${i}",
    performance: "optimized"
  };
}

section${i}();
\`\`\`

### Important Notes

:::note type="info" title="Section ${i} Information"
This section contains important information about virtualization. The content is dynamically generated to test performance with large documents.
:::

### Lists in Section ${i}

1. First item in section ${i}
2. Second item with **bold text**
3. Third item with \`inline code\`
4. Fourth item with [a link](https://example.com)
5. Fifth item to add more content

### Blockquote Example

> This is a blockquote in section ${i}. Virtualization ensures that even with hundreds of sections like this, the performance remains optimal.

### Table Example

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row ${i}.1 | Data A | Value X |
| Row ${i}.2 | Data B | Value Y |
| Row ${i}.3 | Data C | Value Z |

---
`;
    sections_content.push(sectionContent);
  }

  const header = `# Large Markdown Document Test


**Total estimated lines: ~${sections * 45}**


---
`;

  return header + sections_content.join("\n");
};

export const generateMegaMarkdown = (): string => {
  return generateLargeMarkdown(400); // ~18000 lines
};

export const generateGigaMarkdown = (): string => {
  return generateLargeMarkdown(1000); // ~45000 lines
};
