import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const ALS_API_BASE_URL = process.env.ALS_API_BASE_URL;

    if (!ALS_API_BASE_URL) {
      console.error("ALS_API_BASE_URL or FRANK_API_BASE_URL environment variable is not set");
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { token, parent, student, applicationId } = body;
    
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Token is required. Please login to ALS first.",
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

    // Helper function to normalize gender
    const normalizeGender = (gender: any): string | null => {
      if (!gender) return null;
      const genderStr = String(gender).toLowerCase().trim();
      if (genderStr === "f" || genderStr === "female" || genderStr.startsWith("f")) return "f";
      if (genderStr === "m" || genderStr === "male" || genderStr.startsWith("m")) return "m";
      return null;
    };

    // Format payload for ALS API
    const payload = {
      parent: {
        full_name: normalizeString(parent.full_name, ""),
        email: normalizeString(parent.email, ""),
        phone: normalizeString(parent.phone, ""),
        relation_to_child_id: parent.relation_to_child_id || 1,
      },
      student: {
        full_name: normalizeString(student.full_name, ""),
        date_of_birth: normalizeDate(student.date_of_birth),
        age: normalizeAge(student.age),
        gender: normalizeGender(student.gender),
        school_year: student.school_year || null,
        current_school: normalizeString(student.current_school) || null,
        school_type: normalizeString(student.school_type) || null,
        application_id: applicationId || null,
        parent_pwd: student.parent_pwd || null,
      },
    };

    // Handle trailing slash in base URL
    const baseUrl = ALS_API_BASE_URL.endsWith('/') ? ALS_API_BASE_URL.slice(0, -1) : ALS_API_BASE_URL;
    const alsUrl = `${baseUrl}/admin/utl-sync/student-parent`;
    
    console.log("Calling ALS API:", alsUrl);
    console.log("Payload:", JSON.stringify(payload, null, 2));
    
    // Pass token as Bearer token in Authorization header (not in payload)
    const response = await fetch(alsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Token passed as Bearer token in header
      },
      body: JSON.stringify(payload), // Payload only contains parent/student data, no token
    });

    console.log("ALS response status:", response.status);
    
    const responseText = await response.text();
    console.log("ALS response text:", responseText.substring(0, 500));
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse ALS response as JSON:", parseError);
      console.error("Full response text:", responseText);
      
      return NextResponse.json(
        {
          success: false,
          message: `ALS server returned invalid response: ${responseText.substring(0, 200)}`,
          error: {
            type: "parse_error",
            message: parseError instanceof Error ? parseError.message : String(parseError),
            responseText: responseText.substring(0, 500),
          },
        },
        { status: response.status || 500 }
      );
    }

    if (!response.ok || data.error) {
      console.error("ALS error response:", JSON.stringify(data.error, null, 2));
      const errorMessage = data.message || 
                          data.error?.message || 
                          JSON.stringify(data.error) ||
                          "Failed to create admission";
      
      return NextResponse.json(
        {
          success: false,
          message: "ALS Server Error",
          error: {
            ...data.error,
            message: errorMessage,
            fullError: data.error,
          },
        },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admission created successfully in ALS",
      data: data.data || data,
    });
  } catch (error: any) {
    console.error("ALS admission create error:", error);
    console.error("Error stack:", error.stack);
  
    return NextResponse.json(
      {
        success: false,
        message: "ALS Server Error",
        error: {
          type: "connection_error",
          message: error.message || "Failed to connect to ALS server",
          details: error.toString(),
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        },
      },
      { status: 500 }
    );
  }
}
