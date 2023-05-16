/*
  Warnings:

  - You are about to drop the column `Tags` on the `Provider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "Tags",
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "contact" DROP NOT NULL;
