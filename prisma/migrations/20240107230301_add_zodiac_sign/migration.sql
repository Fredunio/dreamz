-- AlterTable
ALTER TABLE "User" ADD COLUMN     "zodiac" TEXT;

-- CreateTable
CREATE TABLE "ZodiacSign" (
    "name" TEXT NOT NULL,

    CONSTRAINT "ZodiacSign_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZodiacSign_name_key" ON "ZodiacSign"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_zodiac_fkey" FOREIGN KEY ("zodiac") REFERENCES "ZodiacSign"("name") ON DELETE SET NULL ON UPDATE CASCADE;
