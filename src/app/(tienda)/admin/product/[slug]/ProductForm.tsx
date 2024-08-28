'use client'
import { CreateProduct } from '@/actions/product/create-product';
import ImageUploader from '@/app/components/uploading/Uploading';
import { Product } from '@/interfaces/product.interface';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProductById } from '../get-product-id';
import Image from 'next/image';
import { UpdateProduct } from '@/actions/product/update-product';
import { deleteProductImage } from '@/actions/product/delete-img-product';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';



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
    product: Partial<ProductById> | null
}

export default function ProductForm({ categories, tags, product }: Props) {
    const router = useRouter()
    const [error, setError] = useState('')
    const { register, handleSubmit, setValue } = useForm<IFormInput>({
        defaultValues: {
            name: product ? product.name : '',
            slug: product ? product.slug : '',
            description: product ? product.description : '',
            category: product ? product.categoryId : '',
        }
    });
    let productexist: any;
    if (product) {
        productexist = product
    }
    let tagmap: any[] = []
    if (product?.tags) {
        tagmap = product.tags.map((tag) => tag.tagId)
    }


    const setFormulario = async (data: IFormInput) => {
        const formData = new FormData();
        const { images, ...productToSave } = data
        if (product?.id) {
            formData.append('id', product.id)
        }
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
        if (product?.id) {
            console.log(product.id)
            const resp = await UpdateProduct(formData)

            if (resp?.error) {
                setError(resp.error)
            }

            console.log(resp)

        }
        if (!product?.id) {
            const resp = await CreateProduct(formData)
            toast.success(resp?.msg)
            setTimeout(() => {
                router.push(`/admin/product/variant/${resp.id}`)
            }, 2000);
        }
    }

    const eliminarImagen = async (imageId: string,
        imageUrl: string,
        productId: string) => {
        toast.info('Eliminando Imagen')
        const eliminarImagen = await deleteProductImage(imageId, imageUrl, productId)
        if (eliminarImagen.ok) {
            toast.success('Imagen eliminada correctamente')
        } else {
            toast.error('Error al eliminar imagen revisar logs')
        }
    }

    return (
        <>
            <button className='p-2 bg-black text-white mb-2 rounded' onClick={() => router.replace(`/admin/product`)}>regresar</button>
            <form onSubmit={handleSubmit(setFormulario)}>
                <span className='text-red-500'>{error}</span>
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
                                    defaultChecked={tagmap.includes(tag.id)}
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
                <div className='mb-5 flex flex-wrap gap-4 p-5 border justify-center'>
                    {
                        (product?.images) ?
                            product.images.map((image) => (
                                <div key={image.id} className='relative w-[100px]' onClick={() => eliminarImagen(image.id, image.imageUrl, product.id!)}>
                                    <div className='absolute rounded-full bg-red-500 size-6 text-center flex justify-center items-center cursor-pointer ml-1 mt-1'>
                                        <span className='text-white'>x
                                        </span>
                                    </div>
                                    <Image src={image.imageUrl} alt={productexist.name} className='object-cover inset-0 w-full h-full' width={130} height={130} ></Image>
                                </div>

                            ))
                            : ''
                    }

                </div>
                {/* Segunda instancia de ImageUploader, apuntando a "imagesByColor" */}
                <button className='bg-black text-white p-2 rounded'>Guardar</button>
            </form>
        </>

    );
};
