"use client";

import { useEffect, useRef } from "react";

export default function LiveMarketWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing content
    containerRef.current.innerHTML = "";

    // Create widget container
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container__widget";
    
    // Create script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    
    // Widget configuration
    const config = {
      "colorTheme": "light",
      "dateRange": "1Y",
      "showChart": true,
      "locale": "en",
      "width": "100%",
      "height": "100%",
      "largeChartUrl": "",
      "isTransparent": false,
      "showSymbolLogo": true,
      "showFloatingTooltip": false,
      "plotLineColorGrowing": "rgba(34, 197, 94, 1)",
      "plotLineColorFalling": "rgba(239, 68, 68, 1)",
      "gridLineColor": "rgba(240, 243, 250, 1)",
      "scaleFontColor": "rgba(106, 109, 120, 1)",
      "belowLineFillColorGrowing": "rgba(34, 197, 94, 0.05)",
      "belowLineFillColorFalling": "rgba(239, 68, 68, 0.05)",
      "belowLineFillColorGrowingBottom": "rgba(34, 197, 94, 0)",
      "belowLineFillColorFallingBottom": "rgba(239, 68, 68, 0)",
      "symbolActiveColor": "rgba(59, 130, 246, 0.12)",
      "tabs": [
        {
          "title": "Indian Indices",
          "symbols": [
            { "s": "BSE:SENSEX", "d": "Sensex" },
            { "s": "NSE:NIFTY", "d": "Nifty 50" },
            { "s": "BSE:BANKEX", "d": "Bank Index" }
          ],
          "originalTitle": "Indices"
        },
        {
          "title": "Top Stocks",
          "symbols": [
            { "s": "NSE:RELIANCE", "d": "Reliance" },
            { "s": "NSE:TCS", "d": "TCS" },
            { "s": "NSE:HDFCBANK", "d": "HDFC Bank" },
            { "s": "NSE:INFY", "d": "Infosys" }
          ],
          "originalTitle": "Stocks"
        }
      ]
    };
    
    script.textContent = JSON.stringify(config);
    
    // Append to container
    containerRef.current.appendChild(widgetContainer);
    containerRef.current.appendChild(script);

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="text-white font-bold text-base">Live Market Data</h3>
              <p className="text-blue-100 text-xs">Real-time NSE & BSE tracking</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 bg-green-500 px-2 py-1 rounded-full">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-white text-xs font-bold">LIVE</span>
          </div>
        </div>
      </div>

      {/* TradingView Widget Container - Fixed Height */}
      <div 
        ref={containerRef} 
        className="tradingview-widget-container"
        style={{ height: "450px" }}
      >
        {/* Loading placeholder */}
        <div className="flex items-center justify-center h-full bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3"></div>
            <p className="text-sm text-gray-600">Loading market data...</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Market Hours: Mon-Fri, 9:15 AM - 3:30 PM IST
        </p>
      </div>
    </div>
  );
}
