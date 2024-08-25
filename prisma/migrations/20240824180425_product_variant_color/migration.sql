/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `ProductColorVariant` table. All the data in the column will be lost.
  - Added the required column `imgUrl` to the `ProductColorVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductColorVariant" DROP COLUMN "imageUrl",
ADD COLUMN     "imgUrl" TEXT NOT NULL;
