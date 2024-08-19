"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const DeleteSize = async (id: string) => {
  try {
    await prisma.size.delete({ where: { id } });
    revalidatePath("/admin/variants");
    return {
      ok: true,
      msg: "Size Eliminado correctamente",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2015") {
        return {
          ok: false,
          msg: `No existe registro con el id size '${id}'.`,
        };
      }
    }
    console.log("Error desconocido: ", error);
    return {
      ok: false,
      msg: "Problema con edicion de size.",
    };
  }
};
