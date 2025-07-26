"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";


interface PetImage {
  url: string;
}

const getPetImage = async (signal: AbortSignal): Promise<PetImage> => {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random", {
      signal,
    });

    if (!res.ok) throw new Error("Failed to fetch pet image");

    const data = await res.json();
    if (data.status !== "success" || !data.message) {
      throw new Error("Invalid image data received");
    }

    return { url: data.message } as PetImage;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw error; 
    }
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch pet image"
    );
  }
};

const RandomPetsImagesPage: React.FC = () => {
  const [petImage, setPetImage] = useState<PetImage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

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

  const fetchPetImage = useCallback(async (isRetry: boolean = false) => {
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
      }, 10000); // 10 second timeout

      const data = await getPetImage(signal);

      clearTimeout(timeoutId);

      if (signal.aborted) return;

      setPetImage(data);
      setLoading(false);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;

      console.error("Failed to fetch pet image:", err);
      setError(
        err instanceof Error
          ? err.message === "Failed to fetch"
            ? "Network error. Please check your connection."
            : err.message
          : "Failed to fetch pet image"
      );
      setLoading(false);
    } finally {
      abortControllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    fetchPetImage();
  }, [fetchPetImage]);

  const handleNextImage = () => {
    fetchPetImage();
  };

  const handleRetry = () => {
    fetchPetImage(true);
  };

  const handleCopy = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 1000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  }, []);

  if (loading && !petImage) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl p-4 shadow-xl border border-yellow-200">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-200 border-t-yellow-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🐶</span>
            </div>
          </div>
          <p className="mt-6 text-xl text-gray-700 font-medium">
            Fetching a cute pet image...
          </p>
          <p className="mt-2 text-sm text-gray-500">This won't take long!</p>
        </div>
      </div>
    );
  }

  if (error && !petImage) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl border border-red-200 max-w-md">
          <div className="text-6xl mb-4">😅</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Oops! Image Failed to Load
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

  if (!petImage) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center p-2">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-yellow-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-400 to-teal-400 p-3 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-3xl">🐶</span>
            <h1 className="text-3xl font-bold text-white">Random Pet Images</h1>
            <span className="text-3xl">🐾</span>
          </div>
          <p className="text-green-100">
            Discover adorable pets to brighten your day!
          </p>
        </div>

        <div className="p-8">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 mb-6 border border-blue-100 animate-in fade-in duration-500">
            <div
              className="relative cursor-pointer group"
              onClick={() => handleCopy(petImage.url)}
            >
              <img
                src={petImage.url}
                alt="Random Pet"
                className="w-full h-auto rounded-xl shadow-md object-cover max-h-[400px]"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {copiedUrl === petImage.url ? "Copied!" : "Copy Image URL"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-2">
            <button
              onClick={handleNextImage}
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold text-lg rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>🐾</span>
                  <span>Next Pet</span>
                </div>
              )}
            </button>
          </div>

          {error && petImage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
              <span>⚠️ {error}</span>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-4 py-2 text-center border-t">
          <p className="text-sm text-gray-500">Powered by Dog CEO API</p>
        </div>
      </div>
    </div>
  );
};

export default RandomPetsImagesPage;
