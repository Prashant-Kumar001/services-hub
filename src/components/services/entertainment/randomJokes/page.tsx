"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface Joke {
  setup: string;
  delivery: string;
  category: string;
  error?: boolean;
  message?: string;
}

const RandomJokesPage: React.FC = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPunchline, setShowPunchline] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [jokeHistory, setJokeHistory] = useState<Joke[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

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

  const fetchJoke = async (isRetry: boolean = false) => {
    try {
      // Cancel any existing request
      cleanup();

      setLoading(true);
      setShowPunchline(false);
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

      const response = await fetch(
        "https://v2.jokeapi.dev/joke/Any?type=twopart&safe-mode",
        { signal }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Joke = await response.json();

      if (signal.aborted) return;

      if (data.error) {
        throw new Error(data.message || "Failed to fetch joke");
      }

      if (!data.setup || !data.delivery) {
        throw new Error("Invalid joke format received");
      }

      setJoke(data);

      setJokeHistory((prev) => {
        const newHistory = [...prev, data];
        return newHistory.slice(-10);
      });
      setCurrentIndex(jokeHistory.length);

      setLoading(false);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "AbortError") return;

        console.error("Failed to fetch joke:", err);
        setError(
          err.message === "Failed to fetch"
            ? "Network error. Please check your connection."
            : err.message
        );
      }
      setLoading(false);
    } finally {
      abortControllerRef.current = null;
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  const handleNextJoke = () => {
    fetchJoke();
  };

  const handleRetry = () => {
    fetchJoke(true);
  };

  const togglePunchline = () => {
    setShowPunchline(!showPunchline);
  };

  const navigateHistory = (direction: "prev" | "next") => {
    if (direction === "prev" && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setJoke(jokeHistory[prevIndex]);
      setShowPunchline(false);
    } else if (direction === "next" && currentIndex < jokeHistory.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setJoke(jokeHistory[nextIndex]);
      setShowPunchline(false);
    }
  };

  const getCategoryEmoji = (category: string): string => {
    const emojis: { [key: string]: string } = {
      programming: "💻",
      miscellaneous: "🎭",
      dark: "🌚",
      pun: "😄",
      spooky: "👻",
      christmas: "🎄",
    };
    return emojis[category?.toLowerCase()] || "😂";
  };

  if (loading && !joke) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl border border-yellow-200">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-200 border-t-yellow-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">😄</span>
            </div>
          </div>
          <p className="mt-6 text-xl text-gray-700 font-medium">
            Cooking up a fresh joke...
          </p>
          <p className="mt-2 text-sm text-gray-500">This won't take long!</p>
        </div>
      </div>
    );
  }

  if (error && !joke) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl border border-red-200 max-w-md">
          <div className="text-6xl mb-4">😅</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Oops! Joke Failed to Load
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

  if (!joke) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-yellow-200 overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-3xl">🎭</span>
            <h1 className="text-3xl font-bold text-white">
              Random Joke Generator
            </h1>
            <span className="text-3xl">🎪</span>
          </div>
          <p className="text-yellow-100">Get ready to laugh!</p>
        </div>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <span>{getCategoryEmoji(joke.category)}</span>
              <span className="capitalize">{joke.category}</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                Q
              </div>
              <p className="text-lg text-gray-800 font-medium leading-relaxed">
                {joke.setup}
              </p>
            </div>
          </div>

          {showPunchline && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-100 animate-in slide-in-from-top-2 duration-500">
              <div className="flex items-start gap-3">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  A
                </div>
                <p className="text-lg text-gray-800 font-semibold leading-relaxed">
                  {joke.delivery}
                </p>
              </div>
              <div className="text-center mt-4">
                <span className="text-3xl animate-bounce inline-block">😂</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button
              onClick={togglePunchline}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                showPunchline
                  ? "bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600"
                  : "bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:from-yellow-500 hover:to-orange-500 shadow-lg"
              }`}
            >
              {showPunchline ? (
                <div className="flex items-center gap-2">
                  <span>🙈</span>
                  <span>Hide Punchline</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>🎉</span>
                  <span>Reveal Punchline</span>
                </div>
              )}
            </button>

            <button
              onClick={handleNextJoke}
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>🎲</span>
                  <span>Next Joke</span>
                </div>
              )}
            </button>
          </div>

          {jokeHistory.length > 1 && (
            <div className="flex justify-center gap-2 mb-4">
              <button
                onClick={() => navigateHistory("prev")}
                disabled={currentIndex <= 0}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Previous joke"
              >
                ⬅️
              </button>
              <span className="px-3 py-2 text-sm text-gray-600 flex items-center">
                {currentIndex + 1} of {jokeHistory.length}
              </span>
              <button
                onClick={() => navigateHistory("next")}
                disabled={currentIndex >= jokeHistory.length - 1}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Next joke"
              >
                ➡️
              </button>
            </div>
          )}

          {error && joke && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
              <span>⚠️ {error}</span>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 text-center border-t">
          <p className="text-sm text-gray-500">
            Powered by JokeAPI • Safe mode enabled
          </p>
        </div>
      </div>
    </div>
  );
};

export default RandomJokesPage;
