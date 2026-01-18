"use client";

import { useState } from "react";
import Link from "next/link";

export default function EarningsCalendar() {
  const [selectedWeek, setSelectedWeek] = useState<"thisWeek" | "nextWeek" | "upcoming">("thisWeek");

  const thisWeekEarnings = [
    { company: "Reliance Industries", symbol: "RELIANCE", date: "20-Jan-2026", time: "Post-Market", quarter: "Q3 FY26", estimate: "₹19,500 Cr" },
    { company: "HDFC Bank", symbol: "HDFCBANK", date: "21-Jan-2026", time: "Pre-Market", quarter: "Q3 FY26", estimate: "₹16,200 Cr" },
    { company: "Infosys", symbol: "INFY", date: "22-Jan-2026", time: "Post-Market", quarter: "Q3 FY26", estimate: "₹9,800 Cr" },
    { company: "TCS", symbol: "TCS", date: "23-Jan-2026", time: "Post-Market", quarter: "Q3 FY26", estimate: "₹12,100 Cr" },
    { company: "ICICI Bank", symbol: "ICICIBANK", date: "24-Jan-2026", time: "Pre-Market", quarter: "Q3 FY26", estimate: "₹10,500 Cr" },
  ];

  const nextWeekEarnings = [
    { company: "Wipro", symbol: "WIPRO", date: "27-Jan-2026", time: "Post-Market", quarter: "Q3 FY26", estimate: "₹6,200 Cr" },
    { company: "HCL Technologies", symbol: "HCLTECH", date: "28-Jan-2026", time: "Post-Market", quarter: "Q3 FY26", estimate: "₹7,800 Cr" },
    { company: "Bharti Airtel", symbol: "BHARTIARTL", date: "29-Jan-2026", time: "Pre-Market", quarter: "Q3 FY26", estimate: "₹8,500 Cr" },
    { company: "Maruti Suzuki", symbol: "MARUTI", date: "30-Jan-2026", time: "Post-Market", quarter: "Q3 FY26", estimate: "₹11,200 Cr" },
    { company: "Hindustan Unilever", symbol: "HINDUNILVR", date: "31-Jan-2026", time: "Pre-Market", quarter: "Q3 FY26", estimate: "₹14,300 Cr" },
  ];

  const upcomingEarnings = [
    { company: "Asian Paints", symbol: "ASIANPAINT", date: "03-Feb-2026", time: "Post-Market", quarter: "Q3 FY26", estimate: "₹3,200 Cr" },
    { company: "Titan Company", symbol: "TITAN", date: "05-Feb-2026", time: "Pre-Market", quarter: "Q3 FY26", estimate: "₹4,100 Cr" },
    { company: "Bajaj Finance", symbol: "BAJFINANCE", date: "07-Feb-2026", time: "Post-Market", quarter: "Q3 FY26", estimate: "₹6,800 Cr" },
    { company: "Tech Mahindra", symbol: "TECHM", date: "10-Feb-2026", time: "Post-Market", quarter: "Q3 FY26", estimate: "₹5,500 Cr" },
    { company: "Larsen & Toubro", symbol: "LT", date: "12-Feb-2026", time: "Pre-Market", quarter: "Q3 FY26", estimate: "₹9,200 Cr" },
  ];

  const currentData = 
    selectedWeek === "thisWeek" ? thisWeekEarnings :
    selectedWeek === "nextWeek" ? nextWeekEarnings :
    upcomingEarnings;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-blue-600">Tools</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Earnings Calendar</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📋 Earnings Calendar
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track upcoming quarterly earnings announcements
          </p>
        </div>

        {/* Week Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 inline-flex">
            <button
              onClick={() => setSelectedWeek("thisWeek")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedWeek === "thisWeek"
                  ? "bg-green-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setSelectedWeek("nextWeek")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedWeek === "nextWeek"
                  ? "bg-green-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Next Week
            </button>
            <button
              onClick={() => setSelectedWeek("upcoming")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedWeek === "upcoming"
                  ? "bg-green-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Upcoming
            </button>
          </div>
        </div>

        {/* Earnings List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">
              Earnings Announcements ({currentData.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {currentData.map((earning, index) => (
              <div
                key={index}
                className="px-6 py-5 hover:bg-green-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Company Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {earning.company}
                      </h3>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                        {earning.symbol}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Quarter:</span>
                        <span className="font-semibold text-gray-900">{earning.quarter}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Estimate:</span>
                        <span className="font-semibold text-green-600">{earning.estimate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Date</p>
                      <p className="font-bold text-gray-900">{earning.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Time</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        earning.time === "Pre-Market"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}>
                        {earning.time}
                      </span>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              What to Watch For
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 mr-2 text-xl">•</span>
                <div>
                  <p className="font-semibold text-gray-900">Revenue Growth</p>
                  <p className="text-sm text-gray-600">YoY and QoQ revenue comparison</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 text-xl">•</span>
                <div>
                  <p className="font-semibold text-gray-900">Profit Margins</p>
                  <p className="text-sm text-gray-600">Operating and net profit margins</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 text-xl">•</span>
                <div>
                  <p className="font-semibold text-gray-900">Guidance</p>
                  <p className="text-sm text-gray-600">Management's forward outlook</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 text-xl">•</span>
                <div>
                  <p className="font-semibold text-gray-900">EPS Beat/Miss</p>
                  <p className="text-sm text-gray-600">Actual vs analyst estimates</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Earnings Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Pre-Market (7:00 AM - 9:00 AM)</p>
                  <p className="text-sm text-gray-600">Results declared before market opens</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-bold">2</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Post-Market (After 3:30 PM)</p>
                  <p className="text-sm text-gray-600">Results declared after market closes</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Conference Call</p>
                  <p className="text-sm text-gray-600">Management discusses results (usually 1-2 hours after)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
            <span className="mr-2">💡</span>
            Important Note
          </h4>
          <p className="text-sm text-yellow-800">
            Earnings dates and estimates are subject to change. Companies may reschedule announcements. Always verify with official company sources. Stock prices can be volatile around earnings announcements.
          </p>
        </div>
      </div>
    </div>
  );
}