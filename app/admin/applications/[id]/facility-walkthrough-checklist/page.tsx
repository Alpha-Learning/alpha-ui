"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, Input, Textarea, FormSectionHeader } from "@/app/components/forms/FormField";
import { apiService } from "@/app/utils";
import { z } from "zod";

// Validation schema for facility walkthrough checklist
const facilityWalkthroughChecklistSchema = z.object({
  // General Information
  examinerName: z.string().min(1, "Examiner name is required"),
  date: z.string().min(1, "Date is required"),
  
  // Checklist Items
  welcomeOverviewCompleted: z.boolean().default(false),
  tourLearningZonesCompleted: z.boolean().default(false),
  technologyDemonstrationCompleted: z.boolean().default(false),
  safetySecurityMeasuresCompleted: z.boolean().default(false),
  qaSessionCompleted: z.boolean().default(false),
  scheduleAssessmentDatesCompleted: z.boolean().default(false),
  
  // Additional Notes
  welcomeOverviewNotes: z.string().min(1, "Welcome overview notes are required"),
  tourLearningZonesNotes: z.string().min(1, "Tour learning zones notes are required"),
  technologyDemonstrationNotes: z.string().min(1, "Technology demonstration notes are required"),
  safetySecurityMeasuresNotes: z.string().min(1, "Safety and security measures notes are required"),
  qaSessionNotes: z.string().min(1, "Q&A session notes are required"),
  scheduleAssessmentDatesNotes: z.string().min(1, "Schedule assessment dates notes are required"),
  
  // Office Use Only
  applicationNumber: z.string().optional(),
  loggedToSystemDate: z.string().optional(),
  loggedBy: z.string().optional(),
});

type FacilityWalkthroughChecklistFormData = z.infer<typeof facilityWalkthroughChecklistSchema>;

export default function FacilityWalkthroughChecklistPage() {
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
    watch,
  } = useForm<FacilityWalkthroughChecklistFormData>({
    resolver: zodResolver(facilityWalkthroughChecklistSchema),
    defaultValues: {
      examinerName: "",
      date: "",
      welcomeOverviewCompleted: false,
      tourLearningZonesCompleted: false,
      technologyDemonstrationCompleted: false,
      safetySecurityMeasuresCompleted: false,
      qaSessionCompleted: false,
      scheduleAssessmentDatesCompleted: false,
      welcomeOverviewNotes: "",
      tourLearningZonesNotes: "",
      technologyDemonstrationNotes: "",
      safetySecurityMeasuresNotes: "",
      qaSessionNotes: "",
      scheduleAssessmentDatesNotes: "",
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
      const res = await apiService.get(`/api/admin/facility-walkthrough-checklist?applicationId=${params.id}`);
      
      // Load application data for auto-filling
      const appRes = await apiService.getApplicationData(params.id);
      
      if (res.success && res.data) {
        // Use existing form data
        const data = res.data;
        reset({
          examinerName: data.examinerName || "",
          date: data.date ? new Date(data.date).toISOString().split('T')[0] : "",
          welcomeOverviewCompleted: data.welcomeOverviewCompleted || false,
          tourLearningZonesCompleted: data.tourLearningZonesCompleted || false,
          technologyDemonstrationCompleted: data.technologyDemonstrationCompleted || false,
          safetySecurityMeasuresCompleted: data.safetySecurityMeasuresCompleted || false,
          qaSessionCompleted: data.qaSessionCompleted || false,
          scheduleAssessmentDatesCompleted: data.scheduleAssessmentDatesCompleted || false,
          welcomeOverviewNotes: data.welcomeOverviewNotes || "",
          tourLearningZonesNotes: data.tourLearningZonesNotes || "",
          technologyDemonstrationNotes: data.technologyDemonstrationNotes || "",
          safetySecurityMeasuresNotes: data.safetySecurityMeasuresNotes || "",
          qaSessionNotes: data.qaSessionNotes || "",
          scheduleAssessmentDatesNotes: data.scheduleAssessmentDatesNotes || "",
          applicationNumber: data.applicationNumber || params.id,
          loggedToSystemDate: data.loggedToSystemDate || "",
          loggedBy: data.loggedBy || "",
        });
      } else if (appRes.success && appRes.data) {
        // Auto-fill with application data if no existing form data
        const appData = appRes.data;
        reset({
          examinerName: "",
          date: new Date().toISOString().split('T')[0], // Today's date as default
          welcomeOverviewCompleted: false,
          tourLearningZonesCompleted: false,
          technologyDemonstrationCompleted: false,
          safetySecurityMeasuresCompleted: false,
          qaSessionCompleted: false,
          scheduleAssessmentDatesCompleted: false,
          welcomeOverviewNotes: "",
          tourLearningZonesNotes: "",
          technologyDemonstrationNotes: "",
          safetySecurityMeasuresNotes: "",
          qaSessionNotes: "",
          scheduleAssessmentDatesNotes: "",
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

  const onSubmit = async (data: FacilityWalkthroughChecklistFormData) => {
    try {
      setSaving(true);
      setMessage(null);
      
      const res = await apiService.post("/api/admin/facility-walkthrough-checklist", {
        applicationId: params.id,
        ...data,
      });

      if (res.success) {
        setMessage({ type: 'success', text: 'Facility walkthrough checklist submitted successfully!' });
        // Redirect to stage listing page after successful submission
        setTimeout(() => {
          router.push(`/admin/applications/${params.id}`);
        }, 1500);
      } else {
        setMessage({ type: 'error', text: res.message || 'Failed to submit checklist' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to submit checklist' });
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
          <div className="text-xl font-bold text-slate-900">Facility Walkthrough Checklist</div>
          <div className="text-sm text-slate-600">Application ID: {params.id}</div>
          <div className="text-xs text-slate-500 italic">Use this checklist during the facility walk-through to ensure all key topics are covered with visiting families.</div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            {/* General Information */}
            <section>
              <FormSectionHeader title="General Information" bgClassName="bg-teal-700" />
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Examiner Name" htmlFor="examinerName">
                  <Input 
                    id="examinerName"
                    {...register("examinerName")}
                    className={errors.examinerName ? "border-red-500" : ""}
                  />
                  {errors.examinerName && (
                    <p className="text-red-500 text-sm mt-1">{errors.examinerName.message}</p>
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

            {/* Checklist Items */}
            <section>
              <FormSectionHeader title="Checklist Items" bgClassName="bg-teal-700" />
              <div className="mt-3 space-y-6">
                {/* Welcome and Overview */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      {...register("welcomeOverviewCompleted")}
                      className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Welcome and Overview of Philosophy
                      </label>
                      <p className="text-sm text-slate-600 mb-3">
                        Briefly explain the academy's mission, values, and educational approach.
                      </p>
                      <Textarea 
                        rows={3}
                        {...register("welcomeOverviewNotes")}
                        placeholder="Add notes about this section..."
                        className={`text-sm ${errors.welcomeOverviewNotes ? "border-red-500" : ""}`}
                      />
                      {errors.welcomeOverviewNotes && (
                        <p className="text-red-500 text-sm mt-1">{errors.welcomeOverviewNotes.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tour of Learning Zones */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      {...register("tourLearningZonesCompleted")}
                      className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Tour of Learning Zones
                      </label>
                      <p className="text-sm text-slate-600 mb-3">
                        Visit each key area (classrooms, studios, collaboration spaces, etc.).
                      </p>
                      <Textarea 
                        rows={3}
                        {...register("tourLearningZonesNotes")}
                        placeholder="Add notes about this section..."
                        className={`text-sm ${errors.tourLearningZonesNotes ? "border-red-500" : ""}`}
                      />
                      {errors.tourLearningZonesNotes && (
                        <p className="text-red-500 text-sm mt-1">{errors.tourLearningZonesNotes.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Technology Demonstration */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      {...register("technologyDemonstrationCompleted")}
                      className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Technology Demonstration
                      </label>
                      <p className="text-sm text-slate-600 mb-3">
                        Showcase how AI and digital tools support personalized learning.
                      </p>
                      <Textarea 
                        rows={3}
                        {...register("technologyDemonstrationNotes")}
                        placeholder="Add notes about this section..."
                        className={`text-sm ${errors.technologyDemonstrationNotes ? "border-red-500" : ""}`}
                      />
                      {errors.technologyDemonstrationNotes && (
                        <p className="text-red-500 text-sm mt-1">{errors.technologyDemonstrationNotes.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Safety and Security Measures */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      {...register("safetySecurityMeasuresCompleted")}
                      className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Safety and Security Measures
                      </label>
                      <p className="text-sm text-slate-600 mb-3">
                        Discuss physical safety protocols, access control, and student wellbeing practices.
                      </p>
                      <Textarea 
                        rows={3}
                        {...register("safetySecurityMeasuresNotes")}
                        placeholder="Add notes about this section..."
                        className={`text-sm ${errors.safetySecurityMeasuresNotes ? "border-red-500" : ""}`}
                      />
                      {errors.safetySecurityMeasuresNotes && (
                        <p className="text-red-500 text-sm mt-1">{errors.safetySecurityMeasuresNotes.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Q&A Session */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      {...register("qaSessionCompleted")}
                      className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Q&A Session
                      </label>
                      <p className="text-sm text-slate-600 mb-3">
                        Invite and address parent questions or concerns.
                      </p>
                      <Textarea 
                        rows={3}
                        {...register("qaSessionNotes")}
                        placeholder="Add notes about this section..."
                        className={`text-sm ${errors.qaSessionNotes ? "border-red-500" : ""}`}
                      />
                      {errors.qaSessionNotes && (
                        <p className="text-red-500 text-sm mt-1">{errors.qaSessionNotes.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Schedule Assessment Dates */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      {...register("scheduleAssessmentDatesCompleted")}
                      className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Schedule Assessment Dates
                      </label>
                      <p className="text-sm text-slate-600 mb-3">
                        Confirm and record preferred assessment session date and time.
                      </p>
                      <Textarea 
                        rows={3}
                        {...register("scheduleAssessmentDatesNotes")}
                        placeholder="Add notes about this section..."
                        className={`text-sm ${errors.scheduleAssessmentDatesNotes ? "border-red-500" : ""}`}
                      />
                      {errors.scheduleAssessmentDatesNotes && (
                        <p className="text-red-500 text-sm mt-1">{errors.scheduleAssessmentDatesNotes.message}</p>
                      )}
                    </div>
                  </div>
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
                {saving ? 'Submitting...' : 'Submit Checklist'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
