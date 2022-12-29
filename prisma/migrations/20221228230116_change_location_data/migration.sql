/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lat` to the `Camp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Camp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_campId_fkey";

-- AlterTable
ALTER TABLE "Camp" ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Location";
