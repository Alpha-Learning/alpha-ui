import { NextResponse } from "next/server";
import { z } from "zod";
import { sendWelcomeEmail } from "@/app/lib/emailService";

const waitingListSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = waitingListSchema.safeParse(data);
    
    if (!parsed.success) {
      return NextResponse.json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    // Send welcome email to user
    const emailSent = await sendWelcomeEmail(parsed.data.email);
    
    if (emailSent) {
      console.log(`Welcome email sent to: ${parsed.data.email}`);
    } else {
      console.error(`Failed to send welcome email to: ${parsed.data.email}`);
      // Still return success to user even if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for joining our waiting list!",
    });

  } catch (error) {
    console.error("Waiting list submission error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}

