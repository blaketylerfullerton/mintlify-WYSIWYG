// src/App.tsx
import React, { useState, useEffect } from "react";
import Layout from "./components/layout"; // ✅ Import your layout
import "./App.css";
import { MarkdownEditor } from "./components/markdown-editor";
import { getFileContent } from "./lib/initialFileContents";

const App: React.FC = () => {
  // State for managing multiple files
  const [currentFile, setCurrentFile] = useState<string>("claude-code.mdx");
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load initial file content
  useEffect(() => {
    const loadInitialContent = async () => {
      try {
        const content = await getFileContent(currentFile);
        setFileContents((prev) => ({
          ...prev,
          [currentFile]: content,
        }));
      } catch (error) {
        console.error("Error loading initial content:", error);
        setFileContents((prev) => ({
          ...prev,
          [currentFile]: `# Error\nCould not load content for ${currentFile}`,
        }));
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialContent();
  }, []);

  const handleFileSelect = async (fileName: string) => {
    setCurrentFile(fileName);

    // Load content if not already cached
    if (!fileContents[fileName]) {
      try {
        const content = await getFileContent(fileName);
        setFileContents((prev) => ({
          ...prev,
          [fileName]: content,
        }));
      } catch (error) {
        console.error(`Error loading content for ${fileName}:`, error);
        setFileContents((prev) => ({
          ...prev,
          [fileName]: `# Error\nCould not load content for ${fileName}`,
        }));
      }
    }
  };

  const handleMarkdownChange = (value: string) => {
    setFileContents((prev) => ({
      ...prev,
      [currentFile]: value,
    }));
  };

  if (isLoading) {
    return (
      <Layout currentFile={currentFile} onFileSelect={handleFileSelect}>
        <div className="app">
          <main className="app-main">
            <div className="editor-container">
              <div className="max-w-9xl mx-auto p-4">
                <div className="flex items-center justify-center h-64">
                  Loading...
                </div>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentFile={currentFile} onFileSelect={handleFileSelect}>
      <div className="app">
        <main className="app-main">
          <div className="editor-container">
            <div className="max-w-9xl mx-auto">
              <MarkdownEditor
                key={currentFile} // Force re-render when file changes
                initialValue={fileContents[currentFile] || ""}
                onChange={handleMarkdownChange}
                className="w-full"
              />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default App;
