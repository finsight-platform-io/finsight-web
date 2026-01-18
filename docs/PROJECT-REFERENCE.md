# 🚀 Finsight Project - Quick Reference Guide

**Last Updated:** January 19, 2026  
**Developer:** Prasanth Pulipakala  
**Purpose:** Single file to bring Claude up to speed quickly

---

## 📊 PROJECT STATUS SNAPSHOT

### Current State: Module 8 - Advanced Features (COMPLETE ✅)

**Overall Progress: 95% Complete**

| Module | Status | Completion |
|--------|--------|------------|
| 1. Foundation | ✅ Complete | 100% |
| 2. Auth (Google OAuth) | ✅ Complete | 100% |
| 3. Market Data | ✅ Complete | 100% |
| 4. Stock Search | ✅ Complete | 100% |
| 5. Interactive Charts | ✅ Complete | 100% |
| 6. Watchlist | ✅ Complete | 100% |
| 7. Portfolio | ✅ Complete | 100% |
| 8. Advanced Features | ✅ Complete | 100% |
| 9. Polish & Optimization | ⏳ Ready to Start | 0% |

---

## 🗂️ TECH STACK

```
Frontend: Next.js 16.1.2 (App Router)
Language: TypeScript 5.7.2
Styling: TailwindCSS 3.4.17
Auth: NextAuth v5.0.0-beta.30 (Google OAuth)
Database: Neon Postgres (serverless)
ORM: @vercel/postgres
Charts: Recharts 2.15.0
Market Data: yahoo-finance2 3.11.2
Deployment: Vercel
Version Control: GitHub (finsight-platform-io/finsight-web)
```

---

## 📁 PROJECT STRUCTURE

```
finsight-web/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── markets/page.tsx            # Market dashboard
│   ├── stocks/[symbol]/page.tsx    # Stock detail pages
│   ├── watchlist/page.tsx          # User watchlist
│   ├── portfolio/page.tsx          # Portfolio tracker
│   ├── screener/page.tsx           # Stock screener
│   ├── news/page.tsx               # Market news
│   ├── tools/                      # 🆕 COMPLETE - Tools Hub
│   │   ├── page.tsx                # Tools landing page
│   │   ├── calculators/            # ✅ All 6 calculators
│   │   │   ├── sip/page.tsx        
│   │   │   ├── lumpsum/page.tsx    
│   │   │   ├── cagr/page.tsx       
│   │   │   ├── returns/page.tsx    
│   │   │   ├── profit-loss/page.tsx
│   │   │   └── margin/page.tsx     # 🆕 NEW
│   │   ├── calendars/              # ✅ All 5 calendars
│   │   │   ├── holidays/page.tsx   # 🆕 NEW
│   │   │   ├── ipo/page.tsx        # 🆕 NEW
│   │   │   ├── earnings/page.tsx   # 🆕 NEW
│   │   │   ├── dividend/page.tsx   # 🆕 NEW
│   │   │   └── splits/page.tsx     # 🆕 NEW
│   │   └── analysis/               # ✅ All 3 analysis tools
│   │       ├── compare/page.tsx    # 🆕 NEW
│   │       ├── sector-performance/page.tsx # 🆕 NEW
│   │       └── portfolio-analyzer/page.tsx # 🆕 NEW
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── indices/route.ts
│       ├── stocks/
│       │   ├── search/route.ts
│       │   └── [symbol]/
│       │       ├── route.ts
│       │       └── history/route.ts
│       ├── screener/route.ts
│       ├── watchlist/route.ts
│       ├── portfolio/route.ts
│       └── news/route.ts
├── components/
│   ├── Header.tsx                  # 🆕 Updated with new logo
│   ├── Footer.tsx                  
│   ├── AuthProvider.tsx            
│   ├── StockSearch.tsx             
│   ├── StockChart.tsx              
│   ├── AddToWatchlist.tsx          
│   ├── AddHoldingForm.tsx          
│   ├── LiveIndicesTicker.tsx       
│   ├── NewsCarousel.tsx            
│   ├── SignInModal.tsx             
│   └── TopBrokersSection.tsx       
├── public/
│   └── logo.svg                    # 🆕 Finsight SVG logo
├── lib/
│   └── auth.ts                     
└── .env.local
    ├── NEXTAUTH_URL
    ├── NEXTAUTH_SECRET
    ├── GOOGLE_CLIENT_ID
    ├── GOOGLE_CLIENT_SECRET
    ├── DATABASE_URL
    └── POSTGRES_URL
```

---

## 🔑 KEY FEATURES IMPLEMENTED

### ✅ Authentication
- Google OAuth (NextAuth v5)
- Session management
- Protected routes
- User profile dropdown

### ✅ Market Data
- 6 major indices (Nifty 50, Sensex, Bank Nifty, etc.)
- Top gainers/losers
- Live price updates
- Historical data (7 timeframes)

### ✅ Stock Features
- Search (autocomplete)
- Individual stock pages
- Key statistics (P/E, Market Cap, etc.)
- Interactive price charts
- 12 key metrics per stock

### ✅ User Features
- Watchlist (database-backed)
- Portfolio tracker
- Add/remove holdings
- P&L calculations
- Transaction tracking

### ✅ Stock Screener
- Filter by sector, market cap, P/E, price
- Preset screens (Top Gainers, Losers, etc.)
- Sortable columns
- 50+ stocks supported

### ✅ Tools Suite (Module 8 - COMPLETE)

#### **Calculators (6/6 Complete)**
- ✅ SIP Calculator - Calculate SIP returns with charts
- ✅ Lumpsum Calculator - One-time investment calculator
- ✅ CAGR Calculator - Compound annual growth rate
- ✅ Returns Calculator - Profit/loss percentage calculator
- ✅ Profit/Loss Calculator - Stock trading P&L
- ✅ Margin Calculator - Margin requirements (Equity/F&O) 🆕

#### **Market Calendars (5/5 Complete)** 🆕
- ✅ Market Holidays Calendar - NSE/BSE trading holidays (2025-2026)
- ✅ IPO Calendar - Upcoming, ongoing, and listed IPOs
- ✅ Earnings Calendar - Quarterly results announcements
- ✅ Dividend Calendar - Ex-dates and payment schedules
- ✅ Stock Splits Calendar - Split and bonus announcements

#### **Analysis Tools (3/3 Complete)** 🆕
- ✅ Compare Stocks - Side-by-side comparison of 2 stocks
- ✅ Sector Performance - 8 sectors with heatmap view
- ✅ Portfolio Analyzer - Risk & returns analysis with recommendations

---

## 🎨 DESIGN SYSTEM

### Colors
- Primary: Blue (#3b82f6, #1e3a8a)
- Secondary: Orange (#f97316)
- Success: Green (#22c55e, #10b981)
- Error: Red (#ef4444)
- Background: Gray-50 to Gray-900

### Branding
- **Logo:** Custom SVG with hexagon icon + "Finsight" text 🆕
  - Icon: Gradient hexagon (blue to orange) with chart bars and magnifying glass
  - Text: "Fin" in blue, "sight" in orange
  - Usage: Inline SVG in Header component
  - Home icon: House symbol next to logo
- **Color Scheme:** Professional blue/orange gradient theme

### Navigation
- Top: Dark gray (#1f2937) with home icon, logo, search, auth
- Sub-nav: Orange gradient with feature links
- Mobile: Hamburger menu

### Components
- Rounded corners (rounded-lg, rounded-xl)
- Shadows (shadow-sm, shadow-lg)
- Hover effects (scale, color transitions)
- Responsive breakpoints (sm, md, lg, xl)

---

## 📊 DATABASE SCHEMA

### Table: `watchlist`
```sql
CREATE TABLE watchlist (
  id SERIAL PRIMARY KEY,
  user_email TEXT NOT NULL,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  added_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_email, symbol)
);
```

### Table: `portfolio`
```sql
CREATE TABLE portfolio (
  id SERIAL PRIMARY KEY,
  user_email TEXT NOT NULL,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  quantity DECIMAL NOT NULL,
  buy_price DECIMAL NOT NULL,
  buy_date DATE NOT NULL,
  added_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔗 LIVE URLS

- **Production:** https://finsight-web-pi.vercel.app
- **GitHub:** https://github.com/finsight-platform-io/finsight-web
- **Organization:** https://github.com/finsight-platform-io

---

## 🎯 CURRENT MILESTONE

### Module 8: Advanced Features - ✅ COMPLETE (100%)

All three phases completed:

**Phase 1: Calculators** ✅ 100%
- ✅ SIP Calculator
- ✅ Lumpsum Calculator
- ✅ CAGR Calculator
- ✅ Returns Calculator
- ✅ Profit/Loss Calculator
- ✅ Margin Calculator

**Phase 2: Calendars** ✅ 100%
- ✅ Market Holidays (NSE/BSE 2025-2026)
- ✅ IPO Calendar (Upcoming/Ongoing/Listed)
- ✅ Earnings Calendar (This Week/Next Week/Upcoming)
- ✅ Dividend Calendar (Upcoming/Recent)
- ✅ Stock Splits (Upcoming/Recent)

**Phase 3: Analysis Tools** ✅ 100%
- ✅ Compare Stocks (Side-by-side comparison)
- ✅ Sector Performance (8 sectors, 5 timeframes, heatmap)
- ✅ Portfolio Analyzer (Risk metrics, recommendations)

---

## 💡 DEVELOPMENT WORKFLOW

### Local Development
```bash
cd /d/Finsight/finsight-web
npm run dev
# Visit http://localhost:3000
```

### Git Workflow
```bash
git add .
git commit -m "descriptive message"
git push origin main
# Auto-deploys to Vercel
```

### Testing Checklist
- [ ] Works on mobile
- [ ] No console errors
- [ ] Authentication works
- [ ] Data loads correctly
- [ ] Links work
- [ ] Forms submit properly

---

## 🛠 KNOWN ISSUES / NOTES

### Important Notes:
1. **NextAuth v5 (beta)** - Required for Next.js 16
2. **Public repo** - Required for Vercel free tier
3. **Yahoo Finance API** - Free, but rate-limited
4. **Neon Postgres** - Free tier, Singapore region
5. **Session-based auth** - No API tokens stored
6. **Logo SVG** - Inline in Header.tsx for better control
7. **Calendar Data** - Using sample data; real APIs need paid subscriptions
8. **Analysis Tools** - Demo data; can integrate with portfolio API later

### Data Sources:
- **Market Holidays:** Manually updated from NSE/BSE (once yearly)
- **Stock Prices:** Yahoo Finance API (real-time)
- **IPO/Earnings/Dividends:** Sample data (requires paid APIs for real data)
- **Sector Performance:** Sample data (can be calculated from stock data)

### Past Issues (Resolved):
- ✅ NextAuth v4 incompatibility → Upgraded to v5
- ✅ SessionProvider missing → Added AuthProvider
- ✅ Production 404 errors → Added basePath config
- ✅ Vercel caching → Cleared build cache
- ✅ Private repo access → Made public
- ✅ Logo implementation → Custom SVG with inline rendering

---

## 📝 QUICK START FOR NEW SESSION

### To Get Me Up to Speed:
1. Upload this file (PROJECT-REFERENCE.md)
2. Tell me what you want to work on
3. I'll ask for specific files only if needed

### Don't Upload These Every Time:
- ❌ PROGRESS.md (info is here)
- ❌ DEPENDENCIES.md (info is here)
- ❌ GIT_STRATEGY.md (info is here)
- ❌ All component files (only if modifying)

### Do Upload:
- ✅ This PROJECT-REFERENCE.md file
- ✅ Specific files you want to modify
- ✅ Error messages or screenshots

---

## 🎨 TOOL SPECIFICATIONS

### Common Features (All Tools):
- Real-time updates (calculators with sliders)
- Indian currency format (₹, Lakhs, Crores)
- Mobile responsive design
- Gradient backgrounds
- Breadcrumb navigation
- Educational content sections
- SEO optimized
- Consistent styling

### Calculator Details:

**SIP Calculator:**
- Inputs: Monthly amount (₹500-₹1L), Rate (1-30%), Years (1-40)
- Outputs: Total investment, Returns, Final value
- Formula: FV = P × ({[1 + i]^n – 1} / i) × (1 + i)

**Lumpsum Calculator:**
- Inputs: Amount (₹10K-₹1Cr), Rate (1-30%), Years (1-30)
- Outputs: Total investment, Returns, Final value
- Formula: FV = P × (1 + r)^t

**CAGR Calculator:**
- Inputs: Initial value, Final value, Years
- Outputs: CAGR percentage, Total gain
- Formula: CAGR = [(FV / IV)^(1 / Years)] - 1

**Returns Calculator:**
- Inputs: Investment amount, Current value
- Outputs: Absolute return, Percentage, Multiplier
- Auto-detects profit/loss (green/red)

**Margin Calculator:** 🆕
- Trade types: Equity (Intraday/Delivery), Futures, Options
- Inputs: Quantity, Price, Leverage (for intraday)
- Outputs: Margin required, Available leverage, Exposure limit
- Quick presets: ₹1L, ₹5L, ₹10L

### Calendar Details:

**Market Holidays:** 🆕
- 2025 & 2026 NSE/BSE holidays
- Next holiday highlight
- Trading hours information
- Complete list with dates

**IPO Calendar:** 🆕
- Tabs: Upcoming, Ongoing, Recently Listed
- Details: Price range, lot size, issue size, dates
- IPO application guide
- Listing gain tracking

**Earnings Calendar:** 🆕
- Timeframes: This Week, Next Week, Upcoming
- Details: Quarter, estimates, timing (pre/post market)
- What to watch for guide
- Earnings timeline

**Dividend Calendar:** 🆕
- Tabs: Upcoming, Recent
- Details: Amount, yield, ex-date, record date, payment date
- Dividend types (Final, Interim, Special)
- Tax information

**Stock Splits Calendar:** 🆕
- Tabs: Upcoming, Recently Completed
- Split and bonus issues
- Before/after price tracking
- Educational content on splits vs bonus

### Analysis Tools:

**Compare Stocks:** 🆕
- Select any 2 stocks from popular list
- 11 metrics comparison: Price, Market Cap, P/E, P/B, ROE, EPS, Dividend Yield, 52W High/Low, Beta, Sector
- Color-coded (green/red for better/worse)
- Automatic metric interpretation

**Sector Performance:** 🆕
- 8 sectors tracked: IT, Banking, Auto, Pharma, FMCG, Energy, Metals, Telecom
- 5 timeframes: 1D, 1W, 1M, 3M, 1Y
- Top/bottom performer cards
- Heatmap visualization
- Sector rotation education

**Portfolio Analyzer:** 🆕
- Requires login
- Summary: Total value, invested, returns, returns %
- Sector allocation chart with warnings
- Risk metrics: Volatility, Sharpe Ratio, Beta, Diversification
- Individual holdings P&L table
- Personalized recommendations

---

## 🔮 NEXT STEPS (Module 9 - Polish & Optimization)

### Priority Tasks:
1. **Performance Optimization**
   - Code splitting
   - Image optimization
   - Lazy loading
   - Bundle size reduction

2. **SEO Improvements**
   - Meta tags for all pages
   - Structured data
   - Sitemap generation
   - robots.txt

3. **Error Handling**
   - Better error messages
   - Retry mechanisms
   - Fallback UI
   - Loading states

4. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Color contrast

5. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests
   - Performance tests

6. **Documentation**
   - User guide
   - API documentation
   - Component storybook
   - Deployment guide

---

## 🚀 FUTURE ENHANCEMENTS (Post-MVP)

### Phase 4 (Weeks 3-4):
- Price alerts & notifications
- Advanced stock screener filters
- Technical indicators
- Fundamental analysis tools
- Export portfolio to Excel/PDF
- Email reports

### Phase 5 (Month 2):
- Mobile app (React Native)
- Real-time WebSocket data
- AI stock recommendations
- Social features (follow investors)
- Premium subscription (Finsight Pro)
- Real API integrations for calendars

### Phase 6 (Month 3+):
- Options chain analysis
- Futures & Options trading tools
- Backtesting strategies
- Paper trading simulator
- Community features
- Educational courses

---

## 📞 SUPPORT & RESOURCES

### Documentation:
- Next.js: https://nextjs.org/docs
- NextAuth: https://authjs.dev
- TailwindCSS: https://tailwindcss.com/docs
- Recharts: https://recharts.org
- Yahoo Finance: https://www.npmjs.com/package/yahoo-finance2

### Help Needed?
Just tell me:
1. What you're trying to do
2. What's not working (error messages)
3. What you've already tried

---

## ✅ SESSION CHECKLIST

When starting a new chat:
- [ ] Upload only PROJECT-REFERENCE.md
- [ ] State current task/goal
- [ ] Upload specific files if modifying them
- [ ] Mention any errors or blockers

---

## 🎨 LOGO SPECIFICATIONS

### Finsight Logo Details:
- **Type:** Inline SVG in Header.tsx
- **Icon:** Hexagon with gradient outline (blue → orange)
- **Elements:** 
  - 4 chart bars (orange, ascending)
  - Magnifying glass (blue)
  - Upward arrow accent (green)
- **Text:** 
  - "Fin" in blue (#1e3a8a)
  - "sight" in orange (#f97316)
- **ViewBox:** 0 0 400 120
- **Responsive:** w-40 on mobile, w-48 on desktop (md:w-48)
- **Location:** Header.tsx component (inline SVG)
- **Backup:** /public/logo.svg (if needed)

### Header Layout:
```
[Home Icon] [Finsight Logo] ............... [Search] [Auth]
```

---

## 📈 PROJECT STATISTICS

- **Total Pages:** 35+
- **Total Components:** 15+
- **API Routes:** 10+
- **Database Tables:** 2
- **Lines of Code:** ~10,000+
- **Development Time:** 3 weeks
- **Status:** 95% Complete (Ready for Production)

---

**This single file replaces:** PROGRESS.md, DEPENDENCIES.md, GIT_STRATEGY.md, and multiple component uploads!

**Result:** Faster sessions, less token usage, quicker context loading! 🚀

---

**Last Updated:** January 19, 2026  
**Version:** 2.0  
**For:** Quick Claude onboarding in new sessions  
**Recent Changes:** 
- Module 8 marked as COMPLETE (100%)
- Added all 6 calculators (including Margin Calculator)
- Added all 5 calendars (Holidays, IPO, Earnings, Dividend, Splits)
- Added all 3 analysis tools (Compare, Sector, Portfolio)
- Updated logo specifications
- Updated project statistics
- Ready to begin Module 9 (Polish & Optimization)
