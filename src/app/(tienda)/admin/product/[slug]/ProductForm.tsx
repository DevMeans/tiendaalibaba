'use client'
import CheckBoxComponent from "@/app/components/checkbox/CheckBox"
import ImageUploader from "@/app/components/uploading/Uploading"
import { Category } from "@/interfaces/category.interface"
import { Color } from "@/interfaces/color.interface"
import { Size } from "@/interfaces/size.interface"
import { Tag } from "@/interfaces/tag.interface"
interface Props {
    sizes: Size[],
    colors: Color[],
    categories: Category[],
    tags: Tag[]
}
export const ProductForm = ({ sizes, colors, categories, tags }: Props) => {
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
                    {
                        categories.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="mb-5">
                <label
                    htmlFor="guest"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Tag
                </label>
                <div className='flex gap-5 border px-3 py-5 flex-wrap'>
                    {
                        tags.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 selection:select-none cursor-pointer" >
                                <input id={item.id} type="checkbox" className="size-5 cursor-pointer" />
                                <label htmlFor={item.id} className="text-lg font-semibold cursor-pointer"> {item.name} </label>
                            </div>
                        ))
                    }


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
                    {
                        colors.map((item) => (
                            <div key={item.id} className="size-10 rounded-lg" style={{ backgroundColor: `${item.hexCode}` }}>
                            </div>
                        ))
                    }
                </div>

            </div>

            <div className="mb-5">
                <label
                    htmlFor="guest"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    tallas
                </label>

                <div className="mb-5 flex gap-3 flex-wrap">
                    {
                        sizes.map((item) => (
                            <div key={item.id} className=" bg-cyan-100 flex justify-center items-center">
                                <span className="p-2">
                                    {item.name}
                                </span>

                            </div>
                        ))
                    }

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