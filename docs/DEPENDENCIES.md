# 📦 Dependencies & Installations Tracker - Finsight

**Project:** Finsight Web Application  
**Last Updated:** January 17, 2026

---

## 📋 Core Dependencies (Installed at Project Creation)

### Initial Setup - Day 1 (Jan 16, 2026)

**Command:**
```bash
npx create-next-app@latest finsight-web --typescript --tailwind --app
```

**Auto-installed packages (356 total):**

| Package | Version | Purpose | Category |
|---------|---------|---------|----------|
| **next** | 16.1.2 | React framework, routing, SSR | Framework |
| **react** | 19.0.0 | UI library | Core |
| **react-dom** | 19.0.0 | React rendering for web | Core |
| **typescript** | 5.7.2 | Type-safe JavaScript | Language |
| **@types/node** | Latest | TypeScript types for Node.js | Types |
| **@types/react** | Latest | TypeScript types for React | Types |
| **@types/react-dom** | Latest | TypeScript types for React DOM | Types |
| **tailwindcss** | 3.4.17 | Utility-first CSS framework | Styling |
| **postcss** | 8.4.49 | CSS processing (for Tailwind) | Build Tool |
| **autoprefixer** | 10.4.20 | CSS vendor prefixes | Build Tool |
| **eslint** | 9.17.0 | Code linting | Dev Tools |
| **eslint-config-next** | 16.1.2 | ESLint config for Next.js | Dev Tools |

---

## 🔐 Authentication Dependencies - Day 2 (Jan 17, 2026)

### Module 2: Google OAuth

**Installation Date:** January 17, 2026

**Commands:**
```bash
npm install next-auth@beta
npm install @auth/core
```

**Packages Installed:**

| Package | Version | Purpose | Why We Need It |
|---------|---------|---------|----------------|
| **next-auth** | 5.0.0-beta.25 | Authentication library | Handles OAuth, sessions, JWT |
| **@auth/core** | 0.40.0 | Core authentication logic | Required by NextAuth v5 |
| **oauth4webapi** | ~3.1.4 | OAuth 2.0 client | Google OAuth protocol |
| **@panva/hkdf** | ~1.2.1 | Key derivation | Secure session keys |
| **jose** | ~5.9.6 | JWT operations | Token creation & validation |
| **preact** | ~10.11.3 | Lightweight React alternative | NextAuth internal use |
| **preact-render-to-string** | ~6.5.11 | SSR for Preact | NextAuth internal use |

**Total new dependencies:** ~7 packages

**Why NextAuth v5 (beta)?**
- ✅ Best compatibility with Next.js 15/16
- ✅ App Router support
- ✅ Improved TypeScript support
- ✅ Better performance
- ✅ Simpler API

---

## 🎨 UI Component Dependencies (Future)

### Planned Installation - Week 1-2

**Shadcn UI (Component Library):**
```bash
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add dropdown-menu
npx shadcn@latest add dialog
npx shadcn@latest add card
```

**Packages that will be installed:**
- `@radix-ui/react-*` - Accessible UI primitives
- `class-variance-authority` - Styling utilities
- `clsx` - Conditional classes
- `tailwind-merge` - Merge Tailwind classes

**Status:** Not yet installed ⏳

---

## 📊 Data Fetching Dependencies (Future)

### Planned Installation - Module 3

**React Query (TanStack Query):**
```bash
npm install @tanstack/react-query
```

**Packages:**
- `@tanstack/react-query` - Data fetching & caching
- `@tanstack/react-query-devtools` - Debug tools (dev only)

**Status:** Not yet installed ⏳

---

## 🗄️ Database Dependencies (Future)

### Planned Installation - Module 3

**Vercel Postgres:**
```bash
npm install @vercel/postgres
```

**OR Prisma (Alternative):**
```bash
npm install prisma @prisma/client
npx prisma init
```

**Status:** Not yet installed ⏳

---

## 💾 Caching Dependencies (Future)

### Planned Installation - Module 3

**Upstash Redis:**
```bash
npm install @upstash/redis
```

**Status:** Not yet installed ⏳

---

## 📈 Chart Dependencies (Future)

### Planned Installation - Module 5

**TradingView Lightweight Charts:**
```bash
npm install lightweight-charts
```

**Recharts (for simple charts):**
```bash
npm install recharts
```

**Status:** Not yet installed ⏳

---

## 🎯 State Management (Future)

### Planned Installation - Module 3-4

**Zustand (recommended):**
```bash
npm install zustand
```

**OR Redux Toolkit (if complex state needed):**
```bash
npm install @reduxjs/toolkit react-redux
```

**Status:** Not yet installed ⏳

---

## 🔧 Utility Dependencies (Future)

### Date Handling
```bash
npm install date-fns
# OR
npm install dayjs
```

### Form Handling
```bash
npm install react-hook-form
npm install zod  # for validation
```

### Icons
```bash
npm install lucide-react
```

**Status:** Not yet installed ⏳

---

## 📦 Current Package.json Overview

**Location:** `/d/Finsight/finsight-web/package.json`

**Current dependencies:**
```json
{
  "dependencies": {
    "next": "16.1.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-auth": "^5.0.0-beta.25",
    "@auth/core": "^0.40.0"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "eslint": "^9",
    "eslint-config-next": "16.1.2",
    "tailwindcss": "^3.4.1",
    "postcss": "^8",
    "autoprefixer": "^10.0.1"
  }
}
```

**Total packages installed:** ~363 (including dependencies of dependencies)

---

## 🎯 Installation Commands History

### Day 1 - January 16, 2026
```bash
# Project creation
npx create-next-app@latest finsight-web --typescript --tailwind --app
# Result: 356 packages installed
```

### Day 2 - January 17, 2026
```bash
# Authentication
npm install next-auth@beta @auth/core
# Result: +7 packages
```

---

## 📊 Package Statistics

| Category | Packages | Status |
|----------|----------|--------|
| **Core (Next.js, React, TS)** | ~350 | ✅ Installed |
| **Authentication** | ~7 | ✅ Installed |
| **UI Components** | 0 | ⏳ Planned |
| **Data Fetching** | 0 | ⏳ Planned |
| **Database** | 0 | ⏳ Planned |
| **Charts** | 0 | ⏳ Planned |
| **State Management** | 0 | ⏳ Planned |
| **Utilities** | 0 | ⏳ Planned |

**Total Current:** ~363 packages  
**Total Planned:** ~400+ packages (by MVP completion)

---

## 🔍 How to Check Installed Packages

### View all dependencies:
```bash
npm list --depth=0
```

### View specific package version:
```bash
npm list next-auth
```

### View outdated packages:
```bash
npm outdated
```

### View package info:
```bash
npm info next-auth
```

---

## 📝 Before Installing New Packages

**Checklist:**
- [ ] Check if package is needed
- [ ] Check package popularity (npmjs.com)
- [ ] Check last update date
- [ ] Check bundle size (bundlephobia.com)
- [ ] Add to this tracker document
- [ ] Update PROGRESS.md

---

## ⚠️ Package Management Best Practices

### Do's ✅
- Install exact versions for production dependencies
- Keep packages up to date (monthly check)
- Read package documentation before installing
- Check package license (MIT, Apache preferred)
- Review bundle size impact

### Don'ts ❌
- Don't install packages you don't understand
- Don't install too many packages (keep it minimal)
- Don't ignore security warnings
- Don't commit node_modules to Git (in .gitignore)
- Don't mix package managers (stick with npm)

---

## 🔄 Update Strategy

### How to Update Packages

**Check for updates:**
```bash
npm outdated
```

**Update specific package:**
```bash
npm update next-auth
```

**Update all packages (careful!):**
```bash
npm update
```

**Update to latest major version:**
```bash
npm install next-auth@latest
```

### When to Update

**Immediately:**
- Security vulnerabilities
- Critical bug fixes

**Regularly (Monthly):**
- Minor version updates
- Patch updates

**Carefully (With testing):**
- Major version updates
- Breaking changes

---

## 🚨 Troubleshooting

### "Package not found"
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "Version conflicts"
```bash
# Check for conflicts
npm ls

# Install with legacy peer deps
npm install --legacy-peer-deps
```

### "npm ERR!"
```bash
# Check npm version
npm --version

# Update npm
npm install -g npm@latest

# Try again
npm install
```

---

## 📚 Package Documentation Links

### Core
- **Next.js:** https://nextjs.org/docs
- **React:** https://react.dev/
- **TypeScript:** https://www.typescriptlang.org/docs/
- **TailwindCSS:** https://tailwindcss.com/docs

### Authentication
- **NextAuth.js:** https://authjs.dev/
- **Google OAuth:** https://developers.google.com/identity/protocols/oauth2

### Future Dependencies
- **TanStack Query:** https://tanstack.com/query/latest
- **Zustand:** https://zustand-demo.pmnd.rs/
- **Prisma:** https://www.prisma.io/docs/
- **TradingView Charts:** https://tradingview.github.io/lightweight-charts/

---

## 🎯 Installation Tracking Template

**When installing new packages, add here:**

```markdown
### [Module Name] - [Date]

**Command:**
```bash
npm install package-name
```

**Packages Installed:**
- package-name (version) - Purpose

**Why we need it:**
- Reason 1
- Reason 2

**Alternatives considered:**
- Alternative 1 (why not chosen)
- Alternative 2 (why not chosen)
```

---

## 📊 Size Impact

**Current bundle size:** ~500 KB (estimated)

**After all packages:** ~2-3 MB (estimated)

**Monitor with:**
```bash
npm run build
# Check .next folder size
```

---

## ✅ Current Installation Status

**Last Updated:** January 17, 2026, 10:30 AM

**Installed Today:**
- ✅ next-auth@beta
- ✅ @auth/core

**Next to Install:**
- ⏳ Database client (Module 3)
- ⏳ React Query (Module 3)
- ⏳ Charts library (Module 5)
- ⏳ Shadcn UI components (as needed)

---
## New Dependencies Added (Modules 3-5):

### Module 3: Market Data
```json
"yahoo-finance2": "^3.11.2"
```
**Purpose:** Fetch live stock market data from Yahoo Finance
**Usage:** Market indices, stock quotes, historical data
**Installation:** `npm install yahoo-finance2`

### Module 5: Interactive Charts
```json
"recharts": "^2.15.0"
```
**Purpose:** Interactive data visualization and charts
**Usage:** Stock price charts with multiple timeframes
**Installation:** `npm install recharts`

### Module 5: Advanced Charts (Attempted but not used)
```json
"lightweight-charts": "^4.2.1"
```
**Status:** Installed but replaced with Recharts
**Reason:** Compatibility issues, Recharts simpler for MVP
**Note:** Can be removed or kept for future professional charts

---

## Updated Package Count:
- **Total Dependencies:** ~360 packages
- **Direct Dependencies:** ~15 packages
- **Key Additions:** yahoo-finance2, recharts


# DEPENDENCIES UPDATE - Module 6

Add this to your DEPENDENCIES.md file:

---

## Module 6: Watchlist (Database Integration)

### New Package Added:
```json
"@vercel/postgres": "^0.10.0"
```

**Purpose:** Serverless Postgres client for Vercel  
**Usage:** Database operations for watchlist feature  
**Database:** Neon Postgres (serverless)  
**Installation:** `npm install @vercel/postgres`

**Key Features:**
- Serverless-optimized
- Connection pooling
- SQL template literals
- TypeScript support
- Works with Neon, Vercel Postgres

**Example Usage:**
```typescript
import { sql } from "@vercel/postgres";

const { rows } = await sql`
  SELECT * FROM watchlist 
  WHERE user_email = ${email}
`;
```

---

## Updated Package Count:
- **Total Dependencies:** ~360 packages
- **Direct Dependencies:** ~16 packages
- **Key Additions:** 
  - Module 3: yahoo-finance2
  - Module 5: recharts
  - Module 6: @vercel/postgres

---

## Environment Variables Added:

### Local (.env.local):
```env
# Database (Neon Postgres)
DATABASE_URL=postgresql://...
POSTGRES_URL=postgresql://...
```

### Production (Vercel):
```
DATABASE_URL (added via Vercel dashboard)
POSTGRES_URL (added via Vercel dashboard)
```

---

## Database Information:

**Provider:** Neon  
**Type:** Serverless Postgres  
**Plan:** Free tier  
**Region:** Asia Pacific (Singapore)  
**Connection:** Pooled  
**Tables:** 1 (watchlist)

---

**Total npm packages:** 360  
**Database:** Neon Postgres  
**Storage:** Serverless


**Keep this document updated after each installation!** 📦✨