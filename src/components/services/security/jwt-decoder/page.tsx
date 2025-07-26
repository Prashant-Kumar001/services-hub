"use client";

import { useState } from "react";

export default function JwtDecoder() {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState("");

  const decodeJwt = () => {
    setError("");
    try {
      const parts = jwt.split(".");
      if (parts.length !== 3) {
        throw new Error("JWT must have 3 parts separated by dots");
      }

      const decode = (str: string) =>
        decodeURIComponent(
          atob(str.replace(/-/g, "+").replace(/_/g, "/"))
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );

      setHeader(JSON.stringify(JSON.parse(decode(parts[0])), null, 2));
      setPayload(JSON.stringify(JSON.parse(decode(parts[1])), null, 2));
    } catch (err: any) {
      setError("Invalid JWT: " + err.message);
      setHeader("");
      setPayload("");
    }
  };

  const clear = () => {
    setJwt("");
    setHeader("");
    setPayload("");
    setError("");
  };

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("✅ Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">🔐 JWT Decoder</h1>

        <textarea
          rows={4}
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded"
          placeholder="Paste your JWT here..."
        />

        <div className="flex gap-4">
          <button
            onClick={decodeJwt}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Decode
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {header && (
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="font-semibold">Header</label>
              <button
                onClick={() => copy(header)}
                className="text-sm text-blue-500 hover:underline"
              >
                Copy
              </button>
            </div>
            <pre className="bg-white dark:bg-gray-800 p-4 border border-gray-300 dark:border-gray-700 rounded overflow-x-auto text-sm">
              {header}
            </pre>
          </div>
        )}

        {payload && (
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="font-semibold">Payload</label>
              <button
                onClick={() => copy(payload)}
                className="text-sm text-blue-500 hover:underline"
              >
                Copy
              </button>
            </div>
            <pre className="bg-white dark:bg-gray-800 p-4 border border-gray-300 dark:border-gray-700 rounded overflow-x-auto text-sm">
              {payload}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
