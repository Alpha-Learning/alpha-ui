import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { updateApplicationStatus } from "@/app/utils/applicationStatus";

export async function POST(request: NextRequest) {
  try {
    // Guard: if Prisma model not generated yet (migration not run)
   

    const body = await request.json();
    const {
      applicationId,
      // Child Information
      fullName,
      age,
      // Interview Questions
      whatDoYouDoSomethingHard,
      whatDoYouDoSomethingHardNotes,
      howDoYouFeelWhenTryNew,
      howDoYouFeelWhenTryNewNotes,
      whatWouldYouDoIfFriendSad,
      whatWouldYouDoIfFriendSadNotes,
      tellMeAboutFavouriteStory,
      tellMeAboutFavouriteStoryNotes,
      favouriteThingToLearn,
      favouriteThingToLearnNotes,
      whatElseUcanDoWithASpoonOtherThanEat,
      whatElseUcanDoWithASpoonOtherThanEatNotes,
      howShareCookiesBetweenFriends,
      howShareCookiesBetweenFriendsNotes,
      puzzleActivity,
      puzzleActivityNotes,
      tableInteraction,
      tableInteractionNotes,
      drawSomethingYouInvent,
      drawSomethingYouInventNotes,
      doYouLikeLearnByListening,
      canYouSortShapesByColor,
      canYouSortShapesByColorNotes,
      canYouTeachMeDrawMummy,
      canYouTeachMeDrawMummyNotes,
      doYouLikePlayingWithFriends,
      doYouLikePlayingWithFriendsNotes,
      // Parental Interference
      parentalInterferenceFlagged,
      parentalInterferenceNotes,
      // Total Score
      totalScore,
      // Office Use Only
      applicationNumber,
      observerName,
      assessmentDate,
      loggedToSystemDate,
      loggedBy,
    } = body;

    if (!applicationId) {
      return NextResponse.json({ success: false, error: "Application ID is required" }, { status: 400 });
    }

    const existing = await prisma.kS1InterviewQuestions.findUnique({ where: { applicationId } });

    const payload = {
      // Child Information
      fullName,
      age,
      // Interview Questions - convert string scores to integers
      whatDoYouDoSomethingHard: whatDoYouDoSomethingHard ? parseInt(whatDoYouDoSomethingHard) : null,
      whatDoYouDoSomethingHardNotes,
      howDoYouFeelWhenTryNew: howDoYouFeelWhenTryNew ? parseInt(howDoYouFeelWhenTryNew) : null,
      howDoYouFeelWhenTryNewNotes,
      whatWouldYouDoIfFriendSad: whatWouldYouDoIfFriendSad ? parseInt(whatWouldYouDoIfFriendSad) : null,
      whatWouldYouDoIfFriendSadNotes,
      tellMeAboutFavouriteStory: tellMeAboutFavouriteStory ? parseInt(tellMeAboutFavouriteStory) : null,
      tellMeAboutFavouriteStoryNotes,
      favouriteThingToLearn: favouriteThingToLearn ? parseInt(favouriteThingToLearn) : null,
      favouriteThingToLearnNotes,
      whatElseUcanDoWithASpoonOtherThanEat: whatElseUcanDoWithASpoonOtherThanEat ? parseInt(whatElseUcanDoWithASpoonOtherThanEat) : null,
      whatElseUcanDoWithASpoonOtherThanEatNotes,
      howShareCookiesBetweenFriends: howShareCookiesBetweenFriends ? parseInt(howShareCookiesBetweenFriends) : null,
      howShareCookiesBetweenFriendsNotes,
      puzzleActivity: puzzleActivity ? parseInt(puzzleActivity) : null,
      puzzleActivityNotes,
      tableInteraction: tableInteraction ? parseInt(tableInteraction) : null,
      tableInteractionNotes,
      drawSomethingYouInvent: drawSomethingYouInvent ? parseInt(drawSomethingYouInvent) : null,
      drawSomethingYouInventNotes,
      doYouLikeLearnByListening,
      canYouSortShapesByColor: canYouSortShapesByColor ? parseInt(canYouSortShapesByColor) : null,
      canYouSortShapesByColorNotes,
      canYouTeachMeDrawMummy: canYouTeachMeDrawMummy ? parseInt(canYouTeachMeDrawMummy) : null,
      canYouTeachMeDrawMummyNotes,
      doYouLikePlayingWithFriends: doYouLikePlayingWithFriends ? parseInt(doYouLikePlayingWithFriends) : null,
      doYouLikePlayingWithFriendsNotes,
      // Parental Interference
      parentalInterferenceFlagged: parentalInterferenceFlagged || false,
      parentalInterferenceNotes,
      // Total Score
      totalScore: totalScore ? parseInt(totalScore) : null,
      // Office Use Only
      applicationNumber,
      observerName,
      assessmentDate,
      loggedToSystemDate,
      loggedBy,
    };

    let record;
    if (existing) {
      record = await prisma.kS1InterviewQuestions.update({ where: { applicationId }, data: payload });
    } else {
      record = await prisma.kS1InterviewQuestions.create({ data: { applicationId, ...payload } });
    }

    // Mark KS1 Interview Questions as completed and advance stage to 7
    await prisma.application.update({ 
      where: { id: applicationId }, 
      data: { 
        currentStage: 7,
        isSeventhFormCompleted: true
      } 
    });

    // Update application status based on all form completions
    await updateApplicationStatus(applicationId, prisma);

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error saving KS1 interview questions:", error);
    return NextResponse.json({ success: false, error: "Failed to save form" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get("applicationId");
    if (!applicationId) {
      return NextResponse.json({ success: false, error: "Application ID is required" }, { status: 400 });
    }
  
    const record = await prisma.kS1InterviewQuestions.findUnique({ where: { applicationId } });
    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error fetching KS1 interview questions:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch form" }, { status: 500 });
  }
}
