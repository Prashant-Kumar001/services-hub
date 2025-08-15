"use client";

import { useState, useCallback, useEffect } from "react";
import Editor from "@monaco-editor/react";

export default function JsonFormatter() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [indentSize, setIndentSize] = useState(2);
  const [isValidJson, setIsValidJson] = useState(false);
  const [jsonStats, setJsonStats] = useState({ keys: 0, values: 0, size: 0 });
  const [mode, setMode] = useState<"input" | "output">("input");


  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
  }, []);

  const validateAndAnalyzeJson = useCallback((jsonString: string) => {
    if (!jsonString.trim()) {
      setIsValidJson(false);
      setJsonStats({ keys: 0, values: 0, size: 0 });
      return null;
    }

    try {
      const parsed = JSON.parse(jsonString);
      setIsValidJson(true);


      const jsonStr = JSON.stringify(parsed);
      const keys = (jsonStr.match(/"/g) || []).length / 2;
      const size = new Blob([jsonStr]).size;

      setJsonStats({
        keys: Math.floor(keys),
        values: keys,
        size,
      });

      return parsed;
    } catch (err) {
      setIsValidJson(false);
      setJsonStats({ keys: 0, values: 0, size: 0 });
      return null;
    }
  }, []);

  const formatJson = useCallback(() => {
    const parsed = validateAndAnalyzeJson(content);
    if (parsed !== null) {
      const pretty = JSON.stringify(parsed, null, indentSize);
      setContent(pretty);
      setError("");
      setMode("output");
    } else {
      setError("❌ Invalid JSON: Please check your syntax");
    }
  }, [content, indentSize, validateAndAnalyzeJson]);

  const minifyJson = useCallback(() => {
    const parsed = validateAndAnalyzeJson(content);
    if (parsed !== null) {
      const minified = JSON.stringify(parsed);
      setContent(minified);
      setError("");
      setMode("output");
    } else {
      setError("❌ Invalid JSON: Cannot minify invalid JSON");
    }
  }, [content, validateAndAnalyzeJson]);

  const sortKeys = useCallback(() => {
    const parsed = validateAndAnalyzeJson(content);
    if (parsed !== null && typeof parsed === "object") {
      const sortedJson = JSON.stringify(
        parsed,
        Object.keys(parsed).sort(),
        indentSize
      );
      setContent(sortedJson);
      setError("");
      setMode("output");
    }
  }, [content, indentSize, validateAndAnalyzeJson]);

  const clearAll = useCallback(() => {
    setContent("");
    setError("");
    setIsValidJson(false);
    setJsonStats({ keys: 0, values: 0, size: 0 });
    setMode("input");
  }, []);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
    
      setError("❌ File too large (max 10MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target?.result as string;
      setContent(fileContent);
      setError("");
      setMode("input");
    };
    reader.onerror = () => {
      setError("❌ Failed to read file");
    };
    reader.readAsText(file);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!content) return;

    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      setError("❌ Failed to copy to clipboard");
    }
  }, [content]);

  const handleDownload = useCallback(() => {
    if (!content) return;

    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `json-${mode}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [content, mode]);

  const switchToInput = useCallback(() => {
    setMode("input");
    setError("");
  }, []);
  useEffect(() => {
    if (content && mode === "input") {
      validateAndAnalyzeJson(content);
    }
  }, [content, mode, validateAndAnalyzeJson]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 text-gray-800 dark:text-gray-100 transition-all duration-300">
        <div className="max-w-5xl mx-auto space-y-6">

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  🧩 JSON Formatter Pro
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Format, validate, and analyze JSON with a unified editor
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isValidJson
                        ? "bg-green-500"
                        : content && mode === "input"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                  <span className="text-sm font-medium">
                    {mode === "output"
                      ? "Formatted JSON"
                      : isValidJson
                      ? "Valid JSON"
                      : content
                      ? "Invalid JSON"
                      : "No input"}
                  </span>
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <span>🌙</span>
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    className="sr-only"
                  />
                  <div
                    className={`w-10 h-6 rounded-full transition-colors ${
                      darkMode ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform mt-1 mx-1 ${
                        darkMode ? "translate-x-4" : ""
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
            {isValidJson && (
              <div className="mt-4 grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {jsonStats.keys}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Properties
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {formatBytes(jsonStats.size)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Size
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {content.split("\n").length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Lines
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex">
              <button
                onClick={switchToInput}
                className={`flex-1 px-6 py-3 font-semibold transition-all duration-200 ${
                  mode === "input"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                📝 Input Mode
              </button>
              <button
                disabled={!content}
                className={`flex-1 px-6 py-3 font-semibold transition-all duration-200 disabled:cursor-not-allowed ${
                  mode === "output"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                }`}
              >
                ✅ Output Mode
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-3 items-center">
              {mode === "input" ? (
                <>
                  <button
                    onClick={formatJson}
                    disabled={!content}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    ✨ Format
                  </button>
                  <button
                    onClick={minifyJson}
                    disabled={!content}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    🗜️ Minify
                  </button>
                  <button
                    onClick={sortKeys}
                    disabled={!content || !isValidJson}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    🔤 Sort Keys
                  </button>
                  <label className="cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                    📁 Upload
                    <input
                      type="file"
                      accept=".json,.txt"
                      onChange={handleUpload}
                      className="hidden"
                    />
                  </label>
                </>
              ) : (
                <>
                  <button
                    onClick={handleCopy}
                    disabled={!content}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed ${
                      copySuccess
                        ? "bg-green-500 text-white"
                        : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white"
                    }`}
                  >
                    {copySuccess ? "✅ Copied!" : "📋 Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={!content}
                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    💾 Download
                  </button>
                </>
              )}

              <button
                onClick={clearAll}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                🗑️ Clear
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <label className="text-sm font-medium">Indent:</label>
                <select
                  value={indentSize}
                  onChange={(e) => setIndentSize(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
                >
                  <option value={2}>2 spaces</option>
                  <option value={4}>4 spaces</option>
                  <option value={8}>8 spaces</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <label className="text-lg font-semibold">
                  {mode === "input" ? "📝 JSON Editor" : "✅ Formatted JSON"}
                </label>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {mode === "input"
                    ? "Paste or type your JSON here"
                    : "Ready to copy or download"}
                </div>
              </div>
            </div>

            <div className="h-[500px]">
              <Editor
                height="100%"
                defaultLanguage="json"
                value={content}
                onChange={(value) => setContent(value || "")}
                theme={darkMode ? "vs-dark" : "light"}
                options={{
                  readOnly: mode === "output",
                  wordWrap: "on",
                  minimap: { enabled: false },
                  formatOnPaste: false,
                  scrollBeyondLastLine: false,
                  formatOnType: false,
                  lineNumbers: "on",
                  renderLineHighlight: mode === "input" ? "all" : "none",
                  contextmenu: true,
                  automaticLayout: true,
                  fontSize: 14,
                  lineHeight: 20,
                }}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800">
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
