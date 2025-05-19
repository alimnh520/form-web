'use client'
import { TbClipboardSearch } from "react-icons/tb";
import { PiClipboardTextThin } from "react-icons/pi";
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

const page = () => {


    return (
        <div className='w-full h-auto flex flex-col cursor-pointer'>
            <div className="w-full h-80 flex items-center justify-center bg-[url('/bg/carousel-back.jpg')] bg-cover bg-center text-white">
                <Swiper
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="mySwiper"
                >
                    <SwiperSlide className=''>
                        <p className='relative top-1/2 -translate-y-1/2 text-3xl font-medium'>ভূমি রেকর্ড ও ম্যাপ সেবায় আপনাকে স্বাগতম</p>
                    </SwiperSlide>
                    <SwiperSlide className=''>Slide 2</SwiperSlide>
                    <SwiperSlide className=''>Slide 3</SwiperSlide>
                </Swiper>
            </div>

            <div className="w-full flex flex-col px-12 mt-8">
                <div className="w-full h-auto px-6 py-9 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.2)] ">
                    <div className="h-28 w-full grid grid-cols-5 gap-4 px-3">
                        <div className="rounded-xl shadow-[0_0_5px_rgba(0,0,0,0.05),1px_3px_10px_rgba(0,0,0,0.1)] hover:bg-green-700 hover:text-white transition-all duration-300 flex flex-col gap-y-3 items-center justify-center group">
                            <span className='text-green-700 group-hover:text-white text-5xl transition-all duration-300'>
                                <PiClipboardTextThin />
                            </span>
                            <p className="text-lg font-semibold">সার্ভে খতিয়ান</p>
                        </div>
                        <div className="rounded-xl shadow-[0_0_5px_rgba(0,0,0,0.05),1px_3px_10px_rgba(0,0,0,0.1)] hover:bg-green-700 hover:text-white transition-all duration-300 flex flex-col gap-y-3 items-center justify-center group">
                            <span className='text-green-700 group-hover:text-white text-5xl transition-all duration-300'>Hello</span>
                            <p className="text-lg font-semibold">নামজারি খতিয়ান</p>
                        </div>
                        <div className="rounded-xl shadow-[0_0_5px_rgba(0,0,0,0.05),1px_3px_10px_rgba(0,0,0,0.1)] hover:bg-green-700 hover:text-white transition-all duration-300 flex flex-col gap-y-3 items-center justify-center group">
                            <span className='text-green-700 group-hover:text-white text-5xl transition-all duration-300'><TbClipboardSearch /></span>
                            <p className="text-lg font-semibold">মৌজা ম্যাপ</p>
                        </div>
                        <div className="rounded-xl shadow-[0_0_5px_rgba(0,0,0,0.05),1px_3px_10px_rgba(0,0,0,0.1)] hover:bg-green-700 hover:text-white transition-all duration-300 flex flex-col gap-y-3 items-center justify-center group">
                            <span className='text-green-700 group-hover:text-white text-5xl transition-all duration-300'>Hello</span>
                            <p className="text-lg font-semibold">আবেদনের অবস্থা</p>
                        </div>
                        <div className="rounded-xl shadow-[0_0_5px_rgba(0,0,0,0.05),1px_3px_10px_rgba(0,0,0,0.1)] hover:bg-green-700 hover:text-white transition-all duration-300 flex flex-col gap-y-3 items-center justify-center group">
                            <span className='text-green-700 group-hover:text-white text-5xl transition-all duration-300'>Hello</span>
                            <p className="text-lg font-semibold">নির্দেশিকা</p>
                        </div>
                    </div>

                    <marquee
                        onMouseOver={(e) => e.target.stop()}
                        onMouseOut={(e) => e.target.start()}
                        className='mt-5 text-lg font-semibold text-red-600'
                    >
                        এখন থেকে খতিয়ানের কিউ আর কোড সম্বলিত অনলাইন/তাৎক্ষনিক কপি ১০০ টাকার বিনিময়ে পাওয়া যাচ্ছে। এছাড়াও সার্টিফাইড/সত্যায়িত খতিয়ান কপির মূল্য পুন:নির্ধারণ করে ১০০ টাকা করা হয়েছে।
                    </marquee>

                    <p className="text-3xl font-bold text-green-700 mt-5">মৌজা ম্যাপের তথ্য</p>

                    <div className="w-full h-80 grid grid-cols-[1fr_1fr_1fr_145px_1fr_1fr] rounded-tl-xl rounded-tr-xl border border-[#cccccc] mt-3 divide-x divide-solid divide-[#cccccc] overflow-hidden">
                        <div className="grid grid-rows-[48px_1fr] h-full overflow-y-scroll">

                            <div className="w-full h-12 pl-5 flex items-center justify-start border-b border-b-[#cccccc] font-bold bg-gradient-to-t from-[#ecffe0] from-10% to-white">বিভাগ</div>

                            <div className="w-full overflow-y-scroll division">
                                <div className="w-full h-12 pl-5 flex items-center justify-start border-b border-b-[#cccccc]"></div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full h-12 pl-5 flex items-center justify-start border-b border-b-[#cccccc] font-bold bg-gradient-to-t from-[#ecffe0] from-10% to-white">জেলা</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full h-12 pl-5 flex items-center justify-start border-b border-b-[#cccccc] font-bold bg-gradient-to-t from-[#ecffe0] from-10% to-white">উপজেলা/থানা</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full h-12 pl-5 flex items-center justify-start border-b border-b-[#cccccc] font-bold bg-gradient-to-t from-[#ecffe0] from-10% to-white">সার্ভে টাইপ</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full h-12 pl-5 flex items-center justify-start border-b border-b-[#cccccc] font-bold bg-gradient-to-t from-[#ecffe0] from-10% to-white">মৌজা</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full h-12 pl-5 flex items-center justify-start border-b border-b-[#cccccc] font-bold bg-gradient-to-t from-[#ecffe0] from-10% to-white">সিট নং</div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default page