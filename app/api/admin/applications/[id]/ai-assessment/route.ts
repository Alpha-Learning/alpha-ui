import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";

const FRANK_API_BASE_URL = process.env.FRANK_API_BASE_URL;
const FRANK_API_KEY = process.env.FRANK_API_KEY;

// Helper function to create timeout signal (compatible with older Node.js versions)
function createTimeoutSignal(ms: number): AbortSignal {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  // Clean up timeout if signal is already aborted
  controller.signal.addEventListener('abort', () => clearTimeout(timeout));
  return controller.signal;
}

export async function GET(
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

    const { id: applicationId } = await params;
    const studentId = `student_${applicationId}`;

    // Get the latest UTL analysis report
    try {
      console.log("Checking for existing assessment for student:", studentId);
      
      // Use GET endpoint to retrieve existing UTL reports
      const reportResponse = await fetch(
        `${FRANK_API_BASE_URL}/students/${studentId}/reports/utl`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': FRANK_API_KEY,
            'ngrok-skip-browser-warning': 'true', // Skip ngrok warning page
          },
        }
      );

      // Read response text first (can only be read once)
      const reportResponseText = await reportResponse.text();

      // Check if response is HTML (ngrok warning page)
      const contentType = reportResponse.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        console.error("Received HTML response instead of JSON - ngrok warning page or API unreachable");
        console.error("HTML response preview:", reportResponseText.substring(0, 500));
        return NextResponse.json({ 
          success: false, 
          message: 'Frank API appears to be unreachable. Please check if the API server is running.',
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

        // If 404 or DATA_NOT_FOUND, no assessment exists yet - this is expected
        if (reportResponse.status === 404 || errorData.detail?.error_code === 'DATA_NOT_FOUND') {
          console.log("No assessment found for student (expected if not generated yet)");
          return NextResponse.json({ 
            success: false, 
            message: 'No assessment found. Please generate an assessment first.',
            data: null
          }, { status: 200 });
        }

        console.error("Report retrieval error:", {
          status: reportResponse.status,
          statusText: reportResponse.statusText,
          error: errorData
        });
        
        throw new Error(errorData.detail?.message || errorData.message || "Failed to retrieve report");
      }

      // Parse successful response (already read as text above)
      let reportData;
      try {
        reportData = JSON.parse(reportResponseText);
      } catch (parseError) {
        console.error("Failed to parse report response as JSON");
        throw new Error("Invalid JSON response from report endpoint");
      }
      console.log("Assessment found for student:", studentId);

      // GET /reports/utl returns { reports: [...] } - need to download analysis content
      if (reportData.reports && Array.isArray(reportData.reports)) {
        // Get all UTL_ANALYSIS reports and sort by createdAt to get the latest one
        const analysisReports = reportData.reports
          .filter((r: any) => r.type === "UTL_ANALYSIS")
          .sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA; // Sort descending (newest first)
          });
        
        const analysisReport = analysisReports[0]; // Get the latest one
        if (analysisReport && analysisReport.downloadUrl) {
          try {
            const analysisResponse = await fetch(analysisReport.downloadUrl);
            const analysisData = await analysisResponse.json();
            return NextResponse.json({
              success: true,
              data: analysisData
            });
          } catch (fetchError: any) {
            console.error("Failed to download analysis content:", fetchError);
            throw new Error("Failed to download analysis content from storage");
          }
        } else {
          return NextResponse.json({ 
            success: false, 
            message: 'No analysis report found in reports list.',
            data: null
          }, { status: 200 });
        }
      } else {
        // If response format is different, return as-is
      return NextResponse.json({
        success: true,
        data: reportData
      });
      }
    } catch (error: any) {
      console.error("Report retrieval error:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // If it's a network/fetch error (API unreachable), return success: false with 200 status
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.error("Network error - Frank API may be unreachable");
        return NextResponse.json({ 
          success: false, 
          message: 'Unable to connect to Frank API. Please ensure the API server is running.',
          data: null
        }, { status: 200 });
      }
      
      return NextResponse.json({ 
        success: false, 
        message: `Failed to retrieve assessment: ${error.message}`,
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('AI Assessment retrieval error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}

