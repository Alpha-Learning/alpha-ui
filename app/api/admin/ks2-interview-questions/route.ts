import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { updateApplicationStatus } from "@/app/utils/applicationStatus";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      applicationId,
      // Child Information
      fullName,
      age,
      date,
      // Interview Questions (1-20)
      somethingAlwaysWantedToLearn,
      somethingAlwaysWantedToLearnNotes,
      fiveThingsWithPaperclip,
      fiveThingsWithPaperclipNotes,
      finishSchoolworkEarly,
      finishSchoolworkEarlyNotes,
      logicChallenge,
      logicChallengeNotes,
      somethingHard,
      somethingHardNotes,
      answerIsWrong,
      answerIsWrongNotes,
      favouriteThingOnComputer,
      favouriteThingOnComputerNotes,
      likeWorkingWithOthers,
      likeWorkingWithOthersNotes,
      drawMachineInvention,
      drawMachineInventionNotes,
      confidenceTryingNewThings,
      confidenceTryingNewThingsNotes,
      helpedSomeoneLearn,
      helpedSomeoneLearnNotes,
      magicWandMakesSmarter,
      magicWandMakesSmarterNotes,
      explainInternetToPast,
      explainInternetToPastNotes,
      inChargeOfWorld,
      inChargeOfWorldNotes,
      threeThingsGoodAt,
      threeThingsGoodAtNotes,
      somethingGetBetterAt,
      somethingGetBetterAtNotes,
      inventJobDoesntExist,
      inventJobDoesntExistNotes,
      learningPreference,
      digitalTasks,
      digitalTasksNotes,
      playingWithFriends,
      playingWithFriendsNotes,
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

    const existing = await prisma.kS2InterviewQuestions.findUnique({ where: { applicationId } });

    const payload = {
      // Child Information
      fullName,
      age,
      date,
      // Interview Questions - convert string scores to integers
      somethingAlwaysWantedToLearn: somethingAlwaysWantedToLearn ? parseInt(somethingAlwaysWantedToLearn) : null,
      somethingAlwaysWantedToLearnNotes,
      fiveThingsWithPaperclip: fiveThingsWithPaperclip ? parseInt(fiveThingsWithPaperclip) : null,
      fiveThingsWithPaperclipNotes,
      finishSchoolworkEarly: finishSchoolworkEarly ? parseInt(finishSchoolworkEarly) : null,
      finishSchoolworkEarlyNotes,
      logicChallenge: logicChallenge ? parseInt(logicChallenge) : null,
      logicChallengeNotes,
      somethingHard: somethingHard ? parseInt(somethingHard) : null,
      somethingHardNotes,
      answerIsWrong: answerIsWrong ? parseInt(answerIsWrong) : null,
      answerIsWrongNotes,
      favouriteThingOnComputer: favouriteThingOnComputer ? parseInt(favouriteThingOnComputer) : null,
      favouriteThingOnComputerNotes,
      likeWorkingWithOthers: likeWorkingWithOthers ? parseInt(likeWorkingWithOthers) : null,
      likeWorkingWithOthersNotes,
      drawMachineInvention: drawMachineInvention ? parseInt(drawMachineInvention) : null,
      drawMachineInventionNotes,
      confidenceTryingNewThings: confidenceTryingNewThings ? parseInt(confidenceTryingNewThings) : null,
      confidenceTryingNewThingsNotes,
      helpedSomeoneLearn: helpedSomeoneLearn ? parseInt(helpedSomeoneLearn) : null,
      helpedSomeoneLearnNotes,
      magicWandMakesSmarter: magicWandMakesSmarter ? parseInt(magicWandMakesSmarter) : null,
      magicWandMakesSmarterNotes,
      explainInternetToPast: explainInternetToPast ? parseInt(explainInternetToPast) : null,
      explainInternetToPastNotes,
      inChargeOfWorld: inChargeOfWorld ? parseInt(inChargeOfWorld) : null,
      inChargeOfWorldNotes,
      threeThingsGoodAt: threeThingsGoodAt ? parseInt(threeThingsGoodAt) : null,
      threeThingsGoodAtNotes,
      somethingGetBetterAt: somethingGetBetterAt ? parseInt(somethingGetBetterAt) : null,
      somethingGetBetterAtNotes,
      inventJobDoesntExist: inventJobDoesntExist ? parseInt(inventJobDoesntExist) : null,
      inventJobDoesntExistNotes,
      learningPreference,
      digitalTasks: digitalTasks ? parseInt(digitalTasks) : null,
      digitalTasksNotes,
      playingWithFriends: playingWithFriends ? parseInt(playingWithFriends) : null,
      playingWithFriendsNotes,
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
      record = await prisma.kS2InterviewQuestions.update({ where: { applicationId }, data: payload });
    } else {
      record = await prisma.kS2InterviewQuestions.create({ data: { applicationId, ...payload } });
    }

    // Check if both KS1 and KS2 forms are completed to mark stage 7 as complete
    const ks1Form = await prisma.kS1InterviewQuestions.findUnique({ where: { applicationId } });
    const isStage7Complete = !!ks1Form; // Both KS1 and KS2 (just completed) must exist
    
    await prisma.application.update({ 
      where: { id: applicationId }, 
      data: { 
        currentStage: 7,
        isSeventhFormCompleted: isStage7Complete
      } 
    });

    // Update application status based on all form completions
    await updateApplicationStatus(applicationId, prisma);

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error saving KS2 interview questions:", error);
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
  
    const record = await prisma.kS2InterviewQuestions.findUnique({ where: { applicationId } });
    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error fetching KS2 interview questions:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch form" }, { status: 500 });
  }
}
