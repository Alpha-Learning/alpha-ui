"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, Input, Textarea, FormSectionHeader } from "@/app/components/forms/FormField";
import { apiService } from "@/app/utils";
import { z } from "zod";

// Validation schema for initial observation form
const initialObservationFormSchema = z.object({
  // Child Information
  fullName: z.string().min(1, "Full name is required"),
  age: z.string().min(1, "Age is required"),
  date: z.string().min(1, "Date is required"),
  examiner: z.string().min(1, "Examiner is required"),
  
  // Zone-Based Engagement Grid
  zoneATimeSpent: z.string().min(1, "Zone A time spent is required"),
  zoneASelfDirected: z.string().min(1, "Zone A self-directed selection is required"),
  zoneAObservations: z.array(z.string()).min(1, "Zone A observations are required"),
  zoneAEngagementLevel: z.string().min(1, "Zone A engagement level is required"),
  zoneAKeyBehavioursNotes: z.string().min(1, "Zone A key behaviours notes are required"),
  
  zoneBTimeSpent: z.string().min(1, "Zone B time spent is required"),
  zoneBSelfDirected: z.string().min(1, "Zone B self-directed selection is required"),
  zoneBObservations: z.array(z.string()).min(1, "Zone B observations are required"),
  zoneBEngagementLevel: z.string().min(1, "Zone B engagement level is required"),
  zoneBKeyBehavioursNotes: z.string().min(1, "Zone B key behaviours notes are required"),
  
  zoneCTimeSpent: z.string().min(1, "Zone C time spent is required"),
  zoneCSelfDirected: z.string().min(1, "Zone C self-directed selection is required"),
  zoneCObservations: z.array(z.string()).min(1, "Zone C observations are required"),
  zoneCEngagementLevel: z.string().min(1, "Zone C engagement level is required"),
  zoneCKeyBehavioursNotes: z.string().min(1, "Zone C key behaviours notes are required"),
  
  zoneDTimeSpent: z.string().min(1, "Zone D time spent is required"),
  zoneDSelfDirected: z.string().min(1, "Zone D self-directed selection is required"),
  zoneDObservations: z.array(z.string()).min(1, "Zone D observations are required"),
  zoneDEngagementLevel: z.string().min(1, "Zone D engagement level is required"),
  zoneDKeyBehavioursNotes: z.string().min(1, "Zone D key behaviours notes are required"),
  
  // Meta Learning Skill Indicators
  selfRegulationObserved: z.string().min(1, "Self-regulation observed is required"),
  selfRegulationBehaviourNotes: z.string().min(1, "Self-regulation behaviour notes are required"),
  curiosityObserved: z.string().min(1, "Curiosity observed is required"),
  curiosityBehaviourNotes: z.string().min(1, "Curiosity behaviour notes are required"),
  socialEngagementObserved: z.string().min(1, "Social engagement observed is required"),
  socialEngagementBehaviourNotes: z.string().min(1, "Social engagement behaviour notes are required"),
  emotionalRegulationObserved: z.string().min(1, "Emotional regulation observed is required"),
  emotionalRegulationBehaviourNotes: z.string().min(1, "Emotional regulation behaviour notes are required"),
  confidenceAutonomyObserved: z.string().min(1, "Confidence/autonomy observed is required"),
  confidenceAutonomyBehaviourNotes: z.string().min(1, "Confidence/autonomy behaviour notes are required"),
  
  // Learning Preference & Intelligence Summary
  linguisticEvidence: z.array(z.string()).min(1, "Linguistic evidence is required"),
  linguisticSupportingObservation: z.string().min(1, "Linguistic supporting observation is required"),
  logicalMathematicalEvidence: z.array(z.string()).min(1, "Logical-mathematical evidence is required"),
  logicalMathematicalSupportingObservation: z.string().min(1, "Logical-mathematical supporting observation is required"),
  spatialEvidence: z.array(z.string()).min(1, "Spatial evidence is required"),
  spatialSupportingObservation: z.string().min(1, "Spatial supporting observation is required"),
  bodilyKinestheticEvidence: z.array(z.string()).min(1, "Bodily-kinesthetic evidence is required"),
  bodilyKinestheticSupportingObservation: z.string().min(1, "Bodily-kinesthetic supporting observation is required"),
  musicalEvidence: z.array(z.string()).min(1, "Musical evidence is required"),
  musicalSupportingObservation: z.string().min(1, "Musical supporting observation is required"),
  existentialEvidence: z.array(z.string()).min(1, "Existential evidence is required"),
  existentialSupportingObservation: z.string().min(1, "Existential supporting observation is required"),
  interpersonalEvidence: z.array(z.string()).min(1, "Interpersonal evidence is required"),
  interpersonalSupportingObservation: z.string().min(1, "Interpersonal supporting observation is required"),
  intrapersonalEvidence: z.array(z.string()).min(1, "Intrapersonal evidence is required"),
  intrapersonalSupportingObservation: z.string().min(1, "Intrapersonal supporting observation is required"),
  naturalisticEvidence: z.array(z.string()).min(1, "Naturalistic evidence is required"),
  naturalisticSupportingObservation: z.string().min(1, "Naturalistic supporting observation is required"),
  
  // Parent-Child Dynamic Snapshot
  parentProximity: z.array(z.string()).min(1, "Parent proximity is required"),
  parentInterventionLevel: z.array(z.string()).min(1, "Parent intervention level is required"),
  parentInterventionStyle: z.array(z.string()).min(1, "Parent intervention style is required"),
  childIndependenceLevel: z.string().min(1, "Child independence level is required"),
  childEmotionalPresentationWithParent: z.string().min(1, "Child emotional presentation with parent is required"),
  childIndependenceWhenParentEngaged: z.string().min(1, "Child independence when parent is engaged is required"),
  emotionalRegulationWithParentPresent: z.string().min(1, "Emotional regulation with parent present is required"),
  
  // Examiner Summary (Qualitative)
  mostEngagedZone: z.string().min(1, "Most engaged zone is required"),
  dominantObservedIntelligences: z.string().min(1, "Dominant observed intelligences is required"),
  initialLearningStyleImpressions: z.string().min(1, "Initial learning style impressions is required"),
  earlyFlagsNeedsFollowUp: z.string().min(1, "Early flags/needs for follow-up is required"),
  selfDirectedVsSeekingGuidance: z.string().min(1, "Self-directed vs seeking guidance is required"),
  flagIndicators: z.string().min(1, "Flag indicators is required"),
  additionalNotesObservations: z.string().min(1, "Additional notes/observations is required"),
  
  // Office Use Only
  applicationNumber: z.string().optional(),
  loggedToSystemDate: z.string().optional(),
  loggedBy: z.string().optional(),
});

type InitialObservationFormData = z.infer<typeof initialObservationFormSchema>;

export default function InitialObservationFormPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InitialObservationFormData>({
    resolver: zodResolver(initialObservationFormSchema),
    defaultValues: {
      // Child Information
      fullName: "",
      age: "",
      date: "",
      examiner: "",
      // Zone-Based Engagement Grid
      zoneATimeSpent: "",
      zoneASelfDirected: "",
      zoneAObservations: [],
      zoneAEngagementLevel: "",
      zoneAKeyBehavioursNotes: "",
      zoneBTimeSpent: "",
      zoneBSelfDirected: "",
      zoneBObservations: [],
      zoneBEngagementLevel: "",
      zoneBKeyBehavioursNotes: "",
      zoneCTimeSpent: "",
      zoneCSelfDirected: "",
      zoneCObservations: [],
      zoneCEngagementLevel: "",
      zoneCKeyBehavioursNotes: "",
      zoneDTimeSpent: "",
      zoneDSelfDirected: "",
      zoneDObservations: [],
      zoneDEngagementLevel: "",
      zoneDKeyBehavioursNotes: "",
      // Meta Learning Skill Indicators
      selfRegulationObserved: "",
      selfRegulationBehaviourNotes: "",
      curiosityObserved: "",
      curiosityBehaviourNotes: "",
      socialEngagementObserved: "",
      socialEngagementBehaviourNotes: "",
      emotionalRegulationObserved: "",
      emotionalRegulationBehaviourNotes: "",
      confidenceAutonomyObserved: "",
      confidenceAutonomyBehaviourNotes: "",
      // Learning Preference & Intelligence Summary
      linguisticEvidence: [],
      linguisticSupportingObservation: "",
      logicalMathematicalEvidence: [],
      logicalMathematicalSupportingObservation: "",
      spatialEvidence: [],
      spatialSupportingObservation: "",
      bodilyKinestheticEvidence: [],
      bodilyKinestheticSupportingObservation: "",
      musicalEvidence: [],
      musicalSupportingObservation: "",
      existentialEvidence: [],
      existentialSupportingObservation: "",
      interpersonalEvidence: [],
      interpersonalSupportingObservation: "",
      intrapersonalEvidence: [],
      intrapersonalSupportingObservation: "",
      naturalisticEvidence: [],
      naturalisticSupportingObservation: "",
      // Parent-Child Dynamic Snapshot
      parentProximity: [],
      parentInterventionLevel: [],
      parentInterventionStyle: [],
      childIndependenceLevel: "",
      childEmotionalPresentationWithParent: "",
      childIndependenceWhenParentEngaged: "",
      emotionalRegulationWithParentPresent: "",
      // Examiner Summary (Qualitative)
      mostEngagedZone: "",
      dominantObservedIntelligences: "",
      initialLearningStyleImpressions: "",
      earlyFlagsNeedsFollowUp: "",
      selfDirectedVsSeekingGuidance: "",
      flagIndicators: "",
      additionalNotesObservations: "",
      // Office Use Only
      applicationNumber: "",
      loggedToSystemDate: "",
      loggedBy: "",
    },
  });

  // Load existing data
  useEffect(() => {
    loadFormData();
  }, [params.id]);

  const loadFormData = async () => {
    try {
      setLoading(true);
      
      // Load existing form data
      const res = await apiService.get(`/api/admin/initial-observation-form?applicationId=${params.id}`);
      
      // Load application data for auto-filling
      const appRes = await apiService.getApplicationData(params.id);
      
      if (res.success && res.data) {
        const data = res.data;
        reset({
          // Child Information
          fullName: data.fullName || "",
          age: data.age || "",
          date: data.date || "",
          examiner: data.examiner || "",
          // Zone-Based Engagement Grid
          zoneATimeSpent: data.zoneATimeSpent || "",
          zoneASelfDirected: data.zoneASelfDirected || "",
          zoneAObservations: data.zoneAObservations ? data.zoneAObservations.split(',') : [],
          zoneAEngagementLevel: data.zoneAEngagementLevel || "",
          zoneAKeyBehavioursNotes: data.zoneAKeyBehavioursNotes || "",
          zoneBTimeSpent: data.zoneBTimeSpent || "",
          zoneBSelfDirected: data.zoneBSelfDirected || "",
          zoneBObservations: data.zoneBObservations ? data.zoneBObservations.split(',') : [],
          zoneBEngagementLevel: data.zoneBEngagementLevel || "",
          zoneBKeyBehavioursNotes: data.zoneBKeyBehavioursNotes || "",
          zoneCTimeSpent: data.zoneCTimeSpent || "",
          zoneCSelfDirected: data.zoneCSelfDirected || "",
          zoneCObservations: data.zoneCObservations ? data.zoneCObservations.split(',') : [],
          zoneCEngagementLevel: data.zoneCEngagementLevel || "",
          zoneCKeyBehavioursNotes: data.zoneCKeyBehavioursNotes || "",
          zoneDTimeSpent: data.zoneDTimeSpent || "",
          zoneDSelfDirected: data.zoneDSelfDirected || "",
          zoneDObservations: data.zoneDObservations ? data.zoneDObservations.split(',') : [],
          zoneDEngagementLevel: data.zoneDEngagementLevel || "",
          zoneDKeyBehavioursNotes: data.zoneDKeyBehavioursNotes || "",
          // Meta Learning Skill Indicators
          selfRegulationObserved: data.selfRegulationObserved || "",
          selfRegulationBehaviourNotes: data.selfRegulationBehaviourNotes || "",
          curiosityObserved: data.curiosityObserved || "",
          curiosityBehaviourNotes: data.curiosityBehaviourNotes || "",
          socialEngagementObserved: data.socialEngagementObserved || "",
          socialEngagementBehaviourNotes: data.socialEngagementBehaviourNotes || "",
          emotionalRegulationObserved: data.emotionalRegulationObserved || "",
          emotionalRegulationBehaviourNotes: data.emotionalRegulationBehaviourNotes || "",
          confidenceAutonomyObserved: data.confidenceAutonomyObserved || "",
          confidenceAutonomyBehaviourNotes: data.confidenceAutonomyBehaviourNotes || "",
          // Learning Preference & Intelligence Summary
          linguisticEvidence: data.linguisticEvidence ? data.linguisticEvidence.split(',') : [],
          linguisticSupportingObservation: data.linguisticSupportingObservation || "",
          logicalMathematicalEvidence: data.logicalMathematicalEvidence ? data.logicalMathematicalEvidence.split(',') : [],
          logicalMathematicalSupportingObservation: data.logicalMathematicalSupportingObservation || "",
          spatialEvidence: data.spatialEvidence ? data.spatialEvidence.split(',') : [],
          spatialSupportingObservation: data.spatialSupportingObservation || "",
          bodilyKinestheticEvidence: data.bodilyKinestheticEvidence ? data.bodilyKinestheticEvidence.split(',') : [],
          bodilyKinestheticSupportingObservation: data.bodilyKinestheticSupportingObservation || "",
          musicalEvidence: data.musicalEvidence ? data.musicalEvidence.split(',') : [],
          musicalSupportingObservation: data.musicalSupportingObservation || "",
          existentialEvidence: data.existentialEvidence ? data.existentialEvidence.split(',') : [],
          existentialSupportingObservation: data.existentialSupportingObservation || "",
          interpersonalEvidence: data.interpersonalEvidence ? data.interpersonalEvidence.split(',') : [],
          interpersonalSupportingObservation: data.interpersonalSupportingObservation || "",
          intrapersonalEvidence: data.intrapersonalEvidence ? data.intrapersonalEvidence.split(',') : [],
          intrapersonalSupportingObservation: data.intrapersonalSupportingObservation || "",
          naturalisticEvidence: data.naturalisticEvidence ? data.naturalisticEvidence.split(',') : [],
          naturalisticSupportingObservation: data.naturalisticSupportingObservation || "",
          // Parent-Child Dynamic Snapshot
          parentProximity: data.parentProximity ? data.parentProximity.split(',') : [],
          parentInterventionLevel: data.parentInterventionLevel ? data.parentInterventionLevel.split(',') : [],
          parentInterventionStyle: data.parentInterventionStyle ? data.parentInterventionStyle.split(',') : [],
          childIndependenceLevel: data.childIndependenceLevel || "",
          childEmotionalPresentationWithParent: data.childEmotionalPresentationWithParent || "",
          childIndependenceWhenParentEngaged: data.childIndependenceWhenParentEngaged || "",
          emotionalRegulationWithParentPresent: data.emotionalRegulationWithParentPresent || "",
          // Examiner Summary (Qualitative)
          mostEngagedZone: data.mostEngagedZone || "",
          dominantObservedIntelligences: data.dominantObservedIntelligences || "",
          initialLearningStyleImpressions: data.initialLearningStyleImpressions || "",
          earlyFlagsNeedsFollowUp: data.earlyFlagsNeedsFollowUp || "",
          selfDirectedVsSeekingGuidance: data.selfDirectedVsSeekingGuidance || "",
          flagIndicators: data.flagIndicators || "",
          additionalNotesObservations: data.additionalNotesObservations || "",
          // Office Use Only
          applicationNumber: data.applicationNumber || "",
          loggedToSystemDate: data.loggedToSystemDate || "",
          loggedBy: data.loggedBy || "",
        });
      } else if (appRes.success && appRes.data) {
        // Auto-fill with application data if no existing form data
        const appData = appRes.data;
        reset({
          // Child Information
          fullName: appData.childFullName || "",
          age: appData.childAge ? appData.childAge.toString() : "",
          date: new Date().toISOString().split('T')[0],
          examiner: "",
          // Zone-Based Engagement Grid
          zoneATimeSpent: "",
          zoneASelfDirected: "",
          zoneAObservations: [],
          zoneAEngagementLevel: "",
          zoneAKeyBehavioursNotes: "",
          zoneBTimeSpent: "",
          zoneBSelfDirected: "",
          zoneBObservations: [],
          zoneBEngagementLevel: "",
          zoneBKeyBehavioursNotes: "",
          zoneCTimeSpent: "",
          zoneCSelfDirected: "",
          zoneCObservations: [],
          zoneCEngagementLevel: "",
          zoneCKeyBehavioursNotes: "",
          zoneDTimeSpent: "",
          zoneDSelfDirected: "",
          zoneDObservations: [],
          zoneDEngagementLevel: "",
          zoneDKeyBehavioursNotes: "",
          // Meta Learning Skill Indicators
          selfRegulationObserved: "",
          selfRegulationBehaviourNotes: "",
          curiosityObserved: "",
          curiosityBehaviourNotes: "",
          socialEngagementObserved: "",
          socialEngagementBehaviourNotes: "",
          emotionalRegulationObserved: "",
          emotionalRegulationBehaviourNotes: "",
          confidenceAutonomyObserved: "",
          confidenceAutonomyBehaviourNotes: "",
          // Learning Preference & Intelligence Summary
          linguisticEvidence: [],
          linguisticSupportingObservation: "",
          logicalMathematicalEvidence: [],
          logicalMathematicalSupportingObservation: "",
          spatialEvidence: [],
          spatialSupportingObservation: "",
          bodilyKinestheticEvidence: [],
          bodilyKinestheticSupportingObservation: "",
          musicalEvidence: [],
          musicalSupportingObservation: "",
          existentialEvidence: [],
          existentialSupportingObservation: "",
          interpersonalEvidence: [],
          interpersonalSupportingObservation: "",
          intrapersonalEvidence: [],
          intrapersonalSupportingObservation: "",
          naturalisticEvidence: [],
          naturalisticSupportingObservation: "",
          // Parent-Child Dynamic Snapshot
          parentProximity: [],
          parentInterventionLevel: [],
          parentInterventionStyle: [],
          childIndependenceLevel: "",
          childEmotionalPresentationWithParent: "",
          childIndependenceWhenParentEngaged: "",
          emotionalRegulationWithParentPresent: "",
          // Examiner Summary (Qualitative)
          mostEngagedZone: "",
          dominantObservedIntelligences: "",
          initialLearningStyleImpressions: "",
          earlyFlagsNeedsFollowUp: "",
          selfDirectedVsSeekingGuidance: "",
          flagIndicators: "",
          additionalNotesObservations: "",
          // Office Use Only
          applicationNumber: params.id,
          loggedToSystemDate: "",
          loggedBy: "",
        });
      }
    } catch (error: any) {
      console.error("Error loading form data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: InitialObservationFormData) => {
    try {
      setSaving(true);
      setMessage(null);
      
      const res = await apiService.post("/api/admin/initial-observation-form", {
        applicationId: params.id,
        ...data,
        // Convert checkbox arrays to comma-separated strings for API
        zoneAObservations: data.zoneAObservations.join(','),
        zoneBObservations: data.zoneBObservations.join(','),
        zoneCObservations: data.zoneCObservations.join(','),
        zoneDObservations: data.zoneDObservations.join(','),
        // Convert evidence arrays to comma-separated strings
        linguisticEvidence: data.linguisticEvidence.join(','),
        logicalMathematicalEvidence: data.logicalMathematicalEvidence.join(','),
        spatialEvidence: data.spatialEvidence.join(','),
        bodilyKinestheticEvidence: data.bodilyKinestheticEvidence.join(','),
        musicalEvidence: data.musicalEvidence.join(','),
        existentialEvidence: data.existentialEvidence.join(','),
        interpersonalEvidence: data.interpersonalEvidence.join(','),
        intrapersonalEvidence: data.intrapersonalEvidence.join(','),
        naturalisticEvidence: data.naturalisticEvidence.join(','),
        // Convert parent dynamic arrays to comma-separated strings
        parentProximity: data.parentProximity.join(','),
        parentInterventionLevel: data.parentInterventionLevel.join(','),
        parentInterventionStyle: data.parentInterventionStyle.join(','),
      });

      if (res.success) {
        setMessage({ type: 'success', text: 'Initial observation form submitted successfully!' });
        // Redirect to stage listing page after successful submission
        setTimeout(() => {
          router.push(`/admin/applications/${params.id}`);
        }, 1500);
      } else {
        setMessage({ type: 'error', text: res.message || 'Failed to submit form' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to submit form' });
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
        <div className="mb-4">
          <div className="text-xl font-bold text-slate-900">INITIAL OBSERVATION FORM</div>
          <div className="text-sm text-slate-600">Application ID: {params.id}</div>
          <div className="text-xs text-slate-500">Version v1.0 | Reviewed AUG 2025</div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            {/* Child Information */}
            <section>
              <FormSectionHeader title="Child Information" bgClassName="bg-teal-700" />
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Full Name" htmlFor="fullName">
                  <Input 
                    id="fullName"
                    {...register("fullName")}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </FormField>
                <FormField label="Age" htmlFor="age">
                  <Input 
                    id="age"
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
                  {...register("examiner")}
                  className={errors.examiner ? "border-red-500" : ""}
                />
                {errors.examiner && (
                  <p className="text-red-500 text-sm mt-1">{errors.examiner.message}</p>
                )}
              </FormField>
              </div>
            </section>

            {/* Zone-Based Engagement Grid */}
            <section>
              <FormSectionHeader title="Zone-Based Engagement Grid" bgClassName="bg-teal-700" />
              <div className="mt-3 text-sm text-slate-600 mb-4">
                Use ✓ for observed intelligences, + for strongly expressed, and rate 1-5 for engagement.
              </div>
              
              {/* Zone A */}
              <div className="border border-slate-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-slate-900 mb-3">Zone A: Engineering & Building</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormField label="Time Spent" htmlFor="zoneATimeSpent">
                    <Input 
                      id="zoneATimeSpent"
                      {...register("zoneATimeSpent")}
                      className={errors.zoneATimeSpent ? "border-red-500" : ""}
                    />
                    {errors.zoneATimeSpent && (
                      <p className="text-red-500 text-sm mt-1">{errors.zoneATimeSpent.message}</p>
                    )}
                  </FormField>
                  <FormField label="Self-Directed?" htmlFor="zoneASelfDirected">
                    <select 
                      id="zoneASelfDirected"
                      {...register("zoneASelfDirected")}
                      className={`w-full px-3 py-2 border rounded-md text-black bg-white ${errors.zoneASelfDirected ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.zoneASelfDirected && (
                      <p className="text-red-500 text-sm mt-1">{errors.zoneASelfDirected.message}</p>
                    )}
                  </FormField>
                  <FormField label="Engagement Level (1-5)" htmlFor="zoneAEngagementLevel">
                    <select 
                      id="zoneAEngagementLevel"
                      {...register("zoneAEngagementLevel")}
                      className={`w-full px-3 py-2 border rounded-md text-black bg-white ${errors.zoneAEngagementLevel ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Select...</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    {errors.zoneAEngagementLevel && (
                      <p className="text-red-500 text-sm mt-1">{errors.zoneAEngagementLevel.message}</p>
                    )}
                  </FormField>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Observations</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        value="Spatial"
                        {...register("zoneAObservations")}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-slate-700">Spatial</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        value="Logical"
                        {...register("zoneAObservations")}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-slate-700">Logical</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        value="Bodily"
                        {...register("zoneAObservations")}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-slate-700">Bodily</span>
                    </label>
                  </div>
                  {errors.zoneAObservations && (
                    <p className="text-red-500 text-sm mt-1">{errors.zoneAObservations.message}</p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Key Behaviours / Notes</label>
                  <Textarea 
                    rows={3}
                    {...register("zoneAKeyBehavioursNotes")}
                    placeholder="Record key behaviours and observations..."
                    className={errors.zoneAKeyBehavioursNotes ? "border-red-500" : ""}
                  />
                  {errors.zoneAKeyBehavioursNotes && (
                    <p className="text-red-500 text-sm mt-1">{errors.zoneAKeyBehavioursNotes.message}</p>
                  )}
                </div>
              </div>

              {/* Zone B */}
              <div className="border border-slate-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-slate-900 mb-3">Zone B: Creative Arts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormField label="Time Spent" htmlFor="zoneBTimeSpent">
                    <Input 
                      id="zoneBTimeSpent"
                      {...register("zoneBTimeSpent")}
                      className={errors.zoneBTimeSpent ? "border-red-500" : ""}
                    />
                    {errors.zoneBTimeSpent && (
                      <p className="text-red-500 text-sm mt-1">{errors.zoneBTimeSpent.message}</p>
                    )}
                  </FormField>
                  <FormField label="Self-Directed?" htmlFor="zoneBSelfDirected">
                    <select 
                      id="zoneBSelfDirected"
                      {...register("zoneBSelfDirected")}
                      className={`w-full px-3 py-2 border rounded-md text-black bg-white ${errors.zoneBSelfDirected ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.zoneBSelfDirected && (
                      <p className="text-red-500 text-sm mt-1">{errors.zoneBSelfDirected.message}</p>
                    )}
                  </FormField>
                  <FormField label="Engagement Level (1-5)" htmlFor="zoneBEngagementLevel">
                    <select 
                      id="zoneBEngagementLevel"
                      {...register("zoneBEngagementLevel")}
                      className={`w-full px-3 py-2 border rounded-md text-black bg-white ${errors.zoneBEngagementLevel ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Select...</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    {errors.zoneBEngagementLevel && (
                      <p className="text-red-500 text-sm mt-1">{errors.zoneBEngagementLevel.message}</p>
                    )}
                  </FormField>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Observations</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        value="Linguistic"
                        {...register("zoneBObservations")}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-slate-700">Linguistic</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        value="Spatial"
                        {...register("zoneBObservations")}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-slate-700">Spatial</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        value="Intra"
                        {...register("zoneBObservations")}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-slate-700">Intra</span>
                    </label>
                  </div>
                  {errors.zoneBObservations && (
                    <p className="text-red-500 text-sm mt-1">{errors.zoneBObservations.message}</p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Key Behaviours / Notes</label>
                  <Textarea 
                    rows={3}
                    {...register("zoneBKeyBehavioursNotes")}
                    placeholder="Record key behaviours and observations..."
                    className={errors.zoneBKeyBehavioursNotes ? "border-red-500" : ""}
                  />
                  {errors.zoneBKeyBehavioursNotes && (
                    <p className="text-red-500 text-sm mt-1">{errors.zoneBKeyBehavioursNotes.message}</p>
                  )}
                </div>
              </div>

              {/* Zone C */}
              <div className="border border-slate-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-slate-900 mb-3">Zone C: Sensory & Regulation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormField label="Time Spent" htmlFor="zoneCTimeSpent">
                    <Input 
                      id="zoneCTimeSpent"
                      {...register("zoneCTimeSpent")}
                      className={errors.zoneCTimeSpent ? "border-red-500" : ""}
                    />
                    {errors.zoneCTimeSpent && (
                      <p className="text-red-500 text-sm mt-1">{errors.zoneCTimeSpent.message}</p>
                    )}
                  </FormField>
                  <FormField label="Self-Directed?" htmlFor="zoneCSelfDirected">
                    <select 
                      id="zoneCSelfDirected"
                      {...register("zoneCSelfDirected")}
                      className={`w-full px-3 py-2 border rounded-md text-black bg-white ${errors.zoneCSelfDirected ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.zoneCSelfDirected && (
                      <p className="text-red-500 text-sm mt-1">{errors.zoneCSelfDirected.message}</p>
                    )}
                  </FormField>
                  <FormField label="Engagement Level (1-5)" htmlFor="zoneCEngagementLevel">
                    <select 
                      id="zoneCEngagementLevel"
                      {...register("zoneCEngagementLevel")}
                      className={`w-full px-3 py-2 border rounded-md text-black bg-white ${errors.zoneCEngagementLevel ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Select...</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    {errors.zoneCEngagementLevel && (
                      <p className="text-red-500 text-sm mt-1">{errors.zoneCEngagementLevel.message}</p>
                    )}
                  </FormField>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Observations</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        value="Intrapersonal"
                        {...register("zoneCObservations")}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-slate-700">Intrapersonal</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        value="Naturalistic"
                        {...register("zoneCObservations")}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-slate-700">Naturalistic</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        value="Musical"
                        {...register("zoneCObservations")}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-slate-700">Musical</span>
                    </label>
                  </div>
                  {errors.zoneCObservations && (
                    <p className="text-red-500 text-sm mt-1">{errors.zoneCObservations.message}</p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Key Behaviours / Notes</label>
                  <Textarea 
                    rows={3}
                    {...register("zoneCKeyBehavioursNotes")}
                    placeholder="Record key behaviours and observations..."
                    className={errors.zoneCKeyBehavioursNotes ? "border-red-500" : ""}
                  />
                  {errors.zoneCKeyBehavioursNotes && (
                    <p className="text-red-500 text-sm mt-1">{errors.zoneCKeyBehavioursNotes.message}</p>
                  )}
                </div>
              </div>

              {/* Zone D */}
              <div className="border border-slate-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-slate-900 mb-3">Zone D: Reading & Logic</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormField label="Time Spent" htmlFor="zoneDTimeSpent">
                    <Input 
                      id="zoneDTimeSpent"
                      {...register("zoneDTimeSpent")}
                      className={errors.zoneDTimeSpent ? "border-red-500" : ""}
                    />
                    {errors.zoneDTimeSpent && (
                      <p className="text-red-500 text-sm mt-1">{errors.zoneDTimeSpent.message}</p>
                    )}
                  </FormField>
                  <FormField label="Self-Directed?" htmlFor="zoneDSelfDirected">
                    <select 
                      id="zoneDSelfDirected"
                      {...register("zoneDSelfDirected")}
                      className={`w-full px-3 py-2 border rounded-md text-black bg-white ${errors.zoneDSelfDirected ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.zoneDSelfDirected && (
                      <p className="text-red-500 text-sm mt-1">{errors.zoneDSelfDirected.message}</p>
                    )}
                  </FormField>
                  <FormField label="Engagement Level (1-5)" htmlFor="zoneDEngagementLevel">
                    <select 
                      id="zoneDEngagementLevel"
                      {...register("zoneDEngagementLevel")}
                      className={`w-full px-3 py-2 border rounded-md text-black bg-white ${errors.zoneDEngagementLevel ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Select...</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    {errors.zoneDEngagementLevel && (
                      <p className="text-red-500 text-sm mt-1">{errors.zoneDEngagementLevel.message}</p>
                    )}
                  </FormField>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Observations</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        value="Logical"
                        {...register("zoneDObservations")}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-slate-700">Logical</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        value="Linguistic"
                        {...register("zoneDObservations")}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-slate-700">Linguistic</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        value="Existential"
                        {...register("zoneDObservations")}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-slate-700">Existential</span>
                    </label>
                  </div>
                  {errors.zoneDObservations && (
                    <p className="text-red-500 text-sm mt-1">{errors.zoneDObservations.message}</p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Key Behaviours / Notes</label>
                  <Textarea 
                    rows={3}
                    {...register("zoneDKeyBehavioursNotes")}
                    placeholder="Record key behaviours and observations..."
                    className={errors.zoneDKeyBehavioursNotes ? "border-red-500" : ""}
                  />
                  {errors.zoneDKeyBehavioursNotes && (
                    <p className="text-red-500 text-sm mt-1">{errors.zoneDKeyBehavioursNotes.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Meta Learning Skill Indicators */}
            <section>
              <FormSectionHeader title="Meta Learning Skill Indicators" bgClassName="bg-teal-700" />
              <div className="mt-3 text-sm text-slate-600 mb-4">
                Check off presence and note behaviour. Use N/A if insufficient data.
              </div>
              
              <div className="space-y-4">
                {/* Self-Regulation */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Self-Regulation</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="radio" value="Yes" {...register("selfRegulationObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" value="No" {...register("selfRegulationObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">No</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" value="N/A" {...register("selfRegulationObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">N/A</span>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Behaviour Notes</label>
                      <Textarea 
                        rows={3}
                        {...register("selfRegulationBehaviourNotes")}
                        placeholder="Manages emotions, returns to task, low reactivity"
                        className={errors.selfRegulationBehaviourNotes ? "border-red-500" : ""}
                      />
                      {errors.selfRegulationBehaviourNotes && (
                        <p className="text-red-500 text-sm mt-1">{errors.selfRegulationBehaviourNotes.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Curiosity */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Curiosity</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="radio" value="Yes" {...register("curiosityObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" value="No" {...register("curiosityObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">No</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" value="N/A" {...register("curiosityObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">N/A</span>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Behaviour Notes</label>
                      <Textarea 
                        rows={3}
                        {...register("curiosityBehaviourNotes")}
                        placeholder="Initiates exploration, repeats task, asks questions"
                        className={errors.curiosityBehaviourNotes ? "border-red-500" : ""}
                      />
                      {errors.curiosityBehaviourNotes && (
                        <p className="text-red-500 text-sm mt-1">{errors.curiosityBehaviourNotes.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Engagement */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Social Engagement</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="radio" value="Yes" {...register("socialEngagementObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" value="No" {...register("socialEngagementObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">No</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" value="N/A" {...register("socialEngagementObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">N/A</span>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Behaviour Notes</label>
                      <Textarea 
                        rows={3}
                        {...register("socialEngagementBehaviourNotes")}
                        placeholder="Interacts, watches others, initiates collaboration"
                        className={errors.socialEngagementBehaviourNotes ? "border-red-500" : ""}
                      />
                      {errors.socialEngagementBehaviourNotes && (
                        <p className="text-red-500 text-sm mt-1">{errors.socialEngagementBehaviourNotes.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Emotional Regulation */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Emotional Regulation</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="radio" value="Yes" {...register("emotionalRegulationObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" value="No" {...register("emotionalRegulationObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">No</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" value="N/A" {...register("emotionalRegulationObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">N/A</span>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Behaviour Notes</label>
                      <Textarea 
                        rows={3}
                        {...register("emotionalRegulationBehaviourNotes")}
                        placeholder="Handles frustration, maintains emotional balance"
                        className={errors.emotionalRegulationBehaviourNotes ? "border-red-500" : ""}
                      />
                      {errors.emotionalRegulationBehaviourNotes && (
                        <p className="text-red-500 text-sm mt-1">{errors.emotionalRegulationBehaviourNotes.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Confidence / Autonomy */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Confidence / Autonomy</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="radio" value="Yes" {...register("confidenceAutonomyObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" value="No" {...register("confidenceAutonomyObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">No</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" value="N/A" {...register("confidenceAutonomyObserved")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                          <span className="text-sm text-slate-700">N/A</span>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Behaviour Notes</label>
                      <Textarea 
                        rows={3}
                        {...register("confidenceAutonomyBehaviourNotes")}
                        placeholder="Approaches activities independently, takes initiative"
                        className={errors.confidenceAutonomyBehaviourNotes ? "border-red-500" : ""}
                      />
                      {errors.confidenceAutonomyBehaviourNotes && (
                        <p className="text-red-500 text-sm mt-1">{errors.confidenceAutonomyBehaviourNotes.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Learning Preference & Intelligence Summary */}
            <section>
              <FormSectionHeader title="Learning Preference & Intelligence Summary" bgClassName="bg-teal-700" />
              <div className="mt-3 text-sm text-slate-600 mb-4">
                Mark the child's most clearly observed preferences. Use ✓ for moderate evidence, + for strong evidence.
              </div>
              
              <div className="space-y-4">
                {/* Linguistic */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Linguistic (Word-Smart)</label>
                      <p className="text-sm text-slate-600">Strong use of spoken or written language, storytelling, vocabulary</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Evidence</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="moderate" {...register("linguisticEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">✓ Moderate</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="strong" {...register("linguisticEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">+ Strong</span>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Supporting Observation</label>
                      <Textarea 
                        rows={3}
                        {...register("linguisticSupportingObservation")}
                        placeholder="Record specific observations..."
                        className={errors.linguisticSupportingObservation ? "border-red-500" : ""}
                      />
                      {errors.linguisticSupportingObservation && (
                        <p className="text-red-500 text-sm mt-1">{errors.linguisticSupportingObservation.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Logical-Mathematical */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Logical-Mathematical</label>
                      <p className="text-sm text-slate-600">Good at puzzles, patterns, reasoning, and numbers</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Evidence</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="moderate" {...register("logicalMathematicalEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">✓ Moderate</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="strong" {...register("logicalMathematicalEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">+ Strong</span>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Supporting Observation</label>
                      <Textarea 
                        rows={3}
                        {...register("logicalMathematicalSupportingObservation")}
                        placeholder="Record specific observations..."
                        className={errors.logicalMathematicalSupportingObservation ? "border-red-500" : ""}
                      />
                      {errors.logicalMathematicalSupportingObservation && (
                        <p className="text-red-500 text-sm mt-1">{errors.logicalMathematicalSupportingObservation.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Spatial */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Spatial (Visual/Spatial)</label>
                      <p className="text-sm text-slate-600">Good with visualizing and designing with space or images</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Evidence</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="moderate" {...register("spatialEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">✓ Moderate</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="strong" {...register("spatialEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">+ Strong</span>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Supporting Observation</label>
                      <Textarea 
                        rows={3}
                        {...register("spatialSupportingObservation")}
                        placeholder="Record specific observations..."
                        className={errors.spatialSupportingObservation ? "border-red-500" : ""}
                      />
                      {errors.spatialSupportingObservation && (
                        <p className="text-red-500 text-sm mt-1">{errors.spatialSupportingObservation.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bodily-Kinesthetic */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Bodily-Kinesthetic</label>
                      <p className="text-sm text-slate-600">Skilled in using body for movement, building, or tactile learning</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Evidence</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="moderate" {...register("bodilyKinestheticEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">✓ Moderate</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="strong" {...register("bodilyKinestheticEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">+ Strong</span>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Supporting Observation</label>
                      <Textarea 
                        rows={3}
                        {...register("bodilyKinestheticSupportingObservation")}
                        placeholder="Record specific observations..."
                        className={errors.bodilyKinestheticSupportingObservation ? "border-red-500" : ""}
                      />
                      {errors.bodilyKinestheticSupportingObservation && (
                        <p className="text-red-500 text-sm mt-1">{errors.bodilyKinestheticSupportingObservation.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Musical */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Musical (Sound/Rhythm Smart)</label>
                      <p className="text-sm text-slate-600">Sensitive to sound, rhythm, music, and auditory cues</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Evidence</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="moderate" {...register("musicalEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">✓ Moderate</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="strong" {...register("musicalEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">+ Strong</span>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Supporting Observation</label>
                      <Textarea 
                        rows={3}
                        {...register("musicalSupportingObservation")}
                        placeholder="Record specific observations..."
                        className={errors.musicalSupportingObservation ? "border-red-500" : ""}
                      />
                      {errors.musicalSupportingObservation && (
                        <p className="text-red-500 text-sm mt-1">{errors.musicalSupportingObservation.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Interpersonal */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Interpersonal (People Smart)</label>
                      <p className="text-sm text-slate-600">Easily engages with others, strong social and emotional interaction</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Evidence</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="moderate" {...register("interpersonalEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">✓ Moderate</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="strong" {...register("interpersonalEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">+ Strong</span>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Supporting Observation</label>
                      <Textarea 
                        rows={3}
                        {...register("interpersonalSupportingObservation")}
                        placeholder="Record specific observations..."
                        className={errors.interpersonalSupportingObservation ? "border-red-500" : ""}
                      />
                      {errors.interpersonalSupportingObservation && (
                        <p className="text-red-500 text-sm mt-1">{errors.interpersonalSupportingObservation.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Intrapersonal */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Intrapersonal (Self-Smart)</label>
                      <p className="text-sm text-slate-600">Self-aware, enjoys alone time, reflective</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Evidence</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="moderate" {...register("intrapersonalEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">✓ Moderate</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="strong" {...register("intrapersonalEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">+ Strong</span>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Supporting Observation</label>
                      <Textarea 
                        rows={3}
                        {...register("intrapersonalSupportingObservation")}
                        placeholder="Record specific observations..."
                        className={errors.intrapersonalSupportingObservation ? "border-red-500" : ""}
                      />
                      {errors.intrapersonalSupportingObservation && (
                        <p className="text-red-500 text-sm mt-1">{errors.intrapersonalSupportingObservation.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Naturalistic */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Naturalistic (Nature Smart)</label>
                      <p className="text-sm text-slate-600">Curious about nature, patterns in environment</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Evidence</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="moderate" {...register("naturalisticEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">✓ Moderate</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="strong" {...register("naturalisticEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">+ Strong</span>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Supporting Observation</label>
                      <Textarea 
                        rows={3}
                        {...register("naturalisticSupportingObservation")}
                        placeholder="Record specific observations..."
                        className={errors.naturalisticSupportingObservation ? "border-red-500" : ""}
                      />
                      {errors.naturalisticSupportingObservation && (
                        <p className="text-red-500 text-sm mt-1">{errors.naturalisticSupportingObservation.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Existential */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Existential (Big Question)</label>
                    <p className="text-sm text-slate-600">Asks deep questions about meaning, purpose, or life</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Evidence</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" value="moderate" {...register("existentialEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                        <span className="text-sm text-slate-700">✓ Moderate</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" value="strong" {...register("existentialEvidence")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                        <span className="text-sm text-slate-700">+ Strong</span>
                      </label>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Supporting Observation</label>
                    <Textarea 
                      rows={3}
                      {...register("existentialSupportingObservation")}
                      placeholder="Record specific observations..."
                      className={errors.existentialSupportingObservation ? "border-red-500" : ""}
                    />
                    {errors.existentialSupportingObservation && (
                      <p className="text-red-500 text-sm mt-1">{errors.existentialSupportingObservation.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Parent-Child Dynamic Snapshot */}
            <section>
              <FormSectionHeader title="Parent-Child Dynamic Snapshot" bgClassName="bg-teal-700" />
              <div className="mt-3 space-y-4">
                {/* Parent Proximity */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Parent Proximity</label>
                    </div>
                    <div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="Close" {...register("parentProximity")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">Close</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="Hovering" {...register("parentProximity")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">Hovering</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="Distant" {...register("parentProximity")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">Distant</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parent Intervention Level */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Parent Intervention Level</label>
                    </div>
                    <div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="Low" {...register("parentInterventionLevel")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">Low</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="Medium" {...register("parentInterventionLevel")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">Medium</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="High" {...register("parentInterventionLevel")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">High</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parent Intervention Style */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Parent Intervention Style</label>
                    </div>
                    <div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="Directive" {...register("parentInterventionStyle")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">Directive</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="Supportive" {...register("parentInterventionStyle")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">Supportive</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value="Detached" {...register("parentInterventionStyle")} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                          <span className="text-sm text-slate-700">Detached</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Child's Independence Level */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Child's Independence Level</label>
                    </div>
                    <div>
                      <Textarea 
                        rows={3}
                        {...register("childIndependenceLevel")}
                        placeholder="Record observations about child's independence..."
                        className={errors.childIndependenceLevel ? "border-red-500" : ""}
                      />
                      {errors.childIndependenceLevel && (
                        <p className="text-red-500 text-sm mt-1">{errors.childIndependenceLevel.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Child's Emotional Presentation (with Parent) */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Child's Emotional Presentation (with Parent)</label>
                    </div>
                    <div>
                      <Textarea 
                        rows={3}
                        {...register("childEmotionalPresentationWithParent")}
                        placeholder="Record observations about child's emotional presentation with parent..."
                        className={errors.childEmotionalPresentationWithParent ? "border-red-500" : ""}
                      />
                      {errors.childEmotionalPresentationWithParent && (
                        <p className="text-red-500 text-sm mt-1">{errors.childEmotionalPresentationWithParent.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Child's Independence when Parent is Engaged */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Child's Independence when Parent is Engaged</label>
                    </div>
                    <div>
                      <Textarea 
                        rows={3}
                        {...register("childIndependenceWhenParentEngaged")}
                        placeholder="Record observations about child's independence when parent is engaged..."
                        className={errors.childIndependenceWhenParentEngaged ? "border-red-500" : ""}
                      />
                      {errors.childIndependenceWhenParentEngaged && (
                        <p className="text-red-500 text-sm mt-1">{errors.childIndependenceWhenParentEngaged.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Emotional Regulation with Parent Present */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Emotional Regulation with Parent Present</label>
                    </div>
                    <div>
                      <Textarea 
                        rows={3}
                        {...register("emotionalRegulationWithParentPresent")}
                        placeholder="Record observations about emotional regulation with parent present..."
                        className={errors.emotionalRegulationWithParentPresent ? "border-red-500" : ""}
                      />
                      {errors.emotionalRegulationWithParentPresent && (
                        <p className="text-red-500 text-sm mt-1">{errors.emotionalRegulationWithParentPresent.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Examiner Summary (Qualitative) */}
            <section>
              <FormSectionHeader title="Examiner Summary (Qualitative)" bgClassName="bg-teal-700" />
              <div className="mt-3 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Most engaged zone</label>
                    <Input 
                      {...register("mostEngagedZone")}
                      className={errors.mostEngagedZone ? "border-red-500" : ""}
                    />
                    {errors.mostEngagedZone && (
                      <p className="text-red-500 text-sm mt-1">{errors.mostEngagedZone.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Dominant observed intelligences</label>
                    <Input 
                      {...register("dominantObservedIntelligences")}
                      className={errors.dominantObservedIntelligences ? "border-red-500" : ""}
                    />
                    {errors.dominantObservedIntelligences && (
                      <p className="text-red-500 text-sm mt-1">{errors.dominantObservedIntelligences.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Initial learning style impressions</label>
                  <Textarea 
                    rows={3}
                    {...register("initialLearningStyleImpressions")}
                    className={errors.initialLearningStyleImpressions ? "border-red-500" : ""}
                  />
                  {errors.initialLearningStyleImpressions && (
                    <p className="text-red-500 text-sm mt-1">{errors.initialLearningStyleImpressions.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Any early flags or needs for follow-up</label>
                  <Textarea 
                    rows={3}
                    {...register("earlyFlagsNeedsFollowUp")}
                    className={errors.earlyFlagsNeedsFollowUp ? "border-red-500" : ""}
                  />
                  {errors.earlyFlagsNeedsFollowUp && (
                    <p className="text-red-500 text-sm mt-1">{errors.earlyFlagsNeedsFollowUp.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Self-directed vs. seeking guidance</label>
                  <Textarea 
                    rows={3}
                    {...register("selfDirectedVsSeekingGuidance")}
                    className={errors.selfDirectedVsSeekingGuidance ? "border-red-500" : ""}
                  />
                  {errors.selfDirectedVsSeekingGuidance && (
                    <p className="text-red-500 text-sm mt-1">{errors.selfDirectedVsSeekingGuidance.message}</p>
                  )}
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Flag Indicators</label>
                      <div className="text-sm text-slate-600">
                        <p>P - Excessive parental interference</p>
                        <p>T - Technology discomfort</p>
                        <p>C - Confidence/independence concerns</p>
                        <p>E - Exceptional performance in specific area</p>
                      </div>
                    </div>
                    <div>
                      <Textarea 
                        rows={6}
                        {...register("flagIndicators")}
                        placeholder="Record any flag indicators observed..."
                        className={errors.flagIndicators ? "border-red-500" : ""}
                      />
                      {errors.flagIndicators && (
                        <p className="text-red-500 text-sm mt-1">{errors.flagIndicators.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes / Observations</label>
                  <Textarea 
                    rows={8}
                    {...register("additionalNotesObservations")}
                    placeholder="Record any additional notes or observations..."
                    className={errors.additionalNotesObservations ? "border-red-500" : ""}
                  />
                  {errors.additionalNotesObservations && (
                    <p className="text-red-500 text-sm mt-1">{errors.additionalNotesObservations.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Office Use Only - hidden for now */}
            {false && (
            <section>
              <FormSectionHeader title="Office Use Only" bgClassName="bg-teal-700" />
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Application Number" htmlFor="applicationNumber">
                  <Input 
                    id="applicationNumber"
                    {...register("applicationNumber")}
                    className={errors.applicationNumber ? "border-red-500" : ""}
                  />
                  {errors.applicationNumber?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors?.applicationNumber?.message}</p>
                  )}
                </FormField>
                <FormField label="Logged to System Date" htmlFor="loggedToSystemDate">
                  <Input 
                    id="loggedToSystemDate"
                    type="date"
                    {...register("loggedToSystemDate")}
                    className={errors.loggedToSystemDate ? "border-red-500" : ""}
                  />
                  {errors.loggedToSystemDate && (
                  <p className="text-red-500 text-sm mt-1">{errors?.loggedToSystemDate?.message}</p>
                  )}
                </FormField>
                <FormField label="Logged by" htmlFor="loggedBy">
                  <Input 
                    id="loggedBy"
                    {...register("loggedBy")}
                    placeholder="Enter name"
                    className={errors.loggedBy ? "border-red-500" : ""}
                  />
                  {errors.loggedBy && (
                    <p className="text-red-500 text-sm mt-1">{errors?.loggedBy?.message}</p>
                  )}
                </FormField>
              </div>
              <div className="mt-4 text-right text-sm text-slate-600">
                <p>Owner: SY Holdings WLL</p>
                <p>Prepared by: Meta Learning Systems Implementation Unit</p>
                <p>Confidentiality Level: Internal Operational Use</p>
                {/* <p>Page 4 of 5</p> */}
              </div>
            </section>
            )}

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
                {saving ? 'Submitting...' : 'Submit Form'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
