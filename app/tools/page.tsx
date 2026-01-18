import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Tools & Calculators - Finsight",
  description: "Free financial calculators, market calendars, and analysis tools for Indian stock market investors",
};

const calculatorTools = [
  {
    name: "SIP Calculator",
    description: "Calculate returns from Systematic Investment Plans",
    icon: "💰",
    href: "/tools/calculators/sip",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    popular: true,
  },
  {
    name: "Lumpsum Calculator",
    description: "Calculate returns on one-time investments",
    icon: "💵",
    href: "/tools/calculators/lumpsum",
    color: "bg-green-50 border-green-200 hover:bg-green-100",
    popular: true,
  },
  {
    name: "CAGR Calculator",
    description: "Calculate Compound Annual Growth Rate",
    icon: "📈",
    href: "/tools/calculators/cagr",
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
  },
  {
    name: "Returns Calculator",
    description: "Calculate investment returns and gains",
    icon: "📊",
    href: "/tools/calculators/returns",
    color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
  },
  {
    name: "Profit/Loss Calculator",
    description: "Calculate profit or loss on stock trades",
    icon: "💹",
    href: "/tools/calculators/profit-loss",
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  },
  {
    name: "Margin Calculator",
    description: "Calculate margin requirements for trades",
    icon: "🎯",
    href: "/tools/calculators/margin",
    color: "bg-pink-50 border-pink-200 hover:bg-pink-100",
  },
];

const calendarTools = [
  {
    name: "Market Holidays",
    description: "NSE & BSE trading holidays calendar",
    icon: "📅",
    href: "/tools/calendars/holidays",
    color: "bg-red-50 border-red-200 hover:bg-red-100",
  },
  {
    name: "IPO Calendar",
    description: "Upcoming IPOs and subscription dates",
    icon: "🎪",
    href: "/tools/calendars/ipo",
    color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
    popular: true,
  },
  {
    name: "Earnings Calendar",
    description: "Company quarterly results dates",
    icon: "📋",
    href: "/tools/calendars/earnings",
    color: "bg-cyan-50 border-cyan-200 hover:bg-cyan-100",
  },
  {
    name: "Dividend Calendar",
    description: "Ex-dividend and payment dates",
    icon: "💸",
    href: "/tools/calendars/dividends",
    color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
  },
  {
    name: "Stock Splits",
    description: "Upcoming stock split announcements",
    icon: "✂️",
    href: "/tools/calendars/splits",
    color: "bg-violet-50 border-violet-200 hover:bg-violet-100",
  },
];

const analysisTools = [
  {
    name: "Compare Stocks",
    description: "Side-by-side comparison of any 2 stocks",
    icon: "⚖️",
    href: "/tools/analysis/compare",
    color: "bg-slate-50 border-slate-200 hover:bg-slate-100",
    popular: true,
  },
  {
    name: "Sector Performance",
    description: "Track performance across different sectors",
    icon: "🏭",
    href: "/tools/analysis/sector-performance",
    color: "bg-teal-50 border-teal-200 hover:bg-teal-100",
  },
  {
    name: "Portfolio Analyzer",
    description: "Analyze your portfolio risk and returns",
    icon: "📊",
    href: "/tools/analysis/portfolio-analyzer",
    color: "bg-lime-50 border-lime-200 hover:bg-lime-100",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-2 text-sm mb-4 text-blue-100">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <span>Tools</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Investment Tools & Calculators</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Free financial calculators, market calendars, and analysis tools to help you make better investment decisions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Calculators Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">🧮 Financial Calculators</h2>
              <p className="text-gray-600">Plan your investments with accurate calculations</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculatorTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`relative block p-6 rounded-xl border-2 ${tool.color} transition-all duration-200 hover:shadow-lg hover:scale-105`}
              >
                {tool.popular && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    POPULAR
                  </span>
                )}
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">{tool.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  <span>Open Calculator</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Calendars Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">📅 Market Calendars</h2>
              <p className="text-gray-600">Stay updated with important market events</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calendarTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`relative block p-6 rounded-xl border-2 ${tool.color} transition-all duration-200 hover:shadow-lg hover:scale-105`}
              >
                {tool.popular && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    POPULAR
                  </span>
                )}
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">{tool.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  <span>View Calendar</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Analysis Tools Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">📊 Analysis Tools</h2>
              <p className="text-gray-600">Advanced tools for market analysis</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`relative block p-6 rounded-xl border-2 ${tool.color} transition-all duration-200 hover:shadow-lg hover:scale-105`}
              >
                {tool.popular && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    POPULAR
                  </span>
                )}
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">{tool.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  <span>Open Tool</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">All Tools are 100% Free</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            No registration required for calculators. Sign in to save your calculations and access personalized tools.
          </p>
          <Link
            href="/screener"
            className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Also Try Our Stock Screener →
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Disclaimer:</strong> These calculators are for informational and educational purposes only.
            Results are estimates based on the inputs provided and should not be considered financial advice.
            Past performance does not guarantee future results. Always consult with a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}