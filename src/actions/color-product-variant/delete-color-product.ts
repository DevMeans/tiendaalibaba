import prisma from "@/lib/prisma";
export const deleteColorProduct = async (
  productId: string,
  colorId:string,
  imageUrl: string
) => {
  try {
   // const resp = await prisma.productColorVariant.delete({});
  } catch (error) {
    console.log(error);
  }
};
