import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

// Add proper typing for Yahoo Finance quote
interface YahooQuote {
  regularMarketPrice?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  marketCap?: number;
  trailingPE?: number;
  priceToBook?: number;
  trailingAnnualDividendYield?: number;
  regularMarketVolume?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  longName?: string;
  shortName?: string;
  symbol?: string;
}

interface Stock {
  symbol: string;
  displaySymbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  marketCapFormatted: string;
  pe: number | null;
  pb: number | null;
  dividendYield: number | null;
  volume: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  sector: string;
}

// NSE stock symbols with sectors
const NSE_STOCKS: { [key: string]: string } = {
  // Technology
  "TCS.NS": "Technology",
  "INFY.NS": "Technology",
  "WIPRO.NS": "Technology",
  "HCLTECH.NS": "Technology",
  "TECHM.NS": "Technology",
  "LTI.NS": "Technology",
  "COFORGE.NS": "Technology",
  "PERSISTENT.NS": "Technology",
  
  // Banking
  "HDFCBANK.NS": "Banking",
  "ICICIBANK.NS": "Banking",
  "SBIN.NS": "Banking",
  "KOTAKBANK.NS": "Banking",
  "AXISBANK.NS": "Banking",
  "INDUSINDBK.NS": "Banking",
  "BANDHANBNK.NS": "Banking",
  "FEDERALBNK.NS": "Banking",
  "IDFCFIRSTB.NS": "Banking",
  
  // Financial Services
  "BAJFINANCE.NS": "Financial Services",
  "BAJAJFINSV.NS": "Financial Services",
  "HDFCLIFE.NS": "Financial Services",
  "SBILIFE.NS": "Financial Services",
  "ICICIGI.NS": "Financial Services",
  "CHOLAFIN.NS": "Financial Services",
  "MUTHOOTFIN.NS": "Financial Services",
  
  // Oil & Gas
  "RELIANCE.NS": "Oil & Gas",
  "ONGC.NS": "Oil & Gas",
  "BPCL.NS": "Oil & Gas",
  "IOC.NS": "Oil & Gas",
  "GAIL.NS": "Oil & Gas",
  
  // FMCG
  "HINDUNILVR.NS": "FMCG",
  "ITC.NS": "FMCG",
  "NESTLEIND.NS": "FMCG",
  "BRITANNIA.NS": "FMCG",
  "DABUR.NS": "FMCG",
  "MARICO.NS": "FMCG",
  "GODREJCP.NS": "FMCG",
  
  // Automobile
  "MARUTI.NS": "Automobile",
  "TATAMOTORS.NS": "Automobile",
  "M&M.NS": "Automobile",
  "BAJAJ-AUTO.NS": "Automobile",
  "HEROMOTOCO.NS": "Automobile",
  "EICHERMOT.NS": "Automobile",
  "TVSMOTOR.NS": "Automobile",
  
  // Pharma
  "SUNPHARMA.NS": "Pharma",
  "DRREDDY.NS": "Pharma",
  "CIPLA.NS": "Pharma",
  "DIVISLAB.NS": "Pharma",
  "AUROPHARMA.NS": "Pharma",
  "BIOCON.NS": "Pharma",
  "TORNTPHARM.NS": "Pharma",
  
  // Metals
  "TATASTEEL.NS": "Metals",
  "HINDALCO.NS": "Metals",
  "JSWSTEEL.NS": "Metals",
  "VEDL.NS": "Metals",
  "COALINDIA.NS": "Metals",
  "JINDALSTEL.NS": "Metals",
  
  // Infrastructure
  "LT.NS": "Infrastructure",
  "ULTRACEMCO.NS": "Infrastructure",
  "GRASIM.NS": "Infrastructure",
  "ADANIENT.NS": "Infrastructure",
  "ADANIPORTS.NS": "Infrastructure",
  
  // Power
  "POWERGRID.NS": "Power",
  "NTPC.NS": "Power",
  "TATAPOWER.NS": "Power",
  "ADANIGREEN.NS": "Power",
  
  // Telecom
  "BHARTIARTL.NS": "Telecom",
  
  // Consumer Durables
  "TITAN.NS": "Consumer Durables",
  "HAVELLS.NS": "Consumer Durables",
  "VOLTAS.NS": "Consumer Durables",
  
  // New Age Tech
  "ZOMATO.NS": "New Age Tech",
  "NYKAA.NS": "New Age Tech",
  "PAYTM.NS": "New Age Tech",
  
  // Travel & Hospitality
  "INDIGO.NS": "Travel & Hospitality",
  "IRCTC.NS": "Travel & Hospitality",
};

function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1e12) {
    return `₹${(marketCap / 1e12).toFixed(2)} T`;
  } else if (marketCap >= 1e9) {
    return `₹${(marketCap / 1e9).toFixed(2)} B`;
  } else if (marketCap >= 1e7) {
    return `₹${(marketCap / 1e7).toFixed(2)} Cr`;
  } else if (marketCap >= 1e5) {
    return `₹${(marketCap / 1e5).toFixed(2)} L`;
  }
  return `₹${marketCap.toFixed(2)}`;
}

async function fetchStockData(symbol: string, sector: string): Promise<Stock | null> {
  try {
    console.log(`Fetching data for ${symbol}...`);
    
    // Type assertion to help TypeScript understand the quote structure
    const quote = await yahooFinance.quote(symbol) as YahooQuote;

    if (!quote || !quote.regularMarketPrice) {
      console.log(`No data for ${symbol}`);
      return null;
    }

    const displaySymbol = symbol.replace(".NS", "");
    
    return {
      symbol,
      displaySymbol,
      name: quote.longName || quote.shortName || displaySymbol,
      price: quote.regularMarketPrice || 0,
      change: quote.regularMarketChange || 0,
      changePercent: quote.regularMarketChangePercent || 0,
      marketCap: quote.marketCap || 0,
      marketCapFormatted: formatMarketCap(quote.marketCap || 0),
      pe: quote.trailingPE || null,
      pb: quote.priceToBook || null,
      dividendYield: quote.trailingAnnualDividendYield 
        ? quote.trailingAnnualDividendYield * 100 
        : null,
      volume: quote.regularMarketVolume || 0,
      fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh || 0,
      fiftyTwoWeekLow: quote.fiftyTwoWeekLow || 0,
      sector,
    };
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get filter parameters
    const sector = searchParams.get("sector") || "All";
    const minMarketCap = parseFloat(searchParams.get("minMarketCap") || "0") * 1e7; // Convert Cr to actual
    const maxMarketCap = searchParams.get("maxMarketCap") 
      ? parseFloat(searchParams.get("maxMarketCap")!) * 1e7 
      : Infinity;
    const minPE = parseFloat(searchParams.get("minPE") || "0");
    const maxPE = parseFloat(searchParams.get("maxPE") || "Infinity");
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "Infinity");
    const minChange = parseFloat(searchParams.get("minChange") || "-Infinity");
    const maxChange = parseFloat(searchParams.get("maxChange") || "Infinity");
    const minDividendYield = parseFloat(searchParams.get("minDividendYield") || "0");
    const sortBy = searchParams.get("sortBy") || "marketCap";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const limit = parseInt(searchParams.get("limit") || "50");

    console.log("Screener request:", {
      sector,
      minMarketCap,
      maxMarketCap,
      minPE,
      maxPE,
      sortBy,
      sortOrder,
    });

    // Filter stocks by sector
    let stocksToFetch = Object.entries(NSE_STOCKS);
    if (sector !== "All") {
      stocksToFetch = stocksToFetch.filter(([_, s]) => s === sector);
    }

    console.log(`Fetching ${stocksToFetch.length} stocks...`);

    // Fetch all stocks in parallel
    const stockPromises = stocksToFetch.map(([symbol, sector]) =>
      fetchStockData(symbol, sector)
    );
    const stocksData = await Promise.all(stockPromises);

    // Filter out null values and apply filters
    let filteredStocks = stocksData.filter((stock): stock is Stock => {
      if (!stock) return false;
      
      // Apply filters
      if (stock.marketCap < minMarketCap || stock.marketCap > maxMarketCap) return false;
      if (stock.pe !== null && (stock.pe < minPE || stock.pe > maxPE)) return false;
      if (stock.price < minPrice || stock.price > maxPrice) return false;
      if (stock.changePercent < minChange || stock.changePercent > maxChange) return false;
      if (stock.dividendYield !== null && stock.dividendYield < minDividendYield) return false;
      
      return true;
    });

    // Sort stocks
    filteredStocks.sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortBy) {
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "changePercent":
          aValue = a.changePercent;
          bValue = b.changePercent;
          break;
        case "pe":
          aValue = a.pe || Infinity;
          bValue = b.pe || Infinity;
          break;
        case "dividendYield":
          aValue = a.dividendYield || 0;
          bValue = b.dividendYield || 0;
          break;
        case "volume":
          aValue = a.volume;
          bValue = b.volume;
          break;
        case "marketCap":
        default:
          aValue = a.marketCap;
          bValue = b.marketCap;
          break;
      }

      return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
    });

    // Limit results
    const limitedStocks = filteredStocks.slice(0, limit);

    console.log(`Returning ${limitedStocks.length} stocks`);

    return NextResponse.json({
      success: true,
      stocks: limitedStocks,
      total: filteredStocks.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Screener API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch stock data",
        stocks: [],
      },
      { status: 500 }
    );
  }
}