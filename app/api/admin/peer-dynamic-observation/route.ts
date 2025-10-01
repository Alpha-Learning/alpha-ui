import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { updateApplicationStatus } from "@/app/utils/applicationStatus";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      applicationId,
      // Observation Details
      childName,
      date,
      examiner,
      age,
      sessionStartTime,
      sessionEndTime,
      // Behavioural Skill Assessment
      leadershipRating,
      leadershipNotes,
      collaborationRating,
      collaborationNotes,
      conflictResolutionRating,
      conflictResolutionNotes,
      communicationRating,
      communicationNotes,
      emotionalRegulationRating,
      emotionalRegulationNotes,
      empathyRating,
      empathyNotes,
      adaptabilityRating,
      adaptabilityNotes,
      initiativeRating,
      initiativeNotes,
      // Meta Learning Skill Alignment
      curiosityObserved,
      curiosityNotes,
      confidenceObserved,
      confidenceNotes,
      selfRegulationObserved,
      selfRegulationNotes,
      collaborationObserved,
      collaborationObservedNotes,
      emotionalAwarenessObserved,
      emotionalAwarenessNotes,
      leadershipObserved,
      leadershipObservedNotes,
      problemSolvingObserved,
      problemSolvingNotes,
      perspectiveTakingObserved,
      perspectiveTakingNotes,
      // Learning Preference & Intelligence Inference
      linguisticObserved,
      linguisticStronglyEvident,
      linguisticNotes,
      logicalMathematicalObserved,
      logicalMathematicalStronglyEvident,
      logicalMathematicalNotes,
      spatialObserved,
      spatialStronglyEvident,
      spatialNotes,
      bodilyKinestheticObserved,
      bodilyKinestheticStronglyEvident,
      bodilyKinestheticNotes,
      musicalObserved,
      musicalStronglyEvident,
      musicalNotes,
      interpersonalObserved,
      interpersonalStronglyEvident,
      interpersonalNotes,
      intrapersonalObserved,
      intrapersonalStronglyEvident,
      intrapersonalNotes,
      naturalisticObserved,
      naturalisticStronglyEvident,
      naturalisticNotes,
      existentialObserved,
      existentialStronglyEvident,
      existentialNotes,
      // Learning Style Clues
      visualObserved,
      visualNotes,
      auditoryObserved,
      auditoryNotes,
      kinestheticObserved,
      kinestheticNotes,
      verbalObserved,
      verbalNotes,
      socialObserved,
      socialNotes,
      solitaryObserved,
      solitaryNotes,
      // Social Role Tendency
      leaderRole,
      withdrawnRole,
      problemSolverRole,
      followerRole,
      initiatorRole,
      bridgerRole,
      observerRole,
      supporterRole,
      challengerRole,
      mediatorRole,
      // Summary Reflections
      notableStrengths,
      areasOfConcern,
      situationsChildThrived,
      situationsChallenging,
      suggestedFollowUp,
      caregiverInteraction,
    } = body;

    if (!applicationId) {
      return NextResponse.json({ success: false, error: "Application ID is required" }, { status: 400 });
    }

    const existing = await prisma.peerDynamicObservation.findUnique({ where: { applicationId } });

    const payload = {
      // Observation Details
      childName,
      date,
      examiner,
      age,
      sessionStartTime,
      sessionEndTime,
      // Behavioural Skill Assessment - convert string ratings to integers
      leadershipRating: leadershipRating ? parseInt(leadershipRating) : null,
      leadershipNotes,
      collaborationRating: collaborationRating ? parseInt(collaborationRating) : null,
      collaborationNotes,
      conflictResolutionRating: conflictResolutionRating ? parseInt(conflictResolutionRating) : null,
      conflictResolutionNotes,
      communicationRating: communicationRating ? parseInt(communicationRating) : null,
      communicationNotes,
      emotionalRegulationRating: emotionalRegulationRating ? parseInt(emotionalRegulationRating) : null,
      emotionalRegulationNotes,
      empathyRating: empathyRating ? parseInt(empathyRating) : null,
      empathyNotes,
      adaptabilityRating: adaptabilityRating ? parseInt(adaptabilityRating) : null,
      adaptabilityNotes,
      initiativeRating: initiativeRating ? parseInt(initiativeRating) : null,
      initiativeNotes,
      // Meta Learning Skill Alignment
      curiosityObserved: curiosityObserved || false,
      curiosityNotes,
      confidenceObserved: confidenceObserved || false,
      confidenceNotes,
      selfRegulationObserved: selfRegulationObserved || false,
      selfRegulationNotes,
      collaborationObserved: collaborationObserved || false,
      collaborationObservedNotes,
      emotionalAwarenessObserved: emotionalAwarenessObserved || false,
      emotionalAwarenessNotes,
      leadershipObserved: leadershipObserved || false,
      leadershipObservedNotes,
      problemSolvingObserved: problemSolvingObserved || false,
      problemSolvingNotes,
      perspectiveTakingObserved: perspectiveTakingObserved || false,
      perspectiveTakingNotes,
      // Learning Preference & Intelligence Inference
      linguisticObserved: linguisticObserved || false,
      linguisticStronglyEvident: linguisticStronglyEvident || false,
      linguisticNotes,
      logicalMathematicalObserved: logicalMathematicalObserved || false,
      logicalMathematicalStronglyEvident: logicalMathematicalStronglyEvident || false,
      logicalMathematicalNotes,
      spatialObserved: spatialObserved || false,
      spatialStronglyEvident: spatialStronglyEvident || false,
      spatialNotes,
      bodilyKinestheticObserved: bodilyKinestheticObserved || false,
      bodilyKinestheticStronglyEvident: bodilyKinestheticStronglyEvident || false,
      bodilyKinestheticNotes,
      musicalObserved: musicalObserved || false,
      musicalStronglyEvident: musicalStronglyEvident || false,
      musicalNotes,
      interpersonalObserved: interpersonalObserved || false,
      interpersonalStronglyEvident: interpersonalStronglyEvident || false,
      interpersonalNotes,
      intrapersonalObserved: intrapersonalObserved || false,
      intrapersonalStronglyEvident: intrapersonalStronglyEvident || false,
      intrapersonalNotes,
      naturalisticObserved: naturalisticObserved || false,
      naturalisticStronglyEvident: naturalisticStronglyEvident || false,
      naturalisticNotes,
      existentialObserved: existentialObserved || false,
      existentialStronglyEvident: existentialStronglyEvident || false,
      existentialNotes,
      // Learning Style Clues
      visualObserved: visualObserved || false,
      visualNotes,
      auditoryObserved: auditoryObserved || false,
      auditoryNotes,
      kinestheticObserved: kinestheticObserved || false,
      kinestheticNotes,
      verbalObserved: verbalObserved || false,
      verbalNotes,
      socialObserved: socialObserved || false,
      socialNotes,
      solitaryObserved: solitaryObserved || false,
      solitaryNotes,
      // Social Role Tendency
      leaderRole: leaderRole || false,
      withdrawnRole: withdrawnRole || false,
      problemSolverRole: problemSolverRole || false,
      followerRole: followerRole || false,
      initiatorRole: initiatorRole || false,
      bridgerRole: bridgerRole || false,
      observerRole: observerRole || false,
      supporterRole: supporterRole || false,
      challengerRole: challengerRole || false,
      mediatorRole: mediatorRole || false,
      // Summary Reflections
      notableStrengths,
      areasOfConcern,
      situationsChildThrived,
      situationsChallenging,
      suggestedFollowUp,
      caregiverInteraction,
    };

    let record;
    if (existing) {
      record = await prisma.peerDynamicObservation.update({ where: { applicationId }, data: payload });
    } else {
      record = await prisma.peerDynamicObservation.create({ data: { applicationId, ...payload } });
    }

    // Mark Peer Dynamic Observation as completed and advance stage to 8
    await prisma.application.update({ 
      where: { id: applicationId }, 
      data: { 
        currentStage: 8,
        isEighthFormCompleted: true
      } 
    });

    // Update application status based on all form completions
    await updateApplicationStatus(applicationId, prisma);

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error saving peer dynamic observation:", error);
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
  
    const record = await prisma.peerDynamicObservation.findUnique({ where: { applicationId } });
    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error fetching peer dynamic observation:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch form" }, { status: 500 });
  }
}
