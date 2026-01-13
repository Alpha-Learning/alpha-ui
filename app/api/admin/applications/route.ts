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
    const sortBy = searchParams.get("sortBy") || (paid === 'true' ? "paidAt" : "createdAt");
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const dateFilter = searchParams.get("dateFilter");

    const where: any = {};
    if (status !== "rejected" && status !== "approved") {
      where.status = { notIn: ["rejected", "approved"] };
    }
    if (status) where.status = status;
    if (paid === 'true') where.isPaid = true;
    if (paid === 'false') where.isPaid = false;
    
    // Single date filter - filter payments done on that specific date
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      const startOfDay = new Date(filterDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(filterDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      where.paidAt = {
        gte: startOfDay.toISOString(),
        lte: endOfDay.toISOString(),
      };
    }
    
    // Search filter - includes amount
    if (q) {
      const query = q.toLowerCase();
      const searchConditions: any[] = [
        { parentFullName: { contains: query, mode: 'insensitive' } },
        { parentEmail: { contains: query, mode: 'insensitive' } },
        { childFullName: { contains: query, mode: 'insensitive' } },
        { childSchoolYear: { contains: query, mode: 'insensitive' } },
      ];
      
      // Check if query is a number (for amount search)
      const amountValue = parseFloat(query);
      if (!isNaN(amountValue)) {
        searchConditions.push({ paymentAmount: amountValue });
      }
      
      where.OR = searchConditions;
    }

    // Map sortBy to Prisma field names
    const sortFieldMap: Record<string, string> = {
      parentFullName: "parentFullName",
      parentEmail: "parentEmail",
      childFullName: "childFullName",
      status: "status",
      paymentAmount: "paymentAmount",
      paidAt: "paidAt",
      createdAt: "createdAt",
    };

    const orderByField = sortFieldMap[sortBy] || (paid === 'true' ? "paidAt" : "createdAt");
    const orderBy = {
      [orderByField]: sortOrder === "asc" ? "asc" : "desc",
    };

    const [applications, totalCount] = await Promise.all([
      prisma.application.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.application.count({ where }),
    ]);
    const total = totalCount;

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