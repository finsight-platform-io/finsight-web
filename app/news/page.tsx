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

// News categories matching Investing.com structure
const newsCategories = [
  { id: "economy", label: "Economy", query: "india economy RBI GDP inflation" },
  { id: "stock-market", label: "Stock Market News", query: "indian stock market NSE BSE nifty sensex" },
  { id: "commodities", label: "Commodities", query: "gold silver crude oil india commodity" },
  { id: "cryptocurrency", label: "Cryptocurrency", query: "bitcoin crypto india" },
  { id: "forex", label: "Forex", query: "indian rupee USD INR forex" },
  { id: "mutual-funds", label: "Mutual Funds", query: "mutual funds india SIP investment" },
];

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("stock-market");
  const [mostRead, setMostRead] = useState<NewsArticle[]>([]);

  useEffect(() => {
    fetchNews();
  }, [activeCategory]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      const category = newsCategories.find((c) => c.id === activeCategory);
      const query = encodeURIComponent(category?.query || "indian stock market");

      const response = await fetch(`/api/news?q=${query}&max=12`);
      const data = await response.json();

      if (data.success && data.articles?.length > 0) {
        setArticles(data.articles);
        // Set first 5 as "most read" for sidebar
        setMostRead(data.articles.slice(0, 5));
      } else {
        setError("No news articles found");
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  // Format relative time like Investing.com
  const getRelativeTime = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  // Format date for article
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>›</span>
            <Link href="/news" className="hover:text-blue-600">
              News
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">
              {newsCategories.find((c) => c.id === activeCategory)?.label}
            </span>
          </div>
        </div>
      </div>

      {/* Category Navigation - Investing.com style */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 overflow-x-auto py-1">
            {newsCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeCategory === category.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {newsCategories.find((c) => c.id === activeCategory)?.label}
              </h1>
              <p className="text-gray-600 mt-1">
                Latest {newsCategories.find((c) => c.id === activeCategory)?.label.toLowerCase()} news and updates
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="space-y-4">
                {/* Featured skeleton */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                  <div className="h-64 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                {/* List skeletons */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-4 shadow-sm animate-pulse flex gap-4">
                    <div className="w-32 h-24 bg-gray-200 rounded flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded" />
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                <div className="text-5xl mb-4">📰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{error}</h3>
                <p className="text-gray-600 mb-4">
                  Unable to fetch news. Please try again.
                </p>
                <button
                  onClick={fetchNews}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* News Articles */}
            {!loading && !error && articles.length > 0 && (
              <div className="space-y-4">
                {/* Featured Article (First) - Large card */}
                {articles[0] && (
                  <a
                    href={articles[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="relative h-64 sm:h-80 overflow-hidden">
                      <img
                        src={articles[0].image}
                        alt={articles[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center space-x-2 text-sm mb-2">
                          <span className="bg-blue-600 px-2 py-0.5 rounded text-xs font-medium">
                            Featured
                          </span>
                          <span className="opacity-80">{articles[0].source.name}</span>
                          <span className="opacity-60">•</span>
                          <span className="opacity-80">{getRelativeTime(articles[0].publishedAt)}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold leading-tight group-hover:underline">
                          {articles[0].title}
                        </h2>
                        {articles[0].description && (
                          <p className="mt-2 text-gray-200 line-clamp-2 text-sm sm:text-base">
                            {articles[0].description}
                          </p>
                        )}
                      </div>
                    </div>
                  </a>
                )}

                {/* Rest of Articles - List style like Investing.com */}
                {articles.slice(1).map((article, index) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    {/* Thumbnail */}
                    <div className="w-32 sm:w-40 h-24 sm:h-28 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80";
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-2 hidden sm:block">
                          {article.description}
                        </p>
                      )}
                      <div className="flex items-center text-xs text-gray-500 space-x-2">
                        <span className="font-medium text-gray-700">{article.source.name}</span>
                        <span>•</span>
                        <span>{getRelativeTime(article.publishedAt)}</span>
                      </div>
                    </div>

                    {/* External link indicator */}
                    <div className="hidden sm:flex items-center text-gray-400 group-hover:text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}

                {/* Load More Button */}
                <div className="text-center pt-4">
                  <button
                    onClick={fetchNews}
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium px-6 py-3 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Refresh News</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Like Investing.com */}
          <aside className="lg:w-1/3">
            {/* Most Read Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b flex items-center">
                <span className="text-orange-500 mr-2">🔥</span>
                Most Read
              </h3>
              
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="animate-pulse flex gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-200 rounded" />
                        <div className="h-3 bg-gray-200 rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ol className="space-y-4">
                  {mostRead.map((article, index) => (
                    <li key={article.id}>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-3 group"
                      >
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          index === 0 ? "bg-orange-500 text-white" :
                          index === 1 ? "bg-orange-400 text-white" :
                          index === 2 ? "bg-orange-300 text-white" :
                          "bg-gray-200 text-gray-600"
                        }`}>
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {getRelativeTime(article.publishedAt)}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  href="/markets"
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-gray-700 group-hover:text-blue-600">Market Overview</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/watchlist"
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-gray-700 group-hover:text-blue-600">My Watchlist</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/portfolio"
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-gray-700 group-hover:text-blue-600">My Portfolio</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Ad placeholder / Premium CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-sm p-6 mt-6 text-white">
              <div className="text-center">
                <span className="text-3xl mb-2 block">💎</span>
                <h3 className="text-lg font-bold mb-2">Finsight Pro</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get real-time alerts, advanced charts & exclusive analysis
                </p>
                <Link
                  href="/pro"
                  className="inline-block bg-white text-blue-600 font-medium px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-200 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Disclaimer:</strong> News articles are sourced from third-party providers. 
            Finsight does not guarantee the accuracy of the information. Investment involves risk. 
            Please read all related documents carefully before investing.
          </p>
        </div>
      </div>
    </div>
  );
}
