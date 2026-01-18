"use client";

import { useState } from "react";
import Link from "next/link";

export default function SplitsCalendar() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "recent">("upcoming");

  const upcomingSplits = [
    {
      company: "Tech Mahindra",
      symbol: "TECHM",
      ratio: "1:2",
      type: "Split",
      exDate: "24-Jan-2026",
      recordDate: "25-Jan-2026",
      currentPrice: "₹1,450",
      expectedPrice: "₹725",
    },
    {
      company: "Tata Motors",
      symbol: "TATAMOTORS",
      ratio: "1:5",
      type: "Split",
      exDate: "01-Feb-2026",
      recordDate: "02-Feb-2026",
      currentPrice: "₹850",
      expectedPrice: "₹170",
    },
    {
      company: "Bajaj Finserv",
      symbol: "BAJAJFINSV",
      ratio: "1:3",
      type: "Split",
      exDate: "10-Feb-2026",
      recordDate: "11-Feb-2026",
      currentPrice: "₹1,620",
      expectedPrice: "₹540",
    },
    {
      company: "DLF Limited",
      symbol: "DLF",
      ratio: "2:1",
      type: "Bonus",
      exDate: "15-Feb-2026",
      recordDate: "16-Feb-2026",
      currentPrice: "₹780",
      expectedPrice: "~₹520",
    },
  ];

  const recentSplits = [
    {
      company: "Infosys",
      symbol: "INFY",
      ratio: "1:2",
      type: "Split",
      exDate: "10-Jan-2026",
      recordDate: "11-Jan-2026",
      preBefore: "₹1,500",
      priceAfter: "₹752",
      change: "+0.3%",
    },
    {
      company: "Asian Paints",
      symbol: "ASIANPAINT",
      ratio: "1:1",
      type: "Bonus",
      exDate: "05-Jan-2026",
      recordDate: "06-Jan-2026",
      preBefore: "₹2,850",
      priceAfter: "₹1,428",
      change: "+0.1%",
    },
    {
      company: "Hindustan Zinc",
      symbol: "HINDZINC",
      ratio: "1:4",
      type: "Split",
      exDate: "28-Dec-2025",
      recordDate: "29-Dec-2025",
      preBefore: "₹480",
      priceAfter: "₹120.5",
      change: "+0.4%",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-blue-600">Tools</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Stock Splits</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ✂️ Stock Splits & Bonus Calendar
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track upcoming stock splits and bonus issue announcements
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 inline-flex">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "upcoming"
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Upcoming ({upcomingSplits.length})
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "recent"
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Recently Completed ({recentSplits.length})
            </button>
          </div>
        </div>

        {/* Upcoming Splits */}
        {activeTab === "upcoming" && (
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingSplits.map((split, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-cyan-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-xl mb-1">
                      {split.company}
                    </h3>
                    <p className="text-sm text-gray-600">{split.symbol}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      split.type === "Split"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}>
                      {split.type}
                    </span>
                    <span className="text-2xl font-bold text-cyan-600">
                      {split.ratio}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Current Price</p>
                      <p className="text-lg font-bold text-gray-900">{split.currentPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Expected Price</p>
                      <p className="text-lg font-bold text-cyan-600">{split.expectedPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ex-Date:</span>
                    <span className="font-semibold text-gray-900">{split.exDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Record Date:</span>
                    <span className="font-semibold text-gray-900">{split.recordDate}</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Recent Splits */}
        {activeTab === "recent" && (
          <div className="space-y-4">
            {recentSplits.map((split, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-bold text-gray-900 text-xl">
                        {split.company}
                      </h3>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                        {split.symbol}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        split.type === "Split"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}>
                        {split.type} {split.ratio}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        Completed
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">Price Before</p>
                        <p className="font-semibold text-gray-900">{split.preBefore}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Price After</p>
                        <p className="font-semibold text-cyan-600">{split.priceAfter}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Change</p>
                        <p className={`font-semibold ${
                          split.change.startsWith("+") ? "text-green-600" : "text-red-600"
                        }`}>
                          {split.change}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">Ex-Date</p>
                    <p className="font-semibold text-gray-900">{split.exDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Educational Content */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Understanding Stock Splits */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What is a Stock Split?
            </h2>
            
            <p className="text-gray-600 mb-6">
              A stock split divides existing shares into multiple shares to reduce the share price and improve liquidity. Your total investment value remains the same.
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-blue-900 mb-3">Example: 1:2 Split</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>Before Split:</span>
                  <span className="font-semibold">100 shares @ ₹1,000 = ₹1,00,000</span>
                </div>
                <div className="flex justify-between">
                  <span>After Split:</span>
                  <span className="font-semibold">200 shares @ ₹500 = ₹1,00,000</span>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 mb-3">Why Companies Split Stocks?</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-cyan-600 mr-2">•</span>
                <span>Make shares more affordable for retail investors</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-600 mr-2">•</span>
                <span>Improve liquidity and trading volume</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-600 mr-2">•</span>
                <span>Signal confidence in company's future growth</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-600 mr-2">•</span>
                <span>Reduce psychological barrier of high share price</span>
              </li>
            </ul>
          </div>

          {/* Bonus Shares */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What are Bonus Shares?
            </h2>
            
            <p className="text-gray-600 mb-6">
              Bonus shares are additional shares given to existing shareholders at no cost, funded from the company's reserves or accumulated profits.
            </p>

            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-purple-900 mb-3">Example: 1:1 Bonus</h4>
              <div className="space-y-2 text-sm text-purple-800">
                <div className="flex justify-between">
                  <span>Before Bonus:</span>
                  <span className="font-semibold">100 shares @ ₹2,000 = ₹2,00,000</span>
                </div>
                <div className="flex justify-between">
                  <span>After Bonus:</span>
                  <span className="font-semibold">200 shares @ ₹1,000 = ₹2,00,000</span>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 mb-3">Split vs Bonus</h4>
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="font-semibold text-blue-900 text-sm mb-1">Stock Split</p>
                <p className="text-xs text-blue-800">
                  Divides existing shares. Face value changes. No impact on reserves.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="font-semibold text-purple-900 text-sm mb-1">Bonus Issue</p>
                <p className="text-xs text-purple-800">
                  Issues new shares. Face value unchanged. Reduces free reserves.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
              <span className="mr-2">💡</span>
              Important Points
            </h4>
            <ul className="text-sm text-yellow-800 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Your total investment value remains unchanged after split/bonus</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Must hold shares before ex-date to be eligible</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Stock price adjusts automatically on ex-date</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h4 className="font-semibold text-green-900 mb-2 flex items-center">
              <span className="mr-2">📊</span>
              Tax Implications
            </h4>
            <ul className="text-sm text-green-800 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>No tax liability on receiving split/bonus shares</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Capital gains calculated from original purchase date</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Cost of acquisition gets proportionally adjusted</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}