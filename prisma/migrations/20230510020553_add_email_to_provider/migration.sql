/*
  Warnings:

  - Added the required column `contact` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "contact" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL;
