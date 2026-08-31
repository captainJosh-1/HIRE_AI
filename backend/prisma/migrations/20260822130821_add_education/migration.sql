-- CreateEnum
CREATE TYPE "TypeOfEducation" AS ENUM ('FULL_TIME', 'PART_TIME', 'ONLINE');

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "jobSeekerProfileId" INTEGER NOT NULL,
    "degree" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "type" "TypeOfEducation" NOT NULL DEFAULT 'FULL_TIME',
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "grade" TEXT,
    "currentlyStudying" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES "JobSeekerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
