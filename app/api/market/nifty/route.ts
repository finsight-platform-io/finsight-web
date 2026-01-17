import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Proper v3 way: Create instance
    const { default: YahooFinance } = require("yahoo-finance2");
    const yf = new YahooFinance();
    
    // Fetch NIFTY 50 data
    // Yahoo Finance symbol for NIFTY 50 is ^NSEI
    const niftyData = await yf.quote("^NSEI");

    return NextResponse.json({
      success: true,
      data: {
        symbol: niftyData.symbol,
        name: niftyData.shortName || "NIFTY 50",
        price: niftyData.regularMarketPrice,
        change: niftyData.regularMarketChange,
        changePercent: niftyData.regularMarketChangePercent,
        previousClose: niftyData.regularMarketPreviousClose,
        open: niftyData.regularMarketOpen,
        dayHigh: niftyData.regularMarketDayHigh,
        dayLow: niftyData.regularMarketDayLow,
        volume: niftyData.regularMarketVolume,
      },
    });
  } catch (error: any) {
    console.error("Error fetching NIFTY data:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch NIFTY data",
      },
      { status: 500 }
    );
  }
}