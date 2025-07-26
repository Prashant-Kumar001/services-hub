"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setFormatted(pretty);
      setError("");
    } catch (err: any) {
      setFormatted("");
      setError(`❌ Invalid JSON: ${err.message}`);
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setFormatted(minified);
      setError("");
    } catch (err: any) {
      setFormatted("");
      setError(`❌ Invalid JSON: ${err.message}`);
    }
  };

  const clearAll = () => {
    setInput("");
    setFormatted("");
    setError("");
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setInput(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleCopy = async () => {
    if (!formatted) return;
    await navigator.clipboard.writeText(formatted);
    alert("✅ Copied formatted JSON!");
  };

  const handleDownload = () => {
    const blob = new Blob([formatted], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "formatted.json";
    a.click();
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">🧩 JSON Formatter</h1>
            <label className="flex items-center gap-2 text-sm">
              🌙 Dark Mode
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="accent-blue-500"
              />
            </label>
          </div>

          {/* Editor + Output */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Editor */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Raw JSON Input</label>
              <div className="rounded border border-gray-300 dark:border-gray-700 overflow-hidden">
                <Editor
                  height="400px"
                  defaultLanguage="json"
                  value={input}
                  onChange={(value) => setInput(value || "")}
                  theme={darkMode ? "vs-dark" : "light"}
                  options={{
                    wordWrap: "on",
                    minimap: { enabled: false },
                    formatOnPaste: false,
                    scrollBeyondLastLine: false,
                    formatOnType: false,
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-2 text-sm pt-1">
                <button
                  onClick={formatJson}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                >
                  Format
                </button>
                <button
                  onClick={minifyJson}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded"
                >
                  Minify
                </button>
                <button
                  onClick={clearAll}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded"
                >
                  Clear
                </button>
                <label className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-black px-4 py-1 rounded">
                  Upload
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Formatted Output</label>
              <div className="rounded border border-gray-300 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
                <Editor
                  height="400px"
                  defaultLanguage="json"
                  value={formatted}
                  options={{
                    readOnly: true,
                    wordWrap: "on",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                  }}
                  theme={darkMode ? "vs-dark" : "light"}
                />
              </div>

              {/* Output Controls */}
              <div className="flex gap-2 text-sm pt-1">
                <button
                  onClick={handleCopy}
                  disabled={!formatted}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded disabled:opacity-50"
                >
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!formatted}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded disabled:opacity-50"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
