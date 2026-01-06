import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

/**
 * GET /api/sync/students
 * 
 * Returns all students, parents, and their relations in a single comprehensive response.
 * 
 * Authentication: X-API-Key header
 * 
 * Query Parameters:
 * - status: Filter by application status (optional)
 * - limit: Limit number of results (optional, default: all)
 * - offset: Offset for pagination (optional, default: 0)
 * 
 * Response Format:
 * {
 *   success: boolean,
 *   students: [
 *     {
 *       id: string,
 *       fullName: string,
 *       dateOfBirth: string | null,
 *       age: number | null,
 *       gender: string | null,
 *       schoolYear: string | null,
 *       currentSchool: string | null,
 *       schoolType: string | null,
 *       applicationId: string,
 *       applicationStatus: string,
 *       createdAt: string,
 *       updatedAt: string,
 *     }
 *   ],
 *   parents: [
 *     {
 *       id: string,
 *       fullName: string,
 *       email: string,
 *       phone: string | null,
 *       occupation: string | null,
 *       city: string | null,
 *       applicationId: string,
 *     }
 *   ],
 *   relations: [
 *     {
 *       studentId: string,
 *       parentId: string,
 *       relation: string | null,
 *       applicationId: string,
 *     }
 *   ],
 *   total: number,
 *   limit: number,
 *   offset: number
 * }
 */
export async function GET(req: NextRequest) {
  try {
    console.log("Sync students route called============mkmkmkmkkmkmkmkmkmkmkmkmkmkmkmkk");
    // Verify API Key
    const apiKey = req.headers.get("x-api-key") || req.headers.get("X-API-Key");
    // Get env var and trim quotes if present (Next.js sometimes includes quotes from .env)
    let expectedApiKey = process.env.UTL_ALS_API_KEY;
    if (expectedApiKey && (expectedApiKey.startsWith('"') || expectedApiKey.startsWith("'"))) {
      expectedApiKey = expectedApiKey.slice(1, -1);
    }
    
    // console.log("Received apiKey:", apiKey);
    // console.log("Expected apiKey from env (raw):", process.env.UTL_ALS_API_KEY);
    // console.log("Expected apiKey from env (processed):", expectedApiKey);
    // console.log("Expected apiKey type:", typeof expectedApiKey);
    // console.log("Expected apiKey length:", expectedApiKey?.length);
    // console.log("Keys match:", apiKey === expectedApiKey);
    
    // if (!apiKey || !expectedApiKey || apiKey !== expectedApiKey) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Unauthorized - Invalid or missing API key",
    //     },
    //     { status: 401 }
    //   );
    // }

    // console.log("after if block================================");
    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get("status");
    const limitParam = searchParams.get("limit");
    const offsetParam = searchParams.get("offset");

    const limit = limitParam ? parseInt(limitParam, 10) : undefined;
    const offset = offsetParam ? parseInt(offsetParam, 10) : 0;
// console.log("limit===========================================");
    // Validate limit and offset
    if (limit !== undefined && (isNaN(limit) || limit < 1)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid limit parameter. Must be a positive integer.",
        },
        { status: 400 }
      );
    }

    if (isNaN(offset) || offset < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid offset parameter. Must be a non-negative integer.",
        },
        { status: 400 }
      );
    }

    // Build where clause
    const where: any = {};
    if (status) {
      where.status = status;
    }

    // Get total count
    const total = await prisma.application.count({ where });
    console.log("Total applications:", total);

    // Fetch applications with user relation
    const applications = await prisma.application.findMany({
      where,
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        // Parent information
        parentFullName: true,
        parentEmail: true,
        parentPhone: true,
        parentOccupation: true,
        parentCity: true,
        relationToChild: true,
        // Child/Student information
        childFullName: true,
        childDateOfBirth: true,
        childAge: true,
        childGender: true,
        childSchoolYear: true,
        childCurrentSchool: true,
        childSchoolType: true,
        // User relation for parent ID
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            city: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      ...(limit !== undefined && { take: limit, skip: offset }),
    });

    // Format response - separate students, parents, and relations
    const students: any[] = [];
    const parents: any[] = [];
    const relations: any[] = [];

    // Use a Map to track unique parents by userId (or email if no userId) to avoid duplicates
    const parentMap = new Map<string | number, any>();

    applications.forEach((app) => {
      const studentId = `student_${app.id}`;
      
      // Use user.id as parentId if available, otherwise fallback to email-based ID
      const parentId = app.user?.id 
        ? app.user.id.toString() 
        : app.userId 
          ? app.userId.toString() 
          : `parent_${app.parentEmail}`;

      // Add student
      students.push({
        id: studentId,
        fullName: app.childFullName,
        dateOfBirth: app.childDateOfBirth
          ? app.childDateOfBirth.toISOString().split("T")[0]
          : null,
        age: app.childAge,
        gender: app.childGender,
        schoolYear: app.childSchoolYear,
        currentSchool: app.childCurrentSchool,
        schoolType: app.childSchoolType,
        applicationId: app.id,
        applicationStatus: app.status,
        createdAt: app.createdAt.toISOString(),
        updatedAt: app.updatedAt.toISOString(),
      });

      // Determine parent key - use userId if available, otherwise use email
      const parentKey: string | number = app.user?.id || app.userId || app.parentEmail;

      // Add parent (only if not already added)
      if (!parentMap.has(parentKey)) {
        const parent = {
          id: parentId,
          fullName: app.user?.name || app.parentFullName,
          email: app.user?.email || app.parentEmail,
          phone: app.user?.phone || app.parentPhone,
          occupation: app.parentOccupation,
          city: app.user?.city || app.parentCity,
          applicationId: app.id,
        };
        parents.push(parent);
        parentMap.set(parentKey, parent);
      }

      // Add relation
      relations.push({
        studentId: studentId,
        parentId: parentId,
        relation: app.relationToChild,
        applicationId: app.id,
      });
    });

    return NextResponse.json({
      success: true,
      students,
      parents,
      relations,
      total,
      limit: limit ?? total,
      offset,
    });
  } catch (error: any) {
    console.error("Sync API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

