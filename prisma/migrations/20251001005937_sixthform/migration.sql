-- CreateTable
CREATE TABLE "public"."parent_guardian_questionnaires" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "childName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "typicalWeekday" TEXT NOT NULL,
    "screenTimeHours" TEXT NOT NULL,
    "homeActivities" TEXT NOT NULL,
    "culturalBackground" TEXT NOT NULL,
    "rulesDisciplineApproach" TEXT NOT NULL,
    "supportWhenStruggling" TEXT NOT NULL,
    "strengthsInterests" TEXT NOT NULL,
    "challengingAreas" TEXT NOT NULL,
    "learningApproach" TEXT NOT NULL,
    "previousEducationalExperience" TEXT NOT NULL,
    "covidLearningExperience" TEXT NOT NULL,
    "supportiveLearningEnvironment" TEXT NOT NULL,
    "responseToFrustration" TEXT NOT NULL,
    "peerInteraction" TEXT NOT NULL,
    "emotionalBehavioralConcerns" TEXT NOT NULL,
    "seekingHelp" TEXT NOT NULL,
    "educationalHopesGoals" TEXT NOT NULL,
    "creativityMovementEmotionalRole" TEXT NOT NULL,
    "parentingStyle" TEXT NOT NULL,
    "technologyConcerns" TEXT NOT NULL,
    "applicationNumber" TEXT,
    "loggedToSystemDate" TEXT,
    "loggedBy" TEXT,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "parent_guardian_questionnaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."caregiver_questionnaires" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "childName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "careDuration" TEXT NOT NULL,
    "regularActivities" TEXT NOT NULL,
    "behaviorWithoutParent" TEXT NOT NULL,
    "toysGamesTasksEnjoyed" TEXT NOT NULL,
    "preferences" TEXT NOT NULL,
    "responseToDifficulties" TEXT NOT NULL,
    "engagementWithChosenActivity" TEXT NOT NULL,
    "engagementWithAssignedActivity" TEXT NOT NULL,
    "interactionWithChildren" TEXT NOT NULL,
    "seekingHelpComfort" TEXT NOT NULL,
    "emotionalRegulationStrategies" TEXT NOT NULL,
    "emotionalStrengthsVulnerabilities" TEXT NOT NULL,
    "applicationNumber" TEXT,
    "loggedToSystemDate" TEXT,
    "loggedBy" TEXT,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "caregiver_questionnaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."outsider_questionnaires" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "childName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "relationshipToChild" TEXT NOT NULL,
    "interactionContext" TEXT NOT NULL,
    "learningTendenciesCuriosity" TEXT NOT NULL,
    "emotionalTraits" TEXT NOT NULL,
    "adaptationToChanges" TEXT NOT NULL,
    "communicationSkills" TEXT NOT NULL,
    "groupBehavior" TEXT NOT NULL,
    "concernsNotes" TEXT NOT NULL,
    "emotionalStrengthsVulnerabilities" TEXT NOT NULL,
    "applicationNumber" TEXT,
    "loggedToSystemDate" TEXT,
    "loggedBy" TEXT,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "outsider_questionnaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."facility_walkthrough_checklists" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "examinerName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "welcomeOverviewCompleted" BOOLEAN NOT NULL DEFAULT false,
    "tourLearningZonesCompleted" BOOLEAN NOT NULL DEFAULT false,
    "technologyDemonstrationCompleted" BOOLEAN NOT NULL DEFAULT false,
    "safetySecurityMeasuresCompleted" BOOLEAN NOT NULL DEFAULT false,
    "qaSessionCompleted" BOOLEAN NOT NULL DEFAULT false,
    "scheduleAssessmentDatesCompleted" BOOLEAN NOT NULL DEFAULT false,
    "welcomeOverviewNotes" TEXT NOT NULL,
    "tourLearningZonesNotes" TEXT NOT NULL,
    "technologyDemonstrationNotes" TEXT NOT NULL,
    "safetySecurityMeasuresNotes" TEXT NOT NULL,
    "qaSessionNotes" TEXT NOT NULL,
    "scheduleAssessmentDatesNotes" TEXT NOT NULL,
    "applicationNumber" TEXT,
    "loggedToSystemDate" TEXT,
    "loggedBy" TEXT,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "facility_walkthrough_checklists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."initial_observation_forms" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "zoneATimeSpent" TEXT NOT NULL,
    "zoneASelfDirected" TEXT NOT NULL,
    "zoneAObservations" TEXT NOT NULL,
    "zoneAEngagementLevel" TEXT NOT NULL,
    "zoneAKeyBehavioursNotes" TEXT NOT NULL,
    "zoneBTimeSpent" TEXT NOT NULL,
    "zoneBSelfDirected" TEXT NOT NULL,
    "zoneBObservations" TEXT NOT NULL,
    "zoneBEngagementLevel" TEXT NOT NULL,
    "zoneBKeyBehavioursNotes" TEXT NOT NULL,
    "zoneCTimeSpent" TEXT NOT NULL,
    "zoneCSelfDirected" TEXT NOT NULL,
    "zoneCObservations" TEXT NOT NULL,
    "zoneCEngagementLevel" TEXT NOT NULL,
    "zoneCKeyBehavioursNotes" TEXT NOT NULL,
    "zoneDTimeSpent" TEXT NOT NULL,
    "zoneDSelfDirected" TEXT NOT NULL,
    "zoneDObservations" TEXT NOT NULL,
    "zoneDEngagementLevel" TEXT NOT NULL,
    "zoneDKeyBehavioursNotes" TEXT NOT NULL,
    "selfRegulationObserved" TEXT NOT NULL,
    "selfRegulationBehaviourNotes" TEXT NOT NULL,
    "curiosityObserved" TEXT NOT NULL,
    "curiosityBehaviourNotes" TEXT NOT NULL,
    "socialEngagementObserved" TEXT NOT NULL,
    "socialEngagementBehaviourNotes" TEXT NOT NULL,
    "emotionalRegulationObserved" TEXT NOT NULL,
    "emotionalRegulationBehaviourNotes" TEXT NOT NULL,
    "confidenceAutonomyObserved" TEXT NOT NULL,
    "confidenceAutonomyBehaviourNotes" TEXT NOT NULL,
    "linguisticEvidence" TEXT NOT NULL,
    "linguisticSupportingObservation" TEXT NOT NULL,
    "logicalMathematicalEvidence" TEXT NOT NULL,
    "logicalMathematicalSupportingObservation" TEXT NOT NULL,
    "spatialEvidence" TEXT NOT NULL,
    "spatialSupportingObservation" TEXT NOT NULL,
    "bodilyKinestheticEvidence" TEXT NOT NULL,
    "bodilyKinestheticSupportingObservation" TEXT NOT NULL,
    "musicalEvidence" TEXT NOT NULL,
    "musicalSupportingObservation" TEXT NOT NULL,
    "interpersonalEvidence" TEXT NOT NULL,
    "interpersonalSupportingObservation" TEXT NOT NULL,
    "intrapersonalEvidence" TEXT NOT NULL,
    "intrapersonalSupportingObservation" TEXT NOT NULL,
    "naturalisticEvidence" TEXT NOT NULL,
    "naturalisticSupportingObservation" TEXT NOT NULL,
    "parentProximity" TEXT NOT NULL,
    "parentInterventionLevel" TEXT NOT NULL,
    "parentInterventionStyle" TEXT NOT NULL,
    "childIndependenceLevel" TEXT NOT NULL,
    "childEmotionalPresentationWithParent" TEXT NOT NULL,
    "childIndependenceWhenParentEngaged" TEXT NOT NULL,
    "emotionalRegulationWithParentPresent" TEXT NOT NULL,
    "mostEngagedZone" TEXT NOT NULL,
    "dominantObservedIntelligences" TEXT NOT NULL,
    "initialLearningStyleImpressions" TEXT NOT NULL,
    "earlyFlagsNeedsFollowUp" TEXT NOT NULL,
    "selfDirectedVsSeekingGuidance" TEXT NOT NULL,
    "flagIndicators" TEXT NOT NULL,
    "additionalNotesObservations" TEXT NOT NULL,
    "applicationNumber" TEXT,
    "loggedToSystemDate" TEXT,
    "loggedBy" TEXT,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "initial_observation_forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."guided_observations_procedures" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "zoneAScore" TEXT NOT NULL,
    "zoneANotes" TEXT NOT NULL,
    "zoneBScore" TEXT NOT NULL,
    "zoneBNotes" TEXT NOT NULL,
    "zoneCScore" TEXT NOT NULL,
    "zoneCNotes" TEXT NOT NULL,
    "zoneDScore" TEXT NOT NULL,
    "zoneDNotes" TEXT NOT NULL,
    "guidingQ1" TEXT,
    "guidingQ2" TEXT,
    "guidingQ3" TEXT,
    "guidingQ4" TEXT,
    "guidingQ5" TEXT,
    "areaLikeBest" TEXT,
    "whatMakesInteresting" TEXT,
    "hardButFun" TEXT,
    "feelWhenTryingNew" TEXT,
    "teachGame" TEXT,
    "metaSelfReg" TEXT NOT NULL,
    "metaNotesSelfReg" TEXT,
    "metaCuriosity" TEXT NOT NULL,
    "metaNotesCuriosity" TEXT,
    "metaSocial" TEXT NOT NULL,
    "metaNotesSocial" TEXT,
    "metaEmotional" TEXT NOT NULL,
    "metaNotesEmotional" TEXT,
    "metaConfidence" TEXT NOT NULL,
    "metaNotesConfidence" TEXT,
    "intelLinguistic" TEXT,
    "intelLogical" TEXT,
    "intelSpatial" TEXT,
    "intelBodily" TEXT,
    "intelMusical" TEXT,
    "intelInterpersonal" TEXT,
    "intelIntrapersonal" TEXT,
    "intelNaturalistic" TEXT,
    "intelExistential" TEXT,
    "intelLinguisticEvidenceModerate" BOOLEAN DEFAULT false,
    "intelLinguisticEvidenceStrong" BOOLEAN DEFAULT false,
    "intelLogicalEvidenceModerate" BOOLEAN DEFAULT false,
    "intelLogicalEvidenceStrong" BOOLEAN DEFAULT false,
    "intelSpatialEvidenceModerate" BOOLEAN DEFAULT false,
    "intelSpatialEvidenceStrong" BOOLEAN DEFAULT false,
    "intelBodilyEvidenceModerate" BOOLEAN DEFAULT false,
    "intelBodilyEvidenceStrong" BOOLEAN DEFAULT false,
    "intelMusicalEvidenceModerate" BOOLEAN DEFAULT false,
    "intelMusicalEvidenceStrong" BOOLEAN DEFAULT false,
    "intelInterpersonalEvidenceModerate" BOOLEAN DEFAULT false,
    "intelInterpersonalEvidenceStrong" BOOLEAN DEFAULT false,
    "intelIntrapersonalEvidenceModerate" BOOLEAN DEFAULT false,
    "intelIntrapersonalEvidenceStrong" BOOLEAN DEFAULT false,
    "intelNaturalisticEvidenceModerate" BOOLEAN DEFAULT false,
    "intelNaturalisticEvidenceStrong" BOOLEAN DEFAULT false,
    "intelExistentialEvidenceModerate" BOOLEAN DEFAULT false,
    "intelExistentialEvidenceStrong" BOOLEAN DEFAULT false,
    "parentProximity" TEXT,
    "parentInterventionLevel" TEXT,
    "parentInterventionStyle" TEXT,
    "childIndependenceLevel" TEXT,
    "childEmotionalWithParent" TEXT,
    "childIndependenceWhenParentEngaged" TEXT,
    "emotionalRegulationWithParentPresent" TEXT,
    "mostEngagedZone" TEXT,
    "dominantObservedIntelligences" TEXT,
    "initialLearningStyleImpressions" TEXT,
    "earlyFlagsNeedsFollowUp" TEXT,
    "selfDirectedVsSeekingGuidance" TEXT,
    "finalAdditionalNotes" TEXT,
    "interactionPreferredZone" TEXT,
    "interactionInitialBehaviour" TEXT,
    "interactionOpennessToAdultGuidance" TEXT,
    "interactionMostRevealingActivity" TEXT,
    "interactionCrossRefStep5" TEXT,
    "interactionCuriosityExploration" TEXT,
    "interactionFocusAttention" TEXT,
    "interactionEngagementWithAdult" TEXT,
    "interactionResilienceInChallenge" TEXT,
    "interactionEmotionRegulationSignals" TEXT,
    "interactionCaregiverInteractionStyle" TEXT,
    "interactionRecommendations" TEXT,
    "applicationNumber" TEXT,
    "observerName" TEXT,
    "assessmentDate" TEXT,
    "loggedToSystemDate" TEXT,
    "loggedBy" TEXT,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "guided_observations_procedures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "parent_guardian_questionnaires_applicationId_key" ON "public"."parent_guardian_questionnaires"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "caregiver_questionnaires_applicationId_key" ON "public"."caregiver_questionnaires"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "outsider_questionnaires_applicationId_key" ON "public"."outsider_questionnaires"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "facility_walkthrough_checklists_applicationId_key" ON "public"."facility_walkthrough_checklists"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "initial_observation_forms_applicationId_key" ON "public"."initial_observation_forms"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "guided_observations_procedures_applicationId_key" ON "public"."guided_observations_procedures"("applicationId");

-- AddForeignKey
ALTER TABLE "public"."parent_guardian_questionnaires" ADD CONSTRAINT "parent_guardian_questionnaires_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."caregiver_questionnaires" ADD CONSTRAINT "caregiver_questionnaires_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."outsider_questionnaires" ADD CONSTRAINT "outsider_questionnaires_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."facility_walkthrough_checklists" ADD CONSTRAINT "facility_walkthrough_checklists_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."initial_observation_forms" ADD CONSTRAINT "initial_observation_forms_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."guided_observations_procedures" ADD CONSTRAINT "guided_observations_procedures_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
