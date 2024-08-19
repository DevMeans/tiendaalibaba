-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "estado" "TypeEstado" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "esatdo" "TypeEstado" NOT NULL DEFAULT 'ACTIVO';
