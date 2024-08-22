'use client'
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { useState } from "react";
import { Color } from "@/interfaces/color.interface";
import { Size } from "@/interfaces/size.interface";

interface Product {
    id: string;
    name: string;
    description: string;
    slug: string;
    categoryId: string;
    images: ProductImage[];
    variants: any[];
}


export interface ProductImage {
    id: string;
    productId: string;
    imageUrl: string;
}
interface Props {
    productresp: { ok: boolean, msg?: string, product?: Product | null },
    colors: Color[],
    sizes: Size[],

}

export default function VariantForm({ productresp, colors, sizes }: Props) {
    let product
    if (productresp.ok == true) {
        product = productresp.product
    }
    return (
        <div className="m-auto max-w-[1000px] p-10">
            <div className="flex">
                <div className={`w-64`}>
                    <div >
                        <span className="text-lg font-semibold">
                            {product?.name}
                        </span>

                    </div>
                    {
                        product?.images[0].imageUrl ? <Image src={product.images[0].imageUrl} width={200} height={200} alt={product.name} className="w-auto h-auto rounded-lg"  ></Image> : 'No hay imagenes que mostrar'
                    }
                </div>
            </div>

        </div>
    );
}
