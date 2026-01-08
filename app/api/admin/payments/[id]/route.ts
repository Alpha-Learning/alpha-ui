import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";

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
    const body = await request.json();
    const { isPaid, paymentAmount, paidAt } = body;

    if (typeof isPaid !== "boolean") {
      return NextResponse.json(
        { success: false, message: "isPaid must be a boolean" },
        { status: 400 }
      );
    }

    // Check if application exists
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {
      isPaid,
      paymentAmount: paymentAmount ? Math.round(paymentAmount) : null,
    };

    if (isPaid) {
      if (paidAt) {
        updateData.paidAt = new Date(paidAt);
      } else {
        updateData.paidAt = new Date();
      }
    } else {
      updateData.paidAt = null;
    }

    // Update the application
    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: updateData,
      select: {
        id: true,
        isPaid: true,
        paymentAmount: true,
        paidAt: true,
        parentFullName: true,
        childFullName: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating payment:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
