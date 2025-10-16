import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { updateApplicationStatus } from "@/app/utils/applicationStatus";

export async function POST(request: NextRequest) {
  try {
    // Guard: if Prisma model not generated yet (migration not run)
    const model: any = (prisma as any).guidedObservationsProcedure;
    if (!model || typeof model.create !== "function") {
      return NextResponse.json(
        { success: false, error: "GuidedObservationsProcedure model not available. Run: npx prisma migrate dev && npx prisma generate" },
        { status: 500 }
      );
    }
    
    const body = await request.json();
    const {
      applicationId,
      // Basic Information
      childName,
      age,
      date,
      examiner,
      
      // Guided Activity Ratings Grid
      zoneAScore,
      zoneANotes,
      zoneBScore,
      zoneBNotes,
      zoneCScore,
      zoneCNotes,
      zoneDScore,
      zoneDNotes,
      
      // Meta Learning Skill Scoring
      metaCuriosityScore,
      metaCuriosityNotes,
      metaSelfRegulationScore,
      metaSelfRegulationNotes,
      metaConfidenceScore,
      metaConfidenceNotes,
      metaCollaborationScore,
      metaCollaborationNotes,
      metaEmotionalAwarenessScore,
      metaEmotionalAwarenessNotes,
      
      // Intelligence & Learning Type Check-In
      intelLinguisticEvidence,
      intelLinguisticObservation,
      intelLogicalEvidence,
      intelLogicalObservation,
      intelSpatialEvidence,
      intelSpatialObservation,
      intelBodilyEvidence,
      intelBodilyObservation,
      
      // Additional Intelligences
      intelMusicalEvidence,
      intelMusicalObservation,
      intelInterpersonalEvidence,
      intelInterpersonalObservation,
      intelIntrapersonalEvidence,
      intelIntrapersonalObservation,
      intelNaturalisticEvidence,
      intelNaturalisticObservation,
      intelExistentialEvidence,
      intelExistentialObservation,
      
      // Parent-Child Dynamic Snapshot
      parentProximity,
      parentInterventionLevel,
      parentInterventionStyle,
      childIndependenceLevel,
      childEmotionalPresentation,
      childIndependenceWhenParentEngaged,
      emotionalRegulationWithParentPresent,
      
      // Examiner Final Comments
      mostEngagedZone,
      dominantObservedIntelligences,
      initialLearningStyleImpressions,
      earlyFlagsNeedsFollowUp,
      selfDirectedVsSeekingGuidance,
      flagIndicators,
      additionalNotes,
      
      // Interaction Summary
      preferredZone,
      initialBehaviour,
      opennessToAdultGuidance,
      mostRevealingActivity,
      crossReferenceStep5,
      curiosityAndExploration,
      focusAndAttentionSpan,
      engagementWithAdultDirection,
      
      // Additional Observations
      resilienceInChallenge,
      emotionRegulationSignals,
      caregiverInteractionStyle,
      recommendationsForSupport,
    } = body;

    // Validate required fields
    if (!applicationId || !childName || !age || !date || !examiner) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
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

    // Check if guided observation already exists for this application
    const existingObservation = await prisma.guidedObservationsProcedure.findUnique({
      where: { applicationId },
    });

    let observation;

    if (existingObservation) {
      // Update existing observation
      observation = await prisma.guidedObservationsProcedure.update({
        where: { applicationId },
        data: {
          // Basic Information
          childName,
          age,
          date: new Date(date),
          examiner,
          
          // Guided Activity Ratings Grid
          zoneAScore,
          zoneANotes,
          zoneBScore,
          zoneBNotes,
          zoneCScore,
          zoneCNotes,
          zoneDScore,
          zoneDNotes,
          
          // Meta Learning Skill Scoring
          metaCuriosityScore,
          metaCuriosityNotes,
          metaSelfRegulationScore,
          metaSelfRegulationNotes,
          metaConfidenceScore,
          metaConfidenceNotes,
          metaCollaborationScore,
          metaCollaborationNotes,
          metaEmotionalAwarenessScore,
          metaEmotionalAwarenessNotes,
          
          // Intelligence & Learning Type Check-In
          intelLinguisticEvidence,
          intelLinguisticObservation,
          intelLogicalEvidence,
          intelLogicalObservation,
          intelSpatialEvidence,
          intelSpatialObservation,
          intelBodilyEvidence,
          intelBodilyObservation,
          
          // Additional Intelligences
          intelMusicalEvidence,
          intelMusicalObservation,
          intelInterpersonalEvidence,
          intelInterpersonalObservation,
          intelIntrapersonalEvidence,
          intelIntrapersonalObservation,
          intelNaturalisticEvidence,
          intelNaturalisticObservation,
          intelExistentialEvidence,
          intelExistentialObservation,
          
          // Parent-Child Dynamic Snapshot
          parentProximity,
          parentInterventionLevel,
          parentInterventionStyle,
          childIndependenceLevel,
          childEmotionalPresentation,
          childIndependenceWhenParentEngaged,
          emotionalRegulationWithParentPresent,
          
          // Examiner Final Comments
          mostEngagedZone,
          dominantObservedIntelligences,
          initialLearningStyleImpressions,
          earlyFlagsNeedsFollowUp,
          selfDirectedVsSeekingGuidance,
          flagIndicators,
          additionalNotes,
          
          // Interaction Summary
          preferredZone,
          initialBehaviour,
          opennessToAdultGuidance,
          mostRevealingActivity,
          crossReferenceStep5,
          curiosityAndExploration,
          focusAndAttentionSpan,
          engagementWithAdultDirection,
          
          // Additional Observations
          resilienceInChallenge,
          emotionRegulationSignals,
          caregiverInteractionStyle,
          recommendationsForSupport,
        },
      });
    } else {
      // Create new observation
      observation = await prisma.guidedObservationsProcedure.create({
        data: {
          applicationId,
          // Basic Information
          childName,
          age,
          date: new Date(date),
          examiner,
          
          // Guided Activity Ratings Grid
          zoneAScore,
          zoneANotes,
          zoneBScore,
          zoneBNotes,
          zoneCScore,
          zoneCNotes,
          zoneDScore,
          zoneDNotes,
          
          // Meta Learning Skill Scoring
          metaCuriosityScore,
          metaCuriosityNotes,
          metaSelfRegulationScore,
          metaSelfRegulationNotes,
          metaConfidenceScore,
          metaConfidenceNotes,
          metaCollaborationScore,
          metaCollaborationNotes,
          metaEmotionalAwarenessScore,
          metaEmotionalAwarenessNotes,
          
          // Intelligence & Learning Type Check-In
          intelLinguisticEvidence,
          intelLinguisticObservation,
          intelLogicalEvidence,
          intelLogicalObservation,
          intelSpatialEvidence,
          intelSpatialObservation,
          intelBodilyEvidence,
          intelBodilyObservation,
          
          // Additional Intelligences
          intelMusicalEvidence,
          intelMusicalObservation,
          intelInterpersonalEvidence,
          intelInterpersonalObservation,
          intelIntrapersonalEvidence,
          intelIntrapersonalObservation,
          intelNaturalisticEvidence,
          intelNaturalisticObservation,
          intelExistentialEvidence,
          intelExistentialObservation,
          
          // Parent-Child Dynamic Snapshot
          parentProximity,
          parentInterventionLevel,
          parentInterventionStyle,
          childIndependenceLevel,
          childEmotionalPresentation,
          childIndependenceWhenParentEngaged,
          emotionalRegulationWithParentPresent,
          
          // Examiner Final Comments
          mostEngagedZone,
          dominantObservedIntelligences,
          initialLearningStyleImpressions,
          earlyFlagsNeedsFollowUp,
          selfDirectedVsSeekingGuidance,
          flagIndicators,
          additionalNotes,
          
          // Interaction Summary
          preferredZone,
          initialBehaviour,
          opennessToAdultGuidance,
          mostRevealingActivity,
          crossReferenceStep5,
          curiosityAndExploration,
          focusAndAttentionSpan,
          engagementWithAdultDirection,
          
          // Additional Observations
          resilienceInChallenge,
          emotionRegulationSignals,
          caregiverInteractionStyle,
          recommendationsForSupport,
        },
      });
    }

    // Update application current stage to 5 and mark guided observation as completed
    await prisma.application.update({
      where: { id: applicationId },
      data: { 
        isFifthFormCompleted: true
      }
    });

    // Update application status based on all form completions
    await updateApplicationStatus(applicationId, prisma);

    return NextResponse.json({
      success: true,
      data: observation,
      message: "Guided observation data saved successfully and application stage updated",
    });
  } catch (error: any) {
    console.error("Error saving guided observation:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save guided observation" },
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

    const observation = await prisma.guidedObservationsProcedure.findUnique({
      where: { applicationId },
      include: {
        application: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: observation,
    });
  } catch (error: any) {
    console.error("Error fetching guided observation:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch guided observation" },
      { status: 500 }
    );
  }
}