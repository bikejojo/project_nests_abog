/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "City_description_key" ON "City"("description");
