import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

/**
 * GET /api/sync/students
 * 
 * Returns only unsynced students, parents, and their relations.
 * After returning, marks the applications as synced.
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
 *   message: string, // "Synced successfully" or "No new data to sync"
 *   students: [...],
 *   parents: [...],
 *   relations: [...],
 *   total: number,
 *   syncedCount: number, // Number of applications marked as synced
 *   limit: number,
 *   offset: number
 * }
 */
export async function GET(req: NextRequest) {
  try {
    // console.log("Sync students route called============mkmkmkmkkmkmkmkmkmkmkmkmkmkmkmkk");
    // Verify API Key
    const apiKey = req.headers.get("x-api-key") || req.headers.get("X-API-Key");
    // Get env var and trim quotes if present (Next.js sometimes includes quotes from .env)
    let expectedApiKey = process.env.UTL_ALS_API_KEY;
    if (expectedApiKey && (expectedApiKey.startsWith('"') || expectedApiKey.startsWith("'"))) {
      expectedApiKey = expectedApiKey.slice(1, -1);
    }
    
    // Verify API Key
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
    const resetSync = searchParams.get("resetSync") === "true"; // For testing: reset all syncedAt to null
    const includeSynced = searchParams.get("includeSynced") === "true"; // Include already synced applications

    const limit = limitParam ? parseInt(limitParam, 10) : undefined;
    const offset = offsetParam ? parseInt(offsetParam, 10) : 0;
// console.log("limit===========================================");
    // Validate limit and offset
    // if (limit !== undefined && (isNaN(limit) || limit < 1)) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Invalid limit parameter. Must be a positive integer.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // if (isNaN(offset) || offset < 0) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Invalid offset parameter. Must be a non-negative integer.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // If resetSync is true, reset all syncedAt to null (for testing/debugging)
    if (resetSync) {
      await prisma.application.updateMany({
        where: {},
        data: {
          syncedAt: null,
        },
      });
      console.log("Reset sync status for all applications");
    }

    // Build where clause - fetch unsynced applications (or all if includeSynced is true)
    const where: any = {};
    if (!includeSynced) {
      where.syncedAt = null; // Only get applications that haven't been synced yet
    }
    if (status) {
      where.status = status;
    }

    // Debug: Check total applications and unsynced count
    const totalAllApplications = await prisma.application.count({});
    const totalUnsynced = await prisma.application.count({ where });

    // console.log("totaluNSYNCED=============", totalUnsynced);
    
    // console.log("=== SYNC DEBUG ===");
    // console.log("Total applications in database:", totalAllApplications);
    // console.log("Total unsynced applications:", totalUnsynced);
    // console.log("Where clause:", JSON.stringify(where, null, 2));
    
    // Check if syncedAt field exists by trying to get a sample
    try {
      const sampleApp = await prisma.application.findFirst({
        select: { id: true, syncedAt: true },
      });
      // console.log("Sample application syncedAt value:", sampleApp?.syncedAt);
      // console.log("Sample application syncedAt type:", typeof sampleApp?.syncedAt);
    } catch (err: any) {
      console.error("Error checking syncedAt field:", err.message);
      if (err.message?.includes("syncedAt") || err.message?.includes("Unknown column")) {
        return NextResponse.json(
          {
            success: false,
            message: "Database migration not run. Please run: pnpm prisma migrate dev",
            error: "syncedAt field does not exist in database",
          },
          { status: 500 }
        );
      }
    }

    // Get total count of unsynced applications
    const total = totalUnsynced;

    // If no unsynced applications, return early with appropriate message
    if (total === 0) {
      console.log("No unsynced applications found. All applications may have been synced already.");
      return NextResponse.json({
        success: true,
        message: `No new data to sync - all applications have already been synced. Total applications: ${totalAllApplications}`,
        students: [],
        parents: [],
        relations: [],
        total: 0,
        syncedCount: 0,
        limit: 0,
        offset,
        debug: {
          totalApplications: totalAllApplications,
          totalUnsynced: totalUnsynced,
        },
      });
    }

    // Fetch unsynced applications with user relation
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
    const parentApplicationMap = new Map<string | number, string[]>(); // Track which applications belong to each parent

    // console.log(`Processing ${applications.length} applications...`);
    
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

      // Track which applications belong to this parent
      if (!parentApplicationMap.has(parentKey)) {
        parentApplicationMap.set(parentKey, []);
      }
      parentApplicationMap.get(parentKey)!.push(app.id);

      // Add parent (only if not already added) - this deduplicates parents
      // If multiple applications share the same parent email/userId, only one parent entry is created
      if (!parentMap.has(parentKey)) {
        const parent = {
          id: parentId,
          fullName: app.user?.name || app.parentFullName,
          email: app.user?.email || app.parentEmail,
          phone: app.user?.phone || app.parentPhone,
          occupation: app.parentOccupation,
          city: app.user?.city || app.parentCity,
          applicationId: app.id, // This will be the first application's ID for this parent
        };
        parents.push(parent);
        parentMap.set(parentKey, parent);
        console.log(`Added parent: ${parent.email} (${parent.fullName}) for application ${app.id}`);
      } else {
        console.log(`Parent already exists: ${app.parentEmail} (${app.user?.email || app.parentEmail}) - skipping duplicate parent entry for application ${app.id}`);
      }

      // Add relation
      relations.push({
        studentId: studentId,
        parentId: parentId,
        relation: app.relationToChild,
        applicationId: app.id,
      });
    });

    // Log summary
    // console.log(`=== SYNC SUMMARY ===`);
    // console.log(`Total applications processed: ${applications.length}`);
    // console.log(`Total students created: ${students.length}`);
    // console.log(`Total unique parents: ${parents.length}`);
    // console.log(`Total relations created: ${relations.length}`);
    // console.log(`Parent-to-application mapping:`);
    parentApplicationMap.forEach((appIds, parentKey) => {
      const parent = parentMap.get(parentKey);
      console.log(`  Parent ${parent?.email}: ${appIds.length} application(s) - [${appIds.join(', ')}]`);
    });

    // Mark all returned applications as synced (only if not including already synced)
    const applicationIds = applications.map((app) => app.id);
    let syncedCount = { count: 0 };
    
    if (!includeSynced) {
      // Only mark as synced if we're not including already synced applications
      syncedCount = await prisma.application.updateMany({
        where: {
          id: {
            in: applicationIds,
          },
        },
        data: {
          syncedAt: new Date(),
        },
      });
    } else {
      // If including synced, count how many were actually newly synced
      syncedCount = await prisma.application.updateMany({
        where: {
          id: {
            in: applicationIds,
          },
          syncedAt: null, // Only update those that weren't already synced
        },
        data: {
          syncedAt: new Date(),
        },
      });
    }

    // console.log("Synced count:", syncedCount.count); 
    // console.log("Synced applications:", applicationIds);
    // console.log("Synced applications:", syncedCount);
    // console.log("Synced applications:", syncedCount.count);
    // console.log("Synced applications:", syncedCount.count);
    return NextResponse.json({
      success: true,
      message: `Successfully synced ${syncedCount.count} application(s)`,
      students,
      parents,
      relations,
      total,
      syncedCount: syncedCount.count,
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

