"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { Size } from "@/interfaces/size.interface";

export const editSize = async (formdata: FormData) => {
  const data: any = {};
  formdata.forEach((value, key) => {
    (data as any)[key] = value;
  });
  try {
    await prisma.size.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name!,
        estado: data.estado,
      },
    });
    revalidatePath("/admin/variants");
    return {
      ok: true,
      msg: "Size Editado",
    };
  } catch (error) {
    //P2015
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          ok: false,
          msg: `Ya existe un size con el nombre '${data.name}'.`,
        };
      }
      if (error.code === "P2015") {
        return {
          ok: false,
          msg: `No existe registro con el id size '${data.id}'.`,
        };
      }
    }
    console.log("Error desconocido: ", error);
    return {
      ok: false,
      msg: "Problema con edicion del size.",
    };
  }
};
