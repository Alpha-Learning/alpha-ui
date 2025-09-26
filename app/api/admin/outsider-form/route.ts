import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function POST(request: NextRequest) {
  try {
    const {
      applicationId,
      fullName,
      childName,
      date,
      relationshipToChild,
      interactionContext,
      learningTendenciesCuriosity,
      emotionalTraits,
      adaptationToChanges,
      communicationSkills,
      groupBehavior,
      concernsNotes,
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
    const existingQuestionnaire = await prisma.outsiderQuestionnaire.findUnique({
      where: { applicationId },
    });

    let questionnaire;

    if (existingQuestionnaire) {
      // Update existing questionnaire
      questionnaire = await prisma.outsiderQuestionnaire.update({
        where: { applicationId },
        data: {
          fullName,
          childName,
          date: new Date(date),
          relationshipToChild,
          interactionContext,
          learningTendenciesCuriosity,
          emotionalTraits,
          adaptationToChanges,
          communicationSkills,
          groupBehavior,
          concernsNotes,
          emotionalStrengthsVulnerabilities,
          applicationNumber,
          loggedToSystemDate,
          loggedBy,
        },
      });
    } else {
      // Create new questionnaire
      questionnaire = await prisma.outsiderQuestionnaire.create({
        data: {
          applicationId,
          fullName,
          childName,
          date: new Date(date),
          relationshipToChild,
          interactionContext,
          learningTendenciesCuriosity,
          emotionalTraits,
          adaptationToChanges,
          communicationSkills,
          groupBehavior,
          concernsNotes,
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

    // Only advance to stage 3 if all three questionnaires are completed
    if (parentQuestionnaire && caregiverQuestionnaire && outsiderQuestionnaire) {
      await prisma.application.update({
        where: { id: applicationId },
        data: { currentStage: 3 }
      });
    }

    return NextResponse.json({
      success: true,
      data: questionnaire,
      message: "Outsider questionnaire saved successfully",
    });
  } catch (error: any) {
    console.error("Error saving outsider questionnaire:", error);
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

    const questionnaire = await prisma.outsiderQuestionnaire.findUnique({
      where: { applicationId },
    });

    return NextResponse.json({
      success: true,
      data: questionnaire,
    });
  } catch (error: any) {
    console.error("Error fetching outsider questionnaire:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch questionnaire" },
      { status: 500 }
    );
  }
}
