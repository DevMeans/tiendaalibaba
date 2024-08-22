
import { ListSize } from '@/actions/size';
import VariantForm from './VariantForm';
import { getProductIDV2 } from "@/actions/product";
import { ListColor } from '@/actions/color';

interface Props {
    params: {
        id: string
    }
}

export default async function ProductVariantPage({ params }: Props) {
    const { id } = params
    const product = await getProductIDV2(id)
    const sizes = await ListSize()
    const colors = await ListColor()
    return (
        <div>
            <VariantForm productresp={product} colors={colors} sizes={sizes}></VariantForm>
        </div>

    );
}