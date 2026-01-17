"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      fetchPortfolio();
    }
  }, [status, router]);

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

  if (status === "loading" || loading) {
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
    return null;
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
