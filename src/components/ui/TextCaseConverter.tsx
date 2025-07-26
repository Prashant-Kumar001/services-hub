"use client";
import { useState } from "react";

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [converted, setConverted] = useState("");
  const [live, setLive] = useState(false);
  const [activeType, setActiveType] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const convertText = (input: string, type: string) => {
    const toCapitalized = (str: string) =>
      str
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    const toSentenceCase = (str: string) =>
      str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

    const toCamelCase = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

    const toSnakeCase = (str: string) =>
      str.trim().toLowerCase().replace(/\s+/g, "_");

    const toKebabCase = (str: string) =>
      str.trim().toLowerCase().replace(/\s+/g, "-");

    const toAlternatingCase = (str: string) =>
      str
        .split("")
        .map((char, i) =>
          i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        )
        .join("");

    const toInverseCase = (str: string) =>
      str
        .split("")
        .map((char) =>
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        )
        .join("");

    switch (type) {
      case "uppercase":
        return input.toUpperCase();
      case "lowercase":
        return input.toLowerCase();
      case "capitalized":
        return toCapitalized(input);
      case "sentence":
        return toSentenceCase(input);
      case "camel":
        return toCamelCase(input);
      case "snake":
        return toSnakeCase(input);
      case "kebab":
        return toKebabCase(input);
      case "alternating":
        return toAlternatingCase(input);
      case "inverse":
        return toInverseCase(input);
      default:
        return input;
    }
  };

  const handleConvert = (type: string) => {
    setActiveType(type);
    const result = convertText(text, type);
    setConverted(result);
  };

  const handleLiveChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    if (live && activeType) {
      setConverted(convertText(val, activeType));
    }
  };

  const handleCopy = async () => {
    if (converted) {
      await navigator.clipboard.writeText(converted);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleReset = () => {
    setText("");
    setConverted("");
    setActiveType("");
  };

  const handleDownload = () => {
    const blob = new Blob([converted], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `converted-text-${activeType || "output"}.txt`;
    link.click();
  };

  const conversionTypes = [
    { id: "uppercase", label: "UPPERCASE", icon: "🔠", example: "HELLO WORLD" },
    { id: "lowercase", label: "lowercase", icon: "🔡", example: "hello world" },
    {
      id: "capitalized",
      label: "Title Case",
      icon: "🔤",
      example: "Hello World",
    },
    {
      id: "sentence",
      label: "Sentence case",
      icon: "📝",
      example: "Hello world",
    },
    { id: "camel", label: "camelCase", icon: "🐪", example: "helloWorld" },
    { id: "snake", label: "snake_case", icon: "🐍", example: "hello_world" },
    { id: "kebab", label: "kebab-case", icon: "🍢", example: "hello-world" },
    {
      id: "alternating",
      label: "aLtErNaTiNg",
      icon: "🔀",
      example: "hElLo WoRlD",
    },
    {
      id: "inverse",
      label: "iNVERSE cASE",
      icon: "🔄",
      example: "hELLO wORLD",
    },
  ];

  const getCharCount = (str: string) => str.length;
  const getWordCount = (str: string) =>
    str.trim() === "" ? 0 : str.trim().split(/\s+/).length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Text Case Converter</h1>
            <p className="text-white/80">
              Transform your text into any case format instantly
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="text-blue-600">📝</span>
              Input Text
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{getWordCount(text)} words</span>
              <span>{getCharCount(text)} chars</span>
            </div>
          </div>

          <textarea
            className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none text-gray-800 placeholder-gray-400"
            rows={8}
            placeholder="Enter your text here to convert it to different cases..."
            value={text}
            onChange={handleLiveChange}
          />

          <div className="mt-4 flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={live}
                  onChange={() => setLive(!live)}
                  className="sr-only"
                />
                <div
                  className={`w-12 h-7 rounded-full flex  items-center transition-colors duration-200 ${
                    live ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                      live ? "translate-x-6" : "translate-x-0.5"
                    } `}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">
                Live Preview
              </span>
            </label>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="text-green-600">✨</span>
              Converted Text
              {activeType && (
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium">
                  {conversionTypes.find((t) => t.id === activeType)?.label}
                </span>
              )}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{getWordCount(converted)} words</span>
              <span>{getCharCount(converted)} chars</span>
            </div>
          </div>

          <textarea
            className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 text-gray-800 resize-none focus:outline-none"
            rows={8}
            placeholder="Converted text will appear here..."
            value={converted}
            readOnly
          />

          {/* Action Buttons */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleCopy}
              disabled={!converted}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {copySuccess ? (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              disabled={!converted}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Conversion Types */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-purple-600">🎯</span>
          Case Conversion Types
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conversionTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleConvert(type.id)}
              disabled={!text.trim()}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed ${
                activeType === type.id
                  ? "border-indigo-500 bg-indigo-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{type.icon}</span>
                <span
                  className={`font-semibold ${
                    activeType === type.id ? "text-indigo-700" : "text-gray-800"
                  }`}
                >
                  {type.label}
                </span>
              </div>
              <div className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                {type.example}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-blue-600">💡</span>
          Quick Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>
              Enable <strong>Live Preview</strong> to see changes as you type
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>
              Use <strong>camelCase</strong> for JavaScript variables
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>
              Use <strong>snake_case</strong> for Python variables
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>
              Use <strong>kebab-case</strong> for CSS classes and URLs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
