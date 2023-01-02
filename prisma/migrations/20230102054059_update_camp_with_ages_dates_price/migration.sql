/*
  Warnings:

  - The `quadrant` column on the `Camp` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Camp" ADD COLUMN     "ages" TEXT[],
ADD COLUMN     "dateEnd" TIMESTAMP(3),
ADD COLUMN     "dateStart" TIMESTAMP(3),
ADD COLUMN     "price" DOUBLE PRECISION,
DROP COLUMN "quadrant",
ADD COLUMN     "quadrant" TEXT[];
