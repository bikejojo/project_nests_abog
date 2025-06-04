-- CreateTable
CREATE TABLE "UserPermissions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "permissionsId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPermissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPermissions" ADD CONSTRAINT "UserPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissions" ADD CONSTRAINT "UserPermissions_permissionsId_fkey" FOREIGN KEY ("permissionsId") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
