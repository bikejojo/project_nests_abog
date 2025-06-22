/*
  Warnings:

  - You are about to drop the `RolsUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RolsUser" DROP CONSTRAINT "RolsUser_rolId_fkey";

-- DropForeignKey
ALTER TABLE "RolsUser" DROP CONSTRAINT "RolsUser_userId_fkey";

-- DropTable
DROP TABLE "RolsUser";
