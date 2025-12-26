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

const outsiderFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  childName: z.string().min(1, "Child's name is required"),
  date: z.string().min(1, "Date is required"),
  relationshipToChild: z.string().min(1, "Relationship to child is required"),
  interactionContext: z.string().min(1, "Interaction context is required"),
  learningTendenciesCuriosity: z.string().min(1, "Learning tendencies/curiosity is required"),
  emotionalTraits: z.string().min(1, "Emotional traits is required"),
  adaptationToChanges: z.string().min(1, "Adaptation to changes is required"),
  communicationSkills: z.string().min(1, "Communication skills is required"),
  groupBehavior: z.string().min(1, "Group behavior is required"),
  concernsNotes: z.string().min(1, "Concerns/notes is required"),
  emotionalStrengthsVulnerabilities: z.string().min(1, "Emotional strengths/vulnerabilities is required"),
  applicationNumber: z.string().optional(),
  loggedToSystemDate: z.string().optional(),
  loggedBy: z.string().optional(),
});

type OutsiderFormData = z.infer<typeof outsiderFormSchema>;

export default function OutsiderPublicFormPage() {
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
  } = useForm<OutsiderFormData>({
    resolver: zodResolver(outsiderFormSchema),
    defaultValues: {
      fullName: "",
      childName: "",
      date: "",
      relationshipToChild: "",
      interactionContext: "",
      learningTendenciesCuriosity: "",
      emotionalTraits: "",
      adaptationToChanges: "",
      communicationSkills: "",
      groupBehavior: "",
      concernsNotes: "",
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
    'outsider',
    params.id as string
  );

  useEffect(() => {
    loadFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const loadFormData = async () => {
    try {
      setLoading(true);
      const appId = params.id;
      const res = await apiService.get(`/api/admin/outsider-form?applicationId=${appId}`);
      const appRes = await apiService.getApplicationData(appId);

      if (res.success && res.data) {
        const data = res.data;
        reset({
          fullName: data.fullName || "",
          childName: data.childName || "",
          date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
          relationshipToChild: data.relationshipToChild || "",
          interactionContext: data.interactionContext || "",
          learningTendenciesCuriosity: data.learningTendenciesCuriosity || "",
          emotionalTraits: data.emotionalTraits || "",
          adaptationToChanges: data.adaptationToChanges || "",
          communicationSkills: data.communicationSkills || "",
          groupBehavior: data.groupBehavior || "",
          concernsNotes: data.concernsNotes || "",
          emotionalStrengthsVulnerabilities: data.emotionalStrengthsVulnerabilities || "",
          applicationNumber: data.applicationNumber || "",
          loggedToSystemDate: data.loggedToSystemDate || "",
          loggedBy: data.loggedBy || "",
        });
      } else if (appRes.success && appRes.data) {
        const appData = appRes.data;
        reset({
          fullName: "",
          childName: appData.childFullName || "",
          date: new Date().toISOString().split("T")[0],
          relationshipToChild: "",
          interactionContext: "",
          learningTendenciesCuriosity: "",
          emotionalTraits: "",
          adaptationToChanges: "",
          communicationSkills: "",
          groupBehavior: "",
          concernsNotes: "",
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
    const autofillData = getAutofillData('outsider');
    const currentValues = watch();
    
    // Preserve personal information fields
    const personalInfoFields = ['fullName', 'childName', 'date'];
    const preservedValues: Partial<OutsiderFormData> = {};
    personalInfoFields.forEach(field => {
      const fieldKey = field as keyof OutsiderFormData;
      if (currentValues[fieldKey]) {
        preservedValues[fieldKey] = currentValues[fieldKey] as any;
      }
    });

    // Apply autofill data while preserving personal info
    Object.keys(autofillData).forEach((key) => {
      if (!personalInfoFields.includes(key)) {
        setValue(key as keyof OutsiderFormData, autofillData[key as keyof typeof autofillData] as any);
      }
    });

    // Restore preserved personal info
    Object.keys(preservedValues).forEach((key) => {
      setValue(key as keyof OutsiderFormData, preservedValues[key as keyof OutsiderFormData] as any);
    });

    setMessage({ type: "success", text: "Form autofilled successfully (personal information preserved)" });
  };

  const onSubmit = async (data: OutsiderFormData) => {
    try {
      setSaving(true);
      setMessage(null);
      const res = await apiService.post("/api/admin/outsider-form", {
        applicationId: params.id,
        ...data,
      });
      if (res.success) {
        // Clear localStorage after successful save
        clearStorage();
        // Redirect to success page
        router.push(
          `/form/questionnaire-success?type=outsider&applicationId=${params.id}`
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
                  Outside Party Questionnaire
                </div>
                <div className="text-sm text-slate-600">
                  Application ID: {params.id}
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
                    title="Relationship Context"
                    bgClassName="bg-teal-700"
                  />
                  <div className="mt-3 space-y-6">
                    <FormTextArea
                      label="1. What is your relationship to the child and for how long?"
                      name="relationshipToChild"
                      register={register}
                      errors={errors}
                    />
                    <FormTextArea
                      label="2. In what context do you usually interact with the child?"
                      name="interactionContext"
                      register={register}
                      errors={errors}
                    />
                  </div>
                </section>
              </div>

              <div className="space-y-8 lg:pl-4">
                <section>
                  <FormSectionHeader
                    title="Learning Traits & Emotional Presentation"
                    bgClassName="bg-teal-700"
                  />
                  <div className="mt-3 space-y-6">
                    <FormTextArea
                      label="1. How would you describe the child's learning tendencies or curiosity?"
                      name="learningTendenciesCuriosity"
                      register={register}
                      errors={errors}
                    />
                    <FormTextArea
                      label="2. What emotional traits stand out?"
                      name="emotionalTraits"
                      register={register}
                      errors={errors}
                      rows={4}
                    />
                    <FormTextArea
                      label="3. How does the child adapt to changes or unfamiliar settings?"
                      name="adaptationToChanges"
                      register={register}
                      errors={errors}
                      rows={3}
                    />
                  </div>
                </section>
              </div>
            </div>

            <div className="space-y-8 mt-8">
              <section>
                <FormSectionHeader
                  title="Social Behaviour & Communication"
                  bgClassName="bg-teal-700"
                />
                <div className="mt-3 space-y-6">
                  <FormTextArea
                    label="1. What communication skills have you observed?"
                    name="communicationSkills"
                    register={register}
                    errors={errors}
                  />
                  <FormTextArea
                    label="2. How does the child behave in group settings?"
                    name="groupBehavior"
                    register={register}
                    errors={errors}
                  />
                  <FormTextArea
                    label="3. Any concerns or notes important for our team?"
                    name="concernsNotes"
                    register={register}
                    errors={errors}
                  />
                  <FormTextArea
                    label="4. What emotional strengths or areas of vulnerability have you noticed in this child?"
                    name="emotionalStrengthsVulnerabilities"
                    register={register}
                    errors={errors}
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
  name: keyof OutsiderFormData;
  register: UseFormRegister<OutsiderFormData>;
  errors: FieldErrors<OutsiderFormData>;
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


