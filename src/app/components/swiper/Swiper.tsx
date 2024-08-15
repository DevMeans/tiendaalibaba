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
export default function SwiperProductComponent() {
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
                <SwiperSlide>
                    <Image src="https://s.alicdn.com/@sc04/kf/Ha2c3a8377db3420a9a11b11495421e9aI.jpg" width={500} height={500} alt='' />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="https://s.alicdn.com/@sc04/kf/H72a1e3bc39a043789e809d3babd8bb251.jpg" width={500} height={500} alt='' />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="https://s.alicdn.com/@sc04/kf/H985f6e0614034c91b9d8e7bcf422bab7J.jpg" width={500} height={500} alt='' />
                </SwiperSlide>

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
                <SwiperSlide>
                    <Image src="https://s.alicdn.com/@sc04/kf/Ha2c3a8377db3420a9a11b11495421e9aI.jpg" width={500} height={500} alt='' />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="https://s.alicdn.com/@sc04/kf/H72a1e3bc39a043789e809d3babd8bb251.jpg" width={500} height={500} alt='' />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="https://s.alicdn.com/@sc04/kf/H985f6e0614034c91b9d8e7bcf422bab7J.jpg" width={500} height={500} alt='' />
                </SwiperSlide>
            </Swiper>
        </>
    );
}