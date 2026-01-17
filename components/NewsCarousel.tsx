"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const newsArticles = [
    {
      id: 1,
      title: "Nifty 50 hits all-time high as IT stocks rally on strong earnings",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      category: "Market",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "RBI announces new monetary policy guidelines for 2026",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
      category: "Economy",
      time: "4 hours ago",
    },
    {
      id: 3,
      title: "Reliance Industries reports 15% YoY growth in Q4 earnings",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      category: "Stocks",
      time: "6 hours ago",
    },
    {
      id: 4,
      title: "Foreign investors turn net buyers with ₹2,500 crore inflow",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
      category: "Market",
      time: "8 hours ago",
    },
    {
      id: 5,
      title: "Banking stocks surge on positive earnings outlook",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
      category: "Stocks",
      time: "1 day ago",
    },
    {
      id: 6,
      title: "Crude oil prices impact Indian market sentiment",
      image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
      category: "Economy",
      time: "1 day ago",
    },
  ];

  const itemsPerView = 4;
  const maxIndex = Math.max(0, newsArticles.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Latest Market News</h2>
            <p className="text-gray-600 mt-2">Stay updated with real-time market insights</p>
          </div>
          <Link
            href="/news"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View All →
          </Link>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Previous"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Next"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
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
                  <Link
                    href="/news"
                    className="block bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            article.category === "Market"
                              ? "bg-blue-100 text-blue-800"
                              : article.category === "Stocks"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-gray-900 line-clamp-3 group-hover:text-blue-600 transition-colors mb-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-500">{article.time}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator - Mobile Only */}
          <div className="flex justify-center mt-6 space-x-2 lg:hidden">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
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
