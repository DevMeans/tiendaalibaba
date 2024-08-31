
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
  estado: string;
}
