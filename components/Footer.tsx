import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              About Finsight
            </h3>
            <p className="text-sm text-gray-600">
              Indian stock market information platform for NSE & BSE.
            </p>
          </div>

          {/* Markets */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Markets
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/stocks/^NSEI" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Nifty 50
                </Link>
              </li>
              <li>
                <Link 
                  href="/stocks/^BSESN" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Sensex
                </Link>
              </li>
              <li>
                <Link 
                  href="/stocks/^NSEBANK" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Bank Nifty
                </Link>
              </li>
              <li>
                <Link 
                  href="/markets" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  NSE Stocks
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/screener" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Stock Screener
                </Link>
              </li>
              <li>
                <Link 
                  href="/watchlist" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Watchlist
                </Link>
              </li>
              <li>
                <Link 
                  href="/portfolio" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Portfolio Tracker
                </Link>
              </li>
              <li>
                <Link 
                  href="/news" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Market News
                </Link>
              </li>
              <li className="text-gray-400">
                Market Calendar <span className="text-xs">(Coming Soon)</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/disclaimer" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © 2026 Finsight. Information platform only - not for trading.
          </p>
        </div>
      </div>
    </footer>
  );
}
