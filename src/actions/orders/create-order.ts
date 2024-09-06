"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface Product {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
}
interface UserAddress {
  id: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  detalles?: string;
  phone: string;
  userId: string;
}
export const createOrder = async (
  products: Product[],
  address: UserAddress
) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.id;
  try {
    const prismaTx = await prisma.$transaction(async (prisma) => {
      let userAddress = await prisma.userAddress.findFirst({
        where: { userId: userId },
      });
      if (!userAddress) {
        address.userId = userId;
        await prisma.userAddress.createMany({
          data: address,
        });
      } else {
        await prisma.userAddress.updateMany({
          where: { userId: userId },
          data: address,
        });
      }
      const order = await prisma.order.create({
        data: {
          userId,
          customerName: `${address.nombres} ${address.apellidos}`,
          customerEmail: session.user.email,
          deliveryAddress: address.direccion,
          phoneNumber: address.phone,
          notes: address.detalles,
          isRegisteredUser: true,
        },
      });

      const orderItems = products.map((product) => ({
        orderId: order.id,
        productColorVariantId: product.colorId,
        productSizeVariantId: product.sizeId,
        quantity: product.quantity,
      }));

      await prisma.orderItem.createMany({
        data: orderItems,
      });

      return order;
    });
    revalidatePath("/orders");
    return {
      ok: true,
      message: "Order hecha con exito",
    };
  } catch (error) {
    console.error("Error al guardar la orden:", error);
    return {
      ok: false,
      message: "Error al guardar la orden",
    };
  }
};
