"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
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
    if (status === "authenticated") {
      fetchWatchlist();
    }
  }, [status]);

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

  if (status === "loading") {
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
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Sign in to view your watchlist
            </h2>
            <p className="text-gray-600 mb-6">
              Track your favorite stocks by creating a personal watchlist
            </p>
            <button
              onClick={() => signIn("google")}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    );
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
