'use client'
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { UseFormSetValue } from 'react-hook-form';

type SelectedImage = {
    file: File;
    url: string;
};

interface ImageUploaderProps {
    setValue: UseFormSetValue<any>;
    fieldName: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setValue, fieldName }) => {
    const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const imagesArray = files.map((file) => ({
                file,
                url: URL.createObjectURL(file),
            }));
            setSelectedImages((prevImages) => {
                const updatedImages = prevImages.concat(imagesArray);
                setValue(fieldName, updatedImages.map(image => image.file)); // Actualiza el valor en el formulario
                return updatedImages;
            });
        }
    };

    const handleRemoveImage = (url: string) => {
        setSelectedImages((prevImages) => {
            const updatedImages = prevImages.filter((image) => image.url !== url);
            setValue(fieldName, updatedImages.map(image => image.file)); // Actualiza el valor en el formulario
            return updatedImages;
        });
    };

    return (
        <div className="flex flex-col items-center p-4">
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4"
            />
            <div className="grid grid-cols-3 gap-4 mb-4">
                {selectedImages.map((image, index) => (
                    <div key={index} className="relative w-32 h-32">
                        <Image className='object-cover inset-0 w-full h-full'
                            src={image.url}
                            alt={`preview ${index}`}
                            width={300}
                            height={300}

                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleRemoveImage(image.url);
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full text-xs hover:bg-red-600"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;
