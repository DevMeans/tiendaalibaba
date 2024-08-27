"use server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");
export const deleteColorProduct = async (
  productId: string,
  colorId: string,
  imageUrl: string
) => {
  try {
    const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";
    const resp = await prisma.productColorVariant.deleteMany({
      where: {
        productId,
        colorId,
      },
    });
    if (resp) {
      await cloudinary.uploader.destroy(imageName);
    }
    revalidatePath(`/admin/product/variant/${productId}`);
  } catch (error) {
    console.log(error);
  }
};
