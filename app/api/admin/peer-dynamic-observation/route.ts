import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { updateApplicationStatus } from "@/app/utils/applicationStatus";

// Helper function to safely convert rating to integer (handles both string and number)
const toInt = (value: string | number | null | undefined): number | null => {
  if (value === null || value === undefined || value === '' || value === '0') return null;
  if (typeof value === 'number') return isNaN(value) ? null : value;
  const parsed = parseInt(String(value), 10);
  return isNaN(parsed) ? null : parsed;
};

// Helper function to convert integer to string for form compatibility
const toString = (value: number | null | undefined): string => {
  return value !== null && value !== undefined ? String(value) : '';
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      applicationId,
      isDraft = false,
      // Observation Details
      groupID,  
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

    // Build payload with proper type conversions
    // According to Prisma schema: ratings are Int?, strings are String?, booleans are Boolean
    const payload = {
      // Observation Details (String? in Prisma)
      groupID,
      childName,
      date,
      examiner,
      age,
      sessionStartTime,
      sessionEndTime,
      
      // Behavioural Skill Assessment - Convert to Int? for Prisma
      leadershipRating: toInt(leadershipRating),
      leadershipNotes,
      collaborationRating: toInt(collaborationRating),
      collaborationNotes,
      conflictResolutionRating: toInt(conflictResolutionRating),
      conflictResolutionNotes,
      communicationRating: toInt(communicationRating),
      communicationNotes,
      emotionalRegulationRating: toInt(emotionalRegulationRating),
      emotionalRegulationNotes,
      empathyRating: toInt(empathyRating),
      empathyNotes,
      adaptabilityRating: toInt(adaptabilityRating),
      adaptabilityNotes,
      initiativeRating: toInt(initiativeRating),
      initiativeNotes,
      
      // Meta Learning Skill Alignment (Boolean @default(false) in Prisma)
      curiosityObserved: Boolean(curiosityObserved) || false,
      curiosityNotes,
      confidenceObserved: Boolean(confidenceObserved) || false,
      confidenceNotes,
      selfRegulationObserved: Boolean(selfRegulationObserved) || false,
      selfRegulationNotes,
      collaborationObserved: Boolean(collaborationObserved) || false,
      collaborationObservedNotes,
      emotionalAwarenessObserved: Boolean(emotionalAwarenessObserved) || false,
      emotionalAwarenessNotes,
      leadershipObserved: Boolean(leadershipObserved) || false,
      leadershipObservedNotes,
      problemSolvingObserved: Boolean(problemSolvingObserved) || false,
      problemSolvingNotes,
      perspectiveTakingObserved: Boolean(perspectiveTakingObserved) || false,
      perspectiveTakingNotes,
      
      // Learning Preference & Intelligence Inference (Boolean @default(false) in Prisma)
      linguisticObserved: Boolean(linguisticObserved) || false,
      linguisticStronglyEvident: Boolean(linguisticStronglyEvident) || false,
      linguisticNotes,
      logicalMathematicalObserved: Boolean(logicalMathematicalObserved) || false,
      logicalMathematicalStronglyEvident: Boolean(logicalMathematicalStronglyEvident) || false,
      logicalMathematicalNotes,
      spatialObserved: Boolean(spatialObserved) || false,
      spatialStronglyEvident: Boolean(spatialStronglyEvident) || false,
      spatialNotes,
      bodilyKinestheticObserved: Boolean(bodilyKinestheticObserved) || false,
      bodilyKinestheticStronglyEvident: Boolean(bodilyKinestheticStronglyEvident) || false,
      bodilyKinestheticNotes,
      musicalObserved: Boolean(musicalObserved) || false,
      musicalStronglyEvident: Boolean(musicalStronglyEvident) || false,
      musicalNotes,
      interpersonalObserved: Boolean(interpersonalObserved) || false,
      interpersonalStronglyEvident: Boolean(interpersonalStronglyEvident) || false,
      interpersonalNotes,
      intrapersonalObserved: Boolean(intrapersonalObserved) || false,
      intrapersonalStronglyEvident: Boolean(intrapersonalStronglyEvident) || false,
      intrapersonalNotes,
      naturalisticObserved: Boolean(naturalisticObserved) || false,
      naturalisticStronglyEvident: Boolean(naturalisticStronglyEvident) || false,
      naturalisticNotes,
      existentialObserved: Boolean(existentialObserved) || false,
      existentialStronglyEvident: Boolean(existentialStronglyEvident) || false,
      existentialNotes,
      
      // Learning Style Clues (Boolean @default(false) in Prisma)
      visualObserved: Boolean(visualObserved) || false,
      visualNotes,
      auditoryObserved: Boolean(auditoryObserved) || false,
      auditoryNotes,
      kinestheticObserved: Boolean(kinestheticObserved) || false,
      kinestheticNotes,
      verbalObserved: Boolean(verbalObserved) || false,
      verbalNotes,
      socialObserved: Boolean(socialObserved) || false,
      socialNotes,
      solitaryObserved: Boolean(solitaryObserved) || false,
      solitaryNotes,
      
      // Social Role Tendency (Boolean @default(false) in Prisma)
      leaderRole: Boolean(leaderRole) || false,
      withdrawnRole: Boolean(withdrawnRole) || false,
      problemSolverRole: Boolean(problemSolverRole) || false,
      followerRole: Boolean(followerRole) || false,
      initiatorRole: Boolean(initiatorRole) || false,
      bridgerRole: Boolean(bridgerRole) || false,
      observerRole: Boolean(observerRole) || false,
      supporterRole: Boolean(supporterRole) || false,
      challengerRole: Boolean(challengerRole) || false,
      mediatorRole: Boolean(mediatorRole) || false,
      
      // Summary Reflections (String? in Prisma)
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

    if (!isDraft) {
      // Mark Peer Dynamic Observation as completed and advance stage to 7
      await prisma.application.update({ 
        where: { id: applicationId }, 
        data: { 
          currentStage: 7,
          isSeventhFormCompleted: true
        } 
      });

      // Update application status based on all form completions
      await updateApplicationStatus(applicationId, prisma);
    }
    
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
    
    // Convert integer ratings to strings for form compatibility
    // Prisma returns Int? but form expects strings
    if (record) {
      // Create a properly typed object for the form
      const formattedRecord: Record<string, any> = {
        ...record,
        // Convert all rating fields from Int? to string for Zod validation
        leadershipRating: toString(record.leadershipRating),
        collaborationRating: toString(record.collaborationRating),
        conflictResolutionRating: toString(record.conflictResolutionRating),
        communicationRating: toString(record.communicationRating),
        emotionalRegulationRating: toString(record.emotionalRegulationRating),
        empathyRating: toString(record.empathyRating),
        adaptabilityRating: toString(record.adaptabilityRating),
        initiativeRating: toString(record.initiativeRating),
      };
      
      return NextResponse.json({ success: true, data: formattedRecord });
    }
    
    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    console.error("Error fetching peer dynamic observation:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch form" }, { status: 500 });
  }
}