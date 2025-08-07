export const testComponentsContent = `# Testing Custom Components

This is a test of the custom components in your WYSIWYG editor.

## Basic Components

<Note type="info" title="Information">
This is an informational note with a title.
</Note>

<Note type="warning" title="Warning">
This is a warning note.
</Note>

<Note type="success" title="Success">
This is a success note.
</Note>

<Note type="error" title="Error">
This is an error note.
</Note>

## Accordion Components

<AccordionGroup>
  <Accordion icon="copy" title="Clone your docs locally">
    During the onboarding process, you created a GitHub repository with your docs content if you didn't already have one. You can find a link to this repository in your [dashboard](https://dashboard.mintlify.com).
    
    To clone the repository locally so that you can make and preview changes to your docs, follow the [Cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) guide in the GitHub docs.
  </Accordion>
  <Accordion icon="rectangle-terminal" title="Start the preview server">
    1. Install the Mintlify CLI: npm i -g mint
    2. Navigate to your docs directory and run: mint dev
    3. Open http://localhost:3000 to see your docs live!
    
    <Tip>Your preview updates automatically as you edit files.</Tip>
  </Accordion>
</AccordionGroup>

## Code Blocks

\`\`\`javascript example.js
function hello() {
  console.log("Hello, World!");
}
\`\`\`

\`\`\`python main.py
def greet(name):
    return f"Hello, {name}!"
\`\`\`

## Cards

<Card title="Plant Store Endpoints" icon="🌱" href="https://example.com">
  This is a card component with a title, icon, and link.
</Card>

## Callouts

<Callout emoji="🚀" title="Quick Start">
  This is a callout with a custom emoji and title.
</Callout>

## Regular Markdown

This is regular **bold** and *italic* text.

### Lists

- Item 1
- Item 2
- Item 3

1. Numbered item 1
2. Numbered item 2
3. Numbered item 3

### Links and Images

[Visit our website](https://example.com)

![Example Image](https://via.placeholder.com/300x200)

### Tables

| Name | Age | City |
|------|-----|------|
| John | 25  | NYC  |
| Jane | 30  | LA   |
| Bob  | 35  | SF   |
`; 