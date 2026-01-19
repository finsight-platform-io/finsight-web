"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

export default function HeroMediaBar() {
  const [stocks, setStocks] = useState<Stock[]>([]);

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
        const mixed = [
          ...gainersData.stocks.slice(0, 8),
          ...losersData.stocks.slice(0, 8),
        ];
        setStocks(mixed);
      }
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
      {/* Left: Live News Video */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-3 py-2 flex items-center justify-between">
          <span className="text-white font-bold text-sm flex items-center space-x-2">
            <span className="animate-pulse">🔴</span>
            <span>LIVE Market News</span>
          </span>
        </div>
        
        {/* YouTube Live Stream */}
        <div className="relative" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/l7Qybuep3p8?autoplay=1&mute=1&controls=0&modestbranding=1"
            title="CNBC TV18 Live"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="px-3 py-2 bg-gray-50 text-center">
          <p className="text-xs text-gray-600">CNBC TV18 • Live Business News</p>
        </div>
      </div>

      {/* Right: Stock Ticker */}
      <div className="bg-gray-900 text-white rounded-lg shadow-sm border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 flex items-center justify-between">
          <span className="font-bold text-sm">📊 LIVE MARKET</span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold">LIVE</span>
          </span>
        </div>

        {/* Scrolling Stocks */}
        <div className="overflow-hidden" style={{ height: "280px" }}>
          {stocks.length > 0 ? (
            <div className="animate-scroll-up">
              {[...stocks, ...stocks].map((stock, idx) => (
                <Link
                  key={`${stock.symbol}-${idx}`}
                  href={`/stocks/${stock.symbol}`}
                  className="block border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="px-3 py-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="font-bold text-white text-xs truncate">
                          {stock.symbol}
                        </p>
                        <p className="text-[10px] text-gray-400 truncate">
                          {stock.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white text-xs">
                          ₹{stock.price.toFixed(0)}
                        </p>
                        <p
                          className={`text-[10px] font-semibold ${
                            stock.changePercent >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {stock.changePercent >= 0 ? "▲" : "▼"}
                          {Math.abs(stock.changePercent).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-800 px-3 py-2 text-center border-t border-gray-700">
          <Link
            href="/markets"
            className="text-xs text-blue-400 hover:text-blue-300 font-medium"
          >
            View All Markets →
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-up {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
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
