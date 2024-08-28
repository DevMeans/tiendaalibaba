"use server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProduct = async (productId: string) => {
  try {
    const resp = await prisma.$transaction(async (prisma) => {
      // Eliminar las imágenes asociadas al producto
      await deleteProductImage(productId);
      await prisma.productImage.deleteMany({
        where: {
          productId: productId,
        },
      });
      // Eliminar las relaciones en ColorForProduct
      await prisma.productColorVariant.deleteMany({
        where: {
          productId: productId,
        },
      });
      await prisma.productSizeVariant.deleteMany({
        where: {
          productId: productId,
        },
      });
      await prisma.productTag.deleteMany({
        where: {
          productId: productId,
        },
      });
      // Eliminar el producto
      await prisma.product.delete({
        where: {
          id: productId,
        },
      });
    });
    revalidatePath('/admin/product')
    return { success: true, resp };
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message };
  }
};

const deleteProductImage = async (productId: string) => {
  const product = await prisma.productImage.findMany({
    where: {
      productId: productId,
    },
  });
  if (!product) {
    return {
      ok: false,
    };
  }
  product.map((item) => {
    deleteImg(item.imageUrl);
  });
};
const deleteImg = async (imageUrl: string) => {
  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";
  try {
    await cloudinary.uploader.destroy(imageName);
    return {
      ok: true,
      msg: "Imagen eliminada",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "No se pudo eliminar la imagen",
    };
  }
};
