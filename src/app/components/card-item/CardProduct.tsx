'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
interface Props {
    product: Product
}
interface Product {
    id: string;
    name: string;
    description: string;
    slug: string;
    categoryId: string;
    estado: string
    images: ProductImage[];
    ProductSizeVariant: ProductSizeVariant[]
}
export interface ProductSizeVariant {
    id: string;
    productId: string;
    sizeId: string;
    price: number;
}

export interface ProductImage {
    id: string;
    productId: string;
    imageUrl: string;
}
export default function CardProductComponent({ product }: Props) {
    const router= useRouter()
    const img2 = product.images[0].imageUrl
    const img1 = product.images[1].imageUrl

    const [displayImage, setDisplayImage] = useState(img1)
    return (
        <div className='w-full'>
            <Image
                onMouseEnter={() => setDisplayImage(img1)}
                onMouseLeave={() => setDisplayImage(img2)}
                className='w-full'
                src={displayImage} alt='s' width={300} height={300}></Image>
            <div className='text-center pl-3 pr-3 pb-3'>
                <h2 className='text-lg font-semibold'>
                    S/ {product.ProductSizeVariant[0].price}
                </h2>
                <p className='mb-2'>
                </p>
                <button className='p-2 bg-black text-white font-bold' onClick={()=>router.push(`/product/${product.slug}`)} >Ver ...</button>
            </div>
        </div>
    );
}