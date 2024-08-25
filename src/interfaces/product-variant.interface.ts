import { Size } from "@prisma/client";
import { Color } from "./color.interface";
import { Product } from "./product.interface";

export interface ProductVariant {
    id: string;
    product: string;
    color: string;
    size: string;
    price: number;
    imageUrl: string;

  }