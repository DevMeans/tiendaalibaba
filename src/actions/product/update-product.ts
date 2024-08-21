"use server";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ProductTag } from "@/interfaces/product-tag.interface";
import { Prisma } from "@prisma/client";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  categoryId: z.string().uuid(),
  tags: z.coerce.string().transform((val) => val.split(",")),
});

export const UpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      ok: false,
      error: "Error de validación",
      details: productParsed.error.errors, // Retorna los errores específicos de Zod
    };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();
  const { id, ...rest } = product;
  try {
    const primaTx = await prisma.$transaction(async (tx) => {
      // Crear el producto en la base de datos y obtener su ID
      const productdb = await prisma.product.update({
        where: { id },
        data: {
          name: rest.name,
          categoryId: rest.categoryId,
          slug: rest.slug,
          description: rest.description,
        },
      });

      const productId = productdb.id;

      if (rest.tags.length > 0) {
        const tagsData: ProductTag[] = rest.tags.map((tagId) => ({
          productId,
          tagId,
        }));
        await prisma.productTag.deleteMany({
          where: { productId },
        });
        await prisma.productTag.createMany({
          data: tagsData,
        });
      }

      if (formData.getAll("images").length > 0) {
        const images = await uploadImagenes(
          formData.getAll("images") as File[]
        );
        if (!images) {
          throw new Error("No se pudieron cargar las imágenes");
        }
        await prisma.productImage.createMany({
          data: images.map((image) => ({
            imageUrl: image!,
            productId,
          })),
        });
      }
    });
    return {
      ok: true,
      primaTx,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      if (error.code === "P2002") {
        // Prisma error code for unique constraint violation
        return {
          ok: false,
          error: `El ${error.meta?.target} ya existe. Deben ser únicos.`,
        };
      }
    } else {
      console.log(error);
      return {
        ok: false,
        error: "Error desconocido", // Incluye el mensaje de error para más contexto
      };
    }
  }
};

const uploadImagenes = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");
        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadImages = await Promise.all(uploadPromises);
    return uploadImages;
  } catch (error) {
    console.error(error);
    return null;
  }
};
