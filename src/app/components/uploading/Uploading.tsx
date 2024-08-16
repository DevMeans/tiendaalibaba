'use client'
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';

type SelectedImage = {
    file: File;
    url: string;
};

const ImageUploader = () => {
    const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const imagesArray = files.map((file) => ({
                file,
                url: URL.createObjectURL(file),
            }));
            setSelectedImages((prevImages) => prevImages.concat(imagesArray));
        }
    };

    const handleUpload = () => {
        // Aquí se manejaría la lógica de subida de las imágenes al servidor
        alert('Subiendo imágenes...');
    };

    const handleRemoveImage = (url: string) => {
        setSelectedImages((prevImages) =>
            prevImages.filter((image) => image.url !== url)
        );
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
                        <Image
                            src={image.url}
                            alt={`preview ${index}`}
                            layout="fill"
                            objectFit="cover"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault(); // Previene la acción predeterminada del evento.
                                handleRemoveImage(image.url);
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full text-xs hover:bg-red-600"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
            {
                /** 
                 *    <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Subir Imágenes
              </button> */
            }

        </div>
    );
};

export default ImageUploader;
