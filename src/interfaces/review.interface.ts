import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface Review {
  id: string;
  product: Product;
  productId: string;
  user: User;
  userId: string;
  rating: number;
  comment?: string;
  reviewDate: Date;
}
