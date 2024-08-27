/*
  Warnings:

  - You are about to drop the column `productVariantId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `WarehouseTransfer` table. All the data in the column will be lost.
  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_colorId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "WarehouseTransfer" DROP CONSTRAINT "WarehouseTransfer_productVariantId_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "productVariantId";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "productVariantId";

-- AlterTable
ALTER TABLE "WarehouseTransfer" DROP COLUMN "productVariantId";

-- DropTable
DROP TABLE "ProductVariant";

-- CreateTable
CREATE TABLE "ProductSizeVariant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sizeId" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ProductSizeVariant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductSizeVariant" ADD CONSTRAINT "ProductSizeVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSizeVariant" ADD CONSTRAINT "ProductSizeVariant_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
