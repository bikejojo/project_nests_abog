/*
  Warnings:

  - You are about to drop the column `description` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Permissions` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "description",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Permissions" DROP COLUMN "description",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "description",
ADD COLUMN     "name" TEXT;
