import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // In a real app, you would:
    // 1. Extract and validate the JWT token from the Authorization header
    // 2. Look up the user in the database
    // 3. Return the user data

    // Mock user data for now
    const mockUser = {
      id: "1",
      name: "John Parent",
      email: "john@example.com",
      role: "parent" as const,
      avatar: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      isActive: true,
    };

    return NextResponse.json({
      success: true,
      data: mockUser,
    });

  } catch (error) {
    console.error("Get current user error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}
