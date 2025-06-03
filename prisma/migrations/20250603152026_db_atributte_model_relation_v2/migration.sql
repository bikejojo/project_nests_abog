/*
  Warnings:

  - You are about to drop the `departaments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `external_personal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `personal_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subcidiary_office` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "departaments";

-- DropTable
DROP TABLE "external_personal";

-- DropTable
DROP TABLE "personal_type";

-- DropTable
DROP TABLE "subcidiary_office";

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unityDepartaments" (
    "id" SERIAL NOT NULL,
    "departamentsId" INTEGER NOT NULL,
    "unityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unityDepartaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departaments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Departaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartamentsSubOffice" (
    "id" SERIAL NOT NULL,
    "departamentsId" INTEGER NOT NULL,
    "subcidiaryOfficeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DepartamentsSubOffice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcidiary_office" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "openingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subcidiary_office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "lawyerId" INTEGER NOT NULL,
    "sectorId" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personal_type" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Personal_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "External_personal" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "type" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "External_personal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "unityDepartaments_departamentsId_key" ON "unityDepartaments"("departamentsId");

-- CreateIndex
CREATE UNIQUE INDEX "unityDepartaments_unityId_key" ON "unityDepartaments"("unityId");

-- CreateIndex
CREATE UNIQUE INDEX "DepartamentsSubOffice_departamentsId_key" ON "DepartamentsSubOffice"("departamentsId");

-- CreateIndex
CREATE UNIQUE INDEX "DepartamentsSubOffice_subcidiaryOfficeId_key" ON "DepartamentsSubOffice"("subcidiaryOfficeId");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_lawyerId_key" ON "Manager"("lawyerId");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unityDepartaments" ADD CONSTRAINT "unityDepartaments_unityId_fkey" FOREIGN KEY ("unityId") REFERENCES "Unity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unityDepartaments" ADD CONSTRAINT "unityDepartaments_departamentsId_fkey" FOREIGN KEY ("departamentsId") REFERENCES "Departaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartamentsSubOffice" ADD CONSTRAINT "DepartamentsSubOffice_departamentsId_fkey" FOREIGN KEY ("departamentsId") REFERENCES "Departaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartamentsSubOffice" ADD CONSTRAINT "DepartamentsSubOffice_subcidiaryOfficeId_fkey" FOREIGN KEY ("subcidiaryOfficeId") REFERENCES "Subcidiary_office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "Lawyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
