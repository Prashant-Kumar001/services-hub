"use client";
import { useState, useEffect } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => onSearch(query), 300);
    return () => clearTimeout(timeout);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={`relative flex items-center transition-all duration-200 ${
          isFocused ? "transform scale-[1.02]" : ""
        }`}
      >
        <div className="absolute left-4 flex items-center pointer-events-none">
          <svg
            className={`w-5 h-5 transition-colors duration-200 ${
              isFocused ? "text-blue-500" : "text-gray-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className={`w-full pl-12 pr-12 py-3 bg-white border rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 focus:outline-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isFocused
              ? "border-blue-300 shadow-lg"
              : "border-gray-200 shadow-sm hover:border-gray-300"
          }`}
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full hover:bg-gray-100"
            type="button"
            aria-label="Clear search"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 z-10">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                {query.length === 0
                  ? "Start typing to search tasks..."
                  : `Searching for "${query}"...`}
              </span>
              {query.length > 0 && (
                <span className="ml-auto text-gray-400">
                  Press ESC to clear
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
