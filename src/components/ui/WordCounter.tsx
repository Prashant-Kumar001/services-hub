"use client";
import { useState } from "react";

// Basic stopwords list (can be extended)
const stopwords = new Set([
  "the",
  "is",
  "and",
  "a",
  "of",
  "to",
  "in",
  "on",
  "for",
  "with",
  "at",
  "by",
  "an",
  "be",
  "are",
  "was",
  "were",
  "been",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "should",
  "could",
  "can",
  "may",
  "might",
  "must",
  "shall",
  "this",
  "that",
  "these",
  "those",
  "i",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "me",
  "him",
  "her",
  "us",
  "them",
  "my",
  "your",
  "his",
  "its",
  "our",
  "their",
  "but",
  "or",
  "as",
  "if",
  "when",
  "where",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "just",
  "now",
]);

export default function WordCounter() {
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState<"stats" | "keywords" | "analysis">(
    "stats"
  );

  const words = text.trim() === "" ? [] : text.trim().split(/\s+/);
  const wordCount = words.length;
  const charCount = text.length;
  const charNoSpace = text.replace(/\s/g, "").length;
  const sentenceCount = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;
  const paragraphCount = text
    .split(/\n+/)
    .filter((p) => p.trim().length > 0).length;
  const avgWordLength = wordCount ? (charNoSpace / wordCount).toFixed(2) : "0";
  const readingTime = wordCount ? Math.ceil(wordCount / 200) : 0;
  const speakingTime = wordCount ? Math.ceil(wordCount / 150) : 0; 

  // Keyword Frequency
  const keywordFrequency = words
    .map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ""))
    .filter((w) => w && !stopwords.has(w) && w.length > 2)
    .reduce((acc: Record<string, number>, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

  const topKeywords = Object.entries(keywordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Text Analysis
  const getReadabilityLevel = () => {
    if (wordCount === 0) return "N/A";
    const avgSentenceLength = wordCount / (sentenceCount || 1);
    const avgWordLen = parseFloat(avgWordLength);

    if (avgSentenceLength < 15 && avgWordLen < 5) return "Easy";
    if (avgSentenceLength < 20 && avgWordLen < 6) return "Medium";
    return "Complex";
  };

  const getMostCommonWords = () => {
    const allWords = words
      .map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ""))
      .filter((w) => w && w.length > 1);

    const frequency = allWords.reduce((acc: Record<string, number>, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const clearText = () => {
    setText("");
  };

  const copyStats = async () => {
    const stats = `Words: ${wordCount}\nCharacters: ${charCount}\nSentences: ${sentenceCount}\nParagraphs: ${paragraphCount}\nReading Time: ${readingTime} min`;
    await navigator.clipboard.writeText(stats);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Advanced Word Counter</h1>
            <p className="text-white/80">
              Analyze your text with detailed statistics and insights
            </p>
          </div>
        </div>
      </div>

      {/* Text Input Area */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Text Input</h2>
            <div className="flex gap-2">
              <button
                onClick={copyStats}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium flex items-center gap-2"
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Stats
              </button>
              <button
                onClick={clearText}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center gap-2"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear
              </button>
            </div>
          </div>
          <textarea
            rows={12}
            className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-gray-800 placeholder-gray-400"
            placeholder="Start typing or paste your text here to analyze..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="mt-3 text-sm text-gray-500 flex justify-between">
            <span>Real-time analysis as you type</span>
            <span>{charCount} characters</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-100">
          <nav className="flex">
            {[
              { id: "stats", label: "Statistics", icon: "📊" },
              { id: "keywords", label: "Keywords", icon: "🔑" },
              { id: "analysis", label: "Analysis", icon: "🔍" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "stats" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Text Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  icon="📝"
                  label="Words"
                  value={wordCount}
                  color="blue"
                />
                <StatCard
                  icon="🔤"
                  label="Characters"
                  value={charCount}
                  color="green"
                />
                <StatCard
                  icon="✂️"
                  label="No Spaces"
                  value={charNoSpace}
                  color="purple"
                />
                <StatCard
                  icon="📄"
                  label="Sentences"
                  value={sentenceCount}
                  color="orange"
                />
                <StatCard
                  icon="📋"
                  label="Paragraphs"
                  value={paragraphCount}
                  color="pink"
                />
                <StatCard
                  icon="📏"
                  label="Avg Word Length"
                  value={avgWordLength}
                  color="indigo"
                />
                <StatCard
                  icon="⏱️"
                  label="Reading Time"
                  value={`${readingTime} min`}
                  color="red"
                />
                <StatCard
                  icon="🎤"
                  label="Speaking Time"
                  value={`${speakingTime} min`}
                  color="yellow"
                />
              </div>
            </div>
          )}

          {activeTab === "keywords" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Keyword Analysis
              </h3>
              {topKeywords.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500">
                    No keywords found. Start typing to see keyword analysis.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {topKeywords.map(([word, freq], index) => (
                    <div
                      key={word}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-800 capitalize">
                          {word}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.max(freq * 20, 20)}px` }}
                        ></div>
                        <span className="text-sm font-medium text-gray-600">
                          {freq}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "analysis" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Text Analysis
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-blue-600">📖</span>
                    Readability
                  </h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {getReadabilityLevel()}
                  </div>
                  <p className="text-sm text-gray-600">
                    Based on average sentence length and word complexity
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-green-600">⚡</span>
                    Text Density
                  </h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {sentenceCount
                      ? (wordCount / sentenceCount).toFixed(1)
                      : "0"}{" "}
                    words/sentence
                  </div>
                  <p className="text-sm text-gray-600">
                    Average words per sentence
                  </p>
                </div>
              </div>

              {getMostCommonWords().length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Most Frequent Words
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {getMostCommonWords().map(([word, freq]) => (
                      <span
                        key={word}
                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                      >
                        {word} ({freq})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: number | string;
  color: string;
}) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    pink: "from-pink-500 to-pink-600",
    indigo: "from-indigo-500 to-indigo-600",
    red: "from-red-500 to-red-600",
    yellow: "from-yellow-500 to-yellow-600",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <div
          className={`w-3 h-3 rounded-full bg-gradient-to-r ${
            colorClasses[color as keyof typeof colorClasses]
          }`}
        ></div>
      </div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  );
}
