
"use client";

import React, { useState, useCallback } from "react";


interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

const generatePassword = (options: PasswordOptions): string => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let characters = "";
  if (options.includeUppercase) characters += uppercase;
  if (options.includeLowercase) characters += lowercase;
  if (options.includeNumbers) characters += numbers;
  if (options.includeSymbols) characters += symbols;

  if (!characters) return "";

  let password = "";
  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

const PasswordGeneratorPage: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGeneratePassword = useCallback(() => {
    if (
      !options.includeUppercase &&
      !options.includeLowercase &&
      !options.includeNumbers &&
      !options.includeSymbols
    ) {
      setError("Please select at least one character type");
      setPassword("");
      return;
    }
    if (options.length < 4 || options.length > 50) {
      setError("Password length must be between 4 and 50 characters");
      setPassword("");
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      const newPassword = generatePassword(options);
      setPassword(newPassword);
      setLoading(false);
    }, 500); 
  }, [options]);

  const handleCopy = useCallback(async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  }, [password]);

  const handleOptionChange = (
    key: keyof PasswordOptions,
    value: boolean | number
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  if (loading && !password) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl border border-yellow-200">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-200 border-t-yellow-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">
                🔒
              </span>
            </div>
          </div>
          <p className="mt-6 text-xl text-gray-700 font-medium">
            Generating a secure password...
          </p>
          <p className="mt-2 text-sm text-gray-500">This won't take long!</p>
        </div>
      </div>
    );
  }

  if (error && !password) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl border border-red-200 max-w-md">
          <div className="text-6xl mb-4">😅</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Oops! Password Generation Failed
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleGeneratePassword}
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

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-yellow-200 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-400 to-cyan-400 p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-3xl">🔒</span>
            <h1 className="text-3xl font-bold text-white">
              Password Generator
            </h1>
            <span className="text-3xl">🛡️</span>
          </div>
          <p className="text-teal-100">
            Create secure passwords for your accounts!
          </p>
        </div>

        <div className="p-8">
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password Length (4-50)
              </label>
              <input
                type="number"
                min="4"
                max="50"
                value={options.length}
                onChange={(e) =>
                  handleOptionChange("length", parseInt(e.target.value))
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 placeholder-gray-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.includeUppercase}
                  onChange={(e) =>
                    handleOptionChange("includeUppercase", e.target.checked)
                  }
                  className="h-5 w-5 text-teal-500 focus:ring-teal-500"
                />
                <span className="text-gray-700">Uppercase (A-Z)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.includeLowercase}
                  onChange={(e) =>
                    handleOptionChange("includeLowercase", e.target.checked)
                  }
                  className="h-5 w-5 text-teal-500 focus:ring-teal-500"
                />
                <span className="text-gray-700">Lowercase (a-z)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.includeNumbers}
                  onChange={(e) =>
                    handleOptionChange("includeNumbers", e.target.checked)
                  }
                  className="h-5 w-5 text-teal-500 focus:ring-teal-500"
                />
                <span className="text-gray-700">Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.includeSymbols}
                  onChange={(e) =>
                    handleOptionChange("includeSymbols", e.target.checked)
                  }
                  className="h-5 w-5 text-teal-500 focus:ring-teal-500"
                />
                <span className="text-gray-700">Symbols (!@#$%)</span>
              </label>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={handleGeneratePassword}
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-lg rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center gap-2 justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center">
                  <span>🔐</span>
                  <span>Generate Password</span>
                </div>
              )}
            </button>
          </div>

          {password && (
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 mb-6 border border-blue-100 animate-in fade-in duration-500">
              <div className="flex items-center gap-3">
                <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  P
                </div>
                <p
                  className="text-lg text-gray-800 font-mono font-medium leading-relaxed flex-grow cursor-pointer"
                  onClick={handleCopy}
                >
                  {password}
                </p>
                <button
                  onClick={handleCopy}
                  className="text-teal-600 hover:text-teal-700"
                >
                  {copied ? (
                    <span className="text-sm font-medium">Copied!</span>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {error && password && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
              <span>⚠️ {error}</span>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 text-center border-t">
          <p className="text-sm text-gray-500">Powered by UtiliHub</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordGeneratorPage;
