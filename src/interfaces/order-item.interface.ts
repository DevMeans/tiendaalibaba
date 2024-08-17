import { Order } from "./order.interface";
import { ProductVariant } from "./product-variant.interface";

export interface OrderItem {
  id: bigint;
  order: Order;
  productVariant: ProductVariant;
  quantity: number;
}
