"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface StockData {
  symbol: string;
  name: string;
  exchange: string;
  currency: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  avgVolume: number;
  marketCap: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  dividendYield?: number;
  beta?: number;
  trailingPE?: number;
  forwardPE?: number;
  marketState: string;
  regularMarketTime: string;
}

export default function StockDetailPage() {
  const params = useParams();
  const router = useRouter();
  const symbol = params.symbol as string;
  
  const [stock, setStock] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStockData();
  }, [symbol]);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/stocks/${symbol}`);
      const data = await response.json();

      if (data.success) {
        setStock(data.data);
      } else {
        setError(data.error || "Failed to fetch stock data");
      }
    } catch (err) {
      setError("Failed to fetch stock data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number | undefined) => {
    if (num === undefined || num === null) return "N/A";
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const formatMarketCap = (num: number | undefined) => {
    if (!num) return "N/A";
    if (num >= 1e12) return `₹${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `₹${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `₹${(num / 1e6).toFixed(2)}M`;
    return `₹${formatNumber(num)}`;
  };

  const formatPercent = (num: number | undefined) => {
    if (num === undefined || num === null) return "N/A";
    return num.toFixed(2);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-96 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !stock) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Error Loading Stock
          </h2>
          <p className="text-red-600 mb-4">{error || "Stock not found"}</p>
          <button
            onClick={() => router.push("/markets")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Go to Markets
          </button>
        </div>
      </div>
    );
  }

  const isPositive = stock.change >= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <svg
          className="w-5 h-5 mr-2"
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
        Back
      </button>

      {/* Stock Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {stock.name}
            </h1>
            <div className="flex items-center space-x-3">
              <span className="text-lg text-gray-600">{stock.symbol}</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {stock.exchange}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  stock.marketState === "CLOSED"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {stock.marketState}
              </span>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-end space-x-4">
            <div>
              <p className="text-5xl font-bold text-gray-900">
                ₹{formatNumber(stock.price)}
              </p>
            </div>
            <div className="pb-2">
              <div className="flex items-center space-x-2">
                <span
                  className={`text-2xl font-semibold ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {formatNumber(stock.change)}
                </span>
                <span
                  className={`px-3 py-1 rounded text-lg font-semibold ${
                    isPositive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {formatPercent(stock.changePercent)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Statistics Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Key Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <StatCard label="Previous Close" value={`₹${formatNumber(stock.previousClose)}`} />
          <StatCard label="Open" value={`₹${formatNumber(stock.open)}`} />
          <StatCard label="Day High" value={`₹${formatNumber(stock.dayHigh)}`} />
          <StatCard label="Day Low" value={`₹${formatNumber(stock.dayLow)}`} />
          <StatCard label="52W High" value={`₹${formatNumber(stock.fiftyTwoWeekHigh)}`} />
          <StatCard label="52W Low" value={`₹${formatNumber(stock.fiftyTwoWeekLow)}`} />
          <StatCard label="Volume" value={formatNumber(stock.volume)} />
          <StatCard label="Avg Volume" value={formatNumber(stock.avgVolume)} />
          <StatCard label="Market Cap" value={formatMarketCap(stock.marketCap)} />
          <StatCard 
            label="P/E Ratio" 
            value={stock.trailingPE ? formatPercent(stock.trailingPE) : "N/A"} 
          />
          <StatCard 
            label="Dividend Yield" 
            value={stock.dividendYield ? `${formatPercent(stock.dividendYield * 100)}%` : "N/A"} 
          />
          <StatCard 
            label="Beta" 
            value={stock.beta ? formatPercent(stock.beta) : "N/A"} 
          />
        </div>
      </div>

      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={fetchStockData}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}
