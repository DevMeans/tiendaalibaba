"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { Size } from "@/interfaces/size.interface";

export const createSize = async (formdata: FormData) => {
  const data: Partial<Size> = {};
  formdata.forEach((value, key) => {
    (data as any)[key] = value;
  });
  try {
    await prisma.size.create({
      data: {
        name: data.name!,
      },
    });
    revalidatePath("/admin/variants");
    return {
      ok: true,
      msg: "Size creado",
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
    }
    console.log("Error desconocido: ", error);
    return {
      ok: false,
      msg: "Problema con la creación del size.",
    };
  }
};
