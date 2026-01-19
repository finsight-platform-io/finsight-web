"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TopBrokersSection from "@/components/TopBrokersSection";
import SignInModal from "@/components/SignInModal";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showSignInModal, setShowSignInModal] = useState(false);

  // Auto-redirect signed-in users
  useEffect(() => {
    if (session?.user) {
      router.push("/markets");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section - Simple Text Only */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center lg:text-left max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Track Indian Stock Markets
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Real-time data for NSE & BSE stocks, indices, and market analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/markets"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-base font-semibold hover:bg-blue-50 transition-colors text-center"
            >
              Explore Markets
            </Link>
            <button
              onClick={() => setShowSignInModal(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-base font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/markets" className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-all">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Real-time Market Data</h3>
            <p className="text-gray-600">Track NSE & BSE indices, top gainers, losers, and live stock prices</p>
          </Link>
          <Link href="/watchlist" className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-all">
            <div className="text-4xl mb-4">📌</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Personal Watchlist</h3>
            <p className="text-gray-600 mb-3">Save and track your favorite stocks</p>
            <div className="text-sm text-blue-600 font-medium">
              <span className="text-yellow-400 mr-1">★</span>Sign in required
            </div>
          </Link>
          <Link href="/portfolio" className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-all">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Portfolio Tracking</h3>
            <p className="text-gray-600 mb-3">Monitor your investments with real-time P&L</p>
            <div className="text-sm text-blue-600 font-medium">
              <span className="text-yellow-400 mr-1">★</span>Sign in required
            </div>
          </Link>
        </div>
      </div>

      <TopBrokersSection />

      {showSignInModal && <SignInModal onClose={() => setShowSignInModal(false)} />}
    </div>
  );
}
