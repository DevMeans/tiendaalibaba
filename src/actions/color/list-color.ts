"use server";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const ListColor = async () => {
  try {
    const listColor = await prisma.color.findMany();
    return listColor;
  } catch (error) {
    console.log(error);
    return [];
  }
};
