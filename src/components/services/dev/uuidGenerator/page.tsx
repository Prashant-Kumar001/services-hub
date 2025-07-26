"use client";
import { useState, useEffect } from "react";
import { Copy, RefreshCw, Sparkles, Check, Hash } from "lucide-react";

// Simple UUID v4 generator (since uuid library isn't available)
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default function RichUuidGenerator() {
  const [uuid, setUuid] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState([]) as any;

  useEffect(() => {
    setUuid(generateUUID());
  }, []);

  const generateNew = () => {
    setIsGenerating(true);
    setCopied(false);

    if (uuid) {
      setHistory((prev: string[]) => [uuid, ...prev.slice(0, 4)]);
    }

    setTimeout(() => {
      setUuid(generateUUID());
      setIsGenerating(false);
    }, 600);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = uuid;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyFromHistory = async (historicalUuid: string) => {
    try {
      await navigator.clipboard.writeText(historicalUuid);
      // Brief visual feedback
      const button = document.querySelector(`[data-uuid="${historicalUuid}"]`);
      if (button) {
        button.classList.add("bg-green-100", "dark:bg-green-900");
        setTimeout(() => {
          button.classList.remove("bg-green-100", "dark:bg-green-900");
        }, 300);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 transition-all duration-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300 dark:bg-cyan-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <Hash className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                UUID Generator
              </h1>
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 animate-pulse" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Generate universally unique identifiers with a single click.
              Perfect for databases, APIs, and unique keys.
            </p>
          </div>

          {/* Main UUID Display */}
          <div className="relative">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="text-center space-y-6">
                <div className="relative">
                  <div
                    className={`font-mono text-lg md:text-xl lg:text-2xl break-all p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 transition-all duration-300 ${
                      isGenerating
                        ? "animate-pulse bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950"
                        : ""
                    }`}
                  >
                    {isGenerating ? (
                      <span className="text-gray-400 dark:text-gray-500">
                        Generating new UUID...
                      </span>
                    ) : (
                      <span className="text-gray-800 dark:text-gray-100">
                        {uuid}
                      </span>
                    )}
                  </div>
                  {!isGenerating && (
                    <div className="absolute -top-2 -right-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                      Ready
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={copyToClipboard}
                    disabled={isGenerating}
                    className={`group inline-flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed ${
                      copied
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5 animate-bounce" />
                        Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Copy UUID
                      </>
                    )}
                  </button>

                  <button
                    onClick={generateNew}
                    disabled={isGenerating}
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/20 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw
                      className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                        isGenerating ? "animate-spin" : ""
                      }`}
                    />
                    {isGenerating ? "Generating..." : "Generate New"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* History Section */}
          {history.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center">
                Recent UUIDs
              </h2>
              <div className="grid gap-3">
                {history.map((historicalUuid : string, index : number) => (
                  <div
                    key={historicalUuid}
                    className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-sm text-gray-600 dark:text-gray-400 break-all flex-1">
                        {historicalUuid}
                      </span>
                      <button
                        onClick={() => copyFromHistory(historicalUuid)}
                        data-uuid={historicalUuid}
                        className="opacity-0 group-hover:opacity-100 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                        title="Copy this UUID"
                      >
                        <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                What is a UUID?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A Universally Unique Identifier is a 128-bit label used to
                uniquely identify objects in distributed systems.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                UUID Version 4
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generated using random or pseudo-random numbers. The probability
                of duplicates is negligibly small.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Common Uses
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Database primary keys, session tokens, file names, and anywhere
                you need guaranteed uniqueness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
