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

// List of all rating fields that need type conversion
const RATING_FIELDS = [
  'sharedIdeaExchangeRating',
  'emotionalWarmthRating',
  'balanceOfLeadershipRating',
  'communicationStyleRating',
  'mutualCreativityRating',
  'independenceRating',
  'confidenceHesitationRating',
  'taskEngagementRating',
  'creativeExpansionRating',
  'teachingStyleRating',
  'patienceEncouragementRating',
  'parentClarityRating',
  'childEngagementRating',
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      applicationId,
      isDraft = false, 
      // Child Information
      childFullName,
      childAge,
      date,
      examiner,
      parentPresence,
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

    // Build payload with proper type conversions
    // According to Prisma schema: ratings are Int?, strings are String?, booleans are Boolean
    const payload = {
      // Child Information (String? in Prisma)
      childFullName,
      childAge,
      date,
      examiner,
      parentPresence,
      
      // Joint Story Creation (10 minutes) - Convert to Int? for Prisma
      sharedIdeaExchangeRating: toInt(sharedIdeaExchangeRating),
      sharedIdeaExchangeNotes,
      emotionalWarmthRating: toInt(emotionalWarmthRating),
      emotionalWarmthNotes,
      balanceOfLeadershipRating: toInt(balanceOfLeadershipRating),
      balanceOfLeadershipNotes,
      communicationStyleRating: toInt(communicationStyleRating),
      communicationStyleNotes,
      mutualCreativityRating: toInt(mutualCreativityRating),
      mutualCreativityNotes,
      
      // Separation - Child Continues Solo (10 minutes) - Convert to Int? for Prisma
      independenceRating: toInt(independenceRating),
      independenceNotes,
      confidenceHesitationRating: toInt(confidenceHesitationRating),
      confidenceHesitationNotes,
      taskEngagementRating: toInt(taskEngagementRating),
      taskEngagementNotes,
      creativeExpansionRating: toInt(creativeExpansionRating),
      creativeExpansionNotes,
      
      // Teaching Moment - Comic Strip (10 minutes) - Convert to Int? for Prisma
      teachingStyleRating: toInt(teachingStyleRating),
      teachingStyleNotes,
      patienceEncouragementRating: toInt(patienceEncouragementRating),
      patienceEncouragementNotes,
      parentClarityRating: toInt(parentClarityRating),
      parentClarityNotes,
      childEngagementRating: toInt(childEngagementRating),
      childEngagementNotes,
      
      // Parenting Style & Dynamic Insights (Boolean @default(false) in Prisma)
      parentDominantStyleDirective: Boolean(parentDominantStyleDirective) || false,
      parentDominantStyleSupportive: Boolean(parentDominantStyleSupportive) || false,
      parentDominantStyleDetached: Boolean(parentDominantStyleDetached) || false,
      parentDominantStyleFacilitative: Boolean(parentDominantStyleFacilitative) || false,
      emotionalAttunementHigh: Boolean(emotionalAttunementHigh) || false,
      emotionalAttunementModerate: Boolean(emotionalAttunementModerate) || false,
      emotionalAttunementLow: Boolean(emotionalAttunementLow) || false,
      encouragementStylePraiseFocused: Boolean(encouragementStylePraiseFocused) || false,
      encouragementStyleProcessFocused: Boolean(encouragementStyleProcessFocused) || false,
      encouragementStyleCorrectionFocused: Boolean(encouragementStyleCorrectionFocused) || false,
      attachmentSignalSecure: Boolean(attachmentSignalSecure) || false,
      attachmentSignalAnxious: Boolean(attachmentSignalAnxious) || false,
      attachmentSignalAvoidant: Boolean(attachmentSignalAvoidant) || false,
      attachmentSignalDisengaged: Boolean(attachmentSignalDisengaged) || false,
      
      // Child Meta-Skills During Assessment (Boolean @default(false) in Prisma)
      confidenceAutonomyObserved: Boolean(confidenceAutonomyObserved) || false,
      confidenceAutonomyNotes,
      emotionalRegulationObserved: Boolean(emotionalRegulationObserved) || false,
      emotionalRegulationNotes,
      curiosityObserved: Boolean(curiosityObserved) || false,
      curiosityNotes,
      creativityExpressionObserved: Boolean(creativityExpressionObserved) || false,
      creativityExpressionNotes,
      selfDirectedLearningObserved: Boolean(selfDirectedLearningObserved) || false,
      selfDirectedLearningNotes,
      communicationObserved: Boolean(communicationObserved) || false,
      communicationNotes,
      
      // Learning Type & Intelligence Clues (Boolean @default(false) in Prisma)
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
      
      // Dynamic Summary & Reflection (String? in Prisma)
      parentChildDynamicStandout,
      childExpressiveWithWithoutParent,
      parentGuidanceHindrance,
      
      // Red Flags or Follow-up Needs (Boolean @default(false) in Prisma)
      emotionalDistressFlag: Boolean(emotionalDistressFlag) || false,
      parentOverDirectionFlag: Boolean(parentOverDirectionFlag) || false,
      confidenceIssueFlag: Boolean(confidenceIssueFlag) || false,
      noFlagsFlag: Boolean(noFlagsFlag) || false,
      redFlagsNotes,
      
      // Office Use Only (String? in Prisma)
      applicationNumber,
      observerName,
      assessmentDate,
      loggedToSystemDate,
      loggedBy,
    };

    let record;
    if (existing) {
      record = await prisma.parentChildDynamicObservation.update({ 
        where: { applicationId }, 
        data: payload 
      });
    } else {
      record = await prisma.parentChildDynamicObservation.create({ 
        data: { applicationId, ...payload } 
      });
    }

    if (!isDraft) {
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
    }
    
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
  
    const record = await prisma.parentChildDynamicObservation.findUnique({ 
      where: { applicationId } 
    });
    
    // Convert integer ratings to strings for form compatibility
    // Prisma returns Int? but form expects strings
    if (record) {
      // Create a new object with proper typing - convert number fields to strings
      const formattedRecord = {
        ...record,
        // Convert all rating fields from Int? to string for Zod validation
        sharedIdeaExchangeRating: toString(record.sharedIdeaExchangeRating),
        emotionalWarmthRating: toString(record.emotionalWarmthRating),
        balanceOfLeadershipRating: toString(record.balanceOfLeadershipRating),
        communicationStyleRating: toString(record.communicationStyleRating),
        mutualCreativityRating: toString(record.mutualCreativityRating),
        independenceRating: toString(record.independenceRating),
        confidenceHesitationRating: toString(record.confidenceHesitationRating),
        taskEngagementRating: toString(record.taskEngagementRating),
        creativeExpansionRating: toString(record.creativeExpansionRating),
        teachingStyleRating: toString(record.teachingStyleRating),
        patienceEncouragementRating: toString(record.patienceEncouragementRating),
        parentClarityRating: toString(record.parentClarityRating),
        childEngagementRating: toString(record.childEngagementRating),
      } as any; // Type assertion to allow string values for number fields
      
      return NextResponse.json({ success: true, data: formattedRecord });
    }
    
    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    console.error("Error fetching parent-child dynamic observation:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch form" }, { status: 500 });
  }
}