"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, Input, Textarea, FormSectionHeader } from "@/app/components/forms/FormField";
import { apiService } from "@/app/utils";
import { screeningCallSchema, type ScreeningCallFormData } from "@/app/lib/validations/screening-call";

export default function ScreeningCallFormPage() {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ScreeningCallFormData>({
    resolver: zodResolver(screeningCallSchema),
    defaultValues: {
      fullName: "",
      childName: "",
      date: "",
      callerName: "",
      crmLeadTag: undefined,
      recordingPermission: undefined,
      introductionNotes: "",
      overviewNotes: "",
      applicationReason: "",
      currentSchoolIssues: "",
      techResponseAtHome: "",
      parentWarmUpNotes: "",
      flexibleModelOpenness: "",
      childFreeTime: "",
      adaptiveTechComfort: "",
      fitClarificationNotes: "",
      generalNotes: "",
      parentReactionsNotes: "",
      comprehensiveQuestionnaires: false,
      guidebookInfo: false,
      walkthroughDate: "",
      assessmentInvite: "",
      additionalNotes: "",
      loggedToSystemDate: "",
      loggedBy: "",
    },
  });

  // Load existing data
  useEffect(() => {
    loadScreeningCallData();
  }, [params.id]);

  const loadScreeningCallData = async () => {
    try {
      setLoading(true);
      const res = await apiService.get(`/api/admin/screening-call?applicationId=${params.id}`);
      if (res.success && res.data) {
        const data = res.data;
        reset({
          fullName: data.fullName || "",
          childName: data.childName || "",
          date: data.date ? new Date(data.date).toISOString().split('T')[0] : "",
          callerName: data.callerName || "",
          crmLeadTag: data.crmLeadTag || undefined,
          recordingPermission: data.recordingPermission || undefined,
          introductionNotes: data.introductionNotes || "",
          overviewNotes: data.overviewNotes || "",
          applicationReason: data.applicationReason || "",
          currentSchoolIssues: data.currentSchoolIssues || "",
          techResponseAtHome: data.techResponseAtHome || "",
          parentWarmUpNotes: data.parentWarmUpNotes || "",
          flexibleModelOpenness: data.flexibleModelOpenness || "",
          childFreeTime: data.childFreeTime || "",
          adaptiveTechComfort: data.adaptiveTechComfort || "",
          fitClarificationNotes: data.fitClarificationNotes || "",
          generalNotes: data.generalNotes || "",
          parentReactionsNotes: data.parentReactionsNotes || "",
          comprehensiveQuestionnaires: data.comprehensiveQuestionnaires || false,
          guidebookInfo: data.guidebookInfo || false,
          walkthroughDate: data.walkthroughDate || "",
          assessmentInvite: data.assessmentInvite || "",
          additionalNotes: data.additionalNotes || "",
          loggedToSystemDate: data.loggedToSystemDate || "",
          loggedBy: data.loggedBy || "",
        });
      }
    } catch (error: any) {
      console.error("Error loading screening call data:", error);
    } finally {
      setLoading(false);
    }
  };
const router = useRouter();
  const onSubmit = async (data: ScreeningCallFormData) => {
    try {
      setSaving(true);
      setMessage(null);
      
      const res = await apiService.post("/api/admin/screening-call", {
        applicationId: params.id,
        ...data,
      });

      if (res.success) {
        setMessage({ type: 'success', text: 'Screening call data saved successfully!' });
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
        <div className="mb-4">
          <div className="text-xl font-bold text-slate-900">Screening Call & Flow Script</div>
          <div className="text-sm text-slate-600">Application ID: {params.id}</div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            {/* General Information */}
            <section>
              <FormSectionHeader title="General Information" bgClassName="bg-teal-700" />
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Full Name" htmlFor="fullName">
                  <Input 
                    id="fullName" 
                    placeholder="Full Name" 
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
                    placeholder="Child's Name" 
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
                <FormField label="Caller Name" htmlFor="callerName">
                  <Input 
                    id="callerName" 
                    placeholder="Caller Name" 
                    {...register("callerName")}
                    className={errors.callerName ? "border-red-500" : ""}
                  />
                  {errors.callerName && (
                    <p className="text-red-500 text-sm mt-1">{errors.callerName.message}</p>
                  )}
                </FormField>
                <div className="md:col-span-2 flex text-slate-700 items-center gap-6 text-sm">
                  <span>CRM Lead Tag:</span>
                  <label className="flex items-center gap-2 text-slate-700">
                    <input 
                      type="radio" 
                      value="Hot"
                      {...register("crmLeadTag")}
                    /> Hot
                  </label>
                  <label className="flex items-center gap-2 text-slate-700">
                    <input 
                      type="radio" 
                      value="Warm"
                      {...register("crmLeadTag")}
                    /> Warm
                  </label>
                  <label className="flex items-center gap-2 text-slate-700">
                    <input 
                      type="radio" 
                      value="Cold"
                      {...register("crmLeadTag")}
                    /> Cold
                  </label>
                </div>
              </div>
            </section>

            {/* Introduction */}
            <section>
              <FormSectionHeader title="Introduction (1 min)" bgClassName="bg-teal-700" />
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p>Hello [Parent Name], I’m [Your Name] from Alphera Academy.</p>
                <p>Thank you for your interest in our innovative learning approach.</p>
                <p>This call is to better understand your child’s needs and share how Alphera Academy might be a great fit.</p>
              </div>
              <div className="mt-3 flex items-center text-slate-700 gap-6 text-sm">
                <span>Interview Recording Permission:</span>
                <label className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    value="Yes"
                    {...register("recordingPermission")}
                  /> Yes
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    value="No"
                    {...register("recordingPermission")}
                  /> No
                </label>
              </div>
              <Textarea 
                className="mt-3" 
                rows={4} 
                placeholder="Introduction: Notes / Parent Reactions"
                {...register("introductionNotes")}
              />
            </section>

            {/* Overview */}
            <section>
              <FormSectionHeader title="Alphera Academy Overview (3 min)" bgClassName="bg-teal-700" />
              <ul className="mt-3 list-decimal pl-5 text-sm text-slate-700 space-y-1">
                <li>British core curriculum + experiential learning</li>
                <li>Human-led STEM, arts, entrepreneurship</li>
                <li>Personalised, non-traditional model tailored to each learner</li>
              </ul>
              <Textarea 
                className="mt-3" 
                rows={4} 
                placeholder="Parent reactions during overview"
                {...register("overviewNotes")}
              />
            </section>

            {/* Parent Warm-Up */}
            <section>
              <FormSectionHeader title="Parent Warm-Up Questions (5 min)" bgClassName="bg-teal-700" />
              <ol className="mt-3 space-y-5 text-slate-700">
                <li>
                  <div className="text-sm">What made you fill out the application form?</div>
                  <Textarea 
                    className="mt-2" 
                    rows={4} 
                    {...register("applicationReason")}
                  />
                </li>
                <li>
                  <div className="text-sm">What are you looking for that your current school may not provide?</div>
                  <Textarea 
                    className="mt-2" 
                    rows={4} 
                    {...register("currentSchoolIssues")}
                  />
                </li>
                <li>
                  <div className="text-sm">How does your child respond to learning with technology at home?</div>
                  <Textarea 
                    className="mt-2" 
                    rows={4} 
                    {...register("techResponseAtHome")}
                  />
                </li>
              </ol>
              {/* <Textarea 
                className="mt-3" 
                rows={4} 
                placeholder="Parent Warm-Up: Notes / Parent Reactions"
                {...register("parentWarmUpNotes")}
              /> */}
            </section>

           
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8 lg:pl-4">
            {/* Notes panels */}
            {/* <section>
              <FormSectionHeader title="Notes" bgClassName="bg-teal-700" />
              <Textarea 
                className="mt-3" 
                rows={6} 
                placeholder="General Notes"
                {...register("generalNotes")}
              />
            </section> */}


            {/* Next Steps */}
             {/* Fit Clarification */}
             <section>
              <FormSectionHeader title="Fit Clarification (3 min)" bgClassName="bg-teal-700" />
              <ol className="mt-3 space-y-5 text-slate-700">
                <li>
                  <div className="text-sm">Are you open to a flexible, tech-supported model without constant adult direction?</div>
                  <Textarea 
                    className="mt-2" 
                    rows={3} 
                    {...register("flexibleModelOpenness")}
                  />
                </li>
                <li>
                  <div className="text-sm">What does your child do in their free time?</div>
                  <Textarea 
                    className="mt-2" 
                    rows={3} 
                    {...register("childFreeTime")}
                  />
                </li>
                <li>
                  <div className="text-sm">How comfortable are you with adaptive learning technology?</div>
                  <Textarea 
                    className="mt-2" 
                    rows={3} 
                    {...register("adaptiveTechComfort")}
                  />
                </li>
              </ol>
           
            </section>
            <section>
              <FormSectionHeader title="Next Steps (3 min)" bgClassName="bg-teal-700" />
              <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-slate-700">
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    {...register("comprehensiveQuestionnaires")}
                  /> Comprehensive Questionnaires x3
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    {...register("guidebookInfo")}
                  /> Guidebook / Additional Info
                </label>
                <FormField label="Schedule Facility Walk-Through (Date)" htmlFor="walkthroughDate">
                  <Input 
                    id="walkthroughDate" 
                    placeholder="e.g., 2025-09-30 10:00" 
                    {...register("walkthroughDate")}
                  />
                </FormField>
                <FormField label="Confirm Invite to Assessment Day" htmlFor="assessmentInvite">
                  <Input 
                    id="assessmentInvite" 
                    placeholder="Add note or date" 
                    {...register("assessmentInvite")}
                  />
                </FormField>
              </div>
              <Textarea 
                className="mt-3" 
                rows={6} 
                placeholder="Additional Notes / Observations"
                {...register("additionalNotes")}
              />
            </section>

            {message && (
              <div className={`p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message.text}
              </div>
            )}

            <div className="flex items-center justify-end gap-3">
              {/* <button type="button" className="px-4 py-2 rounded border text-slate-700">Save Draft</button> */}
              <button 
                type="submit"
                disabled={saving}
                className="[clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)] cursor-pointer py-3 flex justify-between items-center bg-gradient-to-r from-[#8EC0C2] to-[#142954] text-white rounded-lg px-4 hover:brightness-[1.05] active:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save & Continue'}
              </button>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}


