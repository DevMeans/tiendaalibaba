/*
  Warnings:

  - Added the required column `productColorVariantId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productSizeVariantId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "productColorVariantId" TEXT NOT NULL,
ADD COLUMN     "productSizeVariantId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productColorVariantId_fkey" FOREIGN KEY ("productColorVariantId") REFERENCES "ProductColorVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productSizeVariantId_fkey" FOREIGN KEY ("productSizeVariantId") REFERENCES "ProductSizeVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
