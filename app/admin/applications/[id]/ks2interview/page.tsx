"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  Input,
  Textarea,
  FormSectionHeader,
} from "@/app/components/forms/FormField";
import { apiService } from "@/app/utils";

const schema = z.object({
  // Child Information (required)
  fullName: z.string().min(1, "Required"),
  age: z.string().min(1, "Required"),
  date: z.string().optional(),
  
  // Interview Questions (1-20) - all required except learningPreference
  somethingAlwaysWantedToLearn: z.string().min(1, "Required"),
  somethingAlwaysWantedToLearnNotes: z.string().optional(),
  fiveThingsWithPaperclip: z.string().min(1, "Required"),
  fiveThingsWithPaperclipNotes: z.string().optional(),
  finishSchoolworkEarly: z.string().min(1, "Required"),
  finishSchoolworkEarlyNotes: z.string().optional(),
  logicChallenge: z.string().min(1, "Required"),
  logicChallengeNotes: z.string().optional(),
  somethingHard: z.string().min(1, "Required"),
  somethingHardNotes: z.string().optional(),
  answerIsWrong: z.string().min(1, "Required"),
  answerIsWrongNotes: z.string().optional(),
  favouriteThingOnComputer: z.string().min(1, "Required"),
  favouriteThingOnComputerNotes: z.string().optional(),
  likeWorkingWithOthers: z.string().min(1, "Required"),
  likeWorkingWithOthersNotes: z.string().optional(),
  drawMachineInvention: z.string().min(1, "Required"),
  drawMachineInventionNotes: z.string().optional(),
  confidenceTryingNewThings: z.string().min(1, "Required"),
  confidenceTryingNewThingsNotes: z.string().optional(),
  helpedSomeoneLearn: z.string().min(1, "Required"),
  helpedSomeoneLearnNotes: z.string().optional(),
  magicWandMakesSmarter: z.string().min(1, "Required"),
  magicWandMakesSmarterNotes: z.string().optional(),
  explainInternetToPast: z.string().min(1, "Required"),
  explainInternetToPastNotes: z.string().optional(),
  inChargeOfWorld: z.string().min(1, "Required"),
  inChargeOfWorldNotes: z.string().optional(),
  threeThingsGoodAt: z.string().min(1, "Required"),
  threeThingsGoodAtNotes: z.string().optional(),
  somethingGetBetterAt: z.string().min(1, "Required"),
  somethingGetBetterAtNotes: z.string().optional(),
  inventJobDoesntExist: z.string().min(1, "Required"),
  inventJobDoesntExistNotes: z.string().optional(),
  learningPreference: z.string().optional(), // Not scored
  digitalTasks: z.string().min(1, "Required"),
  digitalTasksNotes: z.string().optional(),
  playingWithFriends: z.string().min(1, "Required"),
  playingWithFriendsNotes: z.string().optional(),
  
  // Parental Interference
  parentalInterferenceFlagged: z.boolean().default(false),
  parentalInterferenceNotes: z.string().optional(),
  
  // Total Score
  totalScore: z.string().optional(),
  
  // Office Use Only (optional)
  applicationNumber: z.string().optional(),
  observerName: z.string().optional(),
  assessmentDate: z.string().optional(),
  loggedToSystemDate: z.string().optional(),
  loggedBy: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function KS2InterviewQuestionsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  // Removed auto default of today's date; using user-provided Date field
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      age: "",
      date: "",
      somethingAlwaysWantedToLearn: "",
      somethingAlwaysWantedToLearnNotes: "",
      fiveThingsWithPaperclip: "",
      fiveThingsWithPaperclipNotes: "",
      finishSchoolworkEarly: "",
      finishSchoolworkEarlyNotes: "",
      logicChallenge: "",
      logicChallengeNotes: "",
      somethingHard: "",
      somethingHardNotes: "",
      answerIsWrong: "",
      answerIsWrongNotes: "",
      favouriteThingOnComputer: "",
      favouriteThingOnComputerNotes: "",
      likeWorkingWithOthers: "",
      likeWorkingWithOthersNotes: "",
      drawMachineInvention: "",
      drawMachineInventionNotes: "",
      confidenceTryingNewThings: "",
      confidenceTryingNewThingsNotes: "",
      helpedSomeoneLearn: "",
      helpedSomeoneLearnNotes: "",
      magicWandMakesSmarter: "",
      magicWandMakesSmarterNotes: "",
      explainInternetToPast: "",
      explainInternetToPastNotes: "",
      inChargeOfWorld: "",
      inChargeOfWorldNotes: "",
      threeThingsGoodAt: "",
      threeThingsGoodAtNotes: "",
      somethingGetBetterAt: "",
      somethingGetBetterAtNotes: "",
      inventJobDoesntExist: "",
      inventJobDoesntExistNotes: "",
      learningPreference: "",
      digitalTasks: "",
      digitalTasksNotes: "",
      playingWithFriends: "",
      playingWithFriendsNotes: "",
      parentalInterferenceFlagged: false,
      parentalInterferenceNotes: "",
      totalScore: "",
      applicationNumber: "",
      observerName: "",
      assessmentDate: "",
      loggedToSystemDate: "",
      loggedBy: "",
    },
  });

  useEffect(() => {
    (async () => {
      // Load existing form data
      const res = await apiService.get(
        `/api/admin/ks2-interview-questions?applicationId=${params.id}`
      );
      
      // Load application data for auto-filling
      const appRes = await apiService.getApplicationData(params.id);
      
      if (res.success && res.data) {
        // Use existing form data
        reset({
          fullName: res.data.fullName || "",
          age: res.data.age || "",
          date: res.data.date || "",
          somethingAlwaysWantedToLearn: res.data.somethingAlwaysWantedToLearn || "",
          somethingAlwaysWantedToLearnNotes: res.data.somethingAlwaysWantedToLearnNotes || "",
          fiveThingsWithPaperclip: res.data.fiveThingsWithPaperclip || "",
          fiveThingsWithPaperclipNotes: res.data.fiveThingsWithPaperclipNotes || "",
          finishSchoolworkEarly: res.data.finishSchoolworkEarly || "",
          finishSchoolworkEarlyNotes: res.data.finishSchoolworkEarlyNotes || "",
          logicChallenge: res.data.logicChallenge || "",
          logicChallengeNotes: res.data.logicChallengeNotes || "",
          somethingHard: res.data.somethingHard || "",
          somethingHardNotes: res.data.somethingHardNotes || "",
          answerIsWrong: res.data.answerIsWrong || "",
          answerIsWrongNotes: res.data.answerIsWrongNotes || "",
          favouriteThingOnComputer: res.data.favouriteThingOnComputer || "",
          favouriteThingOnComputerNotes: res.data.favouriteThingOnComputerNotes || "",
          likeWorkingWithOthers: res.data.likeWorkingWithOthers || "",
          likeWorkingWithOthersNotes: res.data.likeWorkingWithOthersNotes || "",
          drawMachineInvention: res.data.drawMachineInvention || "",
          drawMachineInventionNotes: res.data.drawMachineInventionNotes || "",
          confidenceTryingNewThings: res.data.confidenceTryingNewThings || "",
          confidenceTryingNewThingsNotes: res.data.confidenceTryingNewThingsNotes || "",
          helpedSomeoneLearn: res.data.helpedSomeoneLearn || "",
          helpedSomeoneLearnNotes: res.data.helpedSomeoneLearnNotes || "",
          magicWandMakesSmarter: res.data.magicWandMakesSmarter || "",
          magicWandMakesSmarterNotes: res.data.magicWandMakesSmarterNotes || "",
          explainInternetToPast: res.data.explainInternetToPast || "",
          explainInternetToPastNotes: res.data.explainInternetToPastNotes || "",
          inChargeOfWorld: res.data.inChargeOfWorld || "",
          inChargeOfWorldNotes: res.data.inChargeOfWorldNotes || "",
          threeThingsGoodAt: res.data.threeThingsGoodAt || "",
          threeThingsGoodAtNotes: res.data.threeThingsGoodAtNotes || "",
          somethingGetBetterAt: res.data.somethingGetBetterAt || "",
          somethingGetBetterAtNotes: res.data.somethingGetBetterAtNotes || "",
          inventJobDoesntExist: res.data.inventJobDoesntExist || "",
          inventJobDoesntExistNotes: res.data.inventJobDoesntExistNotes || "",
          learningPreference: res.data.learningPreference || "",
          digitalTasks: res.data.digitalTasks || "",
          digitalTasksNotes: res.data.digitalTasksNotes || "",
          playingWithFriends: res.data.playingWithFriends || "",
          playingWithFriendsNotes: res.data.playingWithFriendsNotes || "",
          parentalInterferenceFlagged: res.data.parentalInterferenceFlagged || false,
          parentalInterferenceNotes: res.data.parentalInterferenceNotes || "",
          totalScore: res.data.totalScore || "",
          applicationNumber: res.data.applicationNumber || "",
          observerName: res.data.observerName || "",
          assessmentDate: res.data.assessmentDate || "",
          loggedToSystemDate: res.data.loggedToSystemDate || "",
          loggedBy: res.data.loggedBy || "",
        });
      } else if (appRes.success && appRes.data) {
        // Auto-fill with application data if no existing form data
        const appData = appRes.data;
        reset({
          fullName: appData.childFullName || "",
          age: appData.childAge ? appData.childAge.toString() : "",
          date: "",
          somethingAlwaysWantedToLearn: "",
          somethingAlwaysWantedToLearnNotes: "",
          fiveThingsWithPaperclip: "",
          fiveThingsWithPaperclipNotes: "",
          finishSchoolworkEarly: "",
          finishSchoolworkEarlyNotes: "",
          logicChallenge: "",
          logicChallengeNotes: "",
          somethingHard: "",
          somethingHardNotes: "",
          answerIsWrong: "",
          answerIsWrongNotes: "",
          favouriteThingOnComputer: "",
          favouriteThingOnComputerNotes: "",
          likeWorkingWithOthers: "",
          likeWorkingWithOthersNotes: "",
          drawMachineInvention: "",
          drawMachineInventionNotes: "",
          confidenceTryingNewThings: "",
          confidenceTryingNewThingsNotes: "",
          helpedSomeoneLearn: "",
          helpedSomeoneLearnNotes: "",
          magicWandMakesSmarter: "",
          magicWandMakesSmarterNotes: "",
          explainInternetToPast: "",
          explainInternetToPastNotes: "",
          inChargeOfWorld: "",
          inChargeOfWorldNotes: "",
          threeThingsGoodAt: "",
          threeThingsGoodAtNotes: "",
          somethingGetBetterAt: "",
          somethingGetBetterAtNotes: "",
          inventJobDoesntExist: "",
          inventJobDoesntExistNotes: "",
          learningPreference: "",
          digitalTasks: "",
          digitalTasksNotes: "",
          playingWithFriends: "",
          playingWithFriendsNotes: "",
          parentalInterferenceFlagged: false,
          parentalInterferenceNotes: "",
          totalScore: "",
          applicationNumber: params.id,
          observerName: "",
          assessmentDate: "",
          loggedToSystemDate: "",
          loggedBy: "",
        });
      }
    })();
  }, [params.id, reset]);

  const onSubmit = async (values: FormValues) => {
    setSaving(true);
    try {
      const response = await apiService.post("/api/admin/ks2-interview-questions", {
        applicationId: params.id,
        ...values,
      });
      
      if (response.success) {
        router.push(`/admin/applications/${params.id}`);
      } else {
        console.error("Form submission failed:", response.error);
        alert(`Error saving form: ${response.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert(`Error saving form: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <div className="text-xl font-bold text-slate-900">
          KS2 Interview Questions
        </div>
        <div className="text-sm text-slate-600">
          Application ID: {params.id}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Child Information */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader
            title="Child Information"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              htmlFor="fullName"
              error={errors.fullName as any}
            >
              <Input id="fullName" {...register("fullName")} />
            </FormField>
            <FormField label="Age" htmlFor="age" error={errors.age as any}>
              <Input id="age" {...register("age")} />
            </FormField>
            <FormField label="Date" htmlFor="date">
              <Input id="date" {...register("date" as any)} />
            </FormField>
          </div>
        </section>

        {/* Interview Questions */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader
            title="Interview Questions"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 text-slate-700 mb-4">
            <p>
              <strong>Scoring:</strong> 1-5 scale per item
            </p>
            <p>
              <strong>Flag 'P':</strong> If there is significant parental
              interference (e.g., prompting, leading answers)
            </p>
          </div>

          <div className="space-y-6">
            {/* Question 1 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                1. What's something you've always wanted to learn, and why?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Curiosity & intrinsic motivation
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="somethingAlwaysWantedToLearn"
                  error={errors.somethingAlwaysWantedToLearn as any}
                >
                  <select
                    id="somethingAlwaysWantedToLearn"
                    {...register("somethingAlwaysWantedToLearn")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.somethingAlwaysWantedToLearn
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = No idea</option>
                    <option value="2">2 = One-word answer</option>
                    <option value="3">3 = Topic with no reason</option>
                    <option value="4">4 = Topic + explanation</option>
                    <option value="5">5 = Passionate + asks own questions</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="somethingAlwaysWantedToLearnNotes"
                >
                  <Textarea
                    rows={3}
                    id="somethingAlwaysWantedToLearnNotes"
                    {...register("somethingAlwaysWantedToLearnNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 2 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                2. Can you tell me 5 different things you could do with a paperclip?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Cognitive flexibility & creativity
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="fiveThingsWithPaperclip"
                  error={errors.fiveThingsWithPaperclip as any}
                >
                  <select
                    id="fiveThingsWithPaperclip"
                    {...register("fiveThingsWithPaperclip")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.fiveThingsWithPaperclip
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = One use</option>
                    <option value="2">2 = Two similar uses</option>
                    <option value="3">3 = Three ideas</option>
                    <option value="4">4 = Four or more varied ideas</option>
                    <option value="5">5 = Highly original/creative answers</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="fiveThingsWithPaperclipNotes"
                >
                  <Textarea
                    rows={3}
                    id="fiveThingsWithPaperclipNotes"
                    {...register("fiveThingsWithPaperclipNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 3 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                3. What do you usually do when you finish your schoolwork early?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Intrinsic motivation
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="finishSchoolworkEarly"
                  error={errors.finishSchoolworkEarly as any}
                >
                  <select
                    id="finishSchoolworkEarly"
                    {...register("finishSchoolworkEarly")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.finishSchoolworkEarly
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Waits for instruction</option>
                    <option value="2">2 = Plays idly</option>
                    <option value="3">3 = Rests or chats</option>
                    <option value="4">4 = Reviews or reads</option>
                    <option value="5">5 = Seeks more challenge or helps others</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="finishSchoolworkEarlyNotes"
                >
                  <Textarea
                    rows={3}
                    id="finishSchoolworkEarlyNotes"
                    {...register("finishSchoolworkEarlyNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 4 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                4. Let's try this short logic challenge together (e.g., pattern matching, sequence puzzle, sudoku-style)
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Attention control
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="logicChallenge"
                  error={errors.logicChallenge as any}
                >
                  <select
                    id="logicChallenge"
                    {...register("logicChallenge")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.logicChallenge
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Avoids or won't try</option>
                    <option value="2">2 = Scattered focus</option>
                    <option value="3">3 = Some focus</option>
                    <option value="4">4 = Mostly focused</option>
                    <option value="5">5 = Fully engaged and eager for more</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="logicChallengeNotes"
                >
                  <Textarea
                    rows={3}
                    id="logicChallengeNotes"
                    {...register("logicChallengeNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 5 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                5. If something is hard, what do you do?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Growth mindset & perseverance
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="somethingHard"
                  error={errors.somethingHard as any}
                >
                  <select
                    id="somethingHard"
                    {...register("somethingHard")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.somethingHard
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Complains or gives up</option>
                    <option value="2">2 = Avoids</option>
                    <option value="3">3 = Frustrated but tries</option>
                    <option value="4">4 = Keeps going or asks for help</option>
                    <option value="5">5 = Says they like challenges or keep trying</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="somethingHardNotes"
                >
                  <Textarea
                    rows={3}
                    id="somethingHardNotes"
                    {...register("somethingHardNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 6 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                6. What do you do if you're told your answer is wrong?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Emotional regulation
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="answerIsWrong"
                  error={errors.answerIsWrong as any}
                >
                  <select
                    id="answerIsWrong"
                    {...register("answerIsWrong")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.answerIsWrong
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Angry/upset</option>
                    <option value="2">2 = Blames others or argues</option>
                    <option value="3">3 = Accepts it quietly</option>
                    <option value="4">4 = Reflects calmly</option>
                    <option value="5">5 = Says it's part of learning</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="answerIsWrongNotes"
                >
                  <Textarea
                    rows={3}
                    id="answerIsWrongNotes"
                    {...register("answerIsWrongNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 7 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                7. What's your favourite thing to do on a computer or tablet?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Tech comfort & digital fluency
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="favouriteThingOnComputer"
                  error={errors.favouriteThingOnComputer as any}
                >
                  <select
                    id="favouriteThingOnComputer"
                    {...register("favouriteThingOnComputer")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.favouriteThingOnComputer
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Avoids using tech</option>
                    <option value="2">2 = Watches passively</option>
                    <option value="3">3 = Plays or browses</option>
                    <option value="4">4 = Uses for creating or learning</option>
                    <option value="5">5 = Builds things, codes, or explores creatively</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="favouriteThingOnComputerNotes"
                >
                  <Textarea
                    rows={3}
                    id="favouriteThingOnComputerNotes"
                    {...register("favouriteThingOnComputerNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 8 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                8. Do you like working with others? Why?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Social openness & collaboration
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="likeWorkingWithOthers"
                  error={errors.likeWorkingWithOthers as any}
                >
                  <select
                    id="likeWorkingWithOthers"
                    {...register("likeWorkingWithOthers")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.likeWorkingWithOthers
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Says no or avoids people</option>
                    <option value="2">2 = Says they dislike it</option>
                    <option value="3">3 = Unsure or mixed</option>
                    <option value="4">4 = Likes it with basic reason</option>
                    <option value="5">5 = Enthusiastic about teamwork, sharing, or learning from others</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="likeWorkingWithOthersNotes"
                >
                  <Textarea
                    rows={3}
                    id="likeWorkingWithOthersNotes"
                    {...register("likeWorkingWithOthersNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 9 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                9. Can you draw a machine or invention that helps people? (Ask child to explain their drawing)
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Imagination & non-verbal expression
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="drawMachineInvention"
                  error={errors.drawMachineInvention as any}
                >
                  <select
                    id="drawMachineInvention"
                    {...register("drawMachineInvention")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.drawMachineInvention
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = No attempt</option>
                    <option value="2">2 = Unclear or unrelated drawing</option>
                    <option value="3">3 = Basic drawing of a tool/machine</option>
                    <option value="4">4 = Functional + purpose</option>
                    <option value="5">5 = Inventive + labelled or explained</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="drawMachineInventionNotes"
                >
                  <Textarea
                    rows={3}
                    id="drawMachineInventionNotes"
                    {...register("drawMachineInventionNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 10 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                10. How confident do you feel when trying new things? (Use 1-5 emoji scale)
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Confidence check
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="confidenceTryingNewThings"
                  error={errors.confidenceTryingNewThings as any}
                >
                  <select
                    id="confidenceTryingNewThings"
                    {...register("confidenceTryingNewThings")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.confidenceTryingNewThings
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Very unsure</option>
                    <option value="2">2 = Nervous</option>
                    <option value="3">3 = Mixed feelings</option>
                    <option value="4">4 = Confident</option>
                    <option value="5">5 = Excited to try new things</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="confidenceTryingNewThingsNotes"
                >
                  <Textarea
                    rows={3}
                    id="confidenceTryingNewThingsNotes"
                    {...register("confidenceTryingNewThingsNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 11 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                11. Can you describe a time you helped someone learn something?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Communication & teaching ability
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="helpedSomeoneLearn"
                  error={errors.helpedSomeoneLearn as any}
                >
                  <select
                    id="helpedSomeoneLearn"
                    {...register("helpedSomeoneLearn")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.helpedSomeoneLearn
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Can't recall</option>
                    <option value="2">2 = Very vague</option>
                    <option value="3">3 = Names situation</option>
                    <option value="4">4 = Describes steps or thinking</option>
                    <option value="5">5 = Explains clearly with reflection</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="helpedSomeoneLearnNotes"
                >
                  <Textarea
                    rows={3}
                    id="helpedSomeoneLearnNotes"
                    {...register("helpedSomeoneLearnNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 12 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                12. What would you do with a magic wand that makes people smarter?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Abstract thinking & values
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="magicWandMakesSmarter"
                  error={errors.magicWandMakesSmarter as any}
                >
                  <select
                    id="magicWandMakesSmarter"
                    {...register("magicWandMakesSmarter")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.magicWandMakesSmarter
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = No idea or silly answer</option>
                    <option value="2">2 = Self-focused wish</option>
                    <option value="3">3 = Basic use for others</option>
                    <option value="4">4 = Helpful to others</option>
                    <option value="5">5 = Thoughtful, creative and ethical purpose</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="magicWandMakesSmarterNotes"
                >
                  <Textarea
                    rows={3}
                    id="magicWandMakesSmarterNotes"
                    {...register("magicWandMakesSmarterNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 13 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                13. How would you explain the internet to someone from 100 years ago?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Critical thinking & communication
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="explainInternetToPast"
                  error={errors.explainInternetToPast as any}
                >
                  <select
                    id="explainInternetToPast"
                    {...register("explainInternetToPast")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.explainInternetToPast
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Doesn't try or says "you can't"</option>
                    <option value="2">2 = One vague concept (e.g. "computer")</option>
                    <option value="3">3 = Uses one comparison (e.g. "like a book")</option>
                    <option value="4">4 = Gives a clear analogy or explanation</option>
                    <option value="5">5 = Uses detailed analogy or multiple features</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="explainInternetToPastNotes"
                >
                  <Textarea
                    rows={3}
                    id="explainInternetToPastNotes"
                    {...register("explainInternetToPastNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 14 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                14. If you were in charge of the world for a day, what would you change?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Critical thinking & social values
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="inChargeOfWorld"
                  error={errors.inChargeOfWorld as any}
                >
                  <select
                    id="inChargeOfWorld"
                    {...register("inChargeOfWorld")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.inChargeOfWorld
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = No idea</option>
                    <option value="2">2 = Selfish wish</option>
                    <option value="3">3 = Basic idea (e.g. more toys)</option>
                    <option value="4">4 = Reasonable change</option>
                    <option value="5">5 = Thoughtful and values-driven change</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="inChargeOfWorldNotes"
                >
                  <Textarea
                    rows={3}
                    id="inChargeOfWorldNotes"
                    {...register("inChargeOfWorldNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 15 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                15. What are three things you're really good at?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Self-awareness
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="threeThingsGoodAt"
                  error={errors.threeThingsGoodAt as any}
                >
                  <select
                    id="threeThingsGoodAt"
                    {...register("threeThingsGoodAt")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.threeThingsGoodAt
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Says "nothing"</option>
                    <option value="2">2 = Gives one thing vaguely</option>
                    <option value="3">3 = Gives three things</option>
                    <option value="4">4 = Gives three with examples</option>
                    <option value="5">5 = Gives clear self-insight and confidence</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="threeThingsGoodAtNotes"
                >
                  <Textarea
                    rows={3}
                    id="threeThingsGoodAtNotes"
                    {...register("threeThingsGoodAtNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 16 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                16. What's something you'd like to get better at, and why?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Growth orientation
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="somethingGetBetterAt"
                  error={errors.somethingGetBetterAt as any}
                >
                  <select
                    id="somethingGetBetterAt"
                    {...register("somethingGetBetterAt")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.somethingGetBetterAt
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Says "nothing"</option>
                    <option value="2">2 = Gives unrelated answer</option>
                    <option value="3">3 = Names a skill</option>
                    <option value="4">4 = Gives reason why</option>
                    <option value="5">5 = Names challenge and motivation behind it</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="somethingGetBetterAtNotes"
                >
                  <Textarea
                    rows={3}
                    id="somethingGetBetterAtNotes"
                    {...register("somethingGetBetterAtNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 17 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                17. If you could invent a job that doesn't exist yet, what would it be?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Innovation & future-thinking
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="inventJobDoesntExist"
                  error={errors.inventJobDoesntExist as any}
                >
                  <select
                    id="inventJobDoesntExist"
                    {...register("inventJobDoesntExist")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.inventJobDoesntExist
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = No idea or silly answer</option>
                    <option value="2">2 = Very basic idea</option>
                    <option value="3">3 = Functional but vague</option>
                    <option value="4">4 = Thoughtful with clear purpose</option>
                    <option value="5">5 = Original and solves a real problem</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="inventJobDoesntExistNotes"
                >
                  <Textarea
                    rows={3}
                    id="inventJobDoesntExistNotes"
                    {...register("inventJobDoesntExistNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 18 - Not scored */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                18. Do you prefer learning by watching, listening, or doing? (Not scored - record answer)
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Learning preference awareness
              </div>
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  label="Answer (Not scored - Record answer)"
                  htmlFor="learningPreference"
                  error={errors.learningPreference as any}
                >
                  <Textarea
                    rows={3}
                    id="learningPreference"
                    {...register("learningPreference")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 19 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                19. Try these two mini digital tasks on the tablet (e.g., drag and drop puzzle, voice-based instruction from AI avatar)
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Digital readiness
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="digitalTasks"
                  error={errors.digitalTasks as any}
                >
                  <select
                    id="digitalTasks"
                    {...register("digitalTasks")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.digitalTasks
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Avoids or stuck</option>
                    <option value="2">2 = Needs full support</option>
                    <option value="3">3 = Completes with some help</option>
                    <option value="4">4 = Independent</option>
                    <option value="5">5 = Fast, confident, curious</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="digitalTasksNotes"
                >
                  <Textarea
                    rows={3}
                    id="digitalTasksNotes"
                    {...register("digitalTasksNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 20 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                20. Do you like playing with friends or by yourself?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Social openness
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="playingWithFriends"
                  error={errors.playingWithFriends as any}
                >
                  <select
                    id="playingWithFriends"
                    {...register("playingWithFriends")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.playingWithFriends
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Avoids question</option>
                    <option value="2">2 = Says "by myself only"</option>
                    <option value="3">3 = Says "both" with no reason</option>
                    <option value="4">4 = Preference with explanation</option>
                    <option value="5">5 = Clear value on connection or collaboration</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="playingWithFriendsNotes"
                >
                  <Textarea
                    rows={3}
                    id="playingWithFriendsNotes"
                    {...register("playingWithFriendsNotes")}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </section>

        {/* Parental Interference */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader
            title="Parental Interference"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3">
            <FormField
              label="If a parent helps or answers for the child repeatedly, flag:"
              htmlFor="parentalInterferenceFlagged"
            >
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("parentalInterferenceFlagged", {
                      setValueAs: (value) => value === "on" || value === true
                    })}
                    className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                  />
                  <span className="text-slate-700">Flag 'P': Yes</span>
                </label>
              </div>
            </FormField>
            <FormField
              label="Additional Notes (if flagged):"
              htmlFor="parentalInterferenceNotes"
            >
              <Textarea
                rows={4}
                id="parentalInterferenceNotes"
                {...register("parentalInterferenceNotes")}
              />
            </FormField>
          </div>
        </section>

        {/* Total Score Interpretation */}
        <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader
            title="Total Score Interpretation"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3">
            <FormField label="Total Score:" htmlFor="totalScore">
              <Input
                id="totalScore"
                {...register("totalScore")}
                placeholder="Enter score out of 95"
              />
            </FormField>
            
            <div className="mt-4">
              <div className="text-sm font-medium text-slate-900 mb-2">
                Score Interpretation Guide:
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <div>
                  <strong>20-44:</strong> Emerging Development - The child may need significant emotional, cognitive, or social support to adjust to a dynamic, self-directed learning environment.
                </div>
                <div>
                  <strong>45-69:</strong> Basic Readiness - The child shows developing readiness. With guided support and scaffolding, they are likely to adapt successfully.
                </div>
                <div>
                  <strong>70-89:</strong> Strong Fit - The child aligns well with the academy's experiential-AI model. Displays flexibility, social-emotional awareness, and independent thinking.
                </div>
                <div>
                  <strong>90-95:</strong> Exceptional Alignment - The child demonstrates leadership potential, creative confidence, and strong internal motivation.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Use Only */}
        {/* <section className="bg-white rounded-xl shadow-sm ring-1 mb-6 ring-black/5 p-6">
          <FormSectionHeader
            title="Office Use Only"
            bgClassName="bg-teal-700"
          />
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Application Number" htmlFor="applicationNumber">
              <Input
                id="applicationNumber"
                {...register("applicationNumber")}
              />
            </FormField>
            <FormField label="Observer Name" htmlFor="observerName">
              <Input id="observerName" {...register("observerName")} />
            </FormField>
            <FormField label="Assessment Date" htmlFor="assessmentDate">
              <Input id="assessmentDate" {...register("assessmentDate")} />
            </FormField>
            <FormField
              label="Logged to System Date"
              htmlFor="loggedToSystemDate"
            >
              <Input
                id="loggedToSystemDate"
                {...register("loggedToSystemDate")}
              />
            </FormField>
            <FormField label="Logged by" htmlFor="loggedBy">
              <Input id="loggedBy" {...register("loggedBy")} />
            </FormField>
          </div>
        </section> */}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save KS2 Interview Questions"}
          </button>
        </div>
      </form>
    </div>
  );
}
