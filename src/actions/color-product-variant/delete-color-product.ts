import prisma from "@/lib/prisma";
export const deleteColorProduct = async (id: string) => {
  try {
    const resp = await prisma.productColorVariant.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }
};
