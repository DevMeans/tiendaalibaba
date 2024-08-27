import { Decimal } from "@prisma/client/runtime/library";

export interface ProductSizeVariant {
  id?: string;
  productId: string;
  sizeId: string;
  price: number;
  size: size;
}
export interface size {
  id: string;
  name: string;
  estado: "ACTIVO" | "INACTIVO";
}
