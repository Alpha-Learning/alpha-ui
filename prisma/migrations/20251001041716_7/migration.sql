-- CreateTable
CREATE TABLE "public"."ks1_interview_questions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "whatDoYouDoSomethingHard" INTEGER,
    "whatDoYouDoSomethingHardNotes" TEXT,
    "howDoYouFeelWhenTryNew" INTEGER,
    "howDoYouFeelWhenTryNewNotes" TEXT,
    "whatWouldYouDoIfFriendSad" INTEGER,
    "whatWouldYouDoIfFriendSadNotes" TEXT,
    "tellMeAboutFavouriteStory" INTEGER,
    "tellMeAboutFavouriteStoryNotes" TEXT,
    "favouriteThingToLearn" INTEGER,
    "favouriteThingToLearnNotes" TEXT,
    "whatElseUcanDoWithASpoonOtherThanEat" INTEGER,
    "whatElseUcanDoWithASpoonOtherThanEatNotes" TEXT,
    "howShareCookiesBetweenFriends" INTEGER,
    "howShareCookiesBetweenFriendsNotes" TEXT,
    "puzzleActivity" INTEGER,
    "puzzleActivityNotes" TEXT,
    "tableInteraction" INTEGER,
    "tableInteractionNotes" TEXT,
    "drawSomethingYouInvent" INTEGER,
    "drawSomethingYouInventNotes" TEXT,
    "doYouLikeLearnByListening" TEXT,
    "canYouSortShapesByColor" INTEGER,
    "canYouSortShapesByColorNotes" TEXT,
    "canYouTeachMeDrawMummy" INTEGER,
    "canYouTeachMeDrawMummyNotes" TEXT,
    "doYouLikePlayingWithFriends" INTEGER,
    "doYouLikePlayingWithFriendsNotes" TEXT,
    "parentalInterferenceFlagged" BOOLEAN NOT NULL DEFAULT false,
    "parentalInterferenceNotes" TEXT,
    "totalScore" INTEGER,
    "applicationNumber" TEXT,
    "observerName" TEXT,
    "assessmentDate" TEXT,
    "loggedToSystemDate" TEXT,
    "loggedBy" TEXT,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "ks1_interview_questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ks1_interview_questions_applicationId_key" ON "public"."ks1_interview_questions"("applicationId");

-- AddForeignKey
ALTER TABLE "public"."ks1_interview_questions" ADD CONSTRAINT "ks1_interview_questions_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
