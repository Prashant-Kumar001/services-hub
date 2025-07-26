"use client";

import React, { useState, useCallback, useRef } from "react";

interface QRCode {
  url: string;
}

const generateQRCode = async (
  data: string,
  signal: AbortSignal
): Promise<QRCode> => {
  try {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      data
    )}`;
    const res = await fetch(url, { signal });

    if (!res.ok) throw new Error("Failed to generate QR code");

    return { url: res.url } as QRCode;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }
    throw new Error(
      error instanceof Error ? error.message : "Failed to generate QR code"
    );
  }
};

const QRCodeGeneratorPage: React.FC = () => {
  const [inputUrl, setInputUrl] = useState<string>("");
  const [qrCode, setQRCode] = useState<QRCode | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const handleGenerateQRCode = useCallback(async () => {
    if (!inputUrl.trim()) {
      setError("Please enter a valid URL");
      setQRCode(null);
      return;
    }

    try {
      cleanup();
      setLoading(true);
      setError(null);
      setIsVisible(false);

      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;

      const timeoutId = setTimeout(() => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      }, 10000);

      const data = await generateQRCode(inputUrl, signal);

      clearTimeout(timeoutId);

      if (signal.aborted) return;

      setQRCode(data);
      setLoading(false);

      setTimeout(() => setIsVisible(true), 100);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;

      console.error("Failed to generate QR code:", err);
      setError(
        err instanceof Error
          ? err.message === "Failed to fetch"
            ? "Network error. Please check your connection."
            : err.message
          : "Failed to generate QR code"
      );
      setLoading(false);
      setQRCode(null);
    } finally {
      abortControllerRef.current = null;
    }
  }, [inputUrl]);

  const handleCopy = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (qrCode?.url) {
      const link = document.createElement("a");
      link.href = qrCode.url;
      link.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [qrCode]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && inputUrl.trim() && !loading) {
        handleGenerateQRCode();
      }
    },
    [handleGenerateQRCode, inputUrl, loading]
  );

  if (loading && !qrCode) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-violet-200 animate-pulse">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-violet-200 border-t-violet-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-bounce">
                <span className="text-3xl">📱</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-2xl text-gray-700 font-semibold animate-pulse">
              Generating your QR code...
            </p>
            <p className="text-sm text-gray-500">
              Creating magic, please wait!
            </p>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !qrCode) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-red-200 max-w-md transform animate-bounce-in">
          <div className="text-7xl mb-6 animate-bounce">😅</div>
          <h2 className="text-2xl font-bold text-red-600 mb-3">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
          <button
            onClick={handleGenerateQRCode}
            disabled={loading}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Trying Again...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>🔄</span>
                <span>Try Again</span>
              </div>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-violet-200 overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <span
                  className="text-4xl animate-bounce"
                  style={{ animationDelay: "0s" }}
                >
                  📱
                </span>
                <h1 className="text-4xl font-bold text-white tracking-wide">
                  QR Code Generator
                </h1>
                <span
                  className="text-4xl animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  🔗
                </span>
              </div>
              <p className="text-violet-100 text-lg font-medium">
                Transform your links into beautiful QR codes instantly!
              </p>
            </div>
          </div>

          <div className="p-10">
            <div className="mb-8">
              <div className="relative">
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a URL (e.g., https://example.com)"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100 text-gray-800 placeholder-gray-400 text-lg transition-all duration-300 bg-gray-50 focus:bg-white"
                />
                {inputUrl && (
                  <button
                    onClick={() => setInputUrl("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    ✕
                  </button>
                )}
              </div>

              <button
                onClick={handleGenerateQRCode}
                disabled={loading || !inputUrl.trim()}
                className="mt-6 w-full px-10 py-5 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold text-xl rounded-2xl hover:from-violet-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {loading ? (
                  <div className="flex items-center gap-3 justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                    <span>Generating Magic...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 justify-center">
                    <span className="text-2xl">✨</span>
                    <span>Generate QR Code</span>
                    <span className="text-2xl">✨</span>
                  </div>
                )}
              </button>
            </div>

            {qrCode && (
              <div
                className={`transition-all duration-700 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-blue-100 shadow-inner">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Your QR Code is Ready! 🎉
                    </h3>
                    <p className="text-gray-600">
                      Click to copy • Right-click to save
                    </p>
                  </div>

                  <div
                    className="relative cursor-pointer group mx-auto max-w-xs"
                    onClick={() => handleCopy(qrCode.url)}
                  >
                    <div className="bg-white p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                      <img
                        src={qrCode.url}
                        alt="Generated QR Code"
                        className="w-full h-auto rounded-xl"
                      />
                    </div>

                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
                      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl">
                        <span className="text-gray-800 font-semibold text-lg">
                          {copiedUrl === qrCode.url
                            ? "✅ Copied!"
                            : "📋 Copy URL"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center gap-4">
                    <button
                      onClick={() => handleCopy(qrCode.url)}
                      className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center gap-2"
                    >
                      <span>{copiedUrl === qrCode.url ? "✅" : "📋"}</span>
                      <span>
                        {copiedUrl === qrCode.url ? "Copied!" : "Copy URL"}
                      </span>
                    </button>

                    <button
                      onClick={handleDownload}
                      className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center gap-2"
                    >
                      <span>💾</span>
                      <span>Download PNG</span>
                    </button>
                  </div>

                  <div className="mt-6 p-4 bg-white/70 rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Original URL:</p>
                    <p className="text-gray-800 font-mono text-sm break-all">
                      {inputUrl}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && qrCode && (
              <div className="mt-6 bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl text-center animate-shake">
                <span>⚠️ {error}</span>
              </div>
            )}
          </div>

          <div className="bg-gray-50/80 px-8 py-6 text-center border-t border-gray-200">
            <p className="text-sm text-gray-500 font-medium">
              Powered by QR Server API • Built with ❤️ for seamless sharing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGeneratorPage;
