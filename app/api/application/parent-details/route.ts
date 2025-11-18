import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/app/lib/db";

const emailSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = emailSchema.safeParse(data);
    
    if (!parsed.success) {
      return NextResponse.json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
      include: {
        applications: {
          orderBy: { createdAt: 'desc' },
          take: 1, // Get the most recent application
        },
      },
    });

    if (!user) {
      return NextResponse.json({
        success: true,
        data: null,
        hasPassword: false,
      });
    }

    // Get the most recent application for parent details
    const latestApplication = user.applications[0] || null;

    // Check if user has a password set
    // If user has multiple applications, they definitely have a password
    // If user has 1 application, check if updatedAt is significantly after createdAt
    let passwordIsSet = false;
    if (user.applications.length > 1) {
      // Multiple applications = definitely has password
      passwordIsSet = true;
    } else if (user.applications.length === 1) {
      // Single application: check if user was updated significantly after creation
      const timeDiff = user.updatedAt.getTime() - user.createdAt.getTime();
      const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
      passwordIsSet = timeDiff > fiveMinutes;
    }

    return NextResponse.json({
      success: true,
      data: latestApplication ? {
        parentFullName: latestApplication.parentFullName,
        parentEmail: latestApplication.parentEmail,
        parentPhone: latestApplication.parentPhone,
        parentOccupation: latestApplication.parentOccupation,
        relationToChild: latestApplication.relationToChild,
        parentCity: latestApplication.parentCity,
        parentEthnicity: latestApplication.parentEthnicity,
        caregiverFullName: latestApplication.caregiverFullName,
        caregiverPhone: latestApplication.caregiverPhone,
      } : {
        parentFullName: user.name,
        parentEmail: user.email,
        parentPhone: user.phone,
        parentCity: user.city,
      },
      hasPassword: passwordIsSet,
      userExists: true,
    });

  } catch (error: any) {
    console.error("Get parent details error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}

