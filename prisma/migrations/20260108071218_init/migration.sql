-- AlterTable
ALTER TABLE "screening_calls" ALTER COLUMN "comprehensiveQuestionnaires" DROP NOT NULL,
ALTER COLUMN "comprehensiveQuestionnaires" DROP DEFAULT,
ALTER COLUMN "comprehensiveQuestionnaires" SET DATA TYPE TEXT;
