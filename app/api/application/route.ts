import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/app/lib/db";
import { hashPassword } from "@/app/lib/auth";

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
    console.log("Data:===========>", data);
    const parsed = submissionSchema.safeParse(data);
    
    if (!parsed.success) {
      return NextResponse.json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    // Ensure a user exists for the parent email; create if missing
    const parentEmail = parsed.data.parentEmail;
    const parentName = parsed.data.parentFullName;
    const parentPhone = parsed.data.parentPhone ?? null;
    const parentCity = parsed.data.parentCity ?? null;

    // Create a placeholder hashed password for new users (they will set a real one later)
    let user = await prisma.user.findUnique({ where: { email: parentEmail } });
    console.log("User:===========>", user);
    if (!user) {
      const placeholderHashed = await hashPassword(globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`);
      user = await prisma.user.create({
        data: {
          email: parentEmail,
          name: parentName,
          password: placeholderHashed,
          role: "user",
          phone: parentPhone || undefined,
          city: parentCity || undefined,
        }
      });
    } else {
      // Keep user but update latest parent info if provided
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name || parentName,
          phone: parentPhone ?? user.phone,
          city: parentCity ?? user.city,
        }
      });
    }

    // Create application in database and associate to user
    const application = await prisma.application.create({
      data: {
        parentFullName: parsed.data.parentFullName,
        parentEmail: parsed.data.parentEmail,
        parentPhone: parsed.data.parentPhone,
        relationToChild: parsed.data.relationToChild,
        parentCity: parsed.data.parentCity,
        parentEthnicity: parsed.data.parentEthnicity,
        childFullName: parsed.data.childFullName,
        childDateOfBirth: parsed.data.childDateOfBirth ? new Date(parsed.data.childDateOfBirth) : null,
        childAge: parsed.data.childAge,
        childGender: parsed.data.childGender,
        childEthnicity: parsed.data.childEthnicity,
        childSchoolYear: parsed.data.childSchoolYear,
        childCurrentSchool: parsed.data.childCurrentSchool,
        childSchoolType: parsed.data.childSchoolType,
        childSchoolTypeOther: parsed.data.childSchoolTypeOther,
        childDiagnosedNeeds: parsed.data.childDiagnosedNeeds,
        caregiverFullName: parsed.data.caregiverFullName,
        caregiverPhone: parsed.data.caregiverPhone,
        qExcitesMost: parsed.data.qExcitesMost,
        qNonTraditionalReason: parsed.data.qNonTraditionalReason,
        qBiggestHope: parsed.data.qBiggestHope,
        enjoysTech: parsed.data.enjoysTech,
        enjoysHandsOn: parsed.data.enjoysHandsOn,
        consentContact: parsed.data.consentContact,
        consentUpdates: parsed.data.consentUpdates,
        consentBiometric: parsed.data.consentBiometric,
        userId: user.id,
        isFirstFormCompleted: true,
      }
    });

    console.log("Application submitted successfully:", application.id);
    
    return NextResponse.json({
      success: true,
      data: {
        id: application.id,
        status: application.status,
        message: "Application submitted successfully",
      },
    });

  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // Mock applications data for admin view
    const mockData = {
      data: [
        {
          id: "application_1",
          parentFullName: "John Smith",
          parentEmail: "john@example.com",
          childFullName: "Sarah Smith",
          childAge: 8,
          childGrade: "3rd Grade",
          status: "submitted",
          submittedAt: new Date().toISOString(),
        },
        {
          id: "application_2",
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
    console.error("Get applications error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}
