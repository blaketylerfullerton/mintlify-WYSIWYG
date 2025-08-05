# Mintlify WYSIWYG Editor

A simple, powerful WYSIWYG (What You See Is What You Get) editor built specifically for Mintlify. This modern web application provides an intuitive rich text editing experience with real-time HTML output preview.

![Mintlify Logo](public/light.svg)

## ✨ Features

### Rich Text Editing

- **Text Formatting**: Bold, Italic, Underline with visual feedback
- **Lists**: Create bullet points and numbered lists
- **Text Alignment**: Left, center, and right alignment options
- **Keyboard Shortcuts**:
  - `Ctrl+B` / `Cmd+B` for bold
  - `Ctrl+I` / `Cmd+I` for italic
  - `Ctrl+U` / `Cmd+U` for underline

### Editor Tools

- **Real-time HTML Preview**: See the generated HTML output instantly
- **Word Counter**: Track document length in real-time
- **Clear Content**: Reset the editor with one click
- **Responsive Design**: Works seamlessly across different screen sizes

### Developer Experience

- **Modern Tech Stack**: Built with React 19, TypeScript, and Vite
- **Fast Development**: Hot module replacement for instant feedback
- **Type Safety**: Full TypeScript support throughout the application
- **Code Quality**: ESLint configuration for consistent code standards

## 🚀 Tech Stack

- **Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS 4.1.11
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Development**: ESLint + TypeScript ESLint

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mintlify-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 🛠️ Available Scripts

- `pnpm dev` - Start the development server with hot reload
- `pnpm build` - Build the application for production
- `pnpm preview` - Preview the production build locally
- `pnpm lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
src/
├── components/
│   └── ui/
│       ├── SimpleWYSIWYGEditor.tsx  # Main editor component
│       ├── card.tsx                 # Card UI components
│       └── button.tsx               # Button UI components
├── lib/                             # Utility functions
├── App.tsx                          # Main application component
├── main.tsx                         # Application entry point
└── index.css                        # Global styles
```

## 🎨 Customization

The editor is built with modularity in mind. You can easily:

- **Add new formatting options** by extending the toolbar in `SimpleWYSIWYGEditor.tsx`
- **Customize styling** using Tailwind CSS classes
- **Extend functionality** by adding new components to the `components/ui` directory

## 📝 Usage Example

```tsx
import SimpleWYSIWYGEditor from "./components/ui/SimpleWYSIWYGEditor";

function MyComponent() {
  const [content, setContent] = useState("");

  return (
    <SimpleWYSIWYGEditor
      value={content}
      onChange={setContent}
      placeholder="Start typing your content..."
    />
  );
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Mintlify.

---

Built with ❤️ for the Mintlify team
