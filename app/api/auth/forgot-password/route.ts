import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/app/lib/db";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "@/app/lib/emailService";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
});

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = forgotPasswordSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { email } = parsed.data;

    // Find user by email - only for regular users, not admins
    const user = await prisma.user.findFirst({
      where: {
        email,
        role: "user", // Only allow password reset for regular users
      },
    });

    // Return error if user doesn't exist
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "No account found with this email address. Please check your email and try again.",
      }, { status: 404 });
    }

    // Generate reset token (expires in 1 hour)
    const resetToken = jwt.sign(
      { email: user.email, id: user.id, type: "password-reset" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send password reset email
    try {
      const emailSent = await sendPasswordResetEmail(user.email, user.name, resetToken);
      if (emailSent) {
        console.log(`Password reset email sent to: ${user.email}`);
        return NextResponse.json({
          success: true,
          message: "Password reset link has been sent to your email address.",
        });
      } else {
        console.error(`Failed to send password reset email to: ${user.email}`);
        return NextResponse.json({
          success: false,
          message: "Failed to send reset email. Please try again later.",
        }, { status: 500 });
      }
    } catch (emailError) {
      console.error("Error sending password reset email:", emailError);
      return NextResponse.json({
        success: false,
        message: "Failed to send reset email. Please try again later.",
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}

