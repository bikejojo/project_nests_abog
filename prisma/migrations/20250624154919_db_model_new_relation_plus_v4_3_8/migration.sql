/*
  Warnings:

  - A unique constraint covering the columns `[userId,menuId]` on the table `MenuUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[moduleId,userId]` on the table `ModuleUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,permissionsId]` on the table `PermissionsUser` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `MenuUser` required. This step will fail if there are existing NULL values in that column.
  - Made the column `menuId` on table `MenuUser` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MenuUser" DROP CONSTRAINT "MenuUser_menuId_fkey";

-- DropForeignKey
ALTER TABLE "MenuUser" DROP CONSTRAINT "MenuUser_userId_fkey";

-- DropIndex
DROP INDEX "MenuUser_menuId_key";

-- DropIndex
DROP INDEX "MenuUser_userId_key";

-- DropIndex
DROP INDEX "ModuleUser_moduleId_key";

-- DropIndex
DROP INDEX "ModuleUser_userId_key";

-- DropIndex
DROP INDEX "PermissionsUser_userId_key";

-- AlterTable
ALTER TABLE "MenuUser" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "menuId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MenuUser_userId_menuId_key" ON "MenuUser"("userId", "menuId");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleUser_moduleId_userId_key" ON "ModuleUser"("moduleId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PermissionsUser_userId_permissionsId_key" ON "PermissionsUser"("userId", "permissionsId");

-- AddForeignKey
ALTER TABLE "MenuUser" ADD CONSTRAINT "MenuUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuUser" ADD CONSTRAINT "MenuUser_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
