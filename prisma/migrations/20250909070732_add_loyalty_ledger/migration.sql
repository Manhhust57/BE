/*
  Warnings:

  - You are about to drop the column `points` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `PointLedger` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PointLedger" DROP CONSTRAINT "PointLedger_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "points";

-- DropTable
DROP TABLE "PointLedger";

-- DropEnum
DROP TYPE "PointSource";

-- DropEnum
DROP TYPE "PointTxnStatus";

-- DropEnum
DROP TYPE "PointTxnType";
