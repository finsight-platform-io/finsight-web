"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function PortfolioAnalyzer() {
  const { data: session } = useSession();

  // Sample portfolio data
  const portfolioData = {
    totalValue: 525000,
    invested: 450000,
    returns: 75000,
    returnsPercent: 16.67,
    holdings: [
      { symbol: "TCS", name: "Tata Consultancy Services", quantity: 50, buyPrice: 3200, currentPrice: 3850, sector: "IT", weight: 36.7 },
      { symbol: "RELIANCE", name: "Reliance Industries", quantity: 40, buyPrice: 2300, currentPrice: 2450, sector: "Energy", weight: 18.7 },
      { symbol: "HDFCBANK", name: "HDFC Bank", quantity: 60, buyPrice: 1500, currentPrice: 1580, sector: "Banking", weight: 18.1 },
      { symbol: "INFY", name: "Infosys", quantity: 45, buyPrice: 1550, currentPrice: 1650, sector: "IT", weight: 14.1 },
      { symbol: "ITC", name: "ITC Limited", quantity: 100, buyPrice: 420, currentPrice: 445, sector: "FMCG", weight: 8.5 },
      { symbol: "BHARTIARTL", name: "Bharti Airtel", quantity: 15, buyPrice: 850, currentPrice: 920, sector: "Telecom", weight: 2.6 },
    ],
  };

  const sectorAllocation = [
    { sector: "IT", percentage: 50.8, value: 266700, color: "bg-blue-500" },
    { sector: "Energy", percentage: 18.7, value: 98000, color: "bg-orange-500" },
    { sector: "Banking", percentage: 18.1, value: 94800, color: "bg-purple-500" },
    { sector: "FMCG", percentage: 8.5, value: 44500, color: "bg-green-500" },
    { sector: "Telecom", percentage: 2.6, value: 13800, color: "bg-pink-500" },
  ];

  const riskMetrics = {
    volatility: "Medium",
    sharpeRatio: 1.35,
    beta: 0.95,
    diversification: "Moderate",
    concentration: "High in IT sector",
  };

  const calculatePL = (holding: any) => {
    const pl = (holding.currentPrice - holding.buyPrice) * holding.quantity;
    const plPercent = ((holding.currentPrice - holding.buyPrice) / holding.buyPrice) * 100;
    return { pl, plPercent };
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-blue-600">Tools</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Portfolio Analyzer</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔒</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Sign In Required
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Please sign in to analyze your portfolio
            </p>
            <Link
              href="/portfolio"
              className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Go to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-blue-600">Tools</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Portfolio Analyzer</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📊 Portfolio Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive analysis of your portfolio risk and returns
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Total Value</p>
            <p className="text-3xl font-bold text-gray-900">
              ₹{portfolioData.totalValue.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Total Invested</p>
            <p className="text-3xl font-bold text-gray-900">
              ₹{portfolioData.invested.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Total Returns</p>
            <p className="text-3xl font-bold text-green-600">
              ₹{portfolioData.returns.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Returns %</p>
            <p className="text-3xl font-bold text-green-600">
              +{portfolioData.returnsPercent}%
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Sector Allocation */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sector Allocation
            </h2>

            <div className="space-y-4">
              {sectorAllocation.map((sector, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-900">{sector.sector}</span>
                    <span className="text-gray-600">
                      {sector.percentage}% (₹{sector.value.toLocaleString()})
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${sector.color} h-3 rounded-full transition-all`}
                      style={{ width: `${sector.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>High Concentration:</strong> 50.8% of your portfolio is in IT sector. Consider diversifying to reduce sector-specific risk.
              </p>
            </div>
          </div>

          {/* Risk Metrics */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Risk Analysis
            </h2>

            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div>
                  <p className="text-sm text-blue-900 font-semibold">Volatility</p>
                  <p className="text-xs text-blue-700">How much portfolio fluctuates</p>
                </div>
                <span className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-bold">
                  {riskMetrics.volatility}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <div>
                  <p className="text-sm text-purple-900 font-semibold">Sharpe Ratio</p>
                  <p className="text-xs text-purple-700">Risk-adjusted returns</p>
                </div>
                <span className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold">
                  {riskMetrics.sharpeRatio}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div>
                  <p className="text-sm text-green-900 font-semibold">Beta</p>
                  <p className="text-xs text-green-700">Market correlation</p>
                </div>
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold">
                  {riskMetrics.beta}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                <div>
                  <p className="text-sm text-orange-900 font-semibold">Diversification</p>
                  <p className="text-xs text-orange-700">Spread across assets</p>
                </div>
                <span className="px-4 py-2 bg-orange-500 text-white rounded-lg font-bold">
                  {riskMetrics.diversification}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">
              Individual Holdings Analysis
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Quantity</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Buy Price</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Current Price</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">P&L</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {portfolioData.holdings.map((holding, index) => {
                  const { pl, plPercent } = calculatePL(holding);
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{holding.symbol}</p>
                          <p className="text-xs text-gray-600">{holding.name}</p>
                          <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {holding.sector}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                        {holding.quantity}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        ₹{holding.buyPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                        ₹{holding.currentPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className={`font-semibold ${pl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {pl >= 0 ? '+' : ''}₹{pl.toLocaleString()}
                          <p className="text-xs">({plPercent >= 0 ? '+' : ''}{plPercent.toFixed(2)}%)</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                        {holding.weight}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📈 Recommendations
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                <span className="mr-2">✅</span>
                Strengths
              </h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Good overall returns of 16.67%</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Beta of 0.95 indicates moderate market correlation</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Strong Sharpe ratio shows good risk-adjusted returns</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h4 className="font-semibold text-orange-900 mb-3 flex items-center">
                <span className="mr-2">⚠️</span>
                Areas to Improve
              </h4>
              <ul className="space-y-2 text-sm text-orange-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Reduce IT sector exposure from 50.8% to below 30%</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Add exposure to Pharma, Auto, or Metals sectors</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Consider adding defensive stocks for stability</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-3">
              💡 Suggested Actions
            </h4>
            <ol className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>Consider booking partial profits in TCS (up 20.3%) to rebalance</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>Add 2-3 stocks from underrepresented sectors (Pharma, Auto)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>Set stop-loss orders to protect gains</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">4.</span>
                <span>Review and rebalance quarterly to maintain target allocation</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}