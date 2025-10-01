-- AlterTable
ALTER TABLE "public"."applications" ADD COLUMN     "isEighthFormCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFifthFormCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFirstFormCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFourthFormCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isNinthFormCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSecondFormCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSeventhFormCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSixthFormCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTenthFormCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isThirdFormCompleted" BOOLEAN NOT NULL DEFAULT false;
