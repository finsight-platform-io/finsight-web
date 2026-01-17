"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TopBrokersSection from "@/components/TopBrokersSection";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Auto-redirect signed-in users to markets
  useEffect(() => {
    if (session?.user) {
      router.push("/markets");
    }
  }, [session, router]);

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't show homepage if user is signed in (they'll be redirected)
  if (session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="text-6xl mb-6">📈</div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Track Indian Stock Markets
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Real-time data for NSE & BSE stocks, indices, and market analysis
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/markets"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Markets
            </Link>
            <button
              onClick={() => signIn("google")}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Link
            href="/markets"
            className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Real-time Market Data
            </h3>
            <p className="text-gray-600">
              Track NSE & BSE indices, top gainers, losers, and live stock prices
            </p>
          </Link>

          {/* Feature 2 */}
          <button
            onClick={() => signIn("google")}
            className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer text-left"
          >
            <div className="text-4xl mb-4">📌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Personal Watchlist
            </h3>
            <p className="text-gray-600">
              Save and track your favorite stocks in one convenient place
            </p>
          </button>

          {/* Feature 3 */}
          <button
            onClick={() => signIn("google")}
            className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer text-left"
          >
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Portfolio Tracking
            </h3>
            <p className="text-gray-600">
              Monitor your investments with real-time P&L calculations
            </p>
          </button>

          {/* Feature 4 */}
          <Link
            href="/markets"
            className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
          >
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Interactive Charts
            </h3>
            <p className="text-gray-600">
              Analyze price trends with multiple timeframes and detailed charts
            </p>
          </Link>

          {/* Feature 5 */}
          <Link
            href="/news"
            className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
          >
            <div className="text-4xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Market News
            </h3>
            <p className="text-gray-600">
              Stay updated with latest market news and insights on stocks
            </p>
          </Link>

          {/* Feature 6 */}
          <Link
            href="/markets"
            className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
          >
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Mobile Ready
            </h3>
            <p className="text-gray-600">
              Access your portfolio on any device, anywhere, anytime
            </p>
          </Link>
        </div>
      </div>

      {/* Top Brokers Section */}
      <TopBrokersSection />
    </div>
  );
}
