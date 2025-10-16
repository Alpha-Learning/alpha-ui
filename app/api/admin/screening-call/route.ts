import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { updateApplicationStatus } from "@/app/utils/applicationStatus";
import { sendPaymentEmail } from "@/app/lib/emailService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      applicationId,
      fullName,
      childName,
      date,
      callerName,
      crmLeadTag,
      recordingPermission,
      introductionNotes,
      overviewNotes,
      applicationReason,
      currentSchoolIssues,
      techResponseAtHome,
      parentWarmUpNotes,
      flexibleModelOpenness,
      childFreeTime,
      adaptiveTechComfort,
      fitClarificationNotes,
      generalNotes,
      parentReactionsNotes,
      comprehensiveQuestionnaires,
      guidebookInfo,
      walkthroughDate,
      assessmentInvite,
      additionalNotes,
      loggedToSystemDate,
      loggedBy,
    } = body;

    // Validate required fields
    if (!applicationId || !fullName || !childName || !date || !callerName) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if application exists and get user details
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        user: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    // Check if screening call already exists for this application
    const existingScreeningCall = await prisma.screeningCall.findUnique({
      where: { applicationId },
    });

    let screeningCall;

    if (existingScreeningCall) {
      // Update existing screening call
      screeningCall = await prisma.screeningCall.update({
        where: { applicationId },
        data: {
          fullName,
          childName,
          date: new Date(date),
          callerName,
          crmLeadTag,
          recordingPermission,
          introductionNotes,
          overviewNotes,
          applicationReason,
          currentSchoolIssues,
          techResponseAtHome,
          parentWarmUpNotes,
          flexibleModelOpenness,
          childFreeTime,
          adaptiveTechComfort,
          fitClarificationNotes,
          generalNotes,
          parentReactionsNotes,
          comprehensiveQuestionnaires: comprehensiveQuestionnaires || false,
          guidebookInfo: guidebookInfo || false,
          walkthroughDate,
          assessmentInvite,
          additionalNotes,
          loggedToSystemDate,
          loggedBy,
        },
      });
    } else {
      // Create new screening call
      screeningCall = await prisma.screeningCall.create({
        data: {
          applicationId,
          fullName,
          childName,
          date: new Date(date),
          callerName,
          crmLeadTag,
          recordingPermission,
          introductionNotes,
          overviewNotes,
          applicationReason,
          currentSchoolIssues,
          techResponseAtHome,
          parentWarmUpNotes,
          flexibleModelOpenness,
          childFreeTime,
          adaptiveTechComfort,
          fitClarificationNotes,
          generalNotes,
          parentReactionsNotes,
          comprehensiveQuestionnaires: comprehensiveQuestionnaires || false,
          guidebookInfo: guidebookInfo || false,
          walkthroughDate,
          assessmentInvite,
          additionalNotes,
          loggedToSystemDate,
          loggedBy,
        },
      });
    }

    // Update application current stage to 2 and mark screening call as completed
    await prisma.application.update({
      where: { id: applicationId },
      data: { 
        // currentStage: 2,
        isSecondFormCompleted: true
      }
    });

    // Update application status based on all form completions
    await updateApplicationStatus(applicationId, prisma);

    // Send payment email to parent
    try {
      // Set default payment amount and due date (7 days from now)
      const defaultPaymentAmount = 150;
      const paymentDueDate = new Date();
      paymentDueDate.setDate(paymentDueDate.getDate() + 7);

      const emailSent = await sendPaymentEmail({
        parentName: application?.user?.name || "",
        parentEmail: application?.user?.email || "",
        childName: childName,
        paymentAmount: defaultPaymentAmount,
        paymentDate: paymentDueDate.toISOString().split('T')[0],
        applicationId: applicationId,
        walkthroughDate: walkthroughDate,
        assessmentDate: assessmentInvite,
        callerName: callerName,
        screeningDate: date,
      });

      if (emailSent) {
        console.log(`Payment email sent successfully to ${application?.user?.email || ""}`);
      } else {
        console.error(`Failed to send payment email to ${application?.user?.email || ""}`);
      }
    } catch (emailError) {
      console.error("Error sending payment email:", emailError);
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({
      success: true,
      data: screeningCall,
      message: "Screening call data saved successfully, application stage updated, and payment email sent",
    });
  } catch (error: any) {
    console.error("Error saving screening call:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save screening call" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get("applicationId");

    if (!applicationId) {
      return NextResponse.json(
        { success: false, message: "Application ID is required" },
        { status: 400 }
      );
    }

    const screeningCall = await prisma.screeningCall.findUnique({
      where: { applicationId },
      include: {
        application: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: screeningCall,
    });
  } catch (error: any) {
    console.error("Error fetching screening call:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch screening call" },
      { status: 500 }
    );
  }
}
