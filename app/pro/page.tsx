export default function ProPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-12 text-center mb-8 border border-cyan-100">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-5xl">💎</span>
            <h1 className="text-5xl font-bold text-gray-800">Finsight</h1>
            <span className="bg-cyan-400 text-white px-4 py-2 rounded-lg font-bold text-2xl">
              PRO
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Premium Features Coming Soon
          </h2>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
            Get ready for exclusive tools, advanced analytics, and premium insights 
            to supercharge your investment strategy.
          </p>
        </div>

        {/* Premium Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Advanced Analytics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Advanced Analytics
            </h3>
            <p className="text-gray-600 mb-3">
              Deep dive into stocks with advanced metrics, ratios, and custom screeners
            </p>
            <span className="inline-block bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-medium">
              Coming Soon
            </span>
          </div>

          {/* Real-time Alerts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔔</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Real-time Alerts
            </h3>
            <p className="text-gray-600 mb-3">
              Get instant notifications for price movements, news, and market events
            </p>
            <span className="inline-block bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-medium">
              Coming Soon
            </span>
          </div>

          {/* Premium Research */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Premium Research
            </h3>
            <p className="text-gray-600 mb-3">
              Access expert analysis, detailed reports, and stock recommendations
            </p>
            <span className="inline-block bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-medium">
              Coming Soon
            </span>
          </div>

          {/* Advanced Charting */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📉</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Advanced Charting
            </h3>
            <p className="text-gray-600 mb-3">
              Professional-grade charts with 50+ technical indicators and drawing tools
            </p>
            <span className="inline-block bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-medium">
              Coming Soon
            </span>
          </div>

          {/* Portfolio Analytics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Portfolio Analytics
            </h3>
            <p className="text-gray-600 mb-3">
              Advanced portfolio tracking with risk analysis and performance metrics
            </p>
            <span className="inline-block bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-medium">
              Coming Soon
            </span>
          </div>

          {/* Ad-Free Experience */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ad-Free Experience
            </h3>
            <p className="text-gray-600 mb-3">
              Enjoy uninterrupted browsing without ads and distractions
            </p>
            <span className="inline-block bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-medium">
              Coming Soon
            </span>
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Expected Pricing
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Monthly */}
            <div className="border-2 border-gray-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">₹499</div>
              <p className="text-gray-600 text-sm">per month</p>
            </div>

            {/* Quarterly - Popular */}
            <div className="border-2 border-cyan-500 rounded-lg p-6 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                POPULAR
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quarterly</h3>
              <div className="text-3xl font-bold text-cyan-600 mb-2">₹1,299</div>
              <p className="text-gray-600 text-sm">per quarter</p>
              <p className="text-green-600 text-xs font-medium mt-2">Save 13%</p>
            </div>

            {/* Yearly - Best Value */}
            <div className="border-2 border-gray-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Yearly</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">₹4,499</div>
              <p className="text-gray-600 text-sm">per year</p>
              <p className="text-green-600 text-xs font-medium mt-2">Save 25%</p>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            * Prices are indicative and subject to change at launch
          </p>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-8 border border-cyan-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Be the First to Know
          </h3>
          <p className="text-gray-600 mb-6">
            Join our waitlist and get notified when Finsight PRO launches with exclusive early-bird offers!
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all font-medium shadow-lg">
            Join Waitlist
          </button>
        </div>
      </div>
    </div>
  );
}