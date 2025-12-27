import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get("applicationId");

    if (!applicationId) {
      return NextResponse.json(
        { success: false, error: "Application ID is required" },
        { status: 400 }
      );
    }

    // Clear the image reference from the database (base64 images are stored directly in DB)
    try {
      await prisma.initialObservationForm.updateMany({
        where: {
          applicationId: applicationId,
        },
        data: {
          childImage: null,
        },
      });
    } catch (dbError) {
      console.error("Could not update database:", dbError);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to delete image from database",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete image",
      },
      { status: 500 }
    );
  }
}

