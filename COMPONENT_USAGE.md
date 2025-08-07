# Custom Components Usage Guide

This WYSIWYG editor supports custom React components directly in markdown. Here's how to use them:

## Available Components

### 1. Note Component
Display informational, warning, success, or error messages.

```markdown
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
```

### 2. Accordion Components
Create collapsible content sections.

```markdown
<AccordionGroup>
  <Accordion icon="copy" title="Clone your docs locally">
    During the onboarding process, you created a GitHub repository with your docs content.
    
    To clone the repository locally, follow the [Cloning guide](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).
  </Accordion>
  <Accordion icon="rectangle-terminal" title="Start the preview server">
    1. Install the Mintlify CLI: npm i -g mint
    2. Navigate to your docs directory and run: mint dev
    3. Open http://localhost:3000 to see your docs live!
    
    <Tip>Your preview updates automatically as you edit files.</Tip>
  </Accordion>
</AccordionGroup>
```

### 3. Tip Component
Highlight important tips or hints.

```markdown
<Tip>
This is a helpful tip that will be highlighted in blue.
</Tip>
```

### 4. Card Component
Create clickable cards with icons and links.

```markdown
<Card title="Plant Store Endpoints" icon="🌱" href="https://example.com">
  This is a card component with a title, icon, and link.
</Card>
```

### 5. Callout Component
Create callouts with custom emojis.

```markdown
<Callout emoji="🚀" title="Quick Start">
  This is a callout with a custom emoji and title.
</Callout>
```

### 6. Code Blocks with Filenames
Display code with syntax highlighting and filenames.

````markdown
```javascript example.js
function hello() {
  console.log("Hello, World!");
}
```

```python main.py
def greet(name):
    return f"Hello, {name}!"
```
````

## Component Attributes

### Note Component
- `type`: "info" | "warning" | "success" | "error" (default: "info")
- `title`: Optional title text

### Accordion Component
- `icon`: Icon identifier ("copy", "rectangle-terminal", "chevron-right", or any emoji)
- `title`: The accordion title (required)

### Card Component
- `title`: Card title
- `icon`: Icon (emoji or icon name)
- `href`: Optional link URL

### Callout Component
- `emoji`: Custom emoji (default: "💡")
- `title`: Optional title

## Nested Components

You can nest components within each other. For example, you can put a `<Tip>` component inside an `<Accordion>`:

```markdown
<Accordion icon="rectangle-terminal" title="Start the preview server">
  1. Install the Mintlify CLI: npm i -g mint
  2. Navigate to your docs directory and run: mint dev
  3. Open http://localhost:3000 to see your docs live!
  
  <Tip>Your preview updates automatically as you edit files.</Tip>
</Accordion>
```

## Regular Markdown Support

All regular markdown features are still supported:
- **Bold** and *italic* text
- [Links](https://example.com)
- ![Images](https://via.placeholder.com/300x200)
- Lists and numbered lists
- Tables
- Code blocks
- Blockquotes

## Examples

Check out the "Test Components" file in the editor to see all components in action!

## Adding New Components

To add new custom components:

1. Create the component in `src/components/custom-components.tsx`
2. Add parsing logic in `src/components/custom-markdown-plugin.tsx`
3. Add the component to the renderer in the same file
4. Update this documentation

The system is designed to be easily extensible for new component types. 