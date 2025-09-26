"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, Input, Textarea, FormSectionHeader } from "@/app/components/forms/FormField";
import { apiService } from "@/app/utils";
import { z } from "zod";

// Validation schema for caregiver form
const caregiverFormSchema = z.object({
  // General Information
  fullName: z.string().min(1, "Full name is required"),
  childName: z.string().min(1, "Child's name is required"),
  date: z.string().min(1, "Date is required"),
  
  // Daily Care Context
  careDuration: z.string().min(1, "Care duration is required"),
  regularActivities: z.string().min(1, "Regular activities description is required"),
  behaviorWithoutParent: z.string().min(1, "Behavior without parent is required"),
  
  // Learning and Play Behaviour
  toysGamesTasksEnjoyed: z.string().min(1, "Toys/games/tasks enjoyed is required"),
  preferences: z.string().min(1, "Preferences description is required"),
  responseToDifficulties: z.string().min(1, "Response to difficulties is required"),
  engagementWithChosenActivity: z.string().min(1, "Engagement with chosen activity is required"),
  engagementWithAssignedActivity: z.string().min(1, "Engagement with assigned activity is required"),
  
  // Social & Emotional Response
  interactionWithChildren: z.string().min(1, "Interaction with children is required"),
  seekingHelpComfort: z.string().min(1, "Seeking help/comfort is required"),
  emotionalRegulationStrategies: z.string().min(1, "Emotional regulation strategies is required"),
  emotionalStrengthsVulnerabilities: z.string().min(1, "Emotional strengths/vulnerabilities is required"),
  
  // Office Use Only
  applicationNumber: z.string().optional(),
  loggedToSystemDate: z.string().optional(),
  loggedBy: z.string().optional(),
});

type CaregiverFormData = z.infer<typeof caregiverFormSchema>;

export default function CaregiverFormPage() {
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

  // Load existing data
  useEffect(() => {
    loadFormData();
  }, [params.id]);

  const loadFormData = async () => {
    try {
      setLoading(true);
      const res = await apiService.get(`/api/admin/caregiver-form?applicationId=${params.id}`);
      if (res.success && res.data) {
        const data = res.data;
        reset({
          fullName: data.fullName || "",
          childName: data.childName || "",
          date: data.date ? new Date(data.date).toISOString().split('T')[0] : "",
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
      }
    } catch (error: any) {
      console.error("Error loading form data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: CaregiverFormData) => {
    try {
      setSaving(true);
      setMessage(null);
      
      const res = await apiService.post("/api/admin/caregiver-form", {
        applicationId: params.id,
        ...data,
      });

      if (res.success) {
        setMessage({ type: 'success', text: 'Caregiver questionnaire submitted successfully!' });
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
          <div className="text-xl font-bold text-slate-900">Caregiver/Nanny Questionnaire</div>
          <div className="text-sm text-slate-600">Application ID: {params.id}</div>
          <div className="text-xs text-slate-500 italic">To be completed by the person most frequently caring for the child outside parents.</div>
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

              {/* Daily Care Context */}
              <section>
                <FormSectionHeader title="Daily Care Context" bgClassName="bg-teal-700" />
                <div className="mt-3 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      1. How long have you cared for this child?
                    </label>
                    <Textarea 
                      rows={5}
                      {...register("careDuration")}
                      placeholder="Describe how long you have been caring for this child..."
                    />
                    {errors.careDuration && (
                      <p className="text-red-500 text-sm mt-1">{errors.careDuration.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      2. What activities do you regularly do with them?
                    </label>
                    <Textarea 
                      rows={5}
                      {...register("regularActivities")}
                      placeholder="Describe the regular activities you do with the child..."
                    />
                    {errors.regularActivities && (
                      <p className="text-red-500 text-sm mt-1">{errors.regularActivities.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      3. How does the child behave when the parent is not present?
                    </label>
                    <Textarea 
                      rows={5}
                      {...register("behaviorWithoutParent")}
                      placeholder="Describe the child's behavior when parents are not around..."
                    />
                    {errors.behaviorWithoutParent && (
                      <p className="text-red-500 text-sm mt-1">{errors.behaviorWithoutParent.message}</p>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-8 lg:pl-4">
              {/* Learning and Play Behaviour */}
              <section>
                <FormSectionHeader title="Learning and Play Behaviour" bgClassName="bg-teal-700" />
                <div className="mt-3 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      1. What types of toys, games, or tasks does the child enjoy?
                    </label>
                    <Textarea 
                      rows={5}
                      {...register("toysGamesTasksEnjoyed")}
                      placeholder="Describe the types of toys, games, or tasks the child enjoys..."
                    />
                    {errors.toysGamesTasksEnjoyed && (
                      <p className="text-red-500 text-sm mt-1">{errors.toysGamesTasksEnjoyed.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      2. Have you noticed any preferences (e.g., being active, drawing, reading)?
                    </label>
                    <Textarea 
                      rows={7}
                      {...register("preferences")}
                      placeholder="Describe any preferences you've noticed..."
                    />
                    {errors.preferences && (
                      <p className="text-red-500 text-sm mt-1">{errors.preferences.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      3. How does the child respond when they encounter something difficult?
                    </label>
                    <Textarea 
                      rows={7}
                      {...register("responseToDifficulties")}
                      placeholder="Describe how the child responds to difficulties..."
                    />
                    {errors.responseToDifficulties && (
                      <p className="text-red-500 text-sm mt-1">{errors.responseToDifficulties.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      4. How long does the child engage with an activity of their choice?
                    </label>
                    <Textarea 
                      rows={7}
                      {...register("engagementWithChosenActivity")}
                      placeholder="Describe engagement duration with chosen activities..."
                    />
                    {errors.engagementWithChosenActivity && (
                      <p className="text-red-500 text-sm mt-1">{errors.engagementWithChosenActivity.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      5. How long does the child engage with an activity of your choice?
                    </label>
                    <Textarea 
                      rows={7}
                      {...register("engagementWithAssignedActivity")}
                      placeholder="Describe engagement duration with assigned activities..."
                    />
                    {errors.engagementWithAssignedActivity && (
                      <p className="text-red-500 text-sm mt-1">{errors.engagementWithAssignedActivity.message}</p>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Full Width Sections */}
          <div className="space-y-8 mt-8">
            {/* Social & Emotional Response */}
            <section>
              <FormSectionHeader title="Social & Emotional Response" bgClassName="bg-teal-700" />
              <div className="mt-3 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    1. How does the child interact with other children?
                  </label>
                  <Textarea 
                    rows={5}
                    {...register("interactionWithChildren")}
                    placeholder="Describe how the child interacts with other children..."
                  />
                  {errors.interactionWithChildren && (
                    <p className="text-red-500 text-sm mt-1">{errors.interactionWithChildren.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    2. How does the child seek help or comfort when upset or unsure?
                  </label>
                  <Textarea 
                    rows={6}
                    {...register("seekingHelpComfort")}
                    placeholder="Describe how the child seeks help or comfort..."
                  />
                  {errors.seekingHelpComfort && (
                    <p className="text-red-500 text-sm mt-1">{errors.seekingHelpComfort.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    3. What emotional regulation strategies work best?
                  </label>
                  <Textarea 
                    rows={6}
                    {...register("emotionalRegulationStrategies")}
                    placeholder="Describe effective emotional regulation strategies..."
                  />
                  {errors.emotionalRegulationStrategies && (
                    <p className="text-red-500 text-sm mt-1">{errors.emotionalRegulationStrategies.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    4. What emotional strengths or areas of vulnerability have you noticed in this child?
                  </label>
                  <Textarea 
                    rows={7}
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
                <p>Page 3 of 4</p>
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