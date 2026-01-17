import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Proper v3 way: Create instance using require and .default
    const { default: YahooFinance } = require("yahoo-finance2");
    const yf = new YahooFinance();
    
    // Now use the instance
    const testData = await yf.quote("AAPL");

    return NextResponse.json({
      success: true,
      message: "Yahoo Finance v3 is working!",
      data: {
        symbol: testData.symbol,
        price: testData.regularMarketPrice,
        change: testData.regularMarketChange,
      },
    });
  } catch (error: any) {
    console.error("Yahoo Finance Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}