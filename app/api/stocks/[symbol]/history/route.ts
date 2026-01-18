import { NextRequest, NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await context.params; // ✅ MUST await

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "1mo";

    if (!symbol) {
      return NextResponse.json(
        { success: false, error: "Stock symbol is required" },
        { status: 400 }
      );
    }

    const yf = new YahooFinance();

    const daysMap: Record<string, number> = {
      "1d": 1,
      "5d": 5,
      "1mo": 30,
      "3mo": 90,
      "6mo": 180,
      "1y": 365,
      "5y": 1825,
    };

    const days = daysMap[period] ?? 30;

    const period1 = new Date(Date.now() - days * 86400000);
    const period2 = new Date();

    const result = await yf.chart(symbol, {
      period1,
      period2,
      interval: "1d",
    });

    const data =
      result?.quotes?.map((q) => ({
        time: Math.floor(q.date.getTime() / 1000),
        open: q.open,
        high: q.high,
        low: q.low,
        close: q.close,
        volume: q.volume,
      })) ?? [];

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
      symbol,
      period,
    });
  } catch (error: any) {
    console.error("Stock history error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch stock data",
      },
      { status: 500 }
    );
  }
}
