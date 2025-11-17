"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, Input } from "@/app/components/forms/FormField";
import { useApiMutation } from "@/app/hooks/useApi";
import { apiService } from "@/app/utils/apiService";

const schema = z.object({
  // Parent/Guardian
  parentFullName: z.string().min(2, "Full name is required"),
  parentEmail: z.string().email("Enter a valid email"),
  parentPhone: z.string().optional(),
  relationToChild: z
    .string({ required_error: "Relation to child is required" })
    .min(1, "Relation to child is required")
    .refine((value) => ["1", "2", "3"].includes(value), {
      message: "Relation to child is required",
    }),
  parentCity: z.string().optional(),
  parentEthnicity: z.string().optional(),

  // Child
  childFullName: z.string().min(2, "Child name is required"),
  childDateOfBirth: z.string().optional(),
  childAge: z.coerce.number().int().min(1).max(18).optional(),
  childGender: z.enum(["M", "F"]).optional(),
  childEthnicity: z.string().optional(),
  childSchoolYear: z.string().optional(),
  childCurrentSchool: z.string().optional(),
  childSchoolType: z.enum(["Public", "Private", "Homeschool", "Other"]).optional(),
  childSchoolTypeOther: z.string().optional(),
  childDiagnosedNeeds: z.string().optional(),

  // Caregiver/Nanny (optional)
  caregiverFullName: z.string().optional(),
  caregiverPhone: z.string().optional(),

  // Parent Questions
  qExcitesMost: z.string().min(10, "Please add a brief answer"),
  qNonTraditionalReason: z.string().min(10, "Please add a brief answer"),
  qBiggestHope: z.string().min(10, "Please add a brief answer"),

  enjoysTech: z.enum(["Yes", "No", "Not Sure"]),
  enjoysHandsOn: z.enum(["Yes", "No", "Not Sure"]),

  // Consent
  consentContact: z.boolean().default(false).refine(v => v, "Contact consent is required"),
  consentUpdates: z.boolean().default(false).refine(v => v, "Updates consent is required"),
  consentBiometric: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

function PreAssessmentInnerWithHooks() {
  const params = useSearchParams();
  const router = useRouter();
  const emailFromQuery = params.get("email") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      parentEmail: emailFromQuery,
      enjoysTech: "Not Sure",
      enjoysHandsOn: "Not Sure",
    },
  });

  // Use the API mutation hook
  const { 
    mutate: submitPreAssessment, 
    loading: isSubmitting, 
    error: submitError,
    data: submitResult 
  } = useApiMutation((data?: FormValues) => {
    if (!data) throw new Error('Form data is required');
    return apiService.post("/api/application", data);
  });

  useEffect(() => {
    if (emailFromQuery) setValue("parentEmail", emailFromQuery);
  }, [emailFromQuery, setValue]);

  // Redirect on successful submission
  useEffect(() => {
    if (submitResult) {
      const timer = setTimeout(() => {
        router.push("/form/thanks");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitResult, router]);

  const schoolType = watch("childSchoolType");

  const onSubmit = async (data: FormValues) => {
    await submitPreAssessment(data);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#C9D0D4] to-[#B4CEDC] py-6 sm:py-8 md:py-10 px-3 sm:px-4">
      <div className="mx-auto w-full max-w-3xl sm:max-w-4xl bg-white rounded-xl sm:rounded-2xl shadow-sm ring-1 ring-black/5 p-4 sm:p-6 md:p-8 lg:p-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">Pre-Assessment Phase Form</h1>
        <p className="text-slate-600 mt-2 mb-5 sm:mb-6 text-sm sm:text-[15px]">Please complete the following form to help us better understand your child and family's needs.</p>

        {/* Success Message */}
        {submitResult && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Pre-assessment submitted successfully! Redirecting...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{submitError}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Parent/Guardian */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">Parent/Guardian Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <FormField label="Full Name" htmlFor="parentFullName" error={errors.parentFullName}>
                <Input id="parentFullName" placeholder="Jane Doe" {...register("parentFullName")} error={!!errors.parentFullName} />
              </FormField>
              <FormField label="Email Address" htmlFor="parentEmail" error={errors.parentEmail}>
                <Input id="parentEmail" type="email" placeholder="you@example.com" {...register("parentEmail")} error={!!errors.parentEmail} />
              </FormField>
              <FormField label="Phone Number" htmlFor="parentPhone" error={errors.parentPhone}>
                <Input id="parentPhone" placeholder="+973 ..." {...register("parentPhone")} error={!!errors.parentPhone} />
              </FormField>
              <FormField label="Relation to Child" htmlFor="relationToChild" error={errors.relationToChild}>
                <select
                  id="relationToChild"
                  defaultValue=""
                  {...register("relationToChild")}
                  className={`w-full rounded-xl border px-4 py-3 bg-transparent text-slate-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition ${
                    errors.relationToChild ? "border-red-300" : "border-slate-400"
                  }`}
                >
                  <option value="" disabled>
                    Select relation...
                  </option>
                  <option value="1">Mother</option>
                  <option value="2">Father</option>
                  <option value="3">Guardian</option>
                </select>
              </FormField>
              <FormField label="City/Location" htmlFor="parentCity" error={errors.parentCity}>
                <Input id="parentCity" placeholder="Manama" {...register("parentCity")} error={!!errors.parentCity} />
              </FormField>
              <FormField label="Ethnicity (you may list multiple)" htmlFor="parentEthnicity" error={errors.parentEthnicity}>
                <Input id="parentEthnicity" placeholder="e.g., Bahraini, Indian" {...register("parentEthnicity")} error={!!errors.parentEthnicity} />
              </FormField>
            </div>
          </section>

          {/* Child */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">Child Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <FormField label="Full Name" htmlFor="childFullName" error={errors.childFullName}>
                <Input id="childFullName" placeholder="Child name" {...register("childFullName")} error={!!errors.childFullName} />
              </FormField>
              <FormField label="Date of Birth" htmlFor="childDateOfBirth" error={errors.childDateOfBirth as any}>
                <Input id="childDateOfBirth" type="date" {...register("childDateOfBirth")} error={!!errors.childDateOfBirth} />
              </FormField>
              <FormField label="Age" htmlFor="childAge" error={errors.childAge as any}>
                <Input id="childAge" type="number" min={1} max={18} placeholder="8" {...register("childAge")} error={!!errors.childAge} />
              </FormField>
              <FormField label="Gender (M/F)" htmlFor="childGender" error={errors.childGender as any}>
                <div className="flex gap-6 text-sm text-slate-700">
                  {(["M","F"] as const).map((opt) => (
                    <label key={opt} className="inline-flex items-center gap-2">
                      <input type="radio" value={opt} {...register("childGender")} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </FormField>
              <FormField label="Ethnicity (you may list multiple)" htmlFor="childEthnicity" error={errors.childEthnicity}>
                <Input id="childEthnicity" placeholder="e.g., Bahraini, Indian" {...register("childEthnicity")} error={!!errors.childEthnicity} />
              </FormField>
              <FormField label="Current School Year (e.g., Reception, Year 1)" htmlFor="childSchoolYear" error={errors.childSchoolYear}>
                <Input id="childSchoolYear" placeholder="Year 1" {...register("childSchoolYear")} error={!!errors.childSchoolYear} />
              </FormField>
              <FormField label="Current School" htmlFor="childCurrentSchool" error={errors.childCurrentSchool}>
                <Input id="childCurrentSchool" placeholder="School name" {...register("childCurrentSchool")} error={!!errors.childCurrentSchool} />
              </FormField>
              <FormField label="Current School Type" htmlFor="childSchoolType" error={errors.childSchoolType as any}>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {["Public", "Private", "Homeschool", "Other"].map((opt) => (
                    <label key={opt} className="inline-flex items-center gap-2 text-sm text-slate-700">
                      <input type="radio" value={opt} {...register("childSchoolType")} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </FormField>
              {schoolType === "Other" && (
                <FormField label="Specify Other" htmlFor="childSchoolTypeOther" error={errors.childSchoolTypeOther}>
                  <Input id="childSchoolTypeOther" placeholder="Type" {...register("childSchoolTypeOther")} error={!!errors.childSchoolTypeOther} />
                </FormField>
              )}
              <FormField label="Any diagnosed learning needs (optional)" htmlFor="childDiagnosedNeeds" error={errors.childDiagnosedNeeds}>
                <Input id="childDiagnosedNeeds" placeholder="Details" {...register("childDiagnosedNeeds")} error={!!errors.childDiagnosedNeeds} />
              </FormField>
            </div>
          </section>

          {/* Caregiver */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">Caregiver/Nanny Contact Details (if applicable)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <FormField label="Full Name" htmlFor="caregiverFullName" error={errors.caregiverFullName}>
                <Input id="caregiverFullName" placeholder="Name" {...register("caregiverFullName")} error={!!errors.caregiverFullName} />
              </FormField>
              <FormField label="Phone Number" htmlFor="caregiverPhone" error={errors.caregiverPhone}>
                <Input id="caregiverPhone" placeholder="+973 ..." {...register("caregiverPhone")} error={!!errors.caregiverPhone} />
              </FormField>
            </div>
          </section>

          {/* Questions */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Parent Questions</h2>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <FormField label="What excites you most about this school?" htmlFor="qExcitesMost" error={errors.qExcitesMost}>
                <textarea id="qExcitesMost" rows={4} className="w-full rounded-xl border border-slate-300 px-3 sm:px-4 py-2.5 sm:py-3 text-slate-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-600" {...register("qExcitesMost")} />
              </FormField>
              <FormField label="What makes you consider a non-traditional education model?" htmlFor="qNonTraditionalReason" error={errors.qNonTraditionalReason}>
                <textarea id="qNonTraditionalReason" rows={4} className="w-full rounded-xl border border-slate-300 px-3 sm:px-4 py-2.5 sm:py-3 text-slate-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-600" {...register("qNonTraditionalReason")} />
              </FormField>
              <FormField label="What is your biggest hope for your child's future?" htmlFor="qBiggestHope" error={errors.qBiggestHope}>
                <textarea id="qBiggestHope" rows={4} className="w-full rounded-xl border border-slate-300 px-3 sm:px-4 py-2.5 sm:py-3 text-slate-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-600" {...register("qBiggestHope")} />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-3 sm:mt-4">
              <FormField label="Do you believe your child enjoys using technology to learn?" htmlFor="enjoysTech" error={errors.enjoysTech as any}>
                <div className="flex flex-wrap gap-4 text-sm text-slate-700">
                  {["Yes", "No", "Not Sure"].map((opt) => (
                    <label key={opt} className="inline-flex items-center gap-2"><input type="radio" value={opt} {...register("enjoysTech")} /><span>{opt}</span></label>
                  ))}
                </div>
              </FormField>
              <FormField label="Do you believe your child enjoys hands-on experiential learning?" htmlFor="enjoysHandsOn" error={errors.enjoysHandsOn as any}>
                <div className="flex flex-wrap gap-4 text-sm text-slate-700">
                  {["Yes", "No", "Not Sure"].map((opt) => (
                    <label key={opt} className="inline-flex items-center gap-2"><input type="radio" value={opt} {...register("enjoysHandsOn")} /><span>{opt}</span></label>
                  ))}
                </div>
              </FormField>
            </div>
          </section>

          {/* Consent */}
          <section className="pt-2 border-t">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Consent</h2>
            <div className="space-y-2 text-sm text-slate-700">
              <label className="flex items-start gap-3"><input type="checkbox" {...register("consentContact")} /> <span>I agree to be contacted by a member of the admissions team</span></label>
              <label className="flex items-start gap-3"><input type="checkbox" {...register("consentUpdates")} /> <span>I give permission to receive updates about the school</span></label>
              <label className="flex items-start gap-3"><input type="checkbox" {...register("consentBiometric")} /> <span>I consent to the use of biometric data for learning optimization (optional)</span></label>
            </div>
          </section>

          <div className="pt-2 flex justify-end">
            <button 
              type="submit" 
              disabled={isSubmitting || submitResult} 
              className="[clip-path:polygon(0%_0%,85%_0%,100%_38%,100%_100%,16%_100%,0%_56%)] rounded-xl bg-gradient-to-r from-[#8EC0C2] to-[#142954] text-white font-semibold px-6 py-3 shadow-md cursor-pointer transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : submitResult ? (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Submitted Successfully!
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function PreAssessmentFormPageWithHooks() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-600">Loading…</div>}>
      <PreAssessmentInnerWithHooks />
    </Suspense>
  );
}
