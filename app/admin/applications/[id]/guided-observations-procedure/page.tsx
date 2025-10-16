"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, Input, Textarea, FormSectionHeader } from "@/app/components/forms/FormField";
import { apiService } from "@/app/utils";
import { guidedObservationSchema, type GuidedObservationFormData } from "@/app/lib/validations/guided-observation";


export default function GuidedObservationsProcedurePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<GuidedObservationFormData>({
    resolver: zodResolver(guidedObservationSchema),
    defaultValues: {
      childName: "",
      age: "",
      date: new Date().toISOString().split('T')[0],
      examiner: "",
      zoneAScore: 1,
      zoneANotes: "",
      zoneBScore: 1,
      zoneBNotes: "",
      zoneCScore: 1,
      zoneCNotes: "",
      metaCuriosityScore: 1,
      metaCuriosityNotes: "",
      metaSelfRegulationScore: 1,
      metaSelfRegulationNotes: "",
      metaConfidenceScore: 1,
      metaConfidenceNotes: "",
      metaCollaborationScore: 1,
      metaCollaborationNotes: "",
      metaEmotionalAwarenessScore: 1,
      metaEmotionalAwarenessNotes: "",
    },
  });

  // Load existing data
  useEffect(() => {
    loadGuidedObservationData();
  }, [params.id]);

  const loadGuidedObservationData = async () => {
    try {
      setLoading(true);
      
      // Load existing form data
      const res = await apiService.get(`/api/admin/guided-observations-procedure?applicationId=${params.id}`);
      
      // Load application data for auto-filling
      const appRes = await apiService.getApplicationData(params.id);
      
      if (res.success && res.data) {
        const data = res.data;
        const appData = appRes.success && appRes.data ? appRes.data : null;
        reset({
          childName: data.childName || appData?.childFullName || "",
          age: data.age || (appData?.childAge ? appData.childAge.toString() : ""),
          date: data.date || new Date().toISOString().split('T')[0],
          examiner: data.examiner || "",
          zoneAScore: data.zoneAScore || 1,
          zoneANotes: data.zoneANotes || "",
          zoneBScore: data.zoneBScore || 1,
          zoneBNotes: data.zoneBNotes || "",
          zoneCScore: data.zoneCScore || 1,
          zoneCNotes: data.zoneCNotes || "",
          zoneDScore: data.zoneDScore || 1,
          zoneDNotes: data.zoneDNotes || "",
          metaCuriosityScore: data.metaCuriosityScore || 1,
          metaCuriosityNotes: data.metaCuriosityNotes || "",
          metaSelfRegulationScore: data.metaSelfRegulationScore || 1,
          metaSelfRegulationNotes: data.metaSelfRegulationNotes || "",
          metaConfidenceScore: data.metaConfidenceScore || 1,
          metaConfidenceNotes: data.metaConfidenceNotes || "",
          metaCollaborationScore: data.metaCollaborationScore || 1,
          metaCollaborationNotes: data.metaCollaborationNotes || "",
          metaEmotionalAwarenessScore: data.metaEmotionalAwarenessScore || 1,
          metaEmotionalAwarenessNotes: data.metaEmotionalAwarenessNotes || "",
          intelLinguisticEvidence: data.intelLinguisticEvidence || undefined,
          intelLinguisticObservation: data.intelLinguisticObservation || "",
          intelLogicalEvidence: data.intelLogicalEvidence || undefined,
          intelLogicalObservation: data.intelLogicalObservation || "",
          intelSpatialEvidence: data.intelSpatialEvidence || undefined,
          intelSpatialObservation: data.intelSpatialObservation || "",
          intelBodilyEvidence: data.intelBodilyEvidence || undefined,
          intelBodilyObservation: data.intelBodilyObservation || "",
          intelMusicalEvidence: data.intelMusicalEvidence || undefined,
          intelMusicalObservation: data.intelMusicalObservation || "",
          intelInterpersonalEvidence: data.intelInterpersonalEvidence || undefined,
          intelInterpersonalObservation: data.intelInterpersonalObservation || "",
          intelIntrapersonalEvidence: data.intelIntrapersonalEvidence || undefined,
          intelIntrapersonalObservation: data.intelIntrapersonalObservation || "",
          intelNaturalisticEvidence: data.intelNaturalisticEvidence || undefined,
          intelNaturalisticObservation: data.intelNaturalisticObservation || "",
          intelExistentialEvidence: data.intelExistentialEvidence || undefined,
          intelExistentialObservation: data.intelExistentialObservation || "",
          parentProximity: data.parentProximity || undefined,
          parentInterventionLevel: data.parentInterventionLevel || undefined,
          parentInterventionStyle: data.parentInterventionStyle || undefined,
          childIndependenceLevel: data.childIndependenceLevel || "",
          childEmotionalPresentation: data.childEmotionalPresentation || "",
          childIndependenceWhenParentEngaged: data.childIndependenceWhenParentEngaged || "",
          emotionalRegulationWithParentPresent: data.emotionalRegulationWithParentPresent || "",
          mostEngagedZone: data.mostEngagedZone || "",
          dominantObservedIntelligences: data.dominantObservedIntelligences || "",
          initialLearningStyleImpressions: data.initialLearningStyleImpressions || "",
          earlyFlagsNeedsFollowUp: data.earlyFlagsNeedsFollowUp || "",
          selfDirectedVsSeekingGuidance: data.selfDirectedVsSeekingGuidance || "",
          flagIndicators: data.flagIndicators || "",
          additionalNotes: data.additionalNotes || "",
          preferredZone: data.preferredZone || "",
          initialBehaviour: data.initialBehaviour || "",
          opennessToAdultGuidance: data.opennessToAdultGuidance || "",
          mostRevealingActivity: data.mostRevealingActivity || "",
          crossReferenceStep5: data.crossReferenceStep5 || "",
          curiosityAndExploration: data.curiosityAndExploration || "",
          focusAndAttentionSpan: data.focusAndAttentionSpan || "",
          engagementWithAdultDirection: data.engagementWithAdultDirection || "",
          resilienceInChallenge: data.resilienceInChallenge || "",
          emotionRegulationSignals: data.emotionRegulationSignals || "",
          caregiverInteractionStyle: data.caregiverInteractionStyle || "",
          recommendationsForSupport: data.recommendationsForSupport || "",
        });
      } else if (appRes.success && appRes.data) {
        // Auto-fill with application data if no existing form data
        const appData = appRes.data;
        reset({
          childName: appData.childFullName || "",
          age: appData.childAge ? appData.childAge.toString() : "",
          date: new Date().toISOString().split('T')[0],
          examiner: "",
          zoneAScore: 1,
          zoneANotes: "",
          zoneBScore: 1,
          zoneBNotes: "",
          zoneCScore: 1,
          zoneCNotes: "",
          zoneDScore: 1,
          zoneDNotes: "",
          metaCuriosityScore: 1,
          metaCuriosityNotes: "",
          metaSelfRegulationScore: 1,
          metaSelfRegulationNotes: "",
          metaConfidenceScore: 1,
          metaConfidenceNotes: "",
          metaCollaborationScore: 1,
          metaCollaborationNotes: "",
          metaEmotionalAwarenessScore: 1,
          metaEmotionalAwarenessNotes: "",
        });
      }
    } catch (error: any) {
      console.error("Error loading guided observation data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData: GuidedObservationFormData) => {
    try {
      setSaving(true);
      setMessage(null);
      
      const res = await apiService.post("/api/admin/guided-observations-procedure", {
        applicationId: params.id,
        ...formData,
      });

      if (res.success) {
        setMessage({ type: 'success', text: 'Guided observation data saved successfully!' });
        router.push(`/admin/applications/${params.id}`);
      } else {
        setMessage({ type: 'error', text: res.message || 'Failed to save data' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to save data' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <div className="text-xl font-bold text-slate-900">Examiner Form: Guided Observation</div>
        <div className="text-sm text-slate-600">Application ID: {params.id}</div>
      </div>

          {/* Basic Information */}
          <FormSectionHeader title="Basic Information" bgClassName="bg-teal-700" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-3">
            <FormField label="Child Name" htmlFor="childName">
              <Input 
                id="childName" 
                placeholder="Child Name" 
                {...register("childName")}
                className={errors.childName ? "border-red-500" : ""}
              />
              {errors.childName && (
                <p className="text-red-500 text-sm mt-1">{errors.childName.message}</p>
              )}
            </FormField>
            <FormField label="Age" htmlFor="age">
              <Input 
                id="age" 
                placeholder="Age" 
                {...register("age")}
                className={errors.age ? "border-red-500" : ""}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
              )}
            </FormField>
            <FormField label="Date" htmlFor="date">
              <Input 
                id="date" 
                type="date" 
                {...register("date")}
                className={errors.date ? "border-red-500" : ""}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
              )}
            </FormField>
            <FormField label="Examiner" htmlFor="examiner">
              <Input 
                id="examiner" 
                placeholder="Examiner" 
                {...register("examiner")}
                className={errors.examiner ? "border-red-500" : ""}
              />
              {errors.examiner && (
                <p className="text-red-500 text-sm mt-1">{errors.examiner.message}</p>
              )}
            </FormField>
          </div>

          {/* Guided Activity Ratings Grid */}
          <FormSectionHeader title="Guided Activity Ratings Grid" bgClassName="bg-teal-700" />
          <div className="mb-8 mt-3">
            <p className="text-sm text-slate-600 mb-4">
              Use a 1–5 scale (1 = emerging, 5 = exemplary) include qualitative notes for each activity they partake in.
            </p>
            
          <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-300 p-3 text-left font-semibold text-gray-900">Zone</th>
                    <th className="border border-slate-300 p-3 text-left font-semibold text-gray-900">Meta Skills Focused On</th>
                    <th className="border border-slate-300 p-3 text-left font-semibold text-gray-900">Score (1-5)</th>
                    <th className="border border-slate-300 p-3 text-left font-semibold text-gray-900">Key Behaviours / Notes</th>
                </tr>
              </thead>
                <tbody>
                  {/* Zone A: Build Something New */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Zone A: Build Something New</td>
                    <td className="border border-slate-300 p-3 text-gray-900">
                      Problem-solving, Creativity, Spatial reasoning, Focus
                    </td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((score) => (
                          <label key={score} className="flex items-center text-gray-900">
                            <input
                              type="radio"
                              value={score}
                              {...register("zoneAScore", { valueAsNumber: true })}
                              className="mr-1"
                            />
                            {score}
                          </label>
                        ))}
                      </div>
                    </td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={3}
                        placeholder="Key behaviours and notes..."
                        {...register("zoneANotes")}
                        className="w-full"
                      />
                  </td>
                </tr>
                  
                  {/* Zone B: Design a Planet */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Zone B: Design a Planet</td>
                    <td className="border border-slate-300 p-3 text-gray-900">
                      Imagination, Expression, Language, Storytelling
                    </td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((score) => (
                          <label key={score} className="flex items-center text-gray-900">
                            <input
                              type="radio"
                              value={score}
                              {...register("zoneBScore", { valueAsNumber: true })}
                              className="mr-1"
                            />
                            {score}
                          </label>
                        ))}
                      </div>
                    </td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={3}
                        placeholder="Key behaviours and notes..."
                        {...register("zoneBNotes")}
                        className="w-full"
                      />
                  </td>
                </tr>
                  
                  {/* Zone C: Sensory Play */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Zone C: Sensory Play</td>
                    <td className="border border-slate-300 p-3 text-gray-900">
                      Emotional regulation, Sensory awareness, Trust
                    </td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((score) => (
                          <label key={score} className="flex items-center text-gray-900">
                            <input
                              type="radio"
                              value={score}
                              {...register("zoneCScore", { valueAsNumber: true })}
                              className="mr-1"
                            />
                            {score}
                          </label>
                        ))}
                      </div>
                    </td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={3}
                        placeholder="Key behaviours and notes..."
                        {...register("zoneCNotes")}
                        className="w-full"
                      />
                  </td>
                </tr>
                  
                  {/* Zone D: Logic Game */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Zone D: Logic Game</td>
                    <td className="border border-slate-300 p-3 text-gray-900">
                      Logical thinking, Strategy, Frustration tolerance
                    </td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((score) => (
                          <label key={score} className="flex items-center text-gray-900">
                            <input
                              type="radio"
                              value={score}
                              {...register("zoneDScore", { valueAsNumber: true })}
                              className="mr-1"
                            />
                            {score}
                          </label>
                        ))}
                      </div>
                      {errors.zoneDScore && (
                        <p className="text-red-500 text-sm mt-1">{errors.zoneDScore.message}</p>
                      )}
                    </td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={3}
                        placeholder="Key behaviours and notes..."
                        {...register("zoneDNotes")}
                        className="w-full"
                      />
                      {errors.zoneDNotes && (
                        <p className="text-red-500 text-sm mt-1">{errors.zoneDNotes.message}</p>
                      )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

          {/* Meta Learning Skill Scoring */}
          <FormSectionHeader title="Meta Learning Skill Scoring" bgClassName="bg-teal-700" />
          <div className="mb-8 mt-3">
            <p className="text-sm text-slate-600 mb-4">
              Rate each Meta Skill (1-5) with behavioural evidence.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-300 p-3 text-left font-semibold text-gray-900">Meta Skill</th>
                    <th className="border border-slate-300 p-3 text-center font-semibold text-gray-900">1</th>
                    <th className="border border-slate-300 p-3 text-center font-semibold text-gray-900">2</th>
                    <th className="border border-slate-300 p-3 text-center font-semibold text-gray-900">3</th>
                    <th className="border border-slate-300 p-3 text-center font-semibold text-gray-900">4</th>
                    <th className="border border-slate-300 p-3 text-center font-semibold text-gray-900">5</th>
                    <th className="border border-slate-300 p-3 text-left font-semibold text-gray-900">Behavioural Evidence / Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Curiosity */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Curiosity</td>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <td key={score} className="border border-slate-300 p-3 text-center">
                        <input
                          type="radio"
                          value={score}
                          {...register("metaCuriosityScore", { valueAsNumber: true })}
                        />
                      </td>
                    ))}
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Behavioural evidence..."
                        {...register("metaCuriosityNotes")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Self-Regulation */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Self-Regulation</td>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <td key={score} className="border border-slate-300 p-3 text-center">
                        <input
                          type="radio"
                          value={score}
                          {...register("metaSelfRegulationScore", { valueAsNumber: true })}
                        />
                      </td>
                    ))}
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Behavioural evidence..."
                        {...register("metaSelfRegulationNotes")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Confidence / Autonomy */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Confidence / Autonomy</td>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <td key={score} className="border border-slate-300 p-3 text-center">
                        <input
                          type="radio"
                          value={score}
                          {...register("metaConfidenceScore", { valueAsNumber: true })}
                        />
                      </td>
                    ))}
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Behavioural evidence..."
                        {...register("metaConfidenceNotes")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Collaboration / Social */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Collaboration / Social</td>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <td key={score} className="border border-slate-300 p-3 text-center">
                        <input
                          type="radio"
                          value={score}
                          {...register("metaCollaborationScore", { valueAsNumber: true })}
                        />
                      </td>
                    ))}
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Behavioural evidence..."
                        {...register("metaCollaborationNotes")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Emotional Awareness */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Emotional Awareness</td>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <td key={score} className="border border-slate-300 p-3 text-center">
                        <input
                          type="radio"
                          value={score}
                          {...register("metaEmotionalAwarenessScore", { valueAsNumber: true })}
                        />
                      </td>
                    ))}
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Behavioural evidence..."
                        {...register("metaEmotionalAwarenessNotes")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>

          {/* Intelligence & Learning Type Check-In */}
          <FormSectionHeader title="Intelligence & Learning Type Check-In" bgClassName="bg-teal-700" />
          <div className="mb-8 mt-3">
            <p className="text-sm text-slate-600 mb-4">
              Confirm or update intelligence type observations from Step 5.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-300 p-3 text-left font-semibold text-gray-900">Intelligence Type Expressed</th>
                    <th className="border border-slate-300 p-3 text-left font-semibold text-gray-900">Definition</th>
                    <th className="border border-slate-300 p-3 text-left font-semibold text-gray-900">Evidence</th>
                    <th className="border border-slate-300 p-3 text-left font-semibold text-gray-900">Supporting Observation</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Linguistic */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Linguistic (Word-Smart)</td>
                    <td className="border border-slate-300 p-3 text-gray-900">
                      Strong use of spoken or written language, storytelling, vocabulary
                    </td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-4">
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="moderate"
                            {...register("intelLinguisticEvidence")}
                            className="mr-1"
                          />
                          Moderate
                        </label>
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="strong"
                            {...register("intelLinguisticEvidence")}
                            className="mr-1"
                          />
                          Strong
                        </label>
          </div>
                    </td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Supporting observation..."
                        {...register("intelLinguisticObservation")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Logical-Mathematical */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Logical-Mathematical</td>
                    <td className="border border-slate-300 p-3 text-gray-900">
                      Good at puzzles, patterns, reasoning, and numbers
                    </td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-4">
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="moderate"
                            {...register("intelLogicalEvidence")}
                            className="mr-1"
                          />
                          Moderate
                        </label>
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="strong"
                            {...register("intelLogicalEvidence")}
                            className="mr-1"
                          />
                          Strong
                        </label>
                </div>
                    </td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Supporting observation..."
                        {...register("intelLogicalObservation")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Spatial */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Spatial (Visual/Spatial)</td>
                    <td className="border border-slate-300 p-3 text-gray-900">
                      Good with visualizing and designing with space or images
                    </td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-4">
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="moderate"
                            {...register("intelSpatialEvidence")}
                            className="mr-1"
                          />
                          Moderate
                        </label>
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="strong"
                            {...register("intelSpatialEvidence")}
                            className="mr-1"
                          />
                          Strong
                        </label>
                </div>
                    </td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Supporting observation..."
                        {...register("intelSpatialObservation")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Bodily-Kinesthetic */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Bodily-Kinesthetic</td>
                    <td className="border border-slate-300 p-3 text-gray-900">
                      Skilled in using body for movement, building, or tactile learning
                    </td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-4">
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="moderate"
                            {...register("intelBodilyEvidence")}
                            className="mr-1"
                          />
                          Moderate
                        </label>
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="strong"
                            {...register("intelBodilyEvidence")}
                            className="mr-1"
                          />
                          Strong
                        </label>
              </div>
                    </td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Supporting observation..."
                        {...register("intelBodilyObservation")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Musical */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Musical (Sound/Rhythm Smart)</td>
                    <td className="border border-slate-300 p-3 text-gray-900">
                      Sensitive to sound, rhythm, music, and auditory cues
                    </td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-4">
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="moderate"
                            {...register("intelMusicalEvidence")}
                            className="mr-1"
                          />
                          Moderate
                        </label>
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="strong"
                            {...register("intelMusicalEvidence")}
                            className="mr-1"
                          />
                          Strong
                        </label>
            </div>
                    </td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Supporting observation..."
                        {...register("intelMusicalObservation")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Interpersonal */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Interpersonal (People Smart)</td>
                    <td className="border border-slate-300 p-3 text-gray-900">
                      Easily engages with others, strong social and emotional interaction
                    </td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-4">
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="moderate"
                            {...register("intelInterpersonalEvidence")}
                            className="mr-1"
                          />
                          Moderate
                        </label>
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="strong"
                            {...register("intelInterpersonalEvidence")}
                            className="mr-1"
                          />
                          Strong
                        </label>
                </div>
                    </td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Supporting observation..."
                        {...register("intelInterpersonalObservation")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Intrapersonal */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Intrapersonal (Self-Smart)</td>
                    <td className="border border-slate-300 p-3 text-gray-900">
                      Self-aware, enjoys alone time, reflective
                    </td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-4">
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="moderate"
                            {...register("intelIntrapersonalEvidence")}
                            className="mr-1"
                          />
                          Moderate
                        </label>
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="strong"
                            {...register("intelIntrapersonalEvidence")}
                            className="mr-1"
                          />
                          Strong
                        </label>
              </div>
                    </td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Supporting observation..."
                        {...register("intelIntrapersonalObservation")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Naturalistic */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Naturalistic (Nature Smart)</td>
                    <td className="border border-slate-300 p-3 text-gray-900">
                      Curious about nature, patterns in environment
                    </td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-4">
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="moderate"
                            {...register("intelNaturalisticEvidence")}
                            className="mr-1"
                          />
                          Moderate
                        </label>
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="strong"
                            {...register("intelNaturalisticEvidence")}
                            className="mr-1"
                          />
                          Strong
                        </label>
            </div>
                    </td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Supporting observation..."
                        {...register("intelNaturalisticObservation")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Existential */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Existential (Big Question)</td>
                    <td className="border border-slate-300 p-3 text-gray-900">
                      Asks deep questions about meaning, purpose, or life
                    </td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-4">
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="moderate"
                            {...register("intelExistentialEvidence")}
                            className="mr-1"
                          />
                          Moderate
                        </label>
                        <label className="flex items-center text-gray-900">
                          <input
                            type="radio"
                            value="strong"
                            {...register("intelExistentialEvidence")}
                            className="mr-1"
                          />
                          Strong
                        </label>
              </div>
                    </td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Supporting observation..."
                        {...register("intelExistentialObservation")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
              </div>

          {/* Parent-Child Dynamic Snapshot */}
          <FormSectionHeader title="Parent—Child Dynamic Snapshot" bgClassName="bg-teal-700" />
          <div className="mb-8 mt-3">
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-300 p-3 text-left font-semibold text-gray-900">Domain</th>
                    <th className="border border-slate-300 p-3 text-left font-semibold text-gray-900">Observation / Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Parent Proximity */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Parent Proximity</td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-4 text-black">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="close"
                            {...register("parentProximity")}
                            className="mr-1"
                          />
                          Close
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="hovering"
                            {...register("parentProximity")}
                            className="mr-1"
                          />
                          Hovering
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="distant"
                            {...register("parentProximity")}
                            className="mr-1"
                          />
                          Distant
                        </label>
          </div>
                    </td>
                  </tr>
                  
                  {/* Parent Intervention Level */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Parent Intervention Level</td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-4 text-black">
                        <label className="flex items-center text-black">
                          <input
                            type="radio"
                            value="low"
                            {...register("parentInterventionLevel")}
                            className="mr-1"
                          />
                          Low
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="medium"
                            {...register("parentInterventionLevel")}
                            className="mr-1"
                          />
                          Medium
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="high"
                            {...register("parentInterventionLevel")}
                            className="mr-1"
                          />
                          High
                        </label>
                      </div>
                    </td>
                </tr>
                  
                  {/* Parent Intervention Style */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Parent Intervention Style</td>
                    <td className="border border-slate-300 p-3">
                      <div className="flex gap-4 text-black">
                        <label className="flex items-center">
                        <input 
                            type="radio"
                            value="directive"
                            {...register("parentInterventionStyle")}
                            className="mr-1"
                          />
                          Directive
                      </label>
                        <label className="flex items-center">
                        <input 
                            type="radio"
                            value="supportive"
                            {...register("parentInterventionStyle")}
                            className="mr-1"
                          />
                          Supportive
                      </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="detached"
                            {...register("parentInterventionStyle")}
                            className="mr-1"
                          />
                          Detached
                        </label>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Child's Independence Level */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Child's Independence Level</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Observation notes..."
                        {...register("childIndependenceLevel")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Child's Emotional Presentation */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Child's Emotional Presentation (with Parent)</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Observation notes..."
                        {...register("childEmotionalPresentation")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Child's Independence when Parent is Engaged */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Child's Independence when Parent is Engaged</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Observation notes..."
                        {...register("childIndependenceWhenParentEngaged")}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  
                  {/* Emotional Regulation with Parent Present */}
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Emotional Regulation with Parent Present</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Observation notes..."
                        {...register("emotionalRegulationWithParentPresent")}
                        className="w-full"
                      />
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
          </div>

          {/* Examiner Final Comments */}
          <FormSectionHeader title="Examiner Final Comments (Qualitative)" bgClassName="bg-teal-700" />
          <div className="mb-8 mt-3">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
            <FormField label="Most engaged zone" htmlFor="mostEngagedZone">
                  <Textarea 
                    rows={3}
                    placeholder="Most engaged zone..."
                    {...register("mostEngagedZone")}
                    className="w-full"
                  />
            </FormField>
                
            <FormField label="Dominant observed intelligences" htmlFor="dominantObservedIntelligences">
                  <Textarea 
                    rows={3}
                    placeholder="Dominant observed intelligences..."
                    {...register("dominantObservedIntelligences")}
                    className="w-full"
                  />
            </FormField>
                
            <FormField label="Initial learning style impressions" htmlFor="initialLearningStyleImpressions">
                  <Textarea 
                    rows={3}
                    placeholder="Initial learning style impressions..."
                    {...register("initialLearningStyleImpressions")}
                    className="w-full"
                  />
            </FormField>
              </div>
              
              <div className="space-y-4">
                <FormField label="Any early flags or needs for follow-up" htmlFor="earlyFlagsNeedsFollowUp">
                  <Textarea 
                    rows={3}
                    placeholder="Early flags or needs for follow-up..."
                    {...register("earlyFlagsNeedsFollowUp")}
                    className="w-full"
                  />
            </FormField>
                
                <FormField label="Self-directed vs. seeking guidance" htmlFor="selfDirectedVsSeekingGuidance">
                  <Textarea 
                    rows={3}
                    placeholder="Self-directed vs. seeking guidance..."
                    {...register("selfDirectedVsSeekingGuidance")}
                    className="w-full"
                  />
            </FormField>
                
                <FormField label="Flag Indicators" htmlFor="flagIndicators">
                  <div className="text-sm text-slate-600 mb-2">
                    <strong>P</strong> - Excessive parental interference<br/>
                    <strong>T</strong> - Technology discomfort<br/>
                    <strong>C</strong> - Confidence/independence concerns<br/>
                    <strong>E</strong> - Exceptional performance in specific area
          </div>
                  <Textarea 
                    rows={3}
                    placeholder="Flag indicators..."
                    {...register("flagIndicators")}
                    className="w-full"
                  />
                </FormField>
          </div>
            </div>
            
            <div className="mt-6">
              <FormField label="Additional Notes" htmlFor="additionalNotes">
                <Textarea 
                  rows={5}
                  placeholder="Additional notes..."
                  {...register("additionalNotes")}
                  className="w-full"
                />
            </FormField>
          </div>
          </div>

          {/* Interaction Summary */}
          <FormSectionHeader title="Interaction Summary" bgClassName="bg-teal-700" />
          <div className="mb-8 mt-3">
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-300 p-3 text-left font-semibold text-gray-900">Domain</th>
                    <th className="border border-slate-300 p-3 text-left font-semibold text-gray-900">Observation / Notes</th>
                </tr>
              </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Preferred Zone</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Preferred zone..."
                        {...register("preferredZone")}
                        className="w-full"
                      />
                  </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Initial Behaviour (entering space)</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Initial behaviour..."
                        {...register("initialBehaviour")}
                        className="w-full"
                      />
                  </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Child's openness to adult guidance</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Openness to adult guidance..."
                        {...register("opennessToAdultGuidance")}
                        className="w-full"
                      />
                  </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Most revealing activity and why</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Most revealing activity..."
                        {...register("mostRevealingActivity")}
                        className="w-full"
                      />
                  </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Cross-reference with Step 5 observations</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Cross-reference with Step 5..."
                        {...register("crossReferenceStep5")}
                        className="w-full"
                      />
                  </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Curiosity and exploration</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Curiosity and exploration..."
                        {...register("curiosityAndExploration")}
                        className="w-full"
                      />
                  </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Focus and attention span</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Focus and attention span..."
                        {...register("focusAndAttentionSpan")}
                        className="w-full"
                      />
                  </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Engagement with adult direction</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Engagement with adult direction..."
                        {...register("engagementWithAdultDirection")}
                        className="w-full"
                      />
                  </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Resilience in challenge</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Resilience in challenge..."
                        {...register("resilienceInChallenge")}
                        className="w-full"
                      />
                  </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Emotion regulation signals</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Emotion regulation signals..."
                        {...register("emotionRegulationSignals")}
                        className="w-full"
                      />
                  </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Notes on Caregiver Interaction Style</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Caregiver interaction style..."
                        {...register("caregiverInteractionStyle")}
                        className="w-full"
                      />
                  </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 p-3 font-medium text-gray-900">Recommendations for support or follow-up</td>
                    <td className="border border-slate-300 p-3">
                      <Textarea 
                        rows={2}
                        placeholder="Recommendations for support..."
                        {...register("recommendationsForSupport")}
                        className="w-full"
                      />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
            
            <div className="mt-6">
              <FormField label="Additional Notes" htmlFor="additionalNotes">
                <Textarea 
                  rows={4}
                  placeholder="Additional notes..."
                  {...register("additionalNotes")}
                  className="w-full"
                />
            </FormField>
          </div>
          </div>

          {message && (
            <div className={`p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}

        <div className="flex items-center justify-end gap-3">
            <button 
              type="submit"
              disabled={saving}
              className="[clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)] cursor-pointer py-3 flex justify-between items-center bg-gradient-to-r from-[#8EC0C2] to-[#142954] text-white rounded-lg px-4 hover:brightness-[1.05] active:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save & Continue'}
            </button>
        </div>
      </form>
      </div>
    </div>
  );
}