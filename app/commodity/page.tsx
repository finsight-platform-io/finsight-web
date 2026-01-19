"use client";

import { useEffect, useState } from "react";

interface CommodityData {
  name: string;
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  type: string;
}

export default function CommodityPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const commodities: CommodityData[] = [
    // Precious Metals
    { name: "Gold", symbol: "XAUUSD", price: "₹62,450", change: "+250", changePercent: "+0.40%", type: "Precious Metals" },
    { name: "Silver", symbol: "XAGUSD", price: "₹78,200", change: "-120", changePercent: "-0.15%", type: "Precious Metals" },
    { name: "Platinum", symbol: "XPTUSD", price: "₹80,500", change: "+300", changePercent: "+0.37%", type: "Precious Metals" },
    
    // Energy
    { name: "Crude Oil", symbol: "CL", price: "₹6,850", change: "+45", changePercent: "+0.66%", type: "Energy" },
    { name: "Natural Gas", symbol: "NG", price: "₹285", change: "-5", changePercent: "-1.72%", type: "Energy" },
    
    // Agriculture
    { name: "Wheat", symbol: "ZW", price: "₹450", change: "+8", changePercent: "+1.81%", type: "Agriculture" },
    { name: "Soybean", symbol: "ZS", price: "₹5,200", change: "-25", changePercent: "-0.48%", type: "Agriculture" },
    { name: "Cotton", symbol: "CT", price: "₹6,750", change: "+120", changePercent: "+1.81%", type: "Agriculture" },
  ];

  const groupedCommodities = commodities.reduce((acc, commodity) => {
    if (!acc[commodity.type]) {
      acc[commodity.type] = [];
    }
    acc[commodity.type].push(commodity);
    return acc;
  }, {} as Record<string, CommodityData[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-4xl">🥇</span>
            <h1 className="text-3xl font-bold text-gray-900">Commodity Prices</h1>
          </div>
          <p className="text-gray-600">Live commodity market prices and trends</p>
        </div>

        {/* Commodity Groups */}
        <div className="space-y-8">
          {Object.entries(groupedCommodities).map(([type, items]) => (
            <div key={type}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{type}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((commodity, index) => {
                  const isPositive = commodity.change.startsWith("+");
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{commodity.name}</h3>
                          <p className="text-sm text-gray-500">{commodity.symbol}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {commodity.changePercent}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{commodity.price}</p>
                          <p className={`text-sm font-medium ${
                            isPositive ? "text-green-600" : "text-red-600"
                          }`}>
                            {commodity.change}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">📊 Market Information</h3>
          <p className="text-blue-800 text-sm">
            Commodity prices are indicative and updated periodically. For real-time trading prices, please check with your broker.
          </p>
        </div>
      </div>
    </div>
  );
}
