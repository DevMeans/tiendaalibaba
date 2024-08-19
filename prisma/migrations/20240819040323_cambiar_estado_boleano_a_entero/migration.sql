/*
  Warnings:

  - The `estado` column on the `Color` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `estado` column on the `Size` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Color" DROP COLUMN "estado",
ADD COLUMN     "estado" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Size" DROP COLUMN "estado",
ADD COLUMN     "estado" INTEGER NOT NULL DEFAULT 1;
