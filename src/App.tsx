import React, { useState } from "react";
import SimpleWYSIWYGEditor from "./components/ui/SimpleWYSIWYGEditor";
import "./App.css";
import { Card, CardHeader, CardTitle } from "./components/ui/card";
import Logo from "../public/light.svg";

const App: React.FC = () => {
  const [content, setContent] = useState<string>(
    "<p>Welcome to the simple WYSIWYG editor!</p><p>Start editing this text or create new content.</p>"
  );

  const handleContentChange = (newContent: string): void => {
    setContent(newContent);
  };

  const clearContent = (): void => {
    setContent("");
  };

  const getWordCount = (): number => {
    const textContent = content.replace(/<[^>]*>/g, "").trim();
    return textContent ? textContent.split(/\s+/).length : 0;
  };

  return (
    <div className="app">
      <main className="app-main">
        <Card className="header-card">
          <CardHeader>
            <img src={Logo} alt="logo" style={{ width: "300px" }} />
            <CardTitle>Simple WYSIWYG Editor built for Mintlify</CardTitle>
          </CardHeader>
        </Card>

        <div className="editor-container">
          <SimpleWYSIWYGEditor
            value={content}
            onChange={handleContentChange}
            placeholder="Start typing your content..."
          />

          <div className="editor-actions">
            <button onClick={clearContent} className="clear-btn">
              Clear Content
            </button>
            <div className="word-count">Words: {getWordCount()}</div>
          </div>
        </div>

        <div className="output-container">
          <h3>HTML Output</h3>
          <pre className="html-output">{content}</pre>
        </div>
      </main>
    </div>
  );
};

export default App;
