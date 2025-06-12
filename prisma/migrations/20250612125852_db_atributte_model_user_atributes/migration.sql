/*
  Warnings:

  - You are about to drop the `judge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lawyer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `legal_entity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `natural_person` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "judge" DROP CONSTRAINT "judge_personId_fkey";

-- DropForeignKey
ALTER TABLE "lawyer" DROP CONSTRAINT "lawyer_personId_fkey";

-- DropForeignKey
ALTER TABLE "legal_entity" DROP CONSTRAINT "legal_entity_personId_fkey";

-- DropForeignKey
ALTER TABLE "natural_person" DROP CONSTRAINT "natural_person_personId_fkey";

-- DropTable
DROP TABLE "judge";

-- DropTable
DROP TABLE "lawyer";

-- DropTable
DROP TABLE "legal_entity";

-- DropTable
DROP TABLE "natural_person";

-- CreateTable
CREATE TABLE "Lawyer" (
    "id" SERIAL NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFiscal" BOOLEAN NOT NULL DEFAULT false,
    "isIntern" BOOLEAN NOT NULL DEFAULT true,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Lawyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Judge" (
    "id" SERIAL NOT NULL,
    "registratioDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isIntern" BOOLEAN NOT NULL DEFAULT true,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Judge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Natural_Person" (
    "id" SERIAL NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Natural_Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Legal_Entity" (
    "id" SERIAL NOT NULL,
    "NIT" TEXT,
    "companyName" TEXT,
    "address" TEXT,
    "registrationDate" TIMESTAMP(3) NOT NULL,
    "legalRepresentive" TEXT,
    "typeCompany" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Legal_Entity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lawyer_userId_key" ON "Lawyer"("userId");

-- AddForeignKey
ALTER TABLE "Lawyer" ADD CONSTRAINT "Lawyer_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lawyer" ADD CONSTRAINT "Lawyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Judge" ADD CONSTRAINT "Judge_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Natural_Person" ADD CONSTRAINT "Natural_Person_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Legal_Entity" ADD CONSTRAINT "Legal_Entity_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
