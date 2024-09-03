
'use client'
export default function AdressFormComponent() {
    return (
        <form action="">
            <div className="grid grid-cols-2 gap-10">
                <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D] uppercase">
                        nombres
                    </label>
                    <input
                        placeholder="Nombres"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D] uppercase">
                        apellidos
                    </label>
                    <input
                        placeholder="Apellidos"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
            </div>
            <div className="mb-5 col-span-2">
                <label className="mb-3 block text-base font-medium text-[#07074D] uppercase">
                    Direccion
                </label>
                <input
                    placeholder="Direccion"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div className="mb-5 col-span-2">
                <label className="mb-3 block text-base font-medium text-[#07074D] uppercase">
                    telefono
                </label>
                <input
                    placeholder="telefono"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div className="mb-5 col-span-2">
                <label className="mb-3 block text-base font-medium text-[#07074D] uppercase">
                    DETALLES
                </label>
                <textarea
                    placeholder="Detalles de envio" rows={5}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <button className="bg-black text-white p-2 uppercase rounded-md"> hacer pedido</button>
        </form>
    );
}