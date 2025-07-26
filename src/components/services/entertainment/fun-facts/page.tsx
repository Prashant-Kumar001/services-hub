"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";



interface FunFact {
  text: string;
  source: string;
}

const getFunFact = async (signal: AbortSignal): Promise<FunFact> => {
  try {
    const res = await fetch(
      "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en",
      { signal }
    );

    if (!res.ok) throw new Error("Failed to fetch fact");

    return res.json() as Promise<FunFact>;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch fact"
    );
  }
};

const FunFactsPage: React.FC = () => {
  const [factData, setFactData] = useState<FunFact | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const fetchFact = useCallback(async (isRetry: boolean = false) => {
    try {
      cleanup();

      setLoading(true);
      if (!isRetry) {
        setError(null);
      }

      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;

      const timeoutId = setTimeout(() => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      }, 10000);

      const data = await getFunFact(signal);

      clearTimeout(timeoutId);

      if (signal.aborted) return;

      setFactData(data);
      setLoading(false);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;

      console.error("Failed to fetch fact:", err);
      setError(
        err instanceof Error
          ? err.message === "Failed to fetch"
            ? "Network error. Please check your connection."
            : err.message
          : "Failed to fetch fact"
      );
      setLoading(false);
    } finally {
      abortControllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    fetchFact();
  }, [fetchFact]);

  const handleNextFact = () => {
    fetchFact();
  };

  const handleRetry = () => {
    fetchFact(true);
  };

  if (loading && !factData) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl border border-yellow-200">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-200 border-t-yellow-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🧠</span>
            </div>
          </div>
          <p className="mt-6 text-xl text-gray-700 font-medium">
            Fetching a fun fact...
          </p>
          <p className="mt-2 text-sm text-gray-500">This won't take long!</p>
        </div>
      </div>
    );
  }

  if (error && !factData) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl border border-red-200 max-w-md">
          <div className="text-6xl mb-4">😅</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Oops! Fact Failed to Load
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            disabled={loading}
            className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Trying Again...</span>
              </div>
            ) : (
              "Try Again"
            )}
          </button>
        </div>
      </div>
    );
  }

  if (!factData) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-yellow-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-400 to-indigo-400 p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-3xl">🧠</span>
            <h1 className="text-3xl font-bold text-white">
              Random Fun Fact Generator
            </h1>
            <span className="text-3xl">🌟</span>
          </div>
          <p className="text-indigo-100">
            Discover something new and surprising!
          </p>
        </div>

        <div className="p-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-100 animate-in fade-in duration-500">
            <div className="flex items-start gap-3">
              <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                F
              </div>
              <p className="text-lg text-gray-800 font-medium leading-relaxed">
                {factData.text}
              </p>
            </div>
            <div className="mt-4 text-sm text-gray-500 text-right">
              Source:{" "}
              <a
                href={factData.source}
                className="text-purple-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {factData.source}
              </a>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={handleNextFact}
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-lg rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>🎲</span>
                  <span>Next Fact</span>
                </div>
              )}
            </button>
          </div>

          {error && factData && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
              <span>⚠️ {error}</span>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 text-center border-t">
          <p className="text-sm text-gray-500">Powered by Useless Facts API</p>
        </div>
      </div>
    </div>
  );
};

export default FunFactsPage;
