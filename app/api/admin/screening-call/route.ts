import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { updateApplicationStatus } from "@/app/utils/applicationStatus";
import { sendPaymentEmail } from "@/app/lib/emailService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      applicationId,
      isDraft = false,
      fullName,
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

    // Validate required fields only for final submission (not for drafts)
    if (!isDraft) {
      if (!applicationId || !fullName || !date || !callerName) {
        return NextResponse.json(
          { success: false, message: "Missing required fields" },
          { status: 400 }
        );
      }
    } else {
      // For drafts, only validate applicationId
      if (!applicationId) {
        return NextResponse.json(
          { success: false, message: "Application ID is required" },
          { status: 400 }
        );
      }
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

    // Derive child's name from the application record
    const derivedChildName = application.childFullName || "";

    // Check if screening call already exists for this application
    const existingScreeningCall = await prisma.screeningCall.findUnique({
      where: { applicationId },
    });

    let screeningCall;

    if (existingScreeningCall) {
      // Update existing screening call - only update fields that are provided
      const updateData: any = {
        childName: derivedChildName, // Always update childName from application
      };

      // Only include fields that are provided (not undefined)
      if (fullName !== undefined) updateData.fullName = fullName;
      if (date !== undefined) updateData.date = new Date(date);
      if (callerName !== undefined) updateData.callerName = callerName;
      if (crmLeadTag !== undefined) updateData.crmLeadTag = crmLeadTag;
      if (recordingPermission !== undefined) updateData.recordingPermission = recordingPermission;
      if (introductionNotes !== undefined) updateData.introductionNotes = introductionNotes;
      if (overviewNotes !== undefined) updateData.overviewNotes = overviewNotes;
      if (applicationReason !== undefined) updateData.applicationReason = applicationReason;
      if (currentSchoolIssues !== undefined) updateData.currentSchoolIssues = currentSchoolIssues;
      if (techResponseAtHome !== undefined) updateData.techResponseAtHome = techResponseAtHome;
      if (parentWarmUpNotes !== undefined) updateData.parentWarmUpNotes = parentWarmUpNotes;
      if (flexibleModelOpenness !== undefined) updateData.flexibleModelOpenness = flexibleModelOpenness;
      if (childFreeTime !== undefined) updateData.childFreeTime = childFreeTime;
      if (adaptiveTechComfort !== undefined) updateData.adaptiveTechComfort = adaptiveTechComfort;
      if (fitClarificationNotes !== undefined) updateData.fitClarificationNotes = fitClarificationNotes;
      if (generalNotes !== undefined) updateData.generalNotes = generalNotes;
      if (parentReactionsNotes !== undefined) updateData.parentReactionsNotes = parentReactionsNotes;
      if (comprehensiveQuestionnaires !== undefined) updateData.comprehensiveQuestionnaires = comprehensiveQuestionnaires;
      if (guidebookInfo !== undefined) updateData.guidebookInfo = guidebookInfo;
      if (walkthroughDate !== undefined) updateData.walkthroughDate = walkthroughDate;
      if (assessmentInvite !== undefined) updateData.assessmentInvite = assessmentInvite;
      if (additionalNotes !== undefined) {
        updateData.additionalNotes = additionalNotes ? new Date(additionalNotes) : null;
      }
      if (loggedToSystemDate !== undefined) updateData.loggedToSystemDate = loggedToSystemDate;
      if (loggedBy !== undefined) updateData.loggedBy = loggedBy;

      screeningCall = await prisma.screeningCall.update({
        where: { applicationId },
        data: updateData,
      });
    } else {
      // Create new screening call - allow partial data for drafts
      screeningCall = await prisma.screeningCall.create({
        data: {
          applicationId,
          fullName: fullName || "",
          childName: derivedChildName,
          date: date ? new Date(date) : new Date(),
          callerName: callerName || "",
          crmLeadTag: crmLeadTag || null,
          recordingPermission: recordingPermission || null,
          introductionNotes: introductionNotes || "",
          overviewNotes: overviewNotes || "",
          applicationReason: applicationReason || "",
          currentSchoolIssues: currentSchoolIssues || "",
          techResponseAtHome: techResponseAtHome || "",
          parentWarmUpNotes: parentWarmUpNotes || "",
          flexibleModelOpenness: flexibleModelOpenness || "",
          childFreeTime: childFreeTime || "",
          adaptiveTechComfort: adaptiveTechComfort || "",
          fitClarificationNotes: fitClarificationNotes || "",
          generalNotes: generalNotes || "",
          parentReactionsNotes: parentReactionsNotes || "",
          comprehensiveQuestionnaires: comprehensiveQuestionnaires || false,
          guidebookInfo: guidebookInfo || false,
          walkthroughDate: walkthroughDate || "",
          assessmentInvite: assessmentInvite || false,
          additionalNotes: additionalNotes ? new Date(additionalNotes) : null,
          loggedToSystemDate: loggedToSystemDate || "",
          loggedBy: loggedBy || "",
        },
      });
    }

    // Only update application status and send email for final submission (not for drafts)
    if (!isDraft) {
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
          childName: derivedChildName,
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
    }

    return NextResponse.json({
      success: true,
      data: screeningCall,
      message: isDraft 
        ? "Draft saved successfully" 
        : "Screening call data saved successfully, application stage updated, and payment email sent",
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