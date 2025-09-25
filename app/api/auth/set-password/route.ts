import { NextResponse } from "next/server";
import { z } from "zod";

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

    // TODO: In a real application, you would:
    // 1. Hash the password using bcrypt or similar
    // 2. Store the hashed password in your database
    // 3. Update the user record with the password
    // 4. Send a confirmation email
    
    console.log("Setting password for:", email);
    console.log("Password hash would be stored here");

    // Mock response
    return NextResponse.json({
      success: true,
      message: "Password set successfully",
      data: {
        email,
        passwordSet: true,
        timestamp: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error("Set password error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}
