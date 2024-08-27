"use server";
import prisma from "@/lib/prisma";
export const listSizeProduct = async (id: string) => {
  try {
    const resp = await prisma.productSizeVariant.findMany({
      where: { productId: id },
      include:{
        size:true
      }
    });
    console.log(resp)
    return resp;
  } catch (error) {
    console.log(error);
    return [];
  }
};
