"use client";

import { useEffect, useState } from "react";

interface IndexData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  marketState: string;
}

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
}

interface MoversData {
  gainers: StockData[];
  losers: StockData[];
  totalStocks: number;
}

export default function MarketsPage() {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [movers, setMovers] = useState<MoversData | null>(null);
  const [loading, setLoading] = useState(true);
  const [moversLoading, setMoversLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchIndices();
    fetchMovers();
  }, []);

  const fetchIndices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/market/indices");
      const data = await response.json();

      if (data.success) {
        setIndices(data.indices);
      } else {
        setError(data.error || "Failed to fetch market data");
      }
    } catch (err) {
      setError("Failed to fetch market data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovers = async () => {
    try {
      setMoversLoading(true);
      const response = await fetch("/api/market/movers");
      const data = await response.json();

      if (data.success) {
        setMovers(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch movers:", err);
    } finally {
      setMoversLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const formatPercent = (num: number) => {
    return num.toFixed(2);
  };

  const formatMarketCap = (num: number) => {
    if (num >= 1e12) return `₹${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `₹${(num / 1e9).toFixed(2)}B`;
    return `₹${(num / 1e6).toFixed(2)}M`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={fetchIndices}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Market Overview</h1>
        <p className="text-gray-600 mt-2">
          Live data from NSE & BSE • Market is {indices[0]?.marketState || "N/A"}
        </p>
      </div>

      {/* Market Indices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {indices.map((index) => {
          const isPositive = index.change >= 0;
          return (
            <div
              key={index.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Index Name & Symbol */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {index.name}
                </h3>
                <p className="text-sm text-gray-500">{index.symbol}</p>
              </div>

              {/* Price */}
              <div className="mb-4">
                <p className="text-3xl font-bold text-gray-900">
                  ₹{formatNumber(index.price)}
                </p>
              </div>

              {/* Change */}
              <div className="flex items-center space-x-2">
                <span
                  className={`text-lg font-medium ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {formatNumber(index.change)}
                </span>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    isPositive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {formatPercent(index.changePercent)}%
                </span>
              </div>

              {/* Additional Info */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Open</p>
                    <p className="font-medium text-gray-900">
                      ₹{formatNumber(index.open)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Prev Close</p>
                    <p className="font-medium text-gray-900">
                      ₹{formatNumber(index.previousClose)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Day High</p>
                    <p className="font-medium text-gray-900">
                      ₹{formatNumber(index.dayHigh)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Day Low</p>
                    <p className="font-medium text-gray-900">
                      ₹{formatNumber(index.dayLow)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Movers Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Movers</h2>

        {moversLoading ? (
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Gainers */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Top Gainers
                </h3>
                <span className="text-2xl">📈</span>
              </div>

              <div className="space-y-3">
                {movers?.gainers.map((stock, index) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-500">
                          #{index + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {stock.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {stock.symbol}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ₹{formatNumber(stock.price)}
                      </p>
                      <p className="text-sm font-semibold text-green-600">
                        +{formatPercent(stock.changePercent)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Losers */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Top Losers
                </h3>
                <span className="text-2xl">📉</span>
              </div>

              <div className="space-y-3">
                {movers?.losers.map((stock, index) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-500">
                          #{index + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {stock.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {stock.symbol}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ₹{formatNumber(stock.price)}
                      </p>
                      <p className="text-sm font-semibold text-red-600">
                        {formatPercent(stock.changePercent)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={() => {
            fetchIndices();
            fetchMovers();
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}
