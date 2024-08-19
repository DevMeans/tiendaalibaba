'use client'
import { useForm } from "react-hook-form"
import { useUIStore } from '@/store';
import './modal.css'
import { useEffect, useState } from "react";
import { toast } from 'sonner'
import { Size } from "@/interfaces/size.interface";
import { Tag } from "@/interfaces/tag.interface";
import { createTag, editTag } from "@/actions/tag";
interface Props {
    selectedTag: Partial<Tag> | null;
    action: string;
}

export default function ModalComponent({ selectedTag, action }: Props) {
    const isSideModalOpen = useUIStore(state => state.isOpenModalTag)
    const closeModal = useUIStore(state => state.closeModal)
    const [error, setError] = useState('')
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Tag>({
        defaultValues: {
            name: "",
            estado: "ACTIVO"
        }
    })
    const onSubmit = async (data: Size) => {
        console.log(action)
        const formData = new FormData();
        // TODO: HACER UNA CONDICIONAL CUANDO VIENE EL ID O NO //TRATAR EL ESTADO COMO STRING
        if (action == 'edit') {
            formData.append('id', data.id!)
        }
        formData.append('name', data.name)
        formData.append('estado', data.estado)
        let resp;
        if (action == 'new') {
            resp = await createTag(formData)
            if (resp.ok) {
                closeModal('tag')
                toast.info(resp.msg)
            }
            if (!resp.ok) {
                setError(resp.msg)
                toast.info(resp.msg)
            }
        }
        if (action == 'edit') {
            resp = await editTag(formData)
            console.log(resp)
            if (resp.ok) {

                closeModal('tag')
                toast.info(resp.msg)
            }
            if (!resp.ok) {
                setError(resp.msg)
                toast.info(resp.msg)
            }
        }
    }
    useEffect(() => {
        if (!isSideModalOpen) {
            reset({
                name: "",
            });
        } else if (isSideModalOpen) {
            setError('')
            if (action === 'new') {
                reset({
                    name: "",
                });
            } else if (selectedTag) {
                reset(selectedTag);
            }
        }
    }, [isSideModalOpen, selectedTag, action, reset]);

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
                                <p className="text-2xl font-bold">Tag</p>
                                <div className="modal-close cursor-pointer z-50" onClick={() => closeModal('tag')}>
                                    <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                    </svg>
                                </div>
                            </div>
                            {/* Body */}
                            <div className="text-xl font-extrabold text-red-500">
                                {error}
                            </div>
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
                                    <div className="mb-3" >
                                        <select id="" className="focus:outline-none h-10 w-full border pl-1"  {...register('estado', { required: 'El estado es requerido' })}>
                                            <option value="ACTIVO">activo</option>
                                            <option value="INACTIVO">inactivo</option>
                                        </select>
                                    </div>
                                </div>
                                {/* Footer */}
                                <div className="flex justify-end pt-2">
                                    <button
                                        className="focus:outline-none modal-close px-4 bg-gray-200 p-3 rounded-lg text-black hover:bg-gray-300"
                                        onClick={() => closeModal('tag')}
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
