import { NextResponse } from "next/server";

// Popular NSE stocks to track
const POPULAR_NSE_STOCKS = [
  "RELIANCE.NS",    // Reliance Industries
  "TCS.NS",         // Tata Consultancy Services
  "HDFCBANK.NS",    // HDFC Bank
  "INFY.NS",        // Infosys
  "ICICIBANK.NS",   // ICICI Bank
  "HINDUNILVR.NS",  // Hindustan Unilever
  "ITC.NS",         // ITC
  "SBIN.NS",        // State Bank of India
  "BHARTIARTL.NS",  // Bharti Airtel
  "KOTAKBANK.NS",   // Kotak Mahindra Bank
  "LT.NS",          // Larsen & Toubro
  "AXISBANK.NS",    // Axis Bank
  "ASIANPAINT.NS",  // Asian Paints
  "MARUTI.NS",      // Maruti Suzuki
  "SUNPHARMA.NS",   // Sun Pharma
  "TITAN.NS",       // Titan Company
  "ULTRACEMCO.NS",  // UltraTech Cement
  "NESTLEIND.NS",   // Nestle India
  "WIPRO.NS",       // Wipro
  "HCLTECH.NS",     // HCL Technologies
];

export async function GET() {
  try {
    const { default: YahooFinance } = require("yahoo-finance2");
    const yf = new YahooFinance();

    // Fetch all stock quotes in parallel
    const stocksPromises = POPULAR_NSE_STOCKS.map(async (symbol) => {
      try {
        const data = await yf.quote(symbol);
        return {
          symbol: data.symbol,
          name: data.shortName || data.longName || symbol,
          price: data.regularMarketPrice,
          change: data.regularMarketChange,
          changePercent: data.regularMarketChangePercent,
          volume: data.regularMarketVolume,
          marketCap: data.marketCap,
        };
      } catch (error) {
        console.error(`Error fetching ${symbol}:`, error);
        return null;
      }
    });

    const stocks = await Promise.all(stocksPromises);

    // Filter out failed requests
    const validStocks = stocks.filter((stock) => stock !== null);

    // Sort by change percentage
    const sortedByChange = [...validStocks].sort(
      (a, b) => (b?.changePercent || 0) - (a?.changePercent || 0)
    );

    // Get top 5 gainers and losers
    const topGainers = sortedByChange.slice(0, 5);
    const topLosers = sortedByChange.slice(-5).reverse();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        gainers: topGainers,
        losers: topLosers,
        totalStocks: validStocks.length,
      },
    });
  } catch (error: any) {
    console.error("Error fetching top movers:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch top movers",
      },
      { status: 500 }
    );
  }
}