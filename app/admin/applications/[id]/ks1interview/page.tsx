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

  // Interview Questions (1-14) - all required
  whatDoYouDoSomethingHard: z.string().min(1, "Required"),
  whatDoYouDoSomethingHardNotes: z.string().optional(),
  howDoYouFeelWhenTryNew: z.string().min(1, "Required"),
  howDoYouFeelWhenTryNewNotes: z.string().optional(),
  whatWouldYouDoIfFriendSad: z.string().min(1, "Required"),
  whatWouldYouDoIfFriendSadNotes: z.string().optional(),
  tellMeAboutFavouriteStory: z.string().min(1, "Required"),
  tellMeAboutFavouriteStoryNotes: z.string().optional(),
  favouriteThingToLearn: z.string().min(1, "Required"),
  favouriteThingToLearnNotes: z.string().optional(),
  whatElseUcanDoWithASpoonOtherThanEat: z.string().min(1, "Required"),
  whatElseUcanDoWithASpoonOtherThanEatNotes: z.string().optional(),
  howShareCookiesBetweenFriends: z.string().min(1, "Required"),
  howShareCookiesBetweenFriendsNotes: z.string().optional(),
  puzzleActivity: z.string().min(1, "Required"),
  puzzleActivityNotes: z.string().optional(),
  tableInteraction: z.string().min(1, "Required"),
  tableInteractionNotes: z.string().optional(),
  drawSomethingYouInvent: z.string().min(1, "Required"),
  drawSomethingYouInventNotes: z.string().optional(),
  doYouLikeLearnByListening: z.string().min(1, "Required"),
  canYouSortShapesByColor: z.string().min(1, "Required"),
  canYouSortShapesByColorNotes: z.string().optional(),
  canYouTeachMeDrawMummy: z.string().min(1, "Required"),
  canYouTeachMeDrawMummyNotes: z.string().optional(),
  doYouLikePlayingWithFriends: z.string().min(1, "Required"),
  doYouLikePlayingWithFriendsNotes: z.string().optional(),

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

export default function KS1InterviewQuestionsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  // Removed defaulting to today's date; now using user-provided Date field
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
      whatDoYouDoSomethingHard: "",
      whatDoYouDoSomethingHardNotes: "",
      howDoYouFeelWhenTryNew: "",
      howDoYouFeelWhenTryNewNotes: "",
      whatWouldYouDoIfFriendSad: "",
      whatWouldYouDoIfFriendSadNotes: "",
      tellMeAboutFavouriteStory: "",
      tellMeAboutFavouriteStoryNotes: "",
      favouriteThingToLearn: "",
      favouriteThingToLearnNotes: "",
      whatElseUcanDoWithASpoonOtherThanEat: "",
      whatElseUcanDoWithASpoonOtherThanEatNotes: "",
      howShareCookiesBetweenFriends: "",
      howShareCookiesBetweenFriendsNotes: "",
      puzzleActivity: "",
      puzzleActivityNotes: "",
      tableInteraction: "",
      tableInteractionNotes: "",
      drawSomethingYouInvent: "",
      drawSomethingYouInventNotes: "",
      doYouLikeLearnByListening: "",
      canYouSortShapesByColor: "",
      canYouSortShapesByColorNotes: "",
      canYouTeachMeDrawMummy: "",
      canYouTeachMeDrawMummyNotes: "",
      doYouLikePlayingWithFriends: "",
      doYouLikePlayingWithFriendsNotes: "",
      parentalInterferenceFlagged: false,
      parentalInterferenceNotes: "",
      totalScore: "",
      applicationNumber: "",
      observerName: "",
      date: "",
      assessmentDate: "",
      loggedToSystemDate: "",
      loggedBy: "",
    },
  });



  console.log("form errors  ", errors);
  useEffect(() => {
    (async () => {
      // Load existing form data
      const res = await apiService.get(
        `/api/admin/ks1-interview-questions?applicationId=${params.id}`
      );
      
      // Load application data for auto-filling
      const appRes = await apiService.getApplicationData(params.id);
      
      if (res.success && res.data) {
        // Use existing form data
        reset({
          fullName: res.data.fullName || "",
          age: res.data.age || "",
          whatDoYouDoSomethingHard: res.data.whatDoYouDoSomethingHard || "",
          whatDoYouDoSomethingHardNotes:
            res.data.whatDoYouDoSomethingHardNotes || "",
          howDoYouFeelWhenTryNew: res.data.howDoYouFeelWhenTryNew || "",
          howDoYouFeelWhenTryNewNotes:
            res.data.howDoYouFeelWhenTryNewNotes || "",
          whatWouldYouDoIfFriendSad: res.data.whatWouldYouDoIfFriendSad || "",
          whatWouldYouDoIfFriendSadNotes:
            res.data.whatWouldYouDoIfFriendSadNotes || "",
          tellMeAboutFavouriteStory: res.data.tellMeAboutFavouriteStory || "",
          tellMeAboutFavouriteStoryNotes:
            res.data.tellMeAboutFavouriteStoryNotes || "",
          favouriteThingToLearn: res.data.favouriteThingToLearn || "",
          favouriteThingToLearnNotes: res.data.favouriteThingToLearnNotes || "",
          whatElseUcanDoWithASpoonOtherThanEat:
            res.data.whatElseUcanDoWithASpoonOtherThanEat || "",
          whatElseUcanDoWithASpoonOtherThanEatNotes:
            res.data.whatElseUcanDoWithASpoonOtherThanEatNotes || "",
          howShareCookiesBetweenFriends:
            res.data.howShareCookiesBetweenFriends || "",
          howShareCookiesBetweenFriendsNotes:
            res.data.howShareCookiesBetweenFriendsNotes || "",
          puzzleActivity: res.data.puzzleActivity || "",
          puzzleActivityNotes: res.data.puzzleActivityNotes || "",
          tableInteraction: res.data.tableInteraction || "",
          tableInteractionNotes: res.data.tableInteractionNotes || "",
          drawSomethingYouInvent: res.data.drawSomethingYouInvent || "",
          drawSomethingYouInventNotes:
            res.data.drawSomethingYouInventNotes || "",
          doYouLikeLearnByListening: res.data.doYouLikeLearnByListening || "",
          canYouSortShapesByColor: res.data.canYouSortShapesByColor || "",
          canYouSortShapesByColorNotes:
            res.data.canYouSortShapesByColorNotes || "",
          canYouTeachMeDrawMummy: res.data.canYouTeachMeDrawMummy || "",
          canYouTeachMeDrawMummyNotes:
            res.data.canYouTeachMeDrawMummyNotes || "",
          doYouLikePlayingWithFriends:
            res.data.doYouLikePlayingWithFriends || "",
          doYouLikePlayingWithFriendsNotes:
            res.data.doYouLikePlayingWithFriendsNotes || "",
          parentalInterferenceFlagged:
            res.data.parentalInterferenceFlagged || false,
          parentalInterferenceNotes: res.data.parentalInterferenceNotes || "",
          totalScore: res.data.totalScore || "",
          applicationNumber: res.data.applicationNumber || "",
          observerName: res.data.observerName || "",
          date: res.data.date || "",
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
          whatDoYouDoSomethingHard: "",
          whatDoYouDoSomethingHardNotes: "",
          howDoYouFeelWhenTryNew: "",
          howDoYouFeelWhenTryNewNotes: "",
          whatWouldYouDoIfFriendSad: "",
          whatWouldYouDoIfFriendSadNotes: "",
          tellMeAboutFavouriteStory: "",
          tellMeAboutFavouriteStoryNotes: "",
          favouriteThingToLearn: "",
          favouriteThingToLearnNotes: "",
          whatElseUcanDoWithASpoonOtherThanEat: "",
          whatElseUcanDoWithASpoonOtherThanEatNotes: "",
          howShareCookiesBetweenFriends: "",
          howShareCookiesBetweenFriendsNotes: "",
          puzzleActivity: "",
          puzzleActivityNotes: "",
          tableInteraction: "",
          tableInteractionNotes: "",
          drawSomethingYouInvent: "",
          drawSomethingYouInventNotes: "",
          doYouLikeLearnByListening: "",
          canYouSortShapesByColor: "",
          canYouSortShapesByColorNotes: "",
          canYouTeachMeDrawMummy: "",
          canYouTeachMeDrawMummyNotes: "",
          doYouLikePlayingWithFriends: "",
          doYouLikePlayingWithFriendsNotes: "",
          parentalInterferenceFlagged: false,
          parentalInterferenceNotes: "",
          totalScore: "",
          applicationNumber: params.id,
          observerName: "",
          date: "",
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
      const response = await apiService.post("/api/admin/ks1-interview-questions", {
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
          KS1 Interview Questions
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
                1. What do you do if something is hard?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Growth mindset & perseverance
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="whatDoYouDoSomethingHard"
                  error={errors.whatDoYouDoSomethingHard as any}
                >
                  <select
                    id="whatDoYouDoSomethingHard"
                    {...register("whatDoYouDoSomethingHard")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.whatDoYouDoSomethingHard
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Says "I can't"</option>
                    <option value="2">2 = Tries briefly then stops</option>
                    <option value="3">3 = Makes some effort</option>
                    <option value="4">4 = Tries and asks for help</option>
                    <option value="5">
                      5 = Says "I try again" or "I like hard things"
                    </option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="whatDoYouDoSomethingHardNotes"
                >
                  <Textarea
                    rows={3}
                    id="whatDoYouDoSomethingHardNotes"
                    {...register("whatDoYouDoSomethingHardNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 2 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                2. How do you feel when you try something new or get something
                wrong?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Emotional awareness & regulation
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="howDoYouFeelWhenTryNew"
                  error={errors.howDoYouFeelWhenTryNew as any}
                >
                  <select
                    id="howDoYouFeelWhenTryNew"
                    {...register("howDoYouFeelWhenTryNew")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.howDoYouFeelWhenTryNew
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Says "I don't know"</option>
                    <option value="2">2 = Simple feeling word</option>
                    <option value="3">3 = Describes feeling briefly</option>
                    <option value="4">4 = Describes with example</option>
                    <option value="5">
                      5 = Reflects calmly and thoughtfully
                    </option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="howDoYouFeelWhenTryNewNotes">
                  <Textarea
                    rows={3}
                    id="howDoYouFeelWhenTryNewNotes"
                    {...register("howDoYouFeelWhenTryNewNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 3 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                3. What would you do if your friend was sad?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Empathy & social reasoning
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="whatWouldYouDoIfFriendSad"
                  error={errors.whatWouldYouDoIfFriendSad as any}
                >
                  <select
                    id="whatWouldYouDoIfFriendSad"
                    {...register("whatWouldYouDoIfFriendSad")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.whatWouldYouDoIfFriendSad
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Ignores or says "don't know"</option>
                    <option value="2">2 = Says "help them" vaguely</option>
                    <option value="3">3 = Gives basic comfort idea</option>
                    <option value="4">4 = Suggests thoughtful action</option>
                    <option value="5">
                      5 = Comforts with empathy and reason
                    </option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="whatWouldYouDoIfFriendSadNotes"
                >
                  <Textarea
                    rows={3}
                    id="whatWouldYouDoIfFriendSadNotes"
                    {...register("whatWouldYouDoIfFriendSadNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 4 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                4. Tell me about your favourite story or game.
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Narrative & communication skills
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="tellMeAboutFavouriteStory"
                  error={errors.tellMeAboutFavouriteStory as any}
                >
                  <select
                    id="tellMeAboutFavouriteStory"
                    {...register("tellMeAboutFavouriteStory")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.tellMeAboutFavouriteStory
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = One word, no story</option>
                    <option value="2">
                      2 = Mentions favourite but gives no detail
                    </option>
                    <option value="3">
                      3 = Tells basic story/game outline
                    </option>
                    <option value="4">4 = Provides clear structure</option>
                    <option value="5">5 = Uses emotion and detail</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="tellMeAboutFavouriteStoryNotes"
                >
                  <Textarea
                    rows={3}
                    id="tellMeAboutFavouriteStoryNotes"
                    {...register("tellMeAboutFavouriteStoryNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 5 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                5. What's your favourite thing to learn or play with?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Curiosity
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="favouriteThingToLearn"
                  error={errors.favouriteThingToLearn as any}
                >
                  <select
                    id="favouriteThingToLearn"
                    {...register("favouriteThingToLearn")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.favouriteThingToLearn
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Says "I don't know"</option>
                    <option value="2">2 = One-word hobby</option>
                    <option value="3">3 = Names interest</option>
                    <option value="4">4 = Adds a reason</option>
                    <option value="5">
                      5 = Explains with passion and curiosity
                    </option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="favouriteThingToLearnNotes">
                  <Textarea
                    rows={3}
                    id="favouriteThingToLearnNotes"
                    {...register("favouriteThingToLearnNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 6 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                6. What else can you do with a spoon other than eating with it?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Cognitive flexibility & creativity
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="whatElseUcanDoWithASpoonOtherThanEat"
                  error={errors.whatElseUcanDoWithASpoonOtherThanEat as any}
                >
                  <select
                    id="whatElseUcanDoWithASpoonOtherThanEat"
                    {...register("whatElseUcanDoWithASpoonOtherThanEat")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.whatElseUcanDoWithASpoonOtherThanEat
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Says "eat"</option>
                    <option value="2">2 = Adds serving/stirring</option>
                    <option value="3">3 = Includes play or craft use</option>
                    <option value="4">
                      4 = Unusual ideas (e.g., pretend microphone)
                    </option>
                    <option value="5">
                      5 = Inventive/abstract use (e.g., catapult)
                    </option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="whatElseUcanDoWithASpoonOtherThanEatNotes"
                >
                  <Textarea
                    rows={3}
                    id="whatElseUcanDoWithASpoonOtherThanEatNotes"
                    {...register("whatElseUcanDoWithASpoonOtherThanEatNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 7 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                7. How could we share 3 cookies between 4 friends? (have
                scissors ready)
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Problem-solving & fairness
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="howShareCookiesBetweenFriends"
                  error={errors.howShareCookiesBetweenFriends as any}
                >
                  <select
                    id="howShareCookiesBetweenFriends"
                    {...register("howShareCookiesBetweenFriends")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.howShareCookiesBetweenFriends
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Says "don't know"</option>
                    <option value="2">2 = Suggests unfair idea</option>
                    <option value="3">3 = Splits unequally</option>
                    <option value="4">
                      4 = Fair suggestion (e.g., break in half)
                    </option>
                    <option value="5">
                      5 = Equal, thoughtful sharing with reason
                    </option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="howShareCookiesBetweenFriendsNotes"
                >
                  <Textarea
                    rows={3}
                    id="howShareCookiesBetweenFriendsNotes"
                    {...register("howShareCookiesBetweenFriendsNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 8 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                8. Puzzle Activity
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Problem-solving & spatial reasoning
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="puzzleActivity"
                  error={errors.puzzleActivity as any}
                >
                  <select
                    id="puzzleActivity"
                    {...register("puzzleActivity")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.puzzleActivity
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = No attempt</option>
                    <option value="2">2 = Needs full help</option>
                    <option value="3">3 = Some correct pieces</option>
                    <option value="4">4 = Mostly correct with minimal help</option>
                    <option value="5">5 = Completes independently</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="puzzleActivityNotes"
                >
                  <Textarea
                    rows={3}
                    id="puzzleActivityNotes"
                    {...register("puzzleActivityNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 9 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                9. Table Interaction
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Social interaction & communication
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="tableInteraction"
                  error={errors.tableInteraction as any}
                >
                  <select
                    id="tableInteraction"
                    {...register("tableInteraction")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.tableInteraction
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = Avoids interaction</option>
                    <option value="2">2 = Minimal participation</option>
                    <option value="3">3 = Basic interaction</option>
                    <option value="4">4 = Engages well with others</option>
                    <option value="5">5 = Initiates and leads interaction</option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="tableInteractionNotes"
                >
                  <Textarea
                    rows={3}
                    id="tableInteractionNotes"
                    {...register("tableInteractionNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 10 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                10. Draw something you'd love to invent or design a playground
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Imagination & expression
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="drawSomethingYouInvent"
                  error={errors.drawSomethingYouInvent as any}
                >
                  <select
                    id="drawSomethingYouInvent"
                    {...register("drawSomethingYouInvent")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.drawSomethingYouInvent
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = No effort</option>
                    <option value="2">2 = Scribbles</option>
                    <option value="3">3 = Basic object</option>
                    <option value="4">4 = Adds labels or tells a story</option>
                    <option value="5">
                      5 = Inventive with purpose or detail
                    </option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="drawSomethingYouInventNotes">
                  <Textarea
                    rows={3}
                    id="drawSomethingYouInventNotes"
                    {...register("drawSomethingYouInventNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 11 - Not scored */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                11. Do you like to learn by listening, by watching or by doing?
                (use images)
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Learning preference awareness
              </div>
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  label="Answer (Not scored - Record answer)"
                  htmlFor="doYouLikeLearnByListening"
                  error={errors.doYouLikeLearnByListening as any}
                >
                  <Textarea
                    rows={3}
                    id="doYouLikeLearnByListening"
                    {...register("doYouLikeLearnByListening")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 12 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                12. Can you sort these shapes by colour or size?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Motor coordination & logic
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="canYouSortShapesByColor"
                  error={errors.canYouSortShapesByColor as any}
                >
                  <select
                    id="canYouSortShapesByColor"
                    {...register("canYouSortShapesByColor")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.canYouSortShapesByColor
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 = No attempt</option>
                    <option value="2">2 = Needs full help</option>
                    <option value="3">3 = Some correct</option>
                    <option value="4">4 = Fully correct by one rule</option>
                    <option value="5">
                      5 = Fully correct by both colour and size
                    </option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="canYouSortShapesByColorNotes">
                  <Textarea
                    rows={3}
                    id="canYouSortShapesByColorNotes"
                    {...register("canYouSortShapesByColorNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 13 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                13. Can you teach me how to draw your mummy or daddy?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Communication clarity & social confidence
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="canYouTeachMeDrawMummy"
                  error={errors.canYouTeachMeDrawMummy as any}
                >
                  <select
                    id="canYouTeachMeDrawMummy"
                    {...register("canYouTeachMeDrawMummy")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.canYouTeachMeDrawMummy
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">
                      1 = Avoids or says, "I don't know"
                    </option>
                    <option value="2">2 = Says "Just draw them"</option>
                    <option value="3">
                      3 = Gives 1-2 steps (e.g., "draw a circle for the head")
                    </option>
                    <option value="4">
                      4 = Several clear steps with guidance
                    </option>
                    <option value="5">
                      5 = Full explanation with enthusiasm and detail
                    </option>
                  </select>
                </FormField>
                <FormField label="Notes" htmlFor="canYouTeachMeDrawMummyNotes">
                  <Textarea
                    rows={3}
                    id="canYouTeachMeDrawMummyNotes"
                    {...register("canYouTeachMeDrawMummyNotes")}
                  />
                </FormField>
              </div>
            </div>

            {/* Question 14 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-2">
                14. Do you like playing with friends or by yourself?
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Purpose: Social openness & preference
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Score (1-5)"
                  htmlFor="doYouLikePlayingWithFriends"
                  error={errors.doYouLikePlayingWithFriends as any}
                >
                  <select
                    id="doYouLikePlayingWithFriends"
                    {...register("doYouLikePlayingWithFriends")}
                    className={`w-full px-3 py-2 border rounded-md text-black bg-white ${
                      errors.doYouLikePlayingWithFriends
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="1">
                      1 = Avoids question or says "neither"
                    </option>
                    <option value="2">2 = Says "alone" only</option>
                    <option value="3">3 = Says "both" or unsure</option>
                    <option value="4">4 = Clear preference with reason</option>
                    <option value="5">
                      5 = Describes teamwork/sharing as enjoyable
                    </option>
                  </select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="doYouLikePlayingWithFriendsNotes"
                >
                  <Textarea
                    rows={3}
                    id="doYouLikePlayingWithFriendsNotes"
                    {...register("doYouLikePlayingWithFriendsNotes")}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </section>

        {/* Parental Interference */}
        <section className="bg-white rounded-xl mb-6 shadow-sm ring-1 ring-black/5 p-6">
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
                placeholder="Enter score out of 65"
              />
            </FormField>

            <div className="mt-4">
              <div className="text-sm font-medium text-slate-900 mb-2">
                Score Interpretation Guide:
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <div>
                  <strong>13-25:</strong> Emerging Development - The child may
                  need close support or intervention in areas like emotional
                  regulation, attention, or social readiness.
                </div>
                <div>
                  <strong>26-40:</strong> Basic Readiness - The child shows some
                  strengths but may need scaffolding in specific areas.
                </div>
                <div>
                  <strong>41-55:</strong> Strong Fit - The child aligns well
                  with the academy's learning model.
                </div>
                <div>
                  <strong>56-65:</strong> Exceptional Alignment - Demonstrates
                  high curiosity, communication, empathy, and growth mindset.
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
            {saving ? "Saving..." : "Save KS1 Interview Questions"}
          </button>
        </div>
      </form>
    </div>
  );
}
