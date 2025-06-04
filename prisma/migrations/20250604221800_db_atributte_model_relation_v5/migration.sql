/*
  Warnings:

  - A unique constraint covering the columns `[rolId]` on the table `RolsUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RolsUser_rolId_key" ON "RolsUser"("rolId");
