import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";
import { z } from "zod";

const schema = z.object({
  id: z.string().min(1),
  status: z.enum(["submitted", "completed", "rejected"]),
  adminComment: z.string().optional(),
});

export async function POST(req: Request) {
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

    const body = await req.json();
    console.log("Received payload:", body);
    
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      console.log("Validation failed:", parsed.error.flatten().fieldErrors);
      return NextResponse.json({ success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const { id, status, adminComment } = parsed.data;
    console.log("Parsed data:", { id, status, adminComment });

    const updated = await prisma.application.update({
      where: { id },
      data: { 
        status, 
        adminComment: adminComment || (status === "rejected" ? "Rejected" : null)
      },
      select: { id: true, status: true, adminComment: true, updatedAt: true },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Admin update application status error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}


