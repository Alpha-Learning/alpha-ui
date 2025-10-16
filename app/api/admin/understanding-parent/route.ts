import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { updateApplicationStatus } from "@/app/utils/applicationStatus";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      applicationId,
      childName,
      age,
      date,
      examiner,
      occupation,
      grid,
      additionalNotes,
    } = body;

    if (!applicationId) {
      return NextResponse.json({ success: false, error: "Application ID is required" }, { status: 400 });
    }

    const existing = await prisma.understandingParent.findUnique({ where: { applicationId } });
    const payload = {
      childName,
      age,
      date,
      examiner,
      occupation,
      grid,
      additionalNotes,
    } as any;

    const record = existing
      ? await prisma.understandingParent.update({ where: { applicationId }, data: payload })
      : await prisma.understandingParent.create({ data: { applicationId, ...payload } });

    // Mark Understanding Parent as completed and advance stage to 8
    await prisma.application.update({ 
      where: { id: applicationId }, 
      data: { 
        currentStage: 8,
        isEighthFormCompleted: true
      } 
    });

    // Update application status based on all form completions
    await updateApplicationStatus(applicationId, prisma);

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error saving Understanding Parent:", error);
    return NextResponse.json({ success: false, error: "Failed to save form" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get("applicationId");
    if (!applicationId) {
      return NextResponse.json({ success: false, error: "Application ID is required" }, { status: 400 });
    }
    const record = await prisma.understandingParent.findUnique({ where: { applicationId } });
    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error fetching Understanding Parent:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch form" }, { status: 500 });
  }
}


