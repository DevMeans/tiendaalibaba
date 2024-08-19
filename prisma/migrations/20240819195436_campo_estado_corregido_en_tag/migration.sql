/*
  Warnings:

  - You are about to drop the column `esatdo` on the `Tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "esatdo",
ADD COLUMN     "estado" "TypeEstado" NOT NULL DEFAULT 'ACTIVO';
