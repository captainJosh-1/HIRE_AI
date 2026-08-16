-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "recruiterProfileId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "location" TEXT,
    "industrry" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_recruiterProfileId_key" ON "Company"("recruiterProfileId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "RecruiterProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
