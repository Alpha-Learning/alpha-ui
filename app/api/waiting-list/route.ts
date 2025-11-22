import { NextResponse } from "next/server";
import { z } from "zod";
import { sendWaitingListNotification } from "@/app/lib/emailService";

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

    // Send notification to admins only
    try {
      const notificationSent = await sendWaitingListNotification(parsed.data.email);
      if (notificationSent) {
        console.log(`Admin notification sent for: ${parsed.data.email}`);
      } else {
        console.error(`Failed to send admin notification for: ${parsed.data.email}`);
        // Don't fail the request if admin notification fails
      }
    } catch (notificationError) {
      console.error("Error sending admin notification:", notificationError);
      // Don't fail the request if admin notification fails
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

