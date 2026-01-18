"use client";

import { useState } from "react";
import Link from "next/link";

export default function DividendCalendar() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "recent">("upcoming");

  const upcomingDividends = [
    {
      company: "TCS",
      symbol: "TCS",
      dividend: "₹25",
      yield: "3.2%",
      exDate: "22-Jan-2026",
      recordDate: "23-Jan-2026",
      paymentDate: "15-Feb-2026",
      type: "Interim",
    },
    {
      company: "HDFC Bank",
      symbol: "HDFCBANK",
      dividend: "₹19.50",
      yield: "2.8%",
      exDate: "25-Jan-2026",
      recordDate: "26-Jan-2026",
      paymentDate: "20-Feb-2026",
      type: "Final",
    },
    {
      company: "Infosys",
      symbol: "INFY",
      dividend: "₹18",
      yield: "2.5%",
      exDate: "28-Jan-2026",
      recordDate: "29-Jan-2026",
      paymentDate: "25-Feb-2026",
      type: "Interim",
    },
    {
      company: "ITC",
      symbol: "ITC",
      dividend: "₹6.75",
      yield: "4.1%",
      exDate: "30-Jan-2026",
      recordDate: "31-Jan-2026",
      paymentDate: "28-Feb-2026",
      type: "Interim",
    },
    {
      company: "Hindustan Unilever",
      symbol: "HINDUNILVR",
      dividend: "₹22",
      yield: "2.9%",
      exDate: "03-Feb-2026",
      recordDate: "04-Feb-2026",
      paymentDate: "03-Mar-2026",
      type: "Final",
    },
  ];

  const recentDividends = [
    {
      company: "Reliance Industries",
      symbol: "RELIANCE",
      dividend: "₹9",
      yield: "1.8%",
      exDate: "10-Jan-2026",
      recordDate: "11-Jan-2026",
      paymentDate: "05-Feb-2026",
      type: "Interim",
      status: "Paid",
    },
    {
      company: "Coal India",
      symbol: "COALINDIA",
      dividend: "₹15.75",
      yield: "5.2%",
      exDate: "12-Jan-2026",
      recordDate: "13-Jan-2026",
      paymentDate: "07-Feb-2026",
      type: "Interim",
      status: "Paid",
    },
    {
      company: "Wipro",
      symbol: "WIPRO",
      dividend: "₹6",
      yield: "2.1%",
      exDate: "15-Jan-2026",
      recordDate: "16-Jan-2026",
      paymentDate: "10-Feb-2026",
      type: "Interim",
      status: "Announced",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-blue-600">Tools</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Dividend Calendar</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            💸 Dividend Calendar
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track ex-dividend dates and payment schedules
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 inline-flex">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "upcoming"
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Upcoming ({upcomingDividends.length})
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "recent"
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Recent ({recentDividends.length})
            </button>
          </div>
        </div>

        {/* Upcoming Dividends */}
        {activeTab === "upcoming" && (
          <div className="space-y-4">
            {upcomingDividends.map((dividend, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-emerald-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Company Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-bold text-gray-900 text-xl">
                        {dividend.company}
                      </h3>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                        {dividend.symbol}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        dividend.type === "Final"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}>
                        {dividend.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">Dividend Amount</p>
                        <p className="font-bold text-emerald-600 text-lg">{dividend.dividend}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Yield</p>
                        <p className="font-semibold text-gray-900">{dividend.yield}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Ex-Date</p>
                        <p className="font-semibold text-gray-900">{dividend.exDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Payment Date</p>
                        <p className="font-semibold text-gray-900">{dividend.paymentDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all whitespace-nowrap">
                    View Details
                  </button>
                </div>

                {/* Important Dates Row */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Ex-Date: {dividend.exDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Record: {dividend.recordDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Payment: {dividend.paymentDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recent Dividends */}
        {activeTab === "recent" && (
          <div className="space-y-4">
            {recentDividends.map((dividend, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-bold text-gray-900 text-xl">
                        {dividend.company}
                      </h3>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                        {dividend.symbol}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        dividend.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {dividend.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">Dividend Amount</p>
                        <p className="font-bold text-emerald-600 text-lg">{dividend.dividend}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Yield</p>
                        <p className="font-semibold text-gray-900">{dividend.yield}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Ex-Date</p>
                        <p className="font-semibold text-gray-900">{dividend.exDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Payment Date</p>
                        <p className="font-semibold text-gray-900">{dividend.paymentDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Educational Content */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Understanding Dividends */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Understanding Dividend Dates
            </h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Ex-Dividend Date</h4>
                <p className="text-sm text-blue-800">
                  You must own the stock before this date to receive the dividend. If you buy on or after this date, you won't get this dividend.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Record Date</h4>
                <p className="text-sm text-purple-800">
                  The company checks its records on this date to see who the shareholders are and who will receive the dividend.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Payment Date</h4>
                <p className="text-sm text-green-800">
                  The actual date when the dividend is credited to your account. Usually 2-4 weeks after the record date.
                </p>
              </div>
            </div>
          </div>

          {/* Dividend Types */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Types of Dividends
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">F</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Final Dividend</h4>
                  <p className="text-sm text-gray-600">
                    Declared after the end of the financial year, approved by shareholders at AGM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">I</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Interim Dividend</h4>
                  <p className="text-sm text-gray-600">
                    Declared during the financial year, typically quarterly or half-yearly
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Special Dividend</h4>
                  <p className="text-sm text-gray-600">
                    One-time payment, usually when company has excess cash from sale of assets
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-xs text-yellow-800">
                💡 <strong>Tip:</strong> Dividend yield = (Annual Dividend / Current Stock Price) × 100
              </p>
            </div>
          </div>
        </div>

        {/* Tax Info */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
          <h4 className="font-semibold text-orange-900 mb-2 flex items-center">
            <span className="mr-2">📊</span>
            Tax Information
          </h4>
          <p className="text-sm text-orange-800">
            Dividends are taxable in the hands of shareholders. TDS @ 10% is deducted if dividend exceeds ₹5,000 in a financial year. Include dividend income in your ITR under "Income from Other Sources."
          </p>
        </div>
      </div>
    </div>
  );
}