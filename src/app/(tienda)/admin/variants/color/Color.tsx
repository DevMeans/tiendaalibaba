'use client'
import { useUIStore } from "@/store";
import ModalComponent from "./ui/ModalVariant";
import { Color } from "@/interfaces/color.interface";
import { useState } from "react";
import { DeleteColor } from "@/actions/color";
import { Toaster, toast } from 'sonner'
interface Props {
    colors: Color[]
}

export const ColorComponent = ({ colors }: Props) => {
    const openmodal = useUIStore(state => state.openModal)
    const [selectedColor, setSelectedColor] = useState<Partial<Color> | null>(null);
    const [action, setAction] = useState('new')
    const handleEditClick = (color: Color,) => {
        setSelectedColor(color); // Establece el color seleccionado
        openmodal('color');
        setAction('edit')// Abre el modal
    };
    const deleteColor = async (id: string) => {
        const resp = await DeleteColor(id)
        toast.error(resp.msg)
    }
    return (
        <>
            <Toaster richColors position="top-right" />
            <div className="">
                <span>Colores</span>
                <button onClick={() => { openmodal('color'); setAction('new') }} className="ml-3 p-1 bg-black text-white rounded">
                    Nuevo Color
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
                                Color
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
                            colors.map((color, index) => (
                                <tr key={color.id} className="border-y-2">
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td onClick={() => handleEditClick(color)} className="cursor-pointer">
                                        {color.name}
                                    </td>

                                    <td>
                                        <div style={{ backgroundColor: `${color.hexCode}` }} className="w-20 h-5">

                                        </div>

                                    </td>
                                    <td>

                                        {(color.estado == "ACTIVO") ? <span className="text-white bg-green-500 text-sm p-1 rounded-lg">{color.estado}</span> : <span className="text-white bg-red-500 text-sm p-1 rounded-lg">{color.estado}</span>}
                                    </td>
                                    <td>
                                        <button className="px-2 py-1 bg-red-500 text-white font-bold rounded-md" onClick={() => deleteColor(color.id!)}>
                                            x
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            <ModalComponent selectedColor={selectedColor} action={action}></ModalComponent>
        </>
    );
}