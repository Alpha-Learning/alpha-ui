import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticateUser, generateToken } from "@/app/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body", body);
    const parsed = loginSchema.safeParse(body);
    console.log("parsed", parsed);
    if (!parsed.success) {
      return NextResponse.json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { email, password } = parsed.data;

    // Authenticate user against database
    const user = await authenticateUser(email, password);

    console.log("user", user);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials",
      }, { status: 401 });
    }

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
    console.error("Login error:", error);
    console.error("Error stack:", error?.stack);
    console.error("Error details:", {
      message: error?.message,
      name: error?.name,
      cause: error?.cause
    });
    
    // Provide more detailed error message
    const errorMessage = error?.message || 'Internal server error';
    const isDatabaseError = error?.message?.includes('Prisma') || 
                           error?.message?.includes('database') ||
                           error?.code === 'P1001' || // Prisma connection error
                           error?.code === 'P2002';  // Prisma unique constraint
    
    return NextResponse.json({
      success: false,
      message: isDatabaseError 
        ? "Database connection error. Please check your database configuration."
        : `Internal server error: ${errorMessage}`,
      error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    }, { status: 500 });
  }
}
