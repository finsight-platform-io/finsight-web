import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await context.params;
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "1mo"; // Default 1 month

    if (!symbol) {
      return NextResponse.json(
        {
          success: false,
          error: "Stock symbol is required",
        },
        { status: 400 }
      );
    }

    const { default: YahooFinance } = require("yahoo-finance2");
    const yf = new YahooFinance();

    // Map period to Yahoo Finance format
    const periodMap: { [key: string]: { period1: string; period2: string } } = {
      "1d": {
        period1: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        period2: new Date().toISOString().split('T')[0],
      },
      "5d": {
        period1: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        period2: new Date().toISOString().split('T')[0],
      },
      "1mo": {
        period1: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        period2: new Date().toISOString().split('T')[0],
      },
      "3mo": {
        period1: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        period2: new Date().toISOString().split('T')[0],
      },
      "6mo": {
        period1: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        period2: new Date().toISOString().split('T')[0],
      },
      "1y": {
        period1: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        period2: new Date().toISOString().split('T')[0],
      },
      "5y": {
        period1: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        period2: new Date().toISOString().split('T')[0],
      },
    };

    const dateRange = periodMap[period] || periodMap["1mo"];

    // Fetch historical data
    const historicalData = await yf.historical(symbol, {
      period1: dateRange.period1,
      period2: dateRange.period2,
    });

    // Format data for TradingView
    const formattedData = historicalData.map((item: any) => ({
      time: Math.floor(new Date(item.date).getTime() / 1000), // Convert to Unix timestamp (seconds)
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume,
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
      period: period,
      symbol: symbol,
      count: formattedData.length,
    });
  } catch (error: any) {
    console.error("Error fetching historical data:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch historical data",
      },
      { status: 500 }
    );
  }
}