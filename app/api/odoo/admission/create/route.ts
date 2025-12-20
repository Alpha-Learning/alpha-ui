import { NextResponse } from "next/server";

const ODOO_BASE_URL = process.env.ODOO_BASE_URL;

export async function POST(req: Request) {
  try {
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

    // Helper function to validate and format school_year
    const normalizeSchoolYear = (schoolYear: any): string | null => {
      if (!schoolYear) return null;
      
      const yearStr = String(schoolYear).trim();
      
      // If it's already a valid year (4 digits), format as date
      const yearMatch = yearStr.match(/^(\d{4})$/);
      if (yearMatch) {
        return `${yearMatch[1]}-01-01`; // Format as date: YYYY-01-01
      }
      
      // If it's already a valid date format (YYYY-MM-DD), return as is
      const dateMatch = yearStr.match(/^\d{4}-\d{2}-\d{2}$/);
      if (dateMatch) {
        return yearStr;
      }
      
      // Try to parse as date
      const parsedDate = new Date(schoolYear);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString().split("T")[0];
      }
      
      // If it's not a valid year/date, return null to avoid Odoo errors
      return null;
    };

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
        },
      },
      id: Math.floor(Math.random() * 100000),
    };

    // Call Odoo admission API with session_sid as cookie
    
    const response = await fetch(`${ODOO_BASE_URL}/api/admission/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `session_id=${sessionSid}`,
      },
      body: JSON.stringify(payload),
    });

    
    const responseText = await response.text();
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse Odoo response as JSON:", parseError);
      return NextResponse.json(
        {
          success: false,
          message: `Odoo server returned invalid response: ${responseText.substring(0, 200)}`,
        },
        { status: response.status || 500 }
      );
    }

    if (data.error || !data.result) {
      console.error("Odoo error:", data.error);
      return NextResponse.json(
        {
          success: false,
          message: data.error?.message || data.error?.data?.message || "Failed to create admission",
          error: data.error,
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
  
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to connect to Odoo server",
        error: error.toString(),
      },
      { status: 500 }
    );
  }
}

