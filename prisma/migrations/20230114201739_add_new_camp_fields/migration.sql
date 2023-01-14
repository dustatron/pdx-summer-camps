-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'FULL', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Camp" ADD COLUMN     "Brief" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'UNKNOWN';
