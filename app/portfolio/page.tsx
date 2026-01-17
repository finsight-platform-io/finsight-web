"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddHoldingForm from "@/components/AddHoldingForm";

interface PortfolioHolding {
  id: number;
  symbol: string;
  name: string;
  quantity: number;
  buy_price: number;
  buy_date: string;
}

interface HoldingWithPrice extends PortfolioHolding {
  current_price: number;
  total_investment: number;
  current_value: number;
  profit_loss: number;
  profit_loss_percent: number;
}

export default function PortfolioPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [holdings, setHoldings] = useState<HoldingWithPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [pricesLoading, setPricesLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
     if (status === "authenticated") {
      fetchPortfolio();
    }
  }, [status]);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/portfolio");
      const data = await response.json();

      if (data.success) {
        // Fetch current prices for all holdings
        await fetchCurrentPrices(data.portfolio);
      } else {
        setError(data.error || "Failed to fetch portfolio");
      }
    } catch (err) {
      console.error("Error fetching portfolio:", err);
      setError("Failed to fetch portfolio");
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentPrices = async (portfolioData: PortfolioHolding[]) => {
    if (portfolioData.length === 0) {
      setHoldings([]);
      return;
    }

    setPricesLoading(true);
    const holdingsWithPrices: HoldingWithPrice[] = [];

    for (const holding of portfolioData) {
      try {
        console.log(`Fetching price for: ${holding.symbol}`);
        const response = await fetch(`/api/stocks/${holding.symbol}`);
        const data = await response.json();
        console.log(`Price data for ${holding.symbol}:`, data);

        if (data.success && data.data && data.data.price) {
          const currentPrice = data.data.price;
          console.log(`Current price: ${currentPrice}, Buy price: ${holding.buy_price}`);
          const totalInvestment = holding.quantity * holding.buy_price;
          const currentValue = holding.quantity * currentPrice;
          const profitLoss = currentValue - totalInvestment;
          const profitLossPercent = (profitLoss / totalInvestment) * 100;

          holdingsWithPrices.push({
            ...holding,
            current_price: currentPrice,
            total_investment: totalInvestment,
            current_value: currentValue,
            profit_loss: profitLoss,
            profit_loss_percent: profitLossPercent,
          });
        } else {
          console.error(`No price data for ${holding.symbol}`, data);
          // Add holding with buy price as current price (fallback)
          const totalInvestment = holding.quantity * holding.buy_price;
          holdingsWithPrices.push({
            ...holding,
            current_price: holding.buy_price,
            total_investment: totalInvestment,
            current_value: totalInvestment,
            profit_loss: 0,
            profit_loss_percent: 0,
          });
        }
      } catch (err) {
        console.error(`Error fetching price for ${holding.symbol}:`, err);
        // Add holding with buy price as current price (fallback)
        const totalInvestment = holding.quantity * holding.buy_price;
        holdingsWithPrices.push({
          ...holding,
          current_price: holding.buy_price,
          total_investment: totalInvestment,
          current_value: totalInvestment,
          profit_loss: 0,
          profit_loss_percent: 0,
        });
      }
    }

    setHoldings(holdingsWithPrices);
    setPricesLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this holding from your portfolio?")) {
      return;
    }

    try {
      const response = await fetch(`/api/portfolio?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setHoldings(holdings.filter((h) => h.id !== id));
      } else {
        alert(data.error || "Failed to remove holding");
      }
    } catch (error) {
      console.error("Error removing holding:", error);
      alert("Failed to remove holding");
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const formatCurrency = (num: number) => {
    return `₹${formatNumber(Math.abs(num))}`;
  };

  // Calculate totals
  const totalInvestment = holdings.reduce((sum, h) => sum + h.total_investment, 0);
  const totalCurrentValue = holdings.reduce((sum, h) => sum + h.current_value, 0);
  const totalProfitLoss = totalCurrentValue - totalInvestment;
  const totalProfitLossPercent = totalInvestment > 0 ? (totalProfitLoss / totalInvestment) * 100 : 0;

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
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
              Sign in to view your portfolio
            </h2>
            <p className="text-gray-600 mb-6">
              Track your investments and monitor P&L with a personal portfolio
            </p>
            <button
              onClick={() => signIn("google")}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
              <p className="text-gray-600 mt-2">
                Track your investments and performance
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              + Add Holding
            </button>
          </div>
        </div>

        {/* Portfolio Summary */}
        {holdings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-sm text-gray-500 mb-2">Total Investment</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(totalInvestment)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-sm text-gray-500 mb-2">Current Value</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(totalCurrentValue)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-sm text-gray-500 mb-2">Total P&L</p>
              <p
                className={`text-3xl font-bold ${
                  totalProfitLoss >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {totalProfitLoss >= 0 ? "+" : "-"}
                {formatCurrency(totalProfitLoss)}
              </p>
              <p
                className={`text-sm font-medium mt-1 ${
                  totalProfitLoss >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {totalProfitLoss >= 0 ? "+" : ""}
                {totalProfitLossPercent.toFixed(2)}%
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <button
              onClick={fetchPortfolio}
              className="mt-2 text-red-600 underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!error && holdings.length === 0 && !loading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your portfolio is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Start adding your stock holdings to track performance
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add Your First Holding
            </button>
          </div>
        )}

        {/* Holdings List */}
        {holdings.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Holdings ({holdings.length})
            </h2>
            {pricesLoading && (
              <div className="text-center text-gray-600 mb-4">
                Loading current prices...
              </div>
            )}
            {holdings.map((holding) => {
              const isProfit = holding.profit_loss >= 0;
              return (
                <div
                  key={holding.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link href={`/stocks/${holding.symbol}`} className="group">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {holding.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {holding.symbol}
                        </p>
                      </Link>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-gray-500">Quantity</p>
                          <p className="text-sm font-medium text-gray-900">
                            {holding.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Buy Price</p>
                          <p className="text-sm font-medium text-gray-900">
                            ₹{formatNumber(holding.buy_price)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Current Price</p>
                          <p className="text-sm font-medium text-gray-900">
                            ₹{formatNumber(holding.current_price)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Buy Date</p>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(holding.buy_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                        <div>
                          <p className="text-xs text-gray-500">Investment</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {formatCurrency(holding.total_investment)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Current Value</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {formatCurrency(holding.current_value)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">P&L</p>
                          <p
                            className={`text-sm font-semibold ${
                              isProfit ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {isProfit ? "+" : "-"}
                            {formatCurrency(holding.profit_loss)} (
                            {isProfit ? "+" : ""}
                            {holding.profit_loss_percent.toFixed(2)}%)
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(holding.id)}
                      className="ml-4 text-red-600 hover:text-red-700 p-2"
                      title="Remove holding"
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
              );
            })}
          </div>
        )}
      </div>

      {/* Add Holding Modal */}
      {showAddForm && (
        <AddHoldingForm
          onClose={() => setShowAddForm(false)}
          onSuccess={fetchPortfolio}
        />
      )}
    </div>
  );
}
