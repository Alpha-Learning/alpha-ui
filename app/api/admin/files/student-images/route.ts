import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command, HeadObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/app/lib/db";

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "me-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function GET(request: NextRequest) {
  try {
    const projectRoot = process.env.S3_PROJECT_ROOT || "alpha-learning";
    const bucketName = process.env.S3_BUCKET_NAME || "mls-s3-storage";
    const region = process.env.AWS_REGION || "me-south-1";
    const prefix = `${projectRoot}/utl/`;

    // List all objects in the utl folder
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
    });

    const response = await s3Client.send(command);
    const objects = response.Contents || [];

    // Filter for image files and get metadata
    const imageFiles = await Promise.all(
      objects
        .filter((obj) => {
          const key = obj.Key || "";
          return (
            key.endsWith(".jpg") ||
            key.endsWith(".jpeg") ||
            key.endsWith(".png") ||
            key.endsWith(".gif") ||
            key.endsWith(".webp")
          );
        })
        .map(async (obj) => {
          const key = obj.Key || "";
          
          // Extract application ID from path: alpha-learning/utl/{applicationId}/{applicationId}.jpg
          const parts = key.split("/");
          const applicationId = parts.length >= 3 ? parts[parts.length - 2] : "unknown";

          // Get object metadata for size
          let size = obj.Size;
          let uploadedAt = obj.LastModified?.toISOString();

          try {
            const headCommand = new HeadObjectCommand({
              Bucket: bucketName,
              Key: key,
            });
            const headResponse = await s3Client.send(headCommand);
            size = headResponse.ContentLength || size;
            uploadedAt = headResponse.LastModified?.toISOString() || uploadedAt;
          } catch (error) {
            // If head command fails, use the data from list
            console.warn(`Could not get metadata for ${key}:`, error);
          }

          // Construct the S3 URL
          // Note: S3 URLs work with the key as-is, spaces are handled by S3
          const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

          return {
            key,
            url,
            applicationId,
            size,
            uploadedAt,
          };
        })
    );

    // Get unique application IDs
    const applicationIds = [...new Set(imageFiles.map(img => img.applicationId))];
    
    // Fetch full application details from database
    const applications = await prisma.application.findMany({
      where: {
        id: {
          in: applicationIds,
        },
      },
      select: {
        id: true,
        childFullName: true,
        parentFullName: true,
        parentEmail: true,
        parentPhone: true,
      },
    });

    // Create a map of application ID to application details
    const applicationMap = new Map(
      applications.map(app => [app.id, app])
    );

    // Add application details to image files
    const imageFilesWithDetails = imageFiles.map(img => {
      const app = applicationMap.get(img.applicationId);
      return {
        ...img,
        childName: app?.childFullName || "Unknown",
        parentName: app?.parentFullName || "Unknown",
        parentEmail: app?.parentEmail || "N/A",
        parentPhone: app?.parentPhone || "N/A",
      };
    });

    // Sort by upload date (newest first)
    imageFilesWithDetails.sort((a, b) => {
      const dateA = a.uploadedAt ? new Date(a.uploadedAt).getTime() : 0;
      const dateB = b.uploadedAt ? new Date(b.uploadedAt).getTime() : 0;
      return dateB - dateA;
    });

    return NextResponse.json({
      success: true,
      data: imageFilesWithDetails,
    });
  } catch (error: any) {
    console.error("Error listing student images from S3:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to list images",
        data: [],
      },
      { status: 500 }
    );
  }
}

