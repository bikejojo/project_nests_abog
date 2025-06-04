/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- CreateTable
CREATE TABLE "lawyersUnit" (
    "id" SERIAL NOT NULL,
    "lawyerId" INTEGER NOT NULL,
    "unityId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lawyersUnit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lawyersUnit_lawyerId_key" ON "lawyersUnit"("lawyerId");

-- CreateIndex
CREATE UNIQUE INDEX "lawyersUnit_unityId_key" ON "lawyersUnit"("unityId");

-- AddForeignKey
ALTER TABLE "lawyersUnit" ADD CONSTRAINT "lawyersUnit_unityId_fkey" FOREIGN KEY ("unityId") REFERENCES "Unity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lawyersUnit" ADD CONSTRAINT "lawyersUnit_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "Lawyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
