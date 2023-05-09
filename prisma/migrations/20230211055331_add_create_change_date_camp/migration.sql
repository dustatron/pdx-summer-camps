/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Camp` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Camp" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
