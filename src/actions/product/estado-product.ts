'use server'
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const ChangeEstado = async (
  id: string,
  estado: "ACTIVO" | "INACTIVO"
) => {
  try {
    const resp = await prisma.product.update({
      where: { id },
      data: { estado },
    });
    revalidatePath(`/admin/product`);
    return { ok: true, msg: "Estado cambiado" };
  } catch (error) {
    console.log(error);
    return { ok: false, msg: "Problema Cambiando el estado" };
  }
};
