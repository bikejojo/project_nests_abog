-- CreateTable
CREATE TABLE "Rols" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rols_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolsUser" (
    "id" SERIAL NOT NULL,
    "rolId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RolsUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionsRol" (
    "id" SERIAL NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "rolId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PermissionsRol_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RolsUser" ADD CONSTRAINT "RolsUser_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rols"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolsUser" ADD CONSTRAINT "RolsUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsRol" ADD CONSTRAINT "PermissionsRol_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsRol" ADD CONSTRAINT "PermissionsRol_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rols"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
