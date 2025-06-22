/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_userId_fkey";

-- AlterTable
ALTER TABLE "Lawyer" ADD COLUMN     "branchOfficeId" INTEGER;

-- DropTable
DROP TABLE "Admin";

-- CreateTable
CREATE TABLE "Branch_Office" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Branch_Office_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lawyer" ADD CONSTRAINT "Lawyer_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "Branch_Office"("id") ON DELETE SET NULL ON UPDATE CASCADE;
