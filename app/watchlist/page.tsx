"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SignInModal from "@/components/SignInModal";

interface WatchlistStock {
  id: number;
  symbol: string;
  name: string;
  current_price?: number;
  change?: number;
  change_percent?: number;
}

export default function WatchlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stocks, setStocks] = useState<WatchlistStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetchWatchlist();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/watchlist");
      const data = await response.json();

      if (data.success) {
        setStocks(data.stocks || []);
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    } finally {
      setLoading(false);
    }
  };

  // Empty State for Non-Authenticated Users
  if (status === "unauthenticated") {
    return (
      <>
        <div className="min-h-screen bg-gray-50">
          {/* Page Header */}
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <h1 className="text-3xl font-bold text-gray-900">My Watchlist</h1>
            </div>
          </div>

          {/* Empty State Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left Side - Features */}
                <div className="p-8 lg:p-12">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                    Create personalized watchlists and track your favorite stocks
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-lg">
                        Track real-time stock prices and movements
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-lg">
                        Monitor multiple stocks in one place
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-lg">
                        Access your watchlist from any device
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-lg">
                        Get instant updates on price changes
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-lg">
                        Add stocks with a single click from any page
                      </p>
                    </div>
                  </div>

                  {/* Watchlist Preview */}
                  <div className="mt-8 hidden lg:block">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg" />
                      <div className="relative p-6 bg-white/50 backdrop-blur-sm rounded-lg border-2 border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-semibold text-gray-700">My Watchlist</span>
                          </div>
                          <div className="text-sm text-gray-500">5 stocks</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-white rounded">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">RELIANCE</div>
                              <div className="text-xs text-gray-500">Reliance Industries</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-gray-900">₹2,450.50</div>
                              <div className="text-xs text-green-600">+2.5%</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded opacity-75">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">TCS</div>
                              <div className="text-xs text-gray-500">Tata Consultancy</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-gray-900">₹3,680.25</div>
                              <div className="text-xs text-red-600">-0.8%</div>
                            </div>
                          </div>
                          <div className="h-12 bg-white rounded opacity-50" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Sign In Card */}
                <div className="bg-gray-50 p-8 lg:p-12 flex items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                      {/* Lock Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                        Sign in to view your watchlist
                      </h3>
                      <p className="text-gray-600 text-center mb-8">
                        Track your favorite stocks and monitor price movements
                      </p>

                      {/* Sign In Button */}
                      <button
                        onClick={() => setShowSignInModal(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>Sign in with Google</span>
                      </button>

                      {/* Benefits List */}
                      <div className="mt-6 space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Free forever, no limits</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Real-time price updates</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Access from anywhere</span>
                        </div>
                      </div>
                    </div>

                    {/* Additional CTA */}
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        Also try{" "}
                        <button
                          onClick={() => router.push("/portfolio")}
                          className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                        >
                          Portfolio
                        </button>
                        {" "}to track investments
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sign In Modal */}
        {showSignInModal && (
          <SignInModal onClose={() => setShowSignInModal(false)} />
        )}
      </>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">My Watchlist</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  // Authenticated User - Show Watchlist (Your existing code continues here)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Watchlist</h1>
            <button
              onClick={fetchWatchlist}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {stocks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Watchlist is Empty</h3>
            <p className="text-gray-600 mb-6">Start adding stocks to track their performance</p>
            <button
              onClick={() => router.push("/markets")}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>Browse Stocks</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Your existing watchlist table code here */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change %</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stocks.map((stock) => (
                    <tr key={stock.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <button
                          onClick={() => router.push(`/stocks/${stock.symbol}`)}
                          className="text-left hover:text-blue-600"
                        >
                          <div className="font-medium text-gray-900">{stock.symbol}</div>
                          <div className="text-sm text-gray-500">{stock.name}</div>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-900">
                        ₹{stock.current_price?.toFixed(2) || "-"}
                      </td>
                      <td className={`px-6 py-4 text-right text-sm font-medium ${
                        stock.change && stock.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {stock.change !== undefined ? `${stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)}` : "-"}
                      </td>
                      <td className={`px-6 py-4 text-right text-sm font-medium ${
                        stock.change_percent && stock.change_percent >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {stock.change_percent !== undefined ? `${stock.change_percent >= 0 ? "+" : ""}${stock.change_percent.toFixed(2)}%` : "-"}
                      </td>
                      <td className="px-6 py-4 text-right text-sm">
                        <button
                          onClick={() => router.push(`/stocks/${stock.symbol}`)}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
