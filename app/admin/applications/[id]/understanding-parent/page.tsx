"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, Input, Textarea, FormSectionHeader } from "@/app/components/forms/FormField";
import { apiService } from "@/app/utils";

const schema = z.object({
  childName: z.string().optional(),
  age: z.string().optional(),
  date: z.string().optional(),
  examiner: z.string().optional(),
  occupation: z.string().optional(),
  // grid as json encoded string for simplicity in form handling
  grid: z.any().optional(),
  additionalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function UnderstandingParentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      childName: "",
      age: "",
      date: "",
      examiner: "",
      occupation: "",
      grid: {},
      additionalNotes: "",
    },
  });

  useEffect(() => {
    (async () => {
      const res = await apiService.get(`/api/admin/understanding-parent?applicationId=${params.id}`);
      const appRes = await apiService.getApplicationData(params.id);
      if (res.success && res.data) {
        reset({
          childName: res.data.childName || "",
          age: res.data.age || "",
          date: res.data.date || "",
          examiner: res.data.examiner || "",
          occupation: res.data.occupation || "",
          grid: res.data.grid || {},
          additionalNotes: res.data.additionalNotes || "",
        });
      } else if (appRes.success && appRes.data) {
        reset({
          childName: appRes.data.childFullName || "",
          age: appRes.data.childAge ? String(appRes.data.childAge) : "",
          date: "",
          examiner: "",
          occupation: "",
          grid: {},
          additionalNotes: "",
        });
      }
    })();
  }, [params.id, reset, setValue]);

  const onSubmit = async (values: FormValues) => {
    setSaving(true);
    try {
      const response = await apiService.post("/api/admin/understanding-parent", {
        applicationId: params.id,
        ...values,
      });
      if (response.success) {
        router.push(`/admin/applications/${params.id}`);
      } else {
        alert(`Error saving form: ${response.error || "Unknown error"}`);
      }
    } catch (e) {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <div className="text-xl font-bold text-slate-900">Understanding the Parent</div>
        <div className="text-sm text-slate-600">Application ID: {params.id}</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Child Information */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader title="Understanding the Parent" bgClassName="bg-teal-700" />
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Child Name" htmlFor="childName">
              <Input id="childName" {...register("childName")} />
            </FormField>
            <FormField label="Age" htmlFor="age">
              <Input id="age" {...register("age")} />
            </FormField>
            <FormField label="Date" htmlFor="date">
              <Input id="date" type="date" {...register("date")} />
            </FormField>
            <FormField label="Examiner" htmlFor="examiner">
              <Input id="examiner" {...register("examiner")} />
            </FormField>
            <FormField label="Occupation (both parents)" htmlFor="occupation">
              <Input id="occupation" {...register("occupation")} />
            </FormField>
          </div>
        </section>

        {/* Guided Activity Ratings Grid */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader title="Guided Activity Ratings Grid" bgClassName="bg-teal-700" />
          <div className="mt-3 text-slate-700 mb-4">
            <p>Select categories and add qualitative justification/evidence.</p>
          </div>

          <div className="space-y-6">
            {/* Parenting Style */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Parenting Style</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-slate-700 text-sm">
                  {[
                    "Structured & Supportive",
                    "Permissive",
                    "Authoritarian",
                    "Neglectful",
                    "Growth-Oriented",
                    "Resilience-Building",
                    "Inconsistent",
                    "Flexible & Adaptive",
                    "Highly Directive",
                    "Passive/Withdrawn",
                    "Child-Led",
                  ].map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" {...register(`grid.parentingStyle.${label}` as any)} className="h-4 w-4 text-teal-600 border-gray-300 rounded" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <Textarea rows={6} placeholder="Qualitative Justification / Evidence" {...register("grid.parentingStyleNotes" as any)} />
                </div>
              </div>
            </div>

            {/* Mindset Orientation */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Mindset Orientation</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-slate-700 text-sm">
                  {[
                    "Fixed",
                    "Defensive",
                    "Unclear",
                    "Growth-Oriented",
                    "Open to New Ideas",
                    "Self-Reflective",
                    "Resistant to Change",
                    "Curious but Hesitant",
                    "Actively Learning-Oriented",
                  ].map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" {...register(`grid.mindset.${label}` as any)} className="h-4 w-4 text-teal-600 border-gray-300 rounded" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <Textarea rows={6} placeholder="Qualitative Justification / Evidence" {...register("grid.mindsetNotes" as any)} />
                </div>
              </div>
            </div>

            {/* Technology & Data Perspective */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Technology & Data Perspective</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-slate-700 text-sm">
                  {[
                    "Supportive & Curious",
                    "Sceptical but Open",
                    "Resistant",
                    "Privacy-Conscious but Cooperative",
                    "Technologically Anxious",
                    "Actively Resistant",
                    "Fully Embracing",
                    "Uninformed / Needs Guidance",
                  ].map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" {...register(`grid.techPerspective.${label}` as any)} className="h-4 w-4 text-teal-600 border-gray-300 rounded" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <Textarea rows={6} placeholder="Qualitative Justification / Evidence" {...register("grid.techPerspectiveNotes" as any)} />
                </div>
              </div>
            </div>

            {/* Parent Involvement Style */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Parent Involvement Style</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-slate-700 text-sm">
                  {[
                    "Over-Involved (Controlling)",
                    "Balanced (Supportive)",
                    "Detached (Disengaged)",
                    "Hovering",
                    "Enabling Dependence",
                    "Respectful of Autonomy",
                    "Passive / Hands-off",
                    "Highly Collaborative",
                  ].map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" {...register(`grid.involvement.${label}` as any)} className="h-4 w-4 text-teal-600 border-gray-300 rounded" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <Textarea rows={6} placeholder="Qualitative Justification / Evidence" {...register("grid.involvementNotes" as any)} />
                </div>
              </div>
            </div>

            {/* Response to Failure & Mistakes */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Response to Failure & Mistakes</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-slate-700 text-sm">
                  {[
                    "Accepting & Reflective",
                    "Overprotective",
                    "Blaming",
                    "Encouraging Autonomy",
                    "Anxious About Failure",
                    "Uses as Teaching Moment",
                    "Avoidant of Discomfort",
                    "Growth-Minded Support",
                  ].map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" {...register(`grid.responseToFailure.${label}` as any)} className="h-4 w-4 text-teal-600 border-gray-300 rounded" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <Textarea rows={6} placeholder="Qualitative Justification / Evidence" {...register("grid.responseToFailureNotes" as any)} />
                </div>
              </div>
            </div>

            {/* Support Capacity */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Support Capacity</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-slate-700 text-sm">
                  {[
                    "Highly Supportive & Seeks Guidance",
                    "Struggles but Willing",
                    "Overwhelmed & Resistant",
                    "Reliable but Limited Capacity",
                    "Inconsistent Support",
                    "Eager to Learn Systems",
                    "Needs Additional Resources",
                  ].map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" {...register(`grid.supportCapacity.${label}` as any)} className="h-4 w-4 text-teal-600 border-gray-300 rounded" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <Textarea rows={6} placeholder="Qualitative Justification / Evidence" {...register("grid.supportCapacityNotes" as any)} />
                </div>
              </div>
            </div>

            {/* Alignment with School Philosophy */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Alignment with School Philosophy</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-slate-700 text-sm">
                  {[
                    "Strong Alignment",
                    "Needs Orientation",
                    "Low Alignment",
                    "Philosophically Resistant",
                    "Curious but Sceptical",
                    "Enthusiastic Champion",
                    "Conflicted Values",
                    "Open with Reservations",
                  ].map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" {...register(`grid.alignment.${label}` as any)} className="h-4 w-4 text-teal-600 border-gray-300 rounded" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <Textarea rows={6} placeholder="Qualitative Justification / Evidence" {...register("grid.alignmentNotes" as any)} />
                </div>
              </div>
            </div>

            {/* Willingness to Learn and Collaborate */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Willingness to Learn and Collaborate</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-slate-700 text-sm">
                  {[
                    "Proactive & Enthusiastic",
                    "Cautious but Open",
                    "Reluctant",
                    "Resistant",
                    "Selectively Engaged",
                    "Actively Participating",
                    "Needs Persuasion",
                    "Potential Workshop Participant",
                  ].map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" {...register(`grid.willingness.${label}` as any)} className="h-4 w-4 text-teal-600 border-gray-300 rounded" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <Textarea rows={6} placeholder="Qualitative Justification / Evidence" {...register("grid.willingnessNotes" as any)} />
                </div>
              </div>
            </div>

            {/* Psychosocial Stability & Environment */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Psychosocial Stability & Environment</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-slate-700 text-sm">
                  {[
                    "Stable",
                    "Transitional",
                    "High-Stress",
                    "Resource-Limited",
                    "Multi-Caregiver Household",
                    "Recent Family Changes",
                    "Consistent Daily Routines",
                    "Emotional Safety Observed",
                    "Potential Trauma History",
                    "Predictable vs. Chaotic Routines",
                  ].map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" {...register(`grid.psychosocial.${label}` as any)} className="h-4 w-4 text-teal-600 border-gray-300 rounded" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <Textarea rows={6} placeholder="Qualitative Justification / Evidence" {...register("grid.psychosocialNotes" as any)} />
                </div>
              </div>
            </div>

            {/* Caregiver / Nanny / Outside Perspective */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Caregiver / Nanny / Outside Perspective</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-slate-700 text-sm">
                  {[
                    "Consistent with Parent",
                    "Conflicting Viewpoints",
                    "Provides Emotional Safety",
                    "Overly Directive",
                    "Passive / Detached",
                    "Reliable Support",
                    "Limited Authority",
                    "Additional Insight Needed",
                  ].map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" {...register(`grid.caregiverPerspective.${label}` as any)} className="h-4 w-4 text-teal-600 border-gray-300 rounded" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <Textarea rows={6} placeholder="Qualitative Justification / Evidence" {...register("grid.caregiverPerspectiveNotes" as any)} />
                </div>
              </div>
            </div>

            {/* Cultural Fit & Expectations */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Cultural Fit & Expectations</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-slate-700 text-sm">
                  {[
                    "Vision-Aligned",
                    "Short-Term Academic Focused",
                    "Rigid Traditional Expectations",
                    "Balanced Academic & Holistic Goals",
                    "High-Pressure Academic",
                    "Flexible / Future-Ready Mindset",
                    "Cultural Considerations Impact Learning",
                  ].map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" {...register(`grid.culturalFit.${label}` as any)} className="h-4 w-4 text-teal-600 border-gray-300 rounded" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <Textarea rows={6} placeholder="Qualitative Justification / Evidence" {...register("grid.culturalFitNotes" as any)} />
                </div>
              </div>
            </div>

            {/* Participation Readiness in School System */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">Participation Readiness in School System</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-slate-700 text-sm">
                  {[
                    "Highly Likely to Engage",
                    "May Need Encouragement",
                    "Likely Minimal Participation",
                    "Requires Orientation",
                    "Open but Needs Support",
                    "Resistant to Co-Assessment",
                    "Eager to be Partner",
                    "Will Need Continued Check-Ins",
                  ].map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" {...register(`grid.participationReadiness.${label}` as any)} className="h-4 w-4 text-teal-600 border-gray-300 rounded" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <Textarea rows={6} placeholder="Qualitative Justification / Evidence" {...register("grid.participationReadinessNotes" as any)} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Notes */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader title="Additional Notes" bgClassName="bg-teal-700 mb-2" />
          <Textarea rows={6} {...register("additionalNotes")} />
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}


