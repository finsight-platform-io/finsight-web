import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create watchlist table
    await sql`
      CREATE TABLE IF NOT EXISTS watchlist (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL,
        symbol VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_email, symbol)
      );
    `;

    // Create index for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_watchlist_user_email 
      ON watchlist(user_email);
    `;

    return NextResponse.json({
      success: true,
      message: "Watchlist table created successfully",
    });
  } catch (error: any) {
    console.error("Database setup error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to setup database",
      },
      { status: 500 }
    );
  }
}