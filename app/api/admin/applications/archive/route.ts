import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.slice(7);
    const payload = verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const q = (searchParams.get("q") || "").trim();

    const where: any = {
      status: "rejected", // Only rejected applications
    };

    if (q) {
      const query = q.toLowerCase();
      where.OR = [
        { parentFullName: { contains: query, mode: 'insensitive' } },
        { parentEmail: { contains: query, mode: 'insensitive' } },
        { childFullName: { contains: query, mode: 'insensitive' } },
        { childSchoolYear: { contains: query, mode: 'insensitive' } },
      ];
    }

    const [applications, totalCount] = await Promise.all([
      prisma.application.findMany({
        where,
        orderBy: { updatedAt: "desc" }, // Order by rejection date (updatedAt when status changed to rejected)
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.application.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        applications,
        meta: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit),
          hasNext: page * limit < totalCount,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Admin list archived applications error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}