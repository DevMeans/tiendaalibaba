import { getOrders } from "@/actions/orders/get-order";

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OrderPage() {
    const orders = await getOrders()
    if (!orders?.ok) {
        redirect('/auth/login')
    }
    console.log(orders)
    if (orders.orders?.length == 0) {
        return <div>No tienes ordenes aun</div>
    }
    return (
        <div className="max-w-[1200px] m-auto p-5">
            <table className="w-full text-left">
                <thead className="bg-black text-white ">
                    <tr>
                        <th>
                            fecha
                        </th>
                        <th>
                            direccion
                        </th>
                        <th>
                            notes
                        </th>
                        <th>
                            detalles
                        </th>
                    </tr>
                </thead>
                <tbody >
                    {
                        orders.orders!.map((item) => (
                            <tr key={item.id} className="">
                                <td className="py-2">
                                    {new Date(item.orderDate).toLocaleDateString("es-PE", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}{" "}
                                    a las{" "}
                                    {new Date(item.orderDate).toLocaleTimeString("es-PE", {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                    })}
                                </td>
                                <td className="py-2">
                                    {item.deliveryAddress}
                                </td>
                                <td className="py-2">
                                    {item.notes}
                                </td>
                                <td className="py-2">
                                    <Link href={`/orders/${item.id}`} className="p-1 bg-black text-white">
                                        detalles
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}