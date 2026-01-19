"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TopBrokersSection from "@/components/TopBrokersSection";
import NewsCarousel from "@/components/NewsCarousel";
import SignInModal from "@/components/SignInModal";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [stocks, setStocks] = useState<Stock[]>([]);

  // Fetch stocks for ticker
  useEffect(() => {
    fetchStocks();
    const interval = setInterval(fetchStocks, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStocks = async () => {
    try {
      const [gainersRes, losersRes] = await Promise.all([
        fetch("/api/screener?category=gainers&limit=8"),
        fetch("/api/screener?category=losers&limit=8"),
      ]);
      const gainersData = await gainersRes.json();
      const losersData = await losersRes.json();
      if (gainersData.success && losersData.success) {
        setStocks([
          ...gainersData.stocks.slice(0, 8),
          ...losersData.stocks.slice(0, 8),
        ]);
      }
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

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
      {/* Hero Section - 4 Columns: Text(2) | Video(1) | Ticker(1) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Column 1-2: Hero Text (2 columns = 50% width) */}
          <div className="lg:col-span-2 text-center lg:text-left flex flex-col justify-center">
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

          {/* Column 3: Live Video (1 column = 25% width) */}
          <div className="lg:col-span-1 lg:ml-16 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-fit">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-2 py-1">
              <span className="text-white font-bold text-[10px] flex items-center space-x-1">
                <span className="animate-pulse">🔴</span>
                <span>LIVE News</span>
              </span>
            </div>
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/nDCdRHHBga0?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&enablejsapi=1"
                title="CNBC TV18"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Column 4: Stock Ticker (1 column = 25% width) */}
          <div className="lg:col-span-1 bg-gray-900 text-white rounded-lg shadow-sm border border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-2 py-1 flex items-center justify-between">
              <span className="font-bold text-[10px]">📊 LIVE</span>
              <span className="flex items-center space-x-0.5">
                <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-[8px]">LIVE</span>
              </span>
            </div>

            <div className="overflow-hidden" style={{ height: "200px" }}>
              {stocks.length > 0 ? (
                <div className="animate-scroll-up">
                  {[...stocks, ...stocks].map((stock, idx) => (
                    <Link
                      key={`${stock.symbol}-${idx}`}
                      href={`/stocks/${stock.symbol}`}
                      className="block border-b border-gray-800 hover:bg-gray-800/50 px-2 py-1.5"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0 pr-1">
                          <p className="font-bold text-white text-[10px] truncate">{stock.symbol}</p>
                          <p className="text-[8px] text-gray-400 truncate">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white text-[10px]">₹{stock.price.toFixed(0)}</p>
                          <p className={`text-[8px] font-semibold ${stock.changePercent >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {stock.changePercent >= 0 ? "▲" : "▼"}{Math.abs(stock.changePercent).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>

            <div className="bg-gray-800 px-2 py-0.5 text-center border-t border-gray-700">
              <Link href="/markets" className="text-[9px] text-blue-400 hover:text-blue-300">
                View All →
              </Link>
            </div>
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

      <NewsCarousel />
      <TopBrokersSection />

      {showSignInModal && <SignInModal onClose={() => setShowSignInModal(false)} />}

      <style jsx>{`
        @keyframes scroll-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        .animate-scroll-up {
          animation: scroll-up 40s linear infinite;
        }
        .animate-scroll-up:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
