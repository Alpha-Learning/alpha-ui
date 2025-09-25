import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["parent", "admin"], "Invalid role"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { email, password, role } = parsed.data;

    // Mock authentication - in real app, validate against database
    if (email && password) {
      const mockUser = {
        id: "1",
        name: role === "parent" ? "John Parent" : "Admin User",
        email,
        role,
        avatar: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
        isActive: true,
      };

      const mockToken = `mock_token_${Date.now()}`;
      const mockRefreshToken = `mock_refresh_${Date.now()}`;

      return NextResponse.json({
        success: true,
        data: {
          user: mockUser,
          token: mockToken,
          refreshToken: mockRefreshToken,
          expiresIn: 3600, // 1 hour
        },
      });
    }

    return NextResponse.json({
      success: false,
      message: "Invalid credentials",
    }, { status: 401 });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}
