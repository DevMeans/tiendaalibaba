'use server'
import prisma from "@/lib/prisma";
export const getProduct = async () => {
  try {
    const resp = await prisma.product.findMany({
      include: {
        images: true,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    return [];
  }
};