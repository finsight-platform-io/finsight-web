import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";

// Initialize YahooFinance instance for v3
const yahooFinance = new YahooFinance();

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
    const quote = await yahooFinance.quoteSummary(symbol, { 
      modules: ['price', 'summaryDetail', 'defaultKeyStatistics'] 
    }) as any;

    const price = quote?.price;
    const summaryDetail = quote?.summaryDetail;
    const keyStats = quote?.defaultKeyStatistics;

    if (!price || !price.regularMarketPrice) {
      console.log(`No data for ${symbol}`);
      return null;
    }

    const displaySymbol = symbol.replace(".NS", "");
    
    return {
      symbol,
      displaySymbol,
      name: price.longName || price.shortName || displaySymbol,
      price: price.regularMarketPrice || 0,
      change: price.regularMarketChange || 0,
      changePercent: price.regularMarketChangePercent || 0,
      marketCap: price.marketCap || 0,
      marketCapFormatted: formatMarketCap(price.marketCap || 0),
      pe: keyStats?.trailingPE || null,
      pb: keyStats?.priceToBook || null,
      dividendYield: summaryDetail?.dividendYield 
        ? summaryDetail.dividendYield * 100 
        : null,
      volume: price.regularMarketVolume || 0,
      fiftyTwoWeekHigh: summaryDetail?.fiftyTwoWeekHigh || 0,
      fiftyTwoWeekLow: summaryDetail?.fiftyTwoWeekLow || 0,
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
    const minMarketCapParam = searchParams.get("minMarketCap");
    const maxMarketCapParam = searchParams.get("maxMarketCap");
    const minPEParam = searchParams.get("minPE");
    const maxPEParam = searchParams.get("maxPE");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const minChangeParam = searchParams.get("minChange");
    const maxChangeParam = searchParams.get("maxChange");
    const minDividendYieldParam = searchParams.get("minDividendYield");
    
    const minMarketCap = minMarketCapParam ? parseFloat(minMarketCapParam) * 1e7 : null;
    const maxMarketCap = maxMarketCapParam ? parseFloat(maxMarketCapParam) * 1e7 : null;
    const minPE = minPEParam ? parseFloat(minPEParam) : null;
    const maxPE = maxPEParam ? parseFloat(maxPEParam) : null;
    const minPrice = minPriceParam ? parseFloat(minPriceParam) : null;
    const maxPrice = maxPriceParam ? parseFloat(maxPriceParam) : null;
    const minChange = minChangeParam ? parseFloat(minChangeParam) : null;
    const maxChange = maxChangeParam ? parseFloat(maxChangeParam) : null;
    const minDividendYield = minDividendYieldParam ? parseFloat(minDividendYieldParam) : null;
    
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
      
      // Apply filters - only filter if the parameter was provided
      if (minMarketCap !== null && stock.marketCap < minMarketCap) return false;
      if (maxMarketCap !== null && stock.marketCap > maxMarketCap) return false;
      
      // For P/E, only filter if stock has P/E data AND the filter is set
      if (minPE !== null && stock.pe !== null && stock.pe < minPE) return false;
      if (maxPE !== null && stock.pe !== null && stock.pe > maxPE) return false;
      
      if (minPrice !== null && stock.price < minPrice) return false;
      if (maxPrice !== null && stock.price > maxPrice) return false;
      if (minChange !== null && stock.changePercent < minChange) return false;
      if (maxChange !== null && stock.changePercent > maxChange) return false;
      
      // For dividend yield, only filter if stock has dividend data AND the filter is set
      if (minDividendYield !== null && stock.dividendYield !== null && stock.dividendYield < minDividendYield) return false;
      
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
          // Put null values at the end
          if (a.pe === null) return sortOrder === "desc" ? 1 : -1;
          if (b.pe === null) return sortOrder === "desc" ? -1 : 1;
          aValue = a.pe;
          bValue = b.pe;
          break;
        case "dividendYield":
          // Put null values at the end
          if (a.dividendYield === null) return sortOrder === "desc" ? 1 : -1;
          if (b.dividendYield === null) return sortOrder === "desc" ? -1 : 1;
          aValue = a.dividendYield;
          bValue = b.dividendYield;
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