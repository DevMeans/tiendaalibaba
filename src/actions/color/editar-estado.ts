"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const editarEstado = async (
  id: string,
  estado: "ACTIVO" | "INACTIVO"
) => {
  try {
    let estadoTemp: "ACTIVO" | "INACTIVO";
    if (estado == "ACTIVO") {
      estadoTemp = "INACTIVO";
    } else {
      estadoTemp = "ACTIVO";
    }
    const estadoDB = await prisma.color.update({
      where: { id: id },
      data: {
        estado: estadoTemp,
      },
    });
    revalidatePath("/admin/variants");
    return {
      ok: true,
      msg: "Estado cambiado",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      msg: "Hubo un error en el cambio de estado",
    };
  }
};
