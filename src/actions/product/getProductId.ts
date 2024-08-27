import prisma from "@/lib/prisma";
import { ProductImage } from "../../interfaces/product-image.interface";
import { Prisma } from "@prisma/client";
export const getProductIDV2 = async (id: string) => {
  try {
    const productid = await prisma.product.findFirst({
      where: { id },
      include: {
        images: true,
      },
    });
    return {
      ok: true,
      product: productid,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2015") {
        console.log(error);
        return {
          ok: false,
          msg: `No existe registro con el idcolor '${id}'.`,
        };
      }
    }

    return {
      ok: false,
      msg: "revisar logs",
    };
  }
};
