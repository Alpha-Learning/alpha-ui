import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { updateApplicationStatus } from "@/app/utils/applicationStatus";

export async function POST(request: NextRequest) {
  try {
    const {
      applicationId,
      isDraft = false,
      // Child Information
      fullName,
      age,
      date,
      examiner,
      childImage,
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
      existentialEvidence,
      existentialSupportingObservation,
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
      // Update existing form - only update fields that are provided
      const updateData: any = {};

      // Only include fields that are provided (not undefined)
      if (fullName !== undefined) updateData.fullName = fullName;
      if (age !== undefined) updateData.age = age;
      if (date !== undefined) updateData.date = date;
      if (examiner !== undefined) updateData.examiner = examiner;
      if (childImage !== undefined) updateData.childImage = childImage;
      
      // Zone-Based Engagement Grid
      if (zoneATimeSpent !== undefined) updateData.zoneATimeSpent = zoneATimeSpent;
      if (zoneASelfDirected !== undefined) updateData.zoneASelfDirected = zoneASelfDirected;
      if (zoneAObservations !== undefined) updateData.zoneAObservations = zoneAObservations;
      if (zoneAEngagementLevel !== undefined) updateData.zoneAEngagementLevel = zoneAEngagementLevel;
      if (zoneAKeyBehavioursNotes !== undefined) updateData.zoneAKeyBehavioursNotes = zoneAKeyBehavioursNotes;
      
      if (zoneBTimeSpent !== undefined) updateData.zoneBTimeSpent = zoneBTimeSpent;
      if (zoneBSelfDirected !== undefined) updateData.zoneBSelfDirected = zoneBSelfDirected;
      if (zoneBObservations !== undefined) updateData.zoneBObservations = zoneBObservations;
      if (zoneBEngagementLevel !== undefined) updateData.zoneBEngagementLevel = zoneBEngagementLevel;
      if (zoneBKeyBehavioursNotes !== undefined) updateData.zoneBKeyBehavioursNotes = zoneBKeyBehavioursNotes;
      
      if (zoneCTimeSpent !== undefined) updateData.zoneCTimeSpent = zoneCTimeSpent;
      if (zoneCSelfDirected !== undefined) updateData.zoneCSelfDirected = zoneCSelfDirected;
      if (zoneCObservations !== undefined) updateData.zoneCObservations = zoneCObservations;
      if (zoneCEngagementLevel !== undefined) updateData.zoneCEngagementLevel = zoneCEngagementLevel;
      if (zoneCKeyBehavioursNotes !== undefined) updateData.zoneCKeyBehavioursNotes = zoneCKeyBehavioursNotes;
      
      if (zoneDTimeSpent !== undefined) updateData.zoneDTimeSpent = zoneDTimeSpent;
      if (zoneDSelfDirected !== undefined) updateData.zoneDSelfDirected = zoneDSelfDirected;
      if (zoneDObservations !== undefined) updateData.zoneDObservations = zoneDObservations;
      if (zoneDEngagementLevel !== undefined) updateData.zoneDEngagementLevel = zoneDEngagementLevel;
      if (zoneDKeyBehavioursNotes !== undefined) updateData.zoneDKeyBehavioursNotes = zoneDKeyBehavioursNotes;
      
      // Meta Learning Skill Indicators
      if (selfRegulationObserved !== undefined) updateData.selfRegulationObserved = selfRegulationObserved;
      if (selfRegulationBehaviourNotes !== undefined) updateData.selfRegulationBehaviourNotes = selfRegulationBehaviourNotes;
      if (curiosityObserved !== undefined) updateData.curiosityObserved = curiosityObserved;
      if (curiosityBehaviourNotes !== undefined) updateData.curiosityBehaviourNotes = curiosityBehaviourNotes;
      if (socialEngagementObserved !== undefined) updateData.socialEngagementObserved = socialEngagementObserved;
      if (socialEngagementBehaviourNotes !== undefined) updateData.socialEngagementBehaviourNotes = socialEngagementBehaviourNotes;
      if (emotionalRegulationObserved !== undefined) updateData.emotionalRegulationObserved = emotionalRegulationObserved;
      if (emotionalRegulationBehaviourNotes !== undefined) updateData.emotionalRegulationBehaviourNotes = emotionalRegulationBehaviourNotes;
      if (confidenceAutonomyObserved !== undefined) updateData.confidenceAutonomyObserved = confidenceAutonomyObserved;
      if (confidenceAutonomyBehaviourNotes !== undefined) updateData.confidenceAutonomyBehaviourNotes = confidenceAutonomyBehaviourNotes;
      
      // Learning Preference & Intelligence Summary
      if (linguisticEvidence !== undefined) updateData.linguisticEvidence = linguisticEvidence;
      if (linguisticSupportingObservation !== undefined) updateData.linguisticSupportingObservation = linguisticSupportingObservation;
      if (logicalMathematicalEvidence !== undefined) updateData.logicalMathematicalEvidence = logicalMathematicalEvidence;
      if (logicalMathematicalSupportingObservation !== undefined) updateData.logicalMathematicalSupportingObservation = logicalMathematicalSupportingObservation;
      if (spatialEvidence !== undefined) updateData.spatialEvidence = spatialEvidence;
      if (spatialSupportingObservation !== undefined) updateData.spatialSupportingObservation = spatialSupportingObservation;
      if (bodilyKinestheticEvidence !== undefined) updateData.bodilyKinestheticEvidence = bodilyKinestheticEvidence;
      if (bodilyKinestheticSupportingObservation !== undefined) updateData.bodilyKinestheticSupportingObservation = bodilyKinestheticSupportingObservation;
      if (musicalEvidence !== undefined) updateData.musicalEvidence = musicalEvidence;
      if (musicalSupportingObservation !== undefined) updateData.musicalSupportingObservation = musicalSupportingObservation;
      if (interpersonalEvidence !== undefined) updateData.interpersonalEvidence = interpersonalEvidence;
      if (existentialEvidence !== undefined) updateData.existentialEvidence = existentialEvidence;
        if (existentialSupportingObservation !== undefined) updateData.existentialSupportingObservation = existentialSupportingObservation;
      if (interpersonalSupportingObservation !== undefined) updateData.interpersonalSupportingObservation = interpersonalSupportingObservation;
      if (intrapersonalEvidence !== undefined) updateData.intrapersonalEvidence = intrapersonalEvidence;
      if (intrapersonalSupportingObservation !== undefined) updateData.intrapersonalSupportingObservation = intrapersonalSupportingObservation;
      if (naturalisticEvidence !== undefined) updateData.naturalisticEvidence = naturalisticEvidence;
      if (naturalisticSupportingObservation !== undefined) updateData.naturalisticSupportingObservation = naturalisticSupportingObservation;
      
      // Parent-Child Dynamic Snapshot
      if (parentProximity !== undefined) updateData.parentProximity = parentProximity;
      if (parentInterventionLevel !== undefined) updateData.parentInterventionLevel = parentInterventionLevel;
      if (parentInterventionStyle !== undefined) updateData.parentInterventionStyle = parentInterventionStyle;
      if (childIndependenceLevel !== undefined) updateData.childIndependenceLevel = childIndependenceLevel;
      if (childEmotionalPresentationWithParent !== undefined) updateData.childEmotionalPresentationWithParent = childEmotionalPresentationWithParent;
      if (childIndependenceWhenParentEngaged !== undefined) updateData.childIndependenceWhenParentEngaged = childIndependenceWhenParentEngaged;
      if (emotionalRegulationWithParentPresent !== undefined) updateData.emotionalRegulationWithParentPresent = emotionalRegulationWithParentPresent;
      
      // Examiner Summary (Qualitative)
      if (mostEngagedZone !== undefined) updateData.mostEngagedZone = mostEngagedZone;
      if (dominantObservedIntelligences !== undefined) updateData.dominantObservedIntelligences = dominantObservedIntelligences;
      if (initialLearningStyleImpressions !== undefined) updateData.initialLearningStyleImpressions = initialLearningStyleImpressions;
      if (earlyFlagsNeedsFollowUp !== undefined) updateData.earlyFlagsNeedsFollowUp = earlyFlagsNeedsFollowUp;
      if (selfDirectedVsSeekingGuidance !== undefined) updateData.selfDirectedVsSeekingGuidance = selfDirectedVsSeekingGuidance;
      if (flagIndicators !== undefined) updateData.flagIndicators = flagIndicators;
      if (additionalNotesObservations !== undefined) updateData.additionalNotesObservations = additionalNotesObservations;
      
      // Office Use Only
      if (applicationNumber !== undefined) updateData.applicationNumber = applicationNumber;
      if (loggedToSystemDate !== undefined) updateData.loggedToSystemDate = loggedToSystemDate;
      if (loggedBy !== undefined) updateData.loggedBy = loggedBy;

      form = await prisma.initialObservationForm.update({
        where: { applicationId },
        data: updateData,
      });
    }
     else {
      // Create new form
      form = await prisma.initialObservationForm.create({
        data: {
          applicationId,
          // Child Information
          fullName,
          age,
          date,
          examiner,
          childImage,
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
          existentialEvidence,
           existentialSupportingObservation,
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

    if (!isDraft) {
    // Update application current stage to 4 and mark initial observation form as completed
    await prisma.application.update({
      where: { id: applicationId },
      data: { 
        // currentStage: 4,
        isFourthFormCompleted: true
      }
    });

    // Update application status based on all form completions
    await updateApplicationStatus(applicationId, prisma);
}
    return NextResponse.json({
      success: true,
      data: form,
      //message: "Initial observation form saved successfully",
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
