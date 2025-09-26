"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, Input } from "@/app/components/forms/FormField";
import { apiService } from "@/app/utils";
import Toaster from "@/app/components/Toaster";
import toast from "react-hot-toast";
import PasswordSetupModal from "@/app/components/PasswordSetupModal";

const schema = z.object({
  // Parent/Guardian Information
  parentFullName: z.string().min(1, "Parent full name is required"),
  parentEmail: z.string().email("Invalid email format"),
  parentPhone: z.string().min(1, "Phone number is required"),
  relationToChild: z.string().min(1, "Relation to child is required"),
  parentCity: z.string().min(1, "City/Location is required"),
  parentEthnicity: z.string().min(1, "Ethnicity is required"),

  // Child Information
  childFullName: z.string().min(1, "Child full name is required"),
  childDateOfBirth: z.string().optional(),
  childAge: z.coerce.number().int().min(1).max(18).optional(),
  childGender: z.enum(["M", "F"]).optional(),
  childEthnicity: z.string().optional(),
  childSchoolYear: z.string().optional(),
  childCurrentSchool: z.string().optional(),
  childSchoolType: z.enum(["Public", "Private", "Homeschool", "Other"]).optional(),
  childSchoolTypeOther: z.string().optional(),
  childDiagnosedNeeds: z.string().optional(),

  // Caregiver/Nanny Information (required as per request)
  caregiverFullName: z.string().min(1, "Caregiver full name is required"),
  caregiverPhone: z.string().min(1, "Caregiver phone number is required"),

  // Parent Questions
  qExcitesMost: z.string().min(1, "This field is required"),
  qNonTraditionalReason: z.string().min(1, "This field is required"),
  qBiggestHope: z.string().min(1, "This field is required"),
  enjoysTech: z.enum(["Yes", "No", "NotSure"]),
  enjoysHandsOn: z.enum(["Yes", "No", "NotSure"]),

  // Consent
  consentContact: z.boolean().default(false).refine(v => v, "Contact consent is required"),
  consentUpdates: z.boolean().default(false).refine(v => v, "Updates consent is required"),
  consentBiometric: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

function PreAssessmentInner() {
  const params = useSearchParams();
  const router = useRouter();
  const emailFromQuery = params.get("email") || "";
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      parentEmail: emailFromQuery,
      enjoysTech: "NotSure",
      enjoysHandsOn: "NotSure",
    },
  });

  useEffect(() => {
    if (emailFromQuery) setValue("parentEmail", emailFromQuery);
  }, [emailFromQuery, setValue]);

  const schoolType = watch("childSchoolType");

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Submitting data:", data);
      console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
      
      const result = await apiService.post("/api/application", data);
      
      console.log("API Response:", result);
      
      if (result.success) {
        toast.success("Application submitted successfully");
        setSubmittedEmail(data.parentEmail);
        setShowPasswordModal(true);
      } else {
        toast.error("Application submission failed");
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
      toast.error("Application submission failed");
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    try {
      // Here you would typically call an API to set the password
      // For now, we'll simulate the API call
      const result = await apiService.post("/api/auth/set-password", { email: submittedEmail, password });
      if(result.success) {

        toast.success("Password set successfully");
      } else {
        toast.error("Password setup failed");
      }
      // After password is set, redirect to thanks page
      router.push("/form/thanks");
    } catch (error) {
      console.error('Password setup failed:', error);
      throw error;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white slide-in-right p-2">

    <div
      className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#C9D0D5] to-[#A7CFE6]"
    >
      {/* bottom-left angled white corner like main page */}
      <div className="absolute left-0 bottom-0 z-10 w-[65vw] sm:w-[55vw] md:w-[50vw] lg:w-[45vw] xl:w-[40vw] h-[30vh] sm:h-[35vh] md:h-[38vh] lg:h-[40vh] xl:h-[42vh] bg-white angle-corner" />

      <div className="relative z-20 h-screen flex items-center justify-center p-1 sm:p-2 md:p-3 lg:p-2">
        <div className="w-full h-[90vh] rounded-2xl  flex flex-col overflow-hidden">
          <div className="px-4 border-b flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Pre-Assessment Phase Form</h1>
            <p className="text-slate-600 mt-2">Please complete the following form to help us better understand your child and family's needs.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col overflow-hidden">
            {/* Single scrollable content area */}
            <div className="flex-1 overflow-y-auto scroll-invisible p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div>
                  {/* Parent/Guardian */}
                  <section className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Parent/Guardian Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <Input id="relationToChild" placeholder="Mother / Father / Guardian" {...register("relationToChild")} error={!!errors.relationToChild} />
                      </FormField>
                      <FormField label="City/Location" htmlFor="parentCity" error={errors.parentCity}>
                        <Input id="parentCity" placeholder="Manama" {...register("parentCity")} error={!!errors.parentCity} />
                      </FormField>
                      <FormField label="Ethnicity (you may list multiple)" htmlFor="parentEthnicity" error={errors.parentEthnicity}>
                        <Input id="parentEthnicity" placeholder="e.g., Bahraini, Indian" {...register("parentEthnicity")} error={!!errors.parentEthnicity} />
                      </FormField>
                    </div>
                  </section>

                  {/* Caregiver */}
                  <section className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Caregiver/Nanny Contact Details (if applicable)</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Full Name" htmlFor="caregiverFullName" error={errors.caregiverFullName}>
                        <Input id="caregiverFullName" placeholder="Name" {...register("caregiverFullName")} error={!!errors.caregiverFullName} />
                      </FormField>
                      <FormField label="Phone Number" htmlFor="caregiverPhone" error={errors.caregiverPhone}>
                        <Input id="caregiverPhone" placeholder="+973 ..." {...register("caregiverPhone")} error={!!errors.caregiverPhone} />
                      </FormField>
                    </div>
                  </section>

                  {/* Consent moved below */}
                </div>

                {/* Right column */}
                <div>
                  {/* Child */}
                  <section className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Child Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Full Name" htmlFor="childFullName" error={errors.childFullName}>
                        <Input id="childFullName" placeholder="Child name" {...register("childFullName")} error={!!errors.childFullName} />
                      </FormField>
                      <FormField label="Date of Birth" htmlFor="childDateOfBirth" error={errors.childDateOfBirth}>
                        <Input id="childDateOfBirth" type="date" {...register("childDateOfBirth")} error={!!errors.childDateOfBirth} />
                      </FormField>
                      <FormField label="Age" htmlFor="childAge" error={errors.childAge as any}>
                        <Input id="childAge" type="number" min={1} max={18} placeholder="8" {...register("childAge")} error={!!errors.childAge} />
                      </FormField>
                      <FormField label="Gender" htmlFor="childGender" error={errors.childGender as any}>
                        <div className="grid grid-cols-2 gap-2">
                          {["M", "F"].map((opt) => (
                            <label key={opt} className="inline-flex items-center gap-2 text-sm text-slate-700">
                              <input type="radio" value={opt} {...register("childGender")} />
                              <span>{opt === "M" ? "Male" : "Female"}</span>
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
                        <div className="grid grid-cols-2 gap-2">
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

                  {/* Questions moved below */}
                </div>
              </div>

              {/* Questions + Consent combined section below two columns */}
              <div className="mt-8 space-y-6">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Parent Questions</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <FormField label="What excites you most about this school?" htmlFor="qExcitesMost" error={errors.qExcitesMost}>
                      <textarea id="qExcitesMost" rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-transparent text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600" {...register("qExcitesMost")} />
                    </FormField>
                    <FormField label="What makes you consider a non-traditional education model?" htmlFor="qNonTraditionalReason" error={errors.qNonTraditionalReason}>
                      <textarea id="qNonTraditionalReason" rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-transparent text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600" {...register("qNonTraditionalReason")} />
                    </FormField>
                    <FormField label="What is your biggest hope for your child's future?" htmlFor="qBiggestHope" error={errors.qBiggestHope}>
                      <textarea id="qBiggestHope" rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-transparent text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600" {...register("qBiggestHope")} />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <FormField label="Do you believe your child enjoys using technology to learn?" htmlFor="enjoysTech" error={errors.enjoysTech as any}>
                      <div className="flex gap-4 text-sm text-slate-700">
                        {[
                          { value: "Yes", label: "Yes" },
                          { value: "No", label: "No" },
                          { value: "NotSure", label: "Not Sure" }
                        ].map((opt) => (
                          <label key={opt.value} className="inline-flex items-center gap-2">
                            <input type="radio" value={opt.value} {...register("enjoysTech")} />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </FormField>
                    <FormField label="Do you believe your child enjoys hands-on experiential learning?" htmlFor="enjoysHandsOn" error={errors.enjoysHandsOn as any}>
                      <div className="flex gap-4 text-sm text-slate-700">
                        {[
                          { value: "Yes", label: "Yes" },
                          { value: "No", label: "No" },
                          { value: "NotSure", label: "Not Sure" }
                        ].map((opt) => (
                          <label key={opt.value} className="inline-flex items-center gap-2">
                            <input type="radio" value={opt.value} {...register("enjoysHandsOn")} />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </FormField>
                  </div>
                </section>

                <section className="pt-2 border-t">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Consent</h2>
                  <div className="space-y-2 text-sm text-slate-700">
                    <label className="flex items-start gap-3"><input type="checkbox" {...register("consentContact")} /> <span>I agree to be contacted by a member of the admissions team</span></label>
                    {errors.consentContact && <p className="text-xs text-red-600">{errors.consentContact.message}</p>}
                    <label className="flex items-start gap-3"><input type="checkbox" {...register("consentUpdates")} /> <span>I give permission to receive updates about the school</span></label>
                    {errors.consentUpdates && <p className="text-xs text-red-600">{errors.consentUpdates.message}</p>}
                    <label className="flex items-start gap-3"><input type="checkbox" {...register("consentBiometric")} /> <span>I consent to the use of biometric data for learning optimization (optional)</span></label>
                  </div>
                </section>
              </div>
            </div>

            {/* Bottom fixed submit bar inside container */}
            <div className="p-4 sm:p-6 flex-shrink-0">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="[clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)]  w-full md:w-auto min-w-40 cursor-pointer bg-gradient-to-r from-[#8EC0C2] to-[#142954] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  {isSubmitting ? "Submitting…" : "Submit"}
                </button>
              </div>
            </div>
          </form>

          {/* Password Setup Modal */}
          <PasswordSetupModal
            isOpen={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
            onSubmit={handlePasswordSubmit}
            userEmail={submittedEmail}
          />
        </div>
      </div>
    </div>
    </div>
  );
}

export default function PreAssessmentFormPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-600">Loading…</div>}>
      <PreAssessmentInner />
    </Suspense>
  );
}


