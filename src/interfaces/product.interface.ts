import { Category } from "./category.interface";

export interface Product {
  id: string;
  name: string;
  description?: string;
  slug: string;
  category: Category;
}
