'use client'
import CheckBoxComponent from "@/app/components/checkbox/CheckBox"
import ImageUploader from "@/app/components/uploading/Uploading"
import { Color } from "@/interfaces/color.interface"
import { Product } from "@/interfaces/product.interface"
import { Size } from "@/interfaces/size.interface"

interface Props {
    product: Product,
    size: Size[],
    color: Color[]
}
export const ProductForm = ({ product, size, color }: Props) => {
    return (
        <form action="https://formbold.com/s/FORM_ID" method="POST">
            <div className="mb-5">
                <label
                    htmlFor="guest"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Nombre de producto
                </label>
                <input
                    type="text"
                    name="guest"
                    id="guest"
                    placeholder="nombre de producto"
                    min="0"
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="guest"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Slug
                </label>
                <input
                    type="text"
                    name="guest"
                    id="guest"
                    placeholder="nombre de producto"
                    min="0"
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="guest"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Categoria
                </label>
                <select
                    name="guest"
                    id="guest"
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                    <option value="">Seleccione categoria</option>
                    <option value="">Camisas</option>
                    <option value="">Polo</option>
                </select>
            </div>
            <div className="mb-5">
                <label
                    htmlFor="guest"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Tag
                </label>
                <div className='flex gap-5 border px-3'>
                    <CheckBoxComponent></CheckBoxComponent>
                    <CheckBoxComponent></CheckBoxComponent>
                    <CheckBoxComponent></CheckBoxComponent>

                </div>
            </div>
            <div className="mb-5">
                <label
                    htmlFor="guest"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    colores
                </label>

                <div className="flex gap-3">
                    <div className="size-10 bg-red-500 rounded-lg flex items-center justify-center">
                        <span className="text-xl font-bold text-white">✓</span>
                    </div>
                    <div className="size-10 bg-red-500 rounded-lg">
                    </div>
                    <div className="size-10 bg-red-500 rounded-lg">
                    </div>
                    <div className="size-10 bg-red-500 rounded-lg">
                    </div>
                    <div className="size-10 bg-red-500 rounded-lg">
                    </div>
                    <div className="size-10 bg-red-500 rounded-lg">
                    </div>
                    <div className="size-10 bg-red-500 rounded-lg">
                    </div>
                </div>

            </div>

            <div className="mb-5">
                <label
                    htmlFor="guest"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    tallas
                </label>

                <div className="mb-5 flex gap-3">
                    <div className="p-2 bg-cyan-100 border-[2px] border-slate-500">
                        <span>
                            S
                        </span>

                    </div>
                    <div className="p-2 bg-cyan-100">
                        <span>
                            M
                        </span>

                    </div>
                    <div className="p-2 bg-cyan-100">
                        <div>
                            L
                        </div>
                    </div>
                </div>

            </div>
            <div className='mb-5'>
                <label
                    htmlFor="guest"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Imagenes
                </label>
                <ImageUploader></ImageUploader>
            </div>

            <div className='mb-5'>
                <label
                    htmlFor="guest"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Imagens x color
                </label>
                <ImageUploader></ImageUploader>
            </div>
            <button
                className="hover:shadow-form rounded-md bg-black py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
                Submit
            </button>

        </form>
    )
}