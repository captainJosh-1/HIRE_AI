-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'ACCEPTED');

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "jobSeekerProfileId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "coverLetter" TEXT,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_jobSeekerProfileId_jobId_key" ON "Application"("jobSeekerProfileId", "jobId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES "JobSeekerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
