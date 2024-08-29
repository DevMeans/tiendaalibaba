import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    description: string;
    slug: string;
    categoryId: string;
    estado: string
    images: ProductImage[];
}

export interface ProductImage {
    id: string;
    productId: string;
    imageUrl: string;
}
interface Props {
    product: Product
}
export default function SwiperProductComponent({ product }: Props) {
    const { images } = product
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    return (
        <>
            <Swiper
                style={{
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {
                    images.map((image) => (

                        <SwiperSlide key={image.id}>
                            <Image src={image.imageUrl} width={500} height={500} alt={product.name} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    images.map((image) => (
                        <SwiperSlide key={image.id} >
                            <Image src={image.imageUrl} width={500} height={500} alt={product.name} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
}