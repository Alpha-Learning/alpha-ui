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
  parentOccupation: z.string().optional(),
  relationToChild: z
    .string({ required_error: "Relation to child is required" })
    .min(1, "Relation to child is required")
    .refine((value) => ["1", "2", "3"].includes(value), {
      message: "Relation to child is required",
    }),
  parentCity: z.string().min(1, "City/Location is required"),
  parentEthnicity: z.string().min(1, "Ethnicity is required"),

  // Child Information
  childFullName: z.string().min(1, "Child full name is required"),
  // Removed: childDateOfBirth
  childAge: z.coerce.number({
    required_error: "Age is required",
    invalid_type_error: "Age is required",
  }).int().min(1, "Age is required").max(18, "Age must be 18 or less"),
  // Removed: childGender
  childEthnicity: z.string().optional(),
  childSchoolYear: z.string().optional(),
  childCurrentSchool: z.string().optional(),
  childSchoolType: z.enum(["Public", "Private", "Homeschool", "Other"], {
    required_error: "Current school type is required",
    invalid_type_error: "Current school type is required",
  }),
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
  const [isLoadingParentDetails, setIsLoadingParentDetails] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      parentEmail: emailFromQuery,
      enjoysTech: "NotSure",
      enjoysHandsOn: "NotSure",
    },
  });

  // Fetch and pre-fill parent details if user exists
  useEffect(() => {
    const fetchParentDetails = async () => {
      if (!emailFromQuery) return;
      
      setIsLoadingParentDetails(true);
      try {
        const response = await fetch('/api/application/parent-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailFromQuery }),
        });

        const result = await response.json();
        
        if (result.success && result.data) {
          // Pre-fill parent details from previous application
          setValue("parentFullName", result.data.parentFullName || "");
          setValue("parentEmail", result.data.parentEmail || emailFromQuery);
          setValue("parentPhone", result.data.parentPhone || "");
          setValue("parentOccupation", result.data.parentOccupation || "");
          setValue("parentCity", result.data.parentCity || "");
          setValue("parentEthnicity", result.data.parentEthnicity || "");
          setValue("relationToChild", result.data.relationToChild || "");
        }
      } catch (error) {
        console.error('Error fetching parent details:', error);
        // Don't show error to user, just continue with empty form
      } finally {
        setIsLoadingParentDetails(false);
      }
    };

    if (emailFromQuery) {
      setValue("parentEmail", emailFromQuery);
      fetchParentDetails();
    }
  }, [emailFromQuery, setValue]);

  const schoolType = watch("childSchoolType");

  const onSubmit = async (data: FormValues) => {
    try {
      
      const result = await apiService.post("/api/application", data);
      
      if (result?.success) {
        toast.success("Application submitted successfully");
        
        // Check if user has password set
        if (result.data?.hasPassword || result.data?.redirectToLogin) {
          // User already has password, redirect to login
          // toast.success("Redirecting to login...");
          setTimeout(() => {
            router.push("/auth/login");
          }, 1000);
        } else {
          // User needs to set password
          setSubmittedEmail(data.parentEmail);
          setShowPasswordModal(true);
        }
      } else {
        // Display specific error message if available
        const errorMessage = result.message || "Application submission failed";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      console.error('Form submission failed:', error);
      
      // Extract error message from API response
      let errorMessage = "Application submission failed";
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        // Remove status code prefix if present (e.g., "409 An application...")
        errorMessage = error.message.replace(/^\d+\s+/, '');
      }
      
      toast.error(errorMessage);
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    try {
      const result = await apiService.post("/api/auth/set-password", { email: submittedEmail, password });
      if(result.success) {
        toast.success("Password set successfully");
        // After password is set, redirect to login
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      } else {
        toast.error("Password setup failed");
      }
    } catch (error) {
      console.error('Password setup failed:', error);
      throw error;
    }
  };

  return (
    // g:[clip-path:polygon(0%_0%,100%_0%,100%_3%,100%_100%,18%_100%,0%_77%)]  xl:[clip-path:polygon(0%_0%,100%_0%,100%_3%,100%_100%,12%_100%,0%_77%)] 
    <div className="relative w-full h-screen overflow-hidden bg-white slide-in-right p-2">
      <div
        className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#C9D0D5] to-[#A7CFE6] h-full"
      >
        {/* bottom-left angled white corner like main page */}
        {/* <div className="hidden sm:flex absolute left-0 bottom-0 z-10 w-[65vw] sm:w-[55vw] md:w-[50vw] lg:w-[45vw] xl:w-[40vw] h-[30vh] sm:h-[35vh] md:h-[38vh] lg:h-[40vh] xl:h-[42vh] bg-white angle-corner" /> */}
        <div className="relative z-20 h-full flex items-center justify-center p-1 sm:p-2 md:p-2 lg:p-2">
          <div className="w-full h-full rounded-2xl flex flex-col overflow-hidden">
          <div className="px-4 border-b flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Pre-Assessment Phase Form</h1>
            <p className="text-slate-600 mt-2">Please complete the following form to help us better understand your child and family's needs.</p>
            {isLoadingParentDetails && (
              <p className="text-sm text-blue-600 mt-2">Loading your previous details...</p>
            )}
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
                      <FormField label={<span>Full Name <span className="text-red-500">*</span></span>} htmlFor="parentFullName" error={errors.parentFullName}>
                        <Input id="parentFullName" placeholder="Jane Doe" {...register("parentFullName")} error={!!errors.parentFullName} className="" />
                      </FormField>
                      <FormField label={<span>Email Address <span className="text-red-500">*</span></span>} htmlFor="parentEmail" error={errors.parentEmail}>
                        <Input id="parentEmail" type="email" placeholder="you@example.com" {...register("parentEmail")} error={!!errors.parentEmail} />
                      </FormField>
                      <FormField label={<span>Phone Number <span className="text-red-500">*</span></span>} htmlFor="parentPhone" error={errors.parentPhone}>
                        <Input id="parentPhone" placeholder="+973 ..." {...register("parentPhone")} error={!!errors.parentPhone} />
                      </FormField>
                      <FormField label="Occupation (optional)" htmlFor="parentOccupation" error={errors.parentOccupation as any}>
                        <Input id="parentOccupation" placeholder="e.g., Engineer, Teacher" {...register("parentOccupation")} error={!!(errors as any).parentOccupation} />
                      </FormField>
                      <FormField label={<span>Relation to Child <span className="text-red-500">*</span></span>} htmlFor="relationToChild" error={errors.relationToChild}>
                        <select
                          id="relationToChild"
                          defaultValue=""
                          {...register("relationToChild")}
                          className={`w-full rounded-xl border px-3 py-3 bg-transparent text-slate-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition ${
                            errors.relationToChild ? "border-red-300" : "border-slate-400"
                          }`}
                        >
                          <option value="" className="py-3" disabled>
                            Select relation...
                          </option>
                          <option value="1" className="py-3">Father</option>
                          <option value="2" className="py-3"  >Mother</option>
                          <option value="3" className="py-3">Guardian</option>
                        </select>
                      </FormField>
                      <FormField label={<span>City/Location <span className="text-red-500">*</span></span>} htmlFor="parentCity" error={errors.parentCity}>
                        <Input id="parentCity" placeholder="Manama" {...register("parentCity")} error={!!errors.parentCity} />
                      </FormField>
                      <FormField label={<span>Ethnicity (you may list multiple) <span className="text-red-500">*</span></span>} htmlFor="parentEthnicity" error={errors.parentEthnicity}>
                        <Input id="parentEthnicity" placeholder="e.g., Bahraini, Indian" {...register("parentEthnicity")} error={!!errors.parentEthnicity} />
                      </FormField>
                    </div>
                  </section>

                  {/* Caregiver */}
                  <section className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Caregiver/Nanny Contact Details (if applicable)</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label={<span>Full Name <span className="text-red-500">*</span></span>} htmlFor="caregiverFullName" error={errors.caregiverFullName}>
                        <Input id="caregiverFullName" placeholder="Name" {...register("caregiverFullName")} error={!!errors.caregiverFullName} />
                      </FormField>
                      <FormField label={<span>Phone Number <span className="text-red-500">*</span></span>} htmlFor="caregiverPhone" error={errors.caregiverPhone}>
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
                      <FormField label={<span>Full Name <span className="text-red-500">*</span></span>} htmlFor="childFullName" error={errors.childFullName}>
                        <Input id="childFullName" placeholder="Child name" {...register("childFullName")} error={!!errors.childFullName} />
                      </FormField>
                      
                      <FormField label={<span>Age <span className="text-red-500">*</span></span>} htmlFor="childAge" error={errors.childAge as any}>
                        <Input id="childAge" type="number" min={1} max={18} placeholder="8" {...register("childAge")} error={!!errors.childAge} />
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
                      <FormField label={<span>Current School Type <span className="text-red-500">*</span></span>} htmlFor="childSchoolType" error={errors.childSchoolType as any}>
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
                    <FormField label={<span>What excites you most about this school? <span className="text-red-500">*</span></span>} htmlFor="qExcitesMost" error={errors.qExcitesMost}>
                      <textarea id="qExcitesMost" rows={4} className="w-full rounded-xl border border-slate-500 px-4 py-3 bg-transparent text-slate-900 focus:outline-none focus:ring-2 focus:ring-gray-600" {...register("qExcitesMost")} />
                    </FormField>
                    <FormField label={<span>What makes you consider a non-traditional education model? <span className="text-red-500">*</span></span>} htmlFor="qNonTraditionalReason" error={errors.qNonTraditionalReason}>
                      <textarea id="qNonTraditionalReason" rows={4} className="w-full rounded-xl border border-slate-500 px-4 py-3 bg-transparent text-slate-900 focus:outline-none focus:ring-2 focus:ring-gray-600" {...register("qNonTraditionalReason")} />
                    </FormField>
                    <FormField label={<span>What is your biggest hope for your child's future? <span className="text-red-500">*</span></span>} htmlFor="qBiggestHope" error={errors.qBiggestHope}>
                      <textarea id="qBiggestHope" rows={4} className="w-full rounded-xl border border-slate-500 px-4 py-3 bg-transparent text-slate-900 focus:outline-none focus:ring-2 focus:ring-gray-600" {...register("qBiggestHope")} />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <FormField label={<span>Do you believe your child enjoys using technology to learn? <span className="text-red-500">*</span></span>} htmlFor="enjoysTech" error={errors.enjoysTech as any}>
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
                    <FormField label={<span>Do you believe your child enjoys hands-on experiential learning? <span className="text-red-500">*</span></span>} htmlFor="enjoysHandsOn" error={errors.enjoysHandsOn as any}>
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

                <section className="pt-2 border-t lg:pb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Consent</h2>
                  <div className="space-y-2 text-sm text-slate-700">
                    <label className="flex items-center gap-3"><input type="checkbox" {...register("consentContact")} /> <span>I agree to be contacted by a member of the admissions team</span></label>
                    {errors.consentContact && <p className="text-xs text-red-600">{errors.consentContact.message}</p>}
                    <label className="flex items-center  gap-3"><input type="checkbox" {...register("consentUpdates")} /> <span>I give permission to receive updates about the school</span></label>
                    {errors.consentUpdates && <p className="text-xs text-red-600">{errors.consentUpdates.message}</p>}
                    <label className="flex items-center gap-3"><input type="checkbox" {...register("consentBiometric")} /> <span>I consent to the use of biometric data for learning optimization (optional)</span></label>
                  </div>
                </section>
              </div>
            </div>
            {/* 9746215919, 9847463335 */}

            {/* Bottom fixed submit bar inside container */}
            <div className="p-4 sm:p-2 flex-shrink-0">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="[clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)]  w-full sm:w-auto min-w-40 cursor-pointer bg-gradient-to-r from-[#8EC0C2] to-[#142954] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
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


