import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";

const FRANK_API_BASE_URL = process.env.FRANK_API_BASE_URL;
const FRANK_API_KEY = process.env.FRANK_API_KEY;

// Helper function to create timeout signal
function createTimeoutSignal(ms: number): AbortSignal {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  controller.signal.addEventListener('abort', () => clearTimeout(timeout));
  return controller.signal;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const auth = req.headers.get('authorization');
    if (!auth?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    const token = auth.slice(7);
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id: applicationId } = await params;
    const studentId = `student_${applicationId}`;

    // Verify the application belongs to the user
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      select: { userId: true, parentEmail: true }
    });

    if (!application) {
      return NextResponse.json({ 
        success: false, 
        message: 'Application not found' 
      }, { status: 404 });
    }

    // Check if user owns this application (by userId or parentEmail)
    if (application.userId !== user.id && application.parentEmail !== user.email) {
      return NextResponse.json({ 
        success: false, 
        message: 'Forbidden - You do not have access to this application' 
      }, { status: 403 });
    }

    // Check API configuration
    if (!FRANK_API_KEY || !FRANK_API_BASE_URL) {
      return NextResponse.json({ 
        success: false, 
        message: "AI report service is not configured" 
      }, { status: 500 });
    }

    // Get the latest UTL analysis report from Frank API
    try {
      const reportResponse = await fetch(
        `${FRANK_API_BASE_URL}/students/${studentId}/reports/utl`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': FRANK_API_KEY,
          },
          signal: createTimeoutSignal(30000),
        }
      );

      const reportResponseText = await reportResponse.text();
      const contentType = reportResponse.headers.get('content-type');
      
      if (contentType && contentType.includes('text/html')) {
        return NextResponse.json({ 
          success: false, 
          message: 'AI report service is currently unavailable',
          data: null
        }, { status: 200 });
      }

      if (!reportResponse.ok) {
        let errorData;
        try {
          errorData = JSON.parse(reportResponseText);
        } catch {
          errorData = { message: reportResponseText || "Failed to retrieve report" };
        }

        if (reportResponse.status === 404 || errorData.detail?.error_code === 'DATA_NOT_FOUND') {
          return NextResponse.json({ 
            success: false, 
            message: 'Report not generated yet',
            data: null
          }, { status: 200 });
        }

        throw new Error(errorData.detail?.message || errorData.message || "Failed to retrieve report");
      }

      let reportData;
      try {
        reportData = JSON.parse(reportResponseText);
      } catch (parseError) {
        throw new Error("Invalid JSON response from report endpoint");
      }

      // GET /reports/utl returns { reports: [...] } - need to download analysis content
      if (reportData.reports && Array.isArray(reportData.reports)) {
        const analysisReports = reportData.reports
          .filter((r: any) => r.type === "UTL_ANALYSIS")
          .sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
          });
        
        const analysisReport = analysisReports[0];
        if (analysisReport && analysisReport.downloadUrl) {
          try {
            const analysisResponse = await fetch(analysisReport.downloadUrl);
            const analysisData = await analysisResponse.json();
            return NextResponse.json({
              success: true,
              data: analysisData
            });
          } catch (fetchError: any) {
            throw new Error("Failed to download analysis content from storage");
          }
        } else {
          return NextResponse.json({ 
            success: false, 
            message: 'No analysis report found',
            data: null
          }, { status: 200 });
        }
      } else {
        return NextResponse.json({
          success: true,
          data: reportData
        });
      }
    } catch (error: any) {
      console.error("Report retrieval error:", error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return NextResponse.json({ 
          success: false, 
          message: 'Unable to connect to AI report service',
          data: null
        }, { status: 200 });
      }
      
      return NextResponse.json({ 
        success: false, 
        message: `Failed to retrieve report: ${error.message}`,
        data: null
      }, { status: 200 });
    }
  } catch (error: any) {
    console.error('Learner Report retrieval error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}