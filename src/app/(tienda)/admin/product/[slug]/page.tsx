import CheckBoxComponent from "@/app/components/checkbox/CheckBox";
import ImageUploader from "@/app/components/uploading/Uploading";
import { ProductForm } from "./ProductForm";

interface Props {
    params: {
        slug: string;
    }
}

export default function ProductBySlug({ params }: Props) {
    console.log(params)
    return (

        <div className="flex items-center justify-center p-12">

            <div className="mx-auto w-full max-w-[550px]">
                <ProductForm product={ } size={ } color={ } />
            </div>
        </div>
    );
}