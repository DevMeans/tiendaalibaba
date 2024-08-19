'use client'
import { Size } from "@/interfaces/size.interface";
import { useUIStore } from "@/store";
import { useState } from "react";
import ModalComponent from "./ui/ModalVariant";
import { DeleteSize } from "@/actions/size";
import { toast } from "sonner";
interface Props {
    sizes: Size[]
}
export const TallaComponent = ({ sizes }: Props) => {
    const openmodal = useUIStore(state => state.openModal)
    const [selectedSize, setSelectedSize] = useState<Partial<Size> | null>(null);
    const [action, setAction] = useState('new')
    const handleEditClick = (size: Size,) => {
        setSelectedSize(size); // Establece el color seleccionado
        openmodal('size');
        setAction('edit')// Abre el modal
    };
    const deleteSize = async (id: string) => {
        const resp = await DeleteSize(id)
        toast.error(resp.msg)
    }
    return (
        <>
            <div className="">
                <span>Tallas</span>
                <button className="ml-3 p-1 bg-black text-white rounded" onClick={() => { openmodal('size'); setAction('new') }}>
                    Nueva talla
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
                            sizes.map((size, index) => (
                                <tr key={size.id} className="border-y-2">
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td onClick={() => handleEditClick(size)} className="cursor-pointer">
                                        {size.name}
                                    </td>
                                    <td>

                                        {(size.estado == "ACTIVO") ? <span className="text-white bg-green-500 text-sm p-1 rounded-lg">{size.estado}</span> : <span className="text-white bg-red-500 text-sm p-1 rounded-lg">{size.estado}</span>}
                                    </td>
                                    <td>
                                        <button className="px-2 py-1 bg-red-500 text-white font-bold" onClick={() => deleteSize(size.id!)}>
                                            x
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            <ModalComponent selectedSize={selectedSize} action={action}></ModalComponent>
        </>

    );
}