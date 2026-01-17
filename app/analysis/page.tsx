export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Market Analysis</h1>
          <p className="text-gray-600 mt-2">
            Expert insights and technical analysis for Indian markets
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-12 text-center mb-8 border border-blue-100">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Expert Analysis Coming Soon
          </h2>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
            We're working on bringing you comprehensive market analysis, technical insights, 
            and expert recommendations to help you make informed investment decisions.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-gray-700">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-2xl">📈</span>
              <span className="font-medium">Technical Analysis</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-2xl">💡</span>
              <span className="font-medium">Market Insights</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-2xl">👨‍💼</span>
              <span className="font-medium">Expert Opinions</span>
            </div>
          </div>
        </div>

        {/* Placeholder Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Technical Analysis */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Technical Analysis
            </h3>
            <p className="text-gray-600 mb-4">
              Chart patterns, support & resistance levels, and technical indicators
            </p>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Coming Soon
            </span>
          </div>

          {/* Fundamental Analysis */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Fundamental Analysis
            </h3>
            <p className="text-gray-600 mb-4">
              Company financials, earnings reports, and valuation metrics
            </p>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Coming Soon
            </span>
          </div>

          {/* Market Outlook */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-4xl mb-4">🔮</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Market Outlook
            </h3>
            <p className="text-gray-600 mb-4">
              Economic trends, sector analysis, and market predictions
            </p>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Coming Soon
            </span>
          </div>
        </div>

        {/* What to Expect */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What to Expect
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Daily Market Analysis
                </h3>
                <p className="text-gray-600">
                  Expert commentary on market movements, key events, and their impact on indices and stocks
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Technical Stock Analysis
                </h3>
                <p className="text-gray-600">
                  Detailed technical analysis with charts, indicators, and price targets for popular stocks
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Sector Reports
                </h3>
                <p className="text-gray-600">
                  In-depth analysis of various sectors including IT, Banking, Pharma, Auto, and more
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Expert Recommendations
                </h3>
                <p className="text-gray-600">
                  Buy, sell, and hold recommendations from market experts with rationale and targets
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Want to be notified when analysis features go live?
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}
