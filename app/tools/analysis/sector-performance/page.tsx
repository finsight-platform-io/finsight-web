"use client";

import { useState } from "react";
import Link from "next/link";

export default function SectorPerformance() {
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">("1D");

  // Sample sector data
  const sectorData = {
    "1D": [
      { sector: "IT", change: 2.5, leaders: ["TCS", "INFY", "WIPRO"], laggards: ["TECHM"], avgPE: 28.5, marketCap: "12.5 Lakh Cr" },
      { sector: "Banking", change: 1.8, leaders: ["HDFCBANK", "ICICIBANK"], laggards: ["PNB"], avgPE: 18.2, marketCap: "28.3 Lakh Cr" },
      { sector: "Auto", change: -0.5, leaders: ["MARUTI"], laggards: ["TATAMOTORS", "M&M"], avgPE: 22.5, marketCap: "8.2 Lakh Cr" },
      { sector: "Pharma", change: 0.8, leaders: ["SUNPHARMA", "DRREDDY"], laggards: ["CIPLA"], avgPE: 35.2, marketCap: "6.8 Lakh Cr" },
      { sector: "FMCG", change: -1.2, leaders: ["ITC"], laggards: ["HINDUNILVR", "NESTLEIND"], avgPE: 45.8, marketCap: "9.5 Lakh Cr" },
      { sector: "Energy", change: 3.2, leaders: ["RELIANCE", "ONGC"], laggards: ["BPCL"], avgPE: 15.5, marketCap: "18.7 Lakh Cr" },
      { sector: "Metals", change: 1.5, leaders: ["TATASTEEL", "HINDALCO"], laggards: ["JINDALSTEL"], avgPE: 12.8, marketCap: "5.2 Lakh Cr" },
      { sector: "Telecom", change: 0.3, leaders: ["BHARTIARTL"], laggards: ["VI"], avgPE: 28.5, marketCap: "7.8 Lakh Cr" },
    ],
    "1W": [
      { sector: "IT", change: 5.2, leaders: ["TCS", "INFY"], laggards: ["TECHM"], avgPE: 28.5, marketCap: "12.5 Lakh Cr" },
      { sector: "Banking", change: 3.5, leaders: ["HDFCBANK", "KOTAKBANK"], laggards: ["PNB"], avgPE: 18.2, marketCap: "28.3 Lakh Cr" },
      { sector: "Auto", change: -2.3, leaders: ["MARUTI"], laggards: ["TATAMOTORS"], avgPE: 22.5, marketCap: "8.2 Lakh Cr" },
      { sector: "Pharma", change: 2.8, leaders: ["SUNPHARMA"], laggards: ["CIPLA"], avgPE: 35.2, marketCap: "6.8 Lakh Cr" },
      { sector: "FMCG", change: -0.8, leaders: ["ITC"], laggards: ["HINDUNILVR"], avgPE: 45.8, marketCap: "9.5 Lakh Cr" },
      { sector: "Energy", change: 6.5, leaders: ["RELIANCE"], laggards: ["BPCL"], avgPE: 15.5, marketCap: "18.7 Lakh Cr" },
      { sector: "Metals", change: 4.2, leaders: ["TATASTEEL"], laggards: ["JINDALSTEL"], avgPE: 12.8, marketCap: "5.2 Lakh Cr" },
      { sector: "Telecom", change: 1.2, leaders: ["BHARTIARTL"], laggards: [], avgPE: 28.5, marketCap: "7.8 Lakh Cr" },
    ],
    "1M": [
      { sector: "IT", change: 8.5, leaders: ["TCS", "INFY"], laggards: ["WIPRO"], avgPE: 28.5, marketCap: "12.5 Lakh Cr" },
      { sector: "Banking", change: 6.2, leaders: ["HDFCBANK"], laggards: ["PNB"], avgPE: 18.2, marketCap: "28.3 Lakh Cr" },
      { sector: "Auto", change: -3.8, leaders: [], laggards: ["TATAMOTORS", "M&M"], avgPE: 22.5, marketCap: "8.2 Lakh Cr" },
      { sector: "Pharma", change: 5.5, leaders: ["SUNPHARMA", "DRREDDY"], laggards: [], avgPE: 35.2, marketCap: "6.8 Lakh Cr" },
      { sector: "FMCG", change: -2.5, leaders: [], laggards: ["HINDUNILVR"], avgPE: 45.8, marketCap: "9.5 Lakh Cr" },
      { sector: "Energy", change: 12.3, leaders: ["RELIANCE", "ONGC"], laggards: [], avgPE: 15.5, marketCap: "18.7 Lakh Cr" },
      { sector: "Metals", change: 7.8, leaders: ["TATASTEEL", "HINDALCO"], laggards: [], avgPE: 12.8, marketCap: "5.2 Lakh Cr" },
      { sector: "Telecom", change: 3.5, leaders: ["BHARTIARTL"], laggards: [], avgPE: 28.5, marketCap: "7.8 Lakh Cr" },
    ],
    "3M": [
      { sector: "IT", change: 15.2, leaders: ["TCS", "INFY", "HCLTECH"], laggards: [], avgPE: 28.5, marketCap: "12.5 Lakh Cr" },
      { sector: "Banking", change: 10.5, leaders: ["HDFCBANK", "ICICIBANK"], laggards: [], avgPE: 18.2, marketCap: "28.3 Lakh Cr" },
      { sector: "Auto", change: -5.2, leaders: ["MARUTI"], laggards: ["TATAMOTORS"], avgPE: 22.5, marketCap: "8.2 Lakh Cr" },
      { sector: "Pharma", change: 8.8, leaders: ["SUNPHARMA"], laggards: [], avgPE: 35.2, marketCap: "6.8 Lakh Cr" },
      { sector: "FMCG", change: -4.2, leaders: ["ITC"], laggards: ["HINDUNILVR"], avgPE: 45.8, marketCap: "9.5 Lakh Cr" },
      { sector: "Energy", change: 18.5, leaders: ["RELIANCE"], laggards: [], avgPE: 15.5, marketCap: "18.7 Lakh Cr" },
      { sector: "Metals", change: 12.5, leaders: ["TATASTEEL", "HINDALCO"], laggards: [], avgPE: 12.8, marketCap: "5.2 Lakh Cr" },
      { sector: "Telecom", change: 6.2, leaders: ["BHARTIARTL"], laggards: [], avgPE: 28.5, marketCap: "7.8 Lakh Cr" },
    ],
    "1Y": [
      { sector: "IT", change: 28.5, leaders: ["TCS", "INFY"], laggards: [], avgPE: 28.5, marketCap: "12.5 Lakh Cr" },
      { sector: "Banking", change: 22.3, leaders: ["HDFCBANK", "KOTAKBANK"], laggards: [], avgPE: 18.2, marketCap: "28.3 Lakh Cr" },
      { sector: "Auto", change: -8.5, leaders: ["MARUTI"], laggards: ["M&M"], avgPE: 22.5, marketCap: "8.2 Lakh Cr" },
      { sector: "Pharma", change: 18.2, leaders: ["SUNPHARMA", "DRREDDY"], laggards: [], avgPE: 35.2, marketCap: "6.8 Lakh Cr" },
      { sector: "FMCG", change: -6.8, leaders: ["ITC"], laggards: ["NESTLEIND"], avgPE: 45.8, marketCap: "9.5 Lakh Cr" },
      { sector: "Energy", change: 35.8, leaders: ["RELIANCE", "ONGC"], laggards: [], avgPE: 15.5, marketCap: "18.7 Lakh Cr" },
      { sector: "Metals", change: 25.2, leaders: ["TATASTEEL"], laggards: [], avgPE: 12.8, marketCap: "5.2 Lakh Cr" },
      { sector: "Telecom", change: 15.5, leaders: ["BHARTIARTL"], laggards: [], avgPE: 28.5, marketCap: "7.8 Lakh Cr" },
    ],
  };

  const currentData = sectorData[timeframe].sort((a, b) => b.change - a.change);
  const topPerformer = currentData[0];
  const bottomPerformer = currentData[currentData.length - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-blue-600">Tools</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Sector Performance</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏭 Sector Performance
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track performance across different market sectors
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 inline-flex">
            {(["1D", "1W", "1M", "3M", "1Y"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  timeframe === tf
                    ? "bg-orange-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Top & Bottom Performers */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="mr-2">🏆</span>
              Top Performer
            </h3>
            <p className="text-3xl font-bold mb-2">{topPerformer.sector}</p>
            <p className="text-5xl font-bold text-green-200">+{topPerformer.change}%</p>
            <p className="text-sm text-green-100 mt-2">
              Leading stocks: {topPerformer.leaders.join(", ")}
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="mr-2">📉</span>
              Bottom Performer
            </h3>
            <p className="text-3xl font-bold mb-2">{bottomPerformer.sector}</p>
            <p className="text-5xl font-bold text-red-200">{bottomPerformer.change}%</p>
            <p className="text-sm text-red-100 mt-2">
              Lagging stocks: {bottomPerformer.laggards.join(", ") || "All declining"}
            </p>
          </div>
        </div>

        {/* Sector Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {currentData.map((sector, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-2 ${
                sector.change >= 0 ? "border-green-100 hover:border-green-300" : "border-red-100 hover:border-red-300"
              }`}
            >
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                {sector.sector}
              </h3>
              
              <p className={`text-4xl font-bold mb-3 ${
                sector.change >= 0 ? "text-green-600" : "text-red-600"
              }`}>
                {sector.change >= 0 ? "+" : ""}{sector.change}%
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Avg P/E:</span>
                  <span className="font-semibold text-gray-900">{sector.avgPE}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Market Cap:</span>
                  <span className="font-semibold text-gray-900">{sector.marketCap}</span>
                </div>
              </div>

              {sector.leaders.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-600 mb-1">Top performers:</p>
                  <p className="text-xs font-semibold text-green-600">
                    {sector.leaders.slice(0, 2).join(", ")}
                  </p>
                </div>
              )}

              {sector.laggards.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-600 mb-1">Laggards:</p>
                  <p className="text-xs font-semibold text-red-600">
                    {sector.laggards.slice(0, 2).join(", ")}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Heatmap View */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Sector Performance Heatmap
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {currentData.map((sector, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg text-center transition-all hover:scale-105 cursor-pointer ${
                  sector.change >= 5
                    ? "bg-green-600 text-white"
                    : sector.change >= 2
                    ? "bg-green-400 text-white"
                    : sector.change >= 0
                    ? "bg-green-200 text-green-900"
                    : sector.change >= -2
                    ? "bg-red-200 text-red-900"
                    : sector.change >= -5
                    ? "bg-red-400 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                <p className="font-bold text-sm mb-1">{sector.sector}</p>
                <p className="text-2xl font-bold">
                  {sector.change >= 0 ? "+" : ""}{sector.change}%
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span className="text-gray-600">{"< -5%"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded"></div>
              <span className="text-gray-600">-2% to -5%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-200 rounded"></div>
              <span className="text-gray-600">0% to 2%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <span className="text-gray-600">2% to 5%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="text-gray-600">{"> 5%"}</span>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Understanding Sector Rotation
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Key Sectors in Indian Market</h4>
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="font-semibold text-blue-900 text-sm">Defensive Sectors</p>
                  <p className="text-xs text-blue-800">FMCG, Pharma - Stable during downturns</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="font-semibold text-purple-900 text-sm">Cyclical Sectors</p>
                  <p className="text-xs text-purple-800">Auto, Metals, Banking - Economy-dependent</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="font-semibold text-green-900 text-sm">Growth Sectors</p>
                  <p className="text-xs text-green-800">IT, Telecom - High growth potential</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Investment Strategy</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Diversify across sectors to reduce risk</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Overweight outperforming sectors in bull markets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Shift to defensive sectors during uncertainty</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Monitor sector rotation for market trends</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Consider sector P/E ratios relative to historical averages</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}