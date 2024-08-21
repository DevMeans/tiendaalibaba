
import { ListCategory } from "@/actions/category";

import { ListTag } from "@/actions/tag";
import { getProductID } from "@/actions/product/get-product-id";
import ProductForm from "./ProductForm";
interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductBySlug({ params }: Props) {
    const categories = await ListCategory()
    const tags = await ListTag()
    const productById = await getProductID(params.slug)
    console.log(productById)
    return (
        <div className="flex items-center justify-center p-12">

            <div className="mx-auto w-full max-w-[550px]">
                <ProductForm categories={categories} tags={tags} product={productById} />
            </div>
        </div>
    );
}