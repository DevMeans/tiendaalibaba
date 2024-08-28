'use client'

import { deleteProduct } from '@/actions/product/eliminar-producto';
import { ChangeEstado } from '@/actions/product/estado-product';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';

import { toast } from 'sonner'
interface product {
    id: string
    name: string
    description: string
    slug: string
    categoryId: string,
    estado: "ACTIVO" | "INACTIVO",
    images?: image[]
}
interface image {
    id: string
    productId: string
    imageUrl: string

}
interface Props {
    products: product[]
}

export default function TableProduct({ products }: Props) {

    const router = useRouter()
    console.log('resp', products)
    const changeEstado = async (id: string, estado: any) => {
        const resp = await ChangeEstado(id, estado)
        toast.info(resp?.msg)
    }
    const onclick = (id: string) => {
        console.log(id)
        router.push(`/admin/product/variant/${id}`)
    }
    const ondelete = async (id: string) => {
        const deleteProductid = await deleteProduct(id)
        console.log(deleteProductid)
    }
    const onclickProduct = (id: string) => {
        console.log(id)
        router.push(`/admin/product/${id}`)
    }
    return (
        <>
         <button className='uppercase p-2 rounded bg-black text-white mb-4' onClick={()=>router.push(`/admin/product/new`)}>nuevo</button>
            <table className="w-full text-left">
                <thead className="bg-black text-white">
                    <tr className="">
                        <th>
                            img
                        </th>
                        <th>
                            nombre
                        </th>
                        <th>
                            estado
                        </th>
                        <th>variantes</th>
                        <th>
                            eliminar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    {product.images && product.images.length > 0 ?
                                        <Image src={product.images[0].imageUrl} width={30} height={30} alt={product.name}></Image> :
                                        'leg'}</td>
                                <td onClick={() => onclickProduct(product.id)} className='cursor-pointer'>{product.name}</td>
                                <td>
                                    <select name="" id="" className='border' defaultValue={product.estado} onChange={(e) => changeEstado(product.id, e.target.value)}>
                                        <option value="ACTIVO">ACTIVO</option>
                                        <option value="INACTIVO">INACTIVO</option>
                                    </select>
                                </td>
                                <td>
                                    <span className='bg-green-500 text-white p-1 text-xs rounded cursor-pointer' onClick={() => onclick(product.id)}>variantes</span>
                                </td>
                                <td>
                                    <button onClick={() => ondelete(product.id)} className='px-1 bg-red-500 text-white text-sm rounded-md font-semibold'>x
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>

    );
}