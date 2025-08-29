/*
  Warnings:

  - You are about to drop the column `firstName` on the `Persona` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Persona` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Persona" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "fullName" TEXT;

-- CreateIndex
CREATE INDEX "Persona_userId_idx" ON "Persona"("userId");

-- CreateIndex
CREATE INDEX "Persona_id_idx" ON "Persona"("id");

-- CreateIndex
CREATE INDEX "Persona_fullName_idx" ON "Persona"("fullName");

-- CreateIndex
CREATE INDEX "Persona_status_idx" ON "Persona"("status");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");
