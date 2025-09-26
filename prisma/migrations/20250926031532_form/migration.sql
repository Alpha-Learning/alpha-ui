-- AlterTable
ALTER TABLE "public"."screening_calls" ADD COLUMN     "loggedBy" TEXT,
ADD COLUMN     "loggedToSystemDate" TEXT,
ADD COLUMN     "overviewNotes" TEXT;
