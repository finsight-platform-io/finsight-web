import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";

// Initialize YahooFinance instance for v3
const yahooFinance = new YahooFinance();

interface IndexData {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

// Indian market indices
const INDIAN_INDICES = [
  { name: "NIFTY 50", symbol: "^NSEI" },
  { name: "SENSEX", symbol: "^BSESN" },
  { name: "BANK NIFTY", symbol: "^NSEBANK" },
];

async function fetchIndexData(name: string, symbol: string): Promise<IndexData | null> {
  try {
    console.log(`Fetching data for ${name} (${symbol})...`);
    
    const quote = await yahooFinance.quoteSummary(symbol, { 
      modules: ['price'] 
    }) as any;

    const price = quote?.price;

    if (!price || !price.regularMarketPrice) {
      console.log(`No data for ${name}`);
      return null;
    }

    return {
      name,
      symbol,
      price: price.regularMarketPrice || 0,
      change: price.regularMarketChange || 0,
      changePercent: price.regularMarketChangePercent || 0,
    };
  } catch (error) {
    console.error(`Error fetching ${name}:`, error);
    return null;
  }
}

export async function GET() {
  try {
    console.log("Fetching Indian market indices...");

    // Fetch all indices in parallel
    const indexPromises = INDIAN_INDICES.map(({ name, symbol }) =>
      fetchIndexData(name, symbol)
    );
    const indicesData = await Promise.all(indexPromises);

    // Filter out null values
    const validIndices = indicesData.filter((index): index is IndexData => index !== null);

    if (validIndices.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch any index data",
          indices: [],
        },
        { status: 500 }
      );
    }

    console.log(`Successfully fetched ${validIndices.length} indices`);

    return NextResponse.json({
      success: true,
      indices: validIndices,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Indices API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch indices data",
        indices: [],
      },
      { status: 500 }
    );
  }
}

// Enable revalidation every 60 seconds
export const revalidate = 60;