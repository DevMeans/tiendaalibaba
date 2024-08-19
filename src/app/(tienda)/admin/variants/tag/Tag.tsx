'use client'
import { useUIStore } from "@/store";
import { useState } from "react";
import ModalComponent from "./ui/ModalVariant";
import { toast } from "sonner";
import { Tag } from "@/interfaces/tag.interface";
import { DeleteTag } from "@/actions/tag";
interface Props {
    tags: Tag[]
}
export const TagComponent = ({ tags }: Props) => {
    const openmodal = useUIStore(state => state.openModal)
    const [selectedTag, setSelectedTag] = useState<Partial<Tag> | null>(null);
    const [action, setAction] = useState('new')
    const handleEditClick = (tag: Tag,) => {
        setSelectedTag(tag); // Establece el color seleccionado
        openmodal('tag');
        setAction('edit')// Abre el modal
    };
    const deleteTag = async (id: string) => {
        const resp = await DeleteTag(id)
        toast.error(resp.msg)
    }
    return (
        <>
            <div className="">
                <span>Tallas</span>
                <button className="ml-3 p-1 bg-black text-white rounded" onClick={() => { openmodal('tag'); setAction('new') }}>
                    Nuevo Tag
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
                            tags.map((tag, index) => (
                                <tr key={tag.id} className="border-y-2">
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td onClick={() => handleEditClick(tag)} className="cursor-pointer">
                                        {tag.name}
                                    </td>
                                    <td>

                                        {(tag.estado == "ACTIVO") ? <span className="text-white bg-green-500 text-sm p-1 rounded-lg">{tag.estado}</span> : <span className="text-white bg-red-500 text-sm p-1 rounded-lg">{tag.estado}</span>}
                                    </td>
                                    <td>
                                        <button className="px-2 py-1 bg-red-500 text-white font-bold rounded-md" onClick={() => deleteTag(tag.id!)}>
                                            x
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            <ModalComponent selectedTag={selectedTag} action={action}></ModalComponent>
        </>

    );
}