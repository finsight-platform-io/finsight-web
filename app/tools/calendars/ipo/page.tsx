"use client";

import { useState } from "react";
import Link from "next/link";

export default function IPOCalendar() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "ongoing" | "closed">("upcoming");

  // Sample IPO data
  const upcomingIPOs = [
    {
      company: "TechCorp India Ltd",
      sector: "Technology",
      openDate: "15-Feb-2026",
      closeDate: "19-Feb-2026",
      priceRange: "₹250 - ₹280",
      lotSize: 50,
      issueSize: "₹500 Cr",
      type: "Mainboard",
    },
    {
      company: "Green Energy Solutions",
      sector: "Renewable Energy",
      openDate: "22-Feb-2026",
      closeDate: "26-Feb-2026",
      priceRange: "₹180 - ₹200",
      lotSize: 75,
      issueSize: "₹300 Cr",
      type: "SME",
    },
    {
      company: "FinTech Innovations Pvt Ltd",
      sector: "Financial Services",
      openDate: "01-Mar-2026",
      closeDate: "05-Mar-2026",
      priceRange: "₹350 - ₹400",
      lotSize: 40,
      issueSize: "₹750 Cr",
      type: "Mainboard",
    },
  ];

  const ongoingIPOs = [
    {
      company: "SmartHealth Systems",
      sector: "Healthcare",
      openDate: "10-Jan-2026",
      closeDate: "22-Jan-2026",
      priceRange: "₹220 - ₹250",
      lotSize: 60,
      issueSize: "₹400 Cr",
      type: "Mainboard",
      daysLeft: 4,
    },
    {
      company: "AutoParts Manufacturing",
      sector: "Automobile",
      openDate: "15-Jan-2026",
      closeDate: "21-Jan-2026",
      priceRange: "₹150 - ₹170",
      lotSize: 80,
      issueSize: "₹250 Cr",
      type: "SME",
      daysLeft: 3,
    },
  ];

  const closedIPOs = [
    {
      company: "Digital Commerce Ltd",
      sector: "E-commerce",
      openDate: "05-Jan-2026",
      closeDate: "09-Jan-2026",
      finalPrice: "₹285",
      listingDate: "12-Jan-2026",
      listingGain: "+15.2%",
      type: "Mainboard",
    },
    {
      company: "Solar Power Corp",
      sector: "Energy",
      openDate: "28-Dec-2025",
      closeDate: "02-Jan-2026",
      finalPrice: "₹195",
      listingDate: "05-Jan-2026",
      listingGain: "+8.5%",
      type: "Mainboard",
    },
    {
      company: "AgriTech Solutions",
      sector: "Agriculture",
      openDate: "20-Dec-2025",
      closeDate: "24-Dec-2025",
      finalPrice: "₹120",
      listingDate: "27-Dec-2025",
      listingGain: "-3.2%",
      type: "SME",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-blue-600">Tools</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">IPO Calendar</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎪 IPO Calendar
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track upcoming, ongoing, and recently listed IPOs
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 inline-flex">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "upcoming"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Upcoming ({upcomingIPOs.length})
            </button>
            <button
              onClick={() => setActiveTab("ongoing")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "ongoing"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Ongoing ({ongoingIPOs.length})
            </button>
            <button
              onClick={() => setActiveTab("closed")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "closed"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Recently Listed ({closedIPOs.length})
            </button>
          </div>
        </div>

        {/* Upcoming IPOs */}
        {activeTab === "upcoming" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingIPOs.map((ipo, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-2 border-gray-100 hover:border-indigo-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {ipo.company}
                    </h3>
                    <p className="text-sm text-gray-600">{ipo.sector}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    ipo.type === "Mainboard"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700"
                  }`}>
                    {ipo.type}
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Open Date:</span>
                    <span className="font-semibold text-gray-900">{ipo.openDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Close Date:</span>
                    <span className="font-semibold text-gray-900">{ipo.closeDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price Range:</span>
                    <span className="font-semibold text-indigo-600">{ipo.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lot Size:</span>
                    <span className="font-semibold text-gray-900">{ipo.lotSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Issue Size:</span>
                    <span className="font-semibold text-green-600">{ipo.issueSize}</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Ongoing IPOs */}
        {activeTab === "ongoing" && (
          <div className="grid md:grid-cols-2 gap-6">
            {ongoingIPOs.map((ipo, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-xl mb-1">
                      {ipo.company}
                    </h3>
                    <p className="text-sm text-gray-600">{ipo.sector}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 mb-2">
                      OPEN
                    </span>
                    <span className="text-xs text-gray-600">{ipo.daysLeft} days left</span>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-800 font-semibold mb-2">
                    Subscribe Now!
                  </p>
                  <p className="text-xs text-green-700">
                    Closes on {ipo.closeDate}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Open Date</p>
                    <p className="font-semibold text-gray-900">{ipo.openDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Close Date</p>
                    <p className="font-semibold text-gray-900">{ipo.closeDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Price Range</p>
                    <p className="font-semibold text-indigo-600">{ipo.priceRange}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Lot Size</p>
                    <p className="font-semibold text-gray-900">{ipo.lotSize}</p>
                  </div>
                </div>

                <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all">
                  Apply for IPO
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Recently Listed IPOs */}
        {activeTab === "closed" && (
          <div className="space-y-4">
            {closedIPOs.map((ipo, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {ipo.company}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {ipo.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{ipo.sector}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Subscription Period</p>
                        <p className="font-semibold text-gray-900">
                          {ipo.openDate} to {ipo.closeDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Final Price</p>
                        <p className="font-semibold text-indigo-600">{ipo.finalPrice}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Listing Date</p>
                        <p className="font-semibold text-gray-900">{ipo.listingDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Listing Gain</p>
                      <p className={`text-2xl font-bold ${
                        ipo.listingGain.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}>
                        {ipo.listingGain}
                      </p>
                    </div>
                    <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Apply for an IPO?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                1
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Open Demat Account
              </h3>
              <p className="text-sm text-blue-800">
                Ensure you have an active demat and trading account with a SEBI-registered broker
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 className="font-semibold text-purple-900 mb-2">
                Check Eligibility
              </h3>
              <p className="text-sm text-purple-800">
                Review the IPO prospectus, price band, lot size, and subscription dates
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                3
              </div>
              <h3 className="font-semibold text-green-900 mb-2">
                Place Your Bid
              </h3>
              <p className="text-sm text-green-800">
                Submit your application through your broker's platform during the subscription period
              </p>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Disclaimer:</strong> IPO investments carry market risks. Always read the offer document carefully and consult your financial advisor before investing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}