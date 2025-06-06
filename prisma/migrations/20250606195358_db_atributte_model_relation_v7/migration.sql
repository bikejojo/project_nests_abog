-- DropIndex
DROP INDEX "RolsUser_rolId_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "type" SET DEFAULT 0;
