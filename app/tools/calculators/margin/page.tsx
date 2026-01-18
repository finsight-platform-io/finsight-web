"use client";

import { useState } from "react";
import Link from "next/link";

export default function MarginCalculator() {
  const [tradeType, setTradeType] = useState<"equity" | "futures" | "options">("equity");
  const [segment, setSegment] = useState<"intraday" | "delivery">("intraday");
  const [quantity, setQuantity] = useState(100);
  const [price, setPrice] = useState(1000);
  const [leverage, setLeverage] = useState(5);

  // Calculate margin requirements
  const totalValue = quantity * price;
  
  // Margin calculations based on type
  let marginRequired = 0;
  let exposureLimit = 0;
  let marginPercentage = 0;

  if (tradeType === "equity") {
    if (segment === "intraday") {
      marginPercentage = 100 / leverage;
      marginRequired = (totalValue * marginPercentage) / 100;
      exposureLimit = totalValue;
    } else {
      marginPercentage = 100;
      marginRequired = totalValue;
      exposureLimit = totalValue;
    }
  } else if (tradeType === "futures") {
    marginPercentage = 15; // SPAN + Exposure margin
    marginRequired = (totalValue * marginPercentage) / 100;
    exposureLimit = totalValue;
  } else if (tradeType === "options") {
    marginPercentage = 100;
    marginRequired = totalValue;
    exposureLimit = totalValue;
  }

  const availableLeverage = totalValue / marginRequired;

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toLocaleString("en-IN")}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-blue-600">Tools</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Margin Calculator</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📊 Margin Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate margin requirements for equity, futures, and options trading
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Calculate Margin
            </h2>

            {/* Trade Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Trade Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setTradeType("equity")}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    tradeType === "equity"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Equity
                </button>
                <button
                  onClick={() => setTradeType("futures")}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    tradeType === "futures"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Futures
                </button>
                <button
                  onClick={() => setTradeType("options")}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    tradeType === "options"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Options
                </button>
              </div>
            </div>

            {/* Segment Selection (Only for Equity) */}
            {tradeType === "equity" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Segment
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSegment("intraday")}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      segment === "intraday"
                        ? "bg-orange-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Intraday
                  </button>
                  <button
                    onClick={() => setSegment("delivery")}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      segment === "delivery"
                        ? "bg-orange-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Delivery
                  </button>
                </div>
              </div>
            )}

            {/* Quantity Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity: {quantity}
              </label>
              <input
                type="range"
                min="1"
                max="10000"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>10,000</span>
              </div>
            </div>

            {/* Price Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price per Unit: ₹{price.toLocaleString("en-IN")}
              </label>
              <input
                type="range"
                min="1"
                max="50000"
                step="1"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹1</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Leverage Input (Only for Intraday Equity) */}
            {tradeType === "equity" && segment === "intraday" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leverage: {leverage}x
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1x</span>
                  <span>20x</span>
                </div>
              </div>
            )}

            {/* Quick Presets */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Quick Presets
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setQuantity(100);
                    setPrice(1000);
                  }}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                >
                  ₹1L
                </button>
                <button
                  onClick={() => {
                    setQuantity(500);
                    setPrice(1000);
                  }}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                >
                  ₹5L
                </button>
                <button
                  onClick={() => {
                    setQuantity(1000);
                    setPrice(1000);
                  }}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                >
                  ₹10L
                </button>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="space-y-6">
            {/* Main Results */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">Margin Required</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-blue-200 text-sm mb-1">Total Trade Value</p>
                  <p className="text-4xl font-bold">{formatCurrency(totalValue)}</p>
                </div>

                <div className="border-t border-blue-400 pt-4">
                  <p className="text-blue-200 text-sm mb-1">Margin Required</p>
                  <p className="text-3xl font-bold">{formatCurrency(marginRequired)}</p>
                  <p className="text-blue-200 text-sm mt-1">
                    ({marginPercentage.toFixed(2)}% of trade value)
                  </p>
                </div>

                <div className="border-t border-blue-400 pt-4">
                  <p className="text-blue-200 text-sm mb-1">Available Leverage</p>
                  <p className="text-3xl font-bold">{availableLeverage.toFixed(2)}x</p>
                </div>
              </div>
            </div>

            {/* Breakdown Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-semibold text-gray-900">{quantity}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Price per Unit</span>
                  <span className="font-semibold text-gray-900">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Trade Type</span>
                  <span className="font-semibold text-gray-900 capitalize">
                    {tradeType}
                  </span>
                </div>
                {tradeType === "equity" && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Segment</span>
                    <span className="font-semibold text-gray-900 capitalize">
                      {segment}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Exposure Limit</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(exposureLimit)}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h4 className="font-semibold text-orange-900 mb-2 flex items-center">
                <span className="mr-2">💡</span>
                Important Note
              </h4>
              <p className="text-sm text-orange-800">
                {tradeType === "equity" && segment === "intraday"
                  ? "Intraday margin varies by broker. Most brokers offer 3x-10x leverage. Always maintain sufficient margin to avoid auto square-off."
                  : tradeType === "futures"
                  ? "Futures margin includes SPAN margin + Exposure margin. Actual margin may vary based on volatility and broker policies."
                  : tradeType === "options"
                  ? "Options buying requires full premium payment. Options selling requires SPAN + Exposure margin which can be significantly higher."
                  : "Delivery trading requires 100% margin upfront. Funds are blocked until trade settlement (T+2 days)."}
              </p>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Understanding Margin Requirements
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What is Margin?
              </h3>
              <p className="text-gray-600 mb-4">
                Margin is the minimum amount of money required to enter a trade. It acts as collateral and is blocked by your broker until the position is closed.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">
                Types of Margin
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>SPAN Margin:</strong> Risk-based margin covering potential losses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Exposure Margin:</strong> Additional buffer margin (usually 3-5%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Intraday Margin:</strong> Reduced margin for same-day trades</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Margin by Segment
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-1">Equity Intraday</h4>
                  <p className="text-sm text-blue-800">
                    Leverage: 3x-10x (varies by broker)
                    <br />
                    Positions must be squared off by 3:20 PM
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-1">Equity Delivery</h4>
                  <p className="text-sm text-green-800">
                    Margin: 100% (No leverage)
                    <br />
                    Shares credited to demat in T+2 days
                  </p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-1">Futures & Options</h4>
                  <p className="text-sm text-orange-800">
                    Margin: 15-30% (varies by volatility)
                    <br />
                    Higher margin for volatile stocks
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
              <span className="mr-2">⚠️</span>
              Risk Disclaimer
            </h4>
            <p className="text-sm text-yellow-800">
              Trading with leverage amplifies both profits and losses. Always use stop-loss orders and never risk more than you can afford to lose. Margin requirements can change based on market volatility and exchange regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}