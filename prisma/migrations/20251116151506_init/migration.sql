/*
  Warnings:

  - You are about to drop the column `isTenthFormCompleted` on the `applications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "applications" DROP COLUMN "isTenthFormCompleted",
ALTER COLUMN "totalStages" SET DEFAULT 9;
