import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Charts & Technical Analysis - Finsight",
  description: "Interactive stock charts with real-time data for Indian stocks, indices, and forex",
};

const chartTypes = [
  {
    name: "Live Charts",
    description: "Interactive real-time charts for stocks and indices",
    icon: "📈",
    href: "/charts/live",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    popular: true,
  },
  {
    name: "Indices Charts",
    description: "Track major indices with candlestick charts",
    icon: "📊",
    href: "/charts/indices",
    color: "bg-green-50 border-green-200 hover:bg-green-100",
    popular: true,
  },
  {
    name: "Stock Charts",
    description: "Detailed technical charts for individual stocks",
    icon: "💹",
    href: "/charts/stocks",
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
  },
  {
    name: "Forex Charts",
    description: "Currency pair charts and analysis",
    icon: "💱",
    href: "/charts/forex",
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  },
];

const features = [
  {
    title: "Real-Time Data",
    description: "Live price updates and market movements",
    icon: "⚡",
  },
  {
    title: "Interactive Charts",
    description: "Zoom, pan, and analyze with ease",
    icon: "🖱️",
  },
  {
    title: "Multiple Timeframes",
    description: "1D, 1W, 1M, 3M, 6M, 1Y, 5Y views",
    icon: "⏱️",
  },
  {
    title: "Technical Indicators",
    description: "Moving averages, RSI, and more",
    icon: "📉",
  },
];

export default function ChartsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-2 text-sm mb-4 text-blue-100">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <span>Charts</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Live Charts & Technical Analysis</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Interactive stock charts with real-time data, technical indicators, and multi-timeframe analysis
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Chart Types */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">📊 Chart Types</h2>
              <p className="text-gray-600">Choose your preferred chart view</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chartTypes.map((chart) => (
              <Link
                key={chart.href}
                href={chart.href}
                className={`relative block p-6 rounded-xl border-2 ${chart.color} transition-all duration-200 hover:shadow-lg hover:scale-105`}
              >
                {chart.popular && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    POPULAR
                  </span>
                )}
                <div className="text-center">
                  <span className="text-5xl mb-3 block">{chart.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {chart.name}
                  </h3>
                  <p className="text-sm text-gray-600">{chart.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-center text-sm font-medium text-blue-600">
                  <span>Open Charts</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ Chart Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-xl border border-gray-200 text-center"
              >
                <span className="text-4xl mb-3 block">{feature.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Start Guide */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Quick Start Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Choose Chart Type</h3>
                <p className="text-sm text-gray-600">
                  Select from Live Charts, Indices, Stocks, or Forex based on what you want to analyze
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Search & Select</h3>
                <p className="text-sm text-gray-600">
                  Search for any stock, index, or currency pair to view its chart
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Analyze & Trade</h3>
                <p className="text-sm text-gray-600">
                  Use interactive tools, timeframes, and indicators to make informed decisions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Start Analyzing Now</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get real-time insights with our interactive charting tools
          </p>
          <Link
            href="/charts/live"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Open Live Charts →
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Disclaimer:</strong> Charts are for informational purposes only. 
            Past performance does not guarantee future results. 
            Always do your own research before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}