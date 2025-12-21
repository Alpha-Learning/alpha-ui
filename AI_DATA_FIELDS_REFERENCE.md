# AI Assessment Data Fields Reference

This document provides a complete reference of all data fields available from the 9 assessment forms for AI analysis. Use this to understand what data is available for generating detailed and accurate UTL (Understanding The Learner) Analysis Reports.

---

## Overview

The ALS Platform collects comprehensive student assessment data through **9 forms** that are completed during the application process. All this data is available for AI analysis to generate:

- **UTL Analysis Report** - Comprehensive learner profile including learning styles, personality traits, meta-learning skills, subject levels, and recommendations
- **Learning Pathway Report** - Personalized learning pathway recommendations
- **Daily Summary Reports** - Daily progress summaries
- **Class Reports** - Class-level insights
- **Alerts Reports** - Behavioral and academic alerts

---

## Form 1: Initial Application Form

**Model**: `Application` (base fields)

### Child Information
- `childFullName` (String, required)
- `childDateOfBirth` (DateTime, optional)
- `childAge` (Int, optional)
- `childGender` (String, optional)
- `childEthnicity` (String, optional)
- `childSchoolYear` (String, optional)
- `childCurrentSchool` (String, optional)
- `childSchoolType` (String, optional)
- `childSchoolTypeOther` (String, optional)
- `childDiagnosedNeeds` (String, optional)

### Parent/Guardian Information
- `parentFullName` (String, required)
- `parentEmail` (String, required)
- `parentPhone` (String, optional)
- `parentOccupation` (String, optional)
- `relationToChild` (String, optional)
- `parentCity` (String, optional)
- `parentEthnicity` (String, optional)

### Caregiver/Nanny Information
- `caregiverFullName` (String, optional)
- `caregiverPhone` (String, optional)

### Parent Questions (Key insights for AI)
- `qExcitesMost` (String, required) - What excites the child most
- `qNonTraditionalReason` (String, required) - Reason for choosing non-traditional education
- `qBiggestHope` (String, required) - Parent's biggest hope for the child
- `enjoysTech` (String, required) - Child's technology preference
- `enjoysHandsOn` (String, required) - Child's hands-on activity preference

### Consent
- `consentContact` (Boolean, required)
- `consentUpdates` (Boolean, required)
- `consentBiometric` (Boolean, optional)

---

## Form 2: Screening Call

**Model**: `ScreeningCall`

### General Information
- `fullName` (String, required)
- `childName` (String, required)
- `date` (DateTime, required)
- `callerName` (String, required)
- `crmLeadTag` (String, optional) - Hot, Warm, Cold

### Introduction
- `recordingPermission` (String, optional) - Yes, No
- `introductionNotes` (String, optional)

### Overview
- `overviewNotes` (String, optional)

### Parent Warm-Up Questions
- `applicationReason` (String, optional)
- `currentSchoolIssues` (String, optional)
- `techResponseAtHome` (String, optional)
- `parentWarmUpNotes` (String, optional)

### Fit Clarification
- `flexibleModelOpenness` (String, optional)
- `childFreeTime` (String, optional)
- `adaptiveTechComfort` (String, optional)
- `fitClarificationNotes` (String, optional)

### General Notes
- `generalNotes` (String, optional)

### Parent Reactions
- `parentReactionsNotes` (String, optional)

### Next Steps
- `comprehensiveQuestionnaires` (Boolean, default: false)
- `guidebookInfo` (Boolean, default: false)
- `walkthroughDate` (String, optional)
- `assessmentInvite` (String, optional)
- `additionalNotes` (String, optional)

---

## Form 3a: Parent/Guardian Questionnaire

**Model**: `ParentGuardianQuestionnaire`

### General Information
- `fullName` (String, required)
- `childName` (String, required)
- `date` (DateTime, required)
- `parentOccupation` (String, optional)

### Family Environment & Routine
- `typicalWeekday` (String, required)
- `screenTimeHours` (String, required)
- `homeActivities` (String, required)

### Cultural Background
- `culturalBackground` (String, required)

### Rules and Discipline
- `rulesDisciplineApproach` (String, required)
- `supportWhenStruggling` (String, required)

### Learning and Development
- `strengthsInterests` (String, required)
- `challengingAreas` (String, required)
- `learningApproach` (String, required)
- `previousEducationalExperience` (String, required)

### COVID Learning Experience
- `covidLearningExperience` (String, required)
- `supportiveLearningEnvironment` (String, required)

### Emotional and Social Awareness
- `responseToFrustration` (String, required)
- `peerInteraction` (String, required)
- `emotionalBehavioralConcerns` (String, required)
- `seekingHelp` (String, required)

### Educational Philosophy
- `educationalHopesGoals` (String, required)
- `creativityMovementEmotionalRole` (String, required)
- `parentingStyle` (String, required)
- `technologyConcerns` (String, required)

---

## Form 3b: Caregiver Questionnaire

**Model**: `CaregiverQuestionnaire`

### General Information
- `fullName` (String, required)
- `childName` (String, required)
- `date` (DateTime, required)

### Daily Care Context
- `careDuration` (String, required)
- `regularActivities` (String, required)
- `behaviorWithoutParent` (String, required)

### Learning and Play Behaviour
- `toysGamesTasksEnjoyed` (String, required)
- `preferences` (String, required)
- `responseToDifficulties` (String, required)
- `engagementWithChosenActivity` (String, required)
- `engagementWithAssignedActivity` (String, required)

### Social & Emotional Response
- `interactionWithChildren` (String, required)
- `seekingHelpComfort` (String, required)
- `emotionalRegulationStrategies` (String, required)
- `emotionalStrengthsVulnerabilities` (String, required) - **Key for emotional analysis**

---

## Form 3c: Outsider Questionnaire

**Model**: `OutsiderQuestionnaire`

### General Information
- `fullName` (String, required)
- `childName` (String, required)
- `date` (DateTime, required)

### Relationship Context
- `relationshipToChild` (String, required)
- `interactionContext` (String, required)

### Learning Traits & Emotional Presentation
- `learningTendenciesCuriosity` (String, required)
- `emotionalTraits` (String, required)
- `adaptationToChanges` (String, required)

### Social Behaviour & Communication
- `communicationSkills` (String, required)
- `groupBehavior` (String, required)
- `concernsNotes` (String, required)
- `emotionalStrengthsVulnerabilities` (String, required) - **Key for emotional analysis**

---

## Form 4: Initial Observation Form

**Model**: `InitialObservationForm`

### Child Information
- `fullName` (String, required)
- `age` (String, required)
- `date` (String, required)
- `examiner` (String, required)

### Zone-Based Engagement Grid

#### Zone A (Hands-on/Building)
- `zoneATimeSpent` (String, required)
- `zoneASelfDirected` (String, required)
- `zoneAObservations` (String, required)
- `zoneAEngagementLevel` (String, required)
- `zoneAKeyBehavioursNotes` (String, required)

#### Zone B (Arts/Creative)
- `zoneBTimeSpent` (String, required)
- `zoneBSelfDirected` (String, required)
- `zoneBObservations` (String, required)
- `zoneBEngagementLevel` (String, required)
- `zoneBKeyBehavioursNotes` (String, required)

#### Zone C (Sensory/Movement)
- `zoneCTimeSpent` (String, required)
- `zoneCSelfDirected` (String, required)
- `zoneCObservations` (String, required)
- `zoneCEngagementLevel` (String, required)
- `zoneCKeyBehavioursNotes` (String, required)

#### Zone D (Reading/Logic)
- `zoneDTimeSpent` (String, required)
- `zoneDSelfDirected` (String, required)
- `zoneDObservations` (String, required)
- `zoneDEngagementLevel` (String, required)
- `zoneDKeyBehavioursNotes` (String, required)

### Meta Learning Skill Indicators
- `selfRegulationObserved` (String, required)
- `selfRegulationBehaviourNotes` (String, required)
- `curiosityObserved` (String, required)
- `curiosityBehaviourNotes` (String, required)
- `socialEngagementObserved` (String, required)
- `socialEngagementBehaviourNotes` (String, required)
- `emotionalRegulationObserved` (String, required)
- `emotionalRegulationBehaviourNotes` (String, required)
- `confidenceAutonomyObserved` (String, required)
- `confidenceAutonomyBehaviourNotes` (String, required)

### Learning Preference & Intelligence Summary

#### Multiple Intelligence Types (Evidence + Supporting Observations)
- `linguisticEvidence` (String, required)
- `linguisticSupportingObservation` (String, required)
- `logicalMathematicalEvidence` (String, required)
- `logicalMathematicalSupportingObservation` (String, required)
- `spatialEvidence` (String, required)
- `spatialSupportingObservation` (String, required)
- `bodilyKinestheticEvidence` (String, required)
- `bodilyKinestheticSupportingObservation` (String, required)
- `musicalEvidence` (String, required)
- `musicalSupportingObservation` (String, required)
- `existentialEvidence` (String, default: "")
- `existentialSupportingObservation` (String, default: "")
- `interpersonalEvidence` (String, required)
- `interpersonalSupportingObservation` (String, required)
- `intrapersonalEvidence` (String, required)
- `intrapersonalSupportingObservation` (String, required)
- `naturalisticEvidence` (String, required)
- `naturalisticSupportingObservation` (String, required)

### Parent-Child Dynamic Snapshot
- `parentProximity` (String, required)
- `parentInterventionLevel` (String, required)
- `parentInterventionStyle` (String, required)
- `childIndependenceLevel` (String, required)
- `childEmotionalPresentationWithParent` (String, required)
- `childIndependenceWhenParentEngaged` (String, required)
- `emotionalRegulationWithParentPresent` (String, required)

### Examiner Summary (Qualitative)
- `mostEngagedZone` (String, required)
- `dominantObservedIntelligences` (String, required)
- `initialLearningStyleImpressions` (String, required)
- `earlyFlagsNeedsFollowUp` (String, required)
- `selfDirectedVsSeekingGuidance` (String, required)
- `flagIndicators` (String, required)
- `additionalNotesObservations` (String, required)

---

## Form 5: Guided Observations Procedure

**Model**: `GuidedObservationsProcedure`

### Basic Information
- `childName` (String, required)
- `age` (String, required)
- `date` (DateTime, required)
- `examiner` (String, required)

### Guided Activity Ratings Grid (Scores: 1-5)
- `zoneAScore` (Int, required)
- `zoneANotes` (String, optional)
- `zoneBScore` (Int, required)
- `zoneBNotes` (String, optional)
- `zoneCScore` (Int, required)
- `zoneCNotes` (String, optional)
- `zoneDScore` (Int, required)
- `zoneDNotes` (String, optional)

### Meta Learning Skill Scoring (Scores: 1-5)
- `metaCuriosityScore` (Int, required)
- `metaCuriosityNotes` (String, optional)
- `metaSelfRegulationScore` (Int, required)
- `metaSelfRegulationNotes` (String, optional)
- `metaConfidenceScore` (Int, required)
- `metaConfidenceNotes` (String, optional)
- `metaCollaborationScore` (Int, required)
- `metaCollaborationNotes` (String, optional)
- `metaEmotionalAwarenessScore` (Int, required)
- `metaEmotionalAwarenessNotes` (String, optional)

### Intelligence & Learning Type Check-In
Each intelligence type has evidence level ("moderate" or "strong") and observation notes:
- `intelLinguisticEvidence` (String, optional)
- `intelLinguisticObservation` (String, optional)
- `intelLogicalEvidence` (String, optional)
- `intelLogicalObservation` (String, optional)
- `intelSpatialEvidence` (String, optional)
- `intelSpatialObservation` (String, optional)
- `intelBodilyEvidence` (String, optional)
- `intelBodilyObservation` (String, optional)
- `intelMusicalEvidence` (String, optional)
- `intelMusicalObservation` (String, optional)
- `intelInterpersonalEvidence` (String, optional)
- `intelInterpersonalObservation` (String, optional)
- `intelIntrapersonalEvidence` (String, optional)
- `intelIntrapersonalObservation` (String, optional)
- `intelNaturalisticEvidence` (String, optional)
- `intelNaturalisticObservation` (String, optional)
- `intelExistentialEvidence` (String, optional)
- `intelExistentialObservation` (String, optional)

### Parent-Child Dynamic Snapshot
- `parentProximity` (String, optional) - "close", "hovering", "distant"
- `parentInterventionLevel` (String, optional) - "low", "medium", "high"
- `parentInterventionStyle` (String, optional) - "directive", "supportive", "detached"
- `childIndependenceLevel` (String, optional)
- `childEmotionalPresentation` (String, optional)
- `childIndependenceWhenParentEngaged` (String, optional)
- `emotionalRegulationWithParentPresent` (String, optional)

### Examiner Final Comments
- `mostEngagedZone` (String, optional)
- `dominantObservedIntelligences` (String, optional)
- `initialLearningStyleImpressions` (String, optional)
- `earlyFlagsNeedsFollowUp` (String, optional)
- `selfDirectedVsSeekingGuidance` (String, optional)
- `flagIndicators` (String, optional)
- `additionalNotes` (String, optional)

### Interaction Summary
- `preferredZone` (String, optional)
- `initialBehaviour` (String, optional)
- `opennessToAdultGuidance` (String, optional)
- `mostRevealingActivity` (String, optional)
- `crossReferenceStep5` (String, optional)
- `curiosityAndExploration` (String, optional)
- `focusAndAttentionSpan` (String, optional)
- `engagementWithAdultDirection` (String, optional)

### Additional Observations
- `resilienceInChallenge` (String, optional)
- `emotionRegulationSignals` (String, optional)
- `caregiverInteractionStyle` (String, optional)
- `recommendationsForSupport` (String, optional)

---

## Form 6: Parent-Child Dynamic Observation

**Model**: `ParentChildDynamicObservation`

### Child Information
- `childFullName` (String, optional)
- `childAge` (String, optional)
- `date` (String, optional)
- `examiner` (String, optional)

### Joint Story Creation (10 minutes) - Ratings 1-5
- `sharedIdeaExchangeRating` (Int, optional)
- `sharedIdeaExchangeNotes` (String, optional)
- `emotionalWarmthRating` (Int, optional)
- `emotionalWarmthNotes` (String, optional)
- `balanceOfLeadershipRating` (Int, optional)
- `balanceOfLeadershipNotes` (String, optional)
- `communicationStyleRating` (Int, optional)
- `communicationStyleNotes` (String, optional)
- `mutualCreativityRating` (Int, optional)
- `mutualCreativityNotes` (String, optional)

### Separation - Child Continues Solo (10 minutes) - Ratings 1-5
- `independenceRating` (Int, optional)
- `independenceNotes` (String, optional)
- `confidenceHesitationRating` (Int, optional)
- `confidenceHesitationNotes` (String, optional)
- `taskEngagementRating` (Int, optional)
- `taskEngagementNotes` (String, optional)
- `creativeExpansionRating` (Int, optional)
- `creativeExpansionNotes` (String, optional)

### Teaching Moment - Comic Strip (10 minutes) - Ratings 1-5
- `teachingStyleRating` (Int, optional)
- `teachingStyleNotes` (String, optional)
- `patienceEncouragementRating` (Int, optional)
- `patienceEncouragementNotes` (String, optional)
- `parentClarityRating` (Int, optional)
- `parentClarityNotes` (String, optional)
- `childEngagementRating` (Int, optional)
- `childEngagementNotes` (String, optional)

### Parenting Style & Dynamic Insights (Boolean flags)
- `parentDominantStyleDirective` (Boolean, default: false)
- `parentDominantStyleSupportive` (Boolean, default: false)
- `parentDominantStyleDetached` (Boolean, default: false)
- `parentDominantStyleFacilitative` (Boolean, default: false)
- `emotionalAttunementHigh` (Boolean, default: false)
- `emotionalAttunementModerate` (Boolean, default: false)
- `emotionalAttunementLow` (Boolean, default: false)
- `encouragementStylePraiseFocused` (Boolean, default: false)
- `encouragementStyleProcessFocused` (Boolean, default: false)
- `encouragementStyleCorrectionFocused` (Boolean, default: false)
- `attachmentSignalSecure` (Boolean, default: false)
- `attachmentSignalAnxious` (Boolean, default: false)
- `attachmentSignalAvoidant` (Boolean, default: false)
- `attachmentSignalDisengaged` (Boolean, default: false)

### Child Meta-Skills During Assessment (Boolean + Notes)
- `confidenceAutonomyObserved` (Boolean, default: false)
- `confidenceAutonomyNotes` (String, optional)
- `emotionalRegulationObserved` (Boolean, default: false)
- `emotionalRegulationNotes` (String, optional)
- `curiosityObserved` (Boolean, default: false)
- `curiosityNotes` (String, optional)
- `creativityExpressionObserved` (Boolean, default: false)
- `creativityExpressionNotes` (String, optional)
- `selfDirectedLearningObserved` (Boolean, default: false)
- `selfDirectedLearningNotes` (String, optional)
- `communicationObserved` (Boolean, default: false)
- `communicationNotes` (String, optional)

### Learning Type & Intelligence Clues (Boolean + Strongly Evident + Notes)
- `linguisticObserved` (Boolean, default: false)
- `linguisticStronglyEvident` (Boolean, default: false)
- `linguisticNotes` (String, optional)
- `logicalMathematicalObserved` (Boolean, default: false)
- `logicalMathematicalStronglyEvident` (Boolean, default: false)
- `logicalMathematicalNotes` (String, optional)
- `spatialObserved` (Boolean, default: false)
- `spatialStronglyEvident` (Boolean, default: false)
- `spatialNotes` (String, optional)
- `bodilyKinestheticObserved` (Boolean, default: false)
- `bodilyKinestheticStronglyEvident` (Boolean, default: false)
- `bodilyKinestheticNotes` (String, optional)
- `musicalObserved` (Boolean, default: false)
- `musicalStronglyEvident` (Boolean, default: false)
- `musicalNotes` (String, optional)
- `interpersonalObserved` (Boolean, default: false)
- `interpersonalStronglyEvident` (Boolean, default: false)
- `interpersonalNotes` (String, optional)
- `intrapersonalObserved` (Boolean, default: false)
- `intrapersonalStronglyEvident` (Boolean, default: false)
- `intrapersonalNotes` (String, optional)
- `naturalisticObserved` (Boolean, default: false)
- `naturalisticStronglyEvident` (Boolean, default: false)
- `naturalisticNotes` (String, optional)
- `existentialObserved` (Boolean, default: false)
- `existentialStronglyEvident` (Boolean, default: false)
- `existentialNotes` (String, optional)

### Dynamic Summary & Reflection
- `parentChildDynamicStandout` (String, optional)
- `childExpressiveWithWithoutParent` (String, optional)
- `parentGuidanceHindrance` (String, optional)

### Red Flags or Follow-up Needs (Boolean flags)
- `emotionalDistressFlag` (Boolean, default: false)
- `parentOverDirectionFlag` (Boolean, default: false)
- `confidenceIssueFlag` (Boolean, default: false)
- `noFlagsFlag` (Boolean, default: false)
- `redFlagsNotes` (String, optional)

---

## Form 7: Interview Questions (KS1 or KS2)

### Form 7a: KS1 Interview Questions

**Model**: `KS1InterviewQuestions`

### Child Information
- `fullName` (String, required)
- `age` (String, required)
- `date` (String, optional)

### Interview Questions (Scored 1-5 with Notes)
- `whatDoYouDoSomethingHard` (Int, optional) - Growth mindset & perseverance
- `whatDoYouDoSomethingHardNotes` (String, optional)
- `howDoYouFeelWhenTryNew` (Int, optional) - Emotional awareness & regulation
- `howDoYouFeelWhenTryNewNotes` (String, optional)
- `whatWouldYouDoIfFriendSad` (Int, optional) - Empathy & social reasoning
- `whatWouldYouDoIfFriendSadNotes` (String, optional)
- `tellMeAboutFavouriteStory` (Int, optional) - Narrative & communication skills
- `tellMeAboutFavouriteStoryNotes` (String, optional)
- `favouriteThingToLearn` (Int, optional)
- `favouriteThingToLearnNotes` (String, optional)
- `whatElseUcanDoWithASpoonOtherThanEat` (Int, optional)
- `whatElseUcanDoWithASpoonOtherThanEatNotes` (String, optional)
- `howShareCookiesBetweenFriends` (Int, optional) - Problem-solving & fairness
- `howShareCookiesBetweenFriendsNotes` (String, optional)
- `puzzleActivity` (Int, optional)
- `puzzleActivityNotes` (String, optional)
- `tableInteraction` (Int, optional)
- `tableInteractionNotes` (String, optional)
- `drawSomethingYouInvent` (Int, optional) - Imagination & expression
- `drawSomethingYouInventNotes` (String, optional)
- `doYouLikeLearnByListening` (String, optional) - Learning preference awareness (not scored)
- `canYouSortShapesByColor` (Int, optional) - Motor coordination & logic
- `canYouSortShapesByColorNotes` (String, optional)
- `canYouTeachMeDrawMummy` (Int, optional) - Communication clarity & social confidence
- `canYouTeachMeDrawMummyNotes` (String, optional)
- `doYouLikePlayingWithFriends` (Int, optional) - Social openness & preference
- `doYouLikePlayingWithFriendsNotes` (String, optional)

### Parental Interference
- `parentalInterferenceFlagged` (Boolean, default: false)
- `parentalInterferenceNotes` (String, optional)

### Total Score
- `totalScore` (Int, optional)

---

### Form 7b: KS2 Interview Questions

**Model**: `KS2InterviewQuestions`

### Child Information
- `fullName` (String, optional)
- `age` (String, optional)
- `date` (String, optional)

### Interview Questions (Scored 1-5 with Notes)

#### Questions 1-6
- `somethingAlwaysWantedToLearn` (Int, optional)
- `somethingAlwaysWantedToLearnNotes` (String, optional)
- `fiveThingsWithPaperclip` (Int, optional)
- `fiveThingsWithPaperclipNotes` (String, optional)
- `finishSchoolworkEarly` (Int, optional)
- `finishSchoolworkEarlyNotes` (String, optional)
- `logicChallenge` (Int, optional)
- `logicChallengeNotes` (String, optional)
- `somethingHard` (Int, optional)
- `somethingHardNotes` (String, optional)
- `answerIsWrong` (Int, optional)
- `answerIsWrongNotes` (String, optional)

#### Questions 7-14
- `favouriteThingOnComputer` (Int, optional)
- `favouriteThingOnComputerNotes` (String, optional)
- `likeWorkingWithOthers` (Int, optional)
- `likeWorkingWithOthersNotes` (String, optional)
- `drawMachineInvention` (Int, optional)
- `drawMachineInventionNotes` (String, optional)
- `confidenceTryingNewThings` (Int, optional)
- `confidenceTryingNewThingsNotes` (String, optional)
- `helpedSomeoneLearn` (Int, optional)
- `helpedSomeoneLearnNotes` (String, optional)
- `magicWandMakesSmarter` (Int, optional)
- `magicWandMakesSmarterNotes` (String, optional)
- `explainInternetToPast` (Int, optional)
- `explainInternetToPastNotes` (String, optional)
- `inChargeOfWorld` (Int, optional)
- `inChargeOfWorldNotes` (String, optional)

#### Questions 15-20
- `threeThingsGoodAt` (Int, optional)
- `threeThingsGoodAtNotes` (String, optional)
- `somethingGetBetterAt` (Int, optional)
- `somethingGetBetterAtNotes` (String, optional)
- `inventJobDoesntExist` (Int, optional)
- `inventJobDoesntExistNotes` (String, optional)
- `learningPreference` (String, optional) - Not scored - record answer
- `digitalTasks` (Int, optional)
- `digitalTasksNotes` (String, optional)
- `playingWithFriends` (Int, optional)
- `playingWithFriendsNotes` (String, optional)

### Parental Interference
- `parentalInterferenceFlagged` (Boolean, default: false)
- `parentalInterferenceNotes` (String, optional)

### Total Score
- `totalScore` (Int, optional)

---

## Form 8: Understanding Parent

**Model**: `UnderstandingParent`

### Child & Session Info
- `childName` (String, optional)
- `age` (String, optional)
- `date` (String, optional)
- `examiner` (String, optional)
- `occupation` (String, optional)

### Ratings Grid (Stored as JSON)
- `grid` (Json, optional) - Complex grid structure with multiple domains, categories, and notes

### Additional Notes
- `additionalNotes` (String, optional)

**Note**: The `grid` field is a JSON structure containing parent understanding assessments across multiple domains. The structure typically includes:
- Domain categories (e.g., Educational Philosophy, Communication Style, Support Approach)
- Selected categories per domain
- Notes per domain/category combination

---

## Form 9: Comprehensive Profile Sheet

**Model**: `ComprehensiveProfileSheet`

### Child Information
- `childName` (String, optional)
- `childAge` (String, optional)
- `assessmentDate` (String, optional)
- `recommendedPlacement` (String, optional)
- `examiner` (String, optional)

### Cognitive Skills Profile (Boolean selections per category)

#### Processing Speed
- `processingSpeedSteadyReflective` (Boolean, default: false)
- `processingSpeedFlexibleAdaptive` (Boolean, default: false)
- `processingSpeedRapidResponsive` (Boolean, default: false)

#### Working Memory
- `workingMemoryAreaOfGrowth` (Boolean, default: false)
- `workingMemoryDeveloping` (Boolean, default: false)
- `workingMemoryConsistentConfident` (Boolean, default: false)

#### Attention Focus
- `attentionFocusVariable` (Boolean, default: false)
- `attentionFocusFocusedWithCues` (Boolean, default: false)
- `attentionFocusSelfDirected` (Boolean, default: false)

#### Verbal Reasoning
- `verbalReasoningExploring` (Boolean, default: false)
- `verbalReasoningDeveloping` (Boolean, default: false)
- `verbalReasoningFluentCommunicator` (Boolean, default: false)

#### Phonological Awareness
- `phonologicalAwarenessExploring` (Boolean, default: false)
- `phonologicalAwarenessLinking` (Boolean, default: false)
- `phonologicalAwarenessConfident` (Boolean, default: false)

#### Visual-Spatial Skills
- `visualSpatialSkillsExploring` (Boolean, default: false)
- `visualSpatialSkillsDeveloping` (Boolean, default: false)
- `visualSpatialSkillsConfident` (Boolean, default: false)

#### Numerical Pattern
- `numericalPatternConcrete` (Boolean, default: false)
- `numericalPatternEmergingAbstract` (Boolean, default: false)
- `numericalPatternFlexibleThinker` (Boolean, default: false)

#### Additional Cognitive Notes
- `additionalCognitiveNotes` (String, optional)

### Learning Style Preference (Boolean + Evidence)

- `visualObserved` (Boolean, default: false)
- `visualObservedEvidence` (String, optional)
- `auditoryObserved` (Boolean, default: false)
- `auditoryObservedEvidence` (String, optional)
- `kinestheticTactileObserved` (Boolean, default: false)
- `kinestheticTactileObservedEvidence` (String, optional)
- `readingWritingObserved` (Boolean, default: false)
- `readingWritingObservedEvidence` (String, optional)
- `verbalLinguisticObserved` (Boolean, default: false)
- `verbalLinguisticObservedEvidence` (String, optional)
- `logicalMathematicalObserved` (Boolean, default: false)
- `logicalMathematicalObservedEvidence` (String, optional)
- `socialInterpersonalObserved` (Boolean, default: false)
- `socialInterpersonalObservedEvidence` (String, optional)
- `solitaryIntrapersonalObserved` (Boolean, default: false)
- `solitaryIntrapersonalObservedEvidence` (String, optional)
- `multimodalObserved` (Boolean, default: false)
- `multimodalObservedEvidence` (String, optional)

### Dominant Intelligence Types (Boolean + Strongly Evident + Notes)

- `linguisticObserved` (Boolean, default: false)
- `linguisticStronglyEvident` (Boolean, default: false)
- `linguisticNotes` (String, optional)
- `logicalMathematicalObservedInt` (Boolean, default: false)
- `logicalMathematicalStronglyEvidentInt` (Boolean, default: false)
- `logicalMathematicalNotesInt` (String, optional)
- `spatialObserved` (Boolean, default: false)
- `spatialStronglyEvident` (Boolean, default: false)
- `spatialNotes` (String, optional)
- `bodilyKinestheticObserved` (Boolean, default: false)
- `bodilyKinestheticStronglyEvident` (Boolean, default: false)
- `bodilyKinestheticNotes` (String, optional)
- `musicalObserved` (Boolean, default: false)
- `musicalStronglyEvident` (Boolean, default: false)
- `musicalNotes` (String, optional)
- `interpersonalObserved` (Boolean, default: false)
- `interpersonalStronglyEvident` (Boolean, default: false)
- `interpersonalNotes` (String, optional)
- `intrapersonalObserved` (Boolean, default: false)
- `intrapersonalStronglyEvident` (Boolean, default: false)
- `intrapersonalNotes` (String, optional)
- `naturalisticObserved` (Boolean, default: false)
- `naturalisticStronglyEvident` (Boolean, default: false)
- `naturalisticNotes` (String, optional)
- `existentialObserved` (Boolean, default: false)
- `existentialStronglyEvident` (Boolean, default: false)
- `existentialNotes` (String, optional)

### Meta-Learning Pillars & Soft Skills Profile

#### Summary Insights
- `summaryInsightLearnerType` (String, optional) - **Key field for learner type analysis**
- `summaryInsightLearningEnvironments` (String, optional) - **Key field for learning environment preferences**

#### Self-Regulation (Boolean + Notes)
- `selfRegulationEmerging` (Boolean, default: false)
- `selfRegulationDeveloping` (Boolean, default: false)
- `selfRegulationStrong` (Boolean, default: false)
- `selfRegulationNotesEvidence` (String, optional) - **Key field for meta-learning analysis**

#### Emotional Intelligence (Boolean + Notes)
- `emotionalIntelligenceEmerging` (Boolean, default: false)
- `emotionalIntelligenceDeveloping` (Boolean, default: false)
- `emotionalIntelligenceStrong` (Boolean, default: false)
- `emotionalIntelligenceNotesEvidence` (String, optional)

#### Social Communication (Boolean + Notes)
- `socialCommunicationEmerging` (Boolean, default: false)
- `socialCommunicationDeveloping` (Boolean, default: false)
- `socialCommunicationStrong` (Boolean, default: false)
- `socialCommunicationNotesEvidence` (String, optional)

#### Cognitive Flexibility (Boolean + Notes)
- `cognitiveFlexibilityEmerging` (Boolean, default: false)
- `cognitiveFlexibilityDeveloping` (Boolean, default: false)
- `cognitiveFlexibilityStrong` (Boolean, default: false)
- `cognitiveFlexibilityNotesEvidence` (String, optional)

#### Resilience & Confidence (Boolean + Notes)
- `resilienceConfidenceEmerging` (Boolean, default: false)
- `resilienceConfidenceDeveloping` (Boolean, default: false)
- `resilienceConfidenceStrong` (Boolean, default: false)
- `resilienceConfidenceNotesEvidence` (String, optional)

#### Creativity & Expression (Boolean + Notes)
- `creativityExpressionEmerging` (Boolean, default: false)
- `creativityExpressionDeveloping` (Boolean, default: false)
- `creativityExpressionStrong` (Boolean, default: false)
- `creativityExpressionNotesEvidence` (String, optional)

#### Soft Skill Summary
- `softSkillSummaryNotes` (String, optional)

### Academic & Digital Readiness

#### Subject Levels
- `englishCurrentLevel` (String, optional)
- `englishNotes` (String, optional)
- `mathsCurrentLevel` (String, optional)
- `mathsNotes` (String, optional)
- `scienceCurrentLevel` (String, optional)
- `scienceNotes` (String, optional)

#### Technology Use (Boolean selections)
- `technologyUseLow` (Boolean, default: false)
- `technologyUseModerate` (Boolean, default: false)
- `technologyUseHigh` (Boolean, default: false)
- `technologyUseExceptional` (Boolean, default: false)

#### Academic Notes
- `academicNotes` (String, optional)

### Interview-Based Verbal Assessment Summary

#### Zones A-D Observations
- `zonesADPreferredZones` (String, optional)
- `zonesADSelfDirectedOrReliant` (String, optional)
- `zonesADResponseToChallenge` (String, optional)
- `zonesADEvidenceDominantIntelligence` (String, optional)

#### Peer Session Observations
- `peerSessionInitiateOrFollow` (String, optional)
- `peerSessionRoleAdopted` (String, optional)
- `peerSessionConflictHandled` (String, optional)

#### Parent-Child Dynamic Observations
- `parentChildEmotionalTone` (String, optional)
- `parentChildFacilitativeVsDirective` (String, optional)
- `parentChildResponseWorkingSolo` (String, optional)

#### KS1 Interview Score & Interpretation
- `ks1Score` (Int, optional)
- `ks1InterpretationEmerging` (Boolean, default: false)
- `ks1InterpretationBasic` (Boolean, default: false)
- `ks1InterpretationStrong` (Boolean, default: false)
- `ks1InterpretationExceptional` (Boolean, default: false)
- `ks1SuggestedAction` (String, optional)
- `ks1ScoreRange1325Action` (String, optional)
- `ks1ScoreRange2640Action` (String, optional)
- `ks1ScoreRange4155Action` (String, optional)
- `ks1ScoreRange5665Action` (String, optional)

#### KS2 Interview Score & Interpretation
- `ks2Score` (Int, optional)
- `ks2InterpretationEmerging` (Boolean, default: false)
- `ks2InterpretationBasic` (Boolean, default: false)
- `ks2InterpretationStrong` (Boolean, default: false)
- `ks2InterpretationExceptional` (Boolean, default: false)
- `ks2SuggestedAction` (String, optional)
- `ks2ScoreRange2044Action` (String, optional)
- `ks2ScoreRange4569Action` (String, optional)
- `ks2ScoreRange7089Action` (String, optional)
- `ks2ScoreRange9095Action` (String, optional)

#### Qualitative Insights
- `qualitativeInsightsVerbalResponses` (String, optional)

### Component Recommendations

- `aiCurriculumEntryPoint` (String, optional)
- `peerEngagementGroupLearning` (Boolean, default: false)
- `peerEngagementNeedsScaffolding` (Boolean, default: false)
- `peerEngagementMonitorConflict` (Boolean, default: false)
- `mentorshipLeadershipPotential` (Boolean, default: false)
- `mentorshipRecommendOneOnOne` (Boolean, default: false)
- `mentorshipNotApplicable` (Boolean, default: false)
- `homeSupportTips` (String, optional)

### Final Summary Statement

- `finalSummaryStrengths` (String, optional)
- `finalSummaryApproaches` (String, optional)
- `finalSummaryTargetedSupport` (String, optional)
- `compiledBy` (String, optional)
- `compiledDate` (String, optional)

---

## Key Data Points for AI Analysis

### Learning Style Analysis
- **Primary sources**: Form 4 (Initial Observation), Form 5 (Guided Observations), Form 9 (Comprehensive Profile Sheet)
- **Key fields**: Visual/Auditory/Kinesthetic/Reading-Writing observations with evidence notes
- **Zone preferences**: Zone A/B/C/D engagement levels and time spent

### Personality Traits
- **Primary sources**: Form 3a (Parent Questionnaire), Form 3b (Caregiver Questionnaire), Form 3c (Outsider Questionnaire), Form 4, Form 5, Form 6
- **Key fields**: Emotional traits, social behavior, response to challenges, emotional regulation observations

### Meta-Learning Skills
- **Primary sources**: Form 4, Form 5, Form 9
- **Key fields**: 
  - Self-regulation scores and notes
  - Curiosity scores and observations
  - Confidence/autonomy observations
  - Emotional regulation evidence
  - Collaboration/communication skills

### Subject Levels
- **Primary sources**: Form 9 (Comprehensive Profile Sheet)
- **Key fields**: English, Maths, Science current levels with notes

### Intelligence Types (Multiple Intelligences)
- **Primary sources**: Form 4, Form 5, Form 6, Form 9
- **Key fields**: 9 intelligence types (Linguistic, Logical-Mathematical, Spatial, Bodily-Kinesthetic, Musical, Interpersonal, Intrapersonal, Naturalistic, Existential) with evidence levels and supporting observations

### Parent-Child Dynamics
- **Primary sources**: Form 6 (Parent-Child Dynamic Observation), Form 3a (Parent Questionnaire)
- **Key fields**: Parenting style, attachment signals, emotional attunement, independence levels

### Social & Behavioral Skills
- **Primary sources**: Form 7 (Interview Questions), Form 6 (Parent-Child), Form 8 (Peer Dynamic Observation - if applicable)
- **Key fields**: Social interaction patterns, communication skills, conflict resolution, empathy

---

## Recommendations for AI Analysis

1. **Cross-reference data** across forms to validate insights (e.g., learning style should be consistent across Form 4, Form 5, and Form 9)

2. **Prioritize quantitative data** (scores, ratings) but supplement with qualitative notes for context

3. **Look for patterns** across multiple observations (e.g., if self-regulation is consistently low across Form 4 and Form 5, it's a strong indicator)

4. **Use parent/caregiver perspectives** (Form 3a, 3b, 3c) to understand home environment and validate school observations

5. **Consider developmental context** using age and school year information

6. **Flag inconsistencies** between different observers (parent vs. caregiver vs. teacher) as areas needing deeper analysis

7. **Generate specific recommendations** based on:
   - Identified learning style preferences
   - Meta-learning skill gaps
   - Parent-child dynamics insights
   - Social and behavioral observations
   - Cognitive skill profiles

---

## Data Format

All data is currently sent to the AI API as a concatenated text string in the format:
```
=== UTL ASSESSMENT COMPREHENSIVE DATA ===
Application ID: ...
Child Name: ...
[Form sections with field names and values]
```

**Recommendation**: Consider structuring the data as JSON with clear form sections and field mappings for better AI parsing and analysis accuracy.

---

## Notes

- Some fields are optional and may be null/empty
- Boolean fields indicate presence/absence of traits or selections
- Score fields (Int) typically range from 1-5
- String fields contain free-form text observations and notes
- Date/DateTime fields are in ISO format
- The Understanding Parent form uses a JSON structure for the grid field

