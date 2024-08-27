import { getProduct } from '@/actions/product/get-product';
import TableProduct from './table-product';
import { Toaster, toast } from 'sonner'
export default async function ProductsList() {
    const product = await getProduct()

    return (
        
        <div className="m-auto max-w-[1200px] p-10">
            <Toaster richColors position="top-right" />
            <TableProduct products={product}></TableProduct>
        </div>
    );
}