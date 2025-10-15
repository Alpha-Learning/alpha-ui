"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, Input, Textarea, FormSectionHeader } from "@/app/components/forms/FormField";
import { apiService } from "@/app/utils";

const schema = z.object({
  fullName: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  age: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  // Opening Engagement answers
  areaLikeBest: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  whatMakesInteresting: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  hardButFun: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  feelWhenTryingNew: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  teachGame: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  // Ratings (per zone)
  zoneAScore: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  zoneANotes: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  zoneBScore: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  zoneBNotes: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  zoneCScore: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  zoneCNotes: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  zoneDScore: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  zoneDNotes: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  // Meta skills
  metaSelfReg: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  metaNotesSelfReg: z.string().optional(),
  metaCuriosity: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  metaNotesCuriosity: z.string().optional(),
  metaSocial: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  metaNotesSocial: z.string().optional(),
  metaEmotional: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  metaNotesEmotional: z.string().optional(),
  metaConfidence: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  metaNotesConfidence: z.string().optional(),
  // Examiner final comments (required)
  mostEngagedZone: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  dominantObservedIntelligences: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  initialLearningStyleImpressions: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  earlyFlagsNeedsFollowUp: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  selfDirectedVsSeekingGuidance: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  finalAdditionalNotes: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  // Intelligence evidence (checkboxes)
  intelLinguisticEvidenceModerate: z.boolean().default(false),
  intelLinguisticEvidenceStrong: z.boolean().default(false),
  intelLogicalEvidenceModerate: z.boolean().default(false),
  intelLogicalEvidenceStrong: z.boolean().default(false),
  intelSpatialEvidenceModerate: z.boolean().default(false),
  intelSpatialEvidenceStrong: z.boolean().default(false),
  intelBodilyEvidenceModerate: z.boolean().default(false),
  intelBodilyEvidenceStrong: z.boolean().default(false),
  intelMusicalEvidenceModerate: z.boolean().default(false),
  intelMusicalEvidenceStrong: z.boolean().default(false),
  intelInterpersonalEvidenceModerate: z.boolean().default(false),
  intelInterpersonalEvidenceStrong: z.boolean().default(false),
  intelIntrapersonalEvidenceModerate: z.boolean().default(false),
  intelIntrapersonalEvidenceStrong: z.boolean().default(false),
  intelNaturalisticEvidenceModerate: z.boolean().default(false),
  intelNaturalisticEvidenceStrong: z.boolean().default(false),
  intelExistentialEvidenceModerate: z.boolean().default(false),
  intelExistentialEvidenceStrong: z.boolean().default(false),
  // Supporting observations for each intelligence type
  intelLinguistic: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  intelLogical: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  intelSpatial: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  intelBodily: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  intelMusical: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  intelInterpersonal: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  intelIntrapersonal: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  intelNaturalistic: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  intelExistential: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  // Parent–Child dynamic snapshot (required)
  parentProximity: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  parentInterventionLevel: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  parentInterventionStyle: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  childIndependenceLevel: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  childEmotionalWithParent: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  childIndependenceWhenParentEngaged: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  emotionalRegulationWithParentPresent: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  // Interaction summary
  interactionPreferredZone: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  interactionInitialBehaviour: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  interactionOpennessToAdultGuidance: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  interactionMostRevealingActivity: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  interactionCrossRefStep5: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  interactionCuriosityExploration: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  interactionFocusAttention: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  interactionEngagementWithAdult: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  interactionResilienceInChallenge: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  interactionEmotionRegulationSignals: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  interactionCaregiverInteractionStyle: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  interactionRecommendations: z.string().nullish().transform(val => val || "").pipe(z.string().min(1, "Required")),
  // Office use
  applicationNumber: z.string().optional(),
  observerName: z.string().optional(),
  assessmentDate: z.string().optional(),
  loggedToSystemDate: z.string().optional(),
  loggedBy: z.string().optional(),
})
// Require at least one evidence checkbox per intelligence row
.refine((v) => v.intelLinguisticEvidenceModerate || v.intelLinguisticEvidenceStrong, { path: ["intelLinguisticEvidenceModerate"], message: "Select evidence" })
.refine((v) => v.intelLogicalEvidenceModerate || v.intelLogicalEvidenceStrong, { path: ["intelLogicalEvidenceModerate"], message: "Select evidence" })
.refine((v) => v.intelSpatialEvidenceModerate || v.intelSpatialEvidenceStrong, { path: ["intelSpatialEvidenceModerate"], message: "Select evidence" })
.refine((v) => v.intelBodilyEvidenceModerate || v.intelBodilyEvidenceStrong, { path: ["intelBodilyEvidenceModerate"], message: "Select evidence" })
.refine((v) => v.intelMusicalEvidenceModerate || v.intelMusicalEvidenceStrong, { path: ["intelMusicalEvidenceModerate"], message: "Select evidence" })
.refine((v) => v.intelInterpersonalEvidenceModerate || v.intelInterpersonalEvidenceStrong, { path: ["intelInterpersonalEvidenceModerate"], message: "Select evidence" })
.refine((v) => v.intelIntrapersonalEvidenceModerate || v.intelIntrapersonalEvidenceStrong, { path: ["intelIntrapersonalEvidenceModerate"], message: "Select evidence" })
.refine((v) => v.intelNaturalisticEvidenceModerate || v.intelNaturalisticEvidenceStrong, { path: ["intelNaturalisticEvidenceModerate"], message: "Select evidence" })
.refine((v) => v.intelExistentialEvidenceModerate || v.intelExistentialEvidenceStrong, { path: ["intelExistentialEvidenceModerate"], message: "Select evidence" });
type FormValues = z.infer<typeof schema>;

export default function GuidedObservationsProcedurePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "", age: "",
      areaLikeBest: "", whatMakesInteresting: "", hardButFun: "", feelWhenTryingNew: "", teachGame: "",
      zoneAScore: "", zoneANotes: "", zoneBScore: "", zoneBNotes: "", zoneCScore: "", zoneCNotes: "", zoneDScore: "", zoneDNotes: "",
      metaSelfReg: "", metaNotesSelfReg: "", metaCuriosity: "", metaNotesCuriosity: "", metaSocial: "", metaNotesSocial: "", metaEmotional: "", metaNotesEmotional: "", metaConfidence: "", metaNotesConfidence: "",
      mostEngagedZone: "", dominantObservedIntelligences: "", initialLearningStyleImpressions: "", earlyFlagsNeedsFollowUp: "", selfDirectedVsSeekingGuidance: "", finalAdditionalNotes: "",
      intelLinguisticEvidenceModerate: false, intelLinguisticEvidenceStrong: false,
      intelLogicalEvidenceModerate: false, intelLogicalEvidenceStrong: false,
      intelSpatialEvidenceModerate: false, intelSpatialEvidenceStrong: false,
      intelBodilyEvidenceModerate: false, intelBodilyEvidenceStrong: false,
      intelMusicalEvidenceModerate: false, intelMusicalEvidenceStrong: false,
      intelInterpersonalEvidenceModerate: false, intelInterpersonalEvidenceStrong: false,
      intelIntrapersonalEvidenceModerate: false, intelIntrapersonalEvidenceStrong: false,
      intelNaturalisticEvidenceModerate: false, intelNaturalisticEvidenceStrong: false,
      intelExistentialEvidenceModerate: false, intelExistentialEvidenceStrong: false,
      intelLinguistic: "", intelLogical: "", intelSpatial: "", intelBodily: "", intelMusical: "",
      intelInterpersonal: "", intelIntrapersonal: "", intelNaturalistic: "", intelExistential: "",
      interactionPreferredZone: "", interactionInitialBehaviour: "", interactionOpennessToAdultGuidance: "",
      interactionMostRevealingActivity: "", interactionCrossRefStep5: "", interactionCuriosityExploration: "", interactionFocusAttention: "", interactionEngagementWithAdult: "", interactionResilienceInChallenge: "", interactionEmotionRegulationSignals: "", interactionCaregiverInteractionStyle: "", interactionRecommendations: "",
      applicationNumber: "", observerName: "", assessmentDate: "", loggedToSystemDate: "", loggedBy: "",
    }
  });

  // Helper to safely check field errors when using dynamic keys
  const hasError = (name: keyof FormValues) => Boolean((errors as any)?.[name]);

  useEffect(() => { 
    (async () => { 
      // Load existing form data
      const res = await apiService.get(`/api/admin/guided-observations-procedure?applicationId=${params.id}`);
      
      // Load application data for auto-filling
      const appRes = await apiService.getApplicationData(params.id);
      
      if (res.success && res.data) {
        // Use existing form data
        reset({
          fullName: res.data.fullName || "", 
          age: res.data.age || "",
          areaLikeBest: res.data.areaLikeBest || res.data.guidingQ1 || "",
          whatMakesInteresting: res.data.whatMakesInteresting || res.data.guidingQ2 || "",
          hardButFun: res.data.hardButFun || res.data.guidingQ3 || "",
          feelWhenTryingNew: res.data.feelWhenTryingNew || res.data.guidingQ4 || "",
          teachGame: res.data.teachGame || res.data.guidingQ5 || "",
          zoneAScore: res.data.zoneAScore || "", 
          zoneANotes: res.data.zoneANotes || "",
          zoneBScore: res.data.zoneBScore || "", 
          zoneBNotes: res.data.zoneBNotes || "",
          zoneCScore: res.data.zoneCScore || "", 
          zoneCNotes: res.data.zoneCNotes || "",
          zoneDScore: res.data.zoneDScore || "", 
          zoneDNotes: res.data.zoneDNotes || "",
          metaSelfReg: res.data.metaSelfReg || "", 
          metaNotesSelfReg: res.data.metaNotesSelfReg || "",
          metaCuriosity: res.data.metaCuriosity || "", 
          metaNotesCuriosity: res.data.metaNotesCuriosity || "",
          metaSocial: res.data.metaSocial || "", 
          metaNotesSocial: res.data.metaNotesSocial || "",
          metaEmotional: res.data.metaEmotional || "", 
          metaNotesEmotional: res.data.metaNotesEmotional || "",
          metaConfidence: res.data.metaConfidence || "", 
          metaNotesConfidence: res.data.metaNotesConfidence || "",
          mostEngagedZone: res.data.mostEngagedZone || "",
          dominantObservedIntelligences: res.data.dominantObservedIntelligences || "",
          initialLearningStyleImpressions: res.data.initialLearningStyleImpressions || "",
          earlyFlagsNeedsFollowUp: res.data.earlyFlagsNeedsFollowUp || "",
          selfDirectedVsSeekingGuidance: res.data.selfDirectedVsSeekingGuidance || "",
          finalAdditionalNotes: res.data.finalAdditionalNotes || "",
          intelLinguisticEvidenceModerate: res.data.intelLinguisticEvidenceModerate || false, 
          intelLinguisticEvidenceStrong: res.data.intelLinguisticEvidenceStrong || false,
          intelLogicalEvidenceModerate: res.data.intelLogicalEvidenceModerate || false, 
          intelLogicalEvidenceStrong: res.data.intelLogicalEvidenceStrong || false,
          intelSpatialEvidenceModerate: res.data.intelSpatialEvidenceModerate || false, 
          intelSpatialEvidenceStrong: res.data.intelSpatialEvidenceStrong || false,
          intelBodilyEvidenceModerate: res.data.intelBodilyEvidenceModerate || false, 
          intelBodilyEvidenceStrong: res.data.intelBodilyEvidenceStrong || false,
          intelMusicalEvidenceModerate: res.data.intelMusicalEvidenceModerate || false, 
          intelMusicalEvidenceStrong: res.data.intelMusicalEvidenceStrong || false,
          intelInterpersonalEvidenceModerate: res.data.intelInterpersonalEvidenceModerate || false, 
          intelInterpersonalEvidenceStrong: res.data.intelInterpersonalEvidenceStrong || false,
          intelIntrapersonalEvidenceModerate: res.data.intelIntrapersonalEvidenceModerate || false, 
          intelIntrapersonalEvidenceStrong: res.data.intelIntrapersonalEvidenceStrong || false,
          intelNaturalisticEvidenceModerate: res.data.intelNaturalisticEvidenceModerate || false, 
          intelNaturalisticEvidenceStrong: res.data.intelNaturalisticEvidenceStrong || false,
          intelExistentialEvidenceModerate: res.data.intelExistentialEvidenceModerate || false, 
          intelExistentialEvidenceStrong: res.data.intelExistentialEvidenceStrong || false,
          intelLinguistic: res.data.intelLinguistic || "", 
          intelLogical: res.data.intelLogical || "", 
          intelSpatial: res.data.intelSpatial || "", 
          intelBodily: res.data.intelBodily || "", 
          intelMusical: res.data.intelMusical || "",
          intelInterpersonal: res.data.intelInterpersonal || "", 
          intelIntrapersonal: res.data.intelIntrapersonal || "", 
          intelNaturalistic: res.data.intelNaturalistic || "", 
          intelExistential: res.data.intelExistential || "",
          parentProximity: res.data.parentProximity || "", 
          parentInterventionLevel: res.data.parentInterventionLevel || "", 
          parentInterventionStyle: res.data.parentInterventionStyle || "",
          childIndependenceLevel: res.data.childIndependenceLevel || "", 
          childEmotionalWithParent: res.data.childEmotionalWithParent || "", 
          childIndependenceWhenParentEngaged: res.data.childIndependenceWhenParentEngaged || "", 
          emotionalRegulationWithParentPresent: res.data.emotionalRegulationWithParentPresent || "",
          interactionPreferredZone: res.data.interactionPreferredZone || "", 
          interactionInitialBehaviour: res.data.interactionInitialBehaviour || "", 
          interactionOpennessToAdultGuidance: res.data.interactionOpennessToAdultGuidance || "",
          interactionMostRevealingActivity: res.data.interactionMostRevealingActivity || "", 
          interactionCrossRefStep5: res.data.interactionCrossRefStep5 || "", 
          interactionCuriosityExploration: res.data.interactionCuriosityExploration || "", 
          interactionFocusAttention: res.data.interactionFocusAttention || "", 
          interactionEngagementWithAdult: res.data.interactionEngagementWithAdult || "", 
          interactionResilienceInChallenge: res.data.interactionResilienceInChallenge || "", 
          interactionEmotionRegulationSignals: res.data.interactionEmotionRegulationSignals || "", 
          interactionCaregiverInteractionStyle: res.data.interactionCaregiverInteractionStyle || "", 
          interactionRecommendations: res.data.interactionRecommendations || "",
          applicationNumber: res.data.applicationNumber || "", 
          observerName: res.data.observerName || "", 
          assessmentDate: res.data.assessmentDate || "", 
          loggedToSystemDate: res.data.loggedToSystemDate || "", 
          loggedBy: res.data.loggedBy || "",
        });
      } else if (appRes.success && appRes.data) {
        // Auto-fill with application data if no existing form data
        const appData = appRes.data;
        reset({
          fullName: appData.childFullName || "", 
          age: appData.childAge ? appData.childAge.toString() : "",
          areaLikeBest: "",
          whatMakesInteresting: "",
          hardButFun: "",
          feelWhenTryingNew: "",
          teachGame: "",
          zoneAScore: "", 
          zoneANotes: "",
          zoneBScore: "", 
          zoneBNotes: "",
          zoneCScore: "", 
          zoneCNotes: "",
          zoneDScore: "", 
          zoneDNotes: "",
          metaSelfReg: "", 
          metaNotesSelfReg: "",
          metaCuriosity: "", 
          metaNotesCuriosity: "",
          metaSocial: "", 
          metaNotesSocial: "",
          metaEmotional: "", 
          metaNotesEmotional: "",
          metaConfidence: "", 
          metaNotesConfidence: "",
          mostEngagedZone: "",
          dominantObservedIntelligences: "",
          initialLearningStyleImpressions: "",
          earlyFlagsNeedsFollowUp: "",
          selfDirectedVsSeekingGuidance: "",
          finalAdditionalNotes: "",
          intelLinguisticEvidenceModerate: false, 
          intelLinguisticEvidenceStrong: false,
          intelLogicalEvidenceModerate: false, 
          intelLogicalEvidenceStrong: false,
          intelSpatialEvidenceModerate: false, 
          intelSpatialEvidenceStrong: false,
          intelBodilyEvidenceModerate: false, 
          intelBodilyEvidenceStrong: false,
          intelMusicalEvidenceModerate: false, 
          intelMusicalEvidenceStrong: false,
          intelInterpersonalEvidenceModerate: false, 
          intelInterpersonalEvidenceStrong: false,
          intelIntrapersonalEvidenceModerate: false, 
          intelIntrapersonalEvidenceStrong: false,
          intelNaturalisticEvidenceModerate: false, 
          intelNaturalisticEvidenceStrong: false,
          intelExistentialEvidenceModerate: false, 
          intelExistentialEvidenceStrong: false,
          intelLinguistic: "", 
          intelLogical: "", 
          intelSpatial: "", 
          intelBodily: "", 
          intelMusical: "",
          intelInterpersonal: "", 
          intelIntrapersonal: "", 
          intelNaturalistic: "", 
          intelExistential: "",
          parentProximity: "", 
          parentInterventionLevel: "", 
          parentInterventionStyle: "",
          childIndependenceLevel: "", 
          childEmotionalWithParent: "", 
          childIndependenceWhenParentEngaged: "", 
          emotionalRegulationWithParentPresent: "",
          interactionPreferredZone: "", 
          interactionInitialBehaviour: "", 
          interactionOpennessToAdultGuidance: "",
          interactionMostRevealingActivity: "", 
          interactionCrossRefStep5: "", 
          interactionCuriosityExploration: "", 
          interactionFocusAttention: "", 
          interactionEngagementWithAdult: "", 
          interactionResilienceInChallenge: "", 
          interactionEmotionRegulationSignals: "", 
          interactionCaregiverInteractionStyle: "", 
          interactionRecommendations: "",
          applicationNumber: params.id, 
          observerName: "", 
          assessmentDate: "", 
          loggedToSystemDate: "", 
          loggedBy: "",
        });
      }
    })(); 
  }, [params.id, reset]);

  const onSubmit = async (values: FormValues) => { setSaving(true); await apiService.post("/api/admin/guided-observations-procedure", { applicationId: params.id, ...values }); setSaving(false); router.push(`/admin/applications/${params.id}`); };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <div className="text-xl font-bold text-slate-900">Guided Observations Procedure</div>
        <div className="text-sm text-slate-600">Application ID: {params.id}</div>
      </div>

      {/* Opening Engagement + Structured Activities by Zone */}
      <section className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <FormSectionHeader title="Guided Interaction Session (30 minutes)" bgClassName="bg-teal-700" />
        <div className="mt-3">
          <div className="font-semibold text-slate-900 mb-2">1. Opening Engagement (10 minutes)</div>
          <ul className="list-disc pl-6 text-slate-800 space-y-1">
            <li>“Can you show me which area you like best?”</li>
            <li>“What makes that area interesting to you?”</li>
            <li>“Have you seen anything like this before?”</li>
          </ul>
          {/* Answers */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Answer: area you like best" htmlFor="areaLikeBest" error={errors.areaLikeBest as any}>
              <Textarea rows={3} id="areaLikeBest" {...register("areaLikeBest")} />
            </FormField>
            <FormField label="Answer: what makes it interesting" htmlFor="whatMakesInteresting" error={errors.whatMakesInteresting as any}>
              <Textarea rows={3} id="whatMakesInteresting" {...register("whatMakesInteresting")} />
            </FormField>
            <FormField label="Answer: seen anything like this before?" htmlFor="hardButFun" error={errors.hardButFun as any}>
              <Textarea rows={3} id="hardButFun" {...register("hardButFun")} />
            </FormField>
            <FormField label="Answer: how do you feel when trying something new?" htmlFor="feelWhenTryingNew" error={errors.feelWhenTryingNew as any}>
              <Textarea rows={3} id="feelWhenTryingNew" {...register("feelWhenTryingNew")} />
            </FormField>
            <FormField label="Answer: can you teach me how to use this game?" htmlFor="teachGame" error={errors.teachGame as any}>
              <Textarea rows={3} id="teachGame" {...register("teachGame")} />
            </FormField>
          </div>
        </div>
        <div className="mt-6">
          <div className="font-semibold text-slate-900 mb-2">2. Structured Activities by Zone</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-slate-300 text-sm">
              <thead className="bg-slate-100  text-slate-900">
                <tr>
                  <th className="border border-slate-300 px-3 py-2 w-10">#</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Zone</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Activity</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Materials</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Task</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Observation Points</th>
                </tr>
              </thead>
              <tbody className="align-top text-slate-900">
                <tr>
                  <td className="border border-slate-300 px-3 py-2">A</td>
                  <td className="border border-slate-300 px-3 py-2">Building & Engineering</td>
                  <td className="border border-slate-300 px-3 py-2">Engineering Challenge</td>
                  <td className="border border-slate-300 px-3 py-2">Magnetic tiles, bridge building kit</td>
                  <td className="border border-slate-300 px-3 py-2">Let’s build something that doesn’t exist yet</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Problem‑solving approach</li>
                      <li>Persistence</li>
                      <li>Creativity</li>
                      <li>Fine motor skills</li>
                      <li>Spatial reasoning</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2">B</td>
                  <td className="border border-slate-300 px-3 py-2">Creative Zone</td>
                  <td className="border border-slate-300 px-3 py-2">Creative Prompt</td>
                  <td className="border border-slate-300 px-3 py-2">Art supplies, ‘Design a New Planet’ template</td>
                  <td className="border border-slate-300 px-3 py-2">Guided drawing or creative design</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Imagination</li>
                      <li>Story‑telling ability</li>
                      <li>Colour usage</li>
                      <li>Detail orientation</li>
                      <li>Willingness to explain</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2">C</td>
                  <td className="border border-slate-300 px-3 py-2">Sensory & Regulation Corner</td>
                  <td className="border border-slate-300 px-3 py-2">Sensory Play</td>
                  <td className="border border-slate-300 px-3 py-2">Blindfolds, texture items, scent jars</td>
                  <td className="border border-slate-300 px-3 py-2">Blindfolded texture match, calming activities</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Sensory processing</li>
                      <li>Trust level</li>
                      <li>Self‑regulation</li>
                      <li>Comfort with uncertainty</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2">D</td>
                  <td className="border border-slate-300 px-3 py-2">Reading & Logic Station</td>
                  <td className="border border-slate-300 px-3 py-2">Logic Game</td>
                  <td className="border border-slate-300 px-3 py-2">Pattern puzzles, coding toy, sequencing cards</td>
                  <td className="border border-slate-300 px-3 py-2">Progressive difficulty puzzles</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Logical thinking</li>
                      <li>Pattern recognition</li>
                      <li>Frustration tolerance</li>
                      <li>Strategy development</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Guiding Questions */}
      <section className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <FormSectionHeader title="Guiding Questions" bgClassName="bg-teal-700" />
        <div className="mt-3 text-slate-800">
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>“Can you show me which area you like best?”</li>
            <li>“Let’s build something that doesn’t exist yet.”</li>
            <li>“What’s something that’s hard to do but fun to try?”</li>
            <li>“How do you feel when you try something new?”</li>
            <li>“Can you teach me how to use this game?”</li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Which area do you like best?" htmlFor="guidingQ1">
              <Textarea rows={3} id="guidingQ1" {...register("areaLikeBest")} />
              {errors.areaLikeBest && (
                <p className="text-red-500 text-sm mt-1">{errors.areaLikeBest.message}</p>
              )}
            </FormField>
            <FormField label="Let's build something that doesn't exist yet" htmlFor="guidingQ2">
              <Textarea rows={3} id="guidingQ2" {...register("whatMakesInteresting")} />
              {errors.whatMakesInteresting && (
                <p className="text-red-500 text-sm mt-1">{errors.whatMakesInteresting.message}</p>
              )}
            </FormField>
            <FormField label="What's hard to do but fun to try?" htmlFor="guidingQ3">
              <Textarea rows={3} id="guidingQ3" {...register("hardButFun")} />
              {errors.hardButFun && (
                <p className="text-red-500 text-sm mt-1">{errors.hardButFun.message}</p>
              )}
            </FormField>
            <FormField label="How do you feel when you try something new?" htmlFor="guidingQ4">
              <Textarea rows={3} id="guidingQ4" {...register("feelWhenTryingNew")} />
              {errors.feelWhenTryingNew && (
                <p className="text-red-500 text-sm mt-1">{errors.feelWhenTryingNew.message}</p>
              )}
            </FormField>
            <FormField label="Can you teach me how to use this game?" htmlFor="guidingQ5">
              <Textarea rows={3} id="guidingQ5" {...register("teachGame")} />
              {errors.teachGame && (
                <p className="text-red-500 text-sm mt-1">{errors.teachGame.message}</p>
              )}
            </FormField>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader title="Child Information" bgClassName="bg-teal-700" />
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Full Name" htmlFor="fullName" error={errors.fullName as any}><Input id="fullName" {...register("fullName")} /></FormField>
            <FormField label="Age" htmlFor="age" error={errors.age as any}><Input id="age" {...register("age")} /></FormField>
          </div>
        </section>

        {/* Guided Activity Ratings */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader title="Guided Activity Ratings" bgClassName="bg-teal-700" />
          {[
            { k: "A", t: "Engineering & Building", s: "zoneAScore", n: "zoneANotes", skills: ["Problem‑solving","Creativity","Spatial reasoning","Focus"] },
            { k: "B", t: "Creative Arts", s: "zoneBScore", n: "zoneBNotes", skills: ["Imagination","Expression","Language","Storytelling"] },
            { k: "C", t: "Sensory & Regulation", s: "zoneCScore", n: "zoneCNotes", skills: ["Emotional regulation","Sensory awareness","Trust"] },
            { k: "D", t: "Reading & Logic", s: "zoneDScore", n: "zoneDNotes", skills: ["Logical thinking","Strategy","Frustration tolerance"] },
          ].map((z) => (
            <div key={z.k} className="mt-4 border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Zone {z.k}: {z.t}</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-1">Meta Skills Focused On</label>
                  <ul className="list-disc pl-5 text-slate-800 space-y-1">
                    {z.skills.map((s) => (<li key={s}>{s}</li>))}
                  </ul>
                </div>
                <FormField label="Score (1-5)" htmlFor={z.s} error={errors[z.s as keyof FormValues] as any}>
                  <select id={z.s} {...register(z.s as keyof FormValues)} className={`w-full px-3 py-2 border rounded-md text-black bg-white ${errors[z.s as keyof FormValues] ? 'border-red-500' : 'border-gray-300'}`}>
                    <option value="">Select...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </FormField>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-800 mb-1">Key Behaviours / Notes</label>
                  <Textarea rows={3} {...register(z.n as keyof FormValues)} className={(errors[z.n as keyof FormValues] ? 'border-red-500' : '') as string} />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Meta Learning Skill Indicators */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader title="Meta Learning Skill Indicators" bgClassName="bg-teal-700" />
          {[
            { k: 'metaSelfReg', l: 'Self‑Regulation', n: 'metaNotesSelfReg' },
            { k: 'metaCuriosity', l: 'Curiosity', n: 'metaNotesCuriosity' },
            { k: 'metaSocial', l: 'Social Engagement', n: 'metaNotesSocial' },
            { k: 'metaEmotional', l: 'Emotional Regulation', n: 'metaNotesEmotional' },
            { k: 'metaConfidence', l: 'Confidence / Autonomy', n: 'metaNotesConfidence' },
          ].map((m) => (
            <div key={m.k} className="mt-4 border border-slate-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label={`${m.l} (1-5)`} htmlFor={m.k} error={errors[m.k as keyof FormValues] as any}>
                  <select {...register(m.k as keyof FormValues)} className={`w-full px-3 py-2 border rounded-md text-black bg-white ${errors[m.k as keyof FormValues] ? 'border-red-500' : 'border-gray-300'}`}>
                    <option value="">Select...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </FormField>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-800 mb-1">Behaviour Notes</label>
                  <Textarea rows={3} {...register(m.n as keyof FormValues)} />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Parent–Child Dynamic Snapshot */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader title="Parent–Child Dynamic Snapshot" bgClassName="bg-teal-700" />
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Parent Proximity" htmlFor="parentProximity">
              <div className="grid grid-cols-3 gap-3 text-sm text-slate-800">
                <label className="flex items-center gap-2"><input type="radio" value="Close" {...register("parentProximity")} /> <span>Close</span></label>
                <label className="flex items-center gap-2"><input type="radio" value="Hovering" {...register("parentProximity")} /> <span>Hovering</span></label>
                <label className="flex items-center gap-2"><input type="radio" value="Distant" {...register("parentProximity")} /> <span>Distant</span></label>
              </div>
              {errors.parentProximity && (
                <p className="text-red-500 text-sm mt-1">{errors.parentProximity.message}</p>
              )}
            </FormField>
            <FormField label="Parent Intervention Level" htmlFor="parentInterventionLevel">
              <div className="grid grid-cols-3 gap-3 text-sm text-slate-800">
                <label className="flex items-center gap-2"><input type="radio" value="Low" {...register("parentInterventionLevel")} /> <span>Low</span></label>
                <label className="flex items-center gap-2"><input type="radio" value="Medium" {...register("parentInterventionLevel")} /> <span>Medium</span></label>
                <label className="flex items-center gap-2"><input type="radio" value="High" {...register("parentInterventionLevel")} /> <span>High</span></label>
              </div>
              {errors.parentInterventionLevel && (
                <p className="text-red-500 text-sm mt-1">{errors.parentInterventionLevel.message}</p>
              )}
            </FormField>
            <FormField label="Parent Intervention Style" htmlFor="parentInterventionStyle">
              <div className="grid grid-cols-3 gap-3 text-sm text-slate-800">
                <label className="flex items-center gap-2"><input type="radio" value="Directive" {...register("parentInterventionStyle")} /> <span>Directive</span></label>
                <label className="flex items-center gap-2"><input type="radio" value="Supportive" {...register("parentInterventionStyle")} /> <span>Supportive</span></label>
                <label className="flex items-center gap-2"><input type="radio" value="Detached" {...register("parentInterventionStyle")} /> <span>Detached</span></label>
              </div>
              {errors.parentInterventionStyle && (
                <p className="text-red-500 text-sm mt-1">{errors.parentInterventionStyle.message}</p>
              )}
            </FormField>
            <FormField label="Child's Independence Level" htmlFor="childIndependenceLevel">
              <Textarea rows={3} id="childIndependenceLevel" {...register("childIndependenceLevel")} />
              {errors.childIndependenceLevel && (
                <p className="text-red-500 text-sm mt-1">{errors.childIndependenceLevel.message}</p>
              )}
            </FormField>
            <FormField label="Child's Emotional Presentation (with Parent)" htmlFor="childEmotionalWithParent">
              <Textarea rows={3} id="childEmotionalWithParent" {...register("childEmotionalWithParent")} />
              {errors.childEmotionalWithParent && (
                <p className="text-red-500 text-sm mt-1">{errors.childEmotionalWithParent.message}</p>
              )}
            </FormField>
            <FormField label="Child's Independence when Parent is Engaged" htmlFor="childIndependenceWhenParentEngaged">
              <Textarea rows={3} id="childIndependenceWhenParentEngaged" {...register("childIndependenceWhenParentEngaged")} />
              {errors.childIndependenceWhenParentEngaged && (
                <p className="text-red-500 text-sm mt-1">{errors.childIndependenceWhenParentEngaged.message}</p>
              )}
            </FormField>
            <FormField label="Emotional Regulation with Parent Present" htmlFor="emotionalRegulationWithParentPresent">
              <Textarea rows={3} id="emotionalRegulationWithParentPresent" {...register("emotionalRegulationWithParentPresent")} />
              {errors.emotionalRegulationWithParentPresent && (
                <p className="text-red-500 text-sm mt-1">{errors.emotionalRegulationWithParentPresent.message}</p>
              )}
            </FormField>
          </div>
        </section>

        {/* Intelligence & Learning Type Check‑In */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader title="Intelligence & Learning Type Check‑In" bgClassName="bg-teal-700" />
          <div className="mt-3 text-slate-700">Confirm or update intelligence type from initial observations.</div>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full border border-slate-300 text-sm">
              <thead className="bg-slate-100 text-slate-900">
                <tr>
                  <th className="border border-slate-300 px-3 py-2 text-left">Intelligence Type Expressed</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Definition</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Evidence</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Supporting Observation</th>
                </tr>
              </thead>
              <tbody className="align-top text-slate-900">
                {[
                  { k: 'intelLinguistic', label: 'Linguistic (Word‑Smart)', def: 'Strong use of spoken or written language, storytelling, vocabulary', em: 'intelLinguisticEvidenceModerate', es: 'intelLinguisticEvidenceStrong' },
                  { k: 'intelLogical', label: 'Logical ‑ Mathematical', def: 'Good at puzzles, patterns, reasoning, and numbers', em: 'intelLogicalEvidenceModerate', es: 'intelLogicalEvidenceStrong' },
                  { k: 'intelSpatial', label: 'Spatial (Visual/Spatial)', def: 'Good with visualizing and designing with space or images', em: 'intelSpatialEvidenceModerate', es: 'intelSpatialEvidenceStrong' },
                  { k: 'intelBodily', label: 'Bodily ‑ Kinesthetic', def: 'Skilled in using body for movement, building, or tactile learning', em: 'intelBodilyEvidenceModerate', es: 'intelBodilyEvidenceStrong' },
                  { k: 'intelMusical', label: 'Musical (Sound /Rhythm Smart)', def: 'Sensitive to sound, rhythm, music, and auditory cues', em: 'intelMusicalEvidenceModerate', es: 'intelMusicalEvidenceStrong' },
                  { k: 'intelInterpersonal', label: 'Interpersonal (People Smart)', def: 'Easily engages with others, strong social and emotional interaction', em: 'intelInterpersonalEvidenceModerate', es: 'intelInterpersonalEvidenceStrong' },
                  { k: 'intelIntrapersonal', label: 'Intrapersonal (Self‑Smart)', def: 'Self‑aware, enjoys alone time, reflective', em: 'intelIntrapersonalEvidenceModerate', es: 'intelIntrapersonalEvidenceStrong' },
                  { k: 'intelNaturalistic', label: 'Naturalistic (Nature Smart)', def: 'Curious about nature, patterns in environment', em: 'intelNaturalisticEvidenceModerate', es: 'intelNaturalisticEvidenceStrong' },
                  { k: 'intelExistential', label: 'Existential (Big Question)', def: 'Asks deep questions about meaning, purpose, or life', em: 'intelExistentialEvidenceModerate', es: 'intelExistentialEvidenceStrong' },
                ].map((row) => (
                  <tr key={row.k}>
                    <td className="border border-slate-300 px-3 py-2 w-[220px]">{row.label}</td>
                    <td className="border border-slate-300 px-3 py-2">{row.def}</td>
                    <td className="border border-slate-300 px-3 py-2 w-44">
                      <label className="flex items-center gap-2 text-sm text-slate-800 mb-1">
                        <input 
                          type="checkbox" 
                          {...register(row.em as keyof FormValues, { 
                            setValueAs: (value) => value === "on" || value === true 
                          })} 
                          className="h-4 w-4 text-teal-600 border-gray-300 rounded" 
                        />
                        <span>✓ Moderate</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-800">
                        <input 
                          type="checkbox" 
                          {...register(row.es as keyof FormValues, { 
                            setValueAs: (value) => value === "on" || value === true 
                          })} 
                          className="h-4 w-4 text-teal-600 border-gray-300 rounded" 
                        />
                        <span>+ Strong</span>
                      </label>
                    </td>
                    <td className="border border-slate-300 px-3 py-2">
                      <Textarea rows={3} {...register(row.k as keyof FormValues)} />
                      {errors[row.k as keyof typeof errors] && (
                        <p className="text-red-500 text-sm mt-1">{errors[row.k as keyof typeof errors]?.message}</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Examiner Final Comments (last section) */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader title="Examiner Final Comments (Qualitative)" bgClassName="bg-teal-700" />
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Most engaged zone" htmlFor="mostEngagedZone">
              <Input id="mostEngagedZone" {...register("mostEngagedZone")} />
              {errors.mostEngagedZone && (
                <p className="text-red-500 text-sm mt-1">{errors.mostEngagedZone.message}</p>
              )}
            </FormField>
            <FormField label="Dominant observed intelligences" htmlFor="dominantObservedIntelligences">
              <Input id="dominantObservedIntelligences" {...register("dominantObservedIntelligences")} />
              {errors.dominantObservedIntelligences && (
                <p className="text-red-500 text-sm mt-1">{errors.dominantObservedIntelligences.message}</p>
              )}
            </FormField>
            <FormField label="Initial learning style impressions" htmlFor="initialLearningStyleImpressions">
              <Textarea rows={3} id="initialLearningStyleImpressions" {...register("initialLearningStyleImpressions")} />
              {errors.initialLearningStyleImpressions && (
                <p className="text-red-500 text-sm mt-1">{errors.initialLearningStyleImpressions.message}</p>
              )}
            </FormField>
            <FormField label="Any early flags or needs for follow‑up" htmlFor="earlyFlagsNeedsFollowUp">
              <Textarea rows={3} id="earlyFlagsNeedsFollowUp" {...register("earlyFlagsNeedsFollowUp")} />
              {errors.earlyFlagsNeedsFollowUp && (
                <p className="text-red-500 text-sm mt-1">{errors.earlyFlagsNeedsFollowUp.message}</p>
              )}
            </FormField>
            <FormField label="Self‑directed vs. seeking guidance" htmlFor="selfDirectedVsSeekingGuidance">
              <Textarea rows={3} id="selfDirectedVsSeekingGuidance" {...register("selfDirectedVsSeekingGuidance")} />
              {errors.selfDirectedVsSeekingGuidance && (
                <p className="text-red-500 text-sm mt-1">{errors.selfDirectedVsSeekingGuidance.message}</p>
              )}
            </FormField>
          </div>
          <div className="mt-4 border border-slate-200 rounded-lg p-4">
            <div className="font-medium text-slate-900 mb-2">Flag Indicators</div>
            <ul className="list-disc pl-6 text-slate-800 space-y-1">
              <li>P - Excessive parental interference</li>
              <li>T - Technology discomfort</li>
              <li>C - Confidence/independence concerns</li>
              <li>E - Exceptional performance in specific area</li>
            </ul>
          </div>
          <div className="mt-4">
            <FormField label="Additional Notes / Observations" htmlFor="finalAdditionalNotes">
              <Textarea rows={6} id="finalAdditionalNotes" {...register("finalAdditionalNotes")} />
              {errors.finalAdditionalNotes && (
                <p className="text-red-500 text-sm mt-1">{errors.finalAdditionalNotes.message}</p>
              )}
            </FormField>
          </div>
        </section>

        {/* Interaction Description table (final section) */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader title="Interaction Summary" bgClassName="bg-teal-700" />
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full border border-slate-300 text-sm">
              <thead className="bg-slate-100 text-slate-900">
                <tr>
                  <th className="border border-slate-300 px-3 py-2 text-left">Interaction Description</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Comments</th>
                </tr>
              </thead>
              <tbody className="align-top text-slate-900">
                <tr>
                  <td className="border border-slate-300 px-3 py-2">Preferred Zone</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <Textarea rows={3} {...register('interactionPreferredZone')} />
                    {errors.interactionPreferredZone && (
                      <p className="text-red-500 text-sm mt-1">{errors.interactionPreferredZone.message}</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2">Initial Behaviour (entering space)</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <Textarea rows={3} {...register('interactionInitialBehaviour')} />
                    {errors.interactionInitialBehaviour && (
                      <p className="text-red-500 text-sm mt-1">{errors.interactionInitialBehaviour.message}</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2">Child's openness to adult guidance</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <Textarea rows={3} {...register('interactionOpennessToAdultGuidance')} />
                    {errors.interactionOpennessToAdultGuidance && (
                      <p className="text-red-500 text-sm mt-1">{errors.interactionOpennessToAdultGuidance.message}</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2">Most revealing activity and why</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <Textarea rows={3} {...register('interactionMostRevealingActivity')} />
                    {errors.interactionMostRevealingActivity && (
                      <p className="text-red-500 text-sm mt-1">{errors.interactionMostRevealingActivity.message}</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2">Cross-reference with Step 5 observations</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <Textarea rows={3} {...register('interactionCrossRefStep5')} />
                    {errors.interactionCrossRefStep5 && (
                      <p className="text-red-500 text-sm mt-1">{errors.interactionCrossRefStep5.message}</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2">Curiosity and exploration</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <Textarea rows={3} {...register('interactionCuriosityExploration')} />
                    {errors.interactionCuriosityExploration && (
                      <p className="text-red-500 text-sm mt-1">{errors.interactionCuriosityExploration.message}</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2">Focus and attention span</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <Textarea rows={3} {...register('interactionFocusAttention')} />
                    {errors.interactionFocusAttention && (
                      <p className="text-red-500 text-sm mt-1">{errors.interactionFocusAttention.message}</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2">Engagement with adult direction</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <Textarea rows={3} {...register('interactionEngagementWithAdult')} />
                    {errors.interactionEngagementWithAdult && (
                      <p className="text-red-500 text-sm mt-1">{errors.interactionEngagementWithAdult.message}</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2">Resilience in challenge</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <Textarea rows={3} {...register('interactionResilienceInChallenge')} />
                    {errors.interactionResilienceInChallenge && (
                      <p className="text-red-500 text-sm mt-1">{errors.interactionResilienceInChallenge.message}</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2">Emotion regulation signals</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <Textarea rows={3} {...register('interactionEmotionRegulationSignals')} />
                    {errors.interactionEmotionRegulationSignals && (
                      <p className="text-red-500 text-sm mt-1">{errors.interactionEmotionRegulationSignals.message}</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2">Notes on Caregiver Interaction Style</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <Textarea rows={3} {...register('interactionCaregiverInteractionStyle')} />
                    {errors.interactionCaregiverInteractionStyle && (
                      <p className="text-red-500 text-sm mt-1">{errors.interactionCaregiverInteractionStyle.message}</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2">Recommendations for support or follow-up</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <Textarea rows={3} {...register('interactionRecommendations')} />
                    {errors.interactionRecommendations && (
                      <p className="text-red-500 text-sm mt-1">{errors.interactionRecommendations.message}</p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Office Use Only (last section) */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader title="Office Use Only" bgClassName="bg-teal-700" />
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Application Number" htmlFor="applicationNumber">
              <Input id="applicationNumber" {...register("applicationNumber")} />
            </FormField>
            <FormField label="Observer Name" htmlFor="observerName">
              <Input id="observerName" {...register("observerName")} />
            </FormField>
            <FormField label="Assessment Date" htmlFor="assessmentDate">
              <Input id="assessmentDate" type="date" {...register("assessmentDate")} />
            </FormField>
            <FormField label="Logged to System Date" htmlFor="loggedToSystemDate">
              <Input id="loggedToSystemDate" type="date" {...register("loggedToSystemDate")} />
            </FormField>
            <FormField label="Logged by" htmlFor="loggedBy">
              <Input id="loggedBy" {...register("loggedBy")} />
            </FormField>
          </div>
          <div className="mt-4 text-right text-sm text-slate-600">
            <p>Owner: SY Holdings WLL</p>
            <p>Prepared by: Meta Learning Systems Implementation Unit</p>
            <p>Confidentiality Level: Internal Operational Use</p>
          </div>
        </section>

        <div className="flex items-center justify-end gap-3">
          <button type="submit" disabled={saving} className="[clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)] cursor-pointer py-3 flex justify-between items-center bg-gradient-to-r from-[#8EC0C2] to-[#142954] text-white rounded-lg px-4">{saving ? 'Saving…' : 'Submit Form'}</button>
        </div>
      </form>
    </div>
  );
}
