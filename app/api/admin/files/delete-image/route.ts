import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/app/lib/db";

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "me-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const s3Key = searchParams.get("key");
    const applicationId = searchParams.get("applicationId");

    if (!s3Key || !applicationId) {
      return NextResponse.json(
        { success: false, error: "S3 key and application ID are required" },
        { status: 400 }
      );
    }

    const projectRoot = process.env.S3_PROJECT_ROOT || "alpha-learning";
    const bucketName = process.env.S3_BUCKET_NAME || "mls-s3-storage";

    // Delete from both locations: utl folder and original location
    const studentImagesKey = s3Key; // Already in utl folder
    const originalKey = s3Key.replace("/utl/", "/");

    const deletePromises = [
      s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: studentImagesKey,
        })
      ),
      s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: originalKey,
        })
      ),
    ];

    await Promise.all(deletePromises);

    // Clear the image reference from the database
    try {
      await prisma.initialObservationForm.updateMany({
        where: {
          applicationId: applicationId,
        },
        data: {
          childObservationImage: null,
        },
      });
    } catch (dbError) {
      console.warn("Could not update database:", dbError);
      // Continue even if DB update fails
    }

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting image from S3:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete image",
      },
      { status: 500 }
    );
  }
}

