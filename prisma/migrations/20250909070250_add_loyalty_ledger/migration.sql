-- CreateEnum
CREATE TYPE "PointTxnType" AS ENUM ('EARN', 'REDEEM', 'ADJUST');

-- CreateEnum
CREATE TYPE "PointTxnStatus" AS ENUM ('PENDING', 'POSTED', 'REVERSED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PointSource" AS ENUM ('BOOKING', 'PROMO', 'MANUAL');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "PointLedger" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "delta" INTEGER NOT NULL,
    "type" "PointTxnType" NOT NULL,
    "status" "PointTxnStatus" NOT NULL DEFAULT 'POSTED',
    "source" "PointSource",
    "sourceId" INTEGER,
    "reason" TEXT,
    "expiresAt" TIMESTAMP(3),
    "correlationId" TEXT,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointLedger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PointLedger_correlationId_key" ON "PointLedger"("correlationId");

-- CreateIndex
CREATE INDEX "PointLedger_userId_createdAt_idx" ON "PointLedger"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "PointLedger" ADD CONSTRAINT "PointLedger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
