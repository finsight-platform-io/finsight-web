"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import StockSearch from "./StockSearch";
import SignInModal from "./SignInModal";
import LiveIndicesTicker from "./LiveIndicesTicker";

export default function Header() {
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <header className="bg-gray-800 shadow-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Home Button */}
          <div className="flex items-center flex-shrink-0">
            {/* Home Icon Button */}
            <Link href="/" className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <svg viewBox="0 0 400 120" className="w-40 h-auto md:w-48">
                <g transform="translate(20, 20)">
                  <defs>
                    <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#1e3a8a" }} />
                      <stop offset="50%" style={{ stopColor: "#3b82f6" }} />
                      <stop offset="100%" style={{ stopColor: "#f97316" }} />
                    </linearGradient>
                  </defs>

                  <path d="M 40 5 L 70 20 L 70 50 L 40 65 L 10 50 L 10 20 Z"
                    fill="none"
                    stroke="url(#hexGrad)"
                    strokeWidth="4" />

                  <rect x="20" y="40" width="6" height="15" fill="#f97316" rx="1" />
                  <rect x="28" y="32" width="6" height="23" fill="#f97316" rx="1" />
                  <rect x="36" y="25" width="6" height="30" fill="#f97316" rx="1" />
                  <rect x="44" y="20" width="6" height="35" fill="#fb923c" rx="1" />

                  <circle cx="52" cy="42" r="8" fill="none" stroke="#1e3a8a" strokeWidth="3" />
                  <line x1="58" y1="48" x2="65" y2="55" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round" />
                </g>

                <text x="110" y="70" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold" fill="#ffffff">
                  Fin<tspan fill="#f97316">sight</tspan>
                </text>

                <path d="M 95 55 L 100 45 L 105 55" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <StockSearch />
          </div>

          {/* Navigation - Desktop - No Watchlist/Portfolio here, they're in orange bar */}
          <nav className="hidden lg:flex space-x-6 mr-6">
            {/* Watchlist and Portfolio are in the orange bar below */}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Live Indices Ticker - Show on all screen sizes */}
            <div className="hidden md:block">
              <LiveIndicesTicker />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-md text-gray-200 hover:bg-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {showMobileMenu ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Auth Section */}
            {status === "loading" ? (
              <div className="text-gray-400 text-sm">Loading...</div>
            ) : session?.user ? (
              // User is logged in - show profile dropdown
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 rounded-full py-1.5 px-3 transition-colors"
                >
                  {/* Profile Image - Fixed */}
                  {session.user.image && !imageError ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-8 h-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  {/* Name - Always visible */}
                  <span className="hidden md:block text-sm font-medium text-white">
                    {session.user.name}
                  </span>
                  {/* Dropdown arrow */}
                  <svg
                    className="hidden md:block w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        signOut();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // User is not logged in - show sign-in links with slash
              <div className="hidden md:flex items-center space-x-3 text-sm">
                <button
                  onClick={() => setShowSignInModal(true)}
                  className="text-gray-200 hover:text-white font-medium transition-colors"
                >
                  Sign In
                </button>
                <span className="text-gray-500">/</span>
                <button
                  onClick={() => setShowSignInModal(true)}
                  className="text-gray-200 hover:text-white font-medium transition-colors"
                >
                  Free Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <StockSearch />
        </div>

        {/* Mobile Indices Ticker */}
        <div className="md:hidden pb-4">
          <LiveIndicesTicker />
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden border-t border-gray-700 bg-gray-800">
          <nav className="px-4 py-4 space-y-2">
            {/* Sign in/up buttons for non-authenticated users */}
            {!session?.user && (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setShowSignInModal(true);
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-center text-white font-medium px-4 py-2 border border-gray-500 rounded hover:bg-gray-700"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setShowSignInModal(true);
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-center bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700"
                >
                  Sign Up Free
                </button>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignInModal && (
        <SignInModal onClose={() => setShowSignInModal(false)} />
      )}

      {/* Sub-Navigation Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 border-b border-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-6 overflow-x-auto">
            <Link
              href="/markets"
              className="text-white hover:text-orange-100 font-medium py-3 text-sm whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-white"
            >
              Markets
            </Link>
            {/* Stock Screener */}
            <Link
              href="/screener"
              className="text-white hover:text-orange-100 font-medium py-3 text-sm whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-white inline-flex items-center gap-1"
            >
              <span>🔍</span>
              <span>Screener</span>
            </Link>
            {/* Tools & Calculators */}
            <Link
              href="/tools"
              className="text-white hover:text-orange-100 font-medium py-3 text-sm whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-white inline-flex items-center gap-1"
            >
              <span>🧮</span>
              <span>Tools</span>
            </Link>
            {/* Charts */}
            <Link
              href="/charts"
              className="text-white hover:text-orange-100 font-medium py-3 text-sm whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-white inline-flex items-center gap-1"
            >
              <span>📊</span>
              <span>Charts</span>
            </Link>
            {/* Commodity - NEW */}
            <Link
              href="/commodity"
              className="text-white hover:text-orange-100 font-medium py-3 text-sm whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-white inline-flex items-center gap-1"
            >
              <span>🥇</span>
              <span>Commodity</span>
            </Link>
            <Link
              href="/news"
              className="text-white hover:text-orange-100 font-medium py-3 text-sm whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-white"
            >
              Market News
            </Link>
            <Link
              href="/analysis"
              className="text-white hover:text-orange-100 font-medium py-3 text-sm whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-white"
            >
              Analysis
            </Link>
            {/* Watchlist - Always visible with star for non-authenticated users */}
            <Link
              href="/watchlist"
              className="text-white hover:text-orange-100 font-medium py-3 text-sm whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-white inline-flex items-center gap-1"
            >
              {!session?.user && (
                <span className="text-yellow-300 text-base">★</span>
              )}
              <span>Watchlist</span>
            </Link>
            {/* Portfolio - Always visible with star for non-authenticated users */}
            <Link
              href="/portfolio"
              className="text-white hover:text-orange-100 font-medium py-3 text-sm whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-white inline-flex items-center gap-1"
            >
              {!session?.user && (
                <span className="text-white mr-1">★</span>
              )}
              <span>Portfolio</span>
            </Link>
            {/* Finsight Pro - Premium Feature */}
            <Link
              href="/pro"
              className="inline-flex items-center gap-1 text-white font-bold py-3 text-sm whitespace-nowrap transition-all border-b-2 border-transparent hover:border-white ml-auto"
            >
              <span>Finsight</span>
              <span className="bg-yellow-300 text-orange-900 px-2 py-0.5 rounded font-bold text-xs">
                PRO
              </span>
              <span className="text-lg">💎</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
