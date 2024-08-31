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
  estado: string; // Puedes ajustar los estados según lo que necesites
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
  addProductToCart: (
    product: Product,
    color: ProductColorVariant,
    size: ProductSizeVariant,
    quantity: number
  ) => void;
  getCart: () => CartItem[];
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart(product, color, size, quantity) {
        set((state) => {
          const existingCartItemIndex = state.cart.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingCartItemIndex !== -1) {
            const existingCartItem = state.cart[existingCartItemIndex];
            const existingVariantIndex = existingCartItem.carrito.findIndex(
              (variant) =>
                variant.color.id === color.id && variant.size.id === size.id
            );

            if (existingVariantIndex !== -1) {
              // Si la combinación de color y talla ya existe
              const updatedQuantity =
                existingCartItem.carrito[existingVariantIndex].quantity +
                quantity;

              if (updatedQuantity >= 0) {
                // Solo actualiza si la cantidad es mayor que 0
                const updatedCart = [...state.cart];
                updatedCart[existingCartItemIndex].carrito[
                  existingVariantIndex
                ].quantity = updatedQuantity;
                return { cart: updatedCart };
              }
            } else {
              // Si la combinación de color y talla no existe
              if (quantity > 0) {
                const updatedCart = [...state.cart];
                updatedCart[existingCartItemIndex].carrito.push({
                  color,
                  size,
                  quantity,
                });
                return { cart: updatedCart };
              }
            }
          } else {
            // Si el producto no existe en el carrito
            if (quantity > 0) {
              return {
                cart: [
                  ...state.cart,
                  {
                    product,
                    carrito: [
                      {
                        color,
                        size,
                        quantity,
                      },
                    ],
                  },
                ],
              };
            }
          }

          return state; // No hacer ningún cambio si la cantidad es menor o igual a 0
        });
      },

      getCart() {
        return get().cart;
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "shopping-cart",
    }
  )
);
