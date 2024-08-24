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
    product: Product
    colors: Color[],
    sizes: Size[],

}

export default function VariantForm({ product, colors, sizes }: Props) {
    const [color, setcolor] = useState('second')
    const { images } = product
    let imagedefault = 'https://res.cloudinary.com/personal-proyect/image/upload/v1637884570/samples/cloudinary-logo-vector.svg';


    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="m-auto max-w-[1200px] p-10">
            <div className="flex justify-center items-center ">
                <div className="flex items-center bg-slate-100 border rounded-lg">
                    <div>
                        <Image src={(images.length != 0) ? images[0].imageUrl : 'https://res.cloudinary.com/personal-proyect/image/upload/v1637884570/samples/cloudinary-logo-vector.svg'} alt={product.name} width={200} height={200} className="w-28 h-auto rounded-s-lg" />
                    </div>
                    <div className=" items-center px-4">
                        <span className="text-2xl font-semibold ">
                            {product.name}
                        </span>
                    </div>
                </div>
            </div>
            <div className="h-12">

            </div>
            <div className="flex flex-wrap gap-10 justify-center">
                <div className="flex flex-wrap gap-3 border p-5 items-center justify-center" >
                    {
                        sizes.map((size) => (
                            <div key={size.id} className="bg-cyan-100 size-10 flex justify-center items-center font-semibold rounded-lg border" >
                                {size.name}
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-wrap gap-3 border p-5 items-center">
                    {
                        colors.map((color) => (
                            <div key={color.id} className="size-10 flex justify-center items-center font-semibold rounded-lg border text-white" style={{ backgroundColor: `${color.hexCode}` }} >
                                ✔
                            </div>
                        ))
                    }
                </div>
                <div className="flex border p-5 items-center">
                    <label htmlFor="">
                        Precio
                        <input type="number" className="border focus:outline-none ml-2 w-12 text-center" />
                    </label>
                </div>
                <div className="flex items-center border px-5 gap-2">
                    <label className="cursor-pointer ">
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <div className="bg-blue-500 text-white px-4 py-2 rounded">
                            Imagen
                        </div>
                    </label>

                    {imagePreview && (
                        <div className="">
                            <Image src={imagePreview} alt="Preview" className="max-w-full h-auto" width={50} height={50} />
                        </div>
                    )}
                </div>
            </div>
            <div className="h-5">

            </div>
            <div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-100">
                            <th>color</th>
                            <th>talla</th>
                            <th>precio</th>
                            <th>estado</th>
                            <th>accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>color</td>
                            <td>talla</td>
                            <td>precio</td>
                            <td>estado</td>
                            <td>accion</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
