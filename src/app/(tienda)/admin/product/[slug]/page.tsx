
import { ListCategory } from "@/actions/category";
import { ProductForm } from "./ProductForm";
import { ListTag } from "@/actions/tag";
import { ListSize } from "@/actions/size";
import { ListColor } from "@/actions/color";

interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductBySlug({ params }: Props) {
    const categories = await ListCategory()
    const tags = await ListTag()
    const sizes = await ListSize()
    const colors = await ListColor()
    return (

        <div className="flex items-center justify-center p-12">

            <div className="mx-auto w-full max-w-[550px]">
                {
                    <ProductForm categories={categories} tags={tags} sizes={sizes} colors={colors} />
                }

            </div>
        </div>
    );
}