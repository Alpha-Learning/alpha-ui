import { NextResponse } from "next/server";

const ODOO_BASE_URL = process.env.ODOO_BASE_URL || "https://smslive.alpheraacademy.edu.bh";
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
console.log("payload", payload);
const response = await fetch(`${ODOO_BASE_URL}/web/session/authenticate`, {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
    //   method: "call",
      params: {
        service: "common",
        method: "login",
        args: [ODOO_DB, email, password],
      },
    }),
  });
  
  
    console.log("response", response);

    const data = await response.json();
    console.log("data", data);

    if (data.error || !data.result) {
      return NextResponse.json(
        {
          success: false,
          message: data.error?.message || data.error?.data?.message || "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const sessionInfo = data.result;

    return NextResponse.json({
      success: true,
      token: sessionInfo.session_id || sessionInfo.uid || "authenticated",
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
