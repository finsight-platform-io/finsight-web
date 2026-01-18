"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CAGRCalculatorPage() {
  const [initialValue, setInitialValue] = useState(100000);
  const [finalValue, setFinalValue] = useState(200000);
  const [timePeriod, setTimePeriod] = useState(5);
  
  const [results, setResults] = useState({
    cagr: 0,
    totalGain: 0,
    totalGainPercent: 0,
  });

  useEffect(() => {
    calculateCAGR();
  }, [initialValue, finalValue, timePeriod]);

  const calculateCAGR = () => {
    if (initialValue <= 0 || finalValue <= 0 || timePeriod <= 0) {
      setResults({ cagr: 0, totalGain: 0, totalGainPercent: 0 });
      return;
    }

    // CAGR Formula: [(Final Value / Initial Value) ^ (1 / Number of Years)] - 1
    const cagr = (Math.pow(finalValue / initialValue, 1 / timePeriod) - 1) * 100;
    const totalGain = finalValue - initialValue;
    const totalGainPercent = ((finalValue - initialValue) / initialValue) * 100;

    setResults({
      cagr: parseFloat(cagr.toFixed(2)),
      totalGain: Math.round(totalGain),
      totalGainPercent: parseFloat(totalGainPercent.toFixed(2)),
    });
  };

  const formatCurrency = (value: number): string => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm mb-4 text-purple-100">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/tools" className="hover:text-white">Tools</Link>
            <span>›</span>
            <span>CAGR Calculator</span>
          </div>
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-3">📈</span>
            CAGR Calculator
          </h1>
          <p className="text-purple-100 mt-2">
            Calculate Compound Annual Growth Rate of your investments
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Investment Details</h2>
            
            {/* Initial Value */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Initial Investment Value
                </label>
                <span className="text-lg font-bold text-purple-600">
                  ₹{initialValue.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="10000000"
                step="10000"
                value={initialValue}
                onChange={(e) => setInitialValue(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹10,000</span>
                <span>₹1 Cr</span>
              </div>
            </div>

            {/* Final Value */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Final Investment Value
                </label>
                <span className="text-lg font-bold text-green-600">
                  ₹{finalValue.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="50000000"
                step="10000"
                value={finalValue}
                onChange={(e) => setFinalValue(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹10,000</span>
                <span>₹5 Cr</span>
              </div>
            </div>

            {/* Time Period */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Time Period
                </label>
                <span className="text-lg font-bold text-blue-600">
                  {timePeriod} Years
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={timePeriod}
                onChange={(e) => setTimePeriod(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>

            {/* Quick Examples */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Quick Examples:</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setInitialValue(100000);
                    setFinalValue(150000);
                    setTimePeriod(3);
                  }}
                  className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm font-medium"
                >
                  3Y Growth
                </button>
                <button
                  onClick={() => {
                    setInitialValue(500000);
                    setFinalValue(1000000);
                    setTimePeriod(5);
                  }}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium"
                >
                  2x in 5Y
                </button>
                <button
                  onClick={() => {
                    setInitialValue(100000);
                    setFinalValue(400000);
                    setTimePeriod(10);
                  }}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium"
                >
                  4x in 10Y
                </button>
                <button
                  onClick={() => {
                    setInitialValue(1000000);
                    setFinalValue(10000000);
                    setTimePeriod(20);
                  }}
                  className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 text-sm font-medium"
                >
                  10x in 20Y
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div>
            {/* Main CAGR Result */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 text-white mb-6">
              <p className="text-purple-100 text-sm mb-2">Compound Annual Growth Rate</p>
              <p className="text-5xl font-bold mb-4">{results.cagr.toFixed(2)}%</p>
              <p className="text-purple-100 text-sm">
                Your investment grew at this rate annually
              </p>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-gray-500 text-xs mb-1">Total Gain</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(results.totalGain)}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-gray-500 text-xs mb-1">Growth %</p>
                <p className="text-2xl font-bold text-blue-600">
                  {results.totalGainPercent.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Investment Journey</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Started with</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(initialValue)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Grew to</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(finalValue)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">In period of</span>
                  <span className="font-semibold text-gray-900">
                    {timePeriod} years
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">Annual Growth Rate</span>
                    <span className="text-xl font-bold text-purple-600">
                      {results.cagr.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Indicator */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                <p className="text-sm font-medium text-purple-900 mb-2">
                  {results.cagr >= 15 ? "🎉 Excellent!" : results.cagr >= 10 ? "👍 Good!" : "📊 Moderate"}
                </p>
                <p className="text-sm text-gray-700">
                  {results.cagr >= 15 
                    ? "Outstanding returns! Well above market average."
                    : results.cagr >= 10
                    ? "Solid returns! Better than most debt instruments."
                    : results.cagr >= 5
                    ? "Decent returns. Consider diversifying for better growth."
                    : "Below inflation rate. Review your investment strategy."}
                </p>
              </div>

              {/* Yearly Breakdown */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Hypothetical Year-by-Year Growth</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {Array.from({ length: Math.min(timePeriod, 10) }, (_, i) => {
                    const yearValue = initialValue * Math.pow(1 + results.cagr / 100, i + 1);
                    return (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-600">Year {i + 1}</span>
                        <span className="font-medium text-gray-900">
                          {formatCurrency(yearValue)}
                        </span>
                      </div>
                    );
                  })}
                  {timePeriod > 10 && (
                    <p className="text-xs text-gray-500 text-center pt-2">
                      Showing first 10 years only
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">What is CAGR?</h3>
            <p className="text-sm text-gray-600 mb-4">
              CAGR (Compound Annual Growth Rate) is the rate at which an investment grows annually over a specified time period. 
              It assumes that profits are reinvested at the end of each year.
            </p>
            <h4 className="font-semibold text-gray-900 mb-2">Formula:</h4>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <code className="text-xs text-gray-800">
                CAGR = [(Final Value / Initial Value)^(1 / Years)] - 1
              </code>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Why is CAGR Important?</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ Smooths out volatility</li>
              <li>✓ Easy to compare investments</li>
              <li>✓ Measures long-term performance</li>
              <li>✓ Industry standard metric</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">CAGR Benchmarks</h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="font-semibold text-red-900 text-sm">Below 5%</p>
                <p className="text-xs text-gray-600">Below inflation - Review strategy</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="font-semibold text-yellow-900 text-sm">5% - 10%</p>
                <p className="text-xs text-gray-600">Debt/Fixed Income returns</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="font-semibold text-green-900 text-sm">10% - 15%</p>
                <p className="text-xs text-gray-600">Good equity returns</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-semibold text-blue-900 text-sm">15% - 20%</p>
                <p className="text-xs text-gray-600">Excellent performance</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="font-semibold text-purple-900 text-sm">Above 20%</p>
                <p className="text-xs text-gray-600">Exceptional - Rare long-term</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Track Your Investment Performance</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Use our portfolio tracker to monitor CAGR of all your investments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/portfolio"
              className="inline-block bg-white text-purple-600 font-bold px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Open Portfolio
            </Link>
            <Link
              href="/tools/calculators/returns"
              className="inline-block bg-purple-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-purple-400 transition-colors"
            >
              Returns Calculator →
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Disclaimer:</strong> CAGR shows smoothed returns and doesn't reflect year-to-year volatility. 
            Past performance doesn't guarantee future results. Always consider risk factors before investing.
          </p>
        </div>
      </div>
    </div>
  );
}
