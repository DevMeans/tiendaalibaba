'use server'
import { ProductSizeVariant } from "@/interfaces/product.size.variant";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const createSizeProduct = async (
  productid: string,
  size: string,
  price: number
) => {
  try {
    
    const resp = await prisma.productSizeVariant.create({
      data: {
        productId: productid,
        sizeId: size,
        price: price,
      },
    });
    revalidatePath(`/admin/product/variant/${resp.productId}`);
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};
