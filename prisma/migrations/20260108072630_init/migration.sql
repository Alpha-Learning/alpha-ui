-- AlterTable
ALTER TABLE "screening_calls" ALTER COLUMN "guidebookInfo" DROP NOT NULL,
ALTER COLUMN "guidebookInfo" DROP DEFAULT,
ALTER COLUMN "guidebookInfo" SET DATA TYPE TEXT;
