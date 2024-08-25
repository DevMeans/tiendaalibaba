'use server'
import prisma from "@/lib/prisma";

export const listColorProduct = async (id: string) => {
  try {
    const listaColorProductdb = await prisma.productColorVariant.findMany({
      where: { productId: id },
      include:{
        color:true
      }
    });
    return listaColorProductdb;
  } catch (error) {
    console.log(error);
    return [];
  }
};
