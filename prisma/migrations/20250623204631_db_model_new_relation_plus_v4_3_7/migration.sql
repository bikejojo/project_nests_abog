/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `PermissionsUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PermissionsUser_userId_key" ON "PermissionsUser"("userId");
