import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { updateApplicationStatus } from "@/app/utils/applicationStatus";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      applicationId,
      // Child Information
      childFullName,
      childAge,
      date,
      examiner,
      // Joint Story Creation (10 minutes)
      sharedIdeaExchangeRating,
      sharedIdeaExchangeNotes,
      emotionalWarmthRating,
      emotionalWarmthNotes,
      balanceOfLeadershipRating,
      balanceOfLeadershipNotes,
      communicationStyleRating,
      communicationStyleNotes,
      mutualCreativityRating,
      mutualCreativityNotes,
      // Separation - Child Continues Solo (10 minutes)
      independenceRating,
      independenceNotes,
      confidenceHesitationRating,
      confidenceHesitationNotes,
      taskEngagementRating,
      taskEngagementNotes,
      creativeExpansionRating,
      creativeExpansionNotes,
      // Teaching Moment - Comic Strip (10 minutes)
      teachingStyleRating,
      teachingStyleNotes,
      patienceEncouragementRating,
      patienceEncouragementNotes,
      parentClarityRating,
      parentClarityNotes,
      childEngagementRating,
      childEngagementNotes,
      // Parenting Style & Dynamic Insights
      parentDominantStyleDirective,
      parentDominantStyleSupportive,
      parentDominantStyleDetached,
      parentDominantStyleFacilitative,
      emotionalAttunementHigh,
      emotionalAttunementModerate,
      emotionalAttunementLow,
      encouragementStylePraiseFocused,
      encouragementStyleProcessFocused,
      encouragementStyleCorrectionFocused,
      attachmentSignalSecure,
      attachmentSignalAnxious,
      attachmentSignalAvoidant,
      attachmentSignalDisengaged,
      // Child Meta-Skills During Assessment
      confidenceAutonomyObserved,
      confidenceAutonomyNotes,
      emotionalRegulationObserved,
      emotionalRegulationNotes,
      curiosityObserved,
      curiosityNotes,
      creativityExpressionObserved,
      creativityExpressionNotes,
      selfDirectedLearningObserved,
      selfDirectedLearningNotes,
      communicationObserved,
      communicationNotes,
      // Learning Type & Intelligence Clues
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
      // Dynamic Summary & Reflection
      parentChildDynamicStandout,
      childExpressiveWithWithoutParent,
      parentGuidanceHindrance,
      // Red Flags or Follow-up Needs
      emotionalDistressFlag,
      parentOverDirectionFlag,
      confidenceIssueFlag,
      noFlagsFlag,
      redFlagsNotes,
      // Office Use Only
      applicationNumber,
      observerName,
      assessmentDate,
      loggedToSystemDate,
      loggedBy,
    } = body;

    if (!applicationId) {
      return NextResponse.json({ success: false, error: "Application ID is required" }, { status: 400 });
    }

    const existing = await prisma.parentChildDynamicObservation.findUnique({ where: { applicationId } });

    const payload = {
      // Child Information
      childFullName,
      childAge,
      date,
      examiner,
      // Joint Story Creation (10 minutes) - convert string ratings to integers
      sharedIdeaExchangeRating: sharedIdeaExchangeRating ? parseInt(sharedIdeaExchangeRating) : null,
      sharedIdeaExchangeNotes,
      emotionalWarmthRating: emotionalWarmthRating ? parseInt(emotionalWarmthRating) : null,
      emotionalWarmthNotes,
      balanceOfLeadershipRating: balanceOfLeadershipRating ? parseInt(balanceOfLeadershipRating) : null,
      balanceOfLeadershipNotes,
      communicationStyleRating: communicationStyleRating ? parseInt(communicationStyleRating) : null,
      communicationStyleNotes,
      mutualCreativityRating: mutualCreativityRating ? parseInt(mutualCreativityRating) : null,
      mutualCreativityNotes,
      // Separation - Child Continues Solo (10 minutes)
      independenceRating: independenceRating ? parseInt(independenceRating) : null,
      independenceNotes,
      confidenceHesitationRating: confidenceHesitationRating ? parseInt(confidenceHesitationRating) : null,
      confidenceHesitationNotes,
      taskEngagementRating: taskEngagementRating ? parseInt(taskEngagementRating) : null,
      taskEngagementNotes,
      creativeExpansionRating: creativeExpansionRating ? parseInt(creativeExpansionRating) : null,
      creativeExpansionNotes,
      // Teaching Moment - Comic Strip (10 minutes)
      teachingStyleRating: teachingStyleRating ? parseInt(teachingStyleRating) : null,
      teachingStyleNotes,
      patienceEncouragementRating: patienceEncouragementRating ? parseInt(patienceEncouragementRating) : null,
      patienceEncouragementNotes,
      parentClarityRating: parentClarityRating ? parseInt(parentClarityRating) : null,
      parentClarityNotes,
      childEngagementRating: childEngagementRating ? parseInt(childEngagementRating) : null,
      childEngagementNotes,
      // Parenting Style & Dynamic Insights
      parentDominantStyleDirective: parentDominantStyleDirective || false,
      parentDominantStyleSupportive: parentDominantStyleSupportive || false,
      parentDominantStyleDetached: parentDominantStyleDetached || false,
      parentDominantStyleFacilitative: parentDominantStyleFacilitative || false,
      emotionalAttunementHigh: emotionalAttunementHigh || false,
      emotionalAttunementModerate: emotionalAttunementModerate || false,
      emotionalAttunementLow: emotionalAttunementLow || false,
      encouragementStylePraiseFocused: encouragementStylePraiseFocused || false,
      encouragementStyleProcessFocused: encouragementStyleProcessFocused || false,
      encouragementStyleCorrectionFocused: encouragementStyleCorrectionFocused || false,
      attachmentSignalSecure: attachmentSignalSecure || false,
      attachmentSignalAnxious: attachmentSignalAnxious || false,
      attachmentSignalAvoidant: attachmentSignalAvoidant || false,
      attachmentSignalDisengaged: attachmentSignalDisengaged || false,
      // Child Meta-Skills During Assessment
      confidenceAutonomyObserved: confidenceAutonomyObserved || false,
      confidenceAutonomyNotes,
      emotionalRegulationObserved: emotionalRegulationObserved || false,
      emotionalRegulationNotes,
      curiosityObserved: curiosityObserved || false,
      curiosityNotes,
      creativityExpressionObserved: creativityExpressionObserved || false,
      creativityExpressionNotes,
      selfDirectedLearningObserved: selfDirectedLearningObserved || false,
      selfDirectedLearningNotes,
      communicationObserved: communicationObserved || false,
      communicationNotes,
      // Learning Type & Intelligence Clues
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
      // Dynamic Summary & Reflection
      parentChildDynamicStandout,
      childExpressiveWithWithoutParent,
      parentGuidanceHindrance,
      // Red Flags or Follow-up Needs
      emotionalDistressFlag: emotionalDistressFlag || false,
      parentOverDirectionFlag: parentOverDirectionFlag || false,
      confidenceIssueFlag: confidenceIssueFlag || false,
      noFlagsFlag: noFlagsFlag || false,
      redFlagsNotes,
      // Office Use Only
      applicationNumber,
      observerName,
      assessmentDate,
      loggedToSystemDate,
      loggedBy,
    };

    let record;
    if (existing) {
      record = await prisma.parentChildDynamicObservation.update({ where: { applicationId }, data: payload });
    } else {
      record = await prisma.parentChildDynamicObservation.create({ data: { applicationId, ...payload } });
    }

    // Mark Parent-Child Dynamic Observation as completed and advance stage to 6
    await prisma.application.update({ 
      where: { id: applicationId }, 
      data: { 
        currentStage: 6,
        isSixthFormCompleted: true
      } 
    });

    // Update application status based on all form completions
    await updateApplicationStatus(applicationId, prisma);

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error saving parent-child dynamic observation:", error);
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
  
    const record = await prisma.parentChildDynamicObservation.findUnique({ where: { applicationId } });
    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error fetching parent-child dynamic observation:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch form" }, { status: 500 });
  }
}
