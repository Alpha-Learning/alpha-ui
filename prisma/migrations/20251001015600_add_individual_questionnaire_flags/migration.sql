-- AlterTable
ALTER TABLE "public"."applications" ADD COLUMN     "isCaregiverFormCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isOutsiderFormCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isParentGuardianFormCompleted" BOOLEAN NOT NULL DEFAULT false;
