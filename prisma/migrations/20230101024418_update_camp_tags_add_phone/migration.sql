/*
  Warnings:

  - The `tags` column on the `Camp` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Camp" ADD COLUMN     "phone" TEXT,
DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];
