import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";

const FRANK_API_BASE_URL = process.env.FRANK_API_BASE_URL || "https://295d6df344e2.ngrok-free.app/api/v1";

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

    const { id: applicationId } = await params;
    const studentId = `student_${applicationId}`;

    // Get the latest UTL analysis report
    try {
      console.log("Checking for existing assessment for student:", studentId);
      
      const reportResponse = await fetch(
        `${FRANK_API_BASE_URL}/students/${studentId}/reports/utl-analysis`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true', // Skip ngrok warning page
          },
          body: JSON.stringify({
            include_recommendations: true,
            detail_level: 'full',
          }),
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

      return NextResponse.json({
        success: true,
        data: reportData
      });
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

