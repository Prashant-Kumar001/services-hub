"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import Editor from "@monaco-editor/react";

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  marked.setOptions({ gfm: true, breaks: true });

  useEffect(() =>  {
   const fun =  async () => {
      const raw = await marked.parse(markdown);
      const clean = DOMPurify.sanitize(raw);
      setHtml(clean);
   }
   fun() 
  }, [markdown]);

  useEffect(() => {
    const saved = localStorage.getItem("markdown-editor-content");
    if (saved) setMarkdown(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("markdown-editor-content", markdown);
  }, [markdown]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setMarkdown(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "document.md";
    a.click();
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("✅ Copied to clipboard!");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">
              📘 Markdown Editor (Advanced)
            </h1>
            <div className="flex items-center gap-2">
              <label className="text-sm">🌙 Dark Mode</label>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="accent-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monaco Editor */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
              <Editor
                height="450px"
                defaultLanguage="markdown"
                value={markdown}
                onChange={(value) => setMarkdown(value || "")}
                theme={darkMode ? "vs-dark" : "light"}
                options={{
                  wordWrap: "on",
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                }}
              />
              <div className="mt-4 flex flex-wrap gap-2 px-2 pb-2">
                <button
                  onClick={() => handleCopy(markdown)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Copy Markdown
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
                >
                  Download .md
                </button>
                <label className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-sm">
                  Upload File
                  <input
                    type="file"
                    accept=".md,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Markdown Preview */}
            <div>
              <div
                className="prose dark:prose-invert max-w-none border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 p-4 min-h-[450px] overflow-auto"
                dangerouslySetInnerHTML={{ __html: html }}
              />
              <button
                onClick={() => handleCopy(html)}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
              >
                Copy HTML
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
