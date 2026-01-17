# 🔐 Module 2: Google OAuth Authentication - File Setup Guide (NextAuth v5)

**Date:** January 17, 2026  
**NextAuth Version:** v5.0.0-beta.30  
**Next.js Version:** 16.1.2  
**Status:** Ready to implement  
**Time Required:** 10-15 minutes

---

## ⚠️ Important: NextAuth v5 for Next.js 16

This project uses **NextAuth v5 (beta)** because Next.js 16 requires it.
NextAuth v4 only supports Next.js up to version 14.

If you uninstalled NextAuth, reinstall it:
```bash
npm install next-auth@beta
```

---

## 📋 Files to Add/Update

You need to create/update these 5 files:

1. ✅ `.env.local` - Already created (with your credentials)
2. 🆕 `lib/auth.ts` - NEW (Auth configuration)
3. 🆕 `app/api/auth/[...nextauth]/route.ts` - NEW (API route)
4. 🆕 `components/AuthProvider.tsx` - NEW (Session wrapper)
5. 🔄 `components/Header.tsx` - UPDATE (Add Sign In button)
6. 🔄 `app/layout.tsx` - UPDATE (Wrap with AuthProvider)

---

## 🚀 Step-by-Step Instructions

### Step 1: Create `lib` folder and `auth.ts`

**In VS Code:**

1. Create new folder: `lib` (in root, same level as `app/`)
2. Inside `lib/`, create file: `auth.ts`
3. Copy this content:

```typescript
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
```

4. Save (Ctrl + S)

---

### Step 2: Create NextAuth API Route

**In VS Code:**

1. Navigate to `app/api/`
2. Create new folder: `auth`
3. Inside `auth/`, create folder: `[...nextauth]`
4. Inside `[...nextauth]/`, create file: `route.ts`
5. Copy this content:

```typescript
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
```

6. Save (Ctrl + S)

**Final path should be:** `app/api/auth/[...nextauth]/route.ts`

---

### Step 3: Create AuthProvider Component

**In VS Code:**

1. Navigate to `components/`
2. Create new file: `AuthProvider.tsx`
3. Copy this content:

```typescript
"use client";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

4. Save (Ctrl + S)

---

### Step 4: Update Header Component

**In VS Code:**

1. Open existing file: `components/Header.tsx`
2. **REPLACE ALL CONTENT** with this:

```typescript
"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">📈</span>
            <span className="text-xl font-bold text-gray-900">Finsight</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/markets"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Markets
            </Link>
            <Link
              href="/stocks"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Stocks
            </Link>
            <Link
              href="/watchlist"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Watchlist
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Portfolio
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div className="text-gray-500">Loading...</div>
            ) : session?.user ? (
              // User is logged in - show profile dropdown
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-2"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                      {session.user.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {session.user.name}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        signOut();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // User is not logged in - show Sign In button
              <button
                onClick={() => signIn("google")}
                className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
```

3. Save (Ctrl + S)

---

### Step 5: Update Layout

**In VS Code:**

1. Open existing file: `app/layout.tsx`
2. **REPLACE ALL CONTENT** with this:

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finsight - Indian Stock Market Platform",
  description: "Track NSE & BSE stocks, manage portfolio, and stay updated with market trends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
```

3. Save (Ctrl + S)

---

## ✅ Verification Checklist

After adding all files, your project structure should look like:

```
finsight-web/
├── .env.local                              ✅ Already exists
├── lib/
│   └── auth.ts                             🆕 NEW
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts                🆕 NEW
│   └── layout.tsx                          🔄 UPDATED
├── components/
│   ├── AuthProvider.tsx                    🆕 NEW
│   ├── Header.tsx                          🔄 UPDATED
│   └── Footer.tsx                          ✅ Unchanged
└── package.json                            ✅ Already has next-auth
```

---

## 🧪 Test the Authentication

**Step 1: Start Dev Server**

In Git Bash:
```bash
npm run dev
```

**Step 2: Open Browser**

Navigate to: http://localhost:3000

**Step 3: Test Sign In**

1. Click "Sign in with Google" button
2. Select your Google account
3. Authorize Finsight
4. You should be redirected back
5. Header should show your profile picture and name
6. Click profile → See dropdown menu
7. Click "Sign Out" → Should sign you out

---

## 🚨 Troubleshooting

### Issue: "Sign in with Google" button doesn't work

**Check:**
- `.env.local` file exists in root
- All 4 environment variables are filled
- Dev server restarted after creating `.env.local`

**Solution:**
```bash
# Stop server (Ctrl + C)
# Restart server
npm run dev
```

---

### Issue: "Configuration error" when clicking sign in

**Check:**
- `NEXTAUTH_SECRET` is set in `.env.local`
- `GOOGLE_CLIENT_ID` is correct
- `GOOGLE_CLIENT_SECRET` is correct

**Solution:**
- Verify credentials in `.env.local`
- Check Google Cloud Console for correct Client ID/Secret

---

### Issue: Google OAuth error "redirect_uri_mismatch"

**Check:**
- In Google Cloud Console → OAuth Clients
- Authorized redirect URIs should include:
  - `http://localhost:3000/api/auth/callback/google`

**Solution:**
- Add the redirect URI in Google Cloud Console
- Wait 1-2 minutes for changes to propagate

---

### Issue: TypeScript errors

**Solution:**
```bash
# Install type definitions
npm install --save-dev @types/next-auth
```

---

## 🎯 What This Enables

After authentication is working:

✅ Users can sign in with Google
✅ User profile displayed in header
✅ Session persists across page refreshes
✅ Protected routes can check `session`
✅ User info available in components

---

## 🚀 Next Steps After Testing

Once authentication works locally:

1. **Commit and Push:**
   ```bash
   git add .
   git commit -m "feat: add Google OAuth authentication"
   git push
   ```

2. **Update Vercel Environment Variables:**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add all 4 `.env.local` variables
   - Redeploy

3. **Update Google OAuth Redirect URIs:**
   - Add production URL:
   - `https://finsight-web-pi.vercel.app/api/auth/callback/google`

4. **Test Production:**
   - Visit: https://finsight-web-pi.vercel.app
   - Test sign in on production

---

## 📊 Files Summary

| File | Type | Lines | Purpose |
|------|------|-------|---------|
| `lib/auth.ts` | New | ~30 | NextAuth config |
| `app/api/auth/[...nextauth]/route.ts` | New | ~6 | Auth API route |
| `components/AuthProvider.tsx` | New | ~12 | Session wrapper |
| `components/Header.tsx` | Updated | ~120 | Sign in button + dropdown |
| `app/layout.tsx` | Updated | ~35 | Wrap with AuthProvider |

**Total New Lines:** ~200
**Total Files Changed:** 5

---

## ✅ Ready to Code!

Follow the steps above in order. Take your time with each file.

After all files are added:
1. Save all files
2. Start dev server: `npm run dev`
3. Test in browser: http://localhost:3000
4. Click "Sign in with Google"

**Good luck! 🚀**

---

**Created:** January 17, 2026  
**Module:** 2 - Google OAuth Authentication  
**Status:** Ready to implement
