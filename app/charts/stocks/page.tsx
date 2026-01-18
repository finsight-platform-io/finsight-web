"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface ChartData {
  dates: Date[];
  open: number[];
  high: number[];
  low: number[];
  close: number[];
  volume: number[];
}

const TIMEFRAMES = [
  { label: "1D", value: "1d" },
  { label: "1W", value: "5d" },
  { label: "1M", value: "1mo" },
  { label: "3M", value: "3mo" },
  { label: "6M", value: "6mo" },
  { label: "1Y", value: "1y" },
  { label: "5Y", value: "5y" },
];

export default function StocksChartsPage() {
  const [symbol, setSymbol] = useState("");
  const [timeframe, setTimeframe] = useState("1mo");
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState<any[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedStock, setSelectedStock] = useState<any>(null);

  // Autocomplete search
  useEffect(() => {
    if (symbol.length >= 2) {
      const timer = setTimeout(() => {
        searchStocks();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setAutocompleteResults([]);
      setShowAutocomplete(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol]);

  const searchStocks = async () => {
    try {
      setSearching(true);
      const response = await fetch(`/api/stocks/search?q=${symbol}`);
      const data = await response.json();
      
      if (data.success && data.results && data.results.length > 0) {
        setAutocompleteResults(data.results.slice(0, 10));
        setShowAutocomplete(true);
      } else {
        setAutocompleteResults([]);
        setShowAutocomplete(false);
      }
    } catch (error) {
      console.error("Search error:", error);
      setAutocompleteResults([]);
      setShowAutocomplete(false);
    } finally {
      setSearching(false);
    }
  };

  const fetchChartData = async (fullSymbol: string) => {
    if (!fullSymbol) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/stocks/${fullSymbol}/history?period=${timeframe}`);
      const data = await response.json();

      if (data.success && data.data) {
        const history = data.data;
        setChartData({
          dates: history.map((h: any) => new Date(h.time * 1000)),
          open: history.map((h: any) => h.open),
          high: history.map((h: any) => h.high),
          low: history.map((h: any) => h.low),
          close: history.map((h: any) => h.close),
          volume: history.map((h: any) => h.volume),
        });
      } else {
        setChartData(null);
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setChartData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedStock) {
      fetchChartData(selectedStock.symbol);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeframe, selectedStock]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm mb-4 text-purple-100">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/charts" className="hover:text-white">Charts</Link>
            <span>›</span>
            <span>Stocks</span>
          </div>
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-3">💹</span>
            Stock Charts
          </h1>
          <p className="text-purple-100 mt-2">
            Search and analyze individual stocks with detailed technical charts
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Search Indian Stocks</h2>
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Type stock name or symbol (e.g., RELIANCE, TCS, HDFC)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              onFocus={() => {
                if (autocompleteResults.length > 0) setShowAutocomplete(true);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
            />
            
            {/* Autocomplete Dropdown */}
            {showAutocomplete && autocompleteResults.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                {searching ? (
                  <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
                ) : (
                  autocompleteResults.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => {
                        setSelectedStock(stock);
                        setSymbol(stock.symbol.replace('.NS', '').replace('.BO', ''));
                        setShowAutocomplete(false);
                        fetchChartData(stock.symbol);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-purple-50 border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <p className="font-semibold text-sm text-gray-900">{stock.symbol}</p>
                      <p className="text-xs text-gray-600">{stock.name}</p>
                    </button>
                  ))
                )}
              </div>
            )}

            {searching && (
              <p className="text-sm text-gray-500 mt-2">Searching stocks...</p>
            )}
            {!searching && autocompleteResults.length > 0 && showAutocomplete && (
              <p className="text-sm text-gray-500 mt-2">{autocompleteResults.length} stocks found</p>
            )}
          </div>
        </div>

        {/* Chart Section */}
        {selectedStock && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Chart Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedStock.name}</h2>
                <p className="text-sm text-gray-500">{selectedStock.symbol}</p>
              </div>

              {/* Timeframe Buttons */}
              <div className="flex gap-2 flex-wrap">
                {TIMEFRAMES.map((tf) => (
                  <button
                    key={tf.value}
                    onClick={() => setTimeframe(tf.value)}
                    className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                      timeframe === tf.value
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}
            {loading ? (
              <div className="flex items-center justify-center h-[500px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading chart data...</p>
                </div>
              </div>
            ) : chartData ? (
              <div>
                <Plot
                  data={[
                    {
                      type: "candlestick",
                      x: chartData.dates,
                      open: chartData.open,
                      high: chartData.high,
                      low: chartData.low,
                      close: chartData.close,
                      increasing: { line: { color: "#22c55e" } },
                      decreasing: { line: { color: "#ef4444" } },
                      name: selectedStock.name,
                    },
                  ]}
                  layout={{
                    autosize: true,
                    height: 400,
                    margin: { l: 50, r: 50, t: 20, b: 50 },
                    xaxis: { type: "date", rangeslider: { visible: false } },
                    yaxis: { title: { text: "Price (₹)" } },
                    plot_bgcolor: "#f9fafb",
                    paper_bgcolor: "white",
                  }}
                  config={{ responsive: true, displaylogo: false }}
                  style={{ width: "100%" }}
                />

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Volume</h3>
                  <Plot
                    data={[
                      {
                        type: "bar",
                        x: chartData.dates,
                        y: chartData.volume,
                        marker: {
                          color: chartData.close.map((close, i) =>
                            i === 0 || close >= chartData.close[i - 1] ? "#22c55e" : "#ef4444"
                          ),
                        },
                        name: "Volume",
                      },
                    ]}
                    layout={{
                      autosize: true,
                      height: 150,
                      margin: { l: 50, r: 50, t: 10, b: 50 },
                      xaxis: { type: "date" },
                      yaxis: { title: { text: "Volume" } },
                      plot_bgcolor: "#f9fafb",
                      paper_bgcolor: "white",
                    }}
                    config={{ responsive: true, displaylogo: false }}
                    style={{ width: "100%" }}
                  />
                </div>

                {/* Chart Info */}
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">💡 Chart Tips:</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Click and drag to zoom into a specific time period</li>
                    <li>• Double-click to reset zoom</li>
                    <li>• Hover over candles to see OHLC (Open, High, Low, Close) values</li>
                    <li>• Use timeframe buttons to change the view period</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[500px]">
                <p className="text-gray-600">No chart data available</p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!selectedStock && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Search for a Stock</h3>
            <p className="text-gray-600 mb-4">
              Use the search box above to find and analyze any Indian stock
            </p>
            <p className="text-sm text-gray-500">
              Try searching: RELIANCE, TCS, INFY, HDFCBANK, ICICIBANK
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Disclaimer:</strong> Stock data may be delayed up to 15 minutes. 
            For informational purposes only, not investment advice.
          </p>
        </div>
      </div>
    </div>
  );
}