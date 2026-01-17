"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface WatchlistStock {
  id: number;
  symbol: string;
  name: string;
  added_at: string;
}

export default function WatchlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [watchlist, setWatchlist] = useState<WatchlistStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      fetchWatchlist();
    }
  }, [status, router]);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/watchlist");
      const data = await response.json();

      if (data.success) {
        setWatchlist(data.watchlist);
      } else {
        setError(data.error || "Failed to fetch watchlist");
      }
    } catch (err) {
      console.error("Error fetching watchlist:", err);
      setError("Failed to fetch watchlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (symbol: string) => {
    if (!confirm("Remove this stock from your watchlist?")) {
      return;
    }

    try {
      const response = await fetch(`/api/watchlist?symbol=${symbol}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        // Remove from local state
        setWatchlist(watchlist.filter((stock) => stock.symbol !== symbol));
      } else {
        alert(data.error || "Failed to remove from watchlist");
      }
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      alert("Failed to remove from watchlist");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">My Watchlist</h1>
          <p className="text-gray-600 mt-2">
            Track your favorite stocks in one place
          </p>
        </div>

        {/* Watchlist Content */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <button
              onClick={fetchWatchlist}
              className="mt-2 text-red-600 underline"
            >
              Retry
            </button>
          </div>
        )}

        {!error && watchlist.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your watchlist is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Start adding stocks to track them here
            </p>
            <Link
              href="/markets"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Explore Markets
            </Link>
          </div>
        )}

        {watchlist.length > 0 && (
          <div className="space-y-4">
            {watchlist.map((stock) => (
              <div
                key={stock.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Link
                      href={`/stocks/${stock.symbol}`}
                      className="group"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {stock.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {stock.symbol}
                      </p>
                    </Link>
                    <p className="text-xs text-gray-400 mt-2">
                      Added {new Date(stock.added_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Link
                      href={`/stocks/${stock.symbol}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleRemove(stock.symbol)}
                      className="text-red-600 hover:text-red-700 p-2"
                      title="Remove from watchlist"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
