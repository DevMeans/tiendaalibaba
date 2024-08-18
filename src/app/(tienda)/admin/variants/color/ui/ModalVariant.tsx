'use client'
import { useForm } from "react-hook-form"
import { useUIStore } from '@/store';
import './modal.css'
import { Color } from "@/interfaces/color.interface";
import { createColor } from "@/actions/color";
import { useEffect } from "react";

interface Props {
    selectedColor: Partial<Color> | null;
    action: string;
}

export default function ModalComponent({ selectedColor, action }: Props) {
    console.log(selectedColor)

    const isSideModalOpen = useUIStore(state => state.isOpenModalColor)
    const closeModal = useUIStore(state => state.closeModal)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Color>({
        defaultValues: {
            name: "",
            hexCode: "",
        }
    })

    const onSubmit = async (data: Color) => {
        const formData = new FormData();//TODO:MILTON  ACA HACER UNA CONDCIONAL CUANDO VIENE EL ID O NO
        formData.append('name', data.name)
        formData.append('hexCode', data.hexCode)
        const color = await createColor(formData)
        console.log(color)
    }

    useEffect(() => {
        if (action === 'new') {
            reset({
                name: "",
                hexCode: "",
            });
        } else if (selectedColor) {
            reset(selectedColor);
        }
    }, [selectedColor, action, reset]);

    return (
        <div>
            {isSideModalOpen && (
                <div
                    className="main-modal fixed w-full h-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
                    style={{ background: 'rgba(0,0,0,.7)' }}
                >
                    <div className="border border-black modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            {/* Title */}
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">Color</p>
                                <div className="modal-close cursor-pointer z-50" onClick={() => closeModal('color')}>
                                    <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                    </svg>
                                </div>
                            </div>
                            {/* Body */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="my-5">
                                    <div className='mb-3'>
                                        <input
                                            type="text"
                                            className='w-full focus:outline-none border p-2'
                                            placeholder='Nombre'
                                            {...register('name', { required: 'El nombre es requerido' })}
                                        />
                                        {errors.name && <span className='text-sm text-red-500'>{errors.name.message}</span>}
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type="text"
                                            className='w-full focus:outline-none border p-2'
                                            placeholder='Código Hexadecimal'
                                            {...register('hexCode', {
                                                required: 'El código hexadecimal es requerido',
                                                pattern: {
                                                    value: /^#([0-9A-F]{3}){1,2}$/i,
                                                    message: 'El código hexadecimal no es válido'
                                                }
                                            })}
                                        />
                                        {errors.hexCode && <span className='text-sm text-red-500'>{errors.hexCode.message}</span>}
                                    </div>
                                    <div className='w-full h-10 bg-slate-200'></div>
                                </div>
                                {/* Footer */}
                                <div className="flex justify-end pt-2">
                                    <button
                                        className="focus:outline-none modal-close px-4 bg-gray-200 p-3 rounded-lg text-black hover:bg-gray-300"
                                        onClick={() => closeModal('color')}
                                    >
                                        Cancelar
                                    </button>
                                    <button className="focus:outline-none px-4 bg-black p-3 ml-3 rounded-lg text-white" type="submit">
                                        {action === 'new' ? 'Nuevo' : 'Editar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
