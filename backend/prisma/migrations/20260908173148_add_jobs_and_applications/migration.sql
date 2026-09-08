/*
  Warnings:

  - You are about to drop the column `experienceLevel` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `Job` table. All the data in the column will be lost.
  - Added the required column `employmentType` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('OPEN', 'CLOSE');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "experienceLevel",
DROP COLUMN "salary",
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "requirements" TEXT,
ADD COLUMN     "responsibilities" TEXT,
ADD COLUMN     "salaryMax" INTEGER,
ADD COLUMN     "salaryMin" INTEGER,
ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'OPEN',
DROP COLUMN "employmentType",
ADD COLUMN     "employmentType" "EmploymentType" NOT NULL;
