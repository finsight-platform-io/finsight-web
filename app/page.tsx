export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Track Indian Stock Markets
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Real-time data for NSE & BSE stocks, indices, and market analysis
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
              Explore Markets
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Everything You Need to Track Markets
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Live Market Data
            </h3>
            <p className="text-gray-600">
              Track Nifty 50, Sensex, and thousands of NSE & BSE stocks in real-time
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Interactive Charts
            </h3>
            <p className="text-gray-600">
              Advanced charting with technical indicators and multiple timeframes
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Portfolio Tracking
            </h3>
            <p className="text-gray-600">
              Track your investments and analyze performance with detailed P&L
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="text-4xl mb-4">👁️</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Watchlists
            </h3>
            <p className="text-gray-600">
              Create custom watchlists to monitor your favorite stocks
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Price Alerts
            </h3>
            <p className="text-gray-600">
              Get notified when stocks hit your target prices
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="text-4xl mb-4">📰</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Market News
            </h3>
            <p className="text-gray-600">
              Stay updated with latest market news and analysis
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Tracking?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of investors tracking Indian stock markets
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
            Sign Up Free
          </button>
        </div>
      </section>
    </div>
  );
}