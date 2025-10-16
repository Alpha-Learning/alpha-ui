import { z } from "zod";

export const guidedObservationSchema = z.object({
  // Basic Information
  childName: z.string().min(1, "Child name is required"),
  age: z.string().min(1, "Age is required"),
  date: z.string().min(1, "Date is required"),
  examiner: z.string().min(1, "Examiner is required"),
  
  // Guided Activity Ratings Grid - Zone A: Build Something New
  zoneAScore: z.number().min(1).max(5),
  zoneANotes: z.string().optional(),
  
  // Guided Activity Ratings Grid - Zone B: Design a Planet
  zoneBScore: z.number().min(1).max(5),
  zoneBNotes: z.string().optional(),
  
  // Guided Activity Ratings Grid - Zone C: Sensory Play
  zoneCScore: z.number().min(1).max(5),
  zoneCNotes: z.string().optional(),
  
  // Guided Activity Ratings Grid - Zone D: Logic Game
  zoneDScore: z.number().min(1).max(5),
  zoneDNotes: z.string().optional(),
  
  // Meta Learning Skill Scoring
  metaCuriosityScore: z.number().min(1).max(5),
  metaCuriosityNotes: z.string().optional(),
  metaSelfRegulationScore: z.number().min(1).max(5),
  metaSelfRegulationNotes: z.string().optional(),
  metaConfidenceScore: z.number().min(1).max(5),
  metaConfidenceNotes: z.string().optional(),
  metaCollaborationScore: z.number().min(1).max(5),
  metaCollaborationNotes: z.string().optional(),
  metaEmotionalAwarenessScore: z.number().min(1).max(5),
  metaEmotionalAwarenessNotes: z.string().optional(),
  
  // Intelligence & Learning Type Check-In
  intelLinguisticEvidence: z.enum(["moderate", "strong"]).optional(),
  intelLinguisticObservation: z.string().optional(),
  intelLogicalEvidence: z.enum(["moderate", "strong"]).optional(),
  intelLogicalObservation: z.string().optional(),
  intelSpatialEvidence: z.enum(["moderate", "strong"]).optional(),
  intelSpatialObservation: z.string().optional(),
  intelBodilyEvidence: z.enum(["moderate", "strong"]).optional(),
  intelBodilyObservation: z.string().optional(),
  
  // Additional Intelligences
  intelMusicalEvidence: z.enum(["moderate", "strong"]).optional(),
  intelMusicalObservation: z.string().optional(),
  intelInterpersonalEvidence: z.enum(["moderate", "strong"]).optional(),
  intelInterpersonalObservation: z.string().optional(),
  intelIntrapersonalEvidence: z.enum(["moderate", "strong"]).optional(),
  intelIntrapersonalObservation: z.string().optional(),
  intelNaturalisticEvidence: z.enum(["moderate", "strong"]).optional(),
  intelNaturalisticObservation: z.string().optional(),
  intelExistentialEvidence: z.enum(["moderate", "strong"]).optional(),
  intelExistentialObservation: z.string().optional(),
  
  // Parent-Child Dynamic Snapshot
  parentProximity: z.enum(["close", "hovering", "distant"]).optional(),
  parentInterventionLevel: z.enum(["low", "medium", "high"]).optional(),
  parentInterventionStyle: z.enum(["directive", "supportive", "detached"]).optional(),
  childIndependenceLevel: z.string().optional(),
  childEmotionalPresentation: z.string().optional(),
  childIndependenceWhenParentEngaged: z.string().optional(),
  emotionalRegulationWithParentPresent: z.string().optional(),
  
  // Examiner Final Comments
  mostEngagedZone: z.string().optional(),
  dominantObservedIntelligences: z.string().optional(),
  initialLearningStyleImpressions: z.string().optional(),
  earlyFlagsNeedsFollowUp: z.string().optional(),
  selfDirectedVsSeekingGuidance: z.string().optional(),
  flagIndicators: z.string().optional(),
  additionalNotes: z.string().optional(),
  
  // Interaction Summary
  preferredZone: z.string().optional(),
  initialBehaviour: z.string().optional(),
  opennessToAdultGuidance: z.string().optional(),
  mostRevealingActivity: z.string().optional(),
  crossReferenceStep5: z.string().optional(),
  curiosityAndExploration: z.string().optional(),
  focusAndAttentionSpan: z.string().optional(),
  engagementWithAdultDirection: z.string().optional(),
  
  // Additional Observations
  resilienceInChallenge: z.string().optional(),
  emotionRegulationSignals: z.string().optional(),
  caregiverInteractionStyle: z.string().optional(),
  recommendationsForSupport: z.string().optional(),
});

export type GuidedObservationFormData = z.infer<typeof guidedObservationSchema>;
