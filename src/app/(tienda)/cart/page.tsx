'use client'

import Image from "next/image";

export default function cartPage() {

    return (
        <div className="max-w-[1200px] m-auto p-5">
            <div className="m-5">
                <h1>Carrito de compras</h1> <span> Total : S/2000</span>
            </div>
            <table className='w-full'>
                <thead className='bg-slate-200 text-left'>
                    <tr>
                        <th className="w-52">
                            producto
                        </th>
                        <th>
                            carrito
                        </th>
                        <th>
                            subtotal
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    <tr>
                        <td className="w-52 p-2">
                            <span>Nombre del producto</span>
                            <Image alt='' src={`https://sc04.alicdn.com/kf/He93a62c89ff04d9fbb92e5a4566cadb5t.jpg`} width={60} height={60}></Image>
                        </td>
                        <td className="p-2">
                            <div className="flex flex-wrap gap-2 border p-2 mb-2">
                                <div className="w-32">
                                    <span>cantidad 39</span> : <span>X</span>
                                </div>
                                <div className="flex">
                                    <Image alt='' src={`https://sc04.alicdn.com/kf/He93a62c89ff04d9fbb92e5a4566cadb5t.jpg`} className="h-6" height={10} width={24}></Image>
                                    <input type="number" className="focus:outline-none border w-6 h-6" />
                                </div>
                                <div className="flex">
                                    <Image alt='' src={`https://sc04.alicdn.com/kf/He93a62c89ff04d9fbb92e5a4566cadb5t.jpg`} className="h-6" height={10} width={24}></Image>
                                    <input type="number" className="focus:outline-none border w-6 h-6" />
                                </div>
                                <div className="flex">
                                    <Image alt='' src={`https://sc04.alicdn.com/kf/He93a62c89ff04d9fbb92e5a4566cadb5t.jpg`} className="h-6" height={10} width={24}></Image>
                                    <input type="number" className="focus:outline-none border w-6 h-6" />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 border p-2 mb-2"> {/*//TODO:para ver todo simetrico el ver la forma de como no hacer el margin a la ultima fila */}
                                <div className="w-32">
                                    <span>cantidad 39</span> : <span>X</span>
                                </div>
                                <div className="flex">
                                    <Image alt='' src={`https://sc04.alicdn.com/kf/He93a62c89ff04d9fbb92e5a4566cadb5t.jpg`} className="h-6" height={10} width={24}></Image>
                                    <input type="number" className="focus:outline-none border w-6 h-6" />
                                </div>
                                <div className="flex">
                                    <Image alt='' src={`https://sc04.alicdn.com/kf/He93a62c89ff04d9fbb92e5a4566cadb5t.jpg`} className="h-6" height={10} width={24}></Image>
                                    <input type="number" className="focus:outline-none border w-6 h-6" />
                                </div>
                                <div className="flex">
                                    <Image alt='' src={`https://sc04.alicdn.com/kf/He93a62c89ff04d9fbb92e5a4566cadb5t.jpg`} className="h-6" height={10} width={24}></Image>
                                    <input type="number" className="focus:outline-none border w-6 h-6" />
                                </div>
                            </div>
                        </td>
                        <td>
                            s/ 300
                        </td>
                    </tr>
                    <tr>
                        <td className="w-52 p-2">
                            <span>Nombre del producto</span>
                            <Image alt='' src={`https://sc04.alicdn.com/kf/He93a62c89ff04d9fbb92e5a4566cadb5t.jpg`} width={60} height={60}></Image>
                        </td>
                        <td className="p-2">
                            <div className="flex flex-wrap gap-2 border p-2">
                                <div className="w-32">
                                    <span>cantidad 39</span> : <span>X</span>
                                </div>
                                <div className="flex">
                                    <Image alt='' src={`https://sc04.alicdn.com/kf/He93a62c89ff04d9fbb92e5a4566cadb5t.jpg`} className="h-6" height={10} width={24}></Image>
                                    <input type="number" className="focus:outline-none border w-6 h-6" />
                                </div>
                                <div className="flex">
                                    <Image alt='' src={`https://sc04.alicdn.com/kf/He93a62c89ff04d9fbb92e5a4566cadb5t.jpg`} className="h-6" height={10} width={24}></Image>
                                    <input type="number" className="focus:outline-none border w-6 h-6" />
                                </div>
                                <div className="flex">
                                    <Image alt='' src={`https://sc04.alicdn.com/kf/He93a62c89ff04d9fbb92e5a4566cadb5t.jpg`} className="h-6" height={10} width={24}></Image>
                                    <input type="number" className="focus:outline-none border w-6 h-6" />
                                </div>
                            </div>
                        </td>
                        <td>
                            s/ 300
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}