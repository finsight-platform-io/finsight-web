"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function LumpsumCalculatorPage() {
  const [investment, setInvestment] = useState(100000);
  const [returnRate, setReturnRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(5);
  
  const [results, setResults] = useState({
    totalInvestment: 0,
    estimatedReturns: 0,
    totalValue: 0,
  });

  useEffect(() => {
    calculateLumpsum();
  }, [investment, returnRate, timePeriod]);

  const calculateLumpsum = () => {
    const P = investment;
    const r = returnRate / 100;
    const t = timePeriod;

    // Compound Interest Formula: A = P(1 + r)^t
    const futureValue = P * Math.pow(1 + r, t);
    const estimatedReturns = futureValue - P;

    setResults({
      totalInvestment: Math.round(P),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(futureValue),
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

  const percentage = (results.estimatedReturns / results.totalInvestment) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm mb-4 text-green-100">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/tools" className="hover:text-white">Tools</Link>
            <span>›</span>
            <span>Lumpsum Calculator</span>
          </div>
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-3">💵</span>
            Lumpsum Investment Calculator
          </h1>
          <p className="text-green-100 mt-2">
            Calculate returns on one-time investment
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Investment Details</h2>
            
            {/* Total Investment */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Total Investment
                </label>
                <span className="text-lg font-bold text-green-600">
                  ₹{investment.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="10000000"
                step="10000"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹10,000</span>
                <span>₹1 Cr</span>
              </div>
            </div>

            {/* Expected Return Rate */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Expected Return Rate (Annual)
                </label>
                <span className="text-lg font-bold text-blue-600">
                  {returnRate}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Time Period */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Time Period
                </label>
                <span className="text-lg font-bold text-purple-600">
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
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Quick Presets:</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setInvestment(100000);
                    setReturnRate(10);
                    setTimePeriod(5);
                  }}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium"
                >
                  Short Term
                </button>
                <button
                  onClick={() => {
                    setInvestment(500000);
                    setReturnRate(12);
                    setTimePeriod(10);
                  }}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium"
                >
                  Medium Term
                </button>
                <button
                  onClick={() => {
                    setInvestment(1000000);
                    setReturnRate(15);
                    setTimePeriod(15);
                  }}
                  className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 text-sm font-medium"
                >
                  Long Term
                </button>
                <button
                  onClick={() => {
                    setInvestment(2000000);
                    setReturnRate(18);
                    setTimePeriod(20);
                  }}
                  className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm font-medium"
                >
                  Retirement
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                <p className="text-green-100 text-sm mb-2">Invested Amount</p>
                <p className="text-3xl font-bold">{formatCurrency(results.totalInvestment)}</p>
                <p className="text-green-100 text-sm mt-2">
                  One-time investment
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <p className="text-blue-100 text-sm mb-2">Estimated Returns</p>
                <p className="text-3xl font-bold">{formatCurrency(results.estimatedReturns)}</p>
                <p className="text-blue-100 text-sm mt-2">
                  {percentage.toFixed(1)}% total gain
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <p className="text-purple-100 text-sm mb-2">Total Value</p>
                <p className="text-3xl font-bold">{formatCurrency(results.totalValue)}</p>
                <p className="text-purple-100 text-sm mt-2">
                  After {timePeriod} years @ {returnRate}% p.a.
                </p>
              </div>
            </div>

            {/* Visual Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Investment Breakdown</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Principal Amount</span>
                    <span className="font-semibold text-gray-900">
                      {((results.totalInvestment / results.totalValue) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(results.totalInvestment / results.totalValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Returns</span>
                    <span className="font-semibold text-gray-900">
                      {((results.estimatedReturns / results.totalValue) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(results.estimatedReturns / results.totalValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900 mb-2">💡 Key Insights:</p>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Your money will grow {(results.totalValue / results.totalInvestment).toFixed(2)}x in {timePeriod} years</li>
                  <li>• Annual return: ₹{Math.round(results.estimatedReturns / timePeriod).toLocaleString("en-IN")}/year on average</li>
                  <li>• Power of compounding adds {formatCurrency(results.estimatedReturns)} extra!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="font-bold text-gray-900 mb-6 text-xl">Lumpsum vs SIP Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-green-200 rounded-lg p-6 bg-green-50">
              <h4 className="font-semibold text-green-900 mb-4 flex items-center">
                <span className="mr-2">💵</span>
                Lumpsum Investment
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Best when you have a large sum available</li>
                <li>✓ Higher returns in bull markets</li>
                <li>✓ Suitable for market timing</li>
                <li>✓ Lower transaction costs</li>
                <li>✗ Higher market risk</li>
                <li>✗ Timing the market is difficult</li>
              </ul>
            </div>
            <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
              <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                <span className="mr-2">💰</span>
                SIP Investment
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Regular, disciplined investing</li>
                <li>✓ Rupee cost averaging benefit</li>
                <li>✓ Lower risk through averaging</li>
                <li>✓ Flexible investment amounts</li>
                <li>✗ May miss out in bull markets</li>
                <li>✗ Requires consistent cash flow</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">What is Lumpsum Investment?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Lumpsum investment means investing a large sum of money at once instead of investing smaller amounts regularly. 
              It's ideal when you have received a bonus, inheritance, or have accumulated savings.
            </p>
            <h4 className="font-semibold text-gray-900 mb-2">Best for:</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ When markets are at low levels</li>
              <li>✓ Long-term investment horizon</li>
              <li>✓ Large sum available to invest</li>
              <li>✓ Confident about market timing</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">How to Use This Calculator?</h3>
            <ol className="text-sm text-gray-600 space-y-3">
              <li>
                <strong>1. Investment Amount:</strong> Enter the lumpsum amount you want to invest
              </li>
              <li>
                <strong>2. Return Rate:</strong> Expected annual return (10-15% typical for equity)
              </li>
              <li>
                <strong>3. Time Period:</strong> How long you'll stay invested
              </li>
              <li>
                <strong>4. Review Results:</strong> See your future wealth
              </li>
            </ol>
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-xs text-yellow-800">
                <strong>Tip:</strong> Consider splitting large amounts into multiple investments over 3-6 months to reduce market timing risk.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Compare Different Investment Strategies</h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Try our other calculators to find the best investment approach for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/calculators/sip"
              className="inline-block bg-white text-green-600 font-bold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors"
            >
              SIP Calculator
            </Link>
            <Link
              href="/tools/calculators/cagr"
              className="inline-block bg-green-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-400 transition-colors"
            >
              CAGR Calculator →
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Disclaimer:</strong> This calculator provides estimates based on inputs provided. 
            Actual returns may vary. Past performance doesn't guarantee future results. 
            Consult a financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}