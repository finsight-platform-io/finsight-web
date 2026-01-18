"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Stock {
  symbol: string;
  displaySymbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  marketCapFormatted: string;
  pe: number | null;
  pb: number | null;
  dividendYield: number | null;
  volume: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  sector: string;
}

interface Filters {
  sector: string;
  minMarketCap: string;
  maxMarketCap: string;
  minPE: string;
  maxPE: string;
  minPrice: string;
  maxPrice: string;
  minChange: string;
  maxChange: string;
  minDividendYield: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const SECTORS = [
  "All",
  "Technology",
  "Banking",
  "Financial Services",
  "Oil & Gas",
  "FMCG",
  "Automobile",
  "Pharma",
  "Metals",
  "Infrastructure",
  "Power",
  "Telecom",
  "Consumer Durables",
  "New Age Tech",
  "Travel & Hospitality",
];

const PRESET_SCREENS = [
  {
    name: "Top Gainers",
    icon: "📈",
    filters: { sortBy: "changePercent", sortOrder: "desc" as const },
  },
  {
    name: "Top Losers",
    icon: "📉",
    filters: { sortBy: "changePercent", sortOrder: "asc" as const },
  },
  {
    name: "High Dividend",
    icon: "💰",
    filters: { sortBy: "dividendYield", sortOrder: "desc" as const, minDividendYield: "1" },
  },
  {
    name: "Low P/E",
    icon: "🎯",
    filters: { sortBy: "pe", sortOrder: "asc" as const, maxPE: "25" },
  },
  {
    name: "Large Cap",
    icon: "🏢",
    filters: { sortBy: "marketCap", sortOrder: "desc" as const, minMarketCap: "50000" },
  },
  {
    name: "Most Active",
    icon: "🔥",
    filters: { sortBy: "volume", sortOrder: "desc" as const },
  },
];

const defaultFilters: Filters = {
  sector: "All",
  minMarketCap: "",
  maxMarketCap: "",
  minPE: "",
  maxPE: "",
  minPrice: "",
  maxPrice: "",
  minChange: "",
  maxChange: "",
  minDividendYield: "",
  sortBy: "marketCap",
  sortOrder: "desc",
};

export default function ScreenerPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchStocks(defaultFilters);
  }, []);

  const fetchStocks = async (activeFilters: Filters) => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      // Only add non-empty filters
      if (activeFilters.sector && activeFilters.sector !== "All") {
        params.append("sector", activeFilters.sector);
      }
      if (activeFilters.minMarketCap) {
        params.append("minMarketCap", activeFilters.minMarketCap);
      }
      if (activeFilters.maxMarketCap) {
        params.append("maxMarketCap", activeFilters.maxMarketCap);
      }
      if (activeFilters.minPE) {
        params.append("minPE", activeFilters.minPE);
      }
      if (activeFilters.maxPE) {
        params.append("maxPE", activeFilters.maxPE);
      }
      if (activeFilters.minPrice) {
        params.append("minPrice", activeFilters.minPrice);
      }
      if (activeFilters.maxPrice) {
        params.append("maxPrice", activeFilters.maxPrice);
      }
      if (activeFilters.minChange) {
        params.append("minChange", activeFilters.minChange);
      }
      if (activeFilters.maxChange) {
        params.append("maxChange", activeFilters.maxChange);
      }
      if (activeFilters.minDividendYield) {
        params.append("minDividendYield", activeFilters.minDividendYield);
      }
      
      params.append("sortBy", activeFilters.sortBy);
      params.append("sortOrder", activeFilters.sortOrder);
      params.append("limit", "50");

      console.log("Fetching with params:", params.toString());

      const response = await fetch(`/api/screener?${params.toString()}`);
      const data = await response.json();

      console.log("Response:", data);

      if (data.success) {
        setStocks(data.stocks || []);
        if (data.lastUpdated) {
          setLastUpdated(new Date(data.lastUpdated));
        }
      } else {
        setError(data.error || "Failed to fetch stocks");
        setStocks([]);
      }
    } catch (err) {
      console.error("Screener error:", err);
      setError("Failed to load stock data. Please try again.");
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    fetchStocks(filters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    fetchStocks(defaultFilters);
  };

  const applyPreset = (preset: typeof PRESET_SCREENS[0]) => {
    const newFilters: Filters = { ...defaultFilters, ...preset.filters };
    setFilters(newFilters);
    fetchStocks(newFilters);
  };

  const handleSort = (column: string) => {
    const newOrder = filters.sortBy === column && filters.sortOrder === "desc" ? "asc" : "desc";
    const newFilters = { ...filters, sortBy: column, sortOrder: newOrder as "asc" | "desc" };
    setFilters(newFilters);
    fetchStocks(newFilters);
  };

  const formatVolume = (volume: number): string => {
    if (volume >= 10000000) {
      return `${(volume / 10000000).toFixed(2)} Cr`;
    } else if (volume >= 100000) {
      return `${(volume / 100000).toFixed(2)} L`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(2)} K`;
    }
    return volume.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm mb-4 text-blue-100">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <span>Stock Screener</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <span className="mr-3">🔍</span>
                Stock Screener
              </h1>
              <p className="text-blue-100 mt-2">
                Filter and discover stocks based on key metrics
              </p>
            </div>
            {lastUpdated && (
              <div className="text-sm text-blue-200">
                Last updated: {lastUpdated.toLocaleTimeString("en-IN")}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Preset Screens */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Screens</h3>
          <div className="flex flex-wrap gap-2">
            {PRESET_SCREENS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm font-medium text-gray-700"
              >
                <span>{preset.icon}</span>
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => setShowFilters(!showFilters)}
          >
            <h3 className="font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </h3>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${showFilters ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {showFilters && (
            <div className="p-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Sector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                  <select
                    value={filters.sector}
                    onChange={(e) => handleFilterChange("sector", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                  >
                    {SECTORS.map((sector) => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>

                {/* Market Cap Min */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Market Cap (Cr)</label>
                  <input
                    type="number"
                    placeholder="e.g., 10000"
                    value={filters.minMarketCap}
                    onChange={(e) => handleFilterChange("minMarketCap", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                  />
                </div>

                {/* Market Cap Max */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Market Cap (Cr)</label>
                  <input
                    type="number"
                    placeholder="e.g., 100000"
                    value={filters.maxMarketCap}
                    onChange={(e) => handleFilterChange("maxMarketCap", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                  />
                </div>

                {/* P/E Min */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min P/E</label>
                  <input
                    type="number"
                    placeholder="e.g., 5"
                    value={filters.minPE}
                    onChange={(e) => handleFilterChange("minPE", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                  />
                </div>

                {/* P/E Max */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max P/E</label>
                  <input
                    type="number"
                    placeholder="e.g., 30"
                    value={filters.maxPE}
                    onChange={(e) => handleFilterChange("maxPE", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                  />
                </div>

                {/* Price Min */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Price (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g., 100"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                  />
                </div>

                {/* Price Max */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g., 5000"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                  />
                </div>

                {/* Dividend Yield */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Dividend Yield %</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 1"
                    value={filters.minDividendYield}
                    onChange={(e) => handleFilterChange("minDividendYield", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                  />
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                  >
                    <option value="marketCap">Market Cap</option>
                    <option value="price">Price</option>
                    <option value="changePercent">Change %</option>
                    <option value="pe">P/E Ratio</option>
                    <option value="dividendYield">Dividend Yield</option>
                    <option value="volume">Volume</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) => handleFilterChange("sortOrder", e.target.value as "asc" | "desc")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                  >
                    <option value="desc">High to Low</option>
                    <option value="asc">Low to High</option>
                  </select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={applyFilters}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Apply Filters"}
                </button>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Reset
                </button>
                <span className="text-sm text-gray-500 ml-auto">
                  {stocks.length} stocks found
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading stocks data...</p>
              <p className="text-sm text-gray-400 mt-1">This may take a few seconds on first load</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={() => fetchStocks(filters)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : stocks.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-600 font-medium">No stocks match your filters</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filter criteria</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Stock
                    </th>
                    <th
                      className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("price")}
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Price</span>
                        {filters.sortBy === "price" && (
                          <span>{filters.sortOrder === "desc" ? "↓" : "↑"}</span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("changePercent")}
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Change</span>
                        {filters.sortBy === "changePercent" && (
                          <span>{filters.sortOrder === "desc" ? "↓" : "↑"}</span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden md:table-cell"
                      onClick={() => handleSort("marketCap")}
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Market Cap</span>
                        {filters.sortBy === "marketCap" && (
                          <span>{filters.sortOrder === "desc" ? "↓" : "↑"}</span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden lg:table-cell"
                      onClick={() => handleSort("pe")}
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>P/E</span>
                        {filters.sortBy === "pe" && (
                          <span>{filters.sortOrder === "desc" ? "↓" : "↑"}</span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden lg:table-cell"
                      onClick={() => handleSort("dividendYield")}
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Div Yield</span>
                        {filters.sortBy === "dividendYield" && (
                          <span>{filters.sortOrder === "desc" ? "↓" : "↑"}</span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden xl:table-cell"
                      onClick={() => handleSort("volume")}
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Volume</span>
                        {filters.sortBy === "volume" && (
                          <span>{filters.sortOrder === "desc" ? "↓" : "↑"}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                      Sector
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stocks.map((stock) => (
                    <tr
                      key={stock.symbol}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <Link href={`/stocks/${stock.symbol}`} className="block">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm mr-3">
                              {stock.displaySymbol.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 hover:text-blue-600">
                                {stock.displaySymbol}
                              </p>
                              <p className="text-xs text-gray-500 truncate max-w-[150px]">
                                {stock.name}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="font-semibold text-gray-900">
                          ₹{stock.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className={`font-medium ${stock.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                          <span>{stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%</span>
                          <p className="text-xs">
                            {stock.change >= 0 ? "+" : ""}₹{stock.change.toFixed(2)}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right hidden md:table-cell">
                        <span className="text-gray-900">{stock.marketCapFormatted}</span>
                      </td>
                      <td className="px-4 py-4 text-right hidden lg:table-cell">
                        <span className="text-gray-900">
                          {stock.pe ? stock.pe.toFixed(2) : "-"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right hidden lg:table-cell">
                        <span className="text-gray-900">
                          {stock.dividendYield ? `${stock.dividendYield.toFixed(2)}%` : "-"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right hidden xl:table-cell">
                        <span className="text-gray-600 text-sm">
                          {formatVolume(stock.volume)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center hidden md:table-cell">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                          {stock.sector}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Disclaimer:</strong> Stock data is delayed by up to 15 minutes. 
            This screener is for informational purposes only and should not be considered investment advice. 
            Always do your own research before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}