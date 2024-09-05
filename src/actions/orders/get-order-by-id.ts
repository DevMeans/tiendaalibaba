import prisma from "@/lib/prisma";
export const getOrderById = async (id: string) => {
  try {
    const order = await prisma.order.findFirst({
      where: { id },
      include: {
        items: {
          include: {
            productColorVariant: {
              include: {
                color: true,
                product: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            productSizeVariant: {
              include: {
                size: true,
              },
            },
          },
        },
      },
    });
    return order;
  } catch (error) {
    console.log(error);
    return null;
  }
};
