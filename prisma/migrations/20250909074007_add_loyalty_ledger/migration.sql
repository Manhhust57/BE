-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "target_type" DROP NOT NULL,
ALTER COLUMN "target_id" DROP NOT NULL;
