import { NextResponse } from "next/server";

// Indian Market Index Symbols
const INDIAN_INDICES = {
  nifty50: "^NSEI",      // NIFTY 50
  sensex: "^BSESN",      // BSE SENSEX
  niftyBank: "^NSEBANK", // NIFTY BANK
  niftyIT: "^CNXIT",     // NIFTY IT
  niftyAuto: "^CNXAUTO", // NIFTY AUTO
  niftyPharma: "^CNXPHARMA", // NIFTY PHARMA
};

export async function GET() {
  try {
    const { default: YahooFinance } = require("yahoo-finance2");
    const yf = new YahooFinance();

    // Fetch all indices in parallel
    const indicesPromises = Object.entries(INDIAN_INDICES).map(
      async ([key, symbol]) => {
        try {
          const data = await yf.quote(symbol);
          return {
            id: key,
            symbol: data.symbol,
            name: data.shortName || key.toUpperCase(),
            price: data.regularMarketPrice,
            change: data.regularMarketChange,
            changePercent: data.regularMarketChangePercent,
            previousClose: data.regularMarketPreviousClose,
            open: data.regularMarketOpen,
            dayHigh: data.regularMarketDayHigh,
            dayLow: data.regularMarketDayLow,
            volume: data.regularMarketVolume,
            marketState: data.marketState,
          };
        } catch (error) {
          console.error(`Error fetching ${key}:`, error);
          return null;
        }
      }
    );

    const indices = await Promise.all(indicesPromises);

    // Filter out any failed requests
    const successfulIndices = indices.filter((index) => index !== null);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      count: successfulIndices.length,
      indices: successfulIndices,
    });
  } catch (error: any) {
    console.error("Error fetching market indices:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch market data",
      },
      { status: 500 }
    );
  }
}