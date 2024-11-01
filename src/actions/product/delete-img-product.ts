"use server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");
export const deleteProductImage = async (
  imageId: string,
  imageUrl: string,
  productId: string
) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      error: "No se pueden borrar imagenes del fs",
    };
  }
  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";
  try {
    await cloudinary.uploader.destroy(imageName);
    const deleteImage = await prisma.productImage.delete({
      where: { id: imageId },
    });
    revalidatePath(`/admin/product/${productId}`);
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
