/*
  Warnings:

  - The `estado` column on the `Color` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `estado` column on the `Size` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TypeEstado" AS ENUM ('ACTIVO', 'INACTIVO');

-- AlterTable
ALTER TABLE "Color" DROP COLUMN "estado",
ADD COLUMN     "estado" "TypeEstado" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "Size" DROP COLUMN "estado",
ADD COLUMN     "estado" "TypeEstado" NOT NULL DEFAULT 'ACTIVO';
