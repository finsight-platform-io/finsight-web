'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import StockSearch from './StockSearch';
import LiveIndicesTicker from './LiveIndicesTicker';
import SignInModal from './SignInModal';

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar - White */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Home Icon */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="text-blue-600 hover:text-blue-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <span className="text-xl font-bold">
                  <span className="text-gray-800">Fin</span>
                  <span className="text-orange-500">sight</span>
                </span>
              </div>
            </Link>

            {/* Desktop: Search (Left side with more spacing) */}
            <div className="hidden lg:flex items-center flex-1 mx-8">
              <div className="w-96 ml-8">
                <StockSearch />
              </div>
            </div>

            {/* Right Side: Live Ticker + Profile / Auth */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Live Ticker */}
              <div className="hidden lg:block">
                <LiveIndicesTicker />
              </div>

              {/* Auth Buttons */}
              {/* Auth Buttons */}
              {session ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                    <span className="text-sm font-medium">{session.user?.name?.split(' ')[0]}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                        <p className="text-xs text-gray-500">{session.user?.email}</p>
                      </div>
                      <Link href="/watchlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Watchlist
                      </Link>
                      <Link href="/portfolio" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Portfolio
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3 whitespace-nowrap">
                  <button
                    onClick={() => setShowSignInModal(true)}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Sign In
                  </button>
                  <span className="text-gray-400 text-sm">/</span>
                  <button
                    onClick={() => setShowSignInModal(true)}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Free Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Light Gray */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 h-12">
            <Link href="/markets" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Markets
            </Link>
            <Link href="/screener" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Screener
            </Link>
            <Link href="/tools" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Tools
            </Link>
            <Link href="/charts" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Charts
            </Link>
            <Link href="/commodity" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Commodity
            </Link>
            <Link href="/news" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              News
            </Link>
            <Link href="/watchlist" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Watchlist
              {!session && <span className="ml-1 text-xs text-gray-500">★</span>}
            </Link>
            <Link href="/portfolio" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Portfolio
              {!session && <span className="ml-1 text-xs text-gray-500">★</span>}
            </Link>
            <Link href="/pro" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center">
              Finsight PRO
              <span className="ml-1">💎</span>
            </Link>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 space-y-2">
              <div className="mb-4">
                <StockSearch />
              </div>
              <Link 
                href="/markets" 
                className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Markets
              </Link>
              <Link 
                href="/screener" 
                className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Screener
              </Link>
              <Link 
                href="/tools" 
                className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tools
              </Link>
              <Link 
                href="/charts" 
                className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Charts
              </Link>
              <Link 
                href="/commodity" 
                className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Commodity
              </Link>
              <Link 
                href="/news" 
                className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                News
              </Link>
              <Link 
                href="/watchlist" 
                className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Watchlist {!session && '★'}
              </Link>
              <Link 
                href="/portfolio" 
                className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio {!session && '★'}
              </Link>
              <Link 
                href="/pro" 
                className="block py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Finsight PRO 💎
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Sign In Modal */}
      {showSignInModal && <SignInModal onClose={() => setShowSignInModal(false)} />}
    </header>
  );
}
