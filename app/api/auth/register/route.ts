import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser, generateToken } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";

const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["user", "admin"]).optional().default("user"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { email, password, name, role } = parsed.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User with this email already exists",
      }, { status: 409 });
    }

    // Create new user
    const user = await createUser(email, password, name, role);

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        city: user.city,
        createdAt: user.createdAt
      },
      access_token: token
    });

  } catch (error: any) {
    // Handle Prisma unique constraint error (race condition safety)
    if (error && (error.code === 'P2002' || error?.meta?.target?.includes?.('email'))) {
      return NextResponse.json({
        success: false,
        message: "Email already registered",
      }, { status: 409 });
    }

    console.error("Registration error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}
