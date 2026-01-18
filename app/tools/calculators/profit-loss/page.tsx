"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfitLossCalculatorPage() {
  const [buyPrice, setBuyPrice] = useState(100);
  const [sellPrice, setSellPrice] = useState(120);
  const [quantity, setQuantity] = useState(100);
  const [brokerage, setBrokerage] = useState(0.03); // 0.03% default
  
  const [results, setResults] = useState({
    totalInvestment: 0,
    totalSaleValue: 0,
    grossProfit: 0,
    totalBrokerage: 0,
    netProfit: 0,
    returnPercentage: 0,
  });

  useEffect(() => {
    calculateProfitLoss();
  }, [buyPrice, sellPrice, quantity, brokerage]);

  const calculateProfitLoss = () => {
    const investment = buyPrice * quantity;
    const saleValue = sellPrice * quantity;
    const grossProfit = saleValue - investment;
    
    // Calculate brokerage (both buy and sell)
    const buyBrokerage = (investment * brokerage) / 100;
    const sellBrokerage = (saleValue * brokerage) / 100;
    const totalBrokerage = buyBrokerage + sellBrokerage;
    
    const netProfit = grossProfit - totalBrokerage;
    const returnPercentage = (netProfit / investment) * 100;

    setResults({
      totalInvestment: Math.round(investment),
      totalSaleValue: Math.round(saleValue),
      grossProfit: Math.round(grossProfit),
      totalBrokerage: Math.round(totalBrokerage),
      netProfit: Math.round(netProfit),
      returnPercentage: parseFloat(returnPercentage.toFixed(2)),
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

  const isProfit = results.netProfit >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm mb-4 text-orange-100">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/tools" className="hover:text-white">Tools</Link>
            <span>›</span>
            <span>Profit/Loss Calculator</span>
          </div>
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-3">💹</span>
            Profit/Loss Calculator
          </h1>
          <p className="text-orange-100 mt-2">
            Calculate profit or loss on your stock trades
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Trade Details</h2>
            
            {/* Buy Price */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Buy Price (₹)
                </label>
                <input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(Number(e.target.value))}
                  className="w-32 px-3 py-1 border border-gray-300 rounded text-right text-lg font-bold text-orange-600"
                  min="0.01"
                  step="0.01"
                />
              </div>
              <input
                type="range"
                min="1"
                max="10000"
                step="1"
                value={buyPrice}
                onChange={(e) => setBuyPrice(Number(e.target.value))}
                className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹1</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* Sell Price */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Sell Price (₹)
                </label>
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(Number(e.target.value))}
                  className={`w-32 px-3 py-1 border border-gray-300 rounded text-right text-lg font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}
                  min="0.01"
                  step="0.01"
                />
              </div>
              <input
                type="range"
                min="1"
                max="10000"
                step="1"
                value={sellPrice}
                onChange={(e) => setSellPrice(Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isProfit ? 'bg-green-200 accent-green-600' : 'bg-red-200 accent-red-600'}`}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹1</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Quantity (Shares)
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-32 px-3 py-1 border border-gray-300 rounded text-right text-lg font-bold text-blue-600"
                  min="1"
                  step="1"
                />
              </div>
              <input
                type="range"
                min="1"
                max="10000"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>10,000</span>
              </div>
            </div>

            {/* Brokerage */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Brokerage (%)
                </label>
                <input
                  type="number"
                  value={brokerage}
                  onChange={(e) => setBrokerage(Number(e.target.value))}
                  className="w-32 px-3 py-1 border border-gray-300 rounded text-right text-lg font-bold text-purple-600"
                  min="0"
                  max="5"
                  step="0.01"
                />
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.01"
                value={brokerage}
                onChange={(e) => setBrokerage(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>2%</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Quick Examples:</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setBuyPrice(100);
                    setSellPrice(110);
                    setQuantity(100);
                    setBrokerage(0.03);
                  }}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium"
                >
                  +10% Profit
                </button>
                <button
                  onClick={() => {
                    setBuyPrice(100);
                    setSellPrice(125);
                    setQuantity(100);
                    setBrokerage(0.03);
                  }}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium"
                >
                  +25% Profit
                </button>
                <button
                  onClick={() => {
                    setBuyPrice(100);
                    setSellPrice(95);
                    setQuantity(100);
                    setBrokerage(0.03);
                  }}
                  className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium"
                >
                  -5% Loss
                </button>
                <button
                  onClick={() => {
                    setBuyPrice(500);
                    setSellPrice(550);
                    setQuantity(50);
                    setBrokerage(0.05);
                  }}
                  className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm font-medium"
                >
                  High Brokerage
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div>
            {/* Main Result Card */}
            <div className={`bg-gradient-to-br ${isProfit ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} rounded-xl shadow-lg p-8 text-white mb-6`}>
              <p className="text-white/80 text-sm mb-2">
                {isProfit ? "Net Profit 🎉" : "Net Loss 📉"}
              </p>
              <p className="text-5xl font-bold mb-4">
                {isProfit ? '+' : '-'}{formatCurrency(Math.abs(results.netProfit))}
              </p>
              <div className="flex items-center justify-between text-white/90">
                <span className="text-2xl font-bold">
                  {results.returnPercentage >= 0 ? '+' : ''}{results.returnPercentage.toFixed(2)}%
                </span>
                <span className="text-sm">
                  After brokerage
                </span>
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-gray-500 text-xs mb-1">Invested</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(results.totalInvestment)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ₹{buyPrice} × {quantity}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-gray-500 text-xs mb-1">Sale Value</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(results.totalSaleValue)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ₹{sellPrice} × {quantity}
                </p>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Transaction Breakdown</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Gross P/L</span>
                  <span className={`font-semibold ${results.grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {results.grossProfit >= 0 ? '+' : ''}{formatCurrency(results.grossProfit)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Total Brokerage</span>
                  <span className="font-semibold text-red-600">
                    -{formatCurrency(results.totalBrokerage)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-bold text-gray-900">Net P/L</span>
                  <span className={`text-xl font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    {isProfit ? '+' : ''}{formatCurrency(results.netProfit)}
                  </span>
                </div>
              </div>

              {/* Performance Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Return on Investment</span>
                  <span className={`font-semibold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    {results.returnPercentage >= 0 ? '+' : ''}{results.returnPercentage.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 ${isProfit ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(Math.abs(results.returnPercentage), 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Insight Box */}
              <div className={`mt-6 p-4 rounded-lg ${isProfit ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className={`text-sm font-medium mb-2 ${isProfit ? 'text-green-900' : 'text-red-900'}`}>
                  {isProfit ? '✅ Profitable Trade!' : '⚠️ Loss-Making Trade'}
                </p>
                <ul className={`text-sm space-y-1 ${isProfit ? 'text-green-800' : 'text-red-800'}`}>
                  <li>• Per share {isProfit ? 'profit' : 'loss'}: ₹{Math.abs(sellPrice - buyPrice).toFixed(2)}</li>
                  <li>• Brokerage impact: ₹{(results.totalBrokerage / quantity).toFixed(2)}/share</li>
                  <li>• Effective {isProfit ? 'profit' : 'loss'}: ₹{(results.netProfit / quantity).toFixed(2)}/share</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Understanding P&L</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Gross Profit/Loss</p>
                <p>Difference between sale value and purchase value, before any charges.</p>
                <p className="text-xs text-gray-500 mt-1">Formula: (Sell Price - Buy Price) × Quantity</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Brokerage</p>
                <p>Commission charged by broker on both buy and sell transactions.</p>
                <p className="text-xs text-gray-500 mt-1">Typically: 0.03% to 0.5% per transaction</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Net Profit/Loss</p>
                <p>Final profit or loss after deducting all brokerage charges.</p>
                <p className="text-xs text-gray-500 mt-1">Formula: Gross P/L - Total Brokerage</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Typical Brokerage Rates</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Discount Brokers</p>
                  <p className="text-xs text-gray-600">Zerodha, Upstox, Groww</p>
                </div>
                <span className="font-bold text-green-600">0.03%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Full-Service Brokers</p>
                  <p className="text-xs text-gray-600">ICICI, HDFC Securities</p>
                </div>
                <span className="font-bold text-blue-600">0.3-0.5%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Flat Fee Brokers</p>
                  <p className="text-xs text-gray-600">₹10-20 per order</p>
                </div>
                <span className="font-bold text-purple-600">₹10-20</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              💡 Tip: Lower brokerage = Higher net returns. Consider discount brokers for frequent trading.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-600 to-amber-700 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Track All Your Trades</h3>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Use our portfolio tracker to monitor all your trades and calculate overall P&L automatically
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/portfolio"
              className="inline-block bg-white text-orange-600 font-bold px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors"
            >
              View Portfolio
            </Link>
            <Link
              href="/tools/calculators/margin"
              className="inline-block bg-orange-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-400 transition-colors"
            >
              Margin Calculator →
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Disclaimer:</strong> This calculator doesn't include STT, GST, stamp duty, and other transaction charges. 
            Actual P&L may vary. Always verify with your broker's contract note. Not financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
