
import { ListSize } from '@/actions/size';
import VariantForm from './VariantForm';
import { getProductIDV2 } from "@/actions/product";
import { ListColor } from '@/actions/color';
import { listColorProduct } from '../../../../../../actions/color-product-variant/list-color-product';

interface Props {
    params: {
        id: string
    }
}

export default async function ProductVariantPage({ params }: Props) {
    const { id } = params
    let productdb;
    const product = await getProductIDV2(id).then(
        (resp) => productdb = resp.product
    )

    console.log(productdb)
    const sizes = await ListSize()
    const colors = await ListColor()
    const colorsProduct = await listColorProduct(id)
    return (
        <div>
            {
                productdb ? <VariantForm colorsProduct={colorsProduct} product={productdb} colors={colors} sizes={sizes}></VariantForm> : <div>No hay Producto</div>
            }

        </div>

    );
}