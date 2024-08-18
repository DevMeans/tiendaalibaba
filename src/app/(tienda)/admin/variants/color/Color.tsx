'use client'
import { useUIStore } from "@/store";
import ModalComponent from '../../../../components/modal-variant/ModalVariant';

export const ColorComponent = () => {
    const openmodal = useUIStore(state=>state.openModal)
    return (
        <>
       
        <div className="">
            <span>Colores</span>
            <button onClick={()=>openmodal('color')} className="ml-3 p-1 bg-black text-white rounded">
                Nuevo boton
            </button>
            <table className="border mt-5">
                <thead className="bg-black text-white text-left">
                    <tr>
                        <th className="w-16">
                            id
                        </th>
                        <th className="">
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
                <tbody>
                    <tr>
                        <td>
                            id
                        </td>
                        <td>
                            Nombre
                        </td>

                        <td>
                            Color
                        </td>
                        <td>
                            Estado
                        </td>
                        <td>
                            eliminar
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> 
            <ModalComponent></ModalComponent>
        </>
    );
}