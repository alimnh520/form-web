"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { IoIosMail } from "react-icons/io";
import ServiceText from "./ServiceText";

const Home = () => {

    // useEffect(() => {
    //     async function userData() {
    //         const data = await fetch("https://gateway.dlrms.land.gov.bd/core-api/api/public/upazilas?ROW_STATUS=1", {
    //             method: "GET",
    //             headers: {
    //                 "accept": "application/json",
    //                 "authorization": "CeLXPBxf57slkbu7sphGuQ8oyasOwuOO",
    //                 "user-token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJMU0cteGZlLU1ZWGQ2T0NjNHNtSkFrLTIwMjQxMTIwLUxJVkUiLCJqdGkiOiIwZTIzYzQ4YTM4MzcyYWM2ZTI5MTdhODMzYjdlNWVhYWU3MzZmOTNiYTI0YTU1M2E5MzM0OTU2Zjk1MGY2YzZkYmE3YzM5ZTZkYWU5ODZiYSIsImlhdCI6MTc0NTUwNTAxMC42NzQ5NDEsIm5iZiI6MTc0NTUwNTAxMC42NzQ5NDQsImV4cCI6MTc0NTUwODU1MC42MjczMjIsInN1YiI6IjI5OTM0NjMiLCJzY29wZXMiOlsidmlldy11c2VyIl19.UGgTwvhkEAgy5_DczXBq-n5yQqWK_svfKRPlYj6mW7JcZk4ReB7E3zTMBngGzgwU44orr8YhjiEImEsHvLAY-EbibN6QJzp5RMli06nlbbEnlZMdTb0RKPuUu3tRyZd9vaTUxqllHAoqrhrsP0tQT0NNj27rU2Tzz5Ots8KduhFpBrd52tCzrAzLNIn-oUsnA1adEUoqla2O1o46tr75E2xLB246ZbGMoIPcyxLYMa6RqapNjHw-QDHE_HkjfrLH1JmiZBL3nhQu8r9coJ1xiUxK93ijf0gcIWNQ59oD5d-T37SJ7nZiAphYSe09g8TEY1sDeayWy7pyTdWeRQUq3KnlhLM5ZQa0XjzHOhKEEuK4fQVb69ii3KUjbjH9OuVCDP7QxT3lC0afYdHdyWXd5w--CrYymMaF_yfe1YOkkN9jCKE1KyVlyOYRN5yav2iPz0HMSGlxalKypmnOMpCA45sNpj4sk9Aywq14KmG8YzFvWACWDYw6b2AhVsi3-KyKWvOEye4dBmwPWlaMGXjiMIvZ5z9Mp0AKAfhNPUUlRLY5rIJoaxkbCQ0URv8gKV-CVh3Qg9kd4I4jr4JhqIeMUQORatciCKHXodB0M_1hxHFO6a88hP72qiX6YO5j3ONd6lXB2FxN9kevKcIJrtqU0epV1bQvLJ3HvgQd7zfyshY" 
    //             }
    //         })
    //         console.log(data);
    //     }
    //     userData();
    // })

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
