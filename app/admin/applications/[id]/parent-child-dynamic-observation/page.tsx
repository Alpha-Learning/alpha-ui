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
  childFullName: z.string().min(1, "Required"),
  childAge: z.string().min(1, "Required"),
  date: z.string().optional(),
  examiner: z.string().optional(),
  
  // Joint Story Creation (10 minutes)
  sharedIdeaExchangeRating: z.string().min(1, "Required"),
  sharedIdeaExchangeNotes: z.string().optional(),
  emotionalWarmthRating: z.string().min(1, "Required"),
  emotionalWarmthNotes: z.string().optional(),
  balanceOfLeadershipRating: z.string().min(1, "Required"),
  balanceOfLeadershipNotes: z.string().optional(),
  communicationStyleRating: z.string().min(1, "Required"),
  communicationStyleNotes: z.string().optional(),
  mutualCreativityRating: z.string().min(1, "Required"),
  mutualCreativityNotes: z.string().optional(),
  
  // Separation - Child Continues Solo (10 minutes)
  independenceRating: z.string().min(1, "Required"),
  independenceNotes: z.string().optional(),
  confidenceHesitationRating: z.string().min(1, "Required"),
  confidenceHesitationNotes: z.string().optional(),
  taskEngagementRating: z.string().min(1, "Required"),
  taskEngagementNotes: z.string().optional(),
  creativeExpansionRating: z.string().min(1, "Required"),
  creativeExpansionNotes: z.string().optional(),
  
  // Teaching Moment - Comic Strip (10 minutes)
  teachingStyleRating: z.string().min(1, "Required"),
  teachingStyleNotes: z.string().optional(),
  patienceEncouragementRating: z.string().min(1, "Required"),
  patienceEncouragementNotes: z.string().optional(),
  parentClarityRating: z.string().min(1, "Required"),
  parentClarityNotes: z.string().optional(),
  childEngagementRating: z.string().min(1, "Required"),
  childEngagementNotes: z.string().optional(),
  
  // Parenting Style & Dynamic Insights
  parentDominantStyleDirective: z.boolean().default(false),
  parentDominantStyleSupportive: z.boolean().default(false),
  parentDominantStyleDetached: z.boolean().default(false),
  parentDominantStyleFacilitative: z.boolean().default(false),
  emotionalAttunementHigh: z.boolean().default(false),
  emotionalAttunementModerate: z.boolean().default(false),
  emotionalAttunementLow: z.boolean().default(false),
  encouragementStylePraiseFocused: z.boolean().default(false),
  encouragementStyleProcessFocused: z.boolean().default(false),
  encouragementStyleCorrectionFocused: z.boolean().default(false),
  attachmentSignalSecure: z.boolean().default(false),
  attachmentSignalAnxious: z.boolean().default(false),
  attachmentSignalAvoidant: z.boolean().default(false),
  attachmentSignalDisengaged: z.boolean().default(false),
  
  // Child Meta-Skills During Assessment
  confidenceAutonomyObserved: z.boolean().default(false),
  confidenceAutonomyNotes: z.string().optional(),
  emotionalRegulationObserved: z.boolean().default(false),
  emotionalRegulationNotes: z.string().optional(),
  curiosityObserved: z.boolean().default(false),
  curiosityNotes: z.string().optional(),
  creativityExpressionObserved: z.boolean().default(false),
  creativityExpressionNotes: z.string().optional(),
  selfDirectedLearningObserved: z.boolean().default(false),
  selfDirectedLearningNotes: z.string().optional(),
  communicationObserved: z.boolean().default(false),
  communicationNotes: z.string().optional(),
  
  // Learning Type & Intelligence Clues
  linguisticObserved: z.boolean().default(false),
  linguisticStronglyEvident: z.boolean().default(false),
  linguisticNotes: z.string().optional(),
  logicalMathematicalObserved: z.boolean().default(false),
  logicalMathematicalStronglyEvident: z.boolean().default(false),
  logicalMathematicalNotes: z.string().optional(),
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
  
  // Dynamic Summary & Reflection
  parentChildDynamicStandout: z.string().optional(),
  childExpressiveWithWithoutParent: z.string().optional(),
  parentGuidanceHindrance: z.string().optional(),
  
  // Red Flags or Follow-up Needs
  emotionalDistressFlag: z.boolean().default(false),
  parentOverDirectionFlag: z.boolean().default(false),
  confidenceIssueFlag: z.boolean().default(false),
  noFlagsFlag: z.boolean().default(false),
  redFlagsNotes: z.string().optional(),
  
  // Office Use Only
  applicationNumber: z.string().optional(),
  observerName: z.string().optional(),
  assessmentDate: z.string().optional(),
  loggedToSystemDate: z.string().optional(),
  loggedBy: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ParentChildDynamicObservationPage() {
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
      childFullName: "",
      childAge: "",
      date: "",
      examiner: "",
      sharedIdeaExchangeRating: "",
      sharedIdeaExchangeNotes: "",
      emotionalWarmthRating: "",
      emotionalWarmthNotes: "",
      balanceOfLeadershipRating: "",
      balanceOfLeadershipNotes: "",
      communicationStyleRating: "",
      communicationStyleNotes: "",
      mutualCreativityRating: "",
      mutualCreativityNotes: "",
      independenceRating: "",
      independenceNotes: "",
      confidenceHesitationRating: "",
      confidenceHesitationNotes: "",
      taskEngagementRating: "",
      taskEngagementNotes: "",
      creativeExpansionRating: "",
      creativeExpansionNotes: "",
      teachingStyleRating: "",
      teachingStyleNotes: "",
      patienceEncouragementRating: "",
      patienceEncouragementNotes: "",
      parentClarityRating: "",
      parentClarityNotes: "",
      childEngagementRating: "",
      childEngagementNotes: "",
      parentDominantStyleDirective: false,
      parentDominantStyleSupportive: false,
      parentDominantStyleDetached: false,
      parentDominantStyleFacilitative: false,
      emotionalAttunementHigh: false,
      emotionalAttunementModerate: false,
      emotionalAttunementLow: false,
      encouragementStylePraiseFocused: false,
      encouragementStyleProcessFocused: false,
      encouragementStyleCorrectionFocused: false,
      attachmentSignalSecure: false,
      attachmentSignalAnxious: false,
      attachmentSignalAvoidant: false,
      attachmentSignalDisengaged: false,
      confidenceAutonomyObserved: false,
      confidenceAutonomyNotes: "",
      emotionalRegulationObserved: false,
      emotionalRegulationNotes: "",
      curiosityObserved: false,
      curiosityNotes: "",
      creativityExpressionObserved: false,
      creativityExpressionNotes: "",
      selfDirectedLearningObserved: false,
      selfDirectedLearningNotes: "",
      communicationObserved: false,
      communicationNotes: "",
      linguisticObserved: false,
      linguisticStronglyEvident: false,
      linguisticNotes: "",
      logicalMathematicalObserved: false,
      logicalMathematicalStronglyEvident: false,
      logicalMathematicalNotes: "",
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
      parentChildDynamicStandout: "",
      childExpressiveWithWithoutParent: "",
      parentGuidanceHindrance: "",
      emotionalDistressFlag: false,
      parentOverDirectionFlag: false,
      confidenceIssueFlag: false,
      noFlagsFlag: false,
      redFlagsNotes: "",
      applicationNumber: "",
      observerName: "",
      assessmentDate: "",
      loggedToSystemDate: "",
      loggedBy: "",
    },
  });

  useEffect(() => {
    (async () => {
      // Load existing form data
      const res = await apiService.get(
        `/api/admin/parent-child-dynamic-observation?applicationId=${params.id}`
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
          childFullName: appData.childFullName || "",
          childAge: appData.childAge ? appData.childAge.toString() : "",
          date: "",
          examiner: "",
          
          // Joint Story Creation (10 minutes)
          sharedIdeaExchangeRating: "",
          sharedIdeaExchangeNotes: "",
          emotionalWarmthRating: "",
          emotionalWarmthNotes: "",
          balanceOfLeadershipRating: "",
          balanceOfLeadershipNotes: "",
          communicationStyleRating: "",
          communicationStyleNotes: "",
          mutualCreativityRating: "",
          mutualCreativityNotes: "",
          
          // Separation - Child Continues Solo (10 minutes)
          independenceRating: "",
          independenceNotes: "",
          confidenceHesitationRating: "",
          confidenceHesitationNotes: "",
          taskEngagementRating: "",
          taskEngagementNotes: "",
          creativeExpansionRating: "",
          creativeExpansionNotes: "",
          
          // Teaching Moment - Comic Strip (10 minutes)
          teachingStyleRating: "",
          teachingStyleNotes: "",
          patienceEncouragementRating: "",
          patienceEncouragementNotes: "",
          parentClarityRating: "",
          parentClarityNotes: "",
          childEngagementRating: "",
          childEngagementNotes: "",
          
          // Parenting Style & Dynamic Insights
          parentDominantStyleDirective: false,
          parentDominantStyleSupportive: false,
          parentDominantStyleDetached: false,
          parentDominantStyleFacilitative: false,
          emotionalAttunementHigh: false,
          emotionalAttunementModerate: false,
          emotionalAttunementLow: false,
          encouragementStylePraiseFocused: false,
          encouragementStyleProcessFocused: false,
          encouragementStyleCorrectionFocused: false,
          attachmentSignalSecure: false,
          attachmentSignalAnxious: false,
          attachmentSignalAvoidant: false,
          attachmentSignalDisengaged: false,
          
          // Child Meta-Skills During Assessment
          confidenceAutonomyObserved: false,
          confidenceAutonomyNotes: "",
          emotionalRegulationObserved: false,
          emotionalRegulationNotes: "",
          curiosityObserved: false,
          curiosityNotes: "",
          creativityExpressionObserved: false,
          creativityExpressionNotes: "",
          selfDirectedLearningObserved: false,
          selfDirectedLearningNotes: "",
          communicationObserved: false,
          communicationNotes: "",
          
          // Learning Type & Intelligence Clues
          linguisticObserved: false,
          linguisticStronglyEvident: false,
          linguisticNotes: "",
          logicalMathematicalObserved: false,
          logicalMathematicalStronglyEvident: false,
          logicalMathematicalNotes: "",
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
          
          // Dynamic Summary & Reflection
          parentChildDynamicStandout: "",
          childExpressiveWithWithoutParent: "",
          parentGuidanceHindrance: "",
          
          // Red Flags or Follow-up Needs
          emotionalDistressFlag: false,
          parentOverDirectionFlag: false,
          confidenceIssueFlag: false,
          noFlagsFlag: false,
          redFlagsNotes: "",
          
          // Office Use Only
          applicationNumber: params.id,
          observerName: "",
          assessmentDate: "",
          loggedToSystemDate: "",
          loggedBy: "",
        });
      }
    })();
  }, [params.id, reset]);

  const onSubmit = async (values: FormValues) => {
    setSaving(true);
    try {
      const response = await apiService.post("/api/admin/parent-child-dynamic-observation", {
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
          Parent-Child Dynamic Observation Form
        </div>
        <div className="text-sm text-slate-600">
          Application ID: {params.id}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Child Information */}
        <section className="bg-white rounded-xl mb-6 shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Child Information"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              htmlFor="childFullName"
              error={errors.childFullName as any}
            >
              <Input id="childFullName" {...register("childFullName")} />
            </FormField>
            <FormField label="Age" htmlFor="childAge" error={errors.childAge as any}>
              <Input id="childAge" {...register("childAge")} />
            </FormField>
            <FormField label="Date" htmlFor="date">
              <Input id="date" {...register("date" as any)} />
            </FormField>
            <FormField label="Examiner" htmlFor="examiner">
              <Input id="examiner" {...register("examiner" as any)} />
            </FormField>
          </div>
        </section>

        {/* Joint Story Creation (10 minutes) */}
        <section className="bg-white rounded-xl mb-6 shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Joint Story Creation (10 minutes)"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p><strong>Prompt:</strong> Pick three or more of these objects together and come up with a story...</p>
          </div>

          <div className="space-y-4">
            {/* Shared Idea Exchange */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Shared Idea Exchange</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="sharedIdeaExchangeRating"
                  error={errors.sharedIdeaExchangeRating as any}
                >
                  <select
                    id="sharedIdeaExchangeRating"
                    {...register("sharedIdeaExchangeRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.sharedIdeaExchangeRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="sharedIdeaExchangeNotes">
                  <Textarea
                    rows={3}
                    id="sharedIdeaExchangeNotes"
                    {...register("sharedIdeaExchangeNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Emotional Warmth */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Emotional Warmth</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="emotionalWarmthRating"
                  error={errors.emotionalWarmthRating as any}
                >
                  <select
                    id="emotionalWarmthRating"
                    {...register("emotionalWarmthRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.emotionalWarmthRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="emotionalWarmthNotes">
                  <Textarea
                    rows={3}
                    id="emotionalWarmthNotes"
                    {...register("emotionalWarmthNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Balance of Leadership */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Balance of Leadership</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="balanceOfLeadershipRating"
                  error={errors.balanceOfLeadershipRating as any}
                >
                  <select
                    id="balanceOfLeadershipRating"
                    {...register("balanceOfLeadershipRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.balanceOfLeadershipRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="balanceOfLeadershipNotes">
                  <Textarea
                    rows={3}
                    id="balanceOfLeadershipNotes"
                    {...register("balanceOfLeadershipNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Communication Style (Interruptive / Listening) */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Communication Style (Interruptive / Listening)</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="communicationStyleRating"
                  error={errors.communicationStyleRating as any}
                >
                  <select
                    id="communicationStyleRating"
                    {...register("communicationStyleRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.communicationStyleRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="communicationStyleNotes">
                  <Textarea
                    rows={3}
                    id="communicationStyleNotes"
                    {...register("communicationStyleNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Mutual Creativity */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Mutual Creativity</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="mutualCreativityRating"
                  error={errors.mutualCreativityRating as any}
                >
                  <select
                    id="mutualCreativityRating"
                    {...register("mutualCreativityRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.mutualCreativityRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="mutualCreativityNotes">
                  <Textarea
                    rows={3}
                    id="mutualCreativityNotes"
                    {...register("mutualCreativityNotes")}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </section>

        {/* Separation - Child Continues Solo (10 minutes) */}
        <section className="bg-white rounded-xl mb-6 shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Separation - Child Continues Solo (10 minutes)"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p><strong>Prompt:</strong> [Parent], please step outside... [Child], keep the story going...</p>
          </div>

          <div className="space-y-4">
            {/* Independence */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Independence</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="independenceRating"
                  error={errors.independenceRating as any}
                >
                  <select
                    id="independenceRating"
                    {...register("independenceRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.independenceRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="independenceNotes">
                  <Textarea
                    rows={3}
                    id="independenceNotes"
                    {...register("independenceNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Confidence / Hesitation */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Confidence / Hesitation</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="confidenceHesitationRating"
                  error={errors.confidenceHesitationRating as any}
                >
                  <select
                    id="confidenceHesitationRating"
                    {...register("confidenceHesitationRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.confidenceHesitationRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="confidenceHesitationNotes">
                  <Textarea
                    rows={3}
                    id="confidenceHesitationNotes"
                    {...register("confidenceHesitationNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Task Engagement */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Task Engagement</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="taskEngagementRating"
                  error={errors.taskEngagementRating as any}
                >
                  <select
                    id="taskEngagementRating"
                    {...register("taskEngagementRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.taskEngagementRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="taskEngagementNotes">
                  <Textarea
                    rows={3}
                    id="taskEngagementNotes"
                    {...register("taskEngagementNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Creative Expansion */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Creative Expansion</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="creativeExpansionRating"
                  error={errors.creativeExpansionRating as any}
                >
                  <select
                    id="creativeExpansionRating"
                    {...register("creativeExpansionRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.creativeExpansionRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="creativeExpansionNotes">
                  <Textarea
                    rows={3}
                    id="creativeExpansionNotes"
                    {...register("creativeExpansionNotes")}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </section>

        {/* Teaching Moment - Comic Strip (10 minutes) */}
        <section className="bg-white rounded-xl mb-6 shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Teaching Moment - Comic Strip (10 minutes)"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p><strong>Prompt:</strong> Now teach your child how to turn this into a comic...</p>
          </div>

          <div className="space-y-4">
            {/* Teaching Style (Directive vs. Facilitative) */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Teaching Style (Directive vs. Facilitative)</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="teachingStyleRating"
                  error={errors.teachingStyleRating as any}
                >
                  <select
                    id="teachingStyleRating"
                    {...register("teachingStyleRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.teachingStyleRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="teachingStyleNotes">
                  <Textarea
                    rows={3}
                    id="teachingStyleNotes"
                    {...register("teachingStyleNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Patience / Encouragement */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Patience / Encouragement</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="patienceEncouragementRating"
                  error={errors.patienceEncouragementRating as any}
                >
                  <select
                    id="patienceEncouragementRating"
                    {...register("patienceEncouragementRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.patienceEncouragementRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="patienceEncouragementNotes">
                  <Textarea
                    rows={3}
                    id="patienceEncouragementNotes"
                    {...register("patienceEncouragementNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Parent's Clarity of Instruction */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Parent's Clarity of Instruction</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="parentClarityRating"
                  error={errors.parentClarityRating as any}
                >
                  <select
                    id="parentClarityRating"
                    {...register("parentClarityRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.parentClarityRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="parentClarityNotes">
                  <Textarea
                    rows={3}
                    id="parentClarityNotes"
                    {...register("parentClarityNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Child's Engagement & Expression */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Child's Engagement & Expression</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="childEngagementRating"
                  error={errors.childEngagementRating as any}
                >
                  <select
                    id="childEngagementRating"
                    {...register("childEngagementRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.childEngagementRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="childEngagementNotes">
                  <Textarea
                    rows={3}
                    id="childEngagementNotes"
                    {...register("childEngagementNotes")}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </section>

        {/* Parenting Style & Dynamic Insights */}
        <section className="bg-white rounded-xl mb-6 shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Parenting Style & Dynamic Insights"
            bgClassName="bg-teal-700"
          />
          
          <div className="space-y-4">
            {/* Parent's Dominant Style */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Parent's Dominant Style</div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="parentDominantStyleDirective"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Directive</span>
                    </label>
                  )}
                />
                <Controller
                  name="parentDominantStyleSupportive"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Supportive</span>
                    </label>
                  )}
                />
                <Controller
                  name="parentDominantStyleDetached"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Detached</span>
                    </label>
                  )}
                />
                <Controller
                  name="parentDominantStyleFacilitative"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Facilitative</span>
                    </label>
                  )}
                />
              </div>
            </div>

            {/* Emotional Attunement */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Emotional Attunement</div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="emotionalAttunementHigh"
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
                  name="emotionalAttunementModerate"
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
                  name="emotionalAttunementLow"
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
              </div>
            </div>

            {/* Encouragement Style */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Encouragement Style</div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="encouragementStylePraiseFocused"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Praise-Focused</span>
                    </label>
                  )}
                />
                <Controller
                  name="encouragementStyleProcessFocused"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Process-Focused</span>
                    </label>
                  )}
                />
                <Controller
                  name="encouragementStyleCorrectionFocused"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Correction-Focused</span>
                    </label>
                  )}
                />
              </div>
            </div>

            {/* Attachment Signal */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Attachment Signal</div>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="attachmentSignalSecure"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Secure</span>
                    </label>
                  )}
                />
                <Controller
                  name="attachmentSignalAnxious"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Anxious</span>
                    </label>
                  )}
                />
                <Controller
                  name="attachmentSignalAvoidant"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Avoidant</span>
                    </label>
                  )}
                />
                <Controller
                  name="attachmentSignalDisengaged"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">Disengaged</span>
                    </label>
                  )}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Child Meta-Skills During Assessment */}
        <section className="bg-white rounded-xl mb-6 shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Child Meta-Skills During Assessment"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>Check if it is evident in any phase.</p>
          </div>

          <div className="space-y-4">
            {/* Confidence / Autonomy */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Confidence / Autonomy</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Observed?" htmlFor="confidenceAutonomyObserved">
                  <div className="flex gap-4">
                    <Controller
                      name="confidenceAutonomyObserved"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                          />
                          <span className="text-slate-700">Yes</span>
                        </label>
                      )}
                    />
                  </div>
                </FormField>
                <FormField label="Notes" htmlFor="confidenceAutonomyNotes">
                  <Textarea
                    rows={3}
                    id="confidenceAutonomyNotes"
                    {...register("confidenceAutonomyNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Emotional Regulation */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Emotional Regulation</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Observed?" htmlFor="emotionalRegulationObserved">
                  <div className="flex gap-4">
                    <Controller
                      name="emotionalRegulationObserved"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                          />
                          <span className="text-slate-700">Yes</span>
                        </label>
                      )}
                    />
                  </div>
                </FormField>
                <FormField label="Notes" htmlFor="emotionalRegulationNotes">
                  <Textarea
                    rows={3}
                    id="emotionalRegulationNotes"
                    {...register("emotionalRegulationNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Curiosity */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Curiosity</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Observed?" htmlFor="curiosityObserved">
                  <div className="flex gap-4">
                    <Controller
                      name="curiosityObserved"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                          />
                          <span className="text-slate-700">Yes</span>
                        </label>
                      )}
                    />
                  </div>
                </FormField>
                <FormField label="Notes" htmlFor="curiosityNotes">
                  <Textarea
                    rows={3}
                    id="curiosityNotes"
                    {...register("curiosityNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Creativity / Expression */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Creativity / Expression</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Observed?" htmlFor="creativityExpressionObserved">
                  <div className="flex gap-4">
                    <Controller
                      name="creativityExpressionObserved"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                          />
                          <span className="text-slate-700">Yes</span>
                        </label>
                      )}
                    />
                  </div>
                </FormField>
                <FormField label="Notes" htmlFor="creativityExpressionNotes">
                  <Textarea
                    rows={3}
                    id="creativityExpressionNotes"
                    {...register("creativityExpressionNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Self-Directed Learning */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Self-Directed Learning</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Observed?" htmlFor="selfDirectedLearningObserved">
                  <div className="flex gap-4">
                    <Controller
                      name="selfDirectedLearningObserved"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                          />
                          <span className="text-slate-700">Yes</span>
                        </label>
                      )}
                    />
                  </div>
                </FormField>
                <FormField label="Notes" htmlFor="selfDirectedLearningNotes">
                  <Textarea
                    rows={3}
                    id="selfDirectedLearningNotes"
                    {...register("selfDirectedLearningNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Communication */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Communication</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Observed?" htmlFor="communicationObserved">
                  <div className="flex gap-4">
                    <Controller
                      name="communicationObserved"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                          />
                          <span className="text-slate-700">Yes</span>
                        </label>
                      )}
                    />
                  </div>
                </FormField>
                <FormField label="Notes" htmlFor="communicationNotes">
                  <Textarea
                    rows={3}
                    id="communicationNotes"
                    {...register("communicationNotes")}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Type & Intelligence Clues */}
        <section className="bg-white rounded-xl mb-6 shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Learning Type & Intelligence Clues"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>Use ✓ for observed, + for strongly evident. Add behaviour examples if possible.</p>
          </div>

          <div className="space-y-4">
            {/* Linguistic */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Linguistic (Word-Smart)</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex gap-4">
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
                        <span className="text-slate-700">✓ Observed</span>
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
                        <span className="text-slate-700">+ Strongly Evident</span>
                      </label>
                    )}
                  />
                </div>
                <FormField label="Supporting Observation" htmlFor="linguisticNotes">
                  <Textarea
                    rows={3}
                    id="linguisticNotes"
                    {...register("linguisticNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Logical - Mathematical */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Logical - Mathematical</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex gap-4">
                  <Controller
                    name="logicalMathematicalObserved"
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <span className="text-slate-700">✓ Observed</span>
                      </label>
                    )}
                  />
                  <Controller
                    name="logicalMathematicalStronglyEvident"
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <span className="text-slate-700">+ Strongly Evident</span>
                      </label>
                    )}
                  />
                </div>
                <FormField label="Supporting Observation" htmlFor="logicalMathematicalNotes">
                  <Textarea
                    rows={3}
                    id="logicalMathematicalNotes"
                    {...register("logicalMathematicalNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Spatial */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Spatial (Visual/Spatial)</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex gap-4">
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
                        <span className="text-slate-700">✓ Observed</span>
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
                        <span className="text-slate-700">+ Strongly Evident</span>
                      </label>
                    )}
                  />
                </div>
                <FormField label="Supporting Observation" htmlFor="spatialNotes">
                  <Textarea
                    rows={3}
                    id="spatialNotes"
                    {...register("spatialNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Bodily - Kinesthetic */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Bodily - Kinesthetic</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex gap-4">
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
                        <span className="text-slate-700">✓ Observed</span>
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
                        <span className="text-slate-700">+ Strongly Evident</span>
                      </label>
                    )}
                  />
                </div>
                <FormField label="Supporting Observation" htmlFor="bodilyKinestheticNotes">
                  <Textarea
                    rows={3}
                    id="bodilyKinestheticNotes"
                    {...register("bodilyKinestheticNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Musical */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Musical (Sound /Rhythm Smart)</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex gap-4">
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
                        <span className="text-slate-700">✓ Observed</span>
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
                        <span className="text-slate-700">+ Strongly Evident</span>
                      </label>
                    )}
                  />
                </div>
                <FormField label="Supporting Observation" htmlFor="musicalNotes">
                  <Textarea
                    rows={3}
                    id="musicalNotes"
                    {...register("musicalNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Interpersonal */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Interpersonal (People Smart)</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex gap-4">
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
                        <span className="text-slate-700">✓ Observed</span>
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
                        <span className="text-slate-700">+ Strongly Evident</span>
                      </label>
                    )}
                  />
                </div>
                <FormField label="Supporting Observation" htmlFor="interpersonalNotes">
                  <Textarea
                    rows={3}
                    id="interpersonalNotes"
                    {...register("interpersonalNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Intrapersonal */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Intrapersonal (Self-Smart)</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex gap-4">
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
                        <span className="text-slate-700">✓ Observed</span>
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
                        <span className="text-slate-700">+ Strongly Evident</span>
                      </label>
                    )}
                  />
                </div>
                <FormField label="Supporting Observation" htmlFor="intrapersonalNotes">
                  <Textarea
                    rows={3}
                    id="intrapersonalNotes"
                    {...register("intrapersonalNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Naturalistic */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Naturalistic (Nature Smart)</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex gap-4">
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
                        <span className="text-slate-700">✓ Observed</span>
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
                        <span className="text-slate-700">+ Strongly Evident</span>
                      </label>
                    )}
                  />
                </div>
                <FormField label="Supporting Observation" htmlFor="naturalisticNotes">
                  <Textarea
                    rows={3}
                    id="naturalisticNotes"
                    {...register("naturalisticNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Existential */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Existential (Big Question)</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex gap-4">
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
                        <span className="text-slate-700">✓ Observed</span>
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
                        <span className="text-slate-700">+ Strongly Evident</span>
                      </label>
                    )}
                  />
                </div>
                <FormField label="Supporting Observation" htmlFor="existentialNotes">
                  <Textarea
                    rows={3}
                    id="existentialNotes"
                    {...register("existentialNotes")}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Summary & Reflection */}
        <section className="bg-white rounded-xl mb-6 shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Dynamic Summary & Reflection"
            bgClassName="bg-teal-700"
          />
          
          <div className="space-y-4 mt-2">
            <FormField label="1. What stood out in the parent-child dynamic?" htmlFor="parentChildDynamicStandout">
              <Textarea
                rows={5}
                id="parentChildDynamicStandout"
                {...register("parentChildDynamicStandout")}
              />
            </FormField>

            <FormField label="2. Was the child more expressive with or without the parent present?" htmlFor="childExpressiveWithWithoutParent">
              <Textarea
                rows={6}
                id="childExpressiveWithWithoutParent"
                {...register("childExpressiveWithWithoutParent")}
              />
            </FormField>

            <FormField label="3. Describe how the parent guided or hindered learning:" htmlFor="parentGuidanceHindrance">
              <Textarea
                rows={6}
                id="parentGuidanceHindrance"
                {...register("parentGuidanceHindrance")}
              />
            </FormField>
          </div>
        </section>

        {/* Red Flags or Follow-up Needs */}
        <section className="bg-white rounded-xl mb-6 shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Red Flags or Follow-up Needs"
            bgClassName="bg-teal-700"
          />
          
          <div className="space-y-4 mt-3">
            <div className="flex flex-wrap gap-4">
              <Controller
                name="emotionalDistressFlag"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                    />
                    <span className="text-slate-700">Emotional distress</span>
                  </label>
                )}
              />
              <Controller
                name="parentOverDirectionFlag"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                    />
                    <span className="text-slate-700">Parent over-direction</span>
                  </label>
                )}
              />
              <Controller
                name="confidenceIssueFlag"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                    />
                    <span className="text-slate-700">Confidence issue</span>
                  </label>
                )}
              />
              <Controller
                name="noFlagsFlag"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                    />
                    <span className="text-slate-700">None</span>
                  </label>
                )}
              />
            </div>
            
            <FormField label="Notes:" htmlFor="redFlagsNotes">
              <Textarea
                rows={4}
                id="redFlagsNotes"
                {...register("redFlagsNotes")}
              />
            </FormField>
          </div>
        </section>

        {/* Office Use Only */}
        {/* <section className="bg-white rounded-xl mb-6 shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Office Use Only"
            bgClassName="bg-teal-700"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <FormField label="Application Number" htmlFor="applicationNumber">
              <Input id="applicationNumber" {...register("applicationNumber")} />
            </FormField>
            <FormField label="Observer Name" htmlFor="observerName">
              <Input id="observerName" {...register("observerName")} />
            </FormField>
            <FormField label="Assessment Date" htmlFor="assessmentDate">
              <Input id="assessmentDate" {...register("assessmentDate")} />
            </FormField>
            <FormField label="Logged to System Date" htmlFor="loggedToSystemDate">
              <Input id="loggedToSystemDate" {...register("loggedToSystemDate")} />
            </FormField>
            <FormField label="Logged by" htmlFor="loggedBy">
              <Input id="loggedBy" {...register("loggedBy")} />
            </FormField>
          </div>
        </section> */}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Parent-Child Dynamic Observation"}
          </button>
        </div>
      </form>
    </div>
  );
}
