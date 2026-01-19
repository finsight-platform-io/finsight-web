"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SignInModal from "@/components/SignInModal";

interface Holding {
  id: number;
  symbol: string;
  name: string;
  quantity: number;
  buy_price: number;
  buy_date: string;
  current_price?: number;
  current_value?: number;
  investment_value?: number;
  profit_loss?: number;
  profit_loss_percentage?: number;
}

export default function PortfolioPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetchPortfolio();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/portfolio");
      const data = await response.json();

      if (data.success) {
        setHoldings(data.holdings || []);
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  // Empty State for Non-Authenticated Users - Investing.com Style
  if (status === "unauthenticated") {
    return (
      <>
        <div className="min-h-screen bg-gray-50">
          {/* Page Header */}
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
            </div>
          </div>

          {/* Empty State Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left Side - Features */}
                <div className="p-8 lg:p-12">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                    Monitor your financial instruments and track your holdings with Finsight portfolios
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-lg">
                        Monitor your portfolio holdings and performance
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-lg">
                        Track profit/loss and returns in real-time
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-lg">
                        Access your portfolio via PC, Tablet or Phone
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-lg">
                        Include stocks, mutual funds, and ETFs
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-lg">
                        Add holdings from stock pages or from within the portfolio
                      </p>
                    </div>
                  </div>

                  {/* Portfolio Preview Image */}
                  <div className="mt-8 hidden lg:block">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-orange-500/10 rounded-lg" />
                      <div className="relative p-6 bg-white/50 backdrop-blur-sm rounded-lg border-2 border-gray-200">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-300 rounded w-3/4" />
                          <div className="h-4 bg-gray-300 rounded w-full" />
                          <div className="h-4 bg-gray-300 rounded w-2/3" />
                          <div className="grid grid-cols-3 gap-3 mt-4">
                            <div className="h-20 bg-gradient-to-br from-green-400 to-green-600 rounded" />
                            <div className="h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded" />
                            <div className="h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded" />
                          </div>
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
                        Sign in to view your portfolio
                      </h3>
                      <p className="text-gray-600 text-center mb-8">
                        Track your investments and monitor P&L with a personal portfolio
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
                          <span>Free forever, no credit card required</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Real-time portfolio tracking</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Secure & private data</span>
                        </div>
                      </div>
                    </div>

                    {/* Additional CTA */}
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        Also check out{" "}
                        <button
                          onClick={() => router.push("/watchlist")}
                          className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                        >
                          Watchlist
                        </button>
                        {" "}to track stocks
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
            <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
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

  // Authenticated User - Show Portfolio (Your existing code continues here)
  const totalInvestment = holdings.reduce((sum, holding) => sum + (holding.investment_value || 0), 0);
  const totalCurrentValue = holdings.reduce((sum, holding) => sum + (holding.current_value || 0), 0);
  const totalProfitLoss = totalCurrentValue - totalInvestment;
  const totalProfitLossPercentage = totalInvestment > 0 ? (totalProfitLoss / totalInvestment) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Authenticated Portfolio View - Your existing portfolio UI */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
            <button
              onClick={fetchPortfolio}
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
        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-1">Total Investment</div>
            <div className="text-2xl font-bold text-gray-900">
              ₹{totalInvestment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-1">Current Value</div>
            <div className="text-2xl font-bold text-gray-900">
              ₹{totalCurrentValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-1">Total P&L</div>
            <div className={`text-2xl font-bold ${totalProfitLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
              {totalProfitLoss >= 0 ? "+" : ""}₹{Math.abs(totalProfitLoss).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              <span className="text-base ml-2">
                ({totalProfitLoss >= 0 ? "+" : ""}{totalProfitLossPercentage.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        {holdings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Holdings Yet</h3>
            <p className="text-gray-600 mb-6">Start adding stocks to your portfolio to track your investments</p>
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
            {/* Your existing holdings table code here */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">P&L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {holdings.map((holding) => (
                    <tr key={holding.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{holding.symbol}</div>
                        <div className="text-sm text-gray-500">{holding.name}</div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-900">{holding.quantity}</td>
                      <td className="px-6 py-4 text-right text-sm text-gray-900">₹{holding.buy_price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right text-sm text-gray-900">
                        ₹{holding.current_price?.toFixed(2) || "-"}
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-900">
                        ₹{holding.investment_value?.toLocaleString("en-IN") || "-"}
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-900">
                        ₹{holding.current_value?.toLocaleString("en-IN") || "-"}
                      </td>
                      <td className="px-6 py-4 text-right text-sm">
                        <div className={holding.profit_loss && holding.profit_loss >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {holding.profit_loss !== undefined ? (
                            <>
                              {holding.profit_loss >= 0 ? "+" : ""}₹{Math.abs(holding.profit_loss).toLocaleString("en-IN")}
                              <div className="text-xs">
                                ({holding.profit_loss >= 0 ? "+" : ""}{holding.profit_loss_percentage?.toFixed(2)}%)
                              </div>
                            </>
                          ) : "-"}
                        </div>
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
