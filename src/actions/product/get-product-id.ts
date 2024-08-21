import prisma from "@/lib/prisma";
import { ProductImage } from "../../interfaces/product-image.interface";
export const getProductID = async (id: string) => {
  try {
    const productid = await prisma.product.findFirst({
      where: { id },
      include: {
        images: true,
        tags: true,
      },
    });
    return productid;
  } catch (error) {
    console.log(error);
    return {};
  }
};
