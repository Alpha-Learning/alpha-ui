import { NextResponse } from "next/server";

const ODOO_BASE_URL = process.env.ODOO_BASE_URL || "https://smslive.alphalearning.me";
const ODOO_DB = process.env.ODOO_DB || "sms_new_db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const payload = {
      jsonrpc: "2.0",
      params: {
        db: ODOO_DB,
        login: email,
        password: password,
      },
    };
    
    const response = await fetch(`${ODOO_BASE_URL}/web/session/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("data", data);

    if (data.error || !data.result) {
      return NextResponse.json(
        {
          success: false,
          message: data.error?.message || data.error?.data?.message || "Invalid credentials",
        },
        { status: 200 }
      );
    }

    const sessionInfo = data.result;
    
    // Odoo uses session_sid (with underscore), not session_id
    const sessionToken = sessionInfo.session_sid || sessionInfo.session_id || sessionInfo.uid || "authenticated";

    return NextResponse.json({
      success: true,
      token: sessionToken,
      message: "Login successful",
      session: sessionInfo,
    });
  } catch (error) {
    console.error("Odoo login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to Odoo server",
      },
      { status: 500 }
    );
  }
}
