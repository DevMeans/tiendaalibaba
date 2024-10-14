'use client'
import SidebarComponent from "@/app/components/sidebar/Sidebar";
import SwiperProductComponent from "@/app/components/swiper/Swiper";
import { Color } from "@/interfaces/color.interface";
import { Size } from "@/interfaces/size.interface";
import { useUIStore } from "@/store";
import { useCartStore } from "@/store/cart/cart-store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
    color: Color
}

interface ProductSizeVariant {
    id: string;
    productId: string;
    sizeId: string;
    price: number;
    size: Size
}

interface Product {
    id: string;
    name: string;
    description: string;
    slug: string;
    categoryId: string;
    estado: string; // Puedes ajustar los estados según lo que necesites
    images: ProductImage[];
    ProductColorVariant: ProductColorVariant[];
    ProductSizeVariant: ProductSizeVariant[];
}
interface Props {
    product: Product
}

export default function AddCartPage({ product }: Props) {
    const router = useRouter()
    const { ProductColorVariant, ProductSizeVariant } = product
    const openSideMenu = useUIStore(state => state.openSideMenu)

    return (
        <>
            <div className="">
                <div className='font-semibold'>
                    {product.name}
                </div>
                <SwiperProductComponent product={product} ></SwiperProductComponent>
            </div>
            <div className='p-5  divide-y rounded-md'>
                <div>
                    <span className='font-semibold text-xl'>
                        S/. {product.ProductSizeVariant[0].price}
                    </span>
                </div>
                <div>
                    <div className='flex justify-between mt-4 mb-2'>
                        <span> variaciones: 17 colores ,8 Tallas</span>
                        <span>Seleccionar ahora</span>
                    </div>
                    <div className='flex flex-col gap-3 mt-4'>
                        <span>1. Color (17) : 1</span>
                        <div className='flex flex-wrap'> {
                            ProductColorVariant.map((color) => (
                                <Image key={color.id} onClick={() => openSideMenu()} alt='' src={color.imageUrl} width={60} height={60}></Image>
                            ))
                        }
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span>2.Talla (8) </span>
                            <div className='flex gap-3'>
                                {
                                    ProductSizeVariant.map((size) => (
                                        <div key={size.id} className=' bg-slate-300 rounded cursor-pointer' onClick={() => openSideMenu()}>
                                            <span className='p-3'>{size.size.name}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-2 pt-4'>
                    <p className='font-semibold'>Descripcion</p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis blanditiis ad natus eligendi perspiciatis porro autem dicta ipsam! Ut expedita perferendis, eius nisi esse fugit consequuntur aspernatur dolorem voluptate nihil.
                </div>
                <div className='mt-2 pt-4'>
                    <div>
                        Envío
                        Mar + entrega en EE. UU. (económico) Cambiar
                        Total del envío: $18.86 por 2 piezas
                        Entrega estimada oct.15
                    </div>
                    <button className='p-2 bg-black text-white mt-5' onClick={() => openSideMenu()} >Iniciar Pedido</button>
                </div>
            </div>
            <SidebarComponent sidebar={product}></SidebarComponent>
        </>
    );
}