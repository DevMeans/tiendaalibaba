/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `ProductColorVariant` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `ProductColorVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductColorVariant" DROP COLUMN "imgUrl",
ADD COLUMN     "imageUrl" TEXT NOT NULL;
