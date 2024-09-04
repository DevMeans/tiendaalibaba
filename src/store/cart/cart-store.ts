import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Color } from "@/interfaces/color.interface";
import { Size } from "@/interfaces/size.interface";

interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
}

interface ProductColorVariant {
  id: string;
  productId: string;
  colorId: string;
  imageUrl: string;
  color: Color;
}

interface ProductSizeVariant {
  id: string;
  productId: string;
  sizeId: string;
  price: number;
  size: Size;
}

interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  categoryId: string;
  estado: string;
  images: ProductImage[];
}

interface CartItem {
  product: Product;
  carrito: {
    color: ProductColorVariant;
    size: ProductSizeVariant;
    quantity: number;
  }[];
}

interface State {
  cart: CartItem[];
  addProductCart: (
    product: Product,
    color: ProductColorVariant,
    size: ProductSizeVariant,
    quantity: number
  ) => void;
  updateProductCart: (
    productId: string,
    sizeId: string,
    colorId: string,
    quantity: number
  ) => void;
  getCart: () => CartItem[];
  removeProduct: (colorId: string, productId: string, sizeId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductCart(product, color, size, quantity) {
        const { cart } = get();
        const existingCartItem = cart.find(
          (item) => item.product.id === product.id
        );

        if (existingCartItem) {
          const existingVariant = existingCartItem.carrito.find(
            (variant) =>
              variant.color.id === color.id && variant.size.id === size.id
          );

          if (existingVariant) {
            existingVariant.quantity += quantity;
            set({ cart: [...cart] });
          } else {
            existingCartItem.carrito.push({ color, size, quantity });
            set({ cart: [...cart] });
          }
        } else {
          set({
            cart: [
              ...cart,
              {
                product,
                carrito: [{ color, size, quantity }],
              },
            ],
          });
        }
      },
      updateProductCart(productId, sizeId, colorId, quantity) {
        const { cart } = get();
        const updateCart = cart.map((item) => {
          if (item.product.id === productId) {
            return {
              ...item,
              carrito: item.carrito.map((variant) =>
                variant.color.id === colorId && variant.size.id === sizeId
                  ? { ...variant, quantity }
                  : variant
              ),
            };
          }
          return item;
        });

        set({ cart: updateCart });
      },
      removeProduct(colorId, productId, sizeId) {
        const { cart } = get();
        const updatedCart = cart
          .map((item) => ({
            ...item,
            carrito: item.carrito.filter(
              (variant) =>
                variant.color.id !== colorId ||
                variant.size.id !== sizeId ||
                item.product.id !== productId
            ),
          }))
          .filter((item) => item.carrito.length > 0);

        set({ cart: updatedCart });
      },
      getCart() {
        return get().cart;
      },
      clearCart() {
        set({ cart: [] });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
