"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  Input,
  Textarea,
  FormSectionHeader,
} from "@/app/components/forms/FormField";
import { apiService } from "@/app/utils";

const schema = z.object({
  // Child Information
  childName: z.string().min(1, "Required"),
  childAge: z.string().min(1, "Required"),
  assessmentDate: z.string().min(1, "Required"),
  recommendedPlacement: z.string().min(1, "Required"),
  examiner: z.string().min(1, "Required"),
  
  // Cognitive Skills Profile
  processingSpeedSteadyReflective: z.boolean().default(false),
  processingSpeedFlexibleAdaptive: z.boolean().default(false),
  processingSpeedRapidResponsive: z.boolean().default(false),
  workingMemoryAreaOfGrowth: z.boolean().default(false),
  workingMemoryDeveloping: z.boolean().default(false),
  workingMemoryConsistentConfident: z.boolean().default(false),
  attentionFocusVariable: z.boolean().default(false),
  attentionFocusFocusedWithCues: z.boolean().default(false),
  attentionFocusSelfDirected: z.boolean().default(false),
  verbalReasoningExploring: z.boolean().default(false),
  verbalReasoningDeveloping: z.boolean().default(false),
  verbalReasoningFluentCommunicator: z.boolean().default(false),
  phonologicalAwarenessExploring: z.boolean().default(false),
  phonologicalAwarenessLinking: z.boolean().default(false),
  phonologicalAwarenessConfident: z.boolean().default(false),
  visualSpatialSkillsExploring: z.boolean().default(false),
  visualSpatialSkillsDeveloping: z.boolean().default(false),
  visualSpatialSkillsConfident: z.boolean().default(false),
  numericalPatternConcrete: z.boolean().default(false),
  numericalPatternEmergingAbstract: z.boolean().default(false),
  numericalPatternFlexibleThinker: z.boolean().default(false),
  additionalCognitiveNotes: z.string().optional(),
  
  // Learning Style Preference
  visualObserved: z.boolean().default(false),
  visualObservedEvidence: z.string().optional(),
  auditoryObserved: z.boolean().default(false),
  auditoryObservedEvidence: z.string().optional(),
  kinestheticTactileObserved: z.boolean().default(false),
  kinestheticTactileObservedEvidence: z.string().optional(),
  readingWritingObserved: z.boolean().default(false),
  readingWritingObservedEvidence: z.string().optional(),
  verbalLinguisticObserved: z.boolean().default(false),
  verbalLinguisticObservedEvidence: z.string().optional(),
  logicalMathematicalObserved: z.boolean().default(false),
  logicalMathematicalObservedEvidence: z.string().optional(),
  socialInterpersonalObserved: z.boolean().default(false),
  socialInterpersonalObservedEvidence: z.string().optional(),
  solitaryIntrapersonalObserved: z.boolean().default(false),
  solitaryIntrapersonalObservedEvidence: z.string().optional(),
  multimodalObserved: z.boolean().default(false),
  multimodalObservedEvidence: z.string().optional(),
  
  // Dominant Intelligence Types
  linguisticObserved: z.boolean().default(false),
  linguisticStronglyEvident: z.boolean().default(false),
  linguisticNotes: z.string().optional(),
  logicalMathematicalObservedInt: z.boolean().default(false),
  logicalMathematicalStronglyEvidentInt: z.boolean().default(false),
  logicalMathematicalNotesInt: z.string().optional(),
  spatialObserved: z.boolean().default(false),
  spatialStronglyEvident: z.boolean().default(false),
  spatialNotes: z.string().optional(),
  bodilyKinestheticObserved: z.boolean().default(false),
  bodilyKinestheticStronglyEvident: z.boolean().default(false),
  bodilyKinestheticNotes: z.string().optional(),
  musicalObserved: z.boolean().default(false),
  musicalStronglyEvident: z.boolean().default(false),
  musicalNotes: z.string().optional(),
  interpersonalObserved: z.boolean().default(false),
  interpersonalStronglyEvident: z.boolean().default(false),
  interpersonalNotes: z.string().optional(),
  intrapersonalObserved: z.boolean().default(false),
  intrapersonalStronglyEvident: z.boolean().default(false),
  intrapersonalNotes: z.string().optional(),
  naturalisticObserved: z.boolean().default(false),
  naturalisticStronglyEvident: z.boolean().default(false),
  naturalisticNotes: z.string().optional(),
  existentialObserved: z.boolean().default(false),
  existentialStronglyEvident: z.boolean().default(false),
  existentialNotes: z.string().optional(),
  
  // Meta-Learning Pillars & Soft Skills Profile
  summaryInsightLearnerType: z.string().optional(),
  summaryInsightLearningEnvironments: z.string().optional(),
  selfRegulationEmerging: z.boolean().default(false),
  selfRegulationDeveloping: z.boolean().default(false),
  selfRegulationStrong: z.boolean().default(false),
  selfRegulationNotesEvidence: z.string().optional(),
  emotionalIntelligenceEmerging: z.boolean().default(false),
  emotionalIntelligenceDeveloping: z.boolean().default(false),
  emotionalIntelligenceStrong: z.boolean().default(false),
  emotionalIntelligenceNotesEvidence: z.string().optional(),
  socialCommunicationEmerging: z.boolean().default(false),
  socialCommunicationDeveloping: z.boolean().default(false),
  socialCommunicationStrong: z.boolean().default(false),
  socialCommunicationNotesEvidence: z.string().optional(),
  cognitiveFlexibilityEmerging: z.boolean().default(false),
  cognitiveFlexibilityDeveloping: z.boolean().default(false),
  cognitiveFlexibilityStrong: z.boolean().default(false),
  cognitiveFlexibilityNotesEvidence: z.string().optional(),
  resilienceConfidenceEmerging: z.boolean().default(false),
  resilienceConfidenceDeveloping: z.boolean().default(false),
  resilienceConfidenceStrong: z.boolean().default(false),
  resilienceConfidenceNotesEvidence: z.string().optional(),
  creativityExpressionEmerging: z.boolean().default(false),
  creativityExpressionDeveloping: z.boolean().default(false),
  creativityExpressionStrong: z.boolean().default(false),
  creativityExpressionNotesEvidence: z.string().optional(),
  softSkillSummaryNotes: z.string().optional(),
  
  // Academic & Digital Readiness
  englishCurrentLevel: z.string().optional(),
  englishNotes: z.string().optional(),
  mathsCurrentLevel: z.string().optional(),
  mathsNotes: z.string().optional(),
  scienceCurrentLevel: z.string().optional(),
  scienceNotes: z.string().optional(),
  technologyUseLow: z.boolean().default(false),
  technologyUseModerate: z.boolean().default(false),
  technologyUseHigh: z.boolean().default(false),
  technologyUseExceptional: z.boolean().default(false),
  academicNotes: z.string().optional(),
  
  // Interview-Based Verbal Assessment Summary
  zonesADPreferredZones: z.string().optional(),
  zonesADSelfDirectedOrReliant: z.string().optional(),
  zonesADResponseToChallenge: z.string().optional(),
  zonesADEvidenceDominantIntelligence: z.string().optional(),
  peerSessionInitiateOrFollow: z.string().optional(),
  peerSessionRoleAdopted: z.string().optional(),
  peerSessionConflictHandled: z.string().optional(),
  parentChildEmotionalTone: z.string().optional(),
  parentChildFacilitativeVsDirective: z.string().optional(),
  parentChildResponseWorkingSolo: z.string().optional(),
  ks1Score: z.string().optional(),
  ks1InterpretationEmerging: z.boolean().default(false),
  ks1InterpretationBasic: z.boolean().default(false),
  ks1InterpretationStrong: z.boolean().default(false),
  ks1InterpretationExceptional: z.boolean().default(false),
  ks1SuggestedAction: z.string().optional(),
  ks1ScoreRange1325Action: z.string().optional(),
  ks1ScoreRange2640Action: z.string().optional(),
  ks1ScoreRange4155Action: z.string().optional(),
  ks1ScoreRange5665Action: z.string().optional(),
  ks2Score: z.string().optional(),
  ks2InterpretationEmerging: z.boolean().default(false),
  ks2InterpretationBasic: z.boolean().default(false),
  ks2InterpretationStrong: z.boolean().default(false),
  ks2InterpretationExceptional: z.boolean().default(false),
  ks2SuggestedAction: z.string().optional(),
  ks2ScoreRange2044Action: z.string().optional(),
  ks2ScoreRange4569Action: z.string().optional(),
  ks2ScoreRange7089Action: z.string().optional(),
  ks2ScoreRange9095Action: z.string().optional(),
  qualitativeInsightsVerbalResponses: z.string().optional(),
  
  // Component Recommendations
  aiCurriculumEntryPoint: z.string().optional(),
  peerEngagementGroupLearning: z.boolean().default(false),
  peerEngagementNeedsScaffolding: z.boolean().default(false),
  peerEngagementMonitorConflict: z.boolean().default(false),
  mentorshipLeadershipPotential: z.boolean().default(false),
  mentorshipRecommendOneOnOne: z.boolean().default(false),
  mentorshipNotApplicable: z.boolean().default(false),
  homeSupportTips: z.string().optional(),
  
  // Final Summary Statement
  finalSummaryStrengths: z.string().optional(),
  finalSummaryApproaches: z.string().optional(),
  finalSummaryTargetedSupport: z.string().optional(),
  compiledBy: z.string().optional(),
  compiledDate: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ComprehensiveProfileSheetPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      childName: "",
      childAge: "",
      assessmentDate: "",
      recommendedPlacement: "",
      examiner: "",
      processingSpeedSteadyReflective: false,
      processingSpeedFlexibleAdaptive: false,
      processingSpeedRapidResponsive: false,
      workingMemoryAreaOfGrowth: false,
      workingMemoryDeveloping: false,
      workingMemoryConsistentConfident: false,
      attentionFocusVariable: false,
      attentionFocusFocusedWithCues: false,
      attentionFocusSelfDirected: false,
      verbalReasoningExploring: false,
      verbalReasoningDeveloping: false,
      verbalReasoningFluentCommunicator: false,
      phonologicalAwarenessExploring: false,
      phonologicalAwarenessLinking: false,
      phonologicalAwarenessConfident: false,
      visualSpatialSkillsExploring: false,
      visualSpatialSkillsDeveloping: false,
      visualSpatialSkillsConfident: false,
      numericalPatternConcrete: false,
      numericalPatternEmergingAbstract: false,
      numericalPatternFlexibleThinker: false,
      additionalCognitiveNotes: "",
      visualObserved: false,
      visualObservedEvidence: "",
      auditoryObserved: false,
      auditoryObservedEvidence: "",
      kinestheticTactileObserved: false,
      kinestheticTactileObservedEvidence: "",
      readingWritingObserved: false,
      readingWritingObservedEvidence: "",
      verbalLinguisticObserved: false,
      verbalLinguisticObservedEvidence: "",
      logicalMathematicalObserved: false,
      logicalMathematicalObservedEvidence: "",
      socialInterpersonalObserved: false,
      socialInterpersonalObservedEvidence: "",
      solitaryIntrapersonalObserved: false,
      solitaryIntrapersonalObservedEvidence: "",
      multimodalObserved: false,
      multimodalObservedEvidence: "",
      linguisticObserved: false,
      linguisticStronglyEvident: false,
      linguisticNotes: "",
      logicalMathematicalObservedInt: false,
      logicalMathematicalStronglyEvidentInt: false,
      logicalMathematicalNotesInt: "",
      spatialObserved: false,
      spatialStronglyEvident: false,
      spatialNotes: "",
      bodilyKinestheticObserved: false,
      bodilyKinestheticStronglyEvident: false,
      bodilyKinestheticNotes: "",
      musicalObserved: false,
      musicalStronglyEvident: false,
      musicalNotes: "",
      interpersonalObserved: false,
      interpersonalStronglyEvident: false,
      interpersonalNotes: "",
      intrapersonalObserved: false,
      intrapersonalStronglyEvident: false,
      intrapersonalNotes: "",
      naturalisticObserved: false,
      naturalisticStronglyEvident: false,
      naturalisticNotes: "",
      existentialObserved: false,
      existentialStronglyEvident: false,
      existentialNotes: "",
      summaryInsightLearnerType: "",
      summaryInsightLearningEnvironments: "",
      selfRegulationEmerging: false,
      selfRegulationDeveloping: false,
      selfRegulationStrong: false,
      selfRegulationNotesEvidence: "",
      emotionalIntelligenceEmerging: false,
      emotionalIntelligenceDeveloping: false,
      emotionalIntelligenceStrong: false,
      emotionalIntelligenceNotesEvidence: "",
      socialCommunicationEmerging: false,
      socialCommunicationDeveloping: false,
      socialCommunicationStrong: false,
      socialCommunicationNotesEvidence: "",
      cognitiveFlexibilityEmerging: false,
      cognitiveFlexibilityDeveloping: false,
      cognitiveFlexibilityStrong: false,
      cognitiveFlexibilityNotesEvidence: "",
      resilienceConfidenceEmerging: false,
      resilienceConfidenceDeveloping: false,
      resilienceConfidenceStrong: false,
      resilienceConfidenceNotesEvidence: "",
      creativityExpressionEmerging: false,
      creativityExpressionDeveloping: false,
      creativityExpressionStrong: false,
      creativityExpressionNotesEvidence: "",
      softSkillSummaryNotes: "",
      englishCurrentLevel: "",
      englishNotes: "",
      mathsCurrentLevel: "",
      mathsNotes: "",
      scienceCurrentLevel: "",
      scienceNotes: "",
      technologyUseLow: false,
      technologyUseModerate: false,
      technologyUseHigh: false,
      technologyUseExceptional: false,
      academicNotes: "",
      zonesADPreferredZones: "",
      zonesADSelfDirectedOrReliant: "",
      zonesADResponseToChallenge: "",
      zonesADEvidenceDominantIntelligence: "",
      peerSessionInitiateOrFollow: "",
      peerSessionRoleAdopted: "",
      peerSessionConflictHandled: "",
      parentChildEmotionalTone: "",
      parentChildFacilitativeVsDirective: "",
      parentChildResponseWorkingSolo: "",
      ks1Score: "",
      ks1InterpretationEmerging: false,
      ks1InterpretationBasic: false,
      ks1InterpretationStrong: false,
      ks1InterpretationExceptional: false,
      ks1SuggestedAction: "",
      ks1ScoreRange1325Action: "",
      ks1ScoreRange2640Action: "",
      ks1ScoreRange4155Action: "",
      ks1ScoreRange5665Action: "",
      ks2Score: "",
      ks2InterpretationEmerging: false,
      ks2InterpretationBasic: false,
      ks2InterpretationStrong: false,
      ks2InterpretationExceptional: false,
      ks2SuggestedAction: "",
      ks2ScoreRange2044Action: "",
      ks2ScoreRange4569Action: "",
      ks2ScoreRange7089Action: "",
      ks2ScoreRange9095Action: "",
      qualitativeInsightsVerbalResponses: "",
      aiCurriculumEntryPoint: "",
      peerEngagementGroupLearning: false,
      peerEngagementNeedsScaffolding: false,
      peerEngagementMonitorConflict: false,
      mentorshipLeadershipPotential: false,
      mentorshipRecommendOneOnOne: false,
      mentorshipNotApplicable: false,
      homeSupportTips: "",
      finalSummaryStrengths: "",
      finalSummaryApproaches: "",
      finalSummaryTargetedSupport: "",
      compiledBy: "",
      compiledDate: "",
    },
  });

  useEffect(() => {
    (async () => {
      // Load existing form data
      const res = await apiService.get(
        `/api/admin/comprehensive-profile-sheet?applicationId=${params.id}`
      );
      
      // Load application data for auto-filling
      const appRes = await apiService.getApplicationData(params.id);
      
      if (res.success && res.data) {
        // Use existing form data
        reset(res.data);
      } else if (appRes.success && appRes.data) {
        // Auto-fill with application data if no existing form data
        const appData = appRes.data;
        reset({
          // Child Information
          childName: appData.childFullName || "",
          childAge: appData.childAge ? appData.childAge.toString() : "",
          assessmentDate: "",
          recommendedPlacement: "",
          examiner: "",
          
          // Cognitive Skills Profile - all default to false
          processingSpeedSteadyReflective: false,
          processingSpeedFlexibleAdaptive: false,
          processingSpeedRapidResponsive: false,
          workingMemoryAreaOfGrowth: false,
          workingMemoryDeveloping: false,
          workingMemoryConsistentConfident: false,
          attentionFocusVariable: false,
          attentionFocusFocusedWithCues: false,
          attentionFocusSelfDirected: false,
          verbalReasoningExploring: false,
          verbalReasoningDeveloping: false,
          verbalReasoningFluentCommunicator: false,
          phonologicalAwarenessExploring: false,
          phonologicalAwarenessLinking: false,
          phonologicalAwarenessConfident: false,
          visualSpatialSkillsExploring: false,
          visualSpatialSkillsDeveloping: false,
          visualSpatialSkillsConfident: false,
          numericalPatternConcrete: false,
          numericalPatternEmergingAbstract: false,
          numericalPatternFlexibleThinker: false,
          additionalCognitiveNotes: "",
          
          // Learning Style Preference - all default to false
          visualObserved: false,
          visualObservedEvidence: "",
          auditoryObserved: false,
          auditoryObservedEvidence: "",
          kinestheticTactileObserved: false,
          kinestheticTactileObservedEvidence: "",
          readingWritingObserved: false,
          readingWritingObservedEvidence: "",
          verbalLinguisticObserved: false,
          verbalLinguisticObservedEvidence: "",
          logicalMathematicalObserved: false,
          logicalMathematicalObservedEvidence: "",
          socialInterpersonalObserved: false,
          socialInterpersonalObservedEvidence: "",
          solitaryIntrapersonalObserved: false,
          solitaryIntrapersonalObservedEvidence: "",
          multimodalObserved: false,
          multimodalObservedEvidence: "",
          
          // Dominant Intelligence Types - all default to false
          linguisticObserved: false,
          linguisticStronglyEvident: false,
          linguisticNotes: "",
          logicalMathematicalObservedInt: false,
          logicalMathematicalStronglyEvidentInt: false,
          logicalMathematicalNotesInt: "",
          spatialObserved: false,
          spatialStronglyEvident: false,
          spatialNotes: "",
          bodilyKinestheticObserved: false,
          bodilyKinestheticStronglyEvident: false,
          bodilyKinestheticNotes: "",
          musicalObserved: false,
          musicalStronglyEvident: false,
          musicalNotes: "",
          interpersonalObserved: false,
          interpersonalStronglyEvident: false,
          interpersonalNotes: "",
          intrapersonalObserved: false,
          intrapersonalStronglyEvident: false,
          intrapersonalNotes: "",
          naturalisticObserved: false,
          naturalisticStronglyEvident: false,
          naturalisticNotes: "",
          existentialObserved: false,
          existentialStronglyEvident: false,
          existentialNotes: "",
          
          // Meta-Learning Pillars & Soft Skills Profile
          summaryInsightLearnerType: "",
          summaryInsightLearningEnvironments: "",
          selfRegulationEmerging: false,
          selfRegulationDeveloping: false,
          selfRegulationStrong: false,
          selfRegulationNotesEvidence: "",
          emotionalIntelligenceEmerging: false,
          emotionalIntelligenceDeveloping: false,
          emotionalIntelligenceStrong: false,
          emotionalIntelligenceNotesEvidence: "",
          socialCommunicationEmerging: false,
          socialCommunicationDeveloping: false,
          socialCommunicationStrong: false,
          socialCommunicationNotesEvidence: "",
          cognitiveFlexibilityEmerging: false,
          cognitiveFlexibilityDeveloping: false,
          cognitiveFlexibilityStrong: false,
          cognitiveFlexibilityNotesEvidence: "",
          resilienceConfidenceEmerging: false,
          resilienceConfidenceDeveloping: false,
          resilienceConfidenceStrong: false,
          resilienceConfidenceNotesEvidence: "",
          creativityExpressionEmerging: false,
          creativityExpressionDeveloping: false,
          creativityExpressionStrong: false,
          creativityExpressionNotesEvidence: "",
          softSkillSummaryNotes: "",
          
          // Academic & Digital Readiness
          englishCurrentLevel: "",
          englishNotes: "",
          mathsCurrentLevel: "",
          mathsNotes: "",
          scienceCurrentLevel: "",
          scienceNotes: "",
          technologyUseLow: false,
          technologyUseModerate: false,
          technologyUseHigh: false,
          technologyUseExceptional: false,
          academicNotes: "",
          
          // Interview-Based Verbal Assessment Summary
          zonesADPreferredZones: "",
          zonesADSelfDirectedOrReliant: "",
          zonesADResponseToChallenge: "",
          zonesADEvidenceDominantIntelligence: "",
          peerSessionInitiateOrFollow: "",
          peerSessionRoleAdopted: "",
          peerSessionConflictHandled: "",
          parentChildEmotionalTone: "",
          parentChildFacilitativeVsDirective: "",
          parentChildResponseWorkingSolo: "",
          ks1Score: "",
          ks1InterpretationEmerging: false,
          ks1InterpretationBasic: false,
          ks1InterpretationStrong: false,
          ks1InterpretationExceptional: false,
          ks1SuggestedAction: "",
          ks1ScoreRange1325Action: "",
          ks1ScoreRange2640Action: "",
          ks1ScoreRange4155Action: "",
          ks1ScoreRange5665Action: "",
          ks2Score: "",
          ks2InterpretationEmerging: false,
          ks2InterpretationBasic: false,
          ks2InterpretationStrong: false,
          ks2InterpretationExceptional: false,
          ks2SuggestedAction: "",
          ks2ScoreRange2044Action: "",
          ks2ScoreRange4569Action: "",
          ks2ScoreRange7089Action: "",
          ks2ScoreRange9095Action: "",
          qualitativeInsightsVerbalResponses: "",
          
          // Component Recommendations
          aiCurriculumEntryPoint: "",
          peerEngagementGroupLearning: false,
          peerEngagementNeedsScaffolding: false,
          peerEngagementMonitorConflict: false,
          mentorshipLeadershipPotential: false,
          mentorshipRecommendOneOnOne: false,
          mentorshipNotApplicable: false,
          homeSupportTips: "",
          
          // Final Summary Statement
          finalSummaryStrengths: "",
          finalSummaryApproaches: "",
          finalSummaryTargetedSupport: "",
          compiledBy: "",
          compiledDate: "",
        });
      }
    })();
  }, [params.id, reset]);

  const onSubmit = async (values: FormValues) => {
    setSaving(true);
    try {
      const response = await apiService.post("/api/admin/comprehensive-profile-sheet", {
        applicationId: params.id,
        ...values,
      });
      
      if (response.success) {
        router.push(`/admin/applications/${params.id}`);
      } else {
        console.error("Form submission failed:", response.error);
        alert(`Error saving form: ${response.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert(`Error saving form: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <div className="text-xl font-bold text-slate-900">
          Understanding The Learning Comprehensive Profile Sheet
        </div>
        <div className="text-sm text-slate-600">
          Application ID: {params.id}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Child Information */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader
            title="Child Information"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Child Name"
              htmlFor="childName"
              error={errors.childName as any}
            >
              <Input id="childName" {...register("childName")} />
            </FormField>
            <FormField label="Age" htmlFor="childAge" error={errors.childAge as any}>
              <Input id="childAge" {...register("childAge")} />
            </FormField>
            <FormField label="Date" htmlFor="assessmentDate" error={errors.assessmentDate as any}>
              <Input id="assessmentDate" {...register("assessmentDate")} />
            </FormField>
            <FormField label="Recommended Placement" htmlFor="recommendedPlacement" error={errors.recommendedPlacement as any}>
              <Input id="recommendedPlacement" {...register("recommendedPlacement")} />
            </FormField>
            <FormField label="Examiner" htmlFor="examiner" error={errors.examiner as any}>
              <Input id="examiner" {...register("examiner")} />
            </FormField>
          </div>
        </section>

        {/* Cognitive Skills Profile */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader
            title="Cognitive Skills Profile"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>How the brain processes and applies information.</p>
          </div>

          <div className="space-y-4">
            {/* Processing Speed */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Processing Speed</div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="processingSpeedSteadyReflective"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Steady/Reflective</span>
                    </label>
                  )}
                />
                <Controller
                  name="processingSpeedFlexibleAdaptive"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Flexible/Adaptive</span>
                    </label>
                  )}
                />
                <Controller
                  name="processingSpeedRapidResponsive"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Rapid/Responsive</span>
                    </label>
                  )}
                />
              </div>
            </div>

            {/* Working Memory */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Working Memory</div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="workingMemoryAreaOfGrowth"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Area of Growth</span>
                    </label>
                  )}
                />
                <Controller
                  name="workingMemoryDeveloping"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Developing</span>
                    </label>
                  )}
                />
                <Controller
                  name="workingMemoryConsistentConfident"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Consistent & Confident</span>
                    </label>
                  )}
                />
              </div>
            </div>

            {/* Attention & Focus */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Attention & Focus</div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="attentionFocusVariable"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Variable</span>
                    </label>
                  )}
                />
                <Controller
                  name="attentionFocusFocusedWithCues"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Focused with Cues</span>
                    </label>
                  )}
                />
                <Controller
                  name="attentionFocusSelfDirected"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Self-Directed</span>
                    </label>
                  )}
                />
              </div>
            </div>

            {/* Verbal Reasoning */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Verbal Reasoning</div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="verbalReasoningExploring"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Exploring</span>
                    </label>
                  )}
                />
                <Controller
                  name="verbalReasoningDeveloping"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Developing</span>
                    </label>
                  )}
                />
                <Controller
                  name="verbalReasoningFluentCommunicator"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Fluent Communicator</span>
                    </label>
                  )}
                />
              </div>
            </div>

            {/* Phonological Awareness (KS1 only) */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Phonological Awareness (KS1 only)</div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="phonologicalAwarenessExploring"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Exploring</span>
                    </label>
                  )}
                />
                <Controller
                  name="phonologicalAwarenessLinking"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Linking</span>
                    </label>
                  )}
                />
                <Controller
                  name="phonologicalAwarenessConfident"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Confident</span>
                    </label>
                  )}
                />
              </div>
            </div>

            {/* Visual-Spatial Skills */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Visual-Spatial Skills</div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="visualSpatialSkillsExploring"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Exploring</span>
                    </label>
                  )}
                />
                <Controller
                  name="visualSpatialSkillsDeveloping"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Developing</span>
                    </label>
                  )}
                />
                <Controller
                  name="visualSpatialSkillsConfident"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Confident</span>
                    </label>
                  )}
                />
              </div>
            </div>

            {/* Numerical / Pattern Thinking */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Numerical / Pattern Thinking</div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="numericalPatternConcrete"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Concrete</span>
                    </label>
                  )}
                />
                <Controller
                  name="numericalPatternEmergingAbstract"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Emerging Abstract</span>
                    </label>
                  )}
                />
                <Controller
                  name="numericalPatternFlexibleThinker"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Flexible Thinker</span>
                    </label>
                  )}
                />
              </div>
            </div>

            <FormField label="Additional Cognitive Notes:" htmlFor="additionalCognitiveNotes">
              <Textarea
                rows={3}
                id="additionalCognitiveNotes"
                {...register("additionalCognitiveNotes")}
              />
            </FormField>
          </div>
        </section>

        {/* Learning Style Preference */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader
            title="Learning Style Preference"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>Observed learning preferences and evidence.</p>
          </div>

          <div className="space-y-4">
            {/* Visual */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Controller
                  name="visualObserved"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                    />
                  )}
                />
                <span className="font-medium text-slate-900">Visual</span>
              </div>
              <FormField label="Evidence:" htmlFor="visualObservedEvidence">
                <Textarea
                  rows={2}
                  id="visualObservedEvidence"
                  {...register("visualObservedEvidence")}
                />
              </FormField>
            </div>

            {/* Auditory */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Controller
                  name="auditoryObserved"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                    />
                  )}
                />
                <span className="font-medium text-slate-900">Auditory</span>
              </div>
              <FormField label="Evidence:" htmlFor="auditoryObservedEvidence">
                <Textarea
                  rows={2}
                  id="auditoryObservedEvidence"
                  {...register("auditoryObservedEvidence")}
                />
              </FormField>
            </div>

            {/* Kinesthetic/Tactile */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Controller
                  name="kinestheticTactileObserved"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                    />
                  )}
                />
                <span className="font-medium text-slate-900">Kinesthetic/Tactile</span>
              </div>
              <FormField label="Evidence:" htmlFor="kinestheticTactileObservedEvidence">
                <Textarea
                  rows={2}
                  id="kinestheticTactileObservedEvidence"
                  {...register("kinestheticTactileObservedEvidence")}
                />
              </FormField>
            </div>

            {/* Reading/Writing */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Controller
                  name="readingWritingObserved"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                    />
                  )}
                />
                <span className="font-medium text-slate-900">Reading/Writing</span>
              </div>
              <FormField label="Evidence:" htmlFor="readingWritingObservedEvidence">
                <Textarea
                  rows={2}
                  id="readingWritingObservedEvidence"
                  {...register("readingWritingObservedEvidence")}
                />
              </FormField>
            </div>

            {/* Verbal/Linguistic */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Controller
                  name="verbalLinguisticObserved"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                    />
                  )}
                />
                <span className="font-medium text-slate-900">Verbal/Linguistic</span>
              </div>
              <FormField label="Evidence:" htmlFor="verbalLinguisticObservedEvidence">
                <Textarea
                  rows={2}
                  id="verbalLinguisticObservedEvidence"
                  {...register("verbalLinguisticObservedEvidence")}
                />
              </FormField>
            </div>

            {/* Logical/Mathematical */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Controller
                  name="logicalMathematicalObserved"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                    />
                  )}
                />
                <span className="font-medium text-slate-900">Logical/Mathematical</span>
              </div>
              <FormField label="Evidence:" htmlFor="logicalMathematicalObservedEvidence">
                <Textarea
                  rows={2}
                  id="logicalMathematicalObservedEvidence"
                  {...register("logicalMathematicalObservedEvidence")}
                />
              </FormField>
            </div>

            {/* Social/Interpersonal */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Controller
                  name="socialInterpersonalObserved"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                    />
                  )}
                />
                <span className="font-medium text-slate-900">Social/Interpersonal</span>
              </div>
              <FormField label="Evidence:" htmlFor="socialInterpersonalObservedEvidence">
                <Textarea
                  rows={2}
                  id="socialInterpersonalObservedEvidence"
                  {...register("socialInterpersonalObservedEvidence")}
                />
              </FormField>
            </div>

            {/* Solitary/Intrapersonal */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Controller
                  name="solitaryIntrapersonalObserved"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                    />
                  )}
                />
                <span className="font-medium text-slate-900">Solitary/Intrapersonal</span>
              </div>
              <FormField label="Evidence:" htmlFor="solitaryIntrapersonalObservedEvidence">
                <Textarea
                  rows={2}
                  id="solitaryIntrapersonalObservedEvidence"
                  {...register("solitaryIntrapersonalObservedEvidence")}
                />
              </FormField>
            </div>

            {/* Multimodal */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Controller
                  name="multimodalObserved"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                    />
                  )}
                />
                <span className="font-medium text-slate-900">Multimodal</span>
              </div>
              <FormField label="Evidence:" htmlFor="multimodalObservedEvidence">
                <Textarea
                  rows={2}
                  id="multimodalObservedEvidence"
                  {...register("multimodalObservedEvidence")}
                />
              </FormField>
            </div>
          </div>
        </section>

        {/* Dominant Intelligence Types */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader
            title="Dominant Intelligence Types"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>Multiple intelligence assessment based on observations.</p>
          </div>

          <div className="space-y-4">
            {/* Linguistic Intelligence */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-2">
                <Controller
                  name="linguisticObserved"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="font-medium text-slate-900">Linguistic Intelligence</span>
                    </label>
                  )}
                />
                <Controller
                  name="linguisticStronglyEvident"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strongly Evident</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes:" htmlFor="linguisticNotes">
                <Textarea
                  rows={2}
                  id="linguisticNotes"
                  {...register("linguisticNotes")}
                />
              </FormField>
            </div>

            {/* Logical-Mathematical Intelligence */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-2">
                <Controller
                  name="logicalMathematicalObservedInt"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="font-medium text-slate-900">Logical-Mathematical Intelligence</span>
                    </label>
                  )}
                />
                <Controller
                  name="logicalMathematicalStronglyEvidentInt"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strongly Evident</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes:" htmlFor="logicalMathematicalNotesInt">
                <Textarea
                  rows={2}
                  id="logicalMathematicalNotesInt"
                  {...register("logicalMathematicalNotesInt")}
                />
              </FormField>
            </div>

            {/* Spatial Intelligence */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-2">
                <Controller
                  name="spatialObserved"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="font-medium text-slate-900">Spatial Intelligence</span>
                    </label>
                  )}
                />
                <Controller
                  name="spatialStronglyEvident"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strongly Evident</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes:" htmlFor="spatialNotes">
                <Textarea
                  rows={2}
                  id="spatialNotes"
                  {...register("spatialNotes")}
                />
              </FormField>
            </div>

            {/* Bodily-Kinesthetic Intelligence */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-2">
                <Controller
                  name="bodilyKinestheticObserved"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="font-medium text-slate-900">Bodily-Kinesthetic Intelligence</span>
                    </label>
                  )}
                />
                <Controller
                  name="bodilyKinestheticStronglyEvident"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strongly Evident</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes:" htmlFor="bodilyKinestheticNotes">
                <Textarea
                  rows={2}
                  id="bodilyKinestheticNotes"
                  {...register("bodilyKinestheticNotes")}
                />
              </FormField>
            </div>

            {/* Musical Intelligence */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-2">
                <Controller
                  name="musicalObserved"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="font-medium text-slate-900">Musical Intelligence</span>
                    </label>
                  )}
                />
                <Controller
                  name="musicalStronglyEvident"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strongly Evident</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes:" htmlFor="musicalNotes">
                <Textarea
                  rows={2}
                  id="musicalNotes"
                  {...register("musicalNotes")}
                />
              </FormField>
            </div>

            {/* Interpersonal Intelligence */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-2">
                <Controller
                  name="interpersonalObserved"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="font-medium text-slate-900">Interpersonal Intelligence</span>
                    </label>
                  )}
                />
                <Controller
                  name="interpersonalStronglyEvident"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strongly Evident</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes:" htmlFor="interpersonalNotes">
                <Textarea
                  rows={2}
                  id="interpersonalNotes"
                  {...register("interpersonalNotes")}
                />
              </FormField>
            </div>

            {/* Intrapersonal Intelligence */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-2">
                <Controller
                  name="intrapersonalObserved"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="font-medium text-slate-900">Intrapersonal Intelligence</span>
                    </label>
                  )}
                />
                <Controller
                  name="intrapersonalStronglyEvident"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strongly Evident</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes:" htmlFor="intrapersonalNotes">
                <Textarea
                  rows={2}
                  id="intrapersonalNotes"
                  {...register("intrapersonalNotes")}
                />
              </FormField>
            </div>

            {/* Naturalistic Intelligence */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-2">
                <Controller
                  name="naturalisticObserved"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="font-medium text-slate-900">Naturalistic Intelligence</span>
                    </label>
                  )}
                />
                <Controller
                  name="naturalisticStronglyEvident"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strongly Evident</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes:" htmlFor="naturalisticNotes">
                <Textarea
                  rows={2}
                  id="naturalisticNotes"
                  {...register("naturalisticNotes")}
                />
              </FormField>
            </div>

            {/* Existential Intelligence */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-2">
                <Controller
                  name="existentialObserved"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="font-medium text-slate-900">Existential Intelligence</span>
                    </label>
                  )}
                />
                <Controller
                  name="existentialStronglyEvident"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strongly Evident</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes:" htmlFor="existentialNotes">
                <Textarea
                  rows={2}
                  id="existentialNotes"
                  {...register("existentialNotes")}
                />
              </FormField>
            </div>
          </div>
        </section>

        {/* Meta-Learning Pillars & Soft Skills Profile */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader
            title="Meta-Learning Pillars & Soft Skills Profile"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>Essential skills for learning and development.</p>
          </div>

          <div className="space-y-6">
            {/* Summary Insights */}
            <div className="space-y-4">
              <FormField label="Summary Insight - Learner Type:" htmlFor="summaryInsightLearnerType">
                <Textarea
                  rows={3}
                  id="summaryInsightLearnerType"
                  {...register("summaryInsightLearnerType")}
                />
              </FormField>
              <FormField label="Summary Insight - Learning Environments:" htmlFor="summaryInsightLearningEnvironments">
                <Textarea
                  rows={3}
                  id="summaryInsightLearningEnvironments"
                  {...register("summaryInsightLearningEnvironments")}
                />
              </FormField>
            </div>

            {/* Self-Regulation */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Self-Regulation</div>
              <div className="flex flex-wrap gap-4 mb-3">
                <Controller
                  name="selfRegulationEmerging"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Emerging</span>
                    </label>
                  )}
                />
                <Controller
                  name="selfRegulationDeveloping"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Developing</span>
                    </label>
                  )}
                />
                <Controller
                  name="selfRegulationStrong"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strong</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes/Evidence:" htmlFor="selfRegulationNotesEvidence">
                <Textarea
                  rows={2}
                  id="selfRegulationNotesEvidence"
                  {...register("selfRegulationNotesEvidence")}
                />
              </FormField>
            </div>

            {/* Emotional Intelligence */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Emotional Intelligence</div>
              <div className="flex flex-wrap gap-4 mb-3">
                <Controller
                  name="emotionalIntelligenceEmerging"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Emerging</span>
                    </label>
                  )}
                />
                <Controller
                  name="emotionalIntelligenceDeveloping"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Developing</span>
                    </label>
                  )}
                />
                <Controller
                  name="emotionalIntelligenceStrong"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strong</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes/Evidence:" htmlFor="emotionalIntelligenceNotesEvidence">
                <Textarea
                  rows={2}
                  id="emotionalIntelligenceNotesEvidence"
                  {...register("emotionalIntelligenceNotesEvidence")}
                />
              </FormField>
            </div>

            {/* Social Communication */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Social Communication</div>
              <div className="flex flex-wrap gap-4 mb-3">
                <Controller
                  name="socialCommunicationEmerging"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Emerging</span>
                    </label>
                  )}
                />
                <Controller
                  name="socialCommunicationDeveloping"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Developing</span>
                    </label>
                  )}
                />
                <Controller
                  name="socialCommunicationStrong"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strong</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes/Evidence:" htmlFor="socialCommunicationNotesEvidence">
                <Textarea
                  rows={2}
                  id="socialCommunicationNotesEvidence"
                  {...register("socialCommunicationNotesEvidence")}
                />
              </FormField>
            </div>

            {/* Cognitive Flexibility */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Cognitive Flexibility</div>
              <div className="flex flex-wrap gap-4 mb-3">
                <Controller
                  name="cognitiveFlexibilityEmerging"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Emerging</span>
                    </label>
                  )}
                />
                <Controller
                  name="cognitiveFlexibilityDeveloping"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Developing</span>
                    </label>
                  )}
                />
                <Controller
                  name="cognitiveFlexibilityStrong"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strong</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes/Evidence:" htmlFor="cognitiveFlexibilityNotesEvidence">
                <Textarea
                  rows={2}
                  id="cognitiveFlexibilityNotesEvidence"
                  {...register("cognitiveFlexibilityNotesEvidence")}
                />
              </FormField>
            </div>

            {/* Resilience & Confidence */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Resilience & Confidence</div>
              <div className="flex flex-wrap gap-4 mb-3">
                <Controller
                  name="resilienceConfidenceEmerging"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Emerging</span>
                    </label>
                  )}
                />
                <Controller
                  name="resilienceConfidenceDeveloping"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Developing</span>
                    </label>
                  )}
                />
                <Controller
                  name="resilienceConfidenceStrong"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strong</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes/Evidence:" htmlFor="resilienceConfidenceNotesEvidence">
                <Textarea
                  rows={2}
                  id="resilienceConfidenceNotesEvidence"
                  {...register("resilienceConfidenceNotesEvidence")}
                />
              </FormField>
            </div>

            {/* Creativity & Expression */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Creativity & Expression</div>
              <div className="flex flex-wrap gap-4 mb-3">
                <Controller
                  name="creativityExpressionEmerging"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Emerging</span>
                    </label>
                  )}
                />
                <Controller
                  name="creativityExpressionDeveloping"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Developing</span>
                    </label>
                  )}
                />
                <Controller
                  name="creativityExpressionStrong"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strong</span>
                    </label>
                  )}
                />
              </div>
              <FormField label="Notes/Evidence:" htmlFor="creativityExpressionNotesEvidence">
                <Textarea
                  rows={2}
                  id="creativityExpressionNotesEvidence"
                  {...register("creativityExpressionNotesEvidence")}
                />
              </FormField>
            </div>

            <FormField label="Soft Skills Summary Notes:" htmlFor="softSkillSummaryNotes">
              <Textarea
                rows={3}
                id="softSkillSummaryNotes"
                {...register("softSkillSummaryNotes")}
              />
            </FormField>
          </div>
        </section>

        {/* Academic & Digital Readiness */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader
            title="Academic & Digital Readiness"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>Current academic levels and technology proficiency.</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="English Current Level:" htmlFor="englishCurrentLevel">
                <Input id="englishCurrentLevel" {...register("englishCurrentLevel")} />
              </FormField>
              <FormField label="Maths Current Level:" htmlFor="mathsCurrentLevel">
                <Input id="mathsCurrentLevel" {...register("mathsCurrentLevel")} />
              </FormField>
              <FormField label="Science Current Level:" htmlFor="scienceCurrentLevel">
                <Input id="scienceCurrentLevel" {...register("scienceCurrentLevel")} />
              </FormField>
            </div>

            <div className="space-y-3">
              <FormField label="English Notes:" htmlFor="englishNotes">
                <Textarea rows={2} id="englishNotes" {...register("englishNotes")} />
              </FormField>
              <FormField label="Maths Notes:" htmlFor="mathsNotes">
                <Textarea rows={2} id="mathsNotes" {...register("mathsNotes")} />
              </FormField>
              <FormField label="Science Notes:" htmlFor="scienceNotes">
                <Textarea rows={2} id="scienceNotes" {...register("scienceNotes")} />
              </FormField>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Technology Use</div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="technologyUseLow"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Low</span>
                    </label>
                  )}
                />
                <Controller
                  name="technologyUseModerate"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Moderate</span>
                    </label>
                  )}
                />
                <Controller
                  name="technologyUseHigh"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">High</span>
                    </label>
                  )}
                />
                <Controller
                  name="technologyUseExceptional"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Exceptional</span>
                    </label>
                  )}
                />
              </div>
            </div>

            <FormField label="Academic Notes:" htmlFor="academicNotes">
              <Textarea rows={3} id="academicNotes" {...register("academicNotes")} />
            </FormField>
          </div>
        </section>

        {/* Observational Insights by Setting / Task */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader
            title="Observational Insights by Setting / Task"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>Structured observations across different settings and tasks.</p>
          </div>

          <div className="space-y-4">
            {/* Zones A-D */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-3">Zones A-D</div>
              <div className="space-y-3">
                <FormField label="Preferred zones?" htmlFor="zonesADPreferredZones">
                  <Textarea rows={2} id="zonesADPreferredZones" {...register("zonesADPreferredZones")} />
                </FormField>
                <FormField label="Self-directed or reliant?" htmlFor="zonesADSelfDirectedOrReliant">
                  <Textarea rows={2} id="zonesADSelfDirectedOrReliant" {...register("zonesADSelfDirectedOrReliant")} />
                </FormField>
                <FormField label="How did they respond to challenge, novelty, or sensory input?" htmlFor="zonesADResponseToChallenge">
                  <Textarea rows={2} id="zonesADResponseToChallenge" {...register("zonesADResponseToChallenge")} />
                </FormField>
                <FormField label="Evidence of any dominant intelligence?" htmlFor="zonesADEvidenceDominantIntelligence">
                  <Textarea rows={2} id="zonesADEvidenceDominantIntelligence" {...register("zonesADEvidenceDominantIntelligence")} />
                </FormField>
              </div>
            </div>

            {/* Peer Session */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-3">Peer Session</div>
              <div className="space-y-3">
                <FormField label="Did the child initiate or follow?" htmlFor="peerSessionInitiateOrFollow">
                  <Textarea rows={2} id="peerSessionInitiateOrFollow" {...register("peerSessionInitiateOrFollow")} />
                </FormField>
                <FormField label="Role adopted (leader, mediator, observer)?" htmlFor="peerSessionRoleAdopted">
                  <Textarea rows={2} id="peerSessionRoleAdopted" {...register("peerSessionRoleAdopted")} />
                </FormField>
                <FormField label="How was conflict handled?" htmlFor="peerSessionConflictHandled">
                  <Textarea rows={2} id="peerSessionConflictHandled" {...register("peerSessionConflictHandled")} />
                </FormField>
              </div>
            </div>

            {/* Parent-Child */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-3">Parent-Child</div>
              <div className="space-y-3">
                <FormField label="Emotional tone between parent and child?" htmlFor="parentChildEmotionalTone">
                  <Textarea rows={2} id="parentChildEmotionalTone" {...register("parentChildEmotionalTone")} />
                </FormField>
                <FormField label="Facilitative vs directive style?" htmlFor="parentChildFacilitativeVsDirective">
                  <Textarea rows={2} id="parentChildFacilitativeVsDirective" {...register("parentChildFacilitativeVsDirective")} />
                </FormField>
                <FormField label="How did the child respond when working solo?" htmlFor="parentChildResponseWorkingSolo">
                  <Textarea rows={2} id="parentChildResponseWorkingSolo" {...register("parentChildResponseWorkingSolo")} />
                </FormField>
              </div>
            </div>
          </div>
        </section>

        {/* Interview-Based Verbal Assessment Summary */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader
            title="Interview-Based Verbal Assessment Summary"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>Assessment scores and interpretations from verbal assessments.</p>
          </div>

          <div className="space-y-4">

            {/* KS1 Assessment */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">KS1 Assessment</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <FormField label="KS1 Score:" htmlFor="ks1Score">
                  <Input id="ks1Score" {...register("ks1Score")} />
                </FormField>
                <FormField label="KS1 Suggested Action:" htmlFor="ks1SuggestedAction">
                  <Textarea className="text-black" rows={2} id="ks1SuggestedAction" {...register("ks1SuggestedAction")} />
                </FormField>
              </div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="ks1InterpretationEmerging"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Emerging</span>
                    </label>
                  )}
                />
                <Controller
                  name="ks1InterpretationBasic"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Basic</span>
                    </label>
                  )}
                />
                <Controller
                  name="ks1InterpretationStrong"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strong</span>
                    </label>
                  )}
                />
                <Controller
                  name="ks1InterpretationExceptional"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Exceptional</span>
                    </label>
                  )}
                />
              </div>
            </div>

            {/* KS2 Assessment */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">KS2 Assessment</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <FormField label="KS2 Score:" htmlFor="ks2Score">
                  <Input id="ks2Score" {...register("ks2Score")} />
                </FormField>
                <FormField label="KS2 Suggested Action:" htmlFor="ks2SuggestedAction">
                  <Textarea rows={2} id="ks2SuggestedAction" {...register("ks2SuggestedAction")} />
                </FormField>
              </div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="ks2InterpretationEmerging"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Emerging</span>
                    </label>
                  )}
                />
                <Controller
                  name="ks2InterpretationBasic"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Basic</span>
                    </label>
                  )}
                />
                <Controller
                  name="ks2InterpretationStrong"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Strong</span>
                    </label>
                  )}
                />
                <Controller
                  name="ks2InterpretationExceptional"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Exceptional</span>
                    </label>
                  )}
                />
              </div>
            </div>

            <FormField label="Qualitative Insights - Verbal Responses:" htmlFor="qualitativeInsightsVerbalResponses">
              <Textarea rows={3} id="qualitativeInsightsVerbalResponses" {...register("qualitativeInsightsVerbalResponses")} />
            </FormField>
          </div>
        </section>

        {/* Profile Score Range & Placement Interpretation */}
        <section className="bg-white rounded-xl mb-6 shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Profile Score Range & Placement Interpretation"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>Score ranges and their corresponding interpretations for placement decisions.</p>
          </div>

          <div className="space-y-6">
            {/* KS1 Score Range Table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">KS1 Assessment</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-700 border-r border-slate-200">Score Range</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-700 border-r border-slate-200">Interpretation</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Suggested Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">13-25</td>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">Emerging Development</td>
                      <td className="px-4 py-3">
                        <Input
                          {...register("ks1ScoreRange1325Action")}
                          placeholder="Enter suggested action..."
                          className="text-sm"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">26-40</td>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">Basic Readiness</td>
                      <td className="px-4 py-3">
                        <Input
                          {...register("ks1ScoreRange2640Action")}
                          placeholder="Enter suggested action..."
                          className="text-sm"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">41-55</td>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">Strong Fit</td>
                      <td className="px-4 py-3">
                        <Input
                          {...register("ks1ScoreRange4155Action")}
                          placeholder="Enter suggested action..."
                          className="text-sm"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">56-65</td>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">Exceptional Alignment</td>
                      <td className="px-4 py-3">
                        <Input
                          {...register("ks1ScoreRange5665Action")}
                          placeholder="Enter suggested action..."
                          className="text-sm"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* KS2 Score Range Table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">KS2 Assessment</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-700 border-r border-slate-200">Score Range</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-700 border-r border-slate-200">Interpretation</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Suggested Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">20-44</td>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">Emerging Development</td>
                      <td className="px-4 py-3">
                        <Input
                          {...register("ks2ScoreRange2044Action")}
                          placeholder="Enter suggested action..."
                          className="text-sm"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">45-69</td>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">Basic Readiness</td>
                      <td className="px-4 py-3">
                        <Input
                          {...register("ks2ScoreRange4569Action")}
                          placeholder="Enter suggested action..."
                          className="text-sm"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">70-89</td>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">Strong Fit</td>
                      <td className="px-4 py-3">
                        <Input
                          {...register("ks2ScoreRange7089Action")}
                          placeholder="Enter suggested action..."
                          className="text-sm"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">90-95</td>
                      <td className="px-4 py-3 text-sm text-slate-600 border-r border-slate-200">Exceptional Alignment</td>
                      <td className="px-4 py-3">
                        <Input
                          {...register("ks2ScoreRange9095Action")}
                          placeholder="Enter suggested action..."
                          className="text-sm"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-sm text-slate-600">
                <p className="mb-2"><strong>Note:</strong> These score ranges serve as guidelines for placement decisions. Individual circumstances, learning styles, and additional assessment factors should be considered in conjunction with these scores.</p>
                <p><strong>Total Possible Scores:</strong> KS1: 65 points | KS2: 95 points</p>
              </div>
            </div>
          </div>
        </section>

        {/* Component Recommendations */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader
            title="Component Recommendations"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>Recommended learning components and support strategies.</p>
          </div>

          <div className="space-y-4">
            <FormField label="AI Curriculum Entry Point:" htmlFor="aiCurriculumEntryPoint">
              <Textarea rows={2} id="aiCurriculumEntryPoint" {...register("aiCurriculumEntryPoint")} />
            </FormField>

            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Peer Engagement</div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="peerEngagementGroupLearning"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Group Learning</span>
                    </label>
                  )}
                />
                <Controller
                  name="peerEngagementNeedsScaffolding"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Needs Scaffolding</span>
                    </label>
                  )}
                />
                <Controller
                  name="peerEngagementMonitorConflict"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Monitor Conflict</span>
                    </label>
                  )}
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Mentorship</div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="mentorshipLeadershipPotential"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Leadership Potential</span>
                    </label>
                  )}
                />
                <Controller
                  name="mentorshipRecommendOneOnOne"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Recommend One-on-One</span>
                    </label>
                  )}
                />
                <Controller
                  name="mentorshipNotApplicable"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Not Applicable</span>
                    </label>
                  )}
                />
              </div>
            </div>

            <FormField label="Home Support Tips:" htmlFor="homeSupportTips">
              <Textarea rows={3} id="homeSupportTips" {...register("homeSupportTips")} />
            </FormField>
          </div>
        </section>

        {/* Final Summary Statement */}
        <section className="bg-white rounded-xl mb-6 shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Final Summary Statement"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>Comprehensive summary and recommendations.</p>
          </div>

          <div className="space-y-4">
            <FormField label="Final Summary - Strengths:" htmlFor="finalSummaryStrengths">
              <Textarea rows={3} id="finalSummaryStrengths" {...register("finalSummaryStrengths")} />
            </FormField>
            <FormField label="Final Summary - Approaches:" htmlFor="finalSummaryApproaches">
              <Textarea rows={3} id="finalSummaryApproaches" {...register("finalSummaryApproaches")} />
            </FormField>
            <FormField label="Final Summary - Targeted Support:" htmlFor="finalSummaryTargetedSupport">
              <Textarea rows={3} id="finalSummaryTargetedSupport" {...register("finalSummaryTargetedSupport")} />
            </FormField>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Compiled By:" htmlFor="compiledBy">
                <Input id="compiledBy" {...register("compiledBy")} />
              </FormField>
              <FormField label="Compiled Date:" htmlFor="compiledDate">
                <Input id="compiledDate" {...register("compiledDate")} />
              </FormField>
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Comprehensive Profile Sheet"}
          </button>
        </div>
      </form>
    </div>
  );
}
