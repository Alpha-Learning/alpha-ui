import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";

export async function GET(req: Request) {
  try {
    // Check for authorization header
    const authHeader = req.headers.get('authorization');
    console.log('Authorization header:', authHeader ? 'Present' : 'Missing');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized - No valid token provided",
      }, { status: 401 });
    }

    // Verify token and get user ID
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const userPayload = verifyToken(token);
    
    if (!userPayload) {
      return NextResponse.json({
        success: false,
        message: "Invalid or expired token",
      }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    // Build where clause
    const whereClause: any = {
      userId: userPayload.id
    };

    if (status) {
      whereClause.status = status;
    }

    // Get user's applications from database
    const [applications, totalCount] = await Promise.all([
      prisma.application.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          status: true,
          adminComment: true,
          createdAt: true,
          updatedAt: true,
          parentFullName: true,
          parentEmail: true,
          childFullName: true,
          childAge: true,
          childSchoolYear: true,
          isPaid: true,
          paymentAmount: true,
          paidAt: true,
        }
      }),
      prisma.application.count({ where: whereClause })
    ]);

    // Get user's requests
    const userRequests = await prisma.userRequest.findMany({
      where: { userId: userPayload.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        type: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    // Transform applications to match expected format
    const transformedApplications = applications.map((app:any) => ({
      id: app.id,
      parentFullName: app.parentFullName,
      parentEmail: app.parentEmail,
      childFullName: app.childFullName,
      childAge: app.childAge,
      childGrade: app.childSchoolYear,
      status: app.status,
      adminComment: app.adminComment || undefined,
      isPaid: app.isPaid,
      paymentAmount: app.paymentAmount,
      paidAt: app.paidAt,
      submittedAt: app.createdAt.toISOString(),
      lastUpdated: app.updatedAt.toISOString(),
      type: "Application Review Request",
      description: "Application for student enrollment",
    }));

    // Combine applications and requests
    const allItems = [
      ...transformedApplications,
      ...userRequests.map((req:any) => ({
        id: req.id,
        parentFullName: "", // Not applicable for requests
        parentEmail: "",
        childFullName: "",
        childAge: null,
        childGrade: "",
        isPaid: false,
        paymentAmount: null,
        paidAt: null,
        status: req.status,
        submittedAt: req.createdAt.toISOString(),
        lastUpdated: req.updatedAt.toISOString(),
        type: req.type,
        description: req.description,
      }))
    ].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    const response = {
      success: true,
      data: {
        applications: allItems,
        meta: {
          page,
          limit,
          total: allItems.length,
          totalPages: Math.ceil(allItems.length / limit),
          hasNext: page * limit < allItems.length,
          hasPrev: page > 1,
        },
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error("Get user applications error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch user applications",
    }, { status: 500 });
  }
}
