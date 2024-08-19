"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { Tag } from "@/interfaces/tag.interface";

export const createTag = async (formdata: FormData) => {
  const data: Partial<Tag> = {};
  formdata.forEach((value, key) => {
    (data as any)[key] = value;
  });
  try {
    await prisma.tag.create({
      data: {
        name: data.name!,
      },
    });
    revalidatePath("/admin/variants");
    return {
      ok: true,
      msg: "Tag creado",
    };
  } catch (error) {
    //P2015
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          ok: false,
          msg: `Ya existe un Tag con el nombre '${data.name}'.`,
        };
      }
    }
    console.log("Error desconocido: ", error);
    return {
      ok: false,
      msg: "Problema con la creación del Tag.",
    };
  }
};
