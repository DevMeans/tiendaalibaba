"use server";
import prisma from "@/lib/prisma";
export const ListTag = async () => {
  try {
    const listTag = await prisma.tag.findMany();
    return listTag;
  } catch (error) {
    console.log(error);
    return [];
  }
};
