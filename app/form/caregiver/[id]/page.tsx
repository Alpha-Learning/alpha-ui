"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, type UseFormRegister, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  FormField,
  Input,
  Textarea,
  FormSectionHeader,
} from "@/app/components/forms/FormField";
import { apiService } from "@/app/utils";
import { getAutofillData } from "@/app/utils/autofillData";
import { useFormPersistence } from "@/app/hooks/useFormPersistence";
import { useAutoSave } from '@/app/hooks/useAutoSave';

const caregiverFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  childName: z.string().min(1, "Child's name is required"),
  date: z.string().min(1, "Date is required"),
  careDuration: z.string().min(1, "Care duration is required"),
  regularActivities: z.string().min(1, "Regular activities description is required"),
  behaviorWithoutParent: z.string().min(1, "Behavior without parent is required"),
  toysGamesTasksEnjoyed: z.string().min(1, "Toys/games/tasks enjoyed is required"),
  preferences: z.string().min(1, "Preferences description is required"),
  responseToDifficulties: z.string().min(1, "Response to difficulties is required"),
  engagementWithChosenActivity: z.string().min(1, "Engagement with chosen activity is required"),
  engagementWithAssignedActivity: z.string().min(1, "Engagement with assigned activity is required"),
  interactionWithChildren: z.string().min(1, "Interaction with children is required"),
  seekingHelpComfort: z.string().min(1, "Seeking help/comfort is required"),
  emotionalRegulationStrategies: z.string().min(1, "Emotional regulation strategies is required"),
  emotionalStrengthsVulnerabilities: z.string().min(1, "Emotional strengths/vulnerabilities is required"),
  applicationNumber: z.string().optional(),
  loggedToSystemDate: z.string().optional(),
  loggedBy: z.string().optional(),
});

type CaregiverFormData = z.infer<typeof caregiverFormSchema>;

export default function CaregiverPublicFormPage() {
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
  } = useForm<CaregiverFormData>({
    resolver: zodResolver(caregiverFormSchema),
    defaultValues: {
      fullName: "",
      childName: "",
      date: "",
      careDuration: "",
      regularActivities: "",
      behaviorWithoutParent: "",
      toysGamesTasksEnjoyed: "",
      preferences: "",
      responseToDifficulties: "",
      engagementWithChosenActivity: "",
      engagementWithAssignedActivity: "",
      interactionWithChildren: "",
      seekingHelpComfort: "",
      emotionalRegulationStrategies: "",
      emotionalStrengthsVulnerabilities: "",
      applicationNumber: "",
      loggedToSystemDate: "",
      loggedBy: "",
    },
  });

  // Form persistence - saves to localStorage and restores on load
  const { clearStorage } = useFormPersistence(
    watch,
    setValue,
    'caregiver',
    params.id as string
  );

  useAutoSave(watch, {
  saveEndpoint: '/api/admin/caregiver-form',
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
      const res = await apiService.get(`/api/admin/caregiver-form?applicationId=${appId}`);
      const appRes = await apiService.getApplicationData(appId);

      if (res.success && res.data) {
        const data = res.data;
        reset({
          fullName: data.fullName || "",
          childName: data.childName || "",
          date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
          careDuration: data.careDuration || "",
          regularActivities: data.regularActivities || "",
          behaviorWithoutParent: data.behaviorWithoutParent || "",
          toysGamesTasksEnjoyed: data.toysGamesTasksEnjoyed || "",
          preferences: data.preferences || "",
          responseToDifficulties: data.responseToDifficulties || "",
          engagementWithChosenActivity: data.engagementWithChosenActivity || "",
          engagementWithAssignedActivity: data.engagementWithAssignedActivity || "",
          interactionWithChildren: data.interactionWithChildren || "",
          seekingHelpComfort: data.seekingHelpComfort || "",
          emotionalRegulationStrategies: data.emotionalRegulationStrategies || "",
          emotionalStrengthsVulnerabilities: data.emotionalStrengthsVulnerabilities || "",
          applicationNumber: data.applicationNumber || "",
          loggedToSystemDate: data.loggedToSystemDate || "",
          loggedBy: data.loggedBy || "",
        });
      } else if (appRes.success && appRes.data) {
        const appData = appRes.data;
        reset({
          fullName: appData.caregiverFullName || "",
          childName: appData.childFullName || "",
          date: new Date().toISOString().split("T")[0],
          careDuration: "",
          regularActivities: "",
          behaviorWithoutParent: "",
          toysGamesTasksEnjoyed: "",
          preferences: "",
          responseToDifficulties: "",
          engagementWithChosenActivity: "",
          engagementWithAssignedActivity: "",
          interactionWithChildren: "",
          seekingHelpComfort: "",
          emotionalRegulationStrategies: "",
          emotionalStrengthsVulnerabilities: "",
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
    const autofillData = getAutofillData('caregiver');
    const currentValues = watch();
    
    // Preserve personal information fields
    const personalInfoFields = ['fullName', 'childName', 'date'];
    const preservedValues: Partial<CaregiverFormData> = {};
    personalInfoFields.forEach(field => {
      const fieldKey = field as keyof CaregiverFormData;
      if (currentValues[fieldKey]) {
        preservedValues[fieldKey] = currentValues[fieldKey] as any;
      }
    });

    // Apply autofill data while preserving personal info
    Object.keys(autofillData).forEach((key) => {
      if (!personalInfoFields.includes(key)) {
        setValue(key as keyof CaregiverFormData, autofillData[key as keyof typeof autofillData] as any);
      }
    });

    // Restore preserved personal info
    Object.keys(preservedValues).forEach((key) => {
      setValue(key as keyof CaregiverFormData, preservedValues[key as keyof CaregiverFormData] as any);
    });

    setMessage({ type: "success", text: "Form autofilled successfully (personal information preserved)" });
  };

  const onSubmit = async (data: CaregiverFormData) => {
    try {
      setSaving(true);
      setMessage(null);
      const res = await apiService.post("/api/admin/caregiver-form", {
        applicationId: params.id,
         isDraft: false,
        ...data,
      });
      if (res.success) {
        // Clear localStorage after successful save
        clearStorage();
        // Redirect to success page
        router.push(
          `/form/questionnaire-success?type=caregiver&applicationId=${params.id}`
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
        text: error.message || "Failed to submit questionnaire",
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
                  Caregiver/Nanny Questionnaire
                </div>
                <div className="text-sm text-slate-600">Application ID: {params.id}</div>
                <div className="text-xs text-slate-500 italic">
                  To be completed by the person most frequently caring for the child outside parents.
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
                  </div>
                </section>

                <section>
                  <FormSectionHeader
                    title="Daily Care Context"
                    bgClassName="bg-teal-700"
                  />
                  <div className="mt-3 space-y-6">
                    <FormTextArea
                      label="1. How long have you cared for this child?"
                      name="careDuration"
                      register={register}
                      errors={errors}
                    />
                    <FormTextArea
                      label="2. What activities do you regularly do with them?"
                      name="regularActivities"
                      register={register}
                      errors={errors}
                    />
                    <FormTextArea
                      label="3. How does the child behave when the parent is not present?"
                      name="behaviorWithoutParent"
                      register={register}
                      errors={errors}
                    />
                  </div>
                </section>
              </div>

              <div className="space-y-8 lg:pl-4">
                <section>
                  <FormSectionHeader
                    title="Learning and Play Behaviour"
                    bgClassName="bg-teal-700"
                  />
                  <div className="mt-3 space-y-6">
                    <FormTextArea
                      label="1. What types of toys, games, or tasks does the child enjoy?"
                      name="toysGamesTasksEnjoyed"
                      register={register}
                      errors={errors}
                    />
                    <FormTextArea
                      label="2. Have you noticed any preferences (e.g., being active, drawing, reading)?"
                      name="preferences"
                      register={register}
                      errors={errors}
                      rows={7}
                    />
                    <FormTextArea
                      label="3. How does the child respond when they encounter something difficult?"
                      name="responseToDifficulties"
                      register={register}
                      errors={errors}
                      rows={7}
                    />
                    <FormTextArea
                      label="4. How long does the child engage with an activity of their choice?"
                      name="engagementWithChosenActivity"
                      register={register}
                      errors={errors}
                      rows={7}
                    />
                    <FormTextArea
                      label="5. How long does the child engage with an activity of your choice?"
                      name="engagementWithAssignedActivity"
                      register={register}
                      errors={errors}
                      rows={7}
                    />
                  </div>
                </section>
              </div>
            </div>

            <div className="space-y-8 mt-8">
              <section>
                <FormSectionHeader
                  title="Social & Emotional Response"
                  bgClassName="bg-teal-700"
                />
                <div className="mt-3 space-y-6">
                  <FormTextArea
                    label="1. How does the child interact with other children?"
                    name="interactionWithChildren"
                    register={register}
                    errors={errors}
                  />
                  <FormTextArea
                    label="2. How does the child seek help or comfort when upset or unsure?"
                    name="seekingHelpComfort"
                    register={register}
                    errors={errors}
                    rows={6}
                  />
                  <FormTextArea
                    label="3. What emotional regulation strategies work best?"
                    name="emotionalRegulationStrategies"
                    register={register}
                    errors={errors}
                    rows={6}
                  />
                  <FormTextArea
                    label="4. What emotional strengths or areas of vulnerability have you noticed in this child?"
                    name="emotionalStrengthsVulnerabilities"
                    register={register}
                    errors={errors}
                    rows={7}
                  />
                </div>
              </section>
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

            <div className="flex items-center justify-end gap-3">
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
  name: keyof CaregiverFormData;
  register: UseFormRegister<CaregiverFormData>;
  errors: FieldErrors<CaregiverFormData>;
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


