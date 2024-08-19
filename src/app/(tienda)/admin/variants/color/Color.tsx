'use client'
import { useUIStore } from "@/store";
import ModalComponent from "./ui/ModalVariant";
import { Color } from "@/interfaces/color.interface";
import { useState } from "react";
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
    return (
        <>
            <div className="">
                <span>Colores</span>
                <button onClick={() => { openmodal('color'); setAction('new') }} className="ml-3 p-1 bg-black text-white rounded">
                    Nuevo boton
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
                                <tr key={color.id}>
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
                                        Estado
                                    </td>
                                    <td>
                                        eliminar
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