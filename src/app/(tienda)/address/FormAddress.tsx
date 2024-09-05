'use client'

import { useForm } from "react-hook-form";
import { useCartStore } from "@/store/cart/cart-store";
import { createOrder } from "@/actions/orders/create-order";

export interface Product {
    product: ProductClass;
    carrito: Carrito[];
}

export interface Carrito {
    color: ColorElement;
    size: Size;
    quantity: number;
}

export interface ColorElement {
    id: string;
    productId: string;
    colorId: string;
    imageUrl: string;
    color: SizeClass;
}

export interface SizeClass {
    id: string;
    name: string;
    hexCode?: string;
    estado: string;
}

export interface Size {
    id: string;
    productId: string;
    sizeId: string;
    price: number;
    size: SizeClass;
}

export interface ProductClass {
    id: string;
    name: string;
    description: string;
    slug: string;
    categoryId: string;
    estado: string;
    images: Image[];
    ProductColorVariant: ColorElement[];
    ProductSizeVariant: Size[];
}

export interface Image {
    id: string;
    productId: string;
    imageUrl: string;
}
interface UserAddress {
    id: string
    nombres: string
    apellidos: string
    direccion: string
    detalles?: string
    phone: string
    userId: string
}
 
export default function AdressFormComponent() {
    const { register, handleSubmit, formState: { errors } } = useForm<UserAddress>();
    const cartItems = useCartStore(state => state.getCart());

    const transformedCartItems = cartItems.map(item => {
        return item.carrito.map(carritoItem => ({
            productId: item.product.id,
            colorId: carritoItem.color.id,
            sizeId: carritoItem.size.id,
            quantity: carritoItem.quantity,
        }));
    }).flat();

    const onSubmit = async (data: any) => {
      
        console.log(data);
        console.log(transformedCartItems);
        await createOrder(transformedCartItems,data)
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-10">
                <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D] uppercase">
                        Nombres
                    </label>
                    <input
                        {...register("nombres", { required: "Este campo es obligatorio" })}
                        placeholder="Nombres"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    {errors.nombres && <p className="text-red-500">{errors.nombres.message}</p>}
                </div>
                <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D] uppercase">
                        Apellidos
                    </label>
                    <input
                        {...register("apellidos", { required: "Este campo es obligatorio" })}
                        placeholder="Apellidos"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    {errors.apellidos && <p className="text-red-500">{errors.apellidos.message}</p>}
                </div>
            </div>
            <div className="mb-5 col-span-2">
                <label className="mb-3 block text-base font-medium text-[#07074D] uppercase">
                    Dirección
                </label>
                <input
                    {...register("direccion", { required: "Este campo es obligatorio" })}
                    placeholder="Dirección"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.direccion && <p className="text-red-500">{errors.direccion.message}</p>}
            </div>
            <div className="mb-5 col-span-2">
                <label className="mb-3 block text-base font-medium text-[#07074D] uppercase">
                    Teléfono
                </label>
                <input
                    {...register("phone", { required: "Este campo es obligatorio" })}
                    placeholder="Teléfono"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>
            <div className="mb-5 col-span-2">
                <label className="mb-3 block text-base font-medium text-[#07074D] uppercase">
                    Detalles
                </label>
                <textarea
                    {...register("detalles")}
                    placeholder="Detalles de envío" rows={5}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <button type="submit" className="bg-black text-white p-2 uppercase rounded-md">Hacer pedido</button>
        </form>
    );
}
