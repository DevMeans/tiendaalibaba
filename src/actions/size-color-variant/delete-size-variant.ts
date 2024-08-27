'use server'
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const deleteSizeProduct = async (idProduct: string, idSize: string) => {
  try {
    const resp = await prisma.productSizeVariant.deleteMany({
      where: { productId: idProduct, sizeId: idSize },
    });
    revalidatePath(`/admin/product/variant/${idProduct}`);
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};
