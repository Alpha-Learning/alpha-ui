import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/app/lib/db";
import { hashPassword } from "@/app/lib/auth";

const setPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = setPasswordSchema.safeParse(data);
    
    if (!parsed.success) {
      return NextResponse.json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { email, password } = parsed.data;

    // Find user by email
    const user = await prisma.user.findFirst({ where: {  email } });
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

    return NextResponse.json({
      success: true,
      message: "Password set successfully",
    });

  } catch (error) {
    console.error("Set password error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}
