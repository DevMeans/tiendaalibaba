"use server";
import prisma from "@/lib/prisma";
export const getProductSlug = (slug: string) => {
  try {
    const resp = prisma.product.findFirst({
      where: { slug },
      include: {
        images: true,
        ProductColorVariant: {
            include:{
                color:true
            }
        },
        ProductSizeVariant: {
          include: {
            size: true,
          },
        },
      },
    });
    return resp;
  } catch (error) {
    return null;
  }
};
