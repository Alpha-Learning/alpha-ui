# Image Storage - Code Lines

## Frontend: ImageUpload Component
**File:** `app/components/ImageUpload.tsx`

- Line 45: `const base64String = reader.result as string;`
- Line 47: `onChange(base64String);`
- Line 49: `reader.readAsDataURL(file);`
- Line 90: `const base64Image = canvas.toDataURL("image/jpeg", 0.8);`
- Line 92: `onChange(base64Image);`

## API: Upload Endpoint
**File:** `app/api/admin/upload-image/route.ts`

- Line 15: `const { imageBase64, applicationId } = await request.json();`
- Line 25: `const base64Data = imageBase64.replace(/^data:image\/(\w+);base64,/, "");`
- Line 31: `const imageBuffer = Buffer.from(base64Data, "base64");`
- Line 39: `const s3Key = \`${projectRoot}/${applicationId}/${applicationId}.${extension}\`;`
- Line 42: `const studentImagesKey = \`${projectRoot}/utl/${applicationId}/${applicationId}.${extension}\`;`
- Lines 46-63: S3 upload to two locations
- Line 68: `const s3Url = \`https://${bucketName}.s3.${region}.amazonaws.com/${s3Key}\`;`

## API: List Images
**File:** `app/api/admin/files/student-images/route.ts`

- Line 69: `const url = \`https://${bucketName}.s3.${region}.amazonaws.com/${key}\`;`

## UI: Display Images
**File:** `app/admin/files/page.tsx`

- Line 157: `<img src={image.url} ... />`

## Database Schema
**File:** `prisma/schema.prisma`

- No image fields exist

## S3 Storage Paths

- Primary: `alpha-learning/{applicationId}/{applicationId}.jpg`
- UTL: `alpha-learning/utl/{applicationId}/{applicationId}.jpg`
