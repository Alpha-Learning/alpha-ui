import { NextResponse } from "next/server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/db";
import { hashPassword } from "@/app/lib/auth";

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = resetPasswordSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { token, password } = parsed.data;

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Invalid or expired reset token. Please request a new one.",
      }, { status: 400 });
    }

    // Check if token is for password reset
    if (decoded.type !== "password-reset") {
      return NextResponse.json({
        success: false,
        message: "Invalid token type",
      }, { status: 400 });
    }

    // Find user and verify they are a regular user (not admin)
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

    // Hash and update password
    const hashed = await hashPassword(password);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });

    console.log(`Password reset successful for user: ${user.email}`);

    return NextResponse.json({
      success: true,
      message: "Password has been reset successfully",
    });

  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}

