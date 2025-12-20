import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";

/**
 * Maps relation to child string to Odoo relation_to_child_id
 * This mapping may need to be adjusted based on Odoo's actual ID values
 */
function mapRelationToChildId(relation: string | null): number | null {
  if (!relation) return null;
  
  const relationLower = relation.toLowerCase().trim();
  const mapping: Record<string, number> = {
    "father": 1,
    "dad": 1,
    "mother": 2,
    "mom": 2,
    "parent": 1,
    "guardian": 3,
    "other": 4,
  };

  // Check for exact match or partial match
  for (const [key, id] of Object.entries(mapping)) {
    if (relationLower.includes(key)) {
      return id;
    }
  }

  // If it's already a number string, try to parse it
  const numValue = parseInt(relation);
  if (!isNaN(numValue)) {
    return numValue;
  }

  // Default to 1 if no mapping found
  return 1;
}

/**
 * GET /api/odoo/registrations
 * Returns all completed admission registrations
 * Requires authentication token in Authorization header
 */
export async function GET(req: Request) {
  try {
    // Check for authorization header
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized - Missing or invalid token",
        },
        { status: 401 }
      );
    }

    // Verify token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const userPayload = verifyToken(token);

    if (!userPayload) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized - Invalid or expired token",
        },
        { status: 401 }
      );
    }

    // Fetch all completed applications
    const completedApplications = await prisma.application.findMany({
      where: {
        status: "completed",
      },
      select: {
        id: true,
        // Parent Details
        parentFullName: true,
        parentEmail: true,
        parentPhone: true,
        relationToChild: true,
        // Student Details
        childFullName: true,
        childDateOfBirth: true,
        childAge: true,
        childGender: true,
        childSchoolYear: true,
        childCurrentSchool: true,
        childSchoolType: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format the response data to match Odoo payload structure
    const registrations = completedApplications.map((app, index) => {
      // Normalize gender to lowercase (f/m) as expected by Odoo
      let gender = app.childGender?.toLowerCase() || null;
      if (gender && gender !== "f" && gender !== "m") {
        // Map common gender values
        if (gender.startsWith("f") || gender === "female") gender = "f";
        else if (gender.startsWith("m") || gender === "male") gender = "m";
      }

      return {
        jsonrpc: "2.0",
        method: "call",
        params: {
          parent: {
            full_name: app.parentFullName,
            email: app.parentEmail,
            phone: app.parentPhone || "",
            relation_to_child_id: mapRelationToChildId(app.relationToChild),
          },
          student: {
            full_name: app.childFullName,
            date_of_birth: app.childDateOfBirth
              ? app.childDateOfBirth.toISOString().split("T")[0]
              : null,
            age: app.childAge || null,
            gender: gender,
            school_year: app.childSchoolYear || null,
            current_school: app.childCurrentSchool || null,
            school_type: app.childSchoolType || null,
          },
        },
        id: index + 1,
      };
    });

    return NextResponse.json({
      success: true,
      data: registrations,
      count: registrations.length,
    });
  } catch (error) {
    console.error("Odoo registrations fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

