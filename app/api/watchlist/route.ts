import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// GET - Get user's watchlist
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { rows } = await sql`
      SELECT id, symbol, name, added_at
      FROM watchlist
      WHERE user_email = ${session.user.email}
      ORDER BY added_at DESC
    `;

    return NextResponse.json({
      success: true,
      watchlist: rows,
      count: rows.length,
    });
  } catch (error: any) {
    console.error("Error fetching watchlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch watchlist" },
      { status: 500 }
    );
  }
}

// POST - Add stock to watchlist
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { symbol, name } = await request.json();

    if (!symbol || !name) {
      return NextResponse.json(
        { success: false, error: "Symbol and name are required" },
        { status: 400 }
      );
    }

    // Insert or ignore if already exists
    await sql`
      INSERT INTO watchlist (user_email, symbol, name)
      VALUES (${session.user.email}, ${symbol}, ${name})
      ON CONFLICT (user_email, symbol) DO NOTHING
    `;

    return NextResponse.json({
      success: true,
      message: "Stock added to watchlist",
    });
  } catch (error: any) {
    console.error("Error adding to watchlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add to watchlist" },
      { status: 500 }
    );
  }
}

// DELETE - Remove stock from watchlist
export async function DELETE(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get("symbol");

    if (!symbol) {
      return NextResponse.json(
        { success: false, error: "Symbol is required" },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM watchlist
      WHERE user_email = ${session.user.email}
      AND symbol = ${symbol}
    `;

    return NextResponse.json({
      success: true,
      message: "Stock removed from watchlist",
    });
  } catch (error: any) {
    console.error("Error removing from watchlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove from watchlist" },
      { status: 500 }
    );
  }
}