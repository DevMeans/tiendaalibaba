'use client';

import { useCartStore } from "@/store/cart/cart-store";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Variant {
    color: {
        color: { name: string };
        imageUrl: string;
    };
    size: {
        size: { name: string };
        price: number;
    };
    quantity: number;
}

interface CartItem {
    product: {
        name: string;
        images: { imageUrl: string }[];
    };
    carrito: Variant[];
}

export default function CartPage() {
    const [isMounted, setIsMounted] = useState(false);
    const cartItems = useCartStore(state => state.getCart());

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    if (cartItems.length === 0) {
        return <div>NO HAY ITEMS EN EL CARRITO</div>;
    }

    // Calcular el total de todos los productos en el carrito
    const total = cartItems.reduce((acc, cartItem) => {
        const subtotal = cartItem.carrito.reduce((subtotal, variant) => subtotal + (variant.size.price * variant.quantity), 0);
        return acc + subtotal;
    }, 0);

    return (
        <div className="max-w-[1200px] m-auto p-5">
            <div className="m-5">
                <h1>Carrito de compras</h1>
                <span>Total: S/{total}</span> {/* Mostrar el total dinámico aquí */}
            </div>
            <table className='w-full'>
                <thead className='bg-slate-200 text-left'>
                    <tr>
                        <th className="w-52">Producto</th>
                        <th>Carrito</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {cartItems.map((cartItem: CartItem, index: number) => (
                        <tr key={index}>
                            <td className="w-52 p-2">
                                <span>{cartItem.product.name}</span>
                                <Image alt={cartItem.product.name} src={cartItem.product.images[0]?.imageUrl || '/placeholder-image.jpg'} width={60} height={60} />
                            </td>
                            <td className="p-2">
                                {Object.entries(groupBySize(cartItem.carrito)).map(([size, variants]) => {
                                    // Calcular el total de productos por talla
                                    const totalBySize = variants.reduce((total, variant) => total + variant.quantity, 0);

                                    return (
                                        <div key={size} className="mb-4">
                                            <div className="font-bold">Talla {size}: {totalBySize}</div> {/* Mostrar el total por talla aquí */}
                                            <div className="flex flex-wrap gap-2">
                                                {variants.map((variant: Variant, variantIndex: number) => (
                                                    <div key={variantIndex} className="flex items-center">
                                                        <Image alt={variant.color.color.name} src={variant.color.imageUrl} className="h-6" height={24} width={24} />
                                                        <span className="ml-2">{variant.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </td>
                            <td>
                                S/ {cartItem.carrito.reduce((subtotal, variant) => subtotal + (variant.size.price * variant.quantity), 0)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Función para agrupar variantes por talla
function groupBySize(carrito: Variant[]): Record<string, Variant[]> {
    return carrito.reduce((acc, variant) => {
        const size = variant.size.size.name;
        if (!acc[size]) {
            acc[size] = [];
        }
        acc[size].push(variant);
        return acc;
    }, {} as Record<string, Variant[]>);
}
