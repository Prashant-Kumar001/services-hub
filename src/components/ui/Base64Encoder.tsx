"use client";

import { useState, useEffect } from "react";
import {
  Lock,
  Unlock,
  Copy,
  RotateCcw,
  FileText,
  Code,
  Check,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

type CopiedStates = {
  [key: string]: boolean;
};



export default function RichBase64Encoder() {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("encode");
  const [copiedStates, setCopiedStates] = useState<CopiedStates>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState({ inputLength: 0, outputLength: 0 });

  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem("scrollY");
    }
  }, []);

  useEffect(() => {
    setStats({
      inputLength: input.length,
      outputLength: activeTab === "encode" ? encoded.length : decoded.length,
    });
  }, [input, encoded, decoded, activeTab]);

  const encodeText = async () => {
    if (!input.trim()) return;

    setIsProcessing(true);
    setError("");

    setTimeout(() => {
      try {
        const base64 = btoa(input);
        setEncoded(base64);
        setDecoded("");
        setActiveTab("encode");
      } catch (err) {
        setError("Invalid input for encoding. Please check your text.");
        setEncoded("");
      }
      setIsProcessing(false);
    }, 300);
  };

  const decodeText = async () => {
    if (!input.trim()) return;

    setIsProcessing(true);
    setError("");

    setTimeout(() => {
      try {
        const decodedText = atob(input);
        setDecoded(decodedText);
        setEncoded("");
        setActiveTab("decode");
      } catch (err) {
        setError("Invalid Base64 string. Please check your input.");
        setDecoded("");
      }
      setIsProcessing(false);
    }, 300);
  };

  const clear = () => {
    setInput("");
    setEncoded("");
    setDecoded("");
    setError("");
    setCopiedStates({});
    setStats({ inputLength: 0, outputLength: 0 });
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setError("");
    // Auto-clear outputs when input changes
    if (encoded || decoded) {
      setEncoded("");
      setDecoded("");
    }
  };

  const getOutputText = () => {
    return activeTab === "encode" ? encoded : decoded;
  };

  const getOutputLabel = () => {
    return activeTab === "encode"
      ? "Base64 Encoded Output"
      : "Decoded Text Output";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-950 transition-all duration-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Base64 Encoder / Decoder
              </h1>
              <Unlock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
              Encode text to Base64 or decode Base64 strings back to readable
              text. Perfect for data transmission and storage.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Input Length
              </div>
              <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {stats.inputLength}
              </div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Output Length
              </div>
              <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {stats.outputLength}
              </div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Size Change
              </div>
              <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {stats.inputLength > 0 && stats.outputLength > 0
                  ? `${Math.round(
                      (stats.outputLength / stats.inputLength) * 100
                    )}%`
                  : "—"}
              </div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Mode
              </div>
              <div className="text-xl font-bold text-gray-800 dark:text-gray-200 capitalize">
                {activeTab}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Input Text / Base64
                  </h2>
                </div>

                <div className="space-y-4">
                  <textarea
                    rows={8}
                    value={input}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 rounded-xl resize-none focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors text-gray-800 dark:text-gray-200 font-mono text-sm"
                    placeholder="Enter your text to encode or Base64 string to decode..."
                  />

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={encodeText}
                      disabled={!input.trim() || isProcessing}
                      className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-500/25"
                    >
                      <Lock className="w-4 h-4" />
                      {isProcessing && activeTab === "encode"
                        ? "Encoding..."
                        : "Encode"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={decodeText}
                      disabled={!input.trim() || isProcessing}
                      className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-500/25"
                    >
                      <Unlock className="w-4 h-4" />
                      {isProcessing && activeTab === "decode"
                        ? "Decoding..."
                        : "Decode"}
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={clear}
                      className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500/20 shadow-lg shadow-gray-500/25"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {getOutputLabel()}
                    </h2>
                  </div>
                  {(encoded || decoded) && (
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                      <Check className="w-4 h-4" />
                      Ready
                    </div>
                  )}
                </div>

                {/* Error Display */}
                {error && (
                  <div className="mb-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">{error}</span>
                    </div>
                  </div>
                )}

              
                {(encoded || decoded) && (
                  <div className="space-y-4">
                    <textarea
                      rows={8}
                      value={getOutputText()}
                      readOnly
                      className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 rounded-xl resize-none text-gray-800 dark:text-gray-200 font-mono text-sm"
                    />

                    <button
                      onClick={() =>
                        copyToClipboard(getOutputText(), activeTab)
                      }
                      className={`group inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/20 shadow-lg bg-green-500 hover:bg-green-600 text-white shadow-green-500/25"
                       
                      `}
                    >
                      {copiedStates[activeTab] ? (
                        <>
                          <Check className="w-4 h-4 animate-bounce" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          Copy Output
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Empty State */}
                {!encoded && !decoded && !error && (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
                    <Sparkles className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-center">
                      Enter some text and click Encode or Decode to see the
                      result here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-500" />
                What is Base64?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Base64 is a binary-to-text encoding scheme that represents
                binary data in ASCII format by translating it into a radix-64
                representation.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-500" />
                Common Uses
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Email attachments, embedding images in HTML/CSS, storing binary
                data in text-based formats like JSON or XML.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                <Code className="w-5 h-5 text-green-500" />
                Size Impact
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Base64 encoding increases the size of data by approximately 33%,
                converting every 3 bytes into 4 base64 characters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
