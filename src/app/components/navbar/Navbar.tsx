import Link from "next/link"
import { RiShoppingCartLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { auth } from "@/auth.config";
export default async function NavbarComponent() {

    const session = await auth()
    console.log(session)
    return (
        <div className="flex flex-col sm:flex-row items-center sm:justify-between max-w-[1200px] m-auto text-sm sm:text-base font-bold p-5">
            <div className="text-2xl mb-3 sm:mb-0 font-extrabold">
                BillSurft
            </div>
            <div className="flex flex-col sm:flex-row gap-3" >
                <nav className="flex gap-2 sm:gap-6 uppercase ">
                    <Link href={'/'} className="block">Tienda</Link>
                    <Link href={'/orders'} className="block">Pedidos</Link>
                    {
                        (session?.user.role == 'SUPER_USER') ? <>
                            <Link href={'/admin/product'} className="block">Productos</Link>
                            <Link href={'/admin/variants'} className="block">Variantes</Link>
                        </> : <></>
                    }
                </nav>
                <div className="flex justify-center gap-3">
                    <RiShoppingCartLine fontSize={20} />
                    <FaRegUser fontSize={20} />
                </div>
            </div>
        </div>
    );
}