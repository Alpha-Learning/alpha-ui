/*
  Warnings:

  - The `additionalNotes` column on the `screening_calls` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "screening_calls" DROP COLUMN "additionalNotes",
ADD COLUMN     "additionalNotes" TIMESTAMP(3);
