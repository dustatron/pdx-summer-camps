-- AlterTable
ALTER TABLE "Camp" ADD COLUMN     "providerId" TEXT;

-- CreateTable
CREATE TABLE "Provider" (
    "id" TEXT NOT NULL,
    "created_at" TEXT,
    "ages" TEXT[],
    "pickUp" TEXT,
    "dropOff" TEXT,
    "title" TEXT NOT NULL,
    "contactName" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "address" TEXT NOT NULL,
    "place_id" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "phone" TEXT,
    "website" TEXT NOT NULL,
    "brief" TEXT,
    "description" TEXT,
    "Tags" TEXT[],

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderImage" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "asset_id" TEXT,
    "created_at" TEXT,
    "folder" TEXT,
    "original_filename" TEXT,
    "public_id" TEXT,

    CONSTRAINT "ProviderImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Camp" ADD CONSTRAINT "Camp_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderImage" ADD CONSTRAINT "ProviderImage_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
