"use server";

import { Color } from "@/interfaces/color.interface";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createColor = async (formdata: FormData) => {
  const data: Partial<Color> = {};
  formdata.forEach((value, key) => {
    (data as any)[key] = value;
  });
  try {
    await prisma.color.create({
      data: {
        name: data.name!,
        hexCode: data.hexCode!,
      },
    });
    return {
      ok: true,
      msg: "Color creado",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          ok: false,
          msg: `Ya existe un color con el nombre '${data.name}'.`,
        };
      }
    }
    console.log("Error desconocido: ", error);
    return {
      ok: false,
      msg: "Problema con la creación del color.",
    };
  }
};
