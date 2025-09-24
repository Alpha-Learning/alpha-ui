"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, Input } from "@/app/components/forms/FormField";

const schema = z.object({
  // Parent/Guardian
  parentFullName: z.string().min(2, "Full name is required"),
  parentEmail: z.string().email("Enter a valid email"),
  parentPhone: z.string().optional(),
  parentCity: z.string().optional(),
  parentEthnicity: z.string().optional(),

  // Child
  childFullName: z.string().min(2, "Child name is required"),
  childAge: z.coerce.number().int().min(1).max(18).optional(),
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

export default function PreAssessmentFormPage() {
  const params = useSearchParams();
  const router = useRouter();
  const emailFromQuery = params.get("email") || "";

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
      enjoysTech: "Not Sure",
      enjoysHandsOn: "Not Sure",
    },
  });

  useEffect(() => {
    if (emailFromQuery) setValue("parentEmail", emailFromQuery);
  }, [emailFromQuery, setValue]);

  const schoolType = watch("childSchoolType");

  const onSubmit = async (data: FormValues) => {
    // Placeholder submit — replace with API call
    console.log("Pre-Assessment submission", data);
    router.push("/form/thanks");
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto w-full max-w-4xl bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Pre-Assessment Phase Form</h1>
        <p className="text-slate-600 mt-2 mb-6">Please complete the following form to help us better understand your child and family’s needs.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Parent/Guardian */}
          <section>
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
            <h2 className="text-xl font-bold text-slate-900 mb-4">Child Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Full Name" htmlFor="childFullName" error={errors.childFullName}>
                <Input id="childFullName" placeholder="Child name" {...register("childFullName")} error={!!errors.childFullName} />
              </FormField>
              <FormField label="Age" htmlFor="childAge" error={errors.childAge as any}>
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

          {/* Caregiver */}
          <section>
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

          {/* Questions */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Parent Questions</h2>
            <div className="grid grid-cols-1 gap-4">
              <FormField label="What excites you most about this school?" htmlFor="qExcitesMost" error={errors.qExcitesMost}>
                <textarea id="qExcitesMost" rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600" {...register("qExcitesMost")} />
              </FormField>
              <FormField label="What makes you consider a non-traditional education model?" htmlFor="qNonTraditionalReason" error={errors.qNonTraditionalReason}>
                <textarea id="qNonTraditionalReason" rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600" {...register("qNonTraditionalReason")} />
              </FormField>
              <FormField label="What is your biggest hope for your child’s future?" htmlFor="qBiggestHope" error={errors.qBiggestHope}>
                <textarea id="qBiggestHope" rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600" {...register("qBiggestHope")} />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <FormField label="Do you believe your child enjoys using technology to learn?" htmlFor="enjoysTech" error={errors.enjoysTech as any}>
                <div className="flex gap-4 text-sm text-slate-700">
                  {["Yes", "No", "Not Sure"].map((opt) => (
                    <label key={opt} className="inline-flex items-center gap-2"><input type="radio" value={opt} {...register("enjoysTech")} /><span>{opt}</span></label>
                  ))}
                </div>
              </FormField>
              <FormField label="Do you believe your child enjoys hands-on experiential learning?" htmlFor="enjoysHandsOn" error={errors.enjoysHandsOn as any}>
                <div className="flex gap-4 text-sm text-slate-700">
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

          <div className="pt-2">
            <button type="submit" disabled={isSubmitting} className="[clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)] rounded-xl bg-gradient-to-r from-sky-400 to-blue-700 text-white font-semibold px-6 py-3 shadow-md hover:from-sky-500 hover:to-blue-800 transition disabled:opacity-60">
              {isSubmitting ? "Submitting…" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}


