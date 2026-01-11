import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";
import { sendPaymentReminderEmail } from "@/app/lib/emailService";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.slice(7);
    const payload = verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const { id: applicationId } = await params;

    // Check if application exists
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      select: {
        id: true,
        isPaid: true,
        paymentAmount: true,
        parentFullName: true,
        parentEmail: true,
        childFullName: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    // Only allow sending reminder if payment is unpaid
    if (application.isPaid) {
      return NextResponse.json(
        { success: false, message: "Cannot send reminder for paid applications" },
        { status: 400 }
      );
    }

    // Send reminder email
    const emailSent = await sendPaymentReminderEmail({
      parentName: application.parentFullName,
      parentEmail: application.parentEmail,
      childName: application.childFullName,
      applicationId: application.id,
      paymentAmount: application.paymentAmount || 150,
    });

    if (!emailSent) {
      return NextResponse.json(
        { success: false, message: "Failed to send reminder email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
     // message: "Payment reminder email sent successfully",
    });
  } catch (error: any) {
    console.error("Error sending payment reminder:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}