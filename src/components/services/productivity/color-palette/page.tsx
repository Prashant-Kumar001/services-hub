"use client";

import React, { useEffect, useState, useCallback } from "react";



const generateRandomColor = (): string =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

const generatePalette = (): string[] =>
  Array.from({ length: 10 }, generateRandomColor);

const ColorPalettePage: React.FC = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleCopy = useCallback(async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 1000);
    } catch (err) {
      console.error("Failed to copy color:", err);
    }
  }, []);

  const handleGeneratePalette = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setColors(generatePalette());
      setLoading(false);
    }, 500); 
  }, []);

  useEffect(() => {
    handleGeneratePalette();
  }, [handleGeneratePalette]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl border border-yellow-200">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-200 border-t-yellow-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🎨</span>
            </div>
          </div>
          <p className="mt-6 text-xl text-gray-700 font-medium">
            Generating a vibrant palette...
          </p>
          <p className="mt-2 text-sm text-gray-500">This won't take long!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center p-2">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-yellow-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-3xl">🎨</span>
            <h1 className="text-3xl font-bold text-white">
              Color Palette Generator
            </h1>
            <span className="text-3xl">🌈</span>
          </div>
          <p className="text-blue-100">
            Create vibrant palettes for your projects!
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
            {colors.map((color, idx) => (
              <div
                key={idx}
                className="rounded-xl shadow-md cursor-pointer relative overflow-hidden group border border-gray-100 animate-in fade-in duration-500"
                style={{ backgroundColor: color }}
                onClick={() => handleCopy(color)}
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {copiedColor === color ? "Copied!" : color.toUpperCase()}
                  </span>
                </div>
                <div className="aspect-square" />
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleGeneratePalette}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>🌟</span>
                  <span>Generate New Palette</span>
                </div>
              )}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 text-center border-t">
          <p className="text-sm text-gray-500">Powered by UtiliHub</p>
        </div>
      </div>
    </div>
  );
};

export default ColorPalettePage;
