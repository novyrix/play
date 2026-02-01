"use client";

import { useEffect, useState } from "react";

export default function RomanticPreloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 via-red-200 to-pink-400 animate-gradient">
      <div className="text-center space-y-6">
        {/* Animated hearts GIF */}
        <div className="relative">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDRzNnJwdGw5NHZ5bWF3N3hiOXR4dGx2aXJ2bzVoZzZ6ZDBqazNzZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0HlNyrvLKBMxjFzG/giphy.gif"
            alt="Loading hearts"
            className="w-32 h-32 md:w-48 md:h-48 mx-auto animate-pulse"
          />
        </div>

        {/* Loading text with romantic font */}
        <div className="space-y-2">
          <h2 className="text-4xl md:text-6xl font-vibes text-red-600 animate-bounce">
            Loading Magic...
          </h2>
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>

        {/* Credit */}
        <p className="text-lg md:text-xl text-red-700 font-pacifico opacity-80">
          Crafted with ❤️ by Spira
        </p>
      </div>
    </div>
  );
}
