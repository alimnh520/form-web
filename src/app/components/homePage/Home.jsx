"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { IoIosMail } from "react-icons/io";
import ServiceText from "./ServiceText";

const Home = () => {

    return (
        <div className="h-full w-auto flex flex-col gap-y-10 items-center justify-center px-10 sm:px-0">
            <div className="w-full h-auto flex items-center justify-between relative sm:flex-col sm:justify-center">
                <div className="w-1/2 h-96 flex items-center justify-center relative shadow-[0_10px_10px_rgba(0,0,0,0.2)] sm:w-full sm:h-80">
                    <p className=" absolute w-10/12 z-10 text-3xl font-semibold text-center top-10 text-green-800">
                        রাজিম ল্যান্ড সার্ভিস এন্ড কনসালটেন্ট{" "}
                        <span className="text-red-600">(অনলাইন)</span>
                    </p>
                    <Swiper
                        pagination={true}
                        slidesPerView={1}
                        spaceBetween={0}
                        modules={[Pagination]}
                        loop={true}
                        className="w-full h-full"
                    >
                        <SwiperSlide className="bg-[url('/land-tax/bangladesh-1.png')] bg-cover bg-center"></SwiperSlide>
                        <SwiperSlide className="bg-[url('/land-tax/bangladesh-foto-adobe-stock-136155386.jpeg')] bg-cover bg-center"></SwiperSlide>
                        <SwiperSlide className="bg-[url('/land-tax/468550365_1103217718167965_5910529357562950800_n.jpg')] bg-cover bg-center"></SwiperSlide>
                    </Swiper>
                </div>
                <div className="w-1/2 h-96 relative flex flex-col gap-y-7 items-center pt-10 justify-start sm:w-full sm:px-5 sm:h-auto sm:gap-y-3">
                    <p className="text-4xl font-thin sm:text-center sm:text-2xl">ভূমি সংক্রান্ত সহায়তার জন্য</p>
                    <p className="text-2xl text-green-700">কল করুন</p>
                    <p className="text-4xl font-semibold">০১৮৫০৬৮৫০৩৩</p>
                    <div className="flex mt-10 flex-col items-center justify-center gap-y-5 sm:mt-2 sm:gap-y-3">
                        <p className="flex items-center justify-center gap-x-3 text-2xl sm:text-lg"><span className="text-3xl -mt-1.5 sm:text-2xl sm:-mt-1"><IoIosMail /></span>অভিযোগ/প্রতিকার ব্যবস্থার জন্য</p>
                        <p className="text-2xl font-extrabold text-green-950">online@land.gov.bdl.tax</p>
                    </div>
                    <img
                        src="/bg/hero_bg_2.webp"
                        alt=""
                        className=" absolute w-8/12 bottom-0 sm:w-full"
                    />
                </div>
            </div>
            <ServiceText />
        </div>
    );
};

export default Home;
