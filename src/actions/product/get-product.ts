"use server";
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

export const getPublicProduct = async () => {
  try {
    const resp = await prisma.product.findMany({
      where: {
        estado: "ACTIVO",
      },
      include: {
        images: true,
        ProductSizeVariant: true,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    return [];
  }
};
