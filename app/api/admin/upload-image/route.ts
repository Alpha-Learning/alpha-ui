import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "me-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: NextRequest) {
  try {
    const { imageBase64, applicationId } = await request.json();

    if (!imageBase64 || !applicationId) {
      return NextResponse.json(
        { success: false, error: "Image and application ID are required" },
        { status: 400 }
      );
    }

    // Extract base64 data and determine file extension
    const base64Data = imageBase64.replace(/^data:image\/(\w+);base64,/, "");
    const matches = imageBase64.match(/^data:image\/(\w+);base64,/);
    const imageType = matches ? matches[1] : "jpeg";
    const extension = imageType === "jpeg" ? "jpg" : imageType;

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(base64Data, "base64");

    const projectRoot = process.env.S3_PROJECT_ROOT || "alpha-learning";
    const bucketName = process.env.S3_BUCKET_NAME || "mls-s3-storage";
    const region = process.env.AWS_REGION || "me-south-1";

    // Create S3 keys for both locations
    // Original location: alpha-learning/{applicationId}/{applicationId}.{extension}
    const s3Key = `${projectRoot}/${applicationId}/${applicationId}.${extension}`;
    
    // utl folder: alpha-learning/utl/{applicationId}/{applicationId}.{extension}
    const studentImagesKey = `${projectRoot}/utl/${applicationId}/${applicationId}.${extension}`;

    // Upload to both locations
    // Note: ACL removed as bucket doesn't support ACLs - use bucket policy for public access
    const uploadPromises = [
      s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: s3Key,
          Body: imageBuffer,
          ContentType: `image/${imageType}`,
        })
      ),
      s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: studentImagesKey,
          Body: imageBuffer,
          ContentType: `image/${imageType}`,
        })
      ),
    ];

    await Promise.all(uploadPromises);

    // Construct the S3 URL (using original location for database storage)
    const s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/${s3Key}`;

    return NextResponse.json({
      success: true,
      url: s3Url,
      key: s3Key,
      message: "Image uploaded successfully",
    });
  } catch (error: any) {
    console.error("Error uploading image to S3:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to upload image",
      },
      { status: 500 }
    );
  }
}

