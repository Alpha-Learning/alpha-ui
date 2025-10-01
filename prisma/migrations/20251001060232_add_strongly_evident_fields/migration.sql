-- AlterTable
ALTER TABLE "public"."peer_dynamic_observation" ADD COLUMN     "bodilyKinestheticStronglyEvident" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "existentialStronglyEvident" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "interpersonalStronglyEvident" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "intrapersonalStronglyEvident" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "linguisticStronglyEvident" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logicalMathematicalStronglyEvident" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "musicalStronglyEvident" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "naturalisticStronglyEvident" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "spatialStronglyEvident" BOOLEAN NOT NULL DEFAULT false;
