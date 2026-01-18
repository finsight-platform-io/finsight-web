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

const INDICES = [
  { symbol: "^NSEI", name: "NIFTY 50", description: "NSE's flagship index of top 50 companies" },
  { symbol: "^BSESN", name: "SENSEX", description: "BSE's benchmark index of top 30 companies" },
  { symbol: "^NSEBANK", name: "BANK NIFTY", description: "Banking sector index" },
  { symbol: "^CNXIT", name: "NIFTY IT", description: "Information Technology sector index" },
  { symbol: "^CNXAUTO", name: "NIFTY AUTO", description: "Automobile sector index" },
  { symbol: "^CNXPHARMA", name: "NIFTY PHARMA", description: "Pharmaceutical sector index" },
  { symbol: "^CNXFMCG", name: "NIFTY FMCG", description: "Fast Moving Consumer Goods index" },
  { symbol: "^CNXMETAL", name: "NIFTY METAL", description: "Metal sector index" },
  { symbol: "^CNXREALTY", name: "NIFTY REALTY", description: "Real Estate sector index" },
  { symbol: "^CNXENERGY", name: "NIFTY ENERGY", description: "Energy sector index" },
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

export default function IndicesChartsPage() {
  const [selectedIndex, setSelectedIndex] = useState(INDICES[0]);
  const [timeframe, setTimeframe] = useState("1mo");
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, timeframe]);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/stocks/${selectedIndex.symbol}/history?period=${timeframe}`);
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

  const filteredIndices = INDICES.filter(
    (index) =>
      index.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      index.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm mb-4 text-green-100">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/charts" className="hover:text-white">Charts</Link>
            <span>›</span>
            <span>Indices</span>
          </div>
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-3">📊</span>
            Indices Charts
          </h1>
          <p className="text-green-100 mt-2">
            Track major Indian market indices with interactive candlestick charts
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
                  placeholder="Search indices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

              {/* Indices List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredIndices.map((index) => (
                  <button
                    key={index.symbol}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedIndex.symbol === index.symbol
                        ? "bg-green-50 border-2 border-green-500"
                        : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <p className="font-semibold text-sm text-gray-900">{index.name}</p>
                    <p className="text-xs text-gray-600">{index.description}</p>
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
                  <h2 className="text-2xl font-bold text-gray-900">{selectedIndex.name}</h2>
                  <p className="text-sm text-gray-500">{selectedIndex.description}</p>
                </div>

                {/* Timeframe Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {TIMEFRAMES.map((tf) => (
                    <button
                      key={tf.value}
                      onClick={() => setTimeframe(tf.value)}
                      className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                        timeframe === tf.value
                          ? "bg-green-600 text-white"
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
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
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
                        name: selectedIndex.name,
                      },
                    ]}
                    layout={{
                      autosize: true,
                      height: 400,
                      margin: { l: 50, r: 50, t: 20, b: 50 },
                      xaxis: { type: "date", rangeslider: { visible: false } },
                      yaxis: { title: { text: "Price" } },
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
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">💡 About Indices:</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• <strong>NIFTY 50:</strong> Top 50 companies on NSE</li>
                      <li>• <strong>SENSEX:</strong> Top 30 companies on BSE</li>
                      <li>• <strong>Sector Indices:</strong> Track specific industry performance</li>
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
            <strong>Disclaimer:</strong> Index data may be delayed up to 15 minutes. 
            For informational purposes only, not investment advice.
          </p>
        </div>
      </div>
    </div>
  );
}