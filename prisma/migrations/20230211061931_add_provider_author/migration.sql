-- CreateTable
CREATE TABLE "ProviderAuthor" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "providerName" TEXT NOT NULL,
    "campName" TEXT NOT NULL,

    CONSTRAINT "ProviderAuthor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProviderAuthor" ADD CONSTRAINT "ProviderAuthor_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderAuthor" ADD CONSTRAINT "ProviderAuthor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
