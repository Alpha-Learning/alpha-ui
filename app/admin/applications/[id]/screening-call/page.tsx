"use client";
import React from "react";
import { useParams } from "next/navigation";
import { FormField, Input } from "@/app/components/forms/FormField";

export default function ScreeningCallFormPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <div className="mb-4">
          <div className="text-xl font-bold text-slate-900">Screening Call & Flow Script</div>
          <div className="text-sm text-slate-600">Application ID: {params.id}</div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            {/* General Information */}
            <section>
              <div className="text-sm font-semibold text-white bg-teal-700 px-3 py-2 rounded">General Information</div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Full Name" htmlFor="fullName">
                  <Input id="fullName" placeholder="Full Name" />
                </FormField>
                <FormField label="Child’s Name" htmlFor="childName">
                  <Input id="childName" placeholder="Child’s Name" />
                </FormField>
                <FormField label="Date" htmlFor="date">
                  <Input id="date" type="date" />
                </FormField>
                <FormField label="Caller Name" htmlFor="callerName">
                  <Input id="callerName" placeholder="Caller Name" />
                </FormField>
                <div className="md:col-span-2 flex text-slate-700 items-center gap-6 text-sm">
                  <span>CRM Lead Tag:</span>
                  <label className="flex items-center gap-2 text-slate-700"><input type="checkbox" /> Hot</label>
                  <label className="flex items-center gap-2 text-slate-700"><input type="checkbox" /> Warm</label>
                  <label className="flex items-center gap-2 text-slate-700"><input type="checkbox" /> Cold</label>
                </div>
              </div>
            </section>

            {/* Introduction */}
            <section>
              <div className="text-sm font-semibold text-white bg-teal-700 px-3 py-2 rounded">Introduction (1 min)</div>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p>Hello [Parent Name], I’m [Your Name] from Alphera Academy.</p>
                <p>Thank you for your interest in our innovative learning approach.</p>
                <p>This call is to better understand your child’s needs and share how Alphera Academy might be a great fit.</p>
              </div>
              <div className="mt-3 flex items-center text-slate-700 gap-6 text-sm">
                <span>Interview Recording Permission:</span>
                <label className="flex items-center gap-2"><input type="radio" name="recording" /> Yes</label>
                <label className="flex items-center gap-2"><input type="radio" name="recording" /> No</label>
              </div>
            </section>

            {/* Overview */}
            <section>
              <div className="text-sm font-semibold text-white bg-teal-700 px-3 py-2 rounded">Alphera Academy Overview (3 min)</div>
              <ul className="mt-3 list-decimal pl-5 text-sm text-slate-700 space-y-1">
                <li>British core curriculum + experiential learning</li>
                <li>Human-led STEM, arts, entrepreneurship</li>
                <li>Personalised, non-traditional model tailored to each learner</li>
              </ul>
            </section>

            {/* Parent Warm-Up */}
            <section>
              <div className="text-sm font-semibold text-white bg-teal-700 px-3 py-2 rounded">Parent Warm-Up Questions (5 min)</div>
              <ol className="mt-3 space-y-5 text-slate-700">
                <li>
                  <div className="text-sm">What made you fill out the application form?</div>
                  <textarea className="mt-2 w-full border rounded px-3 py-2 text-slate-900 placeholder:text-slate-400" rows={4} />
                </li>
                <li>
                  <div className="text-sm">What are you looking for that your current school may not provide?</div>
                  <textarea className="mt-2 w-full border rounded px-3 py-2 text-slate-900 placeholder:text-slate-400" rows={4} />
                </li>
                <li>
                  <div className="text-sm">How does your child respond to learning with technology at home?</div>
                  <textarea className="mt-2 w-full border rounded px-3 py-2 text-slate-900 placeholder:text-slate-400" rows={4} />
                </li>
              </ol>
            </section>

            {/* Fit Clarification */}
            <section>
              <div className="text-sm font-semibold text-white bg-teal-700 px-3 py-2 rounded">Fit Clarification (3 min)</div>
              <ol className="mt-3 space-y-5 text-slate-700">
                <li>
                  <div className="text-sm">Are you open to a flexible, tech-supported model without constant adult direction?</div>
                  <textarea className="mt-2 w-full border rounded px-3 py-2 text-slate-900 placeholder:text-slate-400" rows={3} />
                </li>
                <li>
                  <div className="text-sm">What does your child do in their free time?</div>
                  <textarea className="mt-2 w-full border rounded px-3 py-2 text-slate-900 placeholder:text-slate-400" rows={3} />
                </li>
                <li>
                  <div className="text-sm">How comfortable are you with adaptive learning technology?</div>
                  <textarea className="mt-2 w-full border rounded px-3 py-2 text-slate-900 placeholder:text-slate-400" rows={3} />
                </li>
              </ol>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8 lg:pl-4">
            {/* Notes panels */}
            <section>
              <div className="text-sm font-semibold text-white bg-teal-700 px-3 py-2 rounded">Notes</div>
              <textarea className="mt-3 w-full border rounded px-3 py-2 text-slate-900 placeholder:text-slate-400" rows={6} placeholder="General Notes" />
            </section>

            <section>
              <div className="text-sm font-semibold text-white bg-teal-700 px-3 py-2 rounded">Notes / Parent Reactions</div>
              <textarea className="mt-3 w-full border rounded px-3 py-2 text-slate-900 placeholder:text-slate-400" rows={8} placeholder="Parent reactions during overview" />
            </section>

            {/* Next Steps */}
            <section>
              <div className="text-sm font-semibold text-white bg-teal-700 px-3 py-2 rounded">Next Steps (3 min)</div>
              <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="checkbox" /> Comprehensive Questionnaires x3</label>
                <label className="flex items-center gap-2"><input type="checkbox" /> Guidebook / Additional Info</label>
                <FormField label="Schedule Facility Walk-Through (Date)" htmlFor="walkthroughDate">
                  <Input id="walkthroughDate" placeholder="e.g., 2025-09-30 10:00" />
                </FormField>
                <FormField label="Confirm Invite to Assessment Day" htmlFor="assessmentInvite">
                  <Input id="assessmentInvite" placeholder="Add note or date" />
                </FormField>
              </div>
              <textarea className="mt-3 w-full border rounded px-3 py-2 text-slate-900 placeholder:text-slate-400" rows={6} placeholder="Additional Notes / Observations" />
            </section>

            <div className="flex items-center justify-end gap-3">
              <button className="px-4 py-2 rounded border text-slate-700">Save Draft</button>
              <button className="[clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)]  cursor-pointer py-3 flex justify-between items-center bg-gradient-to-r from-[#8EC0C2] to-[#142954] text-white rounded-lg px-4 hover:brightness-[1.05] active:brightness-95 transition-all">Save & Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


