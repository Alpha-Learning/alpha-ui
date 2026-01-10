"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, type UseFormRegister, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormField,
  Input,
  Textarea,
  FormSectionHeader,
} from "@/app/components/forms/FormField";
import { apiService } from "@/app/utils";
import { getAutofillData } from "@/app/utils/autofillData";
import { useFormPersistence } from "@/app/hooks/useFormPersistence";
import {
  parentGuardianQuestionnaireSchema,
  ParentGuardianQuestionnaireFormData,
} from "@/app/lib/validations/parent-guardian-questionnaire";
import { useAutoSave } from '@/app/hooks/useAutoSave';


export default function ParentGuardianPublicFormPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ParentGuardianQuestionnaireFormData>({
    resolver: zodResolver(parentGuardianQuestionnaireSchema),
    defaultValues: {
      fullName: "",
      childName: "",
      date: "",
      parentOccupation: "",
      typicalWeekday: "",
      screenTimeHours: "",
      homeActivities: "",
      culturalBackground: "",
      rulesDisciplineApproach: "",
      supportWhenStruggling: "",
      strengthsInterests: "",
      challengingAreas: "",
      learningApproach: "",
      previousEducationalExperience: "",
      covidLearningExperience: "",
      supportiveLearningEnvironment: "",
      responseToFrustration: "",
      peerInteraction: "",
      emotionalBehavioralConcerns: "",
      seekingHelp: "",
      educationalHopesGoals: "",
      creativityMovementEmotionalRole: "",
      parentingStyle: "",
      technologyConcerns: "",
      applicationNumber: "",
      loggedToSystemDate: "",
      loggedBy: "",
    },
  });

  // Form persistence - saves to localStorage and restores on load
  const { clearStorage } = useFormPersistence(
    watch,
    setValue,
    'parent-guardian',
    params.id as string
  );

useAutoSave(watch, {
  saveEndpoint: '/api/admin/parent-guardian-form',
  applicationId: params.id as string,
  debounceMs: 2000,
  intervalMs: 30000,
});

  useEffect(() => {
    loadFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const loadFormData = async () => {
    try {
      setLoading(true);
      const appId = params.id;

      const res = await apiService.get(
        `/api/admin/parent-guardian-form?applicationId=${appId}`
      );
      const appRes = await apiService.getApplicationData(appId);

      if (res.success && res.data) {
        const data = res.data;
        reset({
          fullName: data.fullName || "",
          childName: data.childName || "",
          date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
          parentOccupation: data.parentOccupation || "",
          typicalWeekday: data.typicalWeekday || "",
          screenTimeHours: data.screenTimeHours || "",
          homeActivities: data.homeActivities || "",
          culturalBackground: data.culturalBackground || "",
          rulesDisciplineApproach: data.rulesDisciplineApproach || "",
          supportWhenStruggling: data.supportWhenStruggling || "",
          strengthsInterests: data.strengthsInterests || "",
          challengingAreas: data.challengingAreas || "",
          learningApproach: data.learningApproach || "",
          previousEducationalExperience: data.previousEducationalExperience || "",
          covidLearningExperience: data.covidLearningExperience || "",
          supportiveLearningEnvironment: data.supportiveLearningEnvironment || "",
          responseToFrustration: data.responseToFrustration || "",
          peerInteraction: data.peerInteraction || "",
          emotionalBehavioralConcerns: data.emotionalBehavioralConcerns || "",
          seekingHelp: data.seekingHelp || "",
          educationalHopesGoals: data.educationalHopesGoals || "",
          creativityMovementEmotionalRole: data.creativityMovementEmotionalRole || "",
          parentingStyle: data.parentingStyle || "",
          technologyConcerns: data.technologyConcerns || "",
          applicationNumber: data.applicationNumber || "",
          loggedToSystemDate: data.loggedToSystemDate || "",
          loggedBy: data.loggedBy || "",
        });
      } else if (appRes.success && appRes.data) {
        const appData = appRes.data;
        reset({
          fullName: appData.parentFullName || "",
          childName: appData.childFullName || "",
          date: new Date().toISOString().split("T")[0],
          parentOccupation: "",
          typicalWeekday: "",
          screenTimeHours: "",
          homeActivities: "",
          culturalBackground: "",
          rulesDisciplineApproach: "",
          supportWhenStruggling: "",
          strengthsInterests: "",
          challengingAreas: "",
          learningApproach: "",
          previousEducationalExperience: "",
          covidLearningExperience: "",
          supportiveLearningEnvironment: "",
          responseToFrustration: "",
          peerInteraction: "",
          emotionalBehavioralConcerns: "",
          seekingHelp: "",
          educationalHopesGoals: "",
          creativityMovementEmotionalRole: "",
          parentingStyle: "",
          technologyConcerns: "",
          applicationNumber: appId,
          loggedToSystemDate: "",
          loggedBy: "",
        });
      }
    } catch (error) {
      console.error("Error loading form data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAutofill = () => {
    const autofillData = getAutofillData('parentGuardian');
    const currentValues = watch();
    
    // Preserve personal information fields
    const personalInfoFields = ['fullName', 'childName', 'date'];
    const preservedValues: Partial<ParentGuardianQuestionnaireFormData> = {};
    personalInfoFields.forEach(field => {
      const fieldKey = field as keyof ParentGuardianQuestionnaireFormData;
      if (currentValues[fieldKey]) {
        preservedValues[fieldKey] = currentValues[fieldKey] as any;
      }
    });

    // Apply autofill data while preserving personal info
    Object.keys(autofillData).forEach((key) => {
      if (!personalInfoFields.includes(key)) {
        setValue(key as keyof ParentGuardianQuestionnaireFormData, autofillData[key as keyof typeof autofillData] as any);
      }
    });

    // Restore preserved personal info
    Object.keys(preservedValues).forEach((key) => {
      setValue(key as keyof ParentGuardianQuestionnaireFormData, preservedValues[key as keyof ParentGuardianQuestionnaireFormData] as any);
    });

    setMessage({ type: "success", text: "Form autofilled successfully (personal information preserved)" });
  };


  const onSubmit = async (data: ParentGuardianQuestionnaireFormData) => {
    try {
      console.log("data",data);
      setSaving(true);
      setMessage(null);
      const res = await apiService.post("/api/admin/parent-guardian-form", {
        applicationId: params.id,
         isDraft: false,
        ...data,
      });
      if (res.success) {
        // Clear localStorage after successful save
        clearStorage();
        // Redirect to success page
        router.push(
          `/form/questionnaire-success?type=parent-guardian&applicationId=${params.id}`
        );
      } else {
        setMessage({
          type: "error",
          text: res.message || "Failed to submit questionnaire",
        });
      }
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to submit form",
      });
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
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xl font-bold text-slate-900">
                  Parent/Guardian Questionnaire
                </div>
                <div className="text-sm text-slate-600">
                  Application ID: {params.id}
                </div>
                <div className="text-xs text-slate-500">
                  Version v1.0 | Reviewed AUG 2025
                </div>
              </div>
              <button
                type="button"
                onClick={handleAutofill}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Autofill Form
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-8">
                <section>
                  <FormSectionHeader
                    title="General Information"
                    bgClassName="bg-teal-700"
                  />
                  <div className="mt-3 grid grid-cols-1 gap-4">
                    <FormField label="Full Name" htmlFor="fullName">
                      <Input
                        id="fullName"
                        {...register("fullName")}
                        className={errors.fullName ? "border-red-500" : ""}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </FormField>
                    <FormField label="Child's Name" htmlFor="childName">
                      <Input
                        id="childName"
                        {...register("childName")}
                        className={errors.childName ? "border-red-500" : ""}
                      />
                      {errors.childName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.childName.message}
                        </p>
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
                        <p className="text-red-500 text-sm mt-1">
                          {errors.date.message}
                        </p>
                      )}
                    </FormField>
                    <FormField label="Parent Occupation" htmlFor="parentOccupation">
                      <Input id="parentOccupation" {...register("parentOccupation")} />
                    </FormField>
                  </div>
                </section>

                <section>
                  <FormSectionHeader
                    title="Family Environment & Routine"
                    bgClassName="bg-teal-700"
                  />
                  <div className="mt-3 space-y-6">
                    <FormTextArea
                      label="1. Describe a typical weekday for your child (wake time, school, meals, play, bedtime):"
                      name="typicalWeekday"
                      register={register}
                      errors={errors}
                    />
                    <FormTextArea
                      label="2. How many hours per day does your child engage with screens (TV, tablet, phone)?"
                      name="screenTimeHours"
                      register={register}
                      errors={errors}
                      rows={4}
                    />
                    <FormTextArea
                      label="3. What activities does your child most enjoy at home?"
                      name="homeActivities"
                      register={register}
                      errors={errors}
                      rows={5}
                    />
                    <FormTextArea
                      label="4. What is your family's cultural background and how does it influence learning?"
                      name="culturalBackground"
                      register={register}
                      errors={errors}
                      rows={5}
                    />
                  </div>
                </section>

                <section>
                  <div className="space-y-6">
                    <FormTextArea
                      label="5. What's your typical approach to rules, discipline, and independence at home?"
                      name="rulesDisciplineApproach"
                      register={register}
                      errors={errors}
                      rows={5}
                    />
                    <FormTextArea
                      label="6. How do you usually support your child when they're struggling or make a mistake?"
                      name="supportWhenStruggling"
                      register={register}
                      errors={errors}
                      rows={6}
                    />
                  </div>
                </section>

                <section>
                  <FormSectionHeader
                    title="Emotional and Social Awareness"
                    bgClassName="bg-teal-700"
                  />
                  <div className="mt-3 space-y-6">
                    <FormTextArea
                      label="1. How does your child typically respond to frustration or difficulty?"
                      name="responseToFrustration"
                      register={register}
                      errors={errors}
                    />
                    <FormTextArea
                      label="2. How does your child interact with peers?"
                      name="peerInteraction"
                      register={register}
                      errors={errors}
                    />
                    <FormTextArea
                      label="3. Are there any emotional or behavioural concerns you'd like us to be aware of?"
                      name="emotionalBehavioralConcerns"
                      register={register}
                      errors={errors}
                    />
                    <FormTextArea
                      label="4. How does your child seek help when needed?"
                      name="seekingHelp"
                      register={register}
                      errors={errors}
                    />
                  </div>
                </section>
              </div>

              <div className="space-y-8 lg:pl-4">
                <section>
                  <FormSectionHeader
                    title="Learning and Development"
                    bgClassName="bg-teal-700"
                  />
                  <div className="mt-3 space-y-6">
                    <FormTextArea
                      label="1. What are your child's observed strengths and interests?"
                      name="strengthsInterests"
                      register={register}
                      errors={errors}
                    />
                    <FormTextArea
                      label="2. Are there any areas you feel your child finds challenging?"
                      name="challengingAreas"
                      register={register}
                      errors={errors}
                    />
                    <FormTextArea
                      label="3. How would you describe your child's approach to learning new tasks?"
                      name="learningApproach"
                      register={register}
                      errors={errors}
                    />
                    <FormTextArea
                      label="4. What previous educational experiences has your child had?"
                      name="previousEducationalExperience"
                      register={register}
                      errors={errors}
                    />
                  </div>
                </section>

                <section>
                  <div className="space-y-6">
                    <FormTextArea
                      label="5. What was your child's learning experience during Covid?"
                      name="covidLearningExperience"
                      register={register}
                      errors={errors}
                    />
                    <FormTextArea
                      label="6. What does a supportive learning environment look like to you at home?"
                      name="supportiveLearningEnvironment"
                      register={register}
                      errors={errors}
                    />
                  </div>
                </section>

                <section>
                  <FormSectionHeader
                    title="Educational Philosophy"
                    bgClassName="bg-teal-700"
                  />
                  <div className="mt-3 space-y-6">
                    <FormTextArea
                      label="1. What are your hopes and goals for your child's education?"
                      name="educationalHopesGoals"
                      register={register}
                      errors={errors}
                      rows={6}
                    />
                    <FormTextArea
                      label="2. What role do you believe creativity, movement, and emotional development should play?"
                      name="creativityMovementEmotionalRole"
                      register={register}
                      errors={errors}
                      rows={6}
                    />
                    <FormTextArea
                      label="3. How would you describe your parenting style in supporting growth?"
                      name="parentingStyle"
                      register={register}
                      errors={errors}
                      rows={6}
                    />
                    <FormTextArea
                      label="4. What concerns do you have about technology in education?"
                      name="technologyConcerns"
                      register={register}
                      errors={errors}
                      rows={6}
                    />
                  </div>
                </section>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="space-y-8"></div>
              <div className="space-y-8 lg:pl-4"></div>
            </div>

            {message && (
              <div
                className={`p-3 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="flex items-center my-4 justify-end gap-3">
              <button
                type="submit"
                disabled={saving}
                className="[clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)] cursor-pointer py-3 flex justify-between items-center bg-gradient-to-r from-[#8EC0C2] to-[#142954] text-white rounded-lg px-4 hover:brightness-[1.05] active:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Submitting..." : "Submit Form"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function FormTextArea({
  label,
  name,
  register,
  errors,
  rows = 5,
}: {
  label: string;
  name: keyof ParentGuardianQuestionnaireFormData;
  register: UseFormRegister<ParentGuardianQuestionnaireFormData>;
  errors: FieldErrors<ParentGuardianQuestionnaireFormData>;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <Textarea
        rows={rows}
        {...register(name)}
        placeholder=""
        className={errors[name] ? "border-red-500" : ""}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
}


