"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TopBrokersSection from "@/components/TopBrokersSection";
import NewsCarousel from "@/components/NewsCarousel";
import LiveMarketStream from "@/components/LiveMarketStream";
import SignInModal from "@/components/SignInModal";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showSignInModal, setShowSignInModal] = useState(false);

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
      {/* Hero Section with Ad - OPTIMIZED */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Hero Content - 2 columns */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Track Indian Stock Markets
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Real-time data for NSE & BSE stocks, indices, and market analysis
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/markets"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-base font-semibold hover:bg-blue-50 transition-colors"
              >
                Explore Markets
              </Link>
              <button
                onClick={() => setShowSignInModal(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-base font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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

          {/* Ad - 1 column */}
          <div className="lg:col-span-1">
            <LiveMarketStream />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 - Markets (No auth needed) */}
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

          {/* Feature 2 - Watchlist (Shows empty state, NOT auto sign-in) ✅ FIXED */}
          <Link
            href="/watchlist"
            className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
          >
            <div className="text-4xl mb-4">📌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Personal Watchlist
            </h3>
            <p className="text-gray-600 mb-3">
              Save and track your favorite stocks in one convenient place
            </p>
            <div className="inline-flex items-center text-sm text-blue-600 font-medium">
              <span className="text-yellow-400 mr-1">★</span>
              Sign in required
            </div>
          </Link>

          {/* Feature 3 - Portfolio (Shows empty state, NOT auto sign-in) ✅ FIXED */}
          <Link
            href="/portfolio"
            className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
          >
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Portfolio Tracking
            </h3>
            <p className="text-gray-600 mb-3">
              Monitor your investments with real-time P&L calculations
            </p>
            <div className="inline-flex items-center text-sm text-blue-600 font-medium">
              <span className="text-yellow-400 mr-1">★</span>
              Sign in required
            </div>
          </Link>
        </div>
      </div>

      {/* Latest News Carousel */}
      <NewsCarousel />

      {/* Top Brokers Section */}
      <TopBrokersSection />

      {/* Sign In Modal */}
      {showSignInModal && (
        <SignInModal onClose={() => setShowSignInModal(false)} />
      )}
    </div>
  );
}
