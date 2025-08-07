# Mintlify (like) Documentation Editor

A modern, full-featured Markdown documentation editor built specifically for creating and editing technical documentation. This application provides a Mintlify-like editing experience with real-time preview, custom components, and organized file management.

<img width="320" height="320" alt="image" src="https://github.com/user-attachments/assets/4f8692e8-296e-46e0-9f2d-5c50fd481510" />



## ✨ Custom Features
- **Custom Components**:
  - Mimics Mintlify's components
  - Built for reusability and theme compliance

### 📝 Advanced Markdown Editor

- **Live Preview**: Real-time markdown rendering with side-by-side editing view
- **Rich Toolbar**: Comprehensive formatting tools with visual buttons
- **Syntax Highlighting**: Code blocks with language-specific highlighting
- **File Management**: Multi-file editing with organized folder structure
- **Custom Components**: Enhanced documentation elements (Notes, Callouts, Cards)

### 🎨 Custom Documentation Components
## _Card Component_
<img width="788" height="110" alt="image" src="https://github.com/user-attachments/assets/b676c3fc-f3de-4cf0-922e-7c675a92effd" />

## _Note Component_
<img width="794" height="91" alt="image" src="https://github.com/user-attachments/assets/5f0f0fde-a0c3-443c-be36-5c5a1ba12f55" />

## _Note With Warning_
<img width="782" height="97" alt="image" src="https://github.com/user-attachments/assets/46ea1b30-1bcd-4841-842f-099fbdd505fa" />

#### **Notes**: Four types of contextual information blocks

- `:::note type="info" title="Information"` - Informational notes
- `:::note type="warning" title="Warning"` - Important warnings
- `:::note type="success" title="Success"` - Success messages
- `:::note type="error" title="Error"` - Error notifications

#### **Callouts**: Eye-catching highlighted sections

- `:::callout emoji="💡" title="Pro Tip"` - Custom emoji callouts

#### **Enhanced Code Blocks**:

- Syntax highlighting with Prism.js
- Filename display support
- Multiple language support

### **Custom Component Pipeline**

```
Markdown Input → Custom Parser → HTML Transformation → React Components → Rendered Output
```

1. **Input**: Custom syntax like `:::note type="info"`
2. **Parser**: `parseCustomComponents()` converts to HTML data attributes
3. **Renderer**: `customComponentRenderer` maps to React components
4. **Output**: Styled components (Note, Callout, Card, etc.)

## 🚀 Tech Stack

### **Core Framework**

- **React 19.1.0** - Latest React with concurrent features
- **TypeScript** - Type-safe development experience
- **Vite 7.0.4** - Fast build tool with HMR

### **UI & Styling**

- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Radix UI** - Headless component primitives (Dialog, Dropdown, Sidebar)
- **Lucide React** - Modern icon library

### **Markdown Processing**

- **react-markdown** - Markdown to React component conversion
- **remark-gfm** - GitHub Flavored Markdown support
- **rehype-raw** - Raw HTML processing in markdown
- **react-syntax-highlighter** - Code syntax highlighting with Prism.js


## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/blaketylerfullerton/mintlify-WYSIWYG
   cd mintlify-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production (TypeScript compilation + Vite build)

## 🎯 How It Works

### **Editor Workflow**

1. **File Selection**: Choose a file from the sidebar navigation
2. **Content Loading**: File content is loaded from the predefined templates or cache
3. **Markdown Editing**: Type in the left pane with toolbar assistance
4. **Live Processing**: Custom markdown syntax is parsed in real-time
5. **Preview Rendering**: Right pane shows the rendered output with styled components

### **Custom Component Syntax**

The editor supports special syntax that gets converted to styled React components:

````markdown
:::note type="warning" title="Important"
This creates a styled warning note component
:::

:::callout emoji="🚀" title="Getting Started"
This creates an eye-catching callout box
:::

```javascript filename="example.js"
// Code blocks support filename display
const example = "Hello World!";
```
````



### **File Organization System**

Files are organized in a virtual folder structure defined in `initialFileContents.ts`:

- **AI Tools**: Documentation for AI-powered development tools
- **API Reference**: API documentation and guides
- **Custom Components**: Documentation for the editor's custom components

## 🎨 Customization

### **Adding New File Types**
```typescript
// In src/lib/initialFileContents.ts
fileConfigs["new-file.mdx"] = {
  path: "folder/new-file.mdx",
  title: "New Document",
  folder: "folder-name",
  tags: ["tag1", "tag2"]
};
````

### **Creating Custom Components**

1. Add component to `src/components/custom-components.tsx`
2. Update parser in `src/components/custom-markdown-plugin.tsx`
3. Add toolbar button in `src/components/toolbar.tsx`

### **Styling Modifications**

- **Global Styles**: Modify `src/index.css`
- **Component Styles**: Edit Tailwind classes in component files
- **Preview Styling**: Customize `src/components/preview.tsx` component renderers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



---

Built with ❤️ for modern documentation workflows
