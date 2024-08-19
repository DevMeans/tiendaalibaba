"use server";
import prisma from "@/lib/prisma";
export const ListCategory = async () => {
  try {
    const listCategory = await prisma.category.findMany();
    return listCategory;
  } catch (error) {
    console.log(error);
    return [];
  }
};
