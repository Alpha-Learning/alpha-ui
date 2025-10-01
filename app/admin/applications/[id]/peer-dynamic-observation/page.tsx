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
  // Observation Details
  childName: z.string().min(1, "Required"),
  date: z.string().min(1, "Required"),
  examiner: z.string().min(1, "Required"),
  age: z.string().min(1, "Required"),
  sessionStartTime: z.string().min(1, "Required"),
  sessionEndTime: z.string().min(1, "Required"),
  
  // Behavioural Skill Assessment (1-5 ratings)
  leadershipRating: z.string().min(1, "Required"),
  leadershipNotes: z.string().optional(),
  collaborationRating: z.string().min(1, "Required"),
  collaborationNotes: z.string().optional(),
  conflictResolutionRating: z.string().min(1, "Required"),
  conflictResolutionNotes: z.string().optional(),
  communicationRating: z.string().min(1, "Required"),
  communicationNotes: z.string().optional(),
  emotionalRegulationRating: z.string().min(1, "Required"),
  emotionalRegulationNotes: z.string().optional(),
  empathyRating: z.string().min(1, "Required"),
  empathyNotes: z.string().optional(),
  adaptabilityRating: z.string().min(1, "Required"),
  adaptabilityNotes: z.string().optional(),
  initiativeRating: z.string().min(1, "Required"),
  initiativeNotes: z.string().optional(),
  
  // Meta Learning Skill Alignment (Yes/No observations)
  curiosityObserved: z.boolean().default(false),
  curiosityNotes: z.string().optional(),
  confidenceObserved: z.boolean().default(false),
  confidenceNotes: z.string().optional(),
  selfRegulationObserved: z.boolean().default(false),
  selfRegulationNotes: z.string().optional(),
  collaborationObserved: z.boolean().default(false),
  collaborationObservedNotes: z.string().optional(),
  emotionalAwarenessObserved: z.boolean().default(false),
  emotionalAwarenessNotes: z.string().optional(),
  leadershipObserved: z.boolean().default(false),
  leadershipObservedNotes: z.string().optional(),
  problemSolvingObserved: z.boolean().default(false),
  problemSolvingNotes: z.string().optional(),
  perspectiveTakingObserved: z.boolean().default(false),
  perspectiveTakingNotes: z.string().optional(),
  
  // Learning Preference & Intelligence Inference
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
  
  // Learning Style Clues
  visualObserved: z.boolean().default(false),
  visualNotes: z.string().optional(),
  auditoryObserved: z.boolean().default(false),
  auditoryNotes: z.string().optional(),
  kinestheticObserved: z.boolean().default(false),
  kinestheticNotes: z.string().optional(),
  verbalObserved: z.boolean().default(false),
  verbalNotes: z.string().optional(),
  socialObserved: z.boolean().default(false),
  socialNotes: z.string().optional(),
  solitaryObserved: z.boolean().default(false),
  solitaryNotes: z.string().optional(),
  
  // Social Role Tendency (multiple selections allowed)
  leaderRole: z.boolean().default(false),
  withdrawnRole: z.boolean().default(false),
  problemSolverRole: z.boolean().default(false),
  followerRole: z.boolean().default(false),
  initiatorRole: z.boolean().default(false),
  bridgerRole: z.boolean().default(false),
  observerRole: z.boolean().default(false),
  supporterRole: z.boolean().default(false),
  challengerRole: z.boolean().default(false),
  mediatorRole: z.boolean().default(false),
  
  // Summary Reflections
  notableStrengths: z.string().optional(),
  areasOfConcern: z.string().optional(),
  situationsChildThrived: z.string().optional(),
  situationsChallenging: z.string().optional(),
  suggestedFollowUp: z.string().optional(),
  caregiverInteraction: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function PeerDynamicObservationPage() {
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
      date: "",
      examiner: "",
      age: "",
      sessionStartTime: "",
      sessionEndTime: "",
      leadershipRating: "",
      leadershipNotes: "",
      collaborationRating: "",
      collaborationNotes: "",
      conflictResolutionRating: "",
      conflictResolutionNotes: "",
      communicationRating: "",
      communicationNotes: "",
      emotionalRegulationRating: "",
      emotionalRegulationNotes: "",
      empathyRating: "",
      empathyNotes: "",
      adaptabilityRating: "",
      adaptabilityNotes: "",
      initiativeRating: "",
      initiativeNotes: "",
      curiosityObserved: false,
      curiosityNotes: "",
      confidenceObserved: false,
      confidenceNotes: "",
      selfRegulationObserved: false,
      selfRegulationNotes: "",
      collaborationObserved: false,
      collaborationObservedNotes: "",
      emotionalAwarenessObserved: false,
      emotionalAwarenessNotes: "",
      leadershipObserved: false,
      leadershipObservedNotes: "",
      problemSolvingObserved: false,
      problemSolvingNotes: "",
      perspectiveTakingObserved: false,
      perspectiveTakingNotes: "",
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
      visualObserved: false,
      visualNotes: "",
      auditoryObserved: false,
      auditoryNotes: "",
      kinestheticObserved: false,
      kinestheticNotes: "",
      verbalObserved: false,
      verbalNotes: "",
      socialObserved: false,
      socialNotes: "",
      solitaryObserved: false,
      solitaryNotes: "",
      leaderRole: false,
      withdrawnRole: false,
      problemSolverRole: false,
      followerRole: false,
      initiatorRole: false,
      bridgerRole: false,
      observerRole: false,
      supporterRole: false,
      challengerRole: false,
      mediatorRole: false,
      notableStrengths: "",
      areasOfConcern: "",
      situationsChildThrived: "",
      situationsChallenging: "",
      suggestedFollowUp: "",
      caregiverInteraction: "",
    },
  });

  console.log("errors", errors);

  useEffect(() => {
    (async () => {
      const res = await apiService.get(
        `/api/admin/peer-dynamic-observation?applicationId=${params.id}`
      );
      if (res.success && res.data) {
        reset(res.data);
      }
    })();
  }, [params.id, reset]);

  const onSubmit = async (values: FormValues) => {
    setSaving(true);
    try {
      const response = await apiService.post("/api/admin/peer-dynamic-observation", {
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
          Examiner Form: Peer Dynamic Observation
        </div>
        <div className="text-sm text-slate-600">
          Application ID: {params.id}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Observation Details */}
        <section className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Observation Details"
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
            <FormField label="Age" htmlFor="age" error={errors.age as any}>
              <Input id="age" {...register("age")} />
            </FormField>
            <FormField label="Date" htmlFor="date" error={errors.date as any}>
              <Input id="date" {...register("date")} />
            </FormField>
            <FormField label="Examiner" htmlFor="examiner" error={errors.examiner as any}>
              <Input id="examiner" {...register("examiner")} />
            </FormField>
            <FormField label="Session Start Time" htmlFor="sessionStartTime" error={errors.sessionStartTime as any}>
              <Input id="sessionStartTime" {...register("sessionStartTime")} />
            </FormField>
            <FormField label="Session End Time" htmlFor="sessionEndTime" error={errors.sessionEndTime as any}>
              <Input id="sessionEndTime" {...register("sessionEndTime")} />
            </FormField>
          </div>
        </section>

        {/* Behavioural Skill Assessment */}
        <section className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Behavioural Skill Assessment"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>
              <strong>Instructions:</strong> Rate each skill on a scale of 1 (Emerging) to 5 (Exemplary). Add brief notes or examples to support your observations.
            </p>
          </div>

          <div className="space-y-4">
            {/* Leadership */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Leadership</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="leadershipRating"
                  error={errors.leadershipRating as any}
                >
                  <select
                    id="leadershipRating"
                    {...register("leadershipRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.leadershipRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Emerging</option>
                    <option value="2">2 = Developing</option>
                    <option value="3">3 = Proficient</option>
                    <option value="4">4 = Advanced</option>
                    <option value="5">5 = Exemplary</option>
                  </select>
                </FormField>
                <FormField label="Notes / Evidence" htmlFor="leadershipNotes">
                  <Textarea
                    rows={3}
                    id="leadershipNotes"
                    {...register("leadershipNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Collaboration */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Collaboration</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="collaborationRating"
                  error={errors.collaborationRating as any}
                >
                  <select
                    id="collaborationRating"
                    {...register("collaborationRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.collaborationRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Emerging</option>
                    <option value="2">2 = Developing</option>
                    <option value="3">3 = Proficient</option>
                    <option value="4">4 = Advanced</option>
                    <option value="5">5 = Exemplary</option>
                  </select>
                </FormField>
                <FormField label="Notes / Evidence" htmlFor="collaborationNotes">
                  <Textarea
                    rows={3}
                    id="collaborationNotes"
                    {...register("collaborationNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Conflict Resolution */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Conflict Resolution</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="conflictResolutionRating"
                  error={errors.conflictResolutionRating as any}
                >
                  <select
                    id="conflictResolutionRating"
                    {...register("conflictResolutionRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.conflictResolutionRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Emerging</option>
                    <option value="2">2 = Developing</option>
                    <option value="3">3 = Proficient</option>
                    <option value="4">4 = Advanced</option>
                    <option value="5">5 = Exemplary</option>
                  </select>
                </FormField>
                <FormField label="Notes / Evidence" htmlFor="conflictResolutionNotes">
                  <Textarea
                    rows={3}
                    id="conflictResolutionNotes"
                    {...register("conflictResolutionNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Communication */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Communication</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="communicationRating"
                  error={errors.communicationRating as any}
                >
                  <select
                    id="communicationRating"
                    {...register("communicationRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.communicationRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Emerging</option>
                    <option value="2">2 = Developing</option>
                    <option value="3">3 = Proficient</option>
                    <option value="4">4 = Advanced</option>
                    <option value="5">5 = Exemplary</option>
                  </select>
                </FormField>
                <FormField label="Notes / Evidence" htmlFor="communicationNotes">
                  <Textarea
                    rows={3}
                    id="communicationNotes"
                    {...register("communicationNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Emotional Regulation */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Emotional Regulation</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="emotionalRegulationRating"
                  error={errors.emotionalRegulationRating as any}
                >
                  <select
                    id="emotionalRegulationRating"
                    {...register("emotionalRegulationRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.emotionalRegulationRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Emerging</option>
                    <option value="2">2 = Developing</option>
                    <option value="3">3 = Proficient</option>
                    <option value="4">4 = Advanced</option>
                    <option value="5">5 = Exemplary</option>
                  </select>
                </FormField>
                <FormField label="Notes / Evidence" htmlFor="emotionalRegulationNotes">
                  <Textarea
                    rows={3}
                    id="emotionalRegulationNotes"
                    {...register("emotionalRegulationNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Empathy */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Empathy</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="empathyRating"
                  error={errors.empathyRating as any}
                >
                  <select
                    id="empathyRating"
                    {...register("empathyRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.empathyRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Emerging</option>
                    <option value="2">2 = Developing</option>
                    <option value="3">3 = Proficient</option>
                    <option value="4">4 = Advanced</option>
                    <option value="5">5 = Exemplary</option>
                  </select>
                </FormField>
                <FormField label="Notes / Evidence" htmlFor="empathyNotes">
                  <Textarea
                    rows={3}
                    id="empathyNotes"
                    {...register("empathyNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Adaptability / Flexibility */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Adaptability / Flexibility</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="adaptabilityRating"
                  error={errors.adaptabilityRating as any}
                >
                  <select
                    id="adaptabilityRating"
                    {...register("adaptabilityRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.adaptabilityRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Emerging</option>
                    <option value="2">2 = Developing</option>
                    <option value="3">3 = Proficient</option>
                    <option value="4">4 = Advanced</option>
                    <option value="5">5 = Exemplary</option>
                  </select>
                </FormField>
                <FormField label="Notes / Evidence" htmlFor="adaptabilityNotes">
                  <Textarea
                    rows={3}
                    id="adaptabilityNotes"
                    {...register("adaptabilityNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Initiative */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Initiative</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Rating (1-5)"
                  htmlFor="initiativeRating"
                  error={errors.initiativeRating as any}
                >
                  <select
                    id="initiativeRating"
                    {...register("initiativeRating")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.initiativeRating ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Emerging</option>
                    <option value="2">2 = Developing</option>
                    <option value="3">3 = Proficient</option>
                    <option value="4">4 = Advanced</option>
                    <option value="5">5 = Exemplary</option>
                  </select>
                </FormField>
                <FormField label="Notes / Evidence" htmlFor="initiativeNotes">
                  <Textarea
                    rows={3}
                    id="initiativeNotes"
                    {...register("initiativeNotes")}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </section>

        {/* Meta Learning Skill Alignment */}
        <section className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Meta Learning Skill Alignment"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>
              <strong>Instructions:</strong> Check all skills clearly demonstrated during peer interactions. Add relevant behaviour notes.
            </p>
          </div>

          <div className="space-y-4">
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
                <FormField label="Behaviour Notes" htmlFor="curiosityNotes">
                  <Textarea
                    rows={3}
                    id="curiosityNotes"
                    {...register("curiosityNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Confidence / Autonomy */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Confidence / Autonomy</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Observed?" htmlFor="confidenceObserved">
                  <div className="flex gap-4">
                    <Controller
                      name="confidenceObserved"
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
                <FormField label="Behaviour Notes" htmlFor="confidenceNotes">
                  <Textarea
                    rows={3}
                    id="confidenceNotes"
                    {...register("confidenceNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Self-Regulation */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Self-Regulation</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Observed?" htmlFor="selfRegulationObserved">
                  <div className="flex gap-4">
                    <Controller
                      name="selfRegulationObserved"
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
                <FormField label="Behaviour Notes" htmlFor="selfRegulationNotes">
                  <Textarea
                    rows={3}
                    id="selfRegulationNotes"
                    {...register("selfRegulationNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Collaboration */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Collaboration</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Observed?" htmlFor="collaborationObserved">
                  <div className="flex gap-4">
                    <Controller
                      name="collaborationObserved"
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
                <FormField label="Behaviour Notes" htmlFor="collaborationObservedNotes">
                  <Textarea
                    rows={3}
                    id="collaborationObservedNotes"
                    {...register("collaborationObservedNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Emotional Awareness */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Emotional Awareness</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Observed?" htmlFor="emotionalAwarenessObserved">
                  <div className="flex gap-4">
                    <Controller
                      name="emotionalAwarenessObserved"
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
                <FormField label="Behaviour Notes" htmlFor="emotionalAwarenessNotes">
                  <Textarea
                    rows={3}
                    id="emotionalAwarenessNotes"
                    {...register("emotionalAwarenessNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Leadership */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Leadership</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Observed?" htmlFor="leadershipObserved">
                  <div className="flex gap-4">
                    <Controller
                      name="leadershipObserved"
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
                <FormField label="Behaviour Notes" htmlFor="leadershipObservedNotes">
                  <Textarea
                    rows={3}
                    id="leadershipObservedNotes"
                    {...register("leadershipObservedNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Problem-Solving */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Problem-Solving</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Observed?" htmlFor="problemSolvingObserved">
                  <div className="flex gap-4">
                    <Controller
                      name="problemSolvingObserved"
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
                <FormField label="Behaviour Notes" htmlFor="problemSolvingNotes">
                  <Textarea
                    rows={3}
                    id="problemSolvingNotes"
                    {...register("problemSolvingNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Perspective-Taking */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Perspective-Taking</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Observed?" htmlFor="perspectiveTakingObserved">
                  <div className="flex gap-4">
                    <Controller
                      name="perspectiveTakingObserved"
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
                <FormField label="Behaviour Notes" htmlFor="perspectiveTakingNotes">
                  <Textarea
                    rows={3}
                    id="perspectiveTakingNotes"
                    {...register("perspectiveTakingNotes")}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Preference & Intelligence Inference */}
        <section className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Learning Preference & Intelligence Inference"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>
              <strong>Instructions:</strong> Use ✓ for observed, + for strongly evident. Add supporting examples where possible.
            </p>
          </div>

          <div className="space-y-4">
            {/* Linguistic (Word-Smart) */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Linguistic (Word-Smart)</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Mark (✓ / +)" htmlFor="linguisticObserved">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("linguisticObserved", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">✓ Observed</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("linguisticStronglyEvident", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">+ Strongly Evident</span>
                    </label>
                  </div>
                </FormField>
                <FormField label="Supporting Behaviour / Task Observed" htmlFor="linguisticNotes">
                  <Textarea
                    rows={3}
                    id="linguisticNotes"
                    {...register("linguisticNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Logical-Mathematical */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Logical-Mathematical</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Mark (✓ / +)" htmlFor="logicalMathematicalObserved">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("logicalMathematicalObserved", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">✓ Observed</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("logicalMathematicalStronglyEvident", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">+ Strongly Evident</span>
                    </label>
                  </div>
                </FormField>
                <FormField label="Supporting Behaviour / Task Observed" htmlFor="logicalMathematicalNotes">
                  <Textarea
                    rows={3}
                    id="logicalMathematicalNotes"
                    {...register("logicalMathematicalNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Spatial (Visual-Spatial) */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Spatial (Visual-Spatial)</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Mark (✓ / +)" htmlFor="spatialObserved">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("spatialObserved", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">✓ Observed</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("spatialStronglyEvident", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">+ Strongly Evident</span>
                    </label>
                  </div>
                </FormField>
                <FormField label="Supporting Behaviour / Task Observed" htmlFor="spatialNotes">
                  <Textarea
                    rows={3}
                    id="spatialNotes"
                    {...register("spatialNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Bodily-Kinesthetic */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Bodily-Kinesthetic</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Mark (✓ / +)" htmlFor="bodilyKinestheticObserved">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("bodilyKinestheticObserved", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">✓ Observed</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("bodilyKinestheticStronglyEvident", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">+ Strongly Evident</span>
                    </label>
                  </div>
                </FormField>
                <FormField label="Supporting Behaviour / Task Observed" htmlFor="bodilyKinestheticNotes">
                  <Textarea
                    rows={3}
                    id="bodilyKinestheticNotes"
                    {...register("bodilyKinestheticNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Musical (Rhythmic) */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Musical (Rhythmic)</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Mark (✓ / +)" htmlFor="musicalObserved">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("musicalObserved", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">✓ Observed</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("musicalStronglyEvident", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">+ Strongly Evident</span>
                    </label>
                  </div>
                </FormField>
                <FormField label="Supporting Behaviour / Task Observed" htmlFor="musicalNotes">
                  <Textarea
                    rows={3}
                    id="musicalNotes"
                    {...register("musicalNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Interpersonal (Social) */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Interpersonal (Social)</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Mark (✓ / +)" htmlFor="interpersonalObserved">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("interpersonalObserved", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">✓ Observed</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("interpersonalStronglyEvident", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">+ Strongly Evident</span>
                    </label>
                  </div>
                </FormField>
                <FormField label="Supporting Behaviour / Task Observed" htmlFor="interpersonalNotes">
                  <Textarea
                    rows={3}
                    id="interpersonalNotes"
                    {...register("interpersonalNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Intrapersonal (Reflective) */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Intrapersonal (Reflective)</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Mark (✓ / +)" htmlFor="intrapersonalObserved">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("intrapersonalObserved", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">✓ Observed</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("intrapersonalStronglyEvident", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">+ Strongly Evident</span>
                    </label>
                  </div>
                </FormField>
                <FormField label="Supporting Behaviour / Task Observed" htmlFor="intrapersonalNotes">
                  <Textarea
                    rows={3}
                    id="intrapersonalNotes"
                    {...register("intrapersonalNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Naturalistic (Nature-Oriented) */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Naturalistic (Nature-Oriented)</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Mark (✓ / +)" htmlFor="naturalisticObserved">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("naturalisticObserved", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">✓ Observed</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("naturalisticStronglyEvident", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">+ Strongly Evident</span>
                    </label>
                  </div>
                </FormField>
                <FormField label="Supporting Behaviour / Task Observed" htmlFor="naturalisticNotes">
                  <Textarea
                    rows={3}
                    id="naturalisticNotes"
                    {...register("naturalisticNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Existential (Deep Thinker) */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Existential (Deep Thinker)</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Mark (✓ / +)" htmlFor="existentialObserved">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("existentialObserved", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">✓ Observed</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("existentialStronglyEvident", {
                          setValueAs: (value) => value === "on" || value === true
                        })}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                      />
                      <span className="text-slate-700">+ Strongly Evident</span>
                    </label>
                  </div>
                </FormField>
                <FormField label="Supporting Behaviour / Task Observed" htmlFor="existentialNotes">
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

        {/* Learning Style Clues, Social Role Tendency */}
        <section className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Learning Style Clues, Social Role Tendency, and Summary Reflections"
            bgClassName="bg-teal-700"
          />
          
          {/* Learning Style Clues */}
          <div className="mt-6">
            <div className="text-lg font-semibold text-slate-900 mb-3">Learning Style Clues</div>
            <div className="text-slate-700 mb-4">
              <p><strong>Instructions:</strong> Check if a style was clearly preferred or demonstrated.</p>
            </div>
            
            <div className="space-y-4">
              {/* Visual */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="font-medium text-slate-900 mb-2">Visual</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Observed?" htmlFor="visualObserved">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          {...register("visualObserved", {
                            setValueAs: (value) => value === "on" || value === true
                          })}
                          className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <span className="text-slate-700">Yes</span>
                      </label>
                    </div>
                  </FormField>
                  <FormField label="Notes / Example Behaviour" htmlFor="visualNotes">
                    <Textarea
                      rows={3}
                      id="visualNotes"
                      {...register("visualNotes")}
                    />
                  </FormField>
                </div>
              </div>

              {/* Auditory */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="font-medium text-slate-900 mb-2">Auditory</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Observed?" htmlFor="auditoryObserved">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          {...register("auditoryObserved", {
                            setValueAs: (value) => value === "on" || value === true
                          })}
                          className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <span className="text-slate-700">Yes</span>
                      </label>
                    </div>
                  </FormField>
                  <FormField label="Notes / Example Behaviour" htmlFor="auditoryNotes">
                    <Textarea
                      rows={3}
                      id="auditoryNotes"
                      {...register("auditoryNotes")}
                    />
                  </FormField>
                </div>
              </div>

              {/* Kinesthetic */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="font-medium text-slate-900 mb-2">Kinesthetic</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Observed?" htmlFor="kinestheticObserved">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          {...register("kinestheticObserved", {
                            setValueAs: (value) => value === "on" || value === true
                          })}
                          className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <span className="text-slate-700">Yes</span>
                      </label>
                    </div>
                  </FormField>
                  <FormField label="Notes / Example Behaviour" htmlFor="kinestheticNotes">
                    <Textarea
                      rows={3}
                      id="kinestheticNotes"
                      {...register("kinestheticNotes")}
                    />
                  </FormField>
                </div>
              </div>

              {/* Verbal */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="font-medium text-slate-900 mb-2">Verbal</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Observed?" htmlFor="verbalObserved">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          {...register("verbalObserved", {
                            setValueAs: (value) => value === "on" || value === true
                          })}
                          className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <span className="text-slate-700">Yes</span>
                      </label>
                    </div>
                  </FormField>
                  <FormField label="Notes / Example Behaviour" htmlFor="verbalNotes">
                    <Textarea
                      rows={3}
                      id="verbalNotes"
                      {...register("verbalNotes")}
                    />
                  </FormField>
                </div>
              </div>

              {/* Social */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="font-medium text-slate-900 mb-2">Social</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Observed?" htmlFor="socialObserved">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          {...register("socialObserved", {
                            setValueAs: (value) => value === "on" || value === true
                          })}
                          className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <span className="text-slate-700">Yes</span>
                      </label>
                    </div>
                  </FormField>
                  <FormField label="Notes / Example Behaviour" htmlFor="socialNotes">
                    <Textarea
                      rows={3}
                      id="socialNotes"
                      {...register("socialNotes")}
                    />
                  </FormField>
                </div>
              </div>

              {/* Solitary */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="font-medium text-slate-900 mb-2">Solitary</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Observed?" htmlFor="solitaryObserved">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          {...register("solitaryObserved", {
                            setValueAs: (value) => value === "on" || value === true
                          })}
                          className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <span className="text-slate-700">Yes</span>
                      </label>
                    </div>
                  </FormField>
                  <FormField label="Notes / Example Behaviour" htmlFor="solitaryNotes">
                    <Textarea
                      rows={3}
                      id="solitaryNotes"
                      {...register("solitaryNotes")}
                    />
                  </FormField>
                </div>
              </div>
            </div>
          </div>

          {/* Social Role Tendency */}
          <div className="mt-8">
            <div className="text-lg font-semibold text-slate-900 mb-3">Social Role Tendency</div>
            <div className="text-slate-700 mb-4">
              <p><strong>Instructions:</strong> Check the role that best describes the child's consistent peer interaction style:</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormField label="Leader" htmlFor="leaderRole">
                <input
                  type="checkbox"
                  {...register("leaderRole", {
                    setValueAs: (value) => value === "on" || value === true
                  })}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
              </FormField>
              <FormField label="Withdrawn" htmlFor="withdrawnRole">
                <input
                  type="checkbox"
                  {...register("withdrawnRole", {
                    setValueAs: (value) => value === "on" || value === true
                  })}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
              </FormField>
              <FormField label="Problem-Solver" htmlFor="problemSolverRole">
                <input
                  type="checkbox"
                  {...register("problemSolverRole", {
                    setValueAs: (value) => value === "on" || value === true
                  })}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
              </FormField>
              <FormField label="Follower" htmlFor="followerRole">
                <input
                  type="checkbox"
                  {...register("followerRole", {
                    setValueAs: (value) => value === "on" || value === true
                  })}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
              </FormField>
              <FormField label="Initiator" htmlFor="initiatorRole">
                <input
                  type="checkbox"
                  {...register("initiatorRole", {
                    setValueAs: (value) => value === "on" || value === true
                  })}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
              </FormField>
              <FormField label="Bridger" htmlFor="bridgerRole">
                <input
                  type="checkbox"
                  {...register("bridgerRole", {
                    setValueAs: (value) => value === "on" || value === true
                  })}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
              </FormField>
              <FormField label="Observer" htmlFor="observerRole">
                <input
                  type="checkbox"
                  {...register("observerRole", {
                    setValueAs: (value) => value === "on" || value === true
                  })}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
              </FormField>
              <FormField label="Supporter" htmlFor="supporterRole">
                <input
                  type="checkbox"
                  {...register("supporterRole", {
                    setValueAs: (value) => value === "on" || value === true
                  })}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
              </FormField>
              <FormField label="Challenger" htmlFor="challengerRole">
                <input
                  type="checkbox"
                  {...register("challengerRole", {
                    setValueAs: (value) => value === "on" || value === true
                  })}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
              </FormField>
              <FormField label="Mediator" htmlFor="mediatorRole">
                <input
                  type="checkbox"
                  {...register("mediatorRole", {
                    setValueAs: (value) => value === "on" || value === true
                  })}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
              </FormField>
            </div>
          </div>
        </section>

        {/* Summary Reflections */}
        <section className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <FormSectionHeader
            title="Summary Reflections"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 space-y-4">
            <FormField label="Notable strengths shown:" htmlFor="notableStrengths">
              <Textarea
                rows={4}
                id="notableStrengths"
                {...register("notableStrengths")}
              />
            </FormField>
            <FormField label="Areas of concern or flag indicators:" htmlFor="areasOfConcern">
              <Textarea
                rows={4}
                id="areasOfConcern"
                {...register("areasOfConcern")}
              />
            </FormField>
            <FormField label="Situations child thrived in:" htmlFor="situationsChildThrived">
              <Textarea
                rows={4}
                id="situationsChildThrived"
                {...register("situationsChildThrived")}
              />
            </FormField>
            <FormField label="Situations that were challenging:" htmlFor="situationsChallenging">
              <Textarea
                rows={4}
                id="situationsChallenging"
                {...register("situationsChallenging")}
              />
            </FormField>
            <FormField label="Suggested follow-up or scaffolding needs:" htmlFor="suggestedFollowUp">
              <Textarea
                rows={4}
                id="suggestedFollowUp"
                {...register("suggestedFollowUp")}
              />
            </FormField>
            <FormField label="Any observed caregiver interaction during this session (if applicable):" htmlFor="caregiverInteraction">
              <Textarea
                rows={4}
                id="caregiverInteraction"
                {...register("caregiverInteraction")}
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
            {saving ? "Saving..." : "Save Peer Dynamic Observation"}
          </button>
        </div>
      </form>
    </div>
  );
}
