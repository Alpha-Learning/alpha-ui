import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";
import { sendLearnerReportNotificationEmail } from "@/app/lib/emailService";

const FRANK_API_BASE_URL = process.env.FRANK_API_BASE_URL;
const FRANK_API_KEY = process.env.FRANK_API_KEY;

// Increase the maximum duration for this route to handle long-running AI processing
// Default is 10 seconds, we need up to 120 seconds for AI assessment generation
// Note: If using nginx as a reverse proxy, you may also need to increase nginx timeout:
// proxy_read_timeout 120s; proxy_connect_timeout 120s; proxy_send_timeout 120s;
export const maxDuration = 120;
export const dynamic = 'force-dynamic';

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
        childAge: true,
        parentFullName: true,
         parentEmail: true,
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

    // Use student_ prefix to match GET route format
    const studentId = `student_${applicationId}`;
    const studentName = application.childFullName || '-';
    const studentAge = application.childAge ? parseInt(application.childAge.toString()) : undefined;

    // Check API key and URL first
    if (!FRANK_API_KEY) {
      return NextResponse.json({ 
        success: false, 
        message: "FRANK_API_KEY environment variable is not set. Please configure it in your .env file."
      }, { status: 500 });
    }

    if (!FRANK_API_BASE_URL) {
      return NextResponse.json({ 
        success: false, 
        message: "FRANK_API_BASE_URL environment variable is not set. Please configure it in your .env file."
      }, { status: 500 });
    }

    // Step 1: Create student if it doesn't exist (optional - API may auto-create)
    // According to API docs, we can create the student first to ensure it exists
    try {
      // Try to get the student first
      const getStudentResponse = await fetch(
        `${FRANK_API_BASE_URL}/students/${studentId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': FRANK_API_KEY,
          },
          signal: createTimeoutSignal(10000),
        }
      );

      // If student doesn't exist (404), create it
      if (getStudentResponse.status === 404) {
        const createStudentResponse = await fetch(
          `${FRANK_API_BASE_URL}/students`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': FRANK_API_KEY,
            },
            body: JSON.stringify({
              alsStudentId: studentId,
              name: studentName,
              ...(studentAge && { age: studentAge }),
              ...(application.parentFullName && { parentName: application.parentFullName }),
            }),
            signal: createTimeoutSignal(10000),
          }
        );

        if (!createStudentResponse.ok) {
          // Continue anyway - API might auto-create the student
        }
      }
    } catch (error: any) {
      // If student creation/check fails, continue anyway - API might auto-create
    }

    // Collect all form data first
    let assessmentContent: string;
    try {
      assessmentContent = await collectAllFormData(applicationId);
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

    // Check if report already exists - if so, return it without regenerating
    try {
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
                return NextResponse.json({
                  success: true,
                  message: "AI Assessment already exists",
                  data: analysisData,
                });
              } catch (fetchError) {
                // Continue with generation
              }
            }
          }
        } catch (parseError) {
          // If parsing fails, continue with generation
        }
      }
    } catch (error: any) {
      // If checking for existing report fails, continue with generation
    }

    // According to API docs: POST /students/:id/reports/utl
    // This endpoint submits the data AND generates the analysis automatically in one call
    // No need for sessions or separate data submission
    try {
      // According to API docs, POST /students/:id/reports/utl accepts:
      // { content: string, fileName?: string }
      // console.log("frank api base url=====================>==================", FRANK_API_BASE_URL);
      console.log("assessmentContent=====================>", assessmentContent);
      const reportResponse = await fetch(
        `${FRANK_API_BASE_URL}/students/${studentId}/reports/utl`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': FRANK_API_KEY,
            // 'ngrok-skip-browser-warning': 'true', // Skip ngrok warning page
          },
          body: JSON.stringify({
            content: assessmentContent,
            fileName: `utl_assessment_${applicationId}_${new Date().toISOString().split('T')[0]}.txt`,
          }),
          signal: createTimeoutSignal(120000), // 120 second timeout for report generation (AI processing takes time)
        }
      );
      console.log("reportResponse=====================>", reportResponse);

      // Read response text first (can only be read once)
      const reportResponseText = await reportResponse.text();
      
      // Check if response is HTML
      const reportContentType = reportResponse.headers.get('content-type');
      
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
        if (reportResponse.status === 401) {
          console.error("❌ UNAUTHORIZED: Invalid or missing API key");
          throw new Error("Authentication failed. Please check your API key configuration.");
        }
        
        if (reportResponse.status === 404) {
          console.error("❌ NOT_FOUND: Student or resource not found");
          // Try to create the student and retry once
          try {
            const createStudentResponse = await fetch(
              `${FRANK_API_BASE_URL}/students`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-api-key': FRANK_API_KEY,
                },
                body: JSON.stringify({
                  alsStudentId: studentId,
                  name: studentName,
                  ...(studentAge && { age: studentAge }),
                  ...(application.parentFullName && { parentName: application.parentFullName }),
                }),
                signal: createTimeoutSignal(10000),
              }
            );
          } catch (createError) {
            console.error("Could not create student during error handling:", createError);
          }
          throw new Error("Student not found. Please ensure the student exists in the system.");
        }
        
        if (reportResponse.status === 400 && errorData.code === 'VALIDATION_ERROR') {
          console.error("❌ VALIDATION_ERROR: Invalid request body");
          throw new Error(`Validation error: ${errorData.error || errorData.message || 'Invalid request'}`);
        }
        
        if (reportResponse.status === 500) {
          console.error("❌ SERVER_ERROR: Internal server error");
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
      
      // Handle response format from POST /reports/utl (returns rawReport, analysisReport, and analysis)
      // const reportId = reportData.analysisReport?.id || reportData.report_id || 'N/A';
      // const generatedAt = reportData.analysisReport?.createdAt || reportData.generated_at || new Date().toISOString();
      // const analysisData = reportData.analysis || reportData;

      // Note: Report is stored in Frank API, we don't need to store it locally
      // The report can be retrieved anytime using the student_id
      // The session is active and can be used for future queries/reports

        const reportId = reportData.analysisReport?.id || reportData.report_id || 'N/A';
      const generatedAt = reportData.analysisReport?.createdAt || reportData.generated_at || new Date().toISOString();
      const analysisData = reportData.analysis || reportData;

      // Note: Report is stored in Frank API, we don't need to store it locally
      // The report can be retrieved anytime using the student_id
      // The session is active and can be used for future queries/reports
      
      // Send email notification to parent about report availability
      try {
        await sendLearnerReportNotificationEmail({
          parentName: application.parentFullName,
          parentEmail: application.parentEmail,
          childName: application.childFullName,
          applicationId: applicationId,
        });
        console.log('✅ Learner report notification email sent successfully');
      } catch (emailError: any) {
        // Log email error but don't fail the request - report generation was successful
        console.error('⚠️ Failed to send learner report notification email:', emailError);
        // Continue with successful response even if email fails
      }
      
      return NextResponse.json({
        success: true,
        message: "AI Assessment generated successfully",
        data: {
          reportId: reportId,
          studentId: studentId,
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

