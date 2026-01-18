import { useState, useEffect } from 'react';

export default function LiveIndicesTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [indices, setIndices] = useState([
    { symbol: 'NIFTY 50', value: '...', change: '...', isPositive: true },
    { symbol: 'SENSEX', value: '...', change: '...', isPositive: true },
    { symbol: 'BANK NIFTY', value: '...', change: '...', isPositive: true },
  ]);
  const [loading, setLoading] = useState(true);

  // Fetch real indices data
  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const response = await fetch('/api/indices');
        const data = await response.json();
        
        if (data.success && data.indices) {
          const formattedIndices = data.indices.map((index: any) => ({
            symbol: index.name,
            value: index.price.toLocaleString('en-IN', { maximumFractionDigits: 2 }),
            change: `${index.changePercent >= 0 ? '+' : ''}${index.changePercent.toFixed(2)}%`,
            isPositive: index.changePercent >= 0,
          }));
          
          setIndices(formattedIndices);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching indices:', error);
        setLoading(false);
      }
    };

    fetchIndices();
    // Refresh every 60 seconds
    const interval = setInterval(fetchIndices, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Rotate through indices every 3 seconds
  useEffect(() => {
    if (loading) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % indices.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [indices.length, loading]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1.5 rounded-lg border border-gray-600">
        <div className="w-6 h-6 animate-spin rounded-full border-2 border-gray-500 border-t-green-400"></div>
        <span className="text-xs text-gray-400">Loading...</span>
      </div>
    );
  }

  const current = indices[currentIndex];

  return (
    <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1.5 rounded-lg border border-gray-600 transition-all hover:bg-gray-700/70">
      {/* Animated Chart Icon */}
      <div className="relative w-6 h-6 flex-shrink-0">
        <svg 
          className={`w-full h-full ${current.isPositive ? 'text-green-400' : 'text-red-400'}`}
          viewBox="0 0 24 24" 
          fill="none"
        >
          {/* Animated bars */}
          <rect x="2" y="14" width="3" height="8" fill="currentColor" className="animate-pulse" style={{ animationDelay: '0ms' }} opacity="0.6" />
          <rect x="7" y="11" width="3" height="11" fill="currentColor" className="animate-pulse" style={{ animationDelay: '150ms' }} opacity="0.7" />
          <rect x="12" y="8" width="3" height="14" fill="currentColor" className="animate-pulse" style={{ animationDelay: '300ms' }} opacity="0.9" />
          <rect x="17" y="5" width="3" height="17" fill="currentColor" className="animate-pulse" style={{ animationDelay: '450ms' }} />
          
          {/* Trend line */}
          <path 
            d="M 1 20 L 5 16 L 10 12 L 15 8 L 20 4" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            fill="none"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Ticker Info */}
      <div className="flex flex-col min-w-[120px]">
        <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
          {current.symbol}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white">
            {current.value}
          </span>
          <span className={`text-[10px] font-semibold ${
            current.isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {current.change}
          </span>
        </div>
      </div>

      {/* Indicator dots */}
      <div className="flex gap-1 ml-1">
        {indices.map((_, idx) => (
          <div
            key={idx}
            className={`w-1 h-1 rounded-full transition-all ${
              idx === currentIndex 
                ? current.isPositive 
                  ? 'bg-green-400 w-2' 
                  : 'bg-red-400 w-2'
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}