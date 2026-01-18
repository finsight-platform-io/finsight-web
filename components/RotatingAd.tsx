"use client";

import { useState, useEffect } from "react";

export default function RotatingAd() {
  const [currentAd, setCurrentAd] = useState(0);

  const ads = [
    {
      id: 1,
      title: "Google Gemini",
      subtitle: "Advanced AI Assistant",
      description: "Get help with market analysis powered by AI",
      bgGradient: "from-blue-600 to-purple-600",
      icon: "✨",
      cta: "Try Gemini",
      link: "https://gemini.google.com",
    },
    {
      id: 2,
      title: "Meta AI",
      subtitle: "Chat with Meta AI",
      description: "Ask anything, create images, get instant answers",
      bgGradient: "from-blue-500 to-indigo-600",
      icon: "🤖",
      cta: "Try Meta AI",
      link: "https://www.meta.ai",
    },
    {
      id: 3,
      title: "NVIDIA AI",
      subtitle: "Power Your AI",
      description: "GPU-accelerated computing for developers",
      bgGradient: "from-green-500 to-green-700",
      icon: "🚀",
      cta: "Learn More",
      link: "https://www.nvidia.com/en-us/ai/",
    },
  ];

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [ads.length]);

  const ad = ads[currentAd];

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:opacity-90 transition-opacity"
      >
        <div className={`bg-gradient-to-br ${ad.bgGradient} p-6 min-h-[280px] flex flex-col justify-between`}>
          {/* Icon */}
          <div className="text-5xl mb-3">{ad.icon}</div>

          {/* Content */}
          <div className="flex-grow">
            <h3 className="text-white font-bold text-xl mb-1">{ad.title}</h3>
            <p className="text-white/90 text-sm font-medium mb-2">{ad.subtitle}</p>
            <p className="text-white/80 text-sm">{ad.description}</p>
          </div>

          {/* CTA */}
          <button className="w-full bg-white text-gray-900 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors mt-4">
            {ad.cta} →
          </button>

          {/* Ad Label */}
          <p className="text-xs text-white/60 text-center mt-3">Sponsored</p>
        </div>
      </a>

      {/* Indicator Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentAd(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentAd ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
