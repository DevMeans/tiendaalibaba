import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrders = async () => {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        ok: false,
        msg: "No estas autenticado",
      };
    }
    const rol = session?.user.role;
    if (rol == "SUPER_USER") {
      const orders = await prisma.order.findMany({
        orderBy:{
          orderDate:'desc'
        }
      });
      return {
        ok: true,
        orders,
      };
    } else if (rol == "BUYER") {
      const orders = await prisma.order.findMany({
        where: {
          userId: session?.user.id,
        },
        orderBy:{
          orderDate:'desc'
        }
      });
      return {
        ok: true,
        orders,
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
