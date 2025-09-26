"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, Input, Textarea, FormSectionHeader } from "@/app/components/forms/FormField";
import { apiService } from "@/app/utils";
import { z } from "zod";

// Validation schema for outsider form
const outsiderFormSchema = z.object({
  // General Information
  fullName: z.string().min(1, "Full name is required"),
  childName: z.string().min(1, "Child's name is required"),
  date: z.string().min(1, "Date is required"),
  
  // Relationship Context
  relationshipToChild: z.string().min(1, "Relationship to child is required"),
  interactionContext: z.string().min(1, "Interaction context is required"),
  
  // Learning Traits & Emotional Presentation
  learningTendenciesCuriosity: z.string().min(1, "Learning tendencies/curiosity is required"),
  emotionalTraits: z.string().min(1, "Emotional traits is required"),
  adaptationToChanges: z.string().min(1, "Adaptation to changes is required"),
  
  // Social Behaviour & Communication
  communicationSkills: z.string().min(1, "Communication skills is required"),
  groupBehavior: z.string().min(1, "Group behavior is required"),
  concernsNotes: z.string().min(1, "Concerns/notes is required"),
  emotionalStrengthsVulnerabilities: z.string().min(1, "Emotional strengths/vulnerabilities is required"),
  
  // Office Use Only
  applicationNumber: z.string().optional(),
  loggedToSystemDate: z.string().optional(),
  loggedBy: z.string().optional(),
});

type OutsiderFormData = z.infer<typeof outsiderFormSchema>;

export default function OutsiderFormPage() {
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

  // Load existing data
  useEffect(() => {
    loadFormData();
  }, [params.id]);

  const loadFormData = async () => {
    try {
      setLoading(true);
      const res = await apiService.get(`/api/admin/outsider-form?applicationId=${params.id}`);
      if (res.success && res.data) {
        const data = res.data;
        reset({
          fullName: data.fullName || "",
          childName: data.childName || "",
          date: data.date ? new Date(data.date).toISOString().split('T')[0] : "",
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
      }
    } catch (error: any) {
      console.error("Error loading form data:", error);
    } finally {
      setLoading(false);
    }
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
        setMessage({ type: 'success', text: 'Outsider questionnaire submitted successfully!' });
        // Redirect to stage listing page after successful submission
        setTimeout(() => {
          router.push(`/admin/applications/${params.id}`);
        }, 1500);
      } else {
        setMessage({ type: 'error', text: res.message || 'Failed to submit questionnaire' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to submit questionnaire' });
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
          <div className="text-xl font-bold text-slate-900">Outside Party Questionnaire</div>
          <div className="text-sm text-slate-600">Application ID: {params.id}</div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT SIDE */}
            <div className="space-y-8">
              {/* General Information */}
              <section>
                <FormSectionHeader title="General Information" bgClassName="bg-teal-700" />
                <div className="mt-3 grid grid-cols-1 gap-4">
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
                  <FormField label="Child's Name" htmlFor="childName">
                    <Input 
                      id="childName"
                      {...register("childName")}
                      className={errors.childName ? "border-red-500" : ""}
                    />
                    {errors.childName && (
                      <p className="text-red-500 text-sm mt-1">{errors.childName.message}</p>
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
                </div>
              </section>

              {/* Relationship Context */}
              <section>
                <FormSectionHeader title="Relationship Context" bgClassName="bg-teal-700" />
                <div className="mt-3 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      1. What is your relationship to the child and for how long?
                    </label>
                    <Textarea 
                      rows={5}
                      {...register("relationshipToChild")}
                      placeholder="Describe your relationship to the child and duration..."
                    />
                    {errors.relationshipToChild && (
                      <p className="text-red-500 text-sm mt-1">{errors.relationshipToChild.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      2. In what context do you usually interact with the child?
                    </label>
                    <Textarea 
                      rows={5}
                      {...register("interactionContext")}
                      placeholder="Describe the context of your interactions with the child..."
                    />
                    {errors.interactionContext && (
                      <p className="text-red-500 text-sm mt-1">{errors.interactionContext.message}</p>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-8 lg:pl-4">
              {/* Learning Traits & Emotional Presentation */}
              <section>
                <FormSectionHeader title="Learning Traits & Emotional Presentation" bgClassName="bg-teal-700" />
                <div className="mt-3 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      1. How would you describe the child's learning tendencies or curiosity?
                    </label>
                    <Textarea 
                      rows={5}
                      {...register("learningTendenciesCuriosity")}
                      placeholder="Describe the child's learning tendencies and curiosity..."
                    />
                    {errors.learningTendenciesCuriosity && (
                      <p className="text-red-500 text-sm mt-1">{errors.learningTendenciesCuriosity.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      2. What emotional traits stand out?
                    </label>
                    <Textarea 
                      rows={4}
                      {...register("emotionalTraits")}
                      placeholder="Describe the emotional traits that stand out..."
                    />
                    {errors.emotionalTraits && (
                      <p className="text-red-500 text-sm mt-1">{errors.emotionalTraits.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      3. How does the child adapt to changes or unfamiliar settings?
                    </label>
                    <Textarea 
                      rows={3}
                      {...register("adaptationToChanges")}
                      placeholder="Describe how the child adapts to changes..."
                    />
                    {errors.adaptationToChanges && (
                      <p className="text-red-500 text-sm mt-1">{errors.adaptationToChanges.message}</p>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Full Width Sections */}
          <div className="space-y-8 mt-8">
            {/* Social Behaviour & Communication */}
            <section>
              <FormSectionHeader title="Social Behaviour & Communication" bgClassName="bg-teal-700" />
              <div className="mt-3 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    1. What communication skills have you observed?
                  </label>
                  <Textarea 
                    rows={5}
                    {...register("communicationSkills")}
                    placeholder="Describe the communication skills you've observed..."
                  />
                  {errors.communicationSkills && (
                    <p className="text-red-500 text-sm mt-1">{errors.communicationSkills.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    2. How does the child behave in group settings?
                  </label>
                  <Textarea 
                    rows={5}
                    {...register("groupBehavior")}
                    placeholder="Describe the child's behavior in group settings..."
                  />
                  {errors.groupBehavior && (
                    <p className="text-red-500 text-sm mt-1">{errors.groupBehavior.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    3. Any concerns or notes important for our team?
                  </label>
                  <Textarea 
                    rows={5}
                    {...register("concernsNotes")}
                    placeholder="Share any concerns or important notes..."
                  />
                  {errors.concernsNotes && (
                    <p className="text-red-500 text-sm mt-1">{errors.concernsNotes.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    4. What emotional strengths or areas of vulnerability have you noticed in this child?
                  </label>
                  <Textarea 
                    rows={5}
                    {...register("emotionalStrengthsVulnerabilities")}
                    placeholder="Describe emotional strengths and vulnerabilities..."
                  />
                  {errors.emotionalStrengthsVulnerabilities && (
                    <p className="text-red-500 text-sm mt-1">{errors.emotionalStrengthsVulnerabilities.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Office Use Only */}
            <section>
              <FormSectionHeader title="Office Use Only" bgClassName="bg-teal-700" />
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Application Number" htmlFor="applicationNumber">
                  <Input 
                    id="applicationNumber"
                    {...register("applicationNumber")}
                    className={errors.applicationNumber ? "border-red-500" : ""}
                  />
                  {errors.applicationNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.applicationNumber.message}</p>
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
                    <p className="text-red-500 text-sm mt-1">{errors.loggedToSystemDate.message}</p>
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
                    <p className="text-red-500 text-sm mt-1">{errors.loggedBy.message}</p>
                  )}
                </FormField>
              </div>
              <div className="mt-4 text-right text-sm text-slate-600">
                <p>Owner: SY Holdings WLL</p>
                <p>Prepared by: Meta Learning Systems Implementation Unit</p>
                <p>Confidentiality Level: Internal Operational Use</p>
              </div>
            </section>
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
              {saving ? 'Submitting...' : 'Submit Form'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}