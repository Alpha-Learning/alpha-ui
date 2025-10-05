import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { updateApplicationStatus } from "@/app/utils/applicationStatus";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      applicationId,
      // Child Information
      childName,
      childAge,
      assessmentDate,
      recommendedPlacement,
      examiner,
      
      // Cognitive Skills Profile
      processingSpeedSteadyReflective,
      processingSpeedFlexibleAdaptive,
      processingSpeedRapidResponsive,
      workingMemoryAreaOfGrowth,
      workingMemoryDeveloping,
      workingMemoryConsistentConfident,
      attentionFocusVariable,
      attentionFocusFocusedWithCues,
      attentionFocusSelfDirected,
      verbalReasoningExploring,
      verbalReasoningDeveloping,
      verbalReasoningFluentCommunicator,
      phonologicalAwarenessExploring,
      phonologicalAwarenessLinking,
      phonologicalAwarenessConfident,
      visualSpatialSkillsExploring,
      visualSpatialSkillsDeveloping,
      visualSpatialSkillsConfident,
      numericalPatternConcrete,
      numericalPatternEmergingAbstract,
      numericalPatternFlexibleThinker,
      additionalCognitiveNotes,
      
      // Learning Style Preference
      visualObserved,
      visualObservedEvidence,
      auditoryObserved,
      auditoryObservedEvidence,
      kinestheticTactileObserved,
      kinestheticTactileObservedEvidence,
      readingWritingObserved,
      readingWritingObservedEvidence,
      verbalLinguisticObserved,
      verbalLinguisticObservedEvidence,
      logicalMathematicalObserved,
      logicalMathematicalObservedEvidence,
      socialInterpersonalObserved,
      socialInterpersonalObservedEvidence,
      solitaryIntrapersonalObserved,
      solitaryIntrapersonalObservedEvidence,
      multimodalObserved,
      multimodalObservedEvidence,
      
      // Dominant Intelligence Types
      linguisticObserved,
      linguisticStronglyEvident,
      linguisticNotes,
      logicalMathematicalObservedInt,
      logicalMathematicalStronglyEvidentInt,
      logicalMathematicalNotesInt,
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
      
      // Meta-Learning Pillars & Soft Skills Profile
      summaryInsightLearnerType,
      summaryInsightLearningEnvironments,
      selfRegulationEmerging,
      selfRegulationDeveloping,
      selfRegulationStrong,
      selfRegulationNotesEvidence,
      emotionalIntelligenceEmerging,
      emotionalIntelligenceDeveloping,
      emotionalIntelligenceStrong,
      emotionalIntelligenceNotesEvidence,
      socialCommunicationEmerging,
      socialCommunicationDeveloping,
      socialCommunicationStrong,
      socialCommunicationNotesEvidence,
      cognitiveFlexibilityEmerging,
      cognitiveFlexibilityDeveloping,
      cognitiveFlexibilityStrong,
      cognitiveFlexibilityNotesEvidence,
      resilienceConfidenceEmerging,
      resilienceConfidenceDeveloping,
      resilienceConfidenceStrong,
      resilienceConfidenceNotesEvidence,
      creativityExpressionEmerging,
      creativityExpressionDeveloping,
      creativityExpressionStrong,
      creativityExpressionNotesEvidence,
      softSkillSummaryNotes,
      
      // Academic & Digital Readiness
      englishCurrentLevel,
      englishNotes,
      mathsCurrentLevel,
      mathsNotes,
      scienceCurrentLevel,
      scienceNotes,
      technologyUseLow,
      technologyUseModerate,
      technologyUseHigh,
      technologyUseExceptional,
      academicNotes,
      
      // Interview-Based Verbal Assessment Summary
      zonesADPreferredZones,
      zonesADSelfDirectedOrReliant,
      zonesADResponseToChallenge,
      zonesADEvidenceDominantIntelligence,
      peerSessionInitiateOrFollow,
      peerSessionRoleAdopted,
      peerSessionConflictHandled,
      parentChildEmotionalTone,
      parentChildFacilitativeVsDirective,
      parentChildResponseWorkingSolo,
      ks1Score,
      ks1InterpretationEmerging,
      ks1InterpretationBasic,
      ks1InterpretationStrong,
      ks1InterpretationExceptional,
      ks1SuggestedAction,
      ks1ScoreRange1325Action,
      ks1ScoreRange2640Action,
      ks1ScoreRange4155Action,
      ks1ScoreRange5665Action,
      ks2Score,
      ks2InterpretationEmerging,
      ks2InterpretationBasic,
      ks2InterpretationStrong,
      ks2InterpretationExceptional,
      ks2SuggestedAction,
      ks2ScoreRange2044Action,
      ks2ScoreRange4569Action,
      ks2ScoreRange7089Action,
      ks2ScoreRange9095Action,
      qualitativeInsightsVerbalResponses,
      
      // Component Recommendations
      aiCurriculumEntryPoint,
      peerEngagementGroupLearning,
      peerEngagementNeedsScaffolding,
      peerEngagementMonitorConflict,
      mentorshipLeadershipPotential,
      mentorshipRecommendOneOnOne,
      mentorshipNotApplicable,
      homeSupportTips,
      
      // Final Summary Statement
      finalSummaryStrengths,
      finalSummaryApproaches,
      finalSummaryTargetedSupport,
      compiledBy,
      compiledDate,
    } = body;

    if (!applicationId) {
      return NextResponse.json({ success: false, error: "Application ID is required" }, { status: 400 });
    }

    const existing = await prisma.comprehensiveProfileSheet.findUnique({ where: { applicationId } });

    const payload = {
      // Child Information
      childName,
      childAge,
      assessmentDate,
      recommendedPlacement,
      examiner,
      
      // Cognitive Skills Profile
      processingSpeedSteadyReflective: processingSpeedSteadyReflective || false,
      processingSpeedFlexibleAdaptive: processingSpeedFlexibleAdaptive || false,
      processingSpeedRapidResponsive: processingSpeedRapidResponsive || false,
      workingMemoryAreaOfGrowth: workingMemoryAreaOfGrowth || false,
      workingMemoryDeveloping: workingMemoryDeveloping || false,
      workingMemoryConsistentConfident: workingMemoryConsistentConfident || false,
      attentionFocusVariable: attentionFocusVariable || false,
      attentionFocusFocusedWithCues: attentionFocusFocusedWithCues || false,
      attentionFocusSelfDirected: attentionFocusSelfDirected || false,
      verbalReasoningExploring: verbalReasoningExploring || false,
      verbalReasoningDeveloping: verbalReasoningDeveloping || false,
      verbalReasoningFluentCommunicator: verbalReasoningFluentCommunicator || false,
      phonologicalAwarenessExploring: phonologicalAwarenessExploring || false,
      phonologicalAwarenessLinking: phonologicalAwarenessLinking || false,
      phonologicalAwarenessConfident: phonologicalAwarenessConfident || false,
      visualSpatialSkillsExploring: visualSpatialSkillsExploring || false,
      visualSpatialSkillsDeveloping: visualSpatialSkillsDeveloping || false,
      visualSpatialSkillsConfident: visualSpatialSkillsConfident || false,
      numericalPatternConcrete: numericalPatternConcrete || false,
      numericalPatternEmergingAbstract: numericalPatternEmergingAbstract || false,
      numericalPatternFlexibleThinker: numericalPatternFlexibleThinker || false,
      additionalCognitiveNotes,
      
      // Learning Style Preference
      visualObserved: visualObserved || false,
      visualObservedEvidence,
      auditoryObserved: auditoryObserved || false,
      auditoryObservedEvidence,
      kinestheticTactileObserved: kinestheticTactileObserved || false,
      kinestheticTactileObservedEvidence,
      readingWritingObserved: readingWritingObserved || false,
      readingWritingObservedEvidence,
      verbalLinguisticObserved: verbalLinguisticObserved || false,
      verbalLinguisticObservedEvidence,
      logicalMathematicalObserved: logicalMathematicalObserved || false,
      logicalMathematicalObservedEvidence,
      socialInterpersonalObserved: socialInterpersonalObserved || false,
      socialInterpersonalObservedEvidence,
      solitaryIntrapersonalObserved: solitaryIntrapersonalObserved || false,
      solitaryIntrapersonalObservedEvidence,
      multimodalObserved: multimodalObserved || false,
      multimodalObservedEvidence,
      
      // Dominant Intelligence Types
      linguisticObserved: linguisticObserved || false,
      linguisticStronglyEvident: linguisticStronglyEvident || false,
      linguisticNotes,
      logicalMathematicalObservedInt: logicalMathematicalObservedInt || false,
      logicalMathematicalStronglyEvidentInt: logicalMathematicalStronglyEvidentInt || false,
      logicalMathematicalNotesInt,
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
      
      // Meta-Learning Pillars & Soft Skills Profile
      summaryInsightLearnerType,
      summaryInsightLearningEnvironments,
      selfRegulationEmerging: selfRegulationEmerging || false,
      selfRegulationDeveloping: selfRegulationDeveloping || false,
      selfRegulationStrong: selfRegulationStrong || false,
      selfRegulationNotesEvidence,
      emotionalIntelligenceEmerging: emotionalIntelligenceEmerging || false,
      emotionalIntelligenceDeveloping: emotionalIntelligenceDeveloping || false,
      emotionalIntelligenceStrong: emotionalIntelligenceStrong || false,
      emotionalIntelligenceNotesEvidence,
      socialCommunicationEmerging: socialCommunicationEmerging || false,
      socialCommunicationDeveloping: socialCommunicationDeveloping || false,
      socialCommunicationStrong: socialCommunicationStrong || false,
      socialCommunicationNotesEvidence,
      cognitiveFlexibilityEmerging: cognitiveFlexibilityEmerging || false,
      cognitiveFlexibilityDeveloping: cognitiveFlexibilityDeveloping || false,
      cognitiveFlexibilityStrong: cognitiveFlexibilityStrong || false,
      cognitiveFlexibilityNotesEvidence,
      resilienceConfidenceEmerging: resilienceConfidenceEmerging || false,
      resilienceConfidenceDeveloping: resilienceConfidenceDeveloping || false,
      resilienceConfidenceStrong: resilienceConfidenceStrong || false,
      resilienceConfidenceNotesEvidence,
      creativityExpressionEmerging: creativityExpressionEmerging || false,
      creativityExpressionDeveloping: creativityExpressionDeveloping || false,
      creativityExpressionStrong: creativityExpressionStrong || false,
      creativityExpressionNotesEvidence,
      softSkillSummaryNotes,
      
      // Academic & Digital Readiness
      englishCurrentLevel,
      englishNotes,
      mathsCurrentLevel,
      mathsNotes,
      scienceCurrentLevel,
      scienceNotes,
      technologyUseLow: technologyUseLow || false,
      technologyUseModerate: technologyUseModerate || false,
      technologyUseHigh: technologyUseHigh || false,
      technologyUseExceptional: technologyUseExceptional || false,
      academicNotes,
      
      // Interview-Based Verbal Assessment Summary
      zonesADPreferredZones,
      zonesADSelfDirectedOrReliant,
      zonesADResponseToChallenge,
      zonesADEvidenceDominantIntelligence,
      peerSessionInitiateOrFollow,
      peerSessionRoleAdopted,
      peerSessionConflictHandled,
      parentChildEmotionalTone,
      parentChildFacilitativeVsDirective,
      parentChildResponseWorkingSolo,
      ks1Score: ks1Score ? parseInt(ks1Score) : null,
      ks1InterpretationEmerging: ks1InterpretationEmerging || false,
      ks1InterpretationBasic: ks1InterpretationBasic || false,
      ks1InterpretationStrong: ks1InterpretationStrong || false,
      ks1InterpretationExceptional: ks1InterpretationExceptional || false,
      ks1SuggestedAction,
      ks1ScoreRange1325Action,
      ks1ScoreRange2640Action,
      ks1ScoreRange4155Action,
      ks1ScoreRange5665Action,
      ks2Score: ks2Score ? parseInt(ks2Score) : null,
      ks2InterpretationEmerging: ks2InterpretationEmerging || false,
      ks2InterpretationBasic: ks2InterpretationBasic || false,
      ks2InterpretationStrong: ks2InterpretationStrong || false,
      ks2InterpretationExceptional: ks2InterpretationExceptional || false,
      ks2SuggestedAction,
      ks2ScoreRange2044Action,
      ks2ScoreRange4569Action,
      ks2ScoreRange7089Action,
      ks2ScoreRange9095Action,
      qualitativeInsightsVerbalResponses,
      
      // Component Recommendations
      aiCurriculumEntryPoint,
      peerEngagementGroupLearning: peerEngagementGroupLearning || false,
      peerEngagementNeedsScaffolding: peerEngagementNeedsScaffolding || false,
      peerEngagementMonitorConflict: peerEngagementMonitorConflict || false,
      mentorshipLeadershipPotential: mentorshipLeadershipPotential || false,
      mentorshipRecommendOneOnOne: mentorshipRecommendOneOnOne || false,
      mentorshipNotApplicable: mentorshipNotApplicable || false,
      homeSupportTips,
      
      // Final Summary Statement
      finalSummaryStrengths,
      finalSummaryApproaches,
      finalSummaryTargetedSupport,
      compiledBy,
      compiledDate,
    };

    let record;
    if (existing) {
      record = await prisma.comprehensiveProfileSheet.update({ where: { applicationId }, data: payload });
    } else {
      record = await prisma.comprehensiveProfileSheet.create({ data: { applicationId, ...payload } });
    }

    // Mark Comprehensive Profile Sheet as completed and advance stage to 10
    await prisma.application.update({ 
      where: { id: applicationId }, 
      data: { 
        currentStage: 10,
        isTenthFormCompleted: true
      } 
    });

    // Update application status based on all form completions
    await updateApplicationStatus(applicationId, prisma);

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error saving comprehensive profile sheet:", error);
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
  
    const record = await prisma.comprehensiveProfileSheet.findUnique({ where: { applicationId } });
    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error fetching comprehensive profile sheet:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch form" }, { status: 500 });
  }
}
