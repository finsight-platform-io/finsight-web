import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await context.params;

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

    // Fetch comprehensive stock data
    const [quoteData, summaryData] = await Promise.all([
      yf.quote(symbol),
      yf.quoteSummary(symbol, {
        modules: ["price", "summaryDetail", "defaultKeyStatistics"],
      }).catch(() => null), // Catch if summary fails
    ]);

    const price = summaryData?.price || quoteData;
    const summaryDetail = summaryData?.summaryDetail;
    const keyStats = summaryData?.defaultKeyStatistics;

    return NextResponse.json({
      success: true,
      data: {
        // Basic Info
        symbol: quoteData.symbol,
        name: quoteData.shortName || quoteData.longName,
        exchange: quoteData.fullExchangeName,
        currency: quoteData.currency,
        
        // Price Data
        price: quoteData.regularMarketPrice,
        change: quoteData.regularMarketChange,
        changePercent: quoteData.regularMarketChangePercent,
        previousClose: quoteData.regularMarketPreviousClose,
        open: quoteData.regularMarketOpen,
        dayHigh: quoteData.regularMarketDayHigh,
        dayLow: quoteData.regularMarketDayLow,
        
        // Volume & Market Cap
        volume: quoteData.regularMarketVolume,
        avgVolume: quoteData.averageDailyVolume3Month,
        marketCap: quoteData.marketCap,
        
        // Additional Stats (if available)
        fiftyTwoWeekHigh: summaryDetail?.fiftyTwoWeekHigh,
        fiftyTwoWeekLow: summaryDetail?.fiftyTwoWeekLow,
        dividendYield: summaryDetail?.dividendYield,
        beta: keyStats?.beta,
        trailingPE: summaryDetail?.trailingPE,
        forwardPE: summaryDetail?.forwardPE,
        
        // Market State
        marketState: quoteData.marketState,
        
        // Time
        regularMarketTime: quoteData.regularMarketTime,
      },
    });
  } catch (error: any) {
    console.error("Error fetching stock data:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch stock data",
      },
      { status: 500 }
    );
  }
}