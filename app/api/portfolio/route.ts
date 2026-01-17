import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// GET - Get user's portfolio
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
      SELECT id, symbol, name, quantity, buy_price, buy_date, created_at, updated_at
      FROM portfolio
      WHERE user_email = ${session.user.email}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      success: true,
      portfolio: rows,
      count: rows.length,
    });
  } catch (error: any) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}

// POST - Add new holding to portfolio
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { symbol, name, quantity, buy_price, buy_date } = await request.json();

    if (!symbol || !name || !quantity || !buy_price || !buy_date) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate quantity and price are positive numbers
    if (quantity <= 0 || buy_price <= 0) {
      return NextResponse.json(
        { success: false, error: "Quantity and price must be positive numbers" },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO portfolio (user_email, symbol, name, quantity, buy_price, buy_date)
      VALUES (${session.user.email}, ${symbol}, ${name}, ${quantity}, ${buy_price}, ${buy_date})
    `;

    return NextResponse.json({
      success: true,
      message: "Holding added to portfolio",
    });
  } catch (error: any) {
    console.error("Error adding to portfolio:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add to portfolio" },
      { status: 500 }
    );
  }
}

// PUT - Update existing holding
export async function PUT(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id, quantity, buy_price, buy_date } = await request.json();

    if (!id || !quantity || !buy_price || !buy_date) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate quantity and price are positive numbers
    if (quantity <= 0 || buy_price <= 0) {
      return NextResponse.json(
        { success: false, error: "Quantity and price must be positive numbers" },
        { status: 400 }
      );
    }

    await sql`
      UPDATE portfolio
      SET quantity = ${quantity}, 
          buy_price = ${buy_price}, 
          buy_date = ${buy_date},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} AND user_email = ${session.user.email}
    `;

    return NextResponse.json({
      success: true,
      message: "Holding updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating portfolio:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update portfolio" },
      { status: 500 }
    );
  }
}

// DELETE - Remove holding from portfolio
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
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Holding ID is required" },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM portfolio
      WHERE id = ${id} AND user_email = ${session.user.email}
    `;

    return NextResponse.json({
      success: true,
      message: "Holding removed from portfolio",
    });
  } catch (error: any) {
    console.error("Error removing from portfolio:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove from portfolio" },
      { status: 500 }
    );
  }
}