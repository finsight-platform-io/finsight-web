import { NextResponse } from "next/server";

// NewsAPI Configuration
// Free tier: 100 requests/day
// Sign up at: https://newsapi.org/

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
    const query = searchParams.get("q") || "stock market";
    const max = parseInt(searchParams.get("max") || "10");

    // Create cache key
    const cacheKey = `${query}-${max}`;

    // Check cache first
    const now = Date.now();
    const cached = newsCache.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      console.log("📦 Serving cached news for:", query);
      return NextResponse.json({
        success: true,
        articles: cached.articles.slice(0, max),
        totalArticles: cached.articles.length,
        cached: true,
      });
    }

    const NEWS_API_KEY = process.env.NEWS_API_KEY;

    console.log("🔑 API Key present:", !!NEWS_API_KEY);
    console.log("🔍 Original query:", query);

    if (!NEWS_API_KEY) {
      console.warn("⚠️ NEWS_API_KEY not configured, using fallback data");
      const fallbackArticles = getFallbackNews(query);
      return NextResponse.json({
        success: true,
        articles: fallbackArticles.slice(0, max),
        totalArticles: fallbackArticles.length,
        fallback: true,
        message: "Using fallback data - Please add NEWS_API_KEY to environment variables",
      });
    }

    // Detect category and get optimized query
    const category = detectCategory(query);
    const optimizedQuery = getOptimizedQuery(category);
    
    console.log("🎯 Detected category:", category);
    console.log("🎯 Optimized query:", optimizedQuery);

    const apiUrl = new URL("https://newsapi.org/v2/everything");
    apiUrl.searchParams.append("q", optimizedQuery);
    apiUrl.searchParams.append("language", "en");
    apiUrl.searchParams.append("sortBy", "publishedAt");
    apiUrl.searchParams.append("pageSize", "100");
    apiUrl.searchParams.append("apiKey", NEWS_API_KEY);

    console.log("🌐 Fetching from NewsAPI...");

    const response = await fetch(apiUrl.toString(), {
      headers: {
        "Accept": "application/json",
      },
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ NewsAPI error:", response.status, errorText);
      
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

    if (data.status !== "ok" || !data.articles || data.articles.length === 0) {
      console.warn("⚠️ No articles from API, using fallback");
      const fallbackArticles = getFallbackNews(query);
      return NextResponse.json({
        success: true,
        articles: fallbackArticles.slice(0, max),
        totalArticles: fallbackArticles.length,
        fallback: true,
        reason: "No articles from API",
      });
    }

    // Transform and filter NewsAPI response with STRICT category filtering
    const articles: NewsArticle[] = data.articles
      .filter((article: any) => {
        // Basic quality filters
        const isValid = (
          article.title !== "[Removed]" &&
          article.description !== "[Removed]" &&
          article.urlToImage &&
          article.url &&
          article.title &&
          article.description &&
          !article.title.toLowerCase().includes("removed")
        );

        if (!isValid) return false;

        // STRICT category-specific filtering
        return isStrictlyRelevant(article, category);
      })
      .map((article: any, index: number) => ({
        id: `news-${Date.now()}-${index}`,
        title: article.title,
        description: article.description,
        content: article.content || article.description,
        url: article.url,
        image: article.urlToImage,
        publishedAt: article.publishedAt,
        source: {
          name: article.source?.name || "Unknown Source",
          url: article.url,
        },
      }))
      .slice(0, Math.min(max * 2, 50));

    console.log(`✅ Fetched ${articles.length} articles from API for category: ${category}`);

    // If we got very few articles, supplement with category-specific fallback
    if (articles.length < 5) {
      console.log("⚠️ Few articles from API, adding fallback articles");
      const fallbackArticles = getFallbackNews(query);
      const combined = [...articles, ...fallbackArticles].slice(0, max);
      
      newsCache.set(cacheKey, { articles: combined, timestamp: now });
      
      return NextResponse.json({
        success: true,
        articles: combined,
        totalArticles: combined.length,
        mixed: true,
        category: category,
      });
    }

    // Update cache
    newsCache.set(cacheKey, { articles, timestamp: now });

    // Clean old cache entries
    if (newsCache.size > 20) {
      const oldestKey = newsCache.keys().next().value;
      if (oldestKey) newsCache.delete(oldestKey);
    }

    return NextResponse.json({
      success: true,
      articles: articles.slice(0, max),
      totalArticles: data.totalResults || articles.length,
      live: true,
      category: category,
    });
  } catch (error) {
    console.error("💥 News API Error:", error);

    const fallbackArticles = getFallbackNews("stock market");
    return NextResponse.json({
      success: true,
      articles: fallbackArticles,
      totalArticles: fallbackArticles.length,
      fallback: true,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// Detect category from query
function detectCategory(query: string): string {
  const queryLower = query.toLowerCase();

  if (queryLower.includes("mutual") || queryLower.includes("sip")) return "mutual-funds";
  if (queryLower.includes("crypto") || queryLower.includes("bitcoin")) return "cryptocurrency";
  if (queryLower.includes("commodity") || queryLower.includes("gold")) return "commodities";
  if (queryLower.includes("forex") || queryLower.includes("rupee") || queryLower.includes("currency")) return "forex";
  if (queryLower.includes("economy") || queryLower.includes("rbi") || queryLower.includes("gdp")) return "economy";
  
  return "stock-market";
}

// Get optimized query for each category
function getOptimizedQuery(category: string): string {
  const queries: { [key: string]: string } = {
    "stock-market": "nifty OR sensex OR \"stock market\" OR BSE OR NSE",
    "economy": "\"reserve bank india\" OR RBI OR \"GDP growth\" OR inflation OR \"economic policy\"",
    "commodities": "\"gold price\" OR \"silver price\" OR \"crude oil\" OR commodity",
    "cryptocurrency": "bitcoin OR ethereum OR cryptocurrency OR blockchain OR \"crypto regulation\"",
    "forex": "\"indian rupee\" OR \"currency exchange\" OR forex OR \"dollar rupee\"",
    "mutual-funds": "\"mutual fund\" OR SIP OR \"systematic investment\" OR \"fund manager\" OR \"fund performance\"",
  };

  return queries[category] || queries["stock-market"];
}

// STRICT relevance check - ensures articles truly belong to the category
function isStrictlyRelevant(article: any, category: string): boolean {
  const title = article.title?.toLowerCase() || "";
  const desc = article.description?.toLowerCase() || "";
  const combined = `${title} ${desc}`;

  // Define MUST-HAVE and MUST-NOT-HAVE keywords for each category
  const categoryRules: { [key: string]: { mustHave: string[], mustNotHave: string[] } } = {
    "mutual-funds": {
      mustHave: ["mutual", "sip", "fund", "amc", "nav", "scheme"],
      mustNotHave: ["nifty", "sensex", "stock price", "bitcoin", "crypto", "gold price", "crude"]
    },
    "cryptocurrency": {
      mustHave: ["bitcoin", "crypto", "ethereum", "blockchain", "btc", "eth"],
      mustNotHave: ["mutual fund", "sip", "nifty", "sensex", "gold price", "crude oil"]
    },
    "commodities": {
      mustHave: ["gold", "silver", "crude", "oil", "commodity", "metal"],
      mustNotHave: ["bitcoin", "crypto", "mutual fund", "sip", "nifty", "sensex"]
    },
    "forex": {
      mustHave: ["rupee", "dollar", "forex", "currency", "exchange rate", "inr", "usd"],
      mustNotHave: ["bitcoin", "crypto", "mutual fund", "gold price", "crude oil"]
    },
    "economy": {
      mustHave: ["rbi", "reserve bank", "gdp", "inflation", "economic", "policy", "growth rate"],
      mustNotHave: ["bitcoin", "crypto", "mutual fund sip"]
    },
    "stock-market": {
      mustHave: ["nifty", "sensex", "bse", "nse", "stock", "share", "equity", "market"],
      mustNotHave: ["bitcoin", "crypto", "mutual fund sip", "gold price", "crude oil"]
    }
  };

  const rules = categoryRules[category] || categoryRules["stock-market"];

  // Check MUST-HAVE: At least one keyword must be present
  const hasMustHave = rules.mustHave.some(keyword => combined.includes(keyword));
  
  // Check MUST-NOT-HAVE: None of these keywords should be present
  const hasMustNotHave = rules.mustNotHave.some(keyword => combined.includes(keyword));

  return hasMustHave && !hasMustNotHave;
}

// Enhanced fallback news with category-specific articles
function getFallbackNews(query: string): NewsArticle[] {
  const now = new Date();
  const category = detectCategory(query);

  // Stock Market specific news
  const stockMarketNews: NewsArticle[] = [
    {
      id: "stock-1",
      title: "Sensex surges 500 points, Nifty tops 22,200 on broad-based buying",
      description: "Indian equity benchmarks rallied sharply with the BSE Sensex jumping 500 points and Nifty50 crossing 22,200 level amid strong global cues and sustained FII buying.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      publishedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      source: { name: "Moneycontrol", url: "" },
    },
    {
      id: "stock-2",
      title: "IT stocks lead gains: TCS, Infosys, Wipro up 3-5% on strong Q4 outlook",
      description: "Information technology stocks were the top gainers with TCS, Infosys, and Wipro surging 3-5% on improved demand outlook from the US and Europe markets.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      publishedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
      source: { name: "ET Markets", url: "" },
    },
    {
      id: "stock-3",
      title: "Bank Nifty hits fresh record high led by HDFC Bank, ICICI Bank rally",
      description: "The Bank Nifty index scaled a new all-time high as banking majors HDFC Bank and ICICI Bank rallied on strong quarterly earnings and asset quality improvement.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
      publishedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
      source: { name: "Financial Express", url: "" },
    },
  ];

  // Mutual Fund specific news (COMPLETELY DIFFERENT from stock market)
  const mutualFundNews: NewsArticle[] = [
    {
      id: "mf-1",
      title: "SIP contributions hit record ₹18,500 crore in January 2025",
      description: "Systematic Investment Plan contributions through mutual funds reached an all-time high of ₹18,500 crore in January, reflecting strong retail investor confidence in equity schemes.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&q=80",
      publishedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      source: { name: "Value Research", url: "" },
    },
    {
      id: "mf-2",
      title: "Top 10 mutual fund schemes that gave over 30% returns in 2024",
      description: "Several mid-cap and small-cap mutual fund schemes delivered stellar returns of over 30% in 2024, outperforming benchmark indices by a wide margin.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80",
      publishedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      source: { name: "ET Mutual Funds", url: "" },
    },
    {
      id: "mf-3",
      title: "SEBI proposes new rules for passive funds and index ETFs",
      description: "Capital markets regulator SEBI has proposed new regulations for passive mutual funds and exchange-traded funds to enhance transparency and protect investor interests.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
      publishedAt: new Date(now.getTime() - 7 * 60 * 60 * 1000).toISOString(),
      source: { name: "Mint Money", url: "" },
    },
  ];

  // Economy news
  const economyNews: NewsArticle[] = [
    {
      id: "economy-1",
      title: "RBI maintains repo rate at 6.5%, focuses on inflation management",
      description: "The Reserve Bank of India's Monetary Policy Committee kept the benchmark repo rate unchanged at 6.5%, prioritizing inflation control over growth stimulus in current scenario.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
      publishedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      source: { name: "Economic Times", url: "" },
    },
    {
      id: "economy-2",
      title: "India's GDP growth projected at 7.2% for FY2025: Finance Ministry",
      description: "The Finance Ministry projects India's GDP growth at 7.2% for the current fiscal year, supported by strong domestic consumption and investment demand.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      publishedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      source: { name: "Mint", url: "" },
    },
    {
      id: "economy-3",
      title: "Inflation eases to 4.8% in January, within RBI comfort zone",
      description: "India's retail inflation cooled to 4.8% in January from 5.2% in December, coming within RBI's comfort zone of 2-6%, driven by lower food prices.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
      publishedAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
      source: { name: "Business Standard", url: "" },
    },
  ];

  // Commodity news
  const commodityNews: NewsArticle[] = [
    {
      id: "commodity-1",
      title: "Gold prices surge to ₹63,500 per 10 grams on safe-haven demand",
      description: "Gold prices in India jumped to ₹63,500 per 10 grams as investors sought safety amid global economic uncertainties and geopolitical tensions in Middle East.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
      publishedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      source: { name: "Gold Price Today", url: "" },
    },
    {
      id: "commodity-2",
      title: "Crude oil falls below $78 per barrel, relief for India's import bill",
      description: "International crude oil prices declined below $78 per barrel, bringing significant relief to oil-importing nations like India and easing inflation pressures.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
      publishedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      source: { name: "Bloomberg Commodities", url: "" },
    },
    {
      id: "commodity-3",
      title: "Silver prices touch ₹75,000/kg on industrial demand surge",
      description: "Silver prices in India reached ₹75,000 per kilogram driven by increased industrial demand from electronics and solar panel sectors.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1609429019995-8c40f49535a5?w=800&q=80",
      publishedAt: new Date(now.getTime() - 7 * 60 * 60 * 1000).toISOString(),
      source: { name: "Commodity News", url: "" },
    },
  ];

  // Cryptocurrency news
  const cryptoNews: NewsArticle[] = [
    {
      id: "crypto-1",
      title: "Bitcoin crosses $45,000 as institutional adoption grows globally",
      description: "Bitcoin surged past $45,000 mark driven by increasing institutional adoption and positive regulatory developments in major markets including the US and Europe.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
      publishedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      source: { name: "CoinDesk", url: "" },
    },
    {
      id: "crypto-2",
      title: "India considers framework for cryptocurrency regulation: Finance Ministry",
      description: "The Finance Ministry is working on a comprehensive framework for cryptocurrency regulation, focusing on investor protection and maintaining financial stability.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      publishedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      source: { name: "Economic Times Crypto", url: "" },
    },
    {
      id: "crypto-3",
      title: "Ethereum gains 8% as network upgrade improves transaction speeds",
      description: "Ethereum rallied 8% following successful network upgrade that significantly improved transaction processing speeds and reduced gas fees for users.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&q=80",
      publishedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
      source: { name: "CryptoNews India", url: "" },
    },
  ];

  // Forex news
  const forexNews: NewsArticle[] = [
    {
      id: "forex-1",
      title: "Rupee appreciates to 82.95 vs dollar on strong capital inflows",
      description: "The Indian rupee strengthened to 82.95 against the US dollar, supported by robust foreign portfolio investments and softening crude oil prices.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&q=80",
      publishedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      source: { name: "Reuters India", url: "" },
    },
    {
      id: "forex-2",
      title: "Dollar index weakens as Fed signals pause in rate hikes",
      description: "The US dollar index fell to 103.5 as Federal Reserve officials hinted at a potential pause in interest rate increases amid cooling inflation.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      publishedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      source: { name: "Forex Live", url: "" },
    },
    {
      id: "forex-3",
      title: "RBI intervenes to curb rupee volatility amid global uncertainty",
      description: "The Reserve Bank of India stepped in to manage rupee volatility, with the currency trading in a tight range of 83.00-83.20 against the dollar.",
      content: "",
      url: "#",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
      publishedAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
      source: { name: "Mint Forex", url: "" },
    },
  ];

  // Return category-specific news
  const categoryNews: { [key: string]: NewsArticle[] } = {
    "stock-market": stockMarketNews,
    "mutual-funds": mutualFundNews,
    "economy": economyNews,
    "commodities": commodityNews,
    "cryptocurrency": cryptoNews,
    "forex": forexNews,
  };

  return categoryNews[category] || stockMarketNews;
}