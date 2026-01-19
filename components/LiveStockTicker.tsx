"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

export default function FloatingStockTicker() {
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

  if (stocks.length === 0) return null;

  return (
    <>
      {/* Ultra Compact Ticker */}
      <div className="fixed right-3 top-36 z-30 w-44 overflow-hidden rounded-md bg-gray-900/85 backdrop-blur-sm border border-gray-700 shadow-md">
        {/* Tiny Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-2 py-0.5 flex items-center justify-between">
          <span className="font-bold text-white text-[9px]">📊</span>
          <span className="flex items-center space-x-0.5">
            <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white text-[7px] font-bold">LIVE</span>
          </span>
        </div>

        {/* Tiny Scrolling Stocks */}
        <div className="overflow-hidden" style={{ height: "220px" }}>
          <div className="animate-scroll-up">
            {[...stocks, ...stocks].map((stock, idx) => (
              <Link
                key={`${stock.symbol}-${idx}`}
                href={`/stocks/${stock.symbol}`}
                className="block border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <div className="px-2 py-1">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0 pr-1">
                      <p className="font-bold text-white text-[9px] truncate">
                        {stock.symbol}
                      </p>
                      <p className="text-[7px] text-gray-400 truncate">
                        {stock.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white text-[9px]">
                        ₹{stock.price.toFixed(0)}
                      </p>
                      <p
                        className={`text-[7px] font-semibold ${
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
        </div>

        {/* Tiny Footer */}
        <div className="bg-gray-800 px-2 py-0.5 text-center border-t border-gray-700">
          <Link
            href="/markets"
            className="text-[8px] text-blue-400 hover:text-blue-300 font-medium"
          >
            View All →
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
    </>
  );
}
