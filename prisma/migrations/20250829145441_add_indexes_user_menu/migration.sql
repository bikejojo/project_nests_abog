-- AlterTable
ALTER TABLE "Branch_Office" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 1;

-- CreateIndex
CREATE INDEX "MenuPermissions_menuId_idx" ON "MenuPermissions"("menuId");

-- CreateIndex
CREATE INDEX "MenuPermissions_permissionsId_idx" ON "MenuPermissions"("permissionsId");

-- CreateIndex
CREATE INDEX "MenuUser_userId_idx" ON "MenuUser"("userId");

-- CreateIndex
CREATE INDEX "MenuUser_menuId_idx" ON "MenuUser"("menuId");

-- CreateIndex
CREATE INDEX "ModuleMenu_moduleId_idx" ON "ModuleMenu"("moduleId");

-- CreateIndex
CREATE INDEX "ModuleMenu_menuId_idx" ON "ModuleMenu"("menuId");

-- CreateIndex
CREATE INDEX "ModuleUser_userId_idx" ON "ModuleUser"("userId");

-- CreateIndex
CREATE INDEX "ModuleUser_moduleId_idx" ON "ModuleUser"("moduleId");

-- CreateIndex
CREATE INDEX "PermissionsUser_userId_idx" ON "PermissionsUser"("userId");

-- CreateIndex
CREATE INDEX "PermissionsUser_permissionsId_idx" ON "PermissionsUser"("permissionsId");
