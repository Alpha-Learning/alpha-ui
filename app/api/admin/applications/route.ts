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
    const status = searchParams.get("status") || undefined;
    const paid = searchParams.get("paid");
    const q = (searchParams.get("q") || "").trim();

    const where: any = {};
    if (status) where.status = status;
    if (paid === 'true') where.isPaid = true;
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
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.application.count({ where }),
    ]);
    const total = await prisma.application.count();

    return NextResponse.json({
      success: true,

      data: {
        applications,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Admin list applications error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}


