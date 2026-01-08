import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";

export async function GET(req: Request) {
  try {
    // Check for authorization header
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized - No valid token provided",
      }, { status: 401 });
    }

    // Verify token and get user ID
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const userPayload = verifyToken(token);
    
    if (!userPayload) {
      return NextResponse.json({
        success: false,
        message: "Invalid or expired token",
      }, { status: 401 });
    }

    // Get user data from database
    const user = await prisma.user.findUnique({
      where: { id: userPayload.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        city: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      }, { status: 404 });
    }

    // Get user's latest application with completion status
    const latestApplication = await prisma.application.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        isFirstFormCompleted: true,
        isSecondFormCompleted: true,
        isThirdFormCompleted: true,
        isFourthFormCompleted: true,
        isFifthFormCompleted: true,
        isSixthFormCompleted: true,
        isSeventhFormCompleted: true,
        isEighthFormCompleted: true,
        isNinthFormCompleted: true,
        isPaid: true,
        paymentAmount: true,
        paidAt: true,
      }
    });

    // Calculate if all forms are completed
    const allFormsCompleted = latestApplication ? [
      latestApplication.isFirstFormCompleted,
      latestApplication.isSecondFormCompleted,
      latestApplication.isThirdFormCompleted,
      latestApplication.isFourthFormCompleted,
      latestApplication.isFifthFormCompleted,
      latestApplication.isSixthFormCompleted,
      latestApplication.isSeventhFormCompleted,
      latestApplication.isEighthFormCompleted,
      latestApplication.isNinthFormCompleted,
    ].every(Boolean) : false;

    return NextResponse.json({
      success: true,
      data: {
        ...user,
        applicationStatus: latestApplication?.status || "No Application",
        submittedAt: latestApplication?.createdAt || null,
        applicationId: latestApplication?.id || null,
        allFormsCompleted: allFormsCompleted,
        isPaid: latestApplication?.isPaid || false,
        paymentAmount: latestApplication?.paymentAmount || null,
        paidAt: latestApplication?.paidAt || null,
      },
    });

  } catch (error) {
    console.error("Get current user error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}
