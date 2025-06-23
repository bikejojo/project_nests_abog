-- CreateTable
CREATE TABLE "ModuleUser" (
    "id" SERIAL NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "moduleId" INTEGER,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModuleUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModuleUser_moduleId_key" ON "ModuleUser"("moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleUser_userId_key" ON "ModuleUser"("userId");

-- AddForeignKey
ALTER TABLE "ModuleUser" ADD CONSTRAINT "ModuleUser_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleUser" ADD CONSTRAINT "ModuleUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
