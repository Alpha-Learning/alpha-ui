import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { updateApplicationStatus } from "@/app/utils/applicationStatus";

export async function POST(request: NextRequest) {
  try {
    const {
      applicationId,
      fullName,
      childName,
      date,
      careDuration,
      regularActivities,
      behaviorWithoutParent,
      toysGamesTasksEnjoyed,
      preferences,
      responseToDifficulties,
      engagementWithChosenActivity,
      engagementWithAssignedActivity,
      interactionWithChildren,
      seekingHelpComfort,
      emotionalRegulationStrategies,
      emotionalStrengthsVulnerabilities,
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

    // Check if questionnaire already exists
    const existingQuestionnaire = await prisma.caregiverQuestionnaire.findUnique({
      where: { applicationId },
    });

    let questionnaire;

    if (existingQuestionnaire) {
      // Update existing questionnaire
      questionnaire = await prisma.caregiverQuestionnaire.update({
        where: { applicationId },
        data: {
          fullName,
          childName,
          date: new Date(date),
          careDuration,
          regularActivities,
          behaviorWithoutParent,
          toysGamesTasksEnjoyed,
          preferences,
          responseToDifficulties,
          engagementWithChosenActivity,
          engagementWithAssignedActivity,
          interactionWithChildren,
          seekingHelpComfort,
          emotionalRegulationStrategies,
          emotionalStrengthsVulnerabilities,
          applicationNumber,
          loggedToSystemDate,
          loggedBy,
        },
      });
    } else {
      // Create new questionnaire
      questionnaire = await prisma.caregiverQuestionnaire.create({
        data: {
          applicationId,
          fullName,
          childName,
          date: new Date(date),
          careDuration,
          regularActivities,
          behaviorWithoutParent,
          toysGamesTasksEnjoyed,
          preferences,
          responseToDifficulties,
          engagementWithChosenActivity,
          engagementWithAssignedActivity,
          interactionWithChildren,
          seekingHelpComfort,
          emotionalRegulationStrategies,
          emotionalStrengthsVulnerabilities,
          applicationNumber,
          loggedToSystemDate,
          loggedBy,
        },
      });
    }

    // Check if all three questionnaires are completed before advancing to stage 3
    const parentQuestionnaire = await prisma.parentGuardianQuestionnaire.findUnique({
      where: { applicationId },
    });
    
    const caregiverQuestionnaire = await prisma.caregiverQuestionnaire.findUnique({
      where: { applicationId },
    });
    
    const outsiderQuestionnaire = await prisma.outsiderQuestionnaire.findUnique({
      where: { applicationId },
    });

    // Mark caregiver questionnaire as completed (individual flag)
    await prisma.application.update({
      where: { id: applicationId },
      data: { isCaregiverFormCompleted: true }
    });

    // Check if all three questionnaires are completed and set isThirdFormCompleted
    if (parentQuestionnaire && caregiverQuestionnaire && outsiderQuestionnaire) {
      await prisma.application.update({
        where: { id: applicationId },
        data: { 
          currentStage: 3,
          isThirdFormCompleted: true
        }
      });
    }

    // Update application status based on all form completions
    await updateApplicationStatus(applicationId, prisma);

    return NextResponse.json({
      success: true,
      data: questionnaire,
      message: "Caregiver questionnaire saved successfully",
    });
  } catch (error: any) {
    console.error("Error saving caregiver questionnaire:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save questionnaire" },
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

    const questionnaire = await prisma.caregiverQuestionnaire.findUnique({
      where: { applicationId },
    });

    return NextResponse.json({
      success: true,
      data: questionnaire,
    });
  } catch (error: any) {
    console.error("Error fetching caregiver questionnaire:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch questionnaire" },
      { status: 500 }
    );
  }
}
