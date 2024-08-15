'use client'
import Image from 'next/image';
import { useState } from 'react';

export default function CardProductComponent() {
    const img2 = 'https://rematexperu.com/cdn/shop/products/24_750x.png?v=1669909030'
    const img1 = 'https://rematexperu.com/cdn/shop/products/12_ff376886-e127-4bcd-b4b9-b385b6f0aaa8_750x.png?v=1669909030'
    const [displayImage, setDisplayImage] = useState(img1)
    return (
        <div className='w-full'>
            <Image
                onMouseEnter={() => setDisplayImage(img2)}
                onMouseLeave={() => setDisplayImage(img1)}
                className='w-full'
                src={displayImage} alt='s' width={300} height={300}></Image>
            <div className='text-center pl-3 pr-3 pb-3'>
                <h2 className='text-lg font-semibold'>
                    Polo oversize Layout
                </h2>
                <p className='mb-2'>
                    S/ 200
                </p>
                <button className='p-2 bg-black text-white font-bold'>Detalles</button>
            </div>
        </div>
    );
}