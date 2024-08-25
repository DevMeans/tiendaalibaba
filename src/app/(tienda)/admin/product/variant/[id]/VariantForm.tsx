'use client'
import { useState } from "react";
import Image from "next/image";
import { Color } from "@/interfaces/color.interface";
import { Size } from "@/interfaces/size.interface";
import './style.css';
import { createProductColor } from "@/actions/color-product-variant/create-color-product";

interface Product {
    id: string;
    name: string;
    description: string;
    slug: string;
    categoryId: string;
    images: ProductImage[];
    variants: any[];
}

export interface ProductImage {
    id: string;
    productId: string;
    imageUrl: string;
}

interface Props {
    product: Product;
    colors: Color[];
    sizes: Size[];
    colorsProduct: any[]
}


export default function VariantForm({ product, colors, sizes, colorsProduct }: Props) {
    console.log(colorsProduct)
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [filteredColors, setFilteredColors] = useState<Color[]>([]);
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value) {
            const filtered = colors.filter(color =>
                color.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredColors(filtered);
        } else {
            setFilteredColors([]);
        }
    };

    const handleColorSelect = (color: Color) => {
        setInputValue(color.name);
        setSelectedColor(color);
        setFilteredColors([]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && filteredColors.length > 0) {
            handleColorSelect(filteredColors[0]);
        }
    };

    const handleAddVariant = async () => {
        if (selectedColor && selectedImage) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                if (typeof reader.result === "string") {
                    const base64Image = reader.result; // Incluye todo el string, incluyendo 'data:image/png;base64,'

                    const variantData = {
                        productId: product.id,
                        colorId: selectedColor.id,
                        image: base64Image, // Envía la imagen como base64 incluyendo el prefijo
                    };
                    console.log(variantData);
                    const creatingProductColor = await createProductColor(variantData);
                    console.log(creatingProductColor);
                }
            };
            reader.readAsDataURL(selectedImage); // Esto automáticamente agrega el prefijo correcto basado en el tipo de archivo
        } else {
            alert("Por favor, selecciona un color y una imagen.");
        }
    };
    const eliminarColorProduct = async (item: any) => {
        const { productId, imageUrl, color } = item
        const { id } = color
        console.log({ productId, id, imageUrl }) //TODO :  LLAMAR
    }

    return (
        <div className="m-auto max-w-[1200px] p-10">
            <div className="flex flex-wrap justify-center items-center gap-5 ">
                <div className="flex items-center bg-slate-100 border rounded-lg">
                    <div>
                        <Image
                            src={
                                product.images.length !== 0
                                    ? product.images[0].imageUrl
                                    : "https://res.cloudinary.com/personal-proyect/image/upload/v1637884570/samples/cloudinary-logo-vector.svg"
                            }
                            alt={product.name}
                            width={200}
                            height={200}
                            className="w-28 h-auto rounded-s-lg"
                        />
                    </div>
                    <div className="items-center px-4">
                        <span className="text-2xl font-semibold ">{product.name}</span>
                    </div>
                </div>
                <div className="border flex flex-col sm:flex-row gap-2 p-5">
                    <div className="flex items-center justify-center gap-2">
                        <label className="cursor-pointer ">
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <div className="bg-blue-500 text-white px-4 py-2 rounded">
                                Imagen
                            </div>
                        </label>

                        {imagePreview && (
                            <div>
                                <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    className="max-w-full h-auto"
                                    width={50}
                                    height={50}
                                />
                            </div>
                        )}
                    </div>
                    <div className="team-list relative">
                        <div className="flex items-center">
                            {selectedColor && (
                                <div
                                    style={{ backgroundColor: selectedColor.hexCode }}
                                    className="w-4 h-4 rounded-full mr-2"
                                ></div>
                            )}
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Search by color"
                                className="search-input"
                            />
                        </div>

                        {filteredColors.length > 0 && (
                            <div className="options-list">
                                {filteredColors.map((color) => (
                                    <div
                                        key={color.id}
                                        className="option flex items-center gap-2"
                                        onClick={() => handleColorSelect(color)}
                                    >
                                        <div
                                            style={{ backgroundColor: color.hexCode }}
                                            className="w-4 h-4 rounded-full"
                                        ></div>
                                        <span>{color.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="p-2 bg-black text-white rounded-sm w-full sm:w-7"
                            onClick={handleAddVariant}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-6"></div>
            <div className="flex gap-2 ">
                {
                    colorsProduct.map((item) => (
                        <div key={item.id} className="bg-slate-100 text-center relative">
                            <Image src={item.imageUrl} width={50} height={50} alt={item.id} className="mx-auto"></Image>
                            {item.color.name}
                            <button onClick={() => eliminarColorProduct(item)} className="px-1 text-sm font-semibold text-white bg-red-500 rounded-full absolute top-0 right-0">
                                x
                            </button>
                        </div>
                    ))
                }
            </div>
            <div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-100">
                            <th>talla</th>
                            <th>color</th>
                            <th>precio</th>
                            <th>imagen</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    );
}
