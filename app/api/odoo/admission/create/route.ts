import { NextResponse } from "next/server";

const ODOO_BASE_URL = process.env.ODOO_BASE_URL || "https://smslive.alpheraacademy.edu.bh";

export async function POST(req: Request) {
  try {
    if (!ODOO_BASE_URL) {
      return NextResponse.json(
        {
          success: false,
          message: "ODOO_BASE_URL is not configured",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { sessionSid, parent, student } = body;

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

    // Helper function to validate and format school_year
    const normalizeSchoolYear = (schoolYear: string | null | undefined): string | null => {
      if (!schoolYear) return null;
      
      // If it's already a valid year (4 digits), format as date
      const yearMatch = String(schoolYear).match(/^(\d{4})$/);
      if (yearMatch) {
        return `${yearMatch[1]}-01-01`; // Format as date: YYYY-01-01
      }
      
      // If it's already a valid date format (YYYY-MM-DD), return as is
      const dateMatch = String(schoolYear).match(/^\d{4}-\d{2}-\d{2}$/);
      if (dateMatch) {
        return schoolYear;
      }
      
      // Try to parse as date
      const parsedDate = new Date(schoolYear);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString().split("T")[0];
      }
      
      // If it's not a valid year/date, return null to avoid Odoo errors
      return null;
    };

    // Format payload according to Odoo's expected structure
    const payload = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        parent: {
          full_name: parent.full_name,
          email: parent.email,
          phone: parent.phone || "",
          relation_to_child_id: parent.relation_to_child_id || 1,
        },
        student: {
          full_name: student.full_name,
          date_of_birth: student.date_of_birth,
          age: student.age,
          gender: student.gender,
          school_year: normalizeSchoolYear(student.school_year),
          current_school: student.current_school || null,
          school_type: student.school_type || null,
        },
      },
      id: Math.floor(Math.random() * 100000),
    };

    // Call Odoo admission API with session_sid as cookie
    const odooUrl = `${ODOO_BASE_URL}/api/admission/create`;
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
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse Odoo response as JSON:", parseError);
      console.error("Full response text:", responseText);
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

