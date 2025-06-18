/*
  Warnings:

  - You are about to drop the `Permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermissionsRol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rols` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPermissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PermissionsRol" DROP CONSTRAINT "PermissionsRol_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionsRol" DROP CONSTRAINT "PermissionsRol_rolId_fkey";

-- DropForeignKey
ALTER TABLE "UserPermissions" DROP CONSTRAINT "UserPermissions_permissionsId_fkey";

-- DropForeignKey
ALTER TABLE "UserPermissions" DROP CONSTRAINT "UserPermissions_userId_fkey";

-- DropTable
DROP TABLE "Permissions";

-- DropTable
DROP TABLE "PermissionsRol";

-- DropTable
DROP TABLE "Rols";

-- DropTable
DROP TABLE "UserPermissions";
