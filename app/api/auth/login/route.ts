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

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}
