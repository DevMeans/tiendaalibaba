"use server";
import { Color } from "@/interfaces/color.interface";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export const editColor = async (formdata: FormData) => {
  const data: Partial<Color> = {};
  formdata.forEach((value, key) => {
    (data as any)[key] = value;
  });
  try {
    await prisma.color.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name!,
        hexCode: data.hexCode!,
        estado: data.estado,
      },
    });
    revalidatePath("/admin/variants");
    return {
      ok: true,
      msg: "Color Editado",
    };
  } catch (error) {
    //P2015
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          ok: false,
          msg: `Ya existe un color con el nombre '${data.name}'.`,
        };
      }
      if (error.code === "P2015") {
        return {
          ok: false,
          msg: `No existe registro con el idcolor '${data.id}'.`,
        };
      }
    }
    console.log("Error desconocido: ", error);
    return {
      ok: false,
      msg: "Problema con edicion del color.",
    };
  }
};
