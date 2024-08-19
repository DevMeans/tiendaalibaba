"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { Category } from "@/interfaces/category.interface";

export const createCategory = async (formdata: FormData) => {
  const data: Partial<Category> = {};
  formdata.forEach((value, key) => {
    (data as any)[key] = value;
  });
  try {
    await prisma.category.create({
      data: {
        name: data.name!,
      },
    });
    revalidatePath("/admin/variants");
    return {
      ok: true,
      msg: "Categoria creado",
    };
  } catch (error) {
    //P2015
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          ok: false,
          msg: `Ya existe un Categoria con el nombre '${data.name}'.`,
        };
      }
    }
    console.log("Error desconocido: ", error);
    return {
      ok: false,
      msg: "Problema con la creación del Categoria.",
    };
  }
};
