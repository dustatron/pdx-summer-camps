/*
  Warnings:

  - Added the required column `campName` to the `CampAuthor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CampAuthor" ADD COLUMN     "campName" TEXT NOT NULL;
