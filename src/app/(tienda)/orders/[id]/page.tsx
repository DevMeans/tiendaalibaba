
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";
import { getOrderById } from "@/actions/orders/get-order-by-id";
import { size } from "../../../../interfaces/product.size.variant";
import { Color } from "../../../../interfaces/color.interface";

interface Order {
  ok: boolean;
  order: {
    id: string;
    orderDate: Date;
    customerName: string;
    customerEmail: string;
    userId: string;
    deliveryAddress: string;
    phoneNumber: string;
    notes?: string;
    isRegisteredUser: boolean;
    items: OrderItem[];
  };
}

interface OrderItem {
  id: string;
  orderId: string;
  quantity: number;
  productColorVariantId: string;
  productSizeVariantId: string;
  productColorVariant: {
    id: string;
    productId: string;
    colorId: string;
    imageUrl: string;
    color: Color;
    product: any;
  };
  productSizeVariant: {
    id: string;
    productId: string;
    sizeId: string;
    price: number;
    size: size;
  };
}

interface Props {
  params: {
    id: string;
  };
}



export default async function OrderIdPage({ params }: Props) {
  const { id } = params;
  const order = await getOrderById(id);
  if (!order) {
    return <div> esta orden no existe</div>
  }
  return (
    <div className="max-w-[1200px] m-auto p-5">
      <div className="font-semibold text-xl">Pedido: {order.id}</div>
      <div>
        <span>
          Fecha:{" "}
          {new Date(order.orderDate).toLocaleDateString("es-PE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          a las{" "}
          {new Date(order.orderDate).toLocaleTimeString("es-PE", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </span>
      </div>
      <div>
        <span>Nombre: {order.customerName}</span>
      </div>
      <div>
        <span>Dirección: {order.deliveryAddress}</span>
      </div>
      <div>
        <span>Celular: {order.phoneNumber}</span>
      </div>
      <div>
        <span>Detalles de envío: {order.notes}</span>
      </div>
      <div className="w-full border my-4"></div>
      <div className="text-right font-semibold text-lg">
        Total Pedido: S/
        {order.items
          .reduce(
            (total, item) =>
              total + item.quantity * item.productSizeVariant.price,
            0
          )
          .toLocaleString("es-PE", {
            style: "currency",
            currency: "PEN",
          })}
      </div>
      <div className="overflow-auto">
        <table className="min-w-full bg-white ">
          <thead>
            <tr>
              <th scope="col" className="py-2 px-4 border-b">
                Imagen
              </th>
              <th scope="col" className="py-2 px-4 border-b">
                Nombre
              </th>
              <th scope="col" className="py-2 px-4 border-b">
                Color
              </th>
              <th scope="col" className="py-2 px-4 border-b">
                Talla
              </th>
              <th scope="col" className="py-2 px-4 border-b">
                Cantidad
              </th>
              <th scope="col" className="py-2 px-4 border-b">
                Precio
              </th>
              <th scope="col" className="py-2 px-4 border-b">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="py-2 px-4 border-b">
                  <Image
                    src={item.productColorVariant.imageUrl}
                    width={50}
                    height={50}
                    alt={item.productColorVariant.product.name}
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  {item.productColorVariant.product.name}
                </td>
                <td className="py-2 px-4 border-b">
                  {item.productColorVariant.color.name}
                </td>
                <td className="py-2 px-4 border-b">
                  {item.productSizeVariant.size.name}
                </td>
                <td className="py-2 px-4 border-b">{item.quantity}</td>
                <td className="py-2 px-4 border-b">
                  S/{item.productSizeVariant.price}
                </td>
                <td className="py-2 px-4 border-b">
                  S/{item.quantity * item.productSizeVariant.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
