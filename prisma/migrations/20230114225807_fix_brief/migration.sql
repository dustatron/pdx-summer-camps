/*
  Warnings:

  - You are about to drop the column `Brief` on the `Camp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Camp" DROP COLUMN "Brief",
ADD COLUMN     "brief" TEXT;
