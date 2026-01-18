"use client";

import { useState } from "react";
import Link from "next/link";

export default function CompareStocks() {
  const [stock1, setStock1] = useState("RELIANCE");
  const [stock2, setStock2] = useState("TCS");

  // Sample stock data - in production, fetch from API
  const stockData: any = {
    RELIANCE: {
      name: "Reliance Industries",
      price: 2450.50,
      change: 1.8,
      marketCap: "16.5 Lakh Cr",
      pe: 28.5,
      pb: 2.1,
      roe: 12.5,
      eps: 85.6,
      dividendYield: 0.35,
      week52High: 2650,
      week52Low: 2100,
      beta: 1.2,
      sector: "Oil & Gas",
    },
    TCS: {
      name: "Tata Consultancy Services",
      price: 3850.75,
      change: 0.5,
      marketCap: "14.2 Lakh Cr",
      pe: 32.8,
      pb: 12.5,
      roe: 45.2,
      eps: 117.3,
      dividendYield: 1.2,
      week52High: 4100,
      week52Low: 3200,
      beta: 0.8,
      sector: "IT Services",
    },
    INFY: {
      name: "Infosys",
      price: 1650.25,
      change: -0.3,
      marketCap: "6.8 Lakh Cr",
      pe: 28.5,
      pb: 8.2,
      roe: 32.5,
      eps: 57.8,
      dividendYield: 2.1,
      week52High: 1800,
      week52Low: 1350,
      beta: 0.9,
      sector: "IT Services",
    },
    HDFCBANK: {
      name: "HDFC Bank",
      price: 1580.50,
      change: 1.2,
      marketCap: "12.1 Lakh Cr",
      pe: 19.5,
      pb: 2.8,
      roe: 18.5,
      eps: 81.0,
      dividendYield: 1.0,
      week52High: 1750,
      week52Low: 1450,
      beta: 1.0,
      sector: "Banking",
    },
    ICICIBANK: {
      name: "ICICI Bank",
      price: 1120.75,
      change: 0.8,
      marketCap: "7.9 Lakh Cr",
      pe: 18.2,
      pb: 2.5,
      roe: 16.8,
      eps: 61.5,
      dividendYield: 0.8,
      week52High: 1200,
      week52Low: 950,
      beta: 1.1,
      sector: "Banking",
    },
  };

  const popularStocks = ["RELIANCE", "TCS", "INFY", "HDFCBANK", "ICICIBANK", "WIPRO", "BHARTIARTL", "ITC"];

  const data1 = stockData[stock1];
  const data2 = stockData[stock2];

  const getComparisonColor = (val1: number, val2: number, higherIsBetter = true) => {
    if (val1 === val2) return "text-gray-900";
    if (higherIsBetter) {
      return val1 > val2 ? "text-green-600" : "text-red-600";
    } else {
      return val1 < val2 ? "text-green-600" : "text-red-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-blue-600">Tools</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Compare Stocks</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ⚖️ Compare Stocks
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Side-by-side comparison of financial metrics and performance
          </p>
        </div>

        {/* Stock Selectors */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Stock 1 Selector */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select First Stock
            </label>
            <select
              value={stock1}
              onChange={(e) => setStock1(e.target.value)}
              className="w-full px-4 py-3 border-2 border-violet-200 rounded-lg focus:border-violet-500 focus:outline-none text-lg font-semibold"
            >
              {popularStocks.map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol} - {stockData[symbol]?.name}
                </option>
              ))}
            </select>
            
            {data1 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">₹{data1.price.toLocaleString()}</p>
                <p className={`text-sm font-semibold ${data1.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {data1.change >= 0 ? '+' : ''}{data1.change}%
                </p>
              </div>
            )}
          </div>

          {/* Stock 2 Selector */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Second Stock
            </label>
            <select
              value={stock2}
              onChange={(e) => setStock2(e.target.value)}
              className="w-full px-4 py-3 border-2 border-fuchsia-200 rounded-lg focus:border-fuchsia-500 focus:outline-none text-lg font-semibold"
            >
              {popularStocks.map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol} - {stockData[symbol]?.name}
                </option>
              ))}
            </select>
            
            {data2 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-fuchsia-50 to-fuchsia-100 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">₹{data2.price.toLocaleString()}</p>
                <p className={`text-sm font-semibold ${data2.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {data2.change >= 0 ? '+' : ''}{data2.change}%
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        {data1 && data2 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                Detailed Comparison
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Metric
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-violet-700">
                      {stock1}
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-fuchsia-700">
                      {stock2}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Company Name */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Company Name
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">
                      {data1.name}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">
                      {data2.name}
                    </td>
                  </tr>

                  {/* Current Price */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Current Price
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                      ₹{data1.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                      ₹{data2.price.toLocaleString()}
                    </td>
                  </tr>

                  {/* Market Cap */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Market Cap
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-semibold ${getComparisonColor(parseFloat(data1.marketCap), parseFloat(data2.marketCap))}`}>
                      {data1.marketCap}
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-semibold ${getComparisonColor(parseFloat(data2.marketCap), parseFloat(data1.marketCap))}`}>
                      {data2.marketCap}
                    </td>
                  </tr>

                  {/* P/E Ratio */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      P/E Ratio
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-semibold ${getComparisonColor(data1.pe, data2.pe, false)}`}>
                      {data1.pe}
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-semibold ${getComparisonColor(data2.pe, data1.pe, false)}`}>
                      {data2.pe}
                    </td>
                  </tr>

                  {/* P/B Ratio */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      P/B Ratio
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-semibold ${getComparisonColor(data1.pb, data2.pb, false)}`}>
                      {data1.pb}
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-semibold ${getComparisonColor(data2.pb, data1.pb, false)}`}>
                      {data2.pb}
                    </td>
                  </tr>

                  {/* ROE */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      ROE (%)
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-semibold ${getComparisonColor(data1.roe, data2.roe)}`}>
                      {data1.roe}%
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-semibold ${getComparisonColor(data2.roe, data1.roe)}`}>
                      {data2.roe}%
                    </td>
                  </tr>

                  {/* EPS */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      EPS (₹)
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-semibold ${getComparisonColor(data1.eps, data2.eps)}`}>
                      ₹{data1.eps}
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-semibold ${getComparisonColor(data2.eps, data1.eps)}`}>
                      ₹{data2.eps}
                    </td>
                  </tr>

                  {/* Dividend Yield */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Dividend Yield (%)
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-semibold ${getComparisonColor(data1.dividendYield, data2.dividendYield)}`}>
                      {data1.dividendYield}%
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-semibold ${getComparisonColor(data2.dividendYield, data1.dividendYield)}`}>
                      {data2.dividendYield}%
                    </td>
                  </tr>

                  {/* 52 Week High */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      52 Week High
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      ₹{data1.week52High.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      ₹{data2.week52High.toLocaleString()}
                    </td>
                  </tr>

                  {/* 52 Week Low */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      52 Week Low
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      ₹{data1.week52Low.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      ₹{data2.week52Low.toLocaleString()}
                    </td>
                  </tr>

                  {/* Beta */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Beta
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-semibold ${getComparisonColor(data1.beta, data2.beta, false)}`}>
                      {data1.beta}
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-semibold ${getComparisonColor(data2.beta, data1.beta, false)}`}>
                      {data2.beta}
                    </td>
                  </tr>

                  {/* Sector */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Sector
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">
                      {data1.sector}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">
                      {data2.sector}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
            <span className="mr-2">💡</span>
            Understanding the Colors
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-600 rounded-full"></span>
              <span className="text-blue-800">Green = Better value for that metric</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-600 rounded-full"></span>
              <span className="text-blue-800">Red = Weaker value for that metric</span>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-3">
            Note: Lower P/E, P/B, and Beta are considered better. Higher ROE, EPS, and Dividend Yield are considered better.
          </p>
        </div>
      </div>
    </div>
  );
}