"use server";
import prisma from "@/lib/prisma";
export const ListSize = async () => {
  try {
    const listSize = await prisma.size.findMany();
    return listSize;
  } catch (error) {
    console.log(error);
    return [];
  }
};
