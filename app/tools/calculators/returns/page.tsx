"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ReturnsCalculatorPage() {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [currentValue, setCurrentValue] = useState(150000);
  
  const [results, setResults] = useState({
    absoluteReturn: 0,
    percentageReturn: 0,
    multiplier: 0,
  });

  useEffect(() => {
    calculateReturns();
  }, [investmentAmount, currentValue]);

  const calculateReturns = () => {
    const absoluteReturn = currentValue - investmentAmount;
    const percentageReturn = ((currentValue - investmentAmount) / investmentAmount) * 100;
    const multiplier = currentValue / investmentAmount;

    setResults({
      absoluteReturn: Math.round(absoluteReturn),
      percentageReturn: parseFloat(percentageReturn.toFixed(2)),
      multiplier: parseFloat(multiplier.toFixed(2)),
    });
  };

  const formatCurrency = (value: number): string => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${Math.abs(value).toLocaleString("en-IN")}`;
  };

  const isProfit = results.absoluteReturn >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm mb-4 text-indigo-100">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/tools" className="hover:text-white">Tools</Link>
            <span>›</span>
            <span>Returns Calculator</span>
          </div>
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-3">📊</span>
            Investment Returns Calculator
          </h1>
          <p className="text-indigo-100 mt-2">
            Calculate your investment returns and gains
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Investment Details</h2>
            
            {/* Investment Amount */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Investment Amount
                </label>
                <span className="text-lg font-bold text-indigo-600">
                  ₹{investmentAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="10000000"
                step="10000"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹10,000</span>
                <span>₹1 Cr</span>
              </div>
            </div>

            {/* Current Value */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Current Value
                </label>
                <span className={`text-lg font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{currentValue.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20000000"
                step="10000"
                value={currentValue}
                onChange={(e) => setCurrentValue(Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isProfit ? 'bg-green-200 accent-green-600' : 'bg-red-200 accent-red-600'}`}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹0</span>
                <span>₹2 Cr</span>
              </div>
            </div>

            {/* Quick Scenarios */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Quick Scenarios:</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setInvestmentAmount(100000);
                    setCurrentValue(120000);
                  }}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium"
                >
                  +20% Gain
                </button>
                <button
                  onClick={() => {
                    setInvestmentAmount(100000);
                    setCurrentValue(200000);
                  }}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium"
                >
                  2x Returns
                </button>
                <button
                  onClick={() => {
                    setInvestmentAmount(100000);
                    setCurrentValue(80000);
                  }}
                  className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium"
                >
                  -20% Loss
                </button>
                <button
                  onClick={() => {
                    setInvestmentAmount(100000);
                    setCurrentValue(100000);
                  }}
                  className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium"
                >
                  Break-even
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div>
            {/* Main Result Card */}
            <div className={`bg-gradient-to-br ${isProfit ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} rounded-xl shadow-lg p-8 text-white mb-6`}>
              <p className="text-white/80 text-sm mb-2">
                {isProfit ? "Total Profit" : "Total Loss"}
              </p>
              <p className="text-5xl font-bold mb-4">
                {isProfit ? '+' : '-'}{formatCurrency(Math.abs(results.absoluteReturn))}
              </p>
              <div className="flex items-center justify-between text-white/90">
                <span className="text-2xl font-bold">
                  {results.percentageReturn >= 0 ? '+' : ''}{results.percentageReturn}%
                </span>
                <span className="text-sm">
                  {results.multiplier.toFixed(2)}x returns
                </span>
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-gray-500 text-xs mb-1">Invested</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(investmentAmount)}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-gray-500 text-xs mb-1">Current Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(currentValue)}
                </p>
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Return Analysis</h3>
              
              {/* Visual Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Performance</span>
                  <span className={`font-semibold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    {results.percentageReturn >= 0 ? '+' : ''}{results.percentageReturn}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 ${isProfit ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(Math.abs(results.percentageReturn), 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Absolute Return</span>
                  <span className={`font-semibold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    {isProfit ? '+' : '-'}{formatCurrency(Math.abs(results.absoluteReturn))}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Percentage Return</span>
                  <span className={`font-semibold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    {results.percentageReturn >= 0 ? '+' : ''}{results.percentageReturn}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Money Multiplier</span>
                  <span className="font-semibold text-gray-900">
                    {results.multiplier.toFixed(2)}x
                  </span>
                </div>
              </div>

              {/* Insight Box */}
              <div className={`mt-6 p-4 rounded-lg ${isProfit ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className={`text-sm font-medium mb-2 ${isProfit ? 'text-green-900' : 'text-red-900'}`}>
                  {isProfit ? '🎉 Profitable Investment!' : '⚠️ Loss-Making Position'}
                </p>
                <p className={`text-sm ${isProfit ? 'text-green-800' : 'text-red-800'}`}>
                  {isProfit 
                    ? results.percentageReturn >= 100 
                      ? `Excellent! You've more than doubled your investment.`
                      : results.percentageReturn >= 50
                      ? `Great returns! Your investment grew by ${results.percentageReturn.toFixed(0)}%.`
                      : results.percentageReturn >= 20
                      ? `Good performance! Solid ${results.percentageReturn.toFixed(0)}% gains.`
                      : `Positive returns of ${results.percentageReturn.toFixed(1)}%.`
                    : Math.abs(results.percentageReturn) >= 50
                    ? `Significant loss. Consider reviewing your investment strategy.`
                    : Math.abs(results.percentageReturn) >= 20
                    ? `Notable loss. Monitor your positions closely.`
                    : `Minor loss. Stay invested if fundamentals remain strong.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Understanding Returns</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Absolute Return</p>
                <p>The actual profit or loss in rupees. Formula: Current Value - Investment Amount</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Percentage Return</p>
                <p>Returns as a percentage of your investment. Formula: (Gain / Investment) × 100</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Money Multiplier</p>
                <p>How many times your money has grown. 2x means doubled, 0.5x means halved.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Return Benchmarks</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">FD Returns</span>
                <span className="font-semibold text-gray-900">6-8%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm text-gray-700">Debt Funds</span>
                <span className="font-semibold text-gray-900">7-10%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-gray-700">Nifty 50</span>
                <span className="font-semibold text-gray-900">12-14%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-gray-700">Good Equity</span>
                <span className="font-semibold text-gray-900">15-20%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm text-gray-700">Exceptional</span>
                <span className="font-semibold text-gray-900">20%+</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-blue-700 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Track Your Portfolio Returns</h3>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Monitor all your investments in one place with our portfolio tracker
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/portfolio"
              className="inline-block bg-white text-indigo-600 font-bold px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              View Portfolio
            </Link>
            <Link
              href="/tools/calculators/profit-loss"
              className="inline-block bg-indigo-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-indigo-400 transition-colors"
            >
              Profit/Loss Calculator →
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Disclaimer:</strong> Returns shown are current snapshots and don't account for time periods, taxes, or fees. 
            Past performance doesn't guarantee future results. Consult a financial advisor before making decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
