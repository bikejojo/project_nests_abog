/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `Branch_Office` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `Rols` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Branch_Office_description_key" ON "Branch_Office"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Rols_description_key" ON "Rols"("description");
