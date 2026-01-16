import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">
              📈 Finsight
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Markets
            </Link>
            <Link href="/stocks" className="text-gray-700 hover:text-blue-600 transition">
              Stocks
            </Link>
            <Link href="/watchlist" className="text-gray-700 hover:text-blue-600 transition">
              Watchlist
            </Link>
            <Link href="/portfolio" className="text-gray-700 hover:text-blue-600 transition">
              Portfolio
            </Link>
          </nav>

          {/* Auth Button */}
          <div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}