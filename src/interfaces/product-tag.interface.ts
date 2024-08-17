import { Product } from "./product.interface";
import { Tag } from "./tag.interface";

export interface ProductTag {
  id: string;
  product: Product;
  tag: Tag;
}
