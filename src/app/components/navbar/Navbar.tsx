import Link from "next/link"
import { RiShoppingCartLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
export default function NavbarComponent() {
    return (
        <div className="flex flex-col sm:flex-row items-center sm:justify-between max-w-[1200px] m-auto text-sm sm:text-lg font-bold p-5">
            <div>
                BillSurft
            </div>
            <div className="flex flex-col sm:flex-row gap-3" >
                <nav className="flex gap-2 sm:gap-6 uppercase ">
                    <Link href={'/'} className="block">Tienda</Link>
                    <Link href={'/orders'} className="block">Pedidos</Link>
                    <Link href={'#'} className="block whitespace-nowrap">como hacer pedidos</Link>
                </nav>
                <div className="flex justify-center gap-3">
                    <RiShoppingCartLine fontSize={20} />
                    <FaRegUser fontSize={20} />
                </div>
            </div>
        </div>
    );
}