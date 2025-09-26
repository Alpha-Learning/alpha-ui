import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function POST(request: NextRequest) {
  try {
    const {
      applicationId,
      // Child Information
      fullName,
      age,
      // Zone-Based Engagement Grid
      zoneATimeSpent,
      zoneASelfDirected,
      zoneAObservations,
      zoneAEngagementLevel,
      zoneAKeyBehavioursNotes,
      zoneBTimeSpent,
      zoneBSelfDirected,
      zoneBObservations,
      zoneBEngagementLevel,
      zoneBKeyBehavioursNotes,
      zoneCTimeSpent,
      zoneCSelfDirected,
      zoneCObservations,
      zoneCEngagementLevel,
      zoneCKeyBehavioursNotes,
      zoneDTimeSpent,
      zoneDSelfDirected,
      zoneDObservations,
      zoneDEngagementLevel,
      zoneDKeyBehavioursNotes,
      // Meta Learning Skill Indicators
      selfRegulationObserved,
      selfRegulationBehaviourNotes,
      curiosityObserved,
      curiosityBehaviourNotes,
      socialEngagementObserved,
      socialEngagementBehaviourNotes,
      emotionalRegulationObserved,
      emotionalRegulationBehaviourNotes,
      confidenceAutonomyObserved,
      confidenceAutonomyBehaviourNotes,
      // Learning Preference & Intelligence Summary
      linguisticEvidence,
      linguisticSupportingObservation,
      logicalMathematicalEvidence,
      logicalMathematicalSupportingObservation,
      spatialEvidence,
      spatialSupportingObservation,
      bodilyKinestheticEvidence,
      bodilyKinestheticSupportingObservation,
      musicalEvidence,
      musicalSupportingObservation,
      interpersonalEvidence,
      interpersonalSupportingObservation,
      intrapersonalEvidence,
      intrapersonalSupportingObservation,
      naturalisticEvidence,
      naturalisticSupportingObservation,
      // Parent-Child Dynamic Snapshot
      parentProximity,
      parentInterventionLevel,
      parentInterventionStyle,
      childIndependenceLevel,
      childEmotionalPresentationWithParent,
      childIndependenceWhenParentEngaged,
      emotionalRegulationWithParentPresent,
      // Examiner Summary (Qualitative)
      mostEngagedZone,
      dominantObservedIntelligences,
      initialLearningStyleImpressions,
      earlyFlagsNeedsFollowUp,
      selfDirectedVsSeekingGuidance,
      flagIndicators,
      additionalNotesObservations,
      // Office Use Only
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

    // Check if form already exists
    const existingForm = await prisma.initialObservationForm.findUnique({
      where: { applicationId },
    });

    let form;

    if (existingForm) {
      // Update existing form
      form = await prisma.initialObservationForm.update({
        where: { applicationId },
        data: {
          // Child Information
          fullName,
          age,
          // Zone-Based Engagement Grid
          zoneATimeSpent,
          zoneASelfDirected,
          zoneAObservations,
          zoneAEngagementLevel,
          zoneAKeyBehavioursNotes,
          zoneBTimeSpent,
          zoneBSelfDirected,
          zoneBObservations,
          zoneBEngagementLevel,
          zoneBKeyBehavioursNotes,
          zoneCTimeSpent,
          zoneCSelfDirected,
          zoneCObservations,
          zoneCEngagementLevel,
          zoneCKeyBehavioursNotes,
          zoneDTimeSpent,
          zoneDSelfDirected,
          zoneDObservations,
          zoneDEngagementLevel,
          zoneDKeyBehavioursNotes,
          // Meta Learning Skill Indicators
          selfRegulationObserved,
          selfRegulationBehaviourNotes,
          curiosityObserved,
          curiosityBehaviourNotes,
          socialEngagementObserved,
          socialEngagementBehaviourNotes,
          emotionalRegulationObserved,
          emotionalRegulationBehaviourNotes,
          confidenceAutonomyObserved,
          confidenceAutonomyBehaviourNotes,
          // Learning Preference & Intelligence Summary
          linguisticEvidence,
          linguisticSupportingObservation,
          logicalMathematicalEvidence,
          logicalMathematicalSupportingObservation,
          spatialEvidence,
          spatialSupportingObservation,
          bodilyKinestheticEvidence,
          bodilyKinestheticSupportingObservation,
          musicalEvidence,
          musicalSupportingObservation,
          interpersonalEvidence,
          interpersonalSupportingObservation,
          intrapersonalEvidence,
          intrapersonalSupportingObservation,
          naturalisticEvidence,
          naturalisticSupportingObservation,
          // Parent-Child Dynamic Snapshot
          parentProximity,
          parentInterventionLevel,
          parentInterventionStyle,
          childIndependenceLevel,
          childEmotionalPresentationWithParent,
          childIndependenceWhenParentEngaged,
          emotionalRegulationWithParentPresent,
          // Examiner Summary (Qualitative)
          mostEngagedZone,
          dominantObservedIntelligences,
          initialLearningStyleImpressions,
          earlyFlagsNeedsFollowUp,
          selfDirectedVsSeekingGuidance,
          flagIndicators,
          additionalNotesObservations,
          // Office Use Only
          applicationNumber,
          loggedToSystemDate,
          loggedBy,
        },
      });
    } else {
      // Create new form
      form = await prisma.initialObservationForm.create({
        data: {
          applicationId,
          // Child Information
          fullName,
          age,
          // Zone-Based Engagement Grid
          zoneATimeSpent,
          zoneASelfDirected,
          zoneAObservations,
          zoneAEngagementLevel,
          zoneAKeyBehavioursNotes,
          zoneBTimeSpent,
          zoneBSelfDirected,
          zoneBObservations,
          zoneBEngagementLevel,
          zoneBKeyBehavioursNotes,
          zoneCTimeSpent,
          zoneCSelfDirected,
          zoneCObservations,
          zoneCEngagementLevel,
          zoneCKeyBehavioursNotes,
          zoneDTimeSpent,
          zoneDSelfDirected,
          zoneDObservations,
          zoneDEngagementLevel,
          zoneDKeyBehavioursNotes,
          // Meta Learning Skill Indicators
          selfRegulationObserved,
          selfRegulationBehaviourNotes,
          curiosityObserved,
          curiosityBehaviourNotes,
          socialEngagementObserved,
          socialEngagementBehaviourNotes,
          emotionalRegulationObserved,
          emotionalRegulationBehaviourNotes,
          confidenceAutonomyObserved,
          confidenceAutonomyBehaviourNotes,
          // Learning Preference & Intelligence Summary
          linguisticEvidence,
          linguisticSupportingObservation,
          logicalMathematicalEvidence,
          logicalMathematicalSupportingObservation,
          spatialEvidence,
          spatialSupportingObservation,
          bodilyKinestheticEvidence,
          bodilyKinestheticSupportingObservation,
          musicalEvidence,
          musicalSupportingObservation,
          interpersonalEvidence,
          interpersonalSupportingObservation,
          intrapersonalEvidence,
          intrapersonalSupportingObservation,
          naturalisticEvidence,
          naturalisticSupportingObservation,
          // Parent-Child Dynamic Snapshot
          parentProximity,
          parentInterventionLevel,
          parentInterventionStyle,
          childIndependenceLevel,
          childEmotionalPresentationWithParent,
          childIndependenceWhenParentEngaged,
          emotionalRegulationWithParentPresent,
          // Examiner Summary (Qualitative)
          mostEngagedZone,
          dominantObservedIntelligences,
          initialLearningStyleImpressions,
          earlyFlagsNeedsFollowUp,
          selfDirectedVsSeekingGuidance,
          flagIndicators,
          additionalNotesObservations,
          // Office Use Only
          applicationNumber,
          loggedToSystemDate,
          loggedBy,
        },
      });
    }

    // Update application current stage to 5 after successful form submission
    await prisma.application.update({
      where: { id: applicationId },
      data: { currentStage: 5 }
    });

    return NextResponse.json({
      success: true,
      data: form,
      message: "Initial observation form saved successfully",
    });
  } catch (error: any) {
    console.error("Error saving initial observation form:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save form" },
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

    const form = await prisma.initialObservationForm.findUnique({
      where: { applicationId },
    });

    return NextResponse.json({
      success: true,
      data: form,
    });
  } catch (error: any) {
    console.error("Error fetching initial observation form:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch form" },
      { status: 500 }
    );
  }
}
