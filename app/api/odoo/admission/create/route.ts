import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { sendOdooSyncSuccessEmail } from "@/app/lib/emailService";

export async function POST(req: Request) {
  try {
    const ODOO_BASE_URL = process.env.ODOO_BASE_URL;

    if (!ODOO_BASE_URL) {
      console.error("ODOO_BASE_URL environment variable is not set");
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { sessionSid, parent, student, applicationId } = body;
    
    // Fetch parent password from database using applicationId
    let parentPwd = null;
    if (applicationId) {
      try {
        const application = await prisma.application.findUnique({
          where: { id: applicationId },
          include: {
            user: {
              select: {
                password: true,
              },
            },
          },
        });
        parentPwd = application?.user?.password || null;
      } catch (error) {
        console.error("Error fetching parent password:", error);
        // Continue without password if fetch fails
      }
    }
    
    // Also check if parent_pwd was passed directly in student object (for backward compatibility)
    if (!parentPwd && student?.parent_pwd) {
      parentPwd = student.parent_pwd;
    }

    if (!sessionSid) {
      return NextResponse.json(
        {
          success: false,
          message: "Session SID is required. Please login to Odoo first.",
        },
        { status: 401 }
      );
    }

    if (!parent || !student) {
      return NextResponse.json(
        {
          success: false,
          message: "Parent and student data are required",
        },
        { status: 400 }
      );
    }

    // Helper function to normalize and validate strings
    const normalizeString = (value: any, defaultValue: string = ""): string => {
      if (!value) return defaultValue;
      return String(value).trim();
    };

    // Helper function to normalize date to YYYY-MM-DD format
    const normalizeDate = (date: any): string | null => {
      if (!date) return null;
      
      // If already in YYYY-MM-DD format, return as is
      if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date;
      }
      
      // Try to parse as Date object
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString().split("T")[0];
      }
      
      return null;
    };

    // Helper function to normalize age to number
    const normalizeAge = (age: any): number | null => {
      if (age === null || age === undefined) return null;
      const numAge = typeof age === "number" ? age : parseInt(String(age), 10);
      return isNaN(numAge) ? null : numAge;
    };

    // Helper function to normalize gender to 'f' or 'm'
    const normalizeGender = (gender: any): string | null => {
      if (!gender) return null;
      const genderStr = String(gender).toLowerCase().trim();
      if (genderStr === "f" || genderStr === "female" || genderStr.startsWith("f")) return "f";
      if (genderStr === "m" || genderStr === "male" || genderStr.startsWith("m")) return "m";
      return null;
    };

    // Helper function to normalize relation_to_child_id to number
    const normalizeRelationToChildId = (relation: any): number => {
      if (relation === null || relation === undefined) return 1;
      const numRelation = typeof relation === "number" ? relation : parseInt(String(relation), 10);
      return isNaN(numRelation) ? 1 : numRelation;
    };

    // Helper function to validate and format school_year (returns only year as string, e.g., "2000" or "2025")
    const normalizeSchoolYear = (schoolYear: any): string | null => {
      if (!schoolYear) return null;
      
      const yearStr = String(schoolYear).trim();
      
      // If it's already a valid year (4 digits), return as is
      const yearMatch = yearStr.match(/^(\d{4})$/);
      if (yearMatch) {
        return yearMatch[1]; // Return just the year, e.g., "2000" or "2025"
      }
      
      // If it's a date format (YYYY-MM-DD), extract just the year
      const dateMatch = yearStr.match(/^(\d{4})-\d{2}-\d{2}$/);
      if (dateMatch) {
        return dateMatch[1]; // Extract and return just the year part
      }
      
      // Try to parse as date and extract year
      const parsedDate = new Date(schoolYear);
      if (!isNaN(parsedDate.getTime())) {
        return String(parsedDate.getFullYear()); // Return just the year as string
      }
      
      // If it's not a valid year/date, return null to avoid Odoo errors
      return null;
    };
    console.log("school year", normalizeSchoolYear(student.school_year));

    // Format payload according to Odoo's expected structure with validation
    // This ensures the payload always matches the exact structure required
    const payload = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        parent: {
          full_name: normalizeString(parent.full_name, ""),
          email: normalizeString(parent.email, ""),
          phone: normalizeString(parent.phone, ""),
          relation_to_child_id: normalizeRelationToChildId(parent.relation_to_child_id),
        },
        student: {
          full_name: normalizeString(student.full_name, ""),
          date_of_birth: normalizeDate(student.date_of_birth),
          age: normalizeAge(student.age),
          gender: normalizeGender(student.gender),
          school_year: normalizeSchoolYear(student.school_year),
          current_school: normalizeString(student.current_school) || null,
          school_type: normalizeString(student.school_type) || null,
          // Temporary student ID should match our application ID, sent with other student fields
          temp_student: applicationId ?? null,
          // Parent password from pre-assessment form
          parent_pwd: parentPwd ? String(parentPwd) : null,
        },
      },
      id: Math.floor(Math.random() * 100000),
    };

    // Call Odoo admission API with session_sid as cookie
    // Handle trailing slash in base URL
    const baseUrl = ODOO_BASE_URL.endsWith('/') ? ODOO_BASE_URL.slice(0, -1) : ODOO_BASE_URL;
    const odooUrl = `${baseUrl}/api/admission/create`;
    console.log("Calling Odoo API:", odooUrl);
    console.log("Payload:", JSON.stringify(payload, null, 2));
    
    const response = await fetch(odooUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `session_id=${sessionSid}`,
      },
      body: JSON.stringify(payload),
    });

    console.log("Odoo response status:", response.status);
    console.log("Odoo response headers:", Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log("Odoo response text:", responseText.substring(0, 500));
    
    // Handle 404 - endpoint doesn't exist on Odoo server
    if (response.status === 404) {
      return NextResponse.json(
        {
          success: false,
          message: `Odoo endpoint not found: ${odooUrl}. Please ensure the /api/admission/create endpoint is configured in Odoo.`,
          error: {
            type: "endpoint_not_found",
            message: "The /api/admission/create endpoint does not exist on the Odoo server",
            url: odooUrl,
            status: 404,
          },
        },
        { status: 404 }
      );
    }
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse Odoo response as JSON:", parseError);
      console.error("Full response text:", responseText);
      
      // If it's an HTML response (likely an error page), provide a clearer message
      if (responseText.trim().startsWith('<!') || responseText.trim().startsWith('<html')) {
        return NextResponse.json(
          {
            success: false,
            message: `Odoo server returned an HTML error page (${response.status}). The endpoint ${odooUrl} may not exist or there's a server configuration issue.`,
            error: {
              type: "html_error_response",
              message: "Odoo returned HTML instead of JSON",
              status: response.status,
              url: odooUrl,
            },
          },
          { status: response.status || 500 }
        );
      }
      
      return NextResponse.json(
        {
          success: false,
          message: `Odoo server returned invalid response: ${responseText.substring(0, 200)}`,
          error: {
            type: "parse_error",
            message: parseError instanceof Error ? parseError.message : String(parseError),
            responseText: responseText.substring(0, 500),
          },
        },
        { status: response.status || 500 }
      );
    }

    if (data.error || !data.result) {
      console.error("Odoo error response:", JSON.stringify(data.error, null, 2));
      const errorMessage = data.error?.message || 
                          data.error?.data?.message || 
                          data.error?.data?.debug || 
                          JSON.stringify(data.error) ||
                          "Failed to create admission";
      
      return NextResponse.json(
        {
          success: false,
          message: "Odoo Server Error",
          error: {
            ...data.error,
            message: errorMessage,
            fullError: data.error,
          },
        },
        { status: response.status || 500 }
      );
    }

    // Send approval email to parent after successful sync
    if (applicationId) {
      try {
        const application = await prisma.application.findUnique({
          where: { id: applicationId },
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        });

        if (application?.user?.email && application?.user?.name) {
          const emailSent = await sendOdooSyncSuccessEmail({
            parentName: application.user.name,
            parentEmail: application.user.email,
            childName: application.childFullName || student.full_name || "Your child",
            applicationId: applicationId,
          });

          if (emailSent) {
            console.log(`Approval email sent successfully to ${application.user.email}`);
          } else {
            console.error(`Failed to send approval email to ${application.user.email}`);
          }
        }
      } catch (emailError) {
        console.error("Error sending approval email:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "Admission created successfully",
      data: data.result,
    });
  } catch (error: any) {
    console.error("Odoo admission create error:", error);
    console.error("Error stack:", error.stack);
  
    return NextResponse.json(
      {
        success: false,
        message: "Odoo Server Error",
        error: {
          type: "connection_error",
          message: error.message || "Failed to connect to Odoo server",
          details: error.toString(),
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        },
      },
      { status: 500 }
    );
  }
}

