"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { Category } from "@/interfaces/category.interface";

export const editCategory = async (formdata: FormData) => {
  const data: Partial<Category> = {};
  formdata.forEach((value, key) => {
    (data as any)[key] = value;
  });
  try {
    await prisma.category.update({
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
      msg: "Category Editado",
    };
  } catch (error) {
    //P2015
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          ok: false,
          msg: `Ya existe un Category con el nombre '${data.name}'.`,
        };
      }
      if (error.code === "P2015") {
        return {
          ok: false,
          msg: `No existe registro con el id Category '${data.id}'.`,
        };
      }
    }
    console.log("Error desconocido: ", error);
    return {
      ok: false,
      msg: "Problema con edicion del Category.",
    };
  }
};
