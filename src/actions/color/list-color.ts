"use server";
import prisma from "@/lib/prisma";
export const ListColor = async () => {
  try {
    const listColor = await prisma.color.findMany();
    return listColor;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const ListColorPublic = async () => {
  try {
    const listColor = await prisma.color.findMany({
      where: {
        estado: "ACTIVO",
      },
    });
    return listColor;
  } catch (error) {
    console.log(error);
    return [];
  }
};
