-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "phone" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."applications" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'submitted',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adminComment" TEXT,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "paymentAmount" INTEGER,
    "paidAt" TIMESTAMP(3),
    "currentStage" INTEGER NOT NULL DEFAULT 1,
    "totalStages" INTEGER NOT NULL DEFAULT 10,
    "parentFullName" TEXT NOT NULL,
    "parentEmail" TEXT NOT NULL,
    "parentPhone" TEXT,
    "relationToChild" TEXT,
    "parentCity" TEXT,
    "parentEthnicity" TEXT,
    "childFullName" TEXT NOT NULL,
    "childDateOfBirth" TIMESTAMP(3),
    "childAge" INTEGER,
    "childGender" TEXT,
    "childEthnicity" TEXT,
    "childSchoolYear" TEXT,
    "childCurrentSchool" TEXT,
    "childSchoolType" TEXT,
    "childSchoolTypeOther" TEXT,
    "childDiagnosedNeeds" TEXT,
    "caregiverFullName" TEXT,
    "caregiverPhone" TEXT,
    "qExcitesMost" TEXT NOT NULL,
    "qNonTraditionalReason" TEXT NOT NULL,
    "qBiggestHope" TEXT NOT NULL,
    "enjoysTech" TEXT NOT NULL,
    "enjoysHandsOn" TEXT NOT NULL,
    "consentContact" BOOLEAN NOT NULL,
    "consentUpdates" BOOLEAN NOT NULL,
    "consentBiometric" BOOLEAN,
    "userId" INTEGER,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_requests" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "user_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."screening_calls" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "childName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "callerName" TEXT NOT NULL,
    "crmLeadTag" TEXT,
    "recordingPermission" TEXT,
    "introductionNotes" TEXT,
    "applicationReason" TEXT,
    "currentSchoolIssues" TEXT,
    "techResponseAtHome" TEXT,
    "parentWarmUpNotes" TEXT,
    "flexibleModelOpenness" TEXT,
    "childFreeTime" TEXT,
    "adaptiveTechComfort" TEXT,
    "fitClarificationNotes" TEXT,
    "generalNotes" TEXT,
    "parentReactionsNotes" TEXT,
    "comprehensiveQuestionnaires" BOOLEAN NOT NULL DEFAULT false,
    "guidebookInfo" BOOLEAN NOT NULL DEFAULT false,
    "walkthroughDate" TEXT,
    "assessmentInvite" TEXT,
    "additionalNotes" TEXT,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "screening_calls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "screening_calls_applicationId_key" ON "public"."screening_calls"("applicationId");

-- AddForeignKey
ALTER TABLE "public"."applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_requests" ADD CONSTRAINT "user_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."screening_calls" ADD CONSTRAINT "screening_calls_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
