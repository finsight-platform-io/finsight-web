"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface StockChartProps {
  symbol: string;
}

const timeframes = [
  { label: "1D", value: "1d" },
  { label: "5D", value: "5d" },
  { label: "1M", value: "1mo" },
  { label: "3M", value: "3mo" },
  { label: "6M", value: "6mo" },
  { label: "1Y", value: "1y" },
  { label: "5Y", value: "5y" },
];

export default function StockChart({ symbol }: StockChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1mo");
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchChartData();
  }, [symbol, selectedTimeframe]);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/stocks/${symbol}/history?period=${selectedTimeframe}`
      );
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        // Format data for Recharts
        const formattedData = data.data.map((item: ChartData) => ({
          date: new Date(item.time * 1000).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          }),
          price: item.close,
          volume: item.volume,
        }));

        setChartData(formattedData);
      } else {
        setError(data.error || "No data available");
      }
    } catch (err) {
      console.error("Error fetching chart data:", err);
      setError("Failed to load chart data");
    } finally {
      setLoading(false);
    }
  };

  // Calculate if price is up or down
  const isPositive =
    chartData.length > 1 &&
    chartData[chartData.length - 1].price > chartData[0].price;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Timeframe Selector */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Price Chart</h3>
        <div className="flex space-x-2">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setSelectedTimeframe(tf.value)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                selectedTimeframe === tf.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      {loading && (
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchChartData}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {!loading && !error && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isPositive ? "#22c55e" : "#ef4444"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={isPositive ? "#22c55e" : "#ef4444"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              domain={["auto", "auto"]}
              tickFormatter={(value) => `₹${value.toFixed(0)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              formatter={(value: any) => [`₹${value.toFixed(2)}`, "Price"]}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "#22c55e" : "#ef4444"}
              strokeWidth={2}
              fill="url(#colorPrice)"
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}

      {/* Chart Info */}
      {!loading && !error && chartData.length > 0 && (
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded ${
                isPositive ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span>
              {isPositive ? "Up" : "Down"} over period
            </span>
          </div>
          <div className="text-gray-500">|</div>
          <span>{chartData.length} data points</span>
        </div>
      )}
    </div>
  );
}
