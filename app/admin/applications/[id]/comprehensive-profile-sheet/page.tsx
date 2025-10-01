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
  ks2Score: z.string().optional(),
  ks2InterpretationEmerging: z.boolean().default(false),
  ks2InterpretationBasic: z.boolean().default(false),
  ks2InterpretationStrong: z.boolean().default(false),
  ks2InterpretationExceptional: z.boolean().default(false),
  ks2SuggestedAction: z.string().optional(),
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
      ks2Score: "",
      ks2InterpretationEmerging: false,
      ks2InterpretationBasic: false,
      ks2InterpretationStrong: false,
      ks2InterpretationExceptional: false,
      ks2SuggestedAction: "",
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
      const res = await apiService.get(
        `/api/admin/comprehensive-profile-sheet?applicationId=${params.id}`
      );
      if (res.success && res.data) {
        reset(res.data);
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
        <section className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
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
        <section className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
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
