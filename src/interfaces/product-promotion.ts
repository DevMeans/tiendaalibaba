import { Product } from "./product.interface";
import { Promotion } from "./promotion.interface";

export interface ProductPromotion {
  id: bigint;
  product: Product;
  productId: bigint;
  promotion: Promotion;
  promotionId: bigint;
}
