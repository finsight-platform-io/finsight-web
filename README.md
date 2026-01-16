# 📈 Finsight

Indian Stock Market Information Platform for NSE & BSE

![Next.js](https://img.shields.io/badge/Next.js-16.1.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

**Live Demo:** [finsight-web-pi.vercel.app](https://finsight-web-pi.vercel.app/)

---

## 🎯 Overview

Finsight is a modern web platform for tracking Indian stock markets (NSE & BSE). Built with Next.js, it provides real-time market data, interactive charts, portfolio tracking, and more.

**Note:** This is an information platform only - not for executing trades.

---

## ✨ Features

- 📊 **Live Market Data** - Real-time NSE & BSE indices and stock prices
- 📈 **Interactive Charts** - TradingView charts with technical indicators
- 💼 **Portfolio Tracking** - Track your investments and P&L
- 👁️ **Watchlists** - Create custom watchlists for stocks
- 🔔 **Price Alerts** - Get notified when stocks hit target prices
- 📰 **Market News** - Latest market news and analysis
- 🔍 **Stock Screener** - Filter stocks by criteria
- 📅 **Market Calendar** - IPO, earnings, and economic events

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.2** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **Shadcn UI** - Accessible component library
- **TradingView Charts** - Professional stock charts

### Backend
- **Next.js API Routes** - Serverless backend functions
- **Vercel Postgres** - Managed PostgreSQL database
- **Upstash Redis** - Serverless caching layer
- **NextAuth.js** - Google OAuth authentication

### Infrastructure
- **Vercel** - Deployment and hosting
- **GitHub** - Version control
- **Auto-deployment** - Push to deploy

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/prasanth-techbite/finsight-web.git

# Navigate to project
cd finsight-web

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure
```
finsight-web/
├── app/                  # Next.js App Router pages
│   ├── page.tsx         # Home page
│   ├── layout.tsx       # Root layout
│   └── api/             # API routes
├── components/          # Reusable React components
│   ├── Header.tsx       # Navigation header
│   └── Footer.tsx       # Footer
├── lib/                 # Utility functions
├── public/              # Static assets
└── package.json         # Dependencies
```

---

## 🗺️ Development Roadmap

### ✅ Phase 1: Foundation (Completed)
- [x] Next.js setup with TypeScript
- [x] TailwindCSS styling
- [x] Header & Footer components
- [x] Professional homepage
- [x] GitHub & Vercel deployment

### 🚧 Phase 2: Authentication (In Progress)
- [ ] Google OAuth integration
- [ ] User profiles
- [ ] Protected routes

### 📋 Phase 3: Market Data (Upcoming)
- [ ] NSE/BSE indices dashboard
- [ ] Real-time price updates (WebSocket)
- [ ] Stock search functionality
- [ ] Stock detail pages

### 📋 Phase 4: Features (Upcoming)
- [ ] Interactive charts (TradingView)
- [ ] Watchlist management
- [ ] Portfolio tracking
- [ ] Price alerts
- [ ] Market news feed

### 📋 Phase 5: Advanced (Future)
- [ ] Stock screener
- [ ] Market calendar
- [ ] Sector analysis
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**Prasanth Pulipakala**
- GitHub: [@prasanth-techbite](https://github.com/prasanth-techbite)
- Email: prasanthpulipakala@gmail.com

---

## 🙏 Acknowledgments

- Market data provided by Yahoo Finance
- Charts powered by TradingView
- UI components from Shadcn UI
- Deployed on Vercel

---

## ⚠️ Disclaimer

This platform is for informational purposes only. It does not provide investment advice or execute trades. Always do your own research and consult with financial advisors before making investment decisions.

---

**Built with ❤️ for Indian stock market enthusiasts**