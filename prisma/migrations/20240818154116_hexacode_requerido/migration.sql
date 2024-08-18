/*
  Warnings:

  - Made the column `hexCode` on table `Color` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Color" ALTER COLUMN "hexCode" SET NOT NULL;
