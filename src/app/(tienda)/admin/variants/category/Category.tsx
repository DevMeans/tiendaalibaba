'use client'

import { useUIStore } from "@/store";
import { useState } from "react";
import ModalComponent from "./ui/ModalVariant";
import { DeleteSize } from "@/actions/size";
import { toast } from "sonner";
import { Category } from "@/interfaces/category.interface";
import { DeleteCategory } from "@/actions/category";
import { editarEstado } from "@/actions/category/editar-estado";
interface Props {
    categories: Category[]
}
export const CategoryComponent = ({ categories }: Props) => {
    const openmodal = useUIStore(state => state.openModal)
    const [selectedCategory, setSelectedCategory] = useState<Partial<Category> | null>(null);
    const [action, setAction] = useState('new')
    const handleEditClick = (category: Category,) => {
        setSelectedCategory(category); // Establece el color seleccionado
        openmodal('category');
        setAction('edit')// Abre el modal
    };
    const deleteCategory = async (id: string) => {
        const resp = await DeleteCategory(id)
        toast.error(resp.msg)
    }
    const onclickEstado = async (id: string, estado: 'ACTIVO' | 'INACTIVO') => {
        const estadodb = await editarEstado(id, estado)
        console.log(estadodb)
    }
    return (
        <>
            <div className="">
                <span>Categoria</span>
                <button className="ml-3 p-1 bg-black text-white rounded" onClick={() => { openmodal('category'); setAction('new') }}>
                    Nueva Categoria
                </button>
                <table className="border mt-5 w-full">
                    <thead className="bg-black text-white text-left">
                        <tr>
                            <th >
                                nro.
                            </th>
                            <th >
                                Nombre
                            </th>
                            <th>
                                estado
                            </th>
                            <th>
                                eliminar
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-50">
                        {
                            categories.map((category, index) => (
                                <tr key={category.id} className="border-y-2">
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td onClick={() => handleEditClick(category)} className="cursor-pointer">
                                        {category.name}
                                    </td>
                                    <td>
                                        {(category.estado == "ACTIVO") ? <span onClick={() => onclickEstado(category.id, category.estado)} className="text-white bg-green-500 text-sm p-1 rounded-lg cursor-pointer">{category.estado}</span> : <span onClick={() => onclickEstado(category.id, category.estado)} className="text-white bg-red-500 text-sm p-1 rounded-lg cursor-pointer">{category.estado}</span>}
                                    </td>
                                    <td>
                                        <button className="px-2 py-1 bg-red-500 text-white font-bold rounded-md" onClick={() => deleteCategory(category.id!)}>
                                            x
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            <ModalComponent selectedCategory={selectedCategory} action={action}></ModalComponent>
        </>

    );
}