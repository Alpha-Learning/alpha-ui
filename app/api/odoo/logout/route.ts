import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const ODOO_BASE_URL = process.env.ODOO_BASE_URL;

    if (!ODOO_BASE_URL) {
      console.error("ODOO_BASE_URL environment variable is not set");
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error",
        },
        { status: 500 }
      );
    }

    // Get session token from request headers or body
    const { sessionToken } = await req.json().catch(() => ({}));
    
    if (!sessionToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Session token is required",
        },
        { status: 400 }
      );
    }

    // Call Odoo logout endpoint
    const response = await fetch(`${ODOO_BASE_URL}/web/session/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `session_id=${sessionToken}`,
      },
    });

    const data = await response.json().catch(() => ({}));

    // Even if Odoo returns an error, we consider logout successful
    // because we'll clear the local session anyway
    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Odoo logout error:", error);
    // Still return success since we'll clear local storage anyway
    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  }
}

