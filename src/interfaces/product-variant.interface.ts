import { Size } from "@prisma/client";
import { Color } from "./color.interface";
import { Product } from "./product.interface";

export interface ProductVariant {
    id: string;
    product: Product;
    color: Color;
    size: Size;
    price: number;
    stock: number;
    imageUrl: string;

  }