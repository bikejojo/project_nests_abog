-- CreateTable
CREATE TABLE "auth_log" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "message" TEXT,
    "action" TEXT,
    "origin" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,

    CONSTRAINT "auth_log_pkey" PRIMARY KEY ("id")
);
