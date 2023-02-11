/*
  Warnings:

  - You are about to drop the column `campName` on the `ProviderAuthor` table. All the data in the column will be lost.
  - Added the required column `authorName` to the `ProviderAuthor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProviderAuthor" DROP COLUMN "campName",
ADD COLUMN     "authorName" TEXT NOT NULL;
