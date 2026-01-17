import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Search query is required",
        },
        { status: 400 }
      );
    }

    // Require at least 1 character for search
    if (query.trim().length < 1) {
      return NextResponse.json({
        success: true,
        results: [],
        query: query,
      });
    }

    const { default: YahooFinance } = require("yahoo-finance2");
    const yf = new YahooFinance();

    // Search for stocks
    const searchResults = await yf.search(query, {
      quotesCount: 15,
      newsCount: 0,
    });

    // Filter for Indian stocks (NSE/BSE) and regular stocks
    const indianStocks = searchResults.quotes
      ?.filter((quote: any) => {
        const symbol = quote.symbol || "";
        // Include NSE (.NS), BSE (.BO), and Indian indices
        return (
          symbol.endsWith(".NS") ||
          symbol.endsWith(".BO") ||
          symbol.startsWith("^")
        );
      })
      .map((quote: any) => ({
        symbol: quote.symbol,
        name: quote.shortname || quote.longname || quote.symbol,
        exchange: quote.exchange,
        type: quote.quoteType || quote.typeDisp,
        isIndex: quote.symbol?.startsWith("^"),
      }));

    return NextResponse.json({
      success: true,
      results: indianStocks || [],
      query: query,
      total: indianStocks?.length || 0,
    });
  } catch (error: any) {
    console.error("Stock search error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to search stocks",
      },
      { status: 500 }
    );
  }
}