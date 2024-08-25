/*
  Warnings:

  - Made the column `colorId` on table `ProductColorVariant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ProductColorVariant" DROP CONSTRAINT "ProductColorVariant_colorId_fkey";

-- AlterTable
ALTER TABLE "ProductColorVariant" ALTER COLUMN "colorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductColorVariant" ADD CONSTRAINT "ProductColorVariant_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
