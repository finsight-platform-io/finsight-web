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

const FOREX_PAIRS = [
  { symbol: "USDINR=X", name: "USD/INR", description: "US Dollar to Indian Rupee" },
  { symbol: "EURINR=X", name: "EUR/INR", description: "Euro to Indian Rupee" },
  { symbol: "GBPINR=X", name: "GBP/INR", description: "British Pound to Indian Rupee" },
  { symbol: "JPYINR=X", name: "JPY/INR", description: "Japanese Yen to Indian Rupee" },
  { symbol: "AUDINR=X", name: "AUD/INR", description: "Australian Dollar to Indian Rupee" },
  { symbol: "CADINR=X", name: "CAD/INR", description: "Canadian Dollar to Indian Rupee" },
];

const TIMEFRAMES = [
  { label: "1D", value: "1d" },
  { label: "1W", value: "5d" },
  { label: "1M", value: "1mo" },
  { label: "3M", value: "3mo" },
  { label: "6M", value: "6mo" },
  { label: "1Y", value: "1y" },
  { label: "5Y", value: "5y" },
];

export default function ForexChartsPage() {
  const [selectedPair, setSelectedPair] = useState(FOREX_PAIRS[0]);
  const [timeframe, setTimeframe] = useState("1mo");
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPair, timeframe]);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/stocks/${selectedPair.symbol}/history?period=${timeframe}`);
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

  const filteredPairs = FOREX_PAIRS.filter(
    (pair) =>
      pair.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pair.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm mb-4 text-orange-100">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/charts" className="hover:text-white">Charts</Link>
            <span>›</span>
            <span>Forex</span>
          </div>
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-3">💱</span>
            Forex Charts
          </h1>
          <p className="text-orange-100 mt-2">
            Track major currency pairs against Indian Rupee
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
              {/* Search */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search currency pairs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                />
              </div>

              {/* Currency Pairs List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredPairs.map((pair) => (
                  <button
                    key={pair.symbol}
                    onClick={() => setSelectedPair(pair)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedPair.symbol === pair.symbol
                        ? "bg-orange-50 border-2 border-orange-500"
                        : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <p className="font-semibold text-sm text-gray-900">{pair.name}</p>
                    <p className="text-xs text-gray-600">{pair.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chart */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPair.name}</h2>
                  <p className="text-sm text-gray-500">{selectedPair.description}</p>
                </div>

                {/* Timeframe Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {TIMEFRAMES.map((tf) => (
                    <button
                      key={tf.value}
                      onClick={() => setTimeframe(tf.value)}
                      className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                        timeframe === tf.value
                          ? "bg-orange-600 text-white"
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
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
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
                        name: selectedPair.name,
                      },
                    ]}
                    layout={{
                      autosize: true,
                      height: 400,
                      margin: { l: 50, r: 50, t: 20, b: 50 },
                      xaxis: { type: "date", rangeslider: { visible: false } },
                      yaxis: { title: { text: "Exchange Rate (₹)" } },
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
                  <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">💡 About Forex:</h4>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• <strong>Exchange Rate:</strong> How much 1 unit of foreign currency costs in INR</li>
                      <li>• <strong>Higher Rate:</strong> INR is weaker (need more ₹ to buy foreign currency)</li>
                      <li>• <strong>Lower Rate:</strong> INR is stronger (need less ₹ to buy foreign currency)</li>
                      <li>• <strong>Chart Controls:</strong> Drag to zoom, double-click to reset</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[500px]">
                  <p className="text-gray-600">No chart data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Disclaimer:</strong> Forex data may be delayed. Exchange rates are for reference only. 
            For actual trading, please check with your bank or forex dealer.
          </p>
        </div>
      </div>
    </div>
  );
}