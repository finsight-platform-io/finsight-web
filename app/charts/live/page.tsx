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
  { symbol: "^NSEI", name: "NIFTY 50" },
  { symbol: "^BSESN", name: "SENSEX" },
  { symbol: "^NSEBANK", name: "BANK NIFTY" },
];

const FOREX_PAIRS = [
  { symbol: "USDINR=X", name: "USD/INR" },
  { symbol: "EURINR=X", name: "EUR/INR" },
  { symbol: "GBPINR=X", name: "GBP/INR" },
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

const MARKETS = [
  { code: "NSE", label: "NSE (India)", suffix: ".NS", example: "RELIANCE" },
  { code: "BSE", label: "BSE (India)", suffix: ".BO", example: "MRF" },
  { code: "US", label: "US (NASDAQ/NYSE)", suffix: "", example: "AAPL" },
  { code: "LSE", label: "UK (London)", suffix: ".L", example: "BP" },
  { code: "TSE", label: "Japan (Tokyo)", suffix: ".T", example: "7203" },
  { code: "HKEX", label: "Hong Kong", suffix: ".HK", example: "0700" },
  { code: "SSE", label: "China (Shanghai)", suffix: ".SS", example: "600519" },
  { code: "ASX", label: "Australia", suffix: ".AX", example: "BHP" },
];

export default function LiveChartsPage() {
  const [activeTab, setActiveTab] = useState<"indices" | "forex">("indices");
  const [selectedStock, setSelectedStock] = useState(INDICES[0]);
  const [manualSymbol, setManualSymbol] = useState("");
  const [selectedMarket, setSelectedMarket] = useState(MARKETS[0]);
  const [timeframe, setTimeframe] = useState("1mo");
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState<any[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [searchingAutocomplete, setSearchingAutocomplete] = useState(false);

  useEffect(() => {
    fetchChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStock, timeframe]);

  // Autocomplete search
  useEffect(() => {
    if (manualSymbol.length >= 2) {
      const timer = setTimeout(() => {
        console.log("Searching for:", manualSymbol);
        searchAutocomplete();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setAutocompleteResults([]);
      setShowAutocomplete(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manualSymbol]);

  const searchAutocomplete = async () => {
    try {
      setSearchingAutocomplete(true);
      console.log("Fetching from API...");
      const response = await fetch(`/api/stocks/search?q=${manualSymbol}`);
      const data = await response.json();
      console.log("API Response:", data);
      
      if (data.success && data.results && data.results.length > 0) {
        console.log("Results found:", data.results.length);
        console.log("First result:", data.results[0]);
        setAutocompleteResults(data.results.slice(0, 8));
        setShowAutocomplete(true);
      } else {
        console.log("No results found");
        setAutocompleteResults([]);
        setShowAutocomplete(false);
      }
    } catch (error) {
      console.error("Autocomplete error:", error);
      setAutocompleteResults([]);
      setShowAutocomplete(false);
    } finally {
      setSearchingAutocomplete(false);
    }
  };

  const fetchChartData = async (directSymbol?: string) => {
    let symbol = directSymbol || manualSymbol.trim() || selectedStock.symbol;
    console.log("fetchChartData called with:", { directSymbol, manualSymbol, symbol });
    console.log("Selected market:", selectedMarket);
    
    if (!symbol) return;

    if (!directSymbol && manualSymbol.trim()) {
      if (!symbol.includes('.') && !symbol.startsWith('^') && !symbol.includes('=')) {
        symbol = symbol + selectedMarket.suffix;
      }
    }
    
    console.log("Final symbol to fetch:", symbol);

    try {
      setLoading(true);
      const response = await fetch(`/api/stocks/${symbol}/history?period=${timeframe}`);
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

  const getStockList = () => {
    switch (activeTab) {
      case "forex":
        return FOREX_PAIRS;
      default:
        return INDICES;
    }
  };

  const filteredStocks = getStockList().filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm mb-4 text-blue-100">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/charts" className="hover:text-white">Charts</Link>
            <span>›</span>
            <span>Live Charts</span>
          </div>
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-3">📈</span>
            Live Charts
          </h1>
          <p className="text-blue-100 mt-2">
            Interactive real-time charts - Search ANY stock symbol
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
              {/* Manual Symbol Input with Market Selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Any Stock (Global):
                </label>
                
                {/* Market Selector Dropdown - FIXED */}
                <select
                  value={selectedMarket.code}
                  onChange={(e) => {
                    const market = MARKETS.find(m => m.code === e.target.value);
                    if (market) setSelectedMarket(market);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm mb-2 bg-white text-gray-900"
                >
                  {MARKETS.map((market) => (
                    <option key={market.code} value={market.code}>
                      {market.label}
                    </option>
                  ))}
                </select>

                {/* Symbol Input with Autocomplete */}
                <div className="relative">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Type stock name or symbol (e.g., ${selectedMarket.example})`}
                      value={manualSymbol}
                      onChange={(e) => setManualSymbol(e.target.value.toUpperCase())}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setShowAutocomplete(false);
                          fetchChartData();
                        }
                        if (e.key === "Escape") {
                          setShowAutocomplete(false);
                        }
                      }}
                      onFocus={() => {
                        if (autocompleteResults.length > 0) setShowAutocomplete(true);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 bg-white"
                    />
                    <button
                      onClick={() => {
                        setShowAutocomplete(false);
                        fetchChartData();
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Fetch
                    </button>
                  </div>

                  {/* Autocomplete Dropdown */}
                  {showAutocomplete && autocompleteResults.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                      {searchingAutocomplete ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
                      ) : (
                        autocompleteResults.map((stock) => (
                          <button
                            key={stock.symbol}
                            onClick={() => {
                              console.log("Clicked stock:", stock);
                              
                              const fullSymbol = stock.symbol;
                              console.log("Full symbol:", fullSymbol);
                              
                              const displaySymbol = fullSymbol.replace('.NS', '').replace('.BO', '');
                              setManualSymbol(displaySymbol);
                              setShowAutocomplete(false);
                              
                              fetchChartData(fullSymbol);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            <p className="font-semibold text-sm text-gray-900">{stock.symbol}</p>
                            <p className="text-xs text-gray-600">{stock.name}</p>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {searchingAutocomplete 
                    ? "Searching stocks..." 
                    : autocompleteResults.length > 0 && showAutocomplete
                    ? `${autocompleteResults.length} suggestions found`
                    : selectedMarket.suffix 
                    ? `Type to search, or enter ${selectedMarket.example}${selectedMarket.suffix}`
                    : `Type to search, or enter ${selectedMarket.example}`
                  }
                </p>
              </div>

              {/* Tabs - 2 tabs only */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => {
                    setActiveTab("indices");
                    setSearchQuery("");
                  }}
                  className={`py-2 text-sm font-medium rounded transition-colors ${
                    activeTab === "indices"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  📊 Indices
                </button>
                <button
                  onClick={() => {
                    setActiveTab("forex");
                    setSearchQuery("");
                  }}
                  className={`py-2 text-sm font-medium rounded transition-colors ${
                    activeTab === "forex"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  💱 Forex
                </button>
              </div>

              {/* Filter Box */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Filter list..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Stock List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredStocks.length > 0 ? (
                  filteredStocks.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => {
                        setSelectedStock(stock);
                        setManualSymbol("");
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedStock.symbol === stock.symbol
                          ? "bg-blue-50 border-2 border-blue-500"
                          : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                      }`}
                    >
                      <p className="font-semibold text-sm text-gray-900">
                        {stock.symbol.replace(".NS", "").replace("^", "").replace("=X", "")}
                      </p>
                      <p className="text-xs text-gray-600">{stock.name}</p>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No results found
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Main Chart Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {manualSymbol 
                      ? `${manualSymbol}${selectedMarket.suffix}` 
                      : selectedStock.name
                    }
                  </h2>
                  <p className="text-sm text-gray-500">
                    {manualSymbol 
                      ? `${selectedMarket.label}` 
                      : selectedStock.symbol
                    }
                  </p>
                </div>

                {/* Timeframe Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {TIMEFRAMES.map((tf) => (
                    <button
                      key={tf.value}
                      onClick={() => setTimeframe(tf.value)}
                      className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                        timeframe === tf.value
                          ? "bg-blue-600 text-white"
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
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
                        name: manualSymbol || selectedStock.name,
                      },
                    ]}
                    layout={{
                      autosize: true,
                      height: 400,
                      margin: { l: 50, r: 50, t: 20, b: 50 },
                      xaxis: { type: "date", rangeslider: { visible: false }, title: { text: "Date" } },
                      yaxis: { title: { text: "Price (₹)" } },
                      plot_bgcolor: "#f9fafb",
                      paper_bgcolor: "white",
                      font: { family: "Inter, system-ui, sans-serif" },
                    }}
                    config={{
                      responsive: true,
                      displayModeBar: true,
                      displaylogo: false,
                      modeBarButtonsToRemove: ["lasso2d", "select2d"],
                    }}
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
                        xaxis: { type: "date", title: { text: "Date" } },
                        yaxis: { title: { text: "Volume" } },
                        plot_bgcolor: "#f9fafb",
                        paper_bgcolor: "white",
                        font: { family: "Inter, system-ui, sans-serif" },
                      }}
                      config={{ responsive: true, displayModeBar: false, displaylogo: false }}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[500px]">
                  <p className="text-gray-600">No chart data available</p>
                </div>
              )}

              {/* Chart Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">💡 How to Use:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>Any Stock:</strong> Select market from dropdown + enter symbol</li>
                  <li>• <strong>Quick Access:</strong> Use Indices/Forex tabs for popular items</li>
                  <li>• <strong>8 Markets:</strong> NSE, BSE, US, UK, Japan, HK, China, Australia</li>
                  <li>• <strong>Chart:</strong> Drag to zoom, double-click to reset</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Disclaimer:</strong> Charts show delayed data (up to 15 minutes). 
            This is for informational purposes only and should not be considered investment advice.
          </p>
        </div>
      </div>
    </div>
  );
}
