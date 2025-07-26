"use client";
import { useState } from "react";
import { Copy, Hash, Trash2, Shield } from "lucide-react";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [copiedHash, setCopiedHash] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateHashes = async () => {
    setError("");
    setIsGenerating(true);
    try {
      const enc = new TextEncoder();
      const data = enc.encode(input);

      const hashBuffer = async (algorithm: string) => {
        const buffer = await crypto.subtle.digest(algorithm, data);
        return Array.from(new Uint8Array(buffer))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      };

      // Add a small delay for smooth animation
      await new Promise((resolve) => setTimeout(resolve, 300));

      const newHashes: Record<string, string> = {
        "SHA-1": await hashBuffer("SHA-1"),
        "SHA-256": await hashBuffer("SHA-256"),
        "SHA-512": await hashBuffer("SHA-512"),
      };

      setHashes(newHashes);
    } catch (err: any) {
      setError("Failed to generate hashes: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copy = async (text: string, algo: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHash(algo);
      setTimeout(() => setCopiedHash(""), 2000);
    } catch (err) {
      alert("Failed to copy to clipboard");
    }
  };

  const clear = () => {
    setInput("");
    setHashes({});
    setError("");
    setCopiedHash("");
  };

  const hashAlgorithms = [
    {
      name: "SHA-1",
      color: "from-orange-400 to-red-500",
      description: "160-bit hash (deprecated for security)",
    },
    {
      name: "SHA-256",
      color: "from-blue-400 to-purple-600",
      description: "256-bit secure hash",
    },
    {
      name: "SHA-512",
      color: "from-green-400 to-teal-600",
      description: "512-bit secure hash",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 text-gray-800 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Hash Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Generate secure cryptographic hashes for your text
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Input Text
          </label>
          <textarea
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200 resize-none font-mono text-sm"
            placeholder="Enter the text you want to hash..."
          />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={generateHashes}
              disabled={!input.trim() || isGenerating}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Hash className="w-5 h-5 mr-2" />
              {isGenerating ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Generating...
                </>
              ) : (
                "Generate Hashes"
              )}
            </button>

            <button
              onClick={clear}
              className="inline-flex items-center px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Clear All
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl">
              <p className="font-medium">❌ {error}</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        {Object.keys(hashes).length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
              Generated Hashes
            </h2>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
              {hashAlgorithms.map(({ name, color, description }) => {
                const hash = hashes[name];
                if (!hash) return null;

                return (
                  <div
                    key={name}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3
                          className={`text-xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
                        >
                          {name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {description}
                        </p>
                      </div>

                      <button
                        onClick={() => copy(hash, name)}
                        className={`inline-flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                          copiedHash === name
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {copiedHash === name ? "Copied!" : "Copy"}
                      </button>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                      <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 break-all whitespace-pre-wrap leading-relaxed">
                        {hash}
                      </pre>
                    </div>

                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                      Length: {hash.length} characters • {hash.length * 4} bits
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Info Section */}
        {Object.keys(hashes).length === 0 && !error && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Hash className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Ready to Generate Hashes
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Enter some text above and click "Generate Hashes" to see the
              cryptographic hashes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
