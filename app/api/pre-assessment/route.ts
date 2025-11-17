import { NextResponse } from "next/server";
import { z } from "zod";

// Enums matching your DTO
const Gender = z.enum(["M", "F"]);
const SchoolType = z.enum(["Public", "Private", "Homeschool", "Other"]);
const TechPreference = z.enum(["Yes", "No", "NotSure"]);
const HandsOnPreference = z.enum(["Yes", "No", "NotSure"]);

const submissionSchema = z.object({
  // Parent/Guardian Information
  parentFullName: z.string().min(1, "Parent full name is required"),
  parentEmail: z.string().email("Invalid email format"),
  parentPhone: z.string().optional(),
  relationToChild: z
    .string({ required_error: "Relation to child is required" })
    .min(1, "Relation to child is required")
    .refine((value) => ["1", "2", "3"].includes(value), {
      message: "Relation to child is required",
    }),
  parentCity: z.string().optional(),
  parentEthnicity: z.string().optional(),

  // Child Information
  childFullName: z.string().min(1, "Child full name is required"),
  childDateOfBirth: z.string().optional(), // Date string format
  childAge: z.number().int().min(1).max(18).optional(),
  childGender: Gender.optional(),
  childEthnicity: z.string().optional(),
  childSchoolYear: z.string().optional(),
  childCurrentSchool: z.string().optional(),
  childSchoolType: SchoolType.optional(),
  childSchoolTypeOther: z.string().optional(),
  childDiagnosedNeeds: z.string().optional(),

  // Caregiver/Nanny Information (optional)
  caregiverFullName: z.string().optional(),
  caregiverPhone: z.string().optional(),

  // Parent Questions
  qExcitesMost: z.string().min(1, "This field is required"),
  qNonTraditionalReason: z.string().min(1, "This field is required"),
  qBiggestHope: z.string().min(1, "This field is required"),
  enjoysTech: TechPreference,
  enjoysHandsOn: HandsOnPreference,

  // Consent
  consentContact: z.boolean(),
  consentUpdates: z.boolean(),
  consentBiometric: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = submissionSchema.safeParse(data);
    
    if (!parsed.success) {
      return NextResponse.json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    // TODO: Persist to your DB or send to an email/CRM
    console.log("Pre-Assessment submission:", parsed.data);

    // Mock response with generated ID
    const submissionId = `pre_assessment_${Date.now()}`;
    
    return NextResponse.json({
      success: true,
      data: {
        id: submissionId,
        status: "submitted",
        message: "Pre-assessment submitted successfully",
      },
    });

  } catch (error) {
    console.error("Pre-assessment submission error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // Mock pre-assessments data for admin view
    const mockData = {
      data: [
        {
          id: "pre_assessment_1",
          parentFullName: "John Smith",
          parentEmail: "john@example.com",
          childFullName: "Sarah Smith",
          childAge: 8,
          childGrade: "3rd Grade",
          status: "submitted",
          submittedAt: new Date().toISOString(),
        },
        {
          id: "pre_assessment_2",
          parentFullName: "Jane Doe",
          parentEmail: "jane@example.com",
          childFullName: "Mike Doe",
          childAge: 6,
          childGrade: "1st Grade",
          status: "processing",
          submittedAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ],
      meta: {
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    };

    return NextResponse.json({
      success: true,
      data: mockData,
    });

  } catch (error) {
    console.error("Get pre-assessments error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}


