import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create portfolio table
    await sql`
      CREATE TABLE IF NOT EXISTS portfolio (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL,
        symbol VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        quantity DECIMAL(10, 4) NOT NULL,
        buy_price DECIMAL(10, 2) NOT NULL,
        buy_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create index for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_portfolio_user_email 
      ON portfolio(user_email);
    `;

    return NextResponse.json({
      success: true,
      message: "Portfolio table created successfully",
    });
  } catch (error: any) {
    console.error("Portfolio table setup error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to setup portfolio table",
      },
      { status: 500 }
    );
  }
}