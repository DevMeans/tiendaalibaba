"use server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export interface Subircolor {
  productId: string;
  colorId: string;
  image: string;
}

export const createProductColor = async (productColor: Subircolor) => {
  try {
    const existe = await prisma.productColorVariant.findFirst({
      where: {
        productId: productColor.productId,
        colorId: productColor.colorId,
      },
    });
    if (existe) {
      return { ok: false };
    }
    // Subir la imagen a Cloudinary y obtener la URL
    const imageUrl = await uploadImagenes(productColor.image);
    if (!imageUrl) {
      throw new Error("Error al subir la imagen a Cloudinary");
    }
    // Crear el registro en la base de datos con la URL de la imagen
    const createColorProductImg = await prisma.productColorVariant.create({
      data: {
        productId: productColor.productId,
        colorId: productColor.colorId,
        imageUrl: imageUrl,
      },
    });
    revalidatePath(`/admin/product/variant/${createColorProductImg.productId}`);
    return createColorProductImg;
  } catch (error) {
    console.error("Error creando el color del producto:", error);
    throw error;
  }
};
const uploadImagenes = async (image: string) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(image);
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Error subiendo la imagen a Cloudinary:", error);
    return null;
  }
};
