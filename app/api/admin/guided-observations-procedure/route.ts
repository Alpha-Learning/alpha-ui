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
      // Child Information
      fullName,
      age,
      // Ratings Grid
      zoneAScore,
      zoneANotes,
      zoneBScore,
      zoneBNotes,
      zoneCScore,
      zoneCNotes,
      zoneDScore,
      zoneDNotes,
      // Guiding Questions (new names)
      areaLikeBest,
      whatMakesInteresting,
      hardButFun,
      feelWhenTryingNew,
      teachGame,
      // Meta skills
      metaSelfReg,
      metaNotesSelfReg,
      metaCuriosity,
      metaNotesCuriosity,
      metaSocial,
      metaNotesSocial,
      metaEmotional,
      metaNotesEmotional,
      metaConfidence,
      metaNotesConfidence,
      // Intelligence notes
      intelLinguistic,
      intelLogical,
      intelSpatial,
      intelBodily,
      intelMusical,
      intelInterpersonal,
      intelIntrapersonal,
      intelNaturalistic,
      intelExistential,
      // Intelligence evidence checkboxes
      intelLinguisticEvidenceModerate,
      intelLinguisticEvidenceStrong,
      intelLogicalEvidenceModerate,
      intelLogicalEvidenceStrong,
      intelSpatialEvidenceModerate,
      intelSpatialEvidenceStrong,
      intelBodilyEvidenceModerate,
      intelBodilyEvidenceStrong,
      intelMusicalEvidenceModerate,
      intelMusicalEvidenceStrong,
      intelInterpersonalEvidenceModerate,
      intelInterpersonalEvidenceStrong,
      intelIntrapersonalEvidenceModerate,
      intelIntrapersonalEvidenceStrong,
      intelNaturalisticEvidenceModerate,
      intelNaturalisticEvidenceStrong,
      intelExistentialEvidenceModerate,
      intelExistentialEvidenceStrong,
      // Parent–Child snapshot
      parentProximity,
      parentInterventionLevel,
      parentInterventionStyle,
      childIndependenceLevel,
      childEmotionalWithParent,
      childIndependenceWhenParentEngaged,
      emotionalRegulationWithParentPresent,
      // Examiner comments
      mostEngagedZone,
      dominantObservedIntelligences,
      initialLearningStyleImpressions,
      earlyFlagsNeedsFollowUp,
      selfDirectedVsSeekingGuidance,
      finalAdditionalNotes,
      // Interaction summary
      interactionPreferredZone,
      interactionInitialBehaviour,
      interactionOpennessToAdultGuidance,
      interactionMostRevealingActivity,
      interactionCrossRefStep5,
      interactionCuriosityExploration,
      interactionFocusAttention,
      interactionEngagementWithAdult,
      interactionResilienceInChallenge,
      interactionEmotionRegulationSignals,
      interactionCaregiverInteractionStyle,
      interactionRecommendations,
      // Office use
      applicationNumber,
      observerName,
      assessmentDate,
      loggedToSystemDate,
      loggedBy,
    } = body;

    if (!applicationId) {
      return NextResponse.json({ success: false, error: "Application ID is required" }, { status: 400 });
    }

    const existing = await model.findUnique({ where: { applicationId } });

    const payload = {
      // Child Information
      fullName,
      age,
      // Ratings Grid
      zoneAScore,
      zoneANotes,
      zoneBScore,
      zoneBNotes,
      zoneCScore,
      zoneCNotes,
      zoneDScore,
      zoneDNotes,
      // Guiding Questions
      areaLikeBest,
      whatMakesInteresting,
      hardButFun,
      feelWhenTryingNew,
      teachGame,
      // Meta
      metaSelfReg,
      metaNotesSelfReg,
      metaCuriosity,
      metaNotesCuriosity,
      metaSocial,
      metaNotesSocial,
      metaEmotional,
      metaNotesEmotional,
      metaConfidence,
      metaNotesConfidence,
      // Intelligence
      intelLinguistic,
      intelLogical,
      intelSpatial,
      intelBodily,
      intelMusical,
      intelInterpersonal,
      intelIntrapersonal,
      intelNaturalistic,
      intelExistential,
      // Intelligence evidence checkboxes
      intelLinguisticEvidenceModerate,
      intelLinguisticEvidenceStrong,
      intelLogicalEvidenceModerate,
      intelLogicalEvidenceStrong,
      intelSpatialEvidenceModerate,
      intelSpatialEvidenceStrong,
      intelBodilyEvidenceModerate,
      intelBodilyEvidenceStrong,
      intelMusicalEvidenceModerate,
      intelMusicalEvidenceStrong,
      intelInterpersonalEvidenceModerate,
      intelInterpersonalEvidenceStrong,
      intelIntrapersonalEvidenceModerate,
      intelIntrapersonalEvidenceStrong,
      intelNaturalisticEvidenceModerate,
      intelNaturalisticEvidenceStrong,
      intelExistentialEvidenceModerate,
      intelExistentialEvidenceStrong,
      // Parent–Child
      parentProximity,
      parentInterventionLevel,
      parentInterventionStyle,
      childIndependenceLevel,
      childEmotionalWithParent,
      childIndependenceWhenParentEngaged,
      emotionalRegulationWithParentPresent,
      // Examiner
      mostEngagedZone,
      dominantObservedIntelligences,
      initialLearningStyleImpressions,
      earlyFlagsNeedsFollowUp,
      selfDirectedVsSeekingGuidance,
      finalAdditionalNotes,
      interactionPreferredZone,
      interactionInitialBehaviour,
      interactionOpennessToAdultGuidance,
      interactionMostRevealingActivity,
      interactionCrossRefStep5,
      interactionCuriosityExploration,
      interactionFocusAttention,
      interactionEngagementWithAdult,
      interactionResilienceInChallenge,
      interactionEmotionRegulationSignals,
      interactionCaregiverInteractionStyle,
      interactionRecommendations,
      // Office
      applicationNumber,
      observerName,
      assessmentDate,
      loggedToSystemDate,
      loggedBy,
    } as const;

    let record;
    if (existing) {
      record = await model.update({ where: { applicationId }, data: payload });
    } else {
      record = await model.create({ data: { applicationId, ...payload } });
    }

    // advance stage to 6 and mark form as completed
    await prisma.application.update({ 
      where: { id: applicationId }, 
      data: { 
        // currentStage: 6,
        isSixthFormCompleted: true
      } 
    });

    // Update application status based on all form completions
    await updateApplicationStatus(applicationId, prisma);

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error saving guided observations:", error);
    return NextResponse.json({ success: false, error: "Failed to save form" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get("applicationId");
    if (!applicationId) {
      return NextResponse.json({ success: false, error: "Application ID is required" }, { status: 400 });
    }
    const model: any = (prisma as any).guidedObservationsProcedure;
    if (!model || typeof model.findUnique !== "function") {
      return NextResponse.json(
        { success: false, error: "GuidedObservationsProcedure model not available. Run prisma migrate." },
        { status: 500 }
      );
    }
    const record = await model.findUnique({ where: { applicationId } });
    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error fetching guided observations:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch form" }, { status: 500 });
  }
}



