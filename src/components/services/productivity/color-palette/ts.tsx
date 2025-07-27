"use client";

import React, { useEffect, useState, useCallback } from "react";

const generateRandomColor = (): string =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

const generatePalette = (): string[] =>
  Array.from({ length: 10 }, generateRandomColor);

const generateComplementaryColor = (color: string): string => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const compR = (255 - r).toString(16).padStart(2, "0");
  const compG = (255 - g).toString(16).padStart(2, "0");
  const compB = (255 - b).toString(16).padStart(2, "0");

  return `#${compR}${compG}${compB}`;
};

const generateAnalogousColors = (baseColor: string): string[] => {
  const hex = baseColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const colors = [baseColor];

  for (let i = 1; i <= 4; i++) {
    const shift = i * 30;
    const newR = Math.max(
      0,
      Math.min(255, r + Math.sin((shift * Math.PI) / 180) * 50)
    );
    const newG = Math.max(
      0,
      Math.min(255, g + Math.cos((shift * Math.PI) / 180) * 50)
    );
    const newB = Math.max(
      0,
      Math.min(255, b + Math.sin(((shift + 60) * Math.PI) / 180) * 50)
    );

    const color = `#${Math.round(newR)
      .toString(16)
      .padStart(2, "0")}${Math.round(newG)
      .toString(16)
      .padStart(2, "0")}${Math.round(newB).toString(16).padStart(2, "0")}`;
    colors.push(color);
  }

  return colors.slice(0, 5);
};

const generateMonochromaticColors = (baseColor: string): string[] => {
  const hex = baseColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const colors = [];

  for (let i = 0; i < 5; i++) {
    const factor = 0.2 + i * 0.2;
    const newR = Math.round(r * factor);
    const newG = Math.round(g * factor);
    const newB = Math.round(b * factor);

    const color = `#${newR.toString(16).padStart(2, "0")}${newG
      .toString(16)
      .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
    colors.push(color);
  }

  return colors;
};

const rgbToHsl = (
  r: number,
  g: number,
  b: number
): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

const ColorPalettePage: React.FC = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [paletteMode, setPaletteMode] = useState<string>("random");
  const [baseColor, setBaseColor] = useState<string>("#3B82F6");
  const [savedPalettes, setSavedPalettes] = useState<string[][]>([]);
  const [showColorDetails, setShowColorDetails] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<string>("hex");
  const [paletteSize, setPaletteSize] = useState<number>(10);

  const handleCopy = useCallback(
    async (color: string) => {
      try {
        let textToCopy = color;
        if (exportFormat === "rgb") {
          const hex = color.replace("#", "");
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);
          textToCopy = `rgb(${r}, ${g}, ${b})`;
        } else if (exportFormat === "hsl") {
          const hex = color.replace("#", "");
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);
          const [h, s, l] = rgbToHsl(r, g, b);
          textToCopy = `hsl(${h}, ${s}%, ${l}%)`;
        }

        await navigator.clipboard.writeText(textToCopy);
        setCopiedColor(color);
        setTimeout(() => setCopiedColor(null), 1000);
      } catch (err) {
        console.error("Failed to copy color:", err);
      }
    },
    [exportFormat]
  );

  const handleGeneratePalette = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      let newColors: string[] = [];

      switch (paletteMode) {
        case "complementary":
          const comp = generateComplementaryColor(baseColor);
          newColors = [
            baseColor,
            comp,
            ...Array.from({ length: paletteSize - 2 }, generateRandomColor),
          ];
          break;
        case "analogous":
          const analogous = generateAnalogousColors(baseColor);
          newColors = [
            ...analogous,
            ...Array.from(
              { length: Math.max(0, paletteSize - 5) },
              generateRandomColor
            ),
          ];
          break;
        case "monochromatic":
          const monochromatic = generateMonochromaticColors(baseColor);
          newColors = [
            ...monochromatic,
            ...Array.from(
              { length: Math.max(0, paletteSize - 5) },
              generateRandomColor
            ),
          ];
          break;
        default:
          newColors = Array.from({ length: paletteSize }, generateRandomColor);
      }

      setColors(newColors.slice(0, paletteSize));
      setLoading(false);
    }, 500);
  }, [paletteMode, baseColor, paletteSize]);

  const savePalette = useCallback(() => {
    if (colors.length > 0) {
      setSavedPalettes((prev) => [...prev, colors].slice(-5));
    }
  }, [colors]);

  const loadPalette = useCallback((palette: string[]) => {
    setColors(palette);
  }, []);

  const exportPalette = useCallback(() => {
    const exportData = colors.map((color) => {
      if (exportFormat === "rgb") {
        const hex = color.replace("#", "");
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return `rgb(${r}, ${g}, ${b})`;
      } else if (exportFormat === "hsl") {
        const hex = color.replace("#", "");
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const [h, s, l] = rgbToHsl(r, g, b);
        return `hsl(${h}, ${s}%, ${l}%)`;
      }
      return color;
    });

    const text = exportData.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `palette-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [colors, exportFormat]);

  const getColorInfo = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const [h, s, l] = rgbToHsl(r, g, b);

    return {
      hex: color.toUpperCase(),
      rgb: `RGB(${r}, ${g}, ${b})`,
      hsl: `HSL(${h}, ${s}%, ${l}%)`,
    };
  };

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
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 p-2">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-yellow-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-3xl">🎨</span>
            <h1 className="text-3xl font-bold text-white">
              Enhanced Color Palette Generator
            </h1>
            <span className="text-3xl">🌈</span>
          </div>
          <p className="text-blue-100">
            Create vibrant palettes with advanced features!
          </p>
        </div>

        <div className="p-6">
          {/* Controls Panel */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palette Mode
                </label>
                <select
                  value={paletteMode}
                  onChange={(e) => setPaletteMode(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="random">Random</option>
                  <option value="complementary">Complementary</option>
                  <option value="analogous">Analogous</option>
                  <option value="monochromatic">Monochromatic</option>
                </select>
              </div>

              {paletteMode !== "random" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Color
                  </label>
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palette Size
                </label>
                <select
                  value={paletteSize}
                  onChange={(e) => setPaletteSize(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={5}>5 Colors</option>
                  <option value={8}>8 Colors</option>
                  <option value={10}>10 Colors</option>
                  <option value={12}>12 Colors</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Format
                </label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="hex">HEX</option>
                  <option value="rgb">RGB</option>
                  <option value="hsl">HSL</option>
                </select>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div
            className={`grid gap-4 mb-6 ${
              paletteSize <= 8
                ? "grid-cols-2 sm:grid-cols-4 md:grid-cols-8"
                : "grid-cols-2 sm:grid-cols-5 md:grid-cols-10"
            }`}
          >
            {colors.map((color, idx) => (
              <div key={idx} className="relative group">
                <div
                  className="rounded-xl shadow-md cursor-pointer relative overflow-hidden border border-gray-100 animate-in fade-in duration-500 aspect-square"
                  style={{ backgroundColor: color }}
                  onClick={() => handleCopy(color)}
                >
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-medium text-center px-2">
                      {copiedColor === color
                        ? "Copied!"
                        : showColorDetails
                        ? getColorInfo(color)[
                            exportFormat as keyof ReturnType<
                              typeof getColorInfo
                            >
                          ]
                        : color.toUpperCase()}
                    </span>
                  </div>
                </div>
                {showColorDetails && (
                  <div className="mt-2 text-xs text-center text-gray-600">
                    <div>{getColorInfo(color).hex}</div>
                    <div className="text-gray-500">
                      {getColorInfo(color).rgb}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={handleGeneratePalette}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex items-center gap-2">
                <span>🌟</span>
                <span>Generate New</span>
              </div>
            </button>

            <button
              onClick={savePalette}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <span>💾</span>
                <span>Save Palette</span>
              </div>
            </button>

            <button
              onClick={exportPalette}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <span>📁</span>
                <span>Export</span>
              </div>
            </button>

            <button
              onClick={() => setShowColorDetails(!showColorDetails)}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <span>ℹ️</span>
                <span>Toggle Details</span>
              </div>
            </button>
          </div>

          {/* Saved Palettes */}
          {savedPalettes.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span>📚</span>
                Saved Palettes
              </h3>
              <div className="space-y-4">
                {savedPalettes.map((palette, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex gap-1">
                      {palette.slice(0, 5).map((color, colorIdx) => (
                        <div
                          key={colorIdx}
                          className="w-8 h-8 rounded border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => loadPalette(palette)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      Load
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 text-center border-t">
          <p className="text-sm text-gray-500">
            Enhanced Color Palette Generator - Powered by UtiliHub
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorPalettePage;
