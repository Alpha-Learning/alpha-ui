import { z } from "zod";

export const screeningCallSchema = z.object({
  // General Information
  fullName: z.string().min(1, "Full name is required"),
  childName: z.string().min(1, "Child's name is required"),
  date: z.string().min(1, "Date is required"),
  callerName: z.string().min(1, "Caller name is required"),
  crmLeadTag: z.enum(["Hot", "Warm", "Cold"]).optional(),

  // Introduction
  recordingPermission: z.enum(["Yes", "No"]).optional(),
  introductionNotes: z.string().optional(),

  // Overview
  overviewNotes: z.string().optional(),

  // Parent Warm-Up Questions
  applicationReason: z.string().optional(),
  currentSchoolIssues: z.string().optional(),
  techResponseAtHome: z.string().optional(),
  parentWarmUpNotes: z.string().optional(),

  // Fit Clarification
  flexibleModelOpenness: z.string().optional(),
  childFreeTime: z.string().optional(),
  adaptiveTechComfort: z.string().optional(),
  fitClarificationNotes: z.string().optional(),

  // General Notes
  generalNotes: z.string().optional(),
  parentReactionsNotes: z.string().optional(),

  // Next Steps
  comprehensiveQuestionnaires: z.boolean().default(false),
  guidebookInfo: z.boolean().default(false),
  walkthroughDate: z.string().optional(),
  assessmentInvite: z.string().optional(),
  additionalNotes: z.string().optional(),
  
  // System logging
  loggedToSystemDate: z.string().optional(),
  loggedBy: z.string().optional(),
});

export type ScreeningCallFormData = z.infer<typeof screeningCallSchema>;
