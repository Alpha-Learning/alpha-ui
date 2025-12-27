import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command, HeadObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/app/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Validate required environment variables
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const projectRoot = process.env.S3_PROJECT_ROOT;
    const bucketName = process.env.S3_BUCKET_NAME;

    if (!region) {
      return NextResponse.json({ 
        success: false, 
        message: "AWS_REGION environment variable is not set. Please configure it in your .env file." 
      }, { status: 500 });
    }

    if (!accessKeyId || !secretAccessKey) {
      return NextResponse.json({ 
        success: false, 
        message: "AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables are not set. Please configure them in your .env file." 
      }, { status: 500 });
    }

    if (!bucketName) {
      return NextResponse.json({ 
        success: false, 
        message: "S3_BUCKET_NAME environment variable is not set. Please configure it in your .env file." 
      }, { status: 500 });
    }

    if (!projectRoot) {
      return NextResponse.json({ 
        success: false, 
        message: "S3_PROJECT_ROOT environment variable is not set. Please configure it in your .env file." 
      }, { status: 500 });
    }

    // Initialize S3 client
    const s3Client = new S3Client({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });

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
          
          // Extract application ID from path: {projectRoot}/utl/{applicationId}/{applicationId}.jpg
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

