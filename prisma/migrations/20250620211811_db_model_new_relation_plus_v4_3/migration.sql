/*
  Warnings:

  - You are about to drop the column `description` on the `Branch_Office` table. All the data in the column will be lost.
  - You are about to drop the `Departaments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DepartamentsSubOffice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subcidiary_office` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Unity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lawyersUnit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unityDepartaments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DepartamentsSubOffice" DROP CONSTRAINT "DepartamentsSubOffice_departamentsId_fkey";

-- DropForeignKey
ALTER TABLE "DepartamentsSubOffice" DROP CONSTRAINT "DepartamentsSubOffice_subcidiaryOfficeId_fkey";

-- DropForeignKey
ALTER TABLE "lawyersUnit" DROP CONSTRAINT "lawyersUnit_unityId_fkey";

-- DropForeignKey
ALTER TABLE "unityDepartaments" DROP CONSTRAINT "unityDepartaments_departamentsId_fkey";

-- DropForeignKey
ALTER TABLE "unityDepartaments" DROP CONSTRAINT "unityDepartaments_unityId_fkey";

-- DropIndex
DROP INDEX "Branch_Office_description_key";

-- AlterTable
ALTER TABLE "Branch_Office" DROP COLUMN "description",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "cityId" INTEGER,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "Departaments";

-- DropTable
DROP TABLE "DepartamentsSubOffice";

-- DropTable
DROP TABLE "Subcidiary_office";

-- DropTable
DROP TABLE "Unity";

-- DropTable
DROP TABLE "lawyersUnit";

-- DropTable
DROP TABLE "unityDepartaments";

-- AddForeignKey
ALTER TABLE "Branch_Office" ADD CONSTRAINT "Branch_Office_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
