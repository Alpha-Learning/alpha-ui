import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";

const FRANK_API_BASE_URL = process.env.FRANK_API_BASE_URL || "https://bio.alphalearning.me/api/v1";
const FRANK_API_KEY = process.env.FRANK_API_KEY || "";

// Helper function to create timeout signal (compatible with older Node.js versions)
function createTimeoutSignal(ms: number): AbortSignal {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  // Clean up timeout if signal is already aborted
  controller.signal.addEventListener('abort', () => clearTimeout(timeout));
  return controller.signal;
}

// Helper function to collect all form data
async function collectAllFormData(applicationId: string) {
  try {
    console.log(`[collectAllFormData] Starting data collection for application: ${applicationId}`);
    
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        screeningCall: true,
        parentGuardianQuestionnaire: true,
        caregiverQuestionnaire: true,
        outsiderQuestionnaire: true,
        initialObservationForm: true,
        ks1InterviewQuestions: true,
        ks2InterviewQuestions: true,
        guidedObservationsProcedure: true,
        parentChildDynamicObservation: true,
        peerDynamicObservation: true,
        understandingParent: true,
        comprehensiveProfileSheet: true,
      }
    });

    if (!application) {
      throw new Error("Application not found");
    }

    console.log(`[collectAllFormData] Application found: ${application.childFullName}`);
    console.log(`[collectAllFormData] Forms present:`, {
      screeningCall: !!application.screeningCall,
      parentGuardianQuestionnaire: !!application.parentGuardianQuestionnaire,
      caregiverQuestionnaire: !!application.caregiverQuestionnaire,
      outsiderQuestionnaire: !!application.outsiderQuestionnaire,
      initialObservationForm: !!application.initialObservationForm,
      ks1InterviewQuestions: !!application.ks1InterviewQuestions,
      ks2InterviewQuestions: !!application.ks2InterviewQuestions,
      guidedObservationsProcedure: !!application.guidedObservationsProcedure,
      parentChildDynamicObservation: !!application.parentChildDynamicObservation,
      peerDynamicObservation: !!application.peerDynamicObservation,
      understandingParent: !!application.understandingParent,
      comprehensiveProfileSheet: !!application.comprehensiveProfileSheet,
    });

    // Build comprehensive content from all forms
    let content = `=== UTL ASSESSMENT COMPREHENSIVE DATA ===\n`;
    content += `Application ID: ${applicationId}\n`;
    content += `Child Name: ${application.childFullName || 'N/A'}\n`;
    content += `Date of Birth: ${application.childDateOfBirth ? (application.childDateOfBirth instanceof Date ? application.childDateOfBirth.toISOString().split('T')[0] : application.childDateOfBirth) : 'N/A'}\n`;
    content += `Age: ${application.childAge || 'N/A'}\n`;
    content += `Gender: ${application.childGender || 'N/A'}\n\n`;

    // Initial Application Data (from Application model itself)
    content += `--- INITIAL APPLICATION DATA ---\n`;
    if (application.qExcitesMost) content += `What excites most: ${application.qExcitesMost}\n`;
    if (application.qBiggestHope) content += `Biggest hope: ${application.qBiggestHope}\n`;
    if (application.enjoysTech) content += `Enjoys technology: ${application.enjoysTech}\n`;
    if (application.enjoysHandsOn) content += `Enjoys hands-on activities: ${application.enjoysHandsOn}\n`;
    content += `\n`;

    // Comprehensive Profile Sheet (Most important for UTL assessment)
    if (application.comprehensiveProfileSheet) {
      const cps = application.comprehensiveProfileSheet;
      content += `--- COMPREHENSIVE PROFILE SHEET ---\n`;
      
      // Learning Style
      content += `--- LEARNING STYLE OBSERVATION ---\n`;
      if (cps.visualObserved && cps.visualObservedEvidence) {
        content += `Visual Learning: ${cps.visualObservedEvidence}\n`;
      }
      if (cps.auditoryObserved && cps.auditoryObservedEvidence) {
        content += `Auditory Learning: ${cps.auditoryObservedEvidence}\n`;
      }
      if (cps.kinestheticTactileObserved && cps.kinestheticTactileObservedEvidence) {
        content += `Kinesthetic/Tactile Learning: ${cps.kinestheticTactileObservedEvidence}\n`;
      }
      if (cps.readingWritingObserved && cps.readingWritingObservedEvidence) {
        content += `Reading/Writing Learning: ${cps.readingWritingObservedEvidence}\n`;
      }
      content += `\n`;

      // Personality Traits (from various observations)
      content += `--- PERSONALITY TRAITS ---\n`;
      if (cps.summaryInsightLearnerType) {
        content += `Learner Type Summary: ${cps.summaryInsightLearnerType}\n`;
      }
      content += `\n`;

      // Subject Levels & Academic Readiness
      content += `--- SUBJECT LEVELS & ACADEMIC READINESS ---\n`;
      if (cps.englishCurrentLevel) content += `English Current Level: ${cps.englishCurrentLevel}\n`;
      if (cps.englishNotes) content += `English Notes: ${cps.englishNotes}\n`;
      if (cps.mathsCurrentLevel) content += `Maths Current Level: ${cps.mathsCurrentLevel}\n`;
      if (cps.mathsNotes) content += `Maths Notes: ${cps.mathsNotes}\n`;
      if (cps.scienceCurrentLevel) content += `Science Current Level: ${cps.scienceCurrentLevel}\n`;
      if (cps.scienceNotes) content += `Science Notes: ${cps.scienceNotes}\n`;
      if (cps.academicNotes) content += `Academic Notes: ${cps.academicNotes}\n`;
      if (cps.additionalCognitiveNotes) content += `Cognitive Skills: ${cps.additionalCognitiveNotes}\n`;
      content += `\n`;

      // Meta-Learning Pillars
      content += `--- META-LEARNING PILLARS ---\n`;
      if (cps.selfRegulationNotesEvidence) content += `Self-Regulation: ${cps.selfRegulationNotesEvidence}\n`;
      if (cps.selfRegulationEmerging || cps.selfRegulationDeveloping || cps.selfRegulationStrong) {
        const level = cps.selfRegulationStrong ? 'Strong' : cps.selfRegulationDeveloping ? 'Developing' : 'Emerging';
        content += `Self-Regulation Level: ${level}\n`;
      }
      if (cps.emotionalIntelligenceNotesEvidence) content += `Emotional Intelligence: ${cps.emotionalIntelligenceNotesEvidence}\n`;
      if (cps.emotionalIntelligenceEmerging || cps.emotionalIntelligenceDeveloping || cps.emotionalIntelligenceStrong) {
        const level = cps.emotionalIntelligenceStrong ? 'Strong' : cps.emotionalIntelligenceDeveloping ? 'Developing' : 'Emerging';
        content += `Emotional Intelligence Level: ${level}\n`;
      }
      if (cps.socialCommunicationNotesEvidence) content += `Social Communication: ${cps.socialCommunicationNotesEvidence}\n`;
      if (cps.cognitiveFlexibilityNotesEvidence) content += `Cognitive Flexibility: ${cps.cognitiveFlexibilityNotesEvidence}\n`;
      if (cps.resilienceConfidenceNotesEvidence) content += `Resilience & Confidence: ${cps.resilienceConfidenceNotesEvidence}\n`;
      if (cps.creativityExpressionNotesEvidence) content += `Creativity & Expression: ${cps.creativityExpressionNotesEvidence}\n`;
      if (cps.softSkillSummaryNotes) content += `Soft Skills Summary: ${cps.softSkillSummaryNotes}\n`;
      content += `\n`;

      // Intelligence Types
      content += `--- DOMINANT INTELLIGENCE TYPES ---\n`;
      if (cps.linguisticNotes) content += `Linguistic: ${cps.linguisticNotes}\n`;
      if (cps.logicalMathematicalNotesInt) content += `Logical-Mathematical: ${cps.logicalMathematicalNotesInt}\n`;
      if (cps.spatialNotes) content += `Spatial: ${cps.spatialNotes}\n`;
      if (cps.bodilyKinestheticNotes) content += `Bodily-Kinesthetic: ${cps.bodilyKinestheticNotes}\n`;
      if (cps.musicalNotes) content += `Musical: ${cps.musicalNotes}\n`;
      if (cps.interpersonalNotes) content += `Interpersonal: ${cps.interpersonalNotes}\n`;
      if (cps.intrapersonalNotes) content += `Intrapersonal: ${cps.intrapersonalNotes}\n`;
      if (cps.naturalisticNotes) content += `Naturalistic: ${cps.naturalisticNotes}\n`;
      content += `\n`;

      // Additional Summary & Insights
      if (cps.summaryInsightLearningEnvironments) {
        content += `--- LEARNING ENVIRONMENTS ---\n`;
        content += `${cps.summaryInsightLearningEnvironments}\n\n`;
      }
      if (cps.finalSummaryStrengths) content += `Final Summary - Strengths: ${cps.finalSummaryStrengths}\n`;
      if (cps.finalSummaryApproaches) content += `Final Summary - Approaches: ${cps.finalSummaryApproaches}\n`;
      if (cps.finalSummaryTargetedSupport) content += `Final Summary - Targeted Support: ${cps.finalSummaryTargetedSupport}\n`;
      if (cps.homeSupportTips) content += `Home Support Tips: ${cps.homeSupportTips}\n`;
      content += `\n`;
    } else {
      console.warn(`[collectAllFormData] Comprehensive Profile Sheet not found for application ${applicationId}`);
    }

    // Screening Call (Form 2)
    if (application.screeningCall) {
      const sc = application.screeningCall;
      content += `--- SCREENING CALL ---\n`;
      if (sc.applicationReason) content += `Application Reason: ${sc.applicationReason}\n`;
      if (sc.currentSchoolIssues) content += `Current School Issues: ${sc.currentSchoolIssues}\n`;
      if (sc.parentWarmUpNotes) content += `Parent Warm-Up Notes: ${sc.parentWarmUpNotes}\n`;
      if (sc.fitClarificationNotes) content += `Fit Clarification: ${sc.fitClarificationNotes}\n`;
      if (sc.generalNotes) content += `General Notes: ${sc.generalNotes}\n`;
      content += `\n`;
    }

    // Parent/Guardian Questionnaire
    if (application.parentGuardianQuestionnaire) {
      const pg = application.parentGuardianQuestionnaire;
      content += `--- PARENT/GUARDIAN INFORMATION ---\n`;
      if (pg.fullName) content += `Parent Name: ${pg.fullName}\n`;
      if (pg.typicalWeekday) content += `Typical Weekday Routine: ${pg.typicalWeekday}\n`;
      if (pg.strengthsInterests) content += `Child Strengths & Interests: ${pg.strengthsInterests}\n`;
      if (pg.challengingAreas) content += `Challenging Areas: ${pg.challengingAreas}\n`;
      if (pg.educationalHopesGoals) content += `Educational Hopes & Goals: ${pg.educationalHopesGoals}\n`;
      if (pg.parentingStyle) content += `Parenting Style: ${pg.parentingStyle}\n`;
      content += `\n`;
    }

    // Caregiver Questionnaire
    if (application.caregiverQuestionnaire) {
      const cg = application.caregiverQuestionnaire;
      content += `--- CAREGIVER OBSERVATIONS ---\n`;
      if (cg.careDuration) content += `Care Duration: ${cg.careDuration}\n`;
      if (cg.regularActivities) content += `Regular Activities: ${cg.regularActivities}\n`;
      if (cg.toysGamesTasksEnjoyed) content += `Preferred Activities: ${cg.toysGamesTasksEnjoyed}\n`;
      if (cg.responseToDifficulties) content += `Response to Difficulties: ${cg.responseToDifficulties}\n`;
      if (cg.emotionalStrengthsVulnerabilities) content += `Emotional Observations: ${cg.emotionalStrengthsVulnerabilities}\n`;
      content += `\n`;
    }

    // Outsider Questionnaire
    if (application.outsiderQuestionnaire) {
      const oq = application.outsiderQuestionnaire;
      content += `--- OUTSIDER OBSERVATIONS ---\n`;
      if (oq.relationshipToChild) content += `Relationship: ${oq.relationshipToChild}\n`;
      if (oq.learningTendenciesCuriosity) content += `Learning Tendencies & Curiosity: ${oq.learningTendenciesCuriosity}\n`;
      if (oq.emotionalTraits) content += `Emotional Traits: ${oq.emotionalTraits}\n`;
      if (oq.communicationSkills) content += `Communication Skills: ${oq.communicationSkills}\n`;
      if (oq.groupBehavior) content += `Group Behavior: ${oq.groupBehavior}\n`;
      if (oq.emotionalStrengthsVulnerabilities) content += `Emotional Strengths/Vulnerabilities: ${oq.emotionalStrengthsVulnerabilities}\n`;
      content += `\n`;
    }

    // Initial Observation Form (Form 4)
    if (application.initialObservationForm) {
      const iof = application.initialObservationForm;
      content += `--- INITIAL OBSERVATION FORM ---\n`;
      if (iof.mostEngagedZone) content += `Most Engaged Zone: ${iof.mostEngagedZone}\n`;
      if (iof.dominantObservedIntelligences) content += `Dominant Intelligences: ${iof.dominantObservedIntelligences}\n`;
      if (iof.initialLearningStyleImpressions) content += `Learning Style Impressions: ${iof.initialLearningStyleImpressions}\n`;
      if (iof.selfRegulationObserved) content += `Self-Regulation: ${iof.selfRegulationObserved}\n`;
      if (iof.selfRegulationBehaviourNotes) content += `Self-Regulation Notes: ${iof.selfRegulationBehaviourNotes}\n`;
      if (iof.curiosityObserved) content += `Curiosity: ${iof.curiosityObserved}\n`;
      if (iof.curiosityBehaviourNotes) content += `Curiosity Notes: ${iof.curiosityBehaviourNotes}\n`;
      content += `\n`;
    }

    // Guided Observations Procedure (Form 5)
    if (application.guidedObservationsProcedure) {
      const gop = application.guidedObservationsProcedure;
      content += `--- GUIDED OBSERVATIONS PROCEDURE ---\n`;
      if (gop.mostEngagedZone) content += `Most Engaged Zone: ${gop.mostEngagedZone}\n`;
      if (gop.metaCuriosityScore !== null && gop.metaCuriosityScore !== undefined) content += `Meta-Curiosity Score: ${gop.metaCuriosityScore}/5\n`;
      if (gop.metaCuriosityNotes) content += `Meta-Curiosity Notes: ${gop.metaCuriosityNotes}\n`;
      if (gop.metaSelfRegulationScore !== null && gop.metaSelfRegulationScore !== undefined) content += `Meta-Self-Regulation Score: ${gop.metaSelfRegulationScore}/5\n`;
      if (gop.metaSelfRegulationNotes) content += `Meta-Self-Regulation Notes: ${gop.metaSelfRegulationNotes}\n`;
      if (gop.dominantObservedIntelligences) content += `Dominant Intelligences: ${gop.dominantObservedIntelligences}\n`;
      content += `\n`;
    }

    // Interview Questions (KS1/KS2) - Students may have one or the other
    if (application.ks1InterviewQuestions) {
      const ks1 = application.ks1InterviewQuestions;
      content += `--- KS1 INTERVIEW OBSERVATIONS ---\n`;
      if (ks1.tellMeAboutFavouriteStoryNotes) content += `Story Narrative: ${ks1.tellMeAboutFavouriteStoryNotes}\n`;
      if (ks1.whatDoYouDoSomethingHardNotes) content += `Perseverance: ${ks1.whatDoYouDoSomethingHardNotes}\n`;
      if (ks1.howDoYouFeelWhenTryNewNotes) content += `Emotional Awareness: ${ks1.howDoYouFeelWhenTryNewNotes}\n`;
      if (ks1.totalScore !== null && ks1.totalScore !== undefined) content += `Total Score: ${ks1.totalScore}\n`;
      content += `\n`;
    }

    if (application.ks2InterviewQuestions) {
      const ks2 = application.ks2InterviewQuestions;
      content += `--- KS2 INTERVIEW OBSERVATIONS ---\n`;
      if (ks2.somethingAlwaysWantedToLearnNotes) content += `Learning Interests: ${ks2.somethingAlwaysWantedToLearnNotes}\n`;
      if (ks2.fiveThingsWithPaperclipNotes) content += `Creative Thinking: ${ks2.fiveThingsWithPaperclipNotes}\n`;
      if (ks2.logicChallengeNotes) content += `Logic Skills: ${ks2.logicChallengeNotes}\n`;
      if (ks2.totalScore !== null && ks2.totalScore !== undefined) content += `Total Score: ${ks2.totalScore}\n`;
      content += `\n`;
    }

    // Parent-Child Dynamic Observation (Form 6)
    if (application.parentChildDynamicObservation) {
      const pcd = application.parentChildDynamicObservation;
      content += `--- PARENT-CHILD DYNAMIC OBSERVATION ---\n`;
      if (pcd.independenceRating !== null && pcd.independenceRating !== undefined) content += `Independence Rating: ${pcd.independenceRating}/5\n`;
      if (pcd.independenceNotes) content += `Independence Notes: ${pcd.independenceNotes}\n`;
      if (pcd.confidenceHesitationRating !== null && pcd.confidenceHesitationRating !== undefined) content += `Confidence Rating: ${pcd.confidenceHesitationRating}/5\n`;
      if (pcd.confidenceHesitationNotes) content += `Confidence Notes: ${pcd.confidenceHesitationNotes}\n`;
      if (pcd.parentChildDynamicStandout) content += `Dynamic Standout: ${pcd.parentChildDynamicStandout}\n`;
      content += `\n`;
    }

    // Peer Dynamic Observation (Form 7/8)
    if (application.peerDynamicObservation) {
      const pdo = application.peerDynamicObservation;
      content += `--- PEER DYNAMIC OBSERVATION ---\n`;
      if (pdo.leadershipRating !== null && pdo.leadershipRating !== undefined) content += `Leadership Rating: ${pdo.leadershipRating}/5\n`;
      if (pdo.collaborationRating !== null && pdo.collaborationRating !== undefined) content += `Collaboration Rating: ${pdo.collaborationRating}/5\n`;
      if (pdo.communicationRating !== null && pdo.communicationRating !== undefined) content += `Communication Rating: ${pdo.communicationRating}/5\n`;
      if (pdo.notableStrengths) content += `Notable Strengths: ${pdo.notableStrengths}\n`;
      if (pdo.areasOfConcern) content += `Areas of Concern: ${pdo.areasOfConcern}\n`;
      content += `\n`;
    }

    // Understanding Parent
    if (application.understandingParent) {
      const up = application.understandingParent;
      content += `--- PARENT UNDERSTANDING ---\n`;
      if (up.additionalNotes) content += `Notes: ${up.additionalNotes}\n`;
      // The grid field is JSON, could be parsed if needed
      content += `\n`;
    }

    console.log(`[collectAllFormData] Content collection complete. Total length: ${content.length} characters`);
    console.log(`[collectAllFormData] Content preview (first 500 chars):\n${content.substring(0, 500)}...`);
    return content;
  } catch (error: any) {
    console.error(`[collectAllFormData] ❌ ERROR collecting form data!`);
    console.error(`[collectAllFormData] Error type:`, error?.name || 'Unknown');
    console.error(`[collectAllFormData] Error message:`, error?.message || 'Unknown error');
    console.error(`[collectAllFormData] Error stack:`, error?.stack || 'No stack trace');
    if (error?.code) {
      console.error(`[collectAllFormData] Error code:`, error.code);
    }
    throw error; // Re-throw to be handled by caller
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = req.headers.get('authorization');
    if (!auth?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    const token = auth.slice(7);
    const user = verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { id: applicationId } = await params;

    // Verify all forms are completed
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      select: {
        isFirstFormCompleted: true,
        isSecondFormCompleted: true,
        isThirdFormCompleted: true,
        isFourthFormCompleted: true,
        isFifthFormCompleted: true,
        isSixthFormCompleted: true,
        isSeventhFormCompleted: true,
        isEighthFormCompleted: true,
        isNinthFormCompleted: true,
        childFullName: true,
      }
    });

    if (!application) {
      return NextResponse.json({ success: false, message: 'Application not found' }, { status: 404 });
    }

    const allCompleted = [
      application.isFirstFormCompleted,
      application.isSecondFormCompleted,
      application.isThirdFormCompleted,
      application.isFourthFormCompleted,
      application.isFifthFormCompleted,
      application.isSixthFormCompleted,
      application.isSeventhFormCompleted,
      application.isEighthFormCompleted,
      application.isNinthFormCompleted,
    ].every(Boolean);

    if (!allCompleted) {
      return NextResponse.json({ 
        success: false, 
        message: 'All 9 forms must be completed before generating AI Assessment' 
      }, { status: 400 });
    }

    const studentId = `student_${applicationId}`;

    // Check if report already exists - if so, return it without regenerating
    try {
      console.log("Checking if assessment already exists for student:", studentId);
      // Check existing reports using GET endpoint
      const existingReportResponse = await fetch(
        `${FRANK_API_BASE_URL}/students/${studentId}/reports/utl`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': FRANK_API_KEY,
            'ngrok-skip-browser-warning': 'true',
          },
          signal: createTimeoutSignal(30000),
        }
      );

      // Read response text first (can only be read once)
      const existingReportText = await existingReportResponse.text();
      
      const existingReportContentType = existingReportResponse.headers.get('content-type');
      
      // Check if response is HTML (ngrok warning page)
      if (existingReportContentType && existingReportContentType.includes('text/html')) {
        console.log("Received HTML response when checking for existing report - API may be unreachable, proceeding with generation");
        // Continue with generation - don't throw error
      }
      // If response is successful (200 OK), check if report exists
      else if (existingReportResponse.ok) {
        try {
          const existingReportData = JSON.parse(existingReportText);
          // GET /reports/utl returns { reports: [...] }
          if (existingReportData.reports && Array.isArray(existingReportData.reports)) {
            const analysisReport = existingReportData.reports.find((r: any) => r.type === "UTL_ANALYSIS");
            if (analysisReport && analysisReport.downloadUrl) {
              // Download the actual analysis content
              try {
                const analysisResponse = await fetch(analysisReport.downloadUrl);
                const analysisData = await analysisResponse.json();
                console.log("✅ Existing assessment found, returning without regenerating");
                console.log(`Report ID: ${analysisReport.id}`);
                return NextResponse.json({
                  success: true,
                  message: "AI Assessment already exists",
                  data: analysisData,
                });
              } catch (fetchError) {
                console.log("Could not download analysis content, proceeding with generation");
              }
            } else {
              console.log("No analysis report found in response, proceeding with generation");
            }
          } else {
            console.log("No existing report found (no reports array in response), proceeding with generation");
          }
        } catch (parseError) {
          // If parsing fails, continue with generation
          console.log("Could not parse existing report response, proceeding with generation");
        }
      }
      // If response is 404 or DATA_NOT_FOUND, no report exists yet - this is expected for new students
      else if (existingReportResponse.status === 404) {
        console.log("No existing assessment found (404) - this is expected for new students, proceeding with generation");
        // Continue with generation - this is the expected case for new forms
      }
      // For other error statuses, log but continue (don't block generation)
      else {
        console.log(`Existing report check returned status ${existingReportResponse.status}, proceeding with generation anyway`);
      }
    } catch (error: any) {
      // If checking for existing report fails, continue with generation
      console.log("Could not check for existing report, proceeding with generation:", error.message);
    }

    // Collect all form data (only if report doesn't exist)
    let assessmentContent: string;
    try {
      console.log("\n=== DATA COLLECTION START ===");
      console.log("Application ID:", applicationId);
      console.log("Student ID:", studentId);
      assessmentContent = await collectAllFormData(applicationId);
      console.log("✅ Assessment content collected successfully");
      console.log("Content length:", assessmentContent.length, "characters");
      if (assessmentContent.length === 0) {
        console.warn("⚠️  WARNING: Collected content is empty!");
      }
      console.log("=== DATA COLLECTION END ===\n");
    } catch (error: any) {
      console.error("\n❌ DATA COLLECTION FAILED!");
      console.error("Error type:", error?.name || 'Unknown');
      console.error("Error message:", error?.message || 'Unknown error');
      console.error("Error stack:", error?.stack || 'No stack trace');
      if (error?.code) {
        console.error("Error code:", error.code);
      }
      return NextResponse.json({ 
        success: false, 
        message: `Failed to collect form data: ${error?.message || 'Unknown error'}`,
        error: process.env.NODE_ENV === 'development' ? (error?.stack || error?.message) : undefined
      }, { status: 500 });
    }

    // Step 1: Create or get session (initializes student's knowledge base)
    let sessionId: string;
    try {
      console.log('\n=== STEP 1: CREATING/GETTING SESSION ===');
      console.log(`Student ID: ${studentId}`);
      console.log(`Frank API URL: ${FRANK_API_BASE_URL}`);
      console.log(`Endpoint: ${FRANK_API_BASE_URL}/sessions`);
      console.log('Request payload:', {
        user_id: studentId,
        metadata: {
          source: "als_platform",
          application_id: applicationId,
        }
      });
      
      const sessionResponse = await fetch(`${FRANK_API_BASE_URL}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': FRANK_API_KEY,
          'ngrok-skip-browser-warning': 'true', // Skip ngrok warning page
        },
        body: JSON.stringify({
          user_id: studentId,
          metadata: {
            source: "als_platform",
            application_id: applicationId,
          }
        }),
        // Add timeout to prevent hanging
        signal: createTimeoutSignal(30000), // 30 second timeout
      });

      // Check if response is HTML (ngrok warning page)
      const contentType = sessionResponse.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        const htmlText = await sessionResponse.text();
        console.error("Received HTML response instead of JSON - ngrok warning page");
        throw new Error("Frank API returned HTML instead of JSON. The API may be unreachable or ngrok is showing a warning page.");
      }

      // Check response status - 201 means session was created successfully
      if (sessionResponse.status === 201 || sessionResponse.ok) {
        const responseText = await sessionResponse.text();
        let sessionData;
        try {
          sessionData = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Failed to parse session response as JSON:", responseText.substring(0, 200));
          throw new Error("Invalid response from session API - may be ngrok warning page");
        }
        
        // Verify response structure matches documentation: { session: { id: ... } }
        if (sessionData.session && sessionData.session.id) {
          sessionId = sessionData.session.id;
          console.log('✅ Session created successfully!');
          console.log(`Session ID: ${sessionId}`);
          console.log(`Status: ${sessionData.session.status || 'active'}`);
          console.log(`Expires at: ${sessionData.session.expires_at || 'N/A'}`);
          console.log(`Is active: ${sessionData.session.is_active !== false}`);
        } else if (sessionData.id) {
          // Handle case where response might be just the session object
          sessionId = sessionData.id;
          console.log('✅ Session created successfully! (alternative format)');
          console.log(`Session ID: ${sessionId}`);
        } else {
          console.error("❌ Unexpected session response structure");
          console.error("Response received:", JSON.stringify(sessionData).substring(0, 500));
          throw new Error("Session response missing 'session.id' or 'id' field");
        }
      } else {
        // Session creation failed - try to get existing active session
        const errorText = await sessionResponse.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        
        console.warn(`Session creation returned ${sessionResponse.status}, trying to get existing session...`);
        console.warn("Error details:", errorData);
        
        // Try to get existing active session for this user
        const userSessionsResponse = await fetch(
          `${FRANK_API_BASE_URL}/sessions/user/${studentId}?active_only=true`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': FRANK_API_KEY,
              'ngrok-skip-browser-warning': 'true', // Skip ngrok warning page
            },
            signal: createTimeoutSignal(10000), // 10 second timeout
          }
        );
        
        // Check if response is HTML
        const sessionsContentType = userSessionsResponse.headers.get('content-type');
        if (sessionsContentType && sessionsContentType.includes('text/html')) {
          console.error("Received HTML response when getting sessions");
          throw new Error("Frank API returned HTML instead of JSON when getting sessions");
        }
        
        if (userSessionsResponse.ok) {
          const responseText = await userSessionsResponse.text();
          let sessionsData;
          try {
            sessionsData = JSON.parse(responseText);
          } catch (parseError) {
            console.error("Failed to parse sessions response as JSON:", responseText.substring(0, 200));
            throw new Error("Invalid response from sessions API - may be ngrok warning page");
          }
          
          // Verify response structure: { sessions: [{ id: ... }], total: ... }
          if (sessionsData.sessions && Array.isArray(sessionsData.sessions) && sessionsData.sessions.length > 0) {
            // Get the first active session
            const activeSession = sessionsData.sessions.find((s: any) => s.is_active !== false) || sessionsData.sessions[0];
            sessionId = activeSession.id;
            console.log('✅ Found existing active session!');
            console.log(`Session ID: ${sessionId}`);
            console.log(`Status: ${activeSession.status || 'active'}`);
            console.log(`Expires at: ${activeSession.expires_at || 'N/A'}`);
            console.log(`Total sessions found: ${sessionsData.total || sessionsData.sessions.length}`);
          } else {
            console.error(`❌ No active sessions found. Create failed with status ${sessionResponse.status}`);
            throw new Error(`Failed to create session (${sessionResponse.status}). No existing active session found for user.`);
          }
        } else {
          const errorText2 = await userSessionsResponse.text();
          let errorData2;
          try {
            errorData2 = JSON.parse(errorText2);
          } catch {
            errorData2 = { message: errorText2 };
          }
          throw new Error(`Failed to create or retrieve session. Create failed: ${sessionResponse.status} ${errorData.message || sessionResponse.statusText}. Get sessions also failed: ${userSessionsResponse.status} ${errorData2.message || ''}`);
        }
      }
    } catch (error: any) {
      console.error("Session creation error:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      return NextResponse.json({ 
        success: false, 
        message: `Failed to create session: ${error.message}`,
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }, { status: 500 });
    }

    // Step 2: Submit UTL assessment data to /students/{student_id}/data endpoint
    try {
      console.log('\n=== STEP 2: SUBMITTING UTL ASSESSMENT DATA ===');
      console.log(`Student ID: ${studentId}`);
      console.log(`Endpoint: ${FRANK_API_BASE_URL}/students/${studentId}/data`);
      console.log(`Content length: ${assessmentContent.length} characters`);
      console.log(`Content preview (first 500 chars):\n${assessmentContent.substring(0, 500)}...`);
      
      const dataPayload = {
        data_type: 'utl',
        content: assessmentContent,
        source_id: `application_${applicationId}`,
        timestamp: new Date().toISOString(),
        metadata: {
          application_id: applicationId,
          assessment_date: new Date().toISOString(),
        }
      };
      
      console.log('Request payload structure:', {
        data_type: dataPayload.data_type,
        source_id: dataPayload.source_id,
        timestamp: dataPayload.timestamp,
        metadata: dataPayload.metadata,
        content_length: dataPayload.content.length,
      });
      
      const dataResponse = await fetch(`${FRANK_API_BASE_URL}/students/${studentId}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': FRANK_API_KEY,
          'ngrok-skip-browser-warning': 'true', // Skip ngrok warning page
        },
        body: JSON.stringify(dataPayload),
        signal: createTimeoutSignal(30000), // 30 second timeout
      });
      
      console.log(`Data submission response status: ${dataResponse.status} ${dataResponse.statusText}`);

      // Read response text first (can only be read once)
      const dataResponseText = await dataResponse.text();
      
      // Check if response is HTML
      const dataContentType = dataResponse.headers.get('content-type');
      console.log(`Response content-type: ${dataContentType}`);
      
      if (dataContentType && dataContentType.includes('text/html')) {
        console.error("❌ ERROR: Received HTML response instead of JSON when submitting data");
        console.error("HTML response preview:", dataResponseText.substring(0, 500));
        throw new Error("Frank API returned HTML instead of JSON when submitting data. The API may be unreachable.");
      }
      
      if (!dataResponse.ok) {
        let errorData;
        try {
          errorData = JSON.parse(dataResponseText);
        } catch {
          errorData = { message: dataResponseText || "Failed to submit data" };
        }
        console.error("❌ Data submission failed!");
        console.error("Status:", dataResponse.status, dataResponse.statusText);
        console.error("Error response:", JSON.stringify(errorData, null, 2));
        
        // Handle session expired error (410) - try to extend or recreate session
        if (dataResponse.status === 410 || errorData.detail?.error_code === 'SESSION_EXPIRED') {
          console.warn("⚠️ Session expired, attempting to extend or recreate...");
          // For now, we'll just throw the error - in the future we could add session extension logic here
          throw new Error("Session expired. Please try generating the assessment again.");
        }
        
        // Handle ingestion errors specifically
        if (dataResponse.status === 500 && errorData.detail?.error_code === 'INGESTION_ERROR') {
          console.error("❌ INGESTION_ERROR: Failed to store data in knowledge base");
          throw new Error("Failed to store assessment data in knowledge base. The AI system may be experiencing issues.");
        }
        
        throw new Error(errorData.detail?.message || errorData.message || "Failed to submit data");
      }
      
      // Success - parse response (already read as text above, so parse it)
      let dataResponseJson;
      try {
        dataResponseJson = JSON.parse(dataResponseText);
      } catch (parseError) {
        console.error("❌ Failed to parse successful data response as JSON");
        throw new Error("Invalid JSON response from data submission endpoint");
      }
      
      console.log('✅ Data submission successful!');
      console.log('Response:', JSON.stringify(dataResponseJson, null, 2));
      console.log(`Data ID: ${dataResponseJson.data_id || 'N/A'}`);
      console.log(`Status: ${dataResponseJson.status || 'N/A'}`);
      console.log(`Message: ${dataResponseJson.message || 'N/A'}`);
    } catch (error: any) {
      console.error("\n❌ Data submission error occurred!");
      console.error("Error type:", error.name);
      console.error("Error message:", error.message);
      if (error.stack) {
        console.error("Error stack:", error.stack);
      }
      return NextResponse.json({ 
        success: false, 
        message: `Failed to submit assessment data: ${error.message}`,
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }, { status: 500 });
    }

    // Step 3: Generate UTL Analysis Report (AI analyzes the submitted data)
    // Using POST /reports/utl with content to generate both raw and analysis reports
    try {
      console.log('\n=== STEP 3: GENERATING UTL ANALYSIS REPORT ===');
      console.log(`Student ID: ${studentId}`);
      console.log(`Endpoint: ${FRANK_API_BASE_URL}/students/${studentId}/reports/utl`);
      console.log('Content length:', assessmentContent.length, 'characters');
      console.log('⏳ Requesting AI to analyze the submitted data and generate report...');
      
      const reportResponse = await fetch(
        `${FRANK_API_BASE_URL}/students/${studentId}/reports/utl`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': FRANK_API_KEY,
            'ngrok-skip-browser-warning': 'true', // Skip ngrok warning page
          },
          body: JSON.stringify({
            content: assessmentContent,
            fileName: `utl_assessment_${applicationId}_${new Date().toISOString().split('T')[0]}.txt`,
          }),
          signal: createTimeoutSignal(120000), // 120 second timeout for report generation (AI processing takes time)
        }
      );
      
      console.log(`Report generation response status: ${reportResponse.status} ${reportResponse.statusText}`);

      // Read response text first (can only be read once)
      const reportResponseText = await reportResponse.text();
      
      // Check if response is HTML
      const reportContentType = reportResponse.headers.get('content-type');
      console.log(`Response content-type: ${reportContentType}`);
      
      if (reportContentType && reportContentType.includes('text/html')) {
        console.error("❌ ERROR: Received HTML response instead of JSON when generating report");
        console.error("HTML response preview:", reportResponseText.substring(0, 500));
        throw new Error("Frank API returned HTML instead of JSON when generating report. The API may be unreachable.");
      }

      if (!reportResponse.ok) {
        let errorData;
        try {
          errorData = JSON.parse(reportResponseText);
        } catch {
          errorData = { message: reportResponseText || "Failed to generate report" };
        }
        console.error("❌ Report generation failed!");
        console.error("Status:", reportResponse.status, reportResponse.statusText);
        console.error("Error response:", JSON.stringify(errorData, null, 2));
        
        // Handle specific error codes from documentation
        if (reportResponse.status === 404 && errorData.detail?.error_code === 'DATA_NOT_FOUND') {
          console.error("❌ DATA_NOT_FOUND: No student data found in knowledge base");
          throw new Error("No student data found. Please ensure data was submitted successfully in Step 2.");
        }
        
        if (reportResponse.status === 410 || errorData.detail?.error_code === 'SESSION_EXPIRED') {
          console.error("❌ SESSION_EXPIRED: Session has expired");
          throw new Error("Session expired. Please try generating the assessment again.");
        }
        
        if (reportResponse.status === 500 && errorData.detail?.error_code === 'REPORT_ERROR') {
          console.error("❌ REPORT_ERROR: Failed to generate AI report");
          throw new Error("Failed to generate AI report. The AI system may be experiencing issues.");
        }
        
        throw new Error(errorData.detail?.message || errorData.message || "Failed to generate report");
      }

      // Success - parse report (already read as text above)
      let reportData;
      try {
        reportData = JSON.parse(reportResponseText);
      } catch (parseError) {
        console.error("❌ Failed to parse successful report response as JSON");
        console.error("Response text preview:", reportResponseText.substring(0, 500));
        throw new Error("Invalid JSON response from report generation endpoint");
      }
      
      console.log('\n✅ Report generated successfully!');
      // Handle response format from POST /reports/utl (returns rawReport, analysisReport, and analysis)
      const reportId = reportData.analysisReport?.id || reportData.report_id || 'N/A';
      const generatedAt = reportData.analysisReport?.createdAt || reportData.generated_at || new Date().toISOString();
      const analysisData = reportData.analysis || reportData;
      
      console.log(`Report ID: ${reportId}`);
      console.log(`Generated at: ${generatedAt}`);
      console.log(`Primary learner type: ${analysisData.learningStyle?.primary || analysisData.primary_learner_type || 'N/A'}`);
      console.log(`Report summary: ${analysisData.summary || analysisData.overall_summary ? (analysisData.summary || analysisData.overall_summary).substring(0, 200) + '...' : 'N/A'}`);

      // Note: Report is stored in Frank API, we don't need to store it locally
      // The report can be retrieved anytime using the student_id
      // The session is active and can be used for future queries/reports

      console.log('\n=== AI ASSESSMENT GENERATION COMPLETE ===');
      console.log(`✅ Successfully generated UTL Analysis Report`);
      console.log(`Report ID: ${reportId}`);
      console.log(`Student ID: ${studentId}`);
      console.log(`Session ID: ${sessionId}`);
      console.log('==========================================\n');
      
      return NextResponse.json({
        success: true,
        message: "AI Assessment generated successfully",
        data: {
          reportId: reportId,
          studentId: studentId,
          sessionId: sessionId,
          report: analysisData,
          generatedAt: generatedAt,
        }
      });
    } catch (error: any) {
      console.error("Report generation error:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      return NextResponse.json({ 
        success: false, 
        message: `Failed to generate report: ${error.message}`,
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('\n❌ AI Assessment generation error (outer catch):', error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

