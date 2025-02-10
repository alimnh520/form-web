'use client'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import ServiceText from './ServiceText';

const Home = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    const text = "";

    return (
        <div className='w-full h-auto flex flex-col items-start justify-center scroll-smooth relative'>
            <div className="w-full h-[500px] sm:h-auto">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    className="mySwiper w-full h-full"
                >
                    <SwiperSlide className="w-full h-full bg-[url('/land-tax/bangladesh-1.png')] bg-cover bg-center p-20 sm:p-5">
                        <ServiceText text={text}/>
                    </SwiperSlide>
                    <SwiperSlide className="w-full h-full bg-[url('/land-tax/bangladesh-foto-adobe-stock-136155386.jpeg')] bg-cover bg-center p-20 sm:p-5">
                        <ServiceText text={text}/>
                    </SwiperSlide>
                    <SwiperSlide className="w-full h-full bg-[url('/land-tax/468550365_1103217718167965_5910529357562950800_n.jpg')] bg-cover bg-center p-20 sm:p-5">
                        <ServiceText text={text}/>
                    </SwiperSlide>

                    <div className="autoplay-progress sm:hidden" slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                    </div>
                </Swiper>
            </div>
        </div>
    )
}

export default Home