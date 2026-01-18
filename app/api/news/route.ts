import { NextResponse } from "next/server";

// News API Configuration
// Using GNews API (free tier: 100 requests/day)
// Sign up at: https://gnews.io/

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

// In-memory cache
let newsCache: Map<string, { articles: NewsArticle[]; timestamp: number }> = new Map();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes cache

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "indian stock market";
    const max = parseInt(searchParams.get("max") || "10");
    const category = searchParams.get("category") || "";

    // Create cache key
    const cacheKey = `${query}-${max}-${category}`;

    // Check cache first
    const now = Date.now();
    const cached = newsCache.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        articles: cached.articles.slice(0, max),
        totalArticles: cached.articles.length,
        cached: true,
      });
    }

    const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

    if (!GNEWS_API_KEY) {
      // Return fallback/mock data if no API key
      console.warn("GNEWS_API_KEY not configured, using fallback data");
      const fallbackArticles = getFallbackNews(query);
      return NextResponse.json({
        success: true,
        articles: fallbackArticles.slice(0, max),
        totalArticles: fallbackArticles.length,
        fallback: true,
      });
    }

    // Fetch from GNews API
    const apiUrl = new URL("https://gnews.io/api/v4/search");
    apiUrl.searchParams.append("q", query);
    apiUrl.searchParams.append("lang", "en");
    apiUrl.searchParams.append("country", "in"); // India
    apiUrl.searchParams.append("max", Math.min(max, 10).toString()); // GNews max is 10
    apiUrl.searchParams.append("apikey", GNEWS_API_KEY);

    const response = await fetch(apiUrl.toString(), {
      headers: {
        "Accept": "application/json",
      },
      next: { revalidate: 900 }, // Next.js cache for 15 minutes
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GNews API error:", response.status, errorText);
      
      // Return fallback on API error
      const fallbackArticles = getFallbackNews(query);
      return NextResponse.json({
        success: true,
        articles: fallbackArticles.slice(0, max),
        totalArticles: fallbackArticles.length,
        fallback: true,
        apiError: `Status ${response.status}`,
      });
    }

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      const fallbackArticles = getFallbackNews(query);
      return NextResponse.json({
        success: true,
        articles: fallbackArticles.slice(0, max),
        totalArticles: fallbackArticles.length,
        fallback: true,
        reason: "No articles from API",
      });
    }

    // Transform GNews response to our format
    const articles: NewsArticle[] = data.articles.map(
      (article: any, index: number) => ({
        id: `news-${Date.now()}-${index}`,
        title: article.title || "Untitled",
        description: article.description || "",
        content: article.content || "",
        url: article.url || "#",
        image: article.image || getDefaultImage(index),
        publishedAt: article.publishedAt || new Date().toISOString(),
        source: {
          name: article.source?.name || "Unknown Source",
          url: article.source?.url || "",
        },
      })
    );

    // Update cache
    newsCache.set(cacheKey, { articles, timestamp: now });

    // Clean old cache entries (keep only last 20)
    if (newsCache.size > 20) {
      const oldestKey = newsCache.keys().next().value;
      if (oldestKey) newsCache.delete(oldestKey);
    }

    return NextResponse.json({
      success: true,
      articles,
      totalArticles: data.totalArticles || articles.length,
    });
  } catch (error) {
    console.error("News API Error:", error);

    // Return fallback data on any error
    const fallbackArticles = getFallbackNews("indian stock market");
    return NextResponse.json({
      success: true,
      articles: fallbackArticles,
      totalArticles: fallbackArticles.length,
      fallback: true,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// Comprehensive fallback news for Indian markets
function getFallbackNews(query: string): NewsArticle[] {
  const now = new Date();
  const queryLower = query.toLowerCase();

  // Base news articles
  const allNews: NewsArticle[] = [
    {
      id: "fallback-1",
      title: "Sensex, Nifty open higher on strong global cues; IT stocks lead gains",
      description: "Indian benchmark indices opened on a positive note on Monday, tracking firm global markets. The BSE Sensex rose 250 points while Nifty50 crossed the 22,000 mark in early trade.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      publishedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      source: { name: "Economic Times", url: "" },
    },
    {
      id: "fallback-2",
      title: "RBI keeps repo rate unchanged at 6.5%, maintains accommodative stance",
      description: "The Reserve Bank of India's Monetary Policy Committee decided to keep the benchmark repo rate unchanged at 6.5% for the eighth consecutive time, citing inflation concerns.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
      publishedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
      source: { name: "Mint", url: "" },
    },
    {
      id: "fallback-3",
      title: "TCS, Infosys among top gainers as IT sector rallies on US demand outlook",
      description: "Information technology stocks surged on Monday with TCS and Infosys leading the gains after positive commentary on demand recovery in key markets.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      publishedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      source: { name: "Business Standard", url: "" },
    },
    {
      id: "fallback-4",
      title: "FIIs turn net buyers after 3-week selling spree; pump ₹2,500 crore in Indian equities",
      description: "Foreign institutional investors returned as net buyers in the Indian equity market, investing ₹2,500 crore in a single session after weeks of sustained selling.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
      publishedAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
      source: { name: "Moneycontrol", url: "" },
    },
    {
      id: "fallback-5",
      title: "Bank Nifty hits record high; HDFC Bank, ICICI Bank surge on strong Q3 results",
      description: "The Bank Nifty index touched a new all-time high as banking heavyweights reported better-than-expected quarterly earnings, boosting investor sentiment.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
      publishedAt: new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString(),
      source: { name: "Financial Express", url: "" },
    },
    {
      id: "fallback-6",
      title: "Reliance Industries to invest ₹75,000 crore in green energy initiatives",
      description: "Reliance Industries announced plans to invest ₹75,000 crore over the next three years in renewable energy and green hydrogen projects.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
      publishedAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
      source: { name: "NDTV Profit", url: "" },
    },
    {
      id: "fallback-7",
      title: "Gold prices hit ₹62,000/10g as investors seek safe haven amid global uncertainty",
      description: "Gold prices in India touched ₹62,000 per 10 grams as investors flocked to safe-haven assets amid rising geopolitical tensions and global economic uncertainty.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
      publishedAt: new Date(now.getTime() - 14 * 60 * 60 * 1000).toISOString(),
      source: { name: "India Today Business", url: "" },
    },
    {
      id: "fallback-8",
      title: "Rupee gains 15 paise against US dollar on positive domestic cues",
      description: "The Indian rupee appreciated by 15 paise to close at 83.10 against the US dollar, supported by foreign fund inflows and a weaker greenback globally.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&q=80",
      publishedAt: new Date(now.getTime() - 16 * 60 * 60 * 1000).toISOString(),
      source: { name: "Reuters India", url: "" },
    },
    {
      id: "fallback-9",
      title: "IPO market buzzing: Three new issues to open this week worth ₹3,000 crore",
      description: "The primary market continues its strong momentum with three IPOs scheduled to open this week, collectively looking to raise over ₹3,000 crore from investors.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
      publishedAt: new Date(now.getTime() - 20 * 60 * 60 * 1000).toISOString(),
      source: { name: "Zee Business", url: "" },
    },
    {
      id: "fallback-10",
      title: "Auto stocks in focus: Maruti, Tata Motors report strong January sales",
      description: "Automobile companies reported robust sales numbers for January, with market leader Maruti Suzuki and Tata Motors posting double-digit growth.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
      publishedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      source: { name: "CNBC TV18", url: "" },
    },
    {
      id: "fallback-11",
      title: "Crude oil prices ease; analysts expect relief for Indian markets",
      description: "International crude oil prices fell below $80 per barrel, bringing relief to oil-importing nations like India and easing inflation concerns.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
      publishedAt: new Date(now.getTime() - 26 * 60 * 60 * 1000).toISOString(),
      source: { name: "Bloomberg Quint", url: "" },
    },
    {
      id: "fallback-12",
      title: "Mutual fund SIP inflows cross ₹17,000 crore mark in December",
      description: "Systematic Investment Plan inflows into mutual funds crossed the ₹17,000 crore mark in December, reflecting strong retail investor participation in equity markets.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&q=80",
      publishedAt: new Date(now.getTime() - 30 * 60 * 60 * 1000).toISOString(),
      source: { name: "Value Research", url: "" },
    },
  ];

  // Filter based on query keywords
  if (queryLower.includes("economy") || queryLower.includes("rbi") || queryLower.includes("gdp")) {
    return allNews.filter(a => 
      a.title.toLowerCase().includes("rbi") || 
      a.title.toLowerCase().includes("rupee") ||
      a.title.toLowerCase().includes("inflation")
    );
  }
  
  if (queryLower.includes("gold") || queryLower.includes("commodity") || queryLower.includes("crude")) {
    return allNews.filter(a => 
      a.title.toLowerCase().includes("gold") || 
      a.title.toLowerCase().includes("crude") ||
      a.title.toLowerCase().includes("oil")
    );
  }

  if (queryLower.includes("ipo")) {
    return allNews.filter(a => a.title.toLowerCase().includes("ipo"));
  }

  if (queryLower.includes("mutual") || queryLower.includes("sip")) {
    return allNews.filter(a => a.title.toLowerCase().includes("mutual") || a.title.toLowerCase().includes("sip"));
  }

  // Default: return all news
  return allNews;
}

// Default images for articles without images
function getDefaultImage(index: number): string {
  const defaultImages = [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
  ];
  return defaultImages[index % defaultImages.length];
}