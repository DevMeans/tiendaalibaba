'use client'
import { IoMdClose } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { useUIStore } from '@/store'
import Link from 'next/link';
import clsx from "clsx";
import Image from "next/image";
export default function SidebarComponent() {
    const iSsideMenuOpen = useUIStore(state => state.isSideOpenMenu)
    const closeMenu = useUIStore(state => state.closeSideMenu)
    const array = ['S', 'M', 'L', 'XL', 'XXL']
    return (
        <div>
            {
                iSsideMenuOpen && (
                    <div className="z-20 fixed screensmv2 sm:screenv2 h-screen top-0 left-0 m-auto flex justify-center items-center">
                        <Image className='cursor-pointer z-20' alt='' src={`https://sc04.alicdn.com/kf/H31d890cdd45742e3b2ceedc812818fffY.jpg`} width={250} height={250}></Image>
                    </div>
                )
            }

            {
                iSsideMenuOpen && (
                    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30">

                    </div>
                )
            }
            {
                iSsideMenuOpen && (
                    <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm">
                    </div>
                )
            }

            <div className={clsx("fixed p-5 right-0  top-0 w-[300px]  lg:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300", {
                "translate-x-full": !iSsideMenuOpen

            })}>
                <div className="">
                    <div className="flex justify-between items-center">
                        <p className="text-base font-semibold">Seleccione variaciones y cantidad</p>
                        <IoMdClose size={30}
                            onClick={() => closeMenu()}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="mt-3">
                        <p>Precio antes de envio : S/20</p>
                    </div>
                    <div className="mt-3 flex flex-col gap-3 font-semibold">
                        <span>1. Color (17) : Blue</span>
                        <div className='flex flex-wrap'>
                            <Image alt='' className='border-[2px] border-[black] cursor-pointer' src={`https://sc04.alicdn.com/kf/H31d890cdd45742e3b2ceedc812818fffY.jpg`} width={60} height={60}></Image>
                            <Image alt='' src={`https://sc04.alicdn.com/kf/He93a62c89ff04d9fbb92e5a4566cadb5t.jpg`} width={60} height={60}></Image>
                            <Image alt='' src={`https://sc04.alicdn.com/kf/He2a94562fee649d0bd96e22651f15adeD.jpg`} width={60} height={60}></Image>
                            <Image alt='' src={`https://sc04.alicdn.com/kf/H2e551f1add6741faa884399ebbffebd9y.jpg`} width={60} height={60}></Image>
                            <Image alt='' src={`https://sc04.alicdn.com/kf/H09cb7d812e944107802f388bf1486d44H.jpg`} width={60} height={60}></Image>
                            <Image alt='' src={`https://sc04.alicdn.com/kf/Hc8dba2f7397b4a3f9426bdbc7e6a6218Y.jpg`} width={60} height={60}></Image>
                            <Image alt='' src={`https://sc04.alicdn.com/kf/He93a62c89ff04d9fbb92e5a4566cadb5t.jpg`} width={60} height={60}></Image>
                            <Image alt='' src={`https://sc04.alicdn.com/kf/He2a94562fee649d0bd96e22651f15adeD.jpg`} width={60} height={60}></Image>
                            <Image alt='' src={`https://sc04.alicdn.com/kf/H2e551f1add6741faa884399ebbffebd9y.jpg`} width={60} height={60}></Image>
                            <Image alt='' src={`https://sc04.alicdn.com/kf/H09cb7d812e944107802f388bf1486d44H.jpg`} width={60} height={60}></Image>
                            <Image alt='' src={`https://sc04.alicdn.com/kf/Hc8dba2f7397b4a3f9426bdbc7e6a6218Y.jpg`} width={60} height={60}></Image>
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="font-semibold">Tamaño (7)</p>

                        {
                            array.map((r) => (
                                <div className="grid grid-cols-3 mt-4" key={r}>
                                    <div className="text-xl font-normal">
                                        {r}
                                    </div>
                                    <div>
                                        S/20
                                    </div>
                                    <div className="">
                                        <div className="flex items-center justify-center w-24">
                                            <div className="relative flex items-center justify-center w-full h-8 text-lg font-semibold border rounded-full">
                                                <button className="absolute left-0 flex items-center justify-center w-8 h-8 text-lg font-bold border rounded-full hover:bg-gray-200 focus:outline-none">
                                                    -
                                                </button>
                                                <input type="number" value={0} className="w-full text-center focus:outline-none" />
                                                <button className="absolute right-0 flex items-center justify-center w-8 h-8 text-lg font-bold border rounded-full hover:bg-gray-200 focus:outline-none">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))
                        }

                    </div>
                </div>

                <div className="mt-3 flex flex-col">
                    <span>Envio</span>
                    <p>
                            Total de envio : s/200 por 41 Polos
                    </p>
                
                </div>


            </div>
        </div>
    );
}