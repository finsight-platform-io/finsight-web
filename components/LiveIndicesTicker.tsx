'use client';

import { useEffect, useState } from 'react';

interface Index {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function LiveIndicesTicker() {
  const [indices, setIndices] = useState<Index[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchIndices();
    const interval = setInterval(fetchIndices, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (indices.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % indices.length);
      }, 3000); // Switch every 3 seconds
      return () => clearInterval(interval);
    }
  }, [indices]);

  const fetchIndices = async () => {
    try {
      const response = await fetch('/api/indices');
      const data = await response.json();
      if (data.success) {
        setIndices(data.indices);
      }
    } catch (error) {
      console.error('Error fetching indices:', error);
    }
  };

  if (indices.length === 0) {
    return (
      <div className="bg-gray-700 rounded-lg px-4 py-2 flex items-center space-x-2">
        <div className="animate-pulse flex items-center space-x-2">
          <div className="h-4 w-24 bg-gray-600 rounded"></div>
          <div className="h-4 w-16 bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  const currentData = indices[currentIndex];
  const isPositive = currentData.changePercent >= 0;

  return (
    <div className="bg-gray-700 rounded-lg px-4 py-2 flex items-center space-x-3 min-w-[280px]">
      {/* Icon and Name */}
      <div className="flex items-center space-x-1 flex-shrink-0">
        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
        <span className="text-white text-xs font-medium uppercase whitespace-nowrap">{currentData.name}</span>
      </div>

      {/* Price */}
      <span className="text-white text-sm font-bold whitespace-nowrap">
        {currentData.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
      </span>

      {/* Change Percent */}
      <span className={`text-xs font-semibold whitespace-nowrap ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? '+' : ''}{currentData.changePercent.toFixed(2)}%
      </span>

      {/* Indicator Dots */}
      <div className="flex items-center space-x-1 flex-shrink-0">
        {indices.map((_, idx) => (
          <span
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              idx === currentIndex ? 'bg-white' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
