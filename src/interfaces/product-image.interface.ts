import { Product } from "./product.interface";

export interface ProductImage {
    id: string;
    product: Product;
    productId: bigint;
    imageUrl: string;
  }
  