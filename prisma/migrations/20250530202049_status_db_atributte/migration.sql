/*
  Warnings:

  - Added the required column `status` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clients" ADD COLUMN     "status" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "status" INTEGER NOT NULL;
