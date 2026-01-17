"use client";

import Link from "next/link";

export default function NewsPage() {
  // Placeholder news data - in Module 8, we can integrate real news API
  const newsItems = [
    {
      id: 1,
      title: "Market Closes Higher on Strong IT Sector Performance",
      summary: "Nifty 50 and Sensex both gained over 1% as IT stocks led the rally. TCS and Infosys were among top gainers.",
      category: "Market",
      date: "2 hours ago",
      source: "Market Watch",
    },
    {
      id: 2,
      title: "RBI Announces New Monetary Policy Guidelines",
      summary: "Reserve Bank of India maintains repo rate at current levels, focuses on inflation control measures.",
      category: "Economy",
      date: "5 hours ago",
      source: "Economic Times",
    },
    {
      id: 3,
      title: "Reliance Industries Reports Strong Quarterly Results",
      summary: "Company beats estimates with 15% YoY growth in net profit. Telecom and retail segments show robust performance.",
      category: "Stocks",
      date: "1 day ago",
      source: "Business Standard",
    },
    {
      id: 4,
      title: "Foreign Institutional Investors Turn Net Buyers",
      summary: "FIIs invested ₹2,500 crore in Indian equities this week, showing renewed confidence in market.",
      category: "Market",
      date: "1 day ago",
      source: "Bloomberg",
    },
    {
      id: 5,
      title: "Banking Stocks Rally on Strong Earnings Outlook",
      summary: "HDFC Bank, ICICI Bank, and Axis Bank gain 2-3% on positive earnings guidance for next quarter.",
      category: "Stocks",
      date: "2 days ago",
      source: "Moneycontrol",
    },
    {
      id: 6,
      title: "Crude Oil Prices Impact Indian Market Sentiment",
      summary: "Rising crude prices raise concerns about inflation and import costs, affecting market mood.",
      category: "Economy",
      date: "2 days ago",
      source: "Reuters",
    },
  ];

  const categories = ["All", "Market", "Stocks", "Economy"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Market News</h1>
          <p className="text-gray-600 mt-2">
            Stay updated with the latest market news and insights
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors text-gray-700 font-medium"
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Category Badge */}
              <div className="mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    news.category === "Market"
                      ? "bg-blue-100 text-blue-800"
                      : news.category === "Stocks"
                      ? "bg-green-100 text-green-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {news.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {news.title}
              </h3>

              {/* Summary */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {news.summary}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                <span>{news.source}</span>
                <span>{news.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">🚀</div>
          <h3 className="text-xl font-semibold text-blue-900 mb-2">
            Real-time News Coming Soon
          </h3>
          <p className="text-blue-700 mb-4">
            We're working on integrating live news feeds and real-time updates. Stay tuned!
          </p>
          <Link
            href="/markets"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Explore Markets
          </Link>
        </div>
      </div>
    </div>
  );
}
