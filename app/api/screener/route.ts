import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

// Popular Indian stocks for screening
const INDIAN_STOCKS = [
  // Nifty 50 stocks
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "HINDUNILVR.NS", "SBIN.NS", "BHARTIARTL.NS", "KOTAKBANK.NS", "ITC.NS",
  "LT.NS", "AXISBANK.NS", "ASIANPAINT.NS", "MARUTI.NS", "HCLTECH.NS",
  "SUNPHARMA.NS", "BAJFINANCE.NS", "TITAN.NS", "ULTRACEMCO.NS", "WIPRO.NS",
  "NESTLEIND.NS", "POWERGRID.NS", "NTPC.NS", "TECHM.NS", "M&M.NS",
  "TATAMOTORS.NS", "JSWSTEEL.NS", "ADANIENT.NS", "ADANIPORTS.NS", "TATASTEEL.NS",
  "ONGC.NS", "COALINDIA.NS", "BPCL.NS", "GRASIM.NS", "DIVISLAB.NS",
  "DRREDDY.NS", "CIPLA.NS", "EICHERMOT.NS", "HEROMOTOCO.NS", "BAJAJ-AUTO.NS",
  "BRITANNIA.NS", "APOLLOHOSP.NS", "INDUSINDBK.NS", "SBILIFE.NS", "HDFCLIFE.NS",
  "TATACONSUM.NS", "HINDALCO.NS", "UPL.NS", "BAJAJFINSV.NS", "SHREECEM.NS",
  // Additional popular stocks
  "VEDL.NS", "ZOMATO.NS", "DMART.NS",
  "PIDILITIND.NS", "HAVELLS.NS", "GODREJCP.NS", "DABUR.NS", "MARICO.NS",
  "BERGEPAINT.NS", "COLPAL.NS", "JUBLFOOD.NS",
  "TATAPOWER.NS", "IRCTC.NS", "INDIGO.NS",
];

// Sector mapping
const SECTOR_MAP: { [key: string]: string[] } = {
  "Technology": ["TCS.NS", "INFY.NS", "HCLTECH.NS", "WIPRO.NS", "TECHM.NS"],
  "Banking": ["HDFCBANK.NS", "ICICIBANK.NS", "SBIN.NS", "KOTAKBANK.NS", "AXISBANK.NS", "INDUSINDBK.NS"],
  "Financial Services": ["BAJFINANCE.NS", "BAJAJFINSV.NS", "SBILIFE.NS", "HDFCLIFE.NS"],
  "Oil & Gas": ["RELIANCE.NS", "ONGC.NS", "BPCL.NS", "ADANIENT.NS"],
  "FMCG": ["HINDUNILVR.NS", "ITC.NS", "NESTLEIND.NS", "BRITANNIA.NS", "TATACONSUM.NS", "DABUR.NS", "MARICO.NS", "COLPAL.NS", "GODREJCP.NS"],
  "Automobile": ["MARUTI.NS", "TATAMOTORS.NS", "M&M.NS", "EICHERMOT.NS", "HEROMOTOCO.NS", "BAJAJ-AUTO.NS"],
  "Pharma": ["SUNPHARMA.NS", "DIVISLAB.NS", "DRREDDY.NS", "CIPLA.NS", "APOLLOHOSP.NS"],
  "Metals": ["TATASTEEL.NS", "JSWSTEEL.NS", "HINDALCO.NS", "VEDL.NS", "COALINDIA.NS"],
  "Infrastructure": ["LT.NS", "ULTRACEMCO.NS", "GRASIM.NS", "ADANIPORTS.NS"],
  "Power": ["POWERGRID.NS", "NTPC.NS", "TATAPOWER.NS"],
  "Telecom": ["BHARTIARTL.NS"],
  "Consumer Durables": ["TITAN.NS", "ASIANPAINT.NS", "HAVELLS.NS", "BERGEPAINT.NS", "PIDILITIND.NS"],
  "New Age Tech": ["ZOMATO.NS", "DMART.NS"],
  "Travel & Hospitality": ["IRCTC.NS", "INDIGO.NS", "JUBLFOOD.NS"],
};

// Get sector for a stock
function getSector(symbol: string): string {
  for (const [sector, stocks] of Object.entries(SECTOR_MAP)) {
    if (stocks.includes(symbol)) {
      return sector;
    }
  }
  return "Others";
}

// Cache for stock data
let stockCache: { data: any[]; timestamp: number } | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse filters - only set if value exists and is valid
    const sector = searchParams.get("sector") || "";
    const minMarketCap = searchParams.get("minMarketCap");
    const maxMarketCap = searchParams.get("maxMarketCap");
    const minPE = searchParams.get("minPE");
    const maxPE = searchParams.get("maxPE");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minChange = searchParams.get("minChange");
    const maxChange = searchParams.get("maxChange");
    const minDividendYield = searchParams.get("minDividendYield");
    const sortBy = searchParams.get("sortBy") || "marketCap";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const limit = parseInt(searchParams.get("limit") || "50");

    // Check cache
    const now = Date.now();
    let stocksData: any[] = [];

    if (stockCache && now - stockCache.timestamp < CACHE_DURATION) {
      console.log("Using cached data");
      stocksData = [...stockCache.data]; // Clone to avoid mutation
    } else {
      console.log("Fetching fresh data");
      stocksData = await fetchAllStocksData();
      if (stocksData.length > 0) {
        stockCache = { data: stocksData, timestamp: now };
      }
    }

    console.log(`Total stocks before filter: ${stocksData.length}`);

    // Apply filters
    let filteredStocks = stocksData.filter(stock => {
      // Sector filter
      if (sector && sector !== "All" && sector !== "") {
        if (stock.sector !== sector) {
          return false;
        }
      }

      // Market Cap filter (value is in crores, stock.marketCap is in actual value)
      if (minMarketCap && minMarketCap !== "") {
        const minCapValue = parseFloat(minMarketCap) * 10000000; // Convert crores to actual
        if (stock.marketCap < minCapValue) {
          return false;
        }
      }
      if (maxMarketCap && maxMarketCap !== "") {
        const maxCapValue = parseFloat(maxMarketCap) * 10000000;
        if (stock.marketCap > maxCapValue) {
          return false;
        }
      }

      // P/E filter
      if (minPE && minPE !== "") {
        const minPEValue = parseFloat(minPE);
        if (!stock.pe || stock.pe < minPEValue) {
          return false;
        }
      }
      if (maxPE && maxPE !== "") {
        const maxPEValue = parseFloat(maxPE);
        if (stock.pe && stock.pe > maxPEValue) {
          return false;
        }
      }

      // Price filter
      if (minPrice && minPrice !== "") {
        if (stock.price < parseFloat(minPrice)) {
          return false;
        }
      }
      if (maxPrice && maxPrice !== "") {
        if (stock.price > parseFloat(maxPrice)) {
          return false;
        }
      }

      // Change % filter
      if (minChange && minChange !== "") {
        if (stock.changePercent < parseFloat(minChange)) {
          return false;
        }
      }
      if (maxChange && maxChange !== "") {
        if (stock.changePercent > parseFloat(maxChange)) {
          return false;
        }
      }

      // Dividend Yield filter
      if (minDividendYield && minDividendYield !== "") {
        if (!stock.dividendYield || stock.dividendYield < parseFloat(minDividendYield)) {
          return false;
        }
      }

      return true;
    });

    console.log(`Stocks after filter: ${filteredStocks.length}`);

    // Sort
    filteredStocks.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      // Handle null values
      if (aVal === null || aVal === undefined) aVal = sortOrder === "asc" ? Infinity : -Infinity;
      if (bVal === null || bVal === undefined) bVal = sortOrder === "asc" ? Infinity : -Infinity;

      if (sortOrder === "asc") {
        return aVal - bVal;
      } else {
        return bVal - aVal;
      }
    });

    // Limit
    filteredStocks = filteredStocks.slice(0, limit);

    return NextResponse.json({
      success: true,
      stocks: filteredStocks,
      totalCount: filteredStocks.length,
      sectors: Object.keys(SECTOR_MAP),
      lastUpdated: stockCache?.timestamp || now,
    });

  } catch (error) {
    console.error("Screener API Error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch stock data",
      stocks: [],
    }, { status: 500 });
  }
}

async function fetchAllStocksData(): Promise<any[]> {
  const stocksData: any[] = [];
  const batchSize = 5; // Smaller batch size for stability

  for (let i = 0; i < INDIAN_STOCKS.length; i += batchSize) {
    const batch = INDIAN_STOCKS.slice(i, i + batchSize);
    
    const batchPromises = batch.map(async (symbol) => {
      try {
        const quote = await yahooFinance.quote(symbol);
        
        if (!quote || !quote.regularMarketPrice) {
          console.log(`No data for ${symbol}`);
          return null;
        }

        return {
          symbol: symbol,
          displaySymbol: symbol.replace(".NS", ""),
          name: quote.shortName || quote.longName || symbol.replace(".NS", ""),
          price: quote.regularMarketPrice || 0,
          change: quote.regularMarketChange || 0,
          changePercent: quote.regularMarketChangePercent || 0,
          marketCap: quote.marketCap || 0,
          marketCapFormatted: formatMarketCap(quote.marketCap || 0),
          pe: quote.trailingPE || null,
          pb: quote.priceToBook || null,
          dividendYield: quote.dividendYield ? quote.dividendYield * 100 : null,
          volume: quote.regularMarketVolume || 0,
          avgVolume: quote.averageDailyVolume3Month || 0,
          fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh || 0,
          fiftyTwoWeekLow: quote.fiftyTwoWeekLow || 0,
          sector: getSector(symbol),
          exchange: "NSE",
        };
      } catch (error) {
        console.error(`Error fetching ${symbol}:`, error);
        return null;
      }
    });

    const batchResults = await Promise.all(batchPromises);
    const validResults = batchResults.filter(Boolean);
    stocksData.push(...validResults);

    // Delay between batches
    if (i + batchSize < INDIAN_STOCKS.length) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  console.log(`Fetched ${stocksData.length} stocks successfully`);
  return stocksData;
}

function formatMarketCap(marketCap: number): string {
  if (!marketCap) return "N/A";
  
  const crore = marketCap / 10000000;
  
  if (crore >= 100000) {
    return `₹${(crore / 100000).toFixed(2)}L Cr`;
  } else if (crore >= 1000) {
    return `₹${(crore / 1000).toFixed(2)}K Cr`;
  } else {
    return `₹${crore.toFixed(2)} Cr`;
  }
}