'use client'
import { CreateProduct } from '@/actions/product/create-product';
import ImageUploader from '@/app/components/uploading/Uploading';
import { Product } from '@/interfaces/product.interface';
import React from 'react';
import { useForm } from 'react-hook-form';

interface IFormInput {
    name: string;
    slug: string;
    category: string;
    description: string;
    tags: string[];
    images: File[];
}
interface Category {
    id: string;
    name: string;
}
interface Tag {
    id: string;
    name: string;
}
interface Props {
    categories: Category[];
    tags: Tag[];
}

export const ProductForm = ({ categories, tags }: Props) => {
    const { register, handleSubmit, setValue } = useForm<IFormInput>();


    const setFormulario = async (data: IFormInput) => {
        const formData = new FormData();
        const { images, ...productToSave } = data
        formData.append('name', productToSave.name)
        formData.append('slug', productToSave.slug)
        formData.append('categoryId', productToSave.category)
        formData.append('description', productToSave.description)
        formData.append('tags', productToSave.tags.toString())
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i])
            }
        }
        //TODO: AGREGAR newvariants al formulario
        console.log(formData)
        const resp = await CreateProduct(formData)
        console.log(resp)
    }
    return (
        <form onSubmit={handleSubmit(setFormulario)}>
            <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Nombre del producto
                </label>
                <input
                    {...register('name', { required: true })}
                    placeholder="Nombre del producto"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>

            <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Slug
                </label>
                <input
                    {...register('slug', { required: true })}
                    placeholder="Slug"
                    className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Descripcion
                </label>
                <input
                    {...register('description', { required: true })}
                    placeholder="Descripcion"
                    className="w-full rounde    d-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Categoría
                </label>
                <select {...register('category')} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Tags
                </label>
                <div className="flex gap-3 flex-wrap">
                    {tags.map((tag) => (
                        <div key={tag.id} className="flex items-center">
                            <input
                                {...register('tags')}
                                type="checkbox"
                                value={tag.id}
                                className="mr-2 size-5"
                            />
                            {tag.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">Imágenes</label>
                <ImageUploader setValue={setValue} fieldName="images" />
            </div>
            {/* Segunda instancia de ImageUploader, apuntando a "imagesByColor" */}
            <button className='bg-black text-white p-2 rounded'>Guardar</button>
        </form>
    );
};
