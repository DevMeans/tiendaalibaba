'use client'

import { IoMdClose } from "react-icons/io";
import { useUIStore } from '@/store';
import clsx from "clsx";
import Image from "next/image";
import { useCartStore } from "@/store/cart/cart-store";
import { useEffect, useState } from "react";
import { Color } from "@/interfaces/color.interface";
import { Size } from "@/interfaces/size.interface";
import { useRouter } from "next/navigation";

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
    ProductColorVariant: ProductColorVariant[];
    ProductSizeVariant: ProductSizeVariant[];
}

interface Props {
    sidebar: Product;
}

export default function SidebarComponent({ sidebar }: Props) {
    const router = useRouter()
    const isSideMenuOpen = useUIStore(state => state.isSideOpenMenu);
    const closeMenu = useUIStore(state => state.closeSideMenu);
    const addcart = useCartStore((state) => state.addProductCart);
    const getcart = useCartStore((state) => state.cart);
    const [color, setColor] = useState<ProductColorVariant | null>(null);
    const [cartItems, setCartItems] = useState(getcart);

    useEffect(() => {
        if (sidebar.ProductColorVariant.length > 0 && !color) {
            setColor(sidebar.ProductColorVariant[0]); // Selecciona el primer color solo si no hay un color ya seleccionado
        }
        setCartItems(getcart);
    }, [sidebar, getcart, color]);

    const onClickImage = (item: ProductColorVariant) => {
        setColor(item); // Al hacer clic en una imagen, cambia el color seleccionado
    };

    const onClickSize = (size: ProductSizeVariant, cantidad: number) => {
        if (!color) return;

        addcart(sidebar, color, size, cantidad);
        setCartItems(getcart);
    };

    return (
        <div>
            {isSideMenuOpen && (
                <div className="z-20 fixed screensmv2 sm:screenv2 h-screen top-0 left-0 m-auto flex flex-col justify-center items-center" onClick={() => closeMenu()}>
                    <Image className='cursor-pointer z-20' alt='' src={color ? color.imageUrl : sidebar.images[0].imageUrl} width={250} height={250} />
                    <div className="text-white text-lg font-bold">
                        {color?.color.name}
                    </div>
                </div>
            )}
            {isSideMenuOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
            )}
            {isSideMenuOpen && (
                <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
            )}
            <div className={clsx("fixed p-5 right-0 top-0 w-[300px] lg:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300", {
                "translate-x-full": !isSideMenuOpen
            })}>
                <div className="">
                    <div className="flex justify-between items-center">
                        <p className="text-base font-semibold">Seleccione variaciones y cantidad</p>
                        <IoMdClose size={30}
                            onClick={() => closeMenu()}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="mt-3">
                        <p>Precio antes de envio: S/20</p>
                    </div>
                    <div className="mt-3 flex flex-col gap-3 font-semibold">
                        <span>1. Color: {color?.color.name}</span>
                        <div className='flex flex-wrap'>
                            {sidebar.ProductColorVariant.map((item) => (
                                <Image
                                    onClick={() => onClickImage(item)}
                                    className={clsx("", {
                                        "border-[2px]": color?.id === item.id
                                    })}
                                    key={item.colorId}
                                    alt={item.color.name}
                                    src={item.imageUrl}
                                    width={60}
                                    height={60}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="font-semibold">Tamaño</p>
                        {sidebar.ProductSizeVariant.map((r) => {
                            const currentCartItem = cartItems.find((item) =>
                                item.product.id === sidebar.id &&
                                item.carrito.some(c => c.color.id === color?.id && c.size.id === r.id)
                            );

                            const savedQuantity = currentCartItem?.carrito.find(c => c.color.id === color?.id && c.size.id === r.id)?.quantity || 0;

                            return (
                                <div className="grid grid-cols-3 mt-4" key={r.sizeId}>
                                    <div className="text-xl font-normal">
                                        {r.size.name}
                                    </div>
                                    <div>
                                        S/ {r.price}
                                    </div>
                                    <div className="">
                                        <div className="flex items-center justify-center w-24">
                                            <div className="relative flex items-center justify-center w-full h-8 text-lg font-semibold border rounded-full">
                                                <button
                                                    onClick={() => onClickSize(r, -1)}
                                                    className="absolute left-0 flex items-center justify-center w-8 h-8 text-lg font-bold border rounded-full hover:bg-gray-200 focus:outline-none">
                                                    -
                                                </button>
                                                <input key={`${r.sizeId}-quantity`} aria-label="precio" type="number" value={savedQuantity} readOnly className="w-full text-center focus:outline-none" />
                                                <button
                                                    onClick={() => onClickSize(r, 1)}
                                                    className="absolute right-0 flex items-center justify-center w-8 h-8 text-lg font-bold border rounded-full hover:bg-gray-200 focus:outline-none">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-3 flex flex-col">
                    <button className="p-2 bg-black text-white" onClick={() => router.push('/cart')}>
                        Fijar pedido
                    </button>

                </div>
            </div>
        </div>
    );
}
