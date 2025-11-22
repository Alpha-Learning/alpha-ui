import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Token is required",
      }, { status: 400 });
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Invalid or expired token",
      }, { status: 400 });
    }

    // Check if token is for password reset
    if (decoded.type !== "password-reset") {
      return NextResponse.json({
        success: false,
        message: "Invalid token type",
      }, { status: 400 });
    }

    // Verify user exists and is a regular user (not admin)
    const user = await prisma.user.findFirst({
      where: {
        email: decoded.email,
        id: decoded.id,
        role: "user",
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Token is valid",
    });

  } catch (error) {
    console.error("Validate reset token error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}

