import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { updateApplicationStatus } from "@/app/utils/applicationStatus";

export async function POST(request: NextRequest) {
  try {
    const {
      applicationId,
      examinerName,
      date,
      welcomeOverviewCompleted,
      tourLearningZonesCompleted,
      technologyDemonstrationCompleted,
      safetySecurityMeasuresCompleted,
      qaSessionCompleted,
      scheduleAssessmentDatesCompleted,
      welcomeOverviewNotes,
      tourLearningZonesNotes,
      technologyDemonstrationNotes,
      safetySecurityMeasuresNotes,
      qaSessionNotes,
      scheduleAssessmentDatesNotes,
      applicationNumber,
      loggedToSystemDate,
      loggedBy,
    } = await request.json();

    if (!applicationId) {
      return NextResponse.json(
        { success: false, error: "Application ID is required" },
        { status: 400 }
      );
    }

    // Check if checklist already exists
    const existingChecklist = await prisma.facilityWalkthroughChecklist.findUnique({
      where: { applicationId },
    });

    let checklist;

    if (existingChecklist) {
      // Update existing checklist
      checklist = await prisma.facilityWalkthroughChecklist.update({
        where: { applicationId },
        data: {
          examinerName,
          date: new Date(date),
          welcomeOverviewCompleted: welcomeOverviewCompleted || false,
          tourLearningZonesCompleted: tourLearningZonesCompleted || false,
          technologyDemonstrationCompleted: technologyDemonstrationCompleted || false,
          safetySecurityMeasuresCompleted: safetySecurityMeasuresCompleted || false,
          qaSessionCompleted: qaSessionCompleted || false,
          scheduleAssessmentDatesCompleted: scheduleAssessmentDatesCompleted || false,
          welcomeOverviewNotes,
          tourLearningZonesNotes,
          technologyDemonstrationNotes,
          safetySecurityMeasuresNotes,
          qaSessionNotes,
          scheduleAssessmentDatesNotes,
          applicationNumber,
          loggedToSystemDate,
          loggedBy,
        },
      });
    } else {
      // Create new checklist
      checklist = await prisma.facilityWalkthroughChecklist.create({
        data: {
          applicationId,
          examinerName,
          date: new Date(date),
          welcomeOverviewCompleted: welcomeOverviewCompleted || false,
          tourLearningZonesCompleted: tourLearningZonesCompleted || false,
          technologyDemonstrationCompleted: technologyDemonstrationCompleted || false,
          safetySecurityMeasuresCompleted: safetySecurityMeasuresCompleted || false,
          qaSessionCompleted: qaSessionCompleted || false,
          scheduleAssessmentDatesCompleted: scheduleAssessmentDatesCompleted || false,
          welcomeOverviewNotes,
          tourLearningZonesNotes,
          technologyDemonstrationNotes,
          safetySecurityMeasuresNotes,
          qaSessionNotes,
          scheduleAssessmentDatesNotes,
          applicationNumber,
          loggedToSystemDate,
          loggedBy,
        },
      });
    }

    // Update application current stage to 4 and mark facility walkthrough as completed
    await prisma.application.update({
      where: { id: applicationId },
      data: { 
        // currentStage: 4,
        isFourthFormCompleted: true
      }
    });

    // Update application status based on all form completions
    await updateApplicationStatus(applicationId, prisma);

    return NextResponse.json({
      success: true,
      data: checklist,
      message: "Facility walkthrough checklist saved successfully",
    });
  } catch (error: any) {
    console.error("Error saving facility walkthrough checklist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save checklist" },
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
        { success: false, error: "Application ID is required" },
        { status: 400 }
      );
    }

    const checklist = await prisma.facilityWalkthroughChecklist.findUnique({
      where: { applicationId },
    });

    return NextResponse.json({
      success: true,
      data: checklist,
    });
  } catch (error: any) {
    console.error("Error fetching facility walkthrough checklist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch checklist" },
      { status: 500 }
    );
  }
}
