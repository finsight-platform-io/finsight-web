"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export default function NewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews();
    
    // Auto-refresh news every 15 minutes
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/news?q=indian stock market NSE BSE&max=8");
      const data = await response.json();

      if (data.success && data.articles?.length > 0) {
        setNewsArticles(data.articles);
      } else {
        setError("No news available");
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  // Format relative time
  const getRelativeTime = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    }
  };

  const itemsPerView = 4;
  const maxIndex = Math.max(0, newsArticles.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden border border-gray-200 animate-pulse">
                <div className="h-40 bg-gray-200" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state with retry
  if (error && newsArticles.length === 0) {
    return (
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchNews}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium animate-pulse">
              LIVE
            </span>
          </div>
          <Link
            href="/news"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
          >
            <span>View All</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
              aria-label="Next"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {newsArticles.map((article) => (
                <div
                  key={article.id}
                  className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-2"
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all group h-full"
                  >
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden bg-gray-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80";
                        }}
                      />
                      {/* Time badge */}
                      <div className="absolute top-2 right-2">
                        <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {getRelativeTime(article.publishedAt)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <span className="truncate">{article.source.name}</span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator - Mobile */}
          <div className="flex justify-center mt-4 space-x-1.5 lg:hidden">
            {Array.from({ length: Math.min(maxIndex + 1, 6) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
