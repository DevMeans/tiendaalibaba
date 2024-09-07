
import { ListSize } from '@/actions/size';
import VariantForm from './VariantForm';
import { getProductIDV2 } from "@/actions/product";
import { listColorProduct } from '../../../../../../actions/color-product-variant/list-color-product';
import { listSizeProduct } from '@/actions/size-color-variant/list-size-product';
import { ListColorPublic } from '@/actions/color/list-color';

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
    const sizes = await ListSize()
    const colors = await ListColorPublic()
    const colorsProduct = await listColorProduct(id)
    const sizeProduct = await listSizeProduct(id)
    return (
        <div>
            {
                productdb ? <VariantForm sizeProduct={sizeProduct} colorsProduct={colorsProduct} product={productdb} colors={colors} sizes={sizes}></VariantForm> : <div>No hay Producto</div>
            }
        </div>

    );
}