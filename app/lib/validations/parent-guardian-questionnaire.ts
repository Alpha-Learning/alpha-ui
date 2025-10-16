import { z } from "zod";

export const parentGuardianQuestionnaireSchema = z.object({
  // General Information
  fullName: z.string().min(1, "Full name is required"),
  childName: z.string().min(1, "Child's name is required"),
  date: z.string().min(1, "Date is required"),
  parentOccupation: z.string().optional(),
  
  // Family Environment & Routine
  typicalWeekday: z.string().min(1, "Typical weekday description is required"),
  screenTimeHours: z.string().min(1, "Screen time information is required"),
  homeActivities: z.string().min(1, "Home activities description is required"),
  
  // Cultural Background
  culturalBackground: z.string().min(1, "Cultural background information is required"),
  
  // Rules and Discipline
  rulesDisciplineApproach: z.string().min(1, "Rules and discipline approach is required"),
  supportWhenStruggling: z.string().min(1, "Support approach is required"),
  
  // Learning and Development
  strengthsInterests: z.string().min(1, "Strengths and interests are required"),
  challengingAreas: z.string().min(1, "Challenging areas information is required"),
  learningApproach: z.string().min(1, "Learning approach description is required"),
  previousEducationalExperience: z.string().min(1, "Previous educational experience is required"),
  
  // COVID Learning Experience
  covidLearningExperience: z.string().min(1, "COVID learning experience is required"),
  supportiveLearningEnvironment: z.string().min(1, "Supportive learning environment description is required"),
  
  // Emotional and Social Awareness
  responseToFrustration: z.string().min(1, "Response to frustration is required"),
  peerInteraction: z.string().min(1, "Peer interaction description is required"),
  emotionalBehavioralConcerns: z.string().min(1, "Emotional/behavioral concerns information is required"),
  seekingHelp: z.string().min(1, "Seeking help approach is required"),
  
  // Educational Philosophy
  educationalHopesGoals: z.string().min(1, "Educational hopes and goals are required"),
  creativityMovementEmotionalRole: z.string().min(1, "Creativity, movement, and emotional development role is required"),
  parentingStyle: z.string().min(1, "Parenting style description is required"),
  technologyConcerns: z.string().min(1, "Technology concerns information is required"),
  
  // Office Use Only
  applicationNumber: z.string().optional(),
  loggedToSystemDate: z.string().optional(),
  loggedBy: z.string().optional(),
});

export type ParentGuardianQuestionnaireFormData = z.infer<typeof parentGuardianQuestionnaireSchema>;
