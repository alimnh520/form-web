'use client'
import Link from "next/link";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const ServiceText = () => {
    const [q1, setQ1] = useState(false);
    const [q2, setQ2] = useState(false);
    const [q3, setQ3] = useState(false);
    const [q4, setQ4] = useState(false);
    return (
        <div className="w-full h-auto flex flex-col items-center justify-center gap-y-8 bg-[url('/bg/bg-map.png')] bg-center bg-no-repeat bg-cover sm:px-5" id="services">
            <h1 className="text-4xl font-thin sm:text-2xl">অনলাইন সংক্রান্ত সেবা</h1>

            <div className="w-11/12 h-auto grid grid-rows-2 grid-cols-4 gap-8 sm:grid-cols-2 sm:grid-rows-3 sm:h-auto sm:gap-3 sm:w-full">

                <div className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-52 h-56 sm:justify-end sm:pb-2">
                    <div className=" absolute w-full h-10 rounded-md bg-[#59b8a0] top-0"></div>
                    <div className="size-20 flex items-center justify-center">
                        <img src="/logos/1732162861.webp" alt="" />
                    </div>
                    <h1 className='text-2xl sm:text-xl text-center font-semibold'>মিউটেশন</h1>

                </div>
                <div className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-52 h-56 sm:justify-end sm:pb-2">
                    <div className=" absolute w-full h-10 rounded-md bg-[#fcb227] top-0"></div>
                    <div className="size-20 flex items-center justify-center">
                        <img src="/logos/1732789801.webp" alt="" />
                    </div>
                    <h1 className='text-2xl sm:text-xl text-center font-semibold'>ভূমি উন্নয়ন কর</h1>

                </div>
                <div className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-52 h-56 sm:justify-end sm:pb-2">
                    <div className=" absolute w-full h-10 rounded-md bg-[#9cbf3d] top-0"></div>
                    <div className="size-20 flex items-center justify-center">
                        <img src="/logos/1732941934.webp" alt="" />
                    </div>
                    <h1 className='text-2xl sm:text-xl text-center font-semibold'>ভূমি রেকর্ড ও ম্যাপ</h1>

                </div>

                <div className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-52 h-56 sm:justify-end sm:pb-2">
                    <div className=" absolute w-full h-10 rounded-md bg-[#4072b7] top-0"></div>
                    <div className="size-20 flex items-center justify-center border-[6px] border-[#4072b7] bg-[url('/logos/7af26598c5a44fa496e399a83d5393fcc3ffdca60898bc81.jpg')] bg-cover bg-center">
                    </div>
                    <h1 className='text-2xl sm:text-xl text-center font-semibold'>জন্মনিবন্ধন সেবা</h1>

                </div>
                <div className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-52 h-56 sm:justify-end sm:pb-2">
                    <div className=" absolute w-full h-10 rounded-md bg-[#007d4d] top-0"></div>
                    <div className="size-20 flex items-center justify-center border-[6px] border-[#007d4d] bg-[url('/logos/images.png')] bg-cover bg-center">
                    </div>
                    <h1 className='text-2xl sm:text-xl text-center font-semibold'>NID সংক্রান্ত সেবা</h1>

                </div>
                <div className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-52 h-56 sm:justify-end sm:pb-2">
                    <div className=" absolute w-full h-10 rounded-md bg-[#365e3c] top-0"></div>
                    <div className="size-20 flex items-center justify-center border-[6px] border-[#365e3c] bg-[url('/logos/BD-1-423x601.webp')] bg-cover bg-center">
                    </div>
                    <h1 className='text-2xl sm:text-xl text-center font-semibold'>পাসপোর্ট সংক্রান্ত সেবা</h1>

                </div>
            </div>

            <Link href="/components/services" className="px-10 py-4 bg-green-800 text-white text-lg font-semibold rounded-md mt-3">আরো সেবা</Link>

            <div className="w-full h-auto px-20 flex items-center justify-between mt-10 gap-x-10 sm:px-0 sm:flex-col sm:mt-5">

                <div className="w-2/3 flex flex-col gap-y-7 items-center justify-center sm:w-full">
                    <p className="text-4xl sm:text-3xl">সচরাচর জিজ্ঞাসা</p>
                    <div className="h-auto w-full flex flex-col items-center justify-center gap-y-4">
                        <div className={`w-full bg-green-700 flex flex-col items-center justify-center text-lg sm:text-base text-white font-semibold relative cursor-pointer rounded-md border border-green-700 hover:bg-white transition-all duration-300 hover:text-green-700 ${q1 ? 'h-40' : 'h-16'} overflow-hidden group`} onClick={() => {
                            setQ1(!q1);
                            setQ2(false);
                            setQ3(false);
                            setQ4(false);
                        }}>
                            <div className={`w-full h-16 absolute top-0 flex items-center justify-center sm:justify-start sm:px-2 ${q1 ? 'shadow-[0px_0px_10px_rgba(0,0,0,0.4)]' : 'shadow-none'}`}>
                                <p>পাসওয়ার্ড ভুলে গেলে কি নতুন করে রেজিস্ট্রেশন করতে হবে?</p>
                                <button className={`absolute transition-all duration-300 right-6 text-xl ${q1 ? 'rotate-45' : 'rotate-0'}`}><FaPlus /></button>
                            </div>

                            <p className="absolute top-20 text-center text-green-700">পাসওয়ার্ড ভুলে গেছেন? অপশনে ক্লিক করে (ওটিপি) যাচাইয়ের মাধ্যমে নতুন পাসওয়ার্ড সেট করে নিতে হবে।</p>
                        </div>
                        <div className={`w-full bg-green-700 flex flex-col items-center justify-center text-lg sm:text-base text-white font-semibold relative cursor-pointer rounded-md border border-green-700 hover:bg-white transition-all duration-300 hover:text-green-700 ${q2 ? 'h-40' : 'h-16'} overflow-hidden`} onClick={() => {
                            setQ1(false);
                            setQ2(!q2);
                            setQ3(false);
                            setQ4(false);
                        }}>
                            <div className={`w-full h-16 absolute top-0 flex items-center justify-center sm:justify-start sm:px-2 ${q2 ? 'shadow-[0px_0px_10px_rgba(0,0,0,0.4)]' : 'shadow-none'}`}>
                                <p>অনলাইন সেবা হটলাইন নম্বর কোনটি?</p>
                                <button className={`absolute transition-all duration-300 right-6 text-xl ${q2 ? 'rotate-45' : 'rotate-0'}`}><FaPlus /></button>
                            </div>

                            <p className="absolute top-20 text-center text-green-700">০১৮৫০৬৮৫০৩৩</p>
                        </div>
                        <div className={`w-full bg-green-700 flex flex-col items-center justify-center text-lg sm:text-base text-white font-semibold relative cursor-pointer rounded-md border border-green-700 hover:bg-white transition-all duration-300 hover:text-green-700 ${q3 ? 'h-40' : 'h-16'} overflow-hidden`} onClick={() => {
                            setQ1(false);
                            setQ2(false);
                            setQ3(!q3);
                            setQ4(false);
                        }}>
                            <div className={`w-full h-16 absolute top-0 flex items-center justify-center sm:justify-start sm:px-2 ${q3 ? 'shadow-[0px_0px_10px_rgba(0,0,0,0.4)]' : 'shadow-none'}`}>
                                <p>কখন প্রোফাইলের অগ্রগতি ১০০% হবে?</p>
                                <button className={`absolute transition-all duration-300 right-6 text-xl ${q3 ? 'rotate-45' : 'rotate-0'}`}><FaPlus /></button>
                            </div>

                            <p className="absolute top-20 text-center text-green-700">প্রোফাইলের সকল ইনফর্মেশন দিয়ে আপডেট করলেই প্রোফাইল অগ্রগতি ১০০% হবে।</p>
                        </div>
                        <div className={`w-full bg-green-700 flex flex-col items-center justify-center text-lg sm:text-base text-white font-semibold relative cursor-pointer rounded-md border border-green-700 hover:bg-white transition-all duration-300 hover:text-green-700 ${q4 ? 'h-40' : 'h-16'} overflow-hidden`} onClick={() => {
                            setQ1(false);
                            setQ2(false);
                            setQ3(false);
                            setQ4(!q4);
                        }}>
                            <div className={`w-full h-16 absolute top-0 flex items-center justify-center sm:justify-start sm:px-2 ${q4 ? 'shadow-[0px_0px_10px_rgba(0,0,0,0.4)]' : 'shadow-none'}`}>
                                <p>নিবন্ধন করার জন্য কি কোন নির্দিষ্ট সময়সীমা রয়েছে?</p>
                                <button className={`absolute transition-all duration-300 right-6 text-xl ${q4 ? 'rotate-45' : 'rotate-0'}`}><FaPlus /></button>
                            </div>

                            <p className="absolute top-20 text-center text-green-700">না, যেকোন সময় অনলাইনে নিবন্ধন করা যাবে।</p>
                        </div>
                    </div>
                    <div className="px-12 py-4 bg-green-800 text-white text-lg font-semibold rounded-md mt-3">আরো</div>
                </div>

                <div className="w-1/3 h-96 flex items-center justify-center sm:w-full sm:h-80">
                    <img src="/bg/home_faq22.webp" alt="" className="w-full h-full object-cover object-center sm:h-auto"/>
                </div>
            </div>
            <div className="w-[110%] h-auto flex flex-col items-center justify-center sm:w-[120%]">
                <img src="/bg/dhaka_line_2.webp" alt="" className="h-96 w-full object-center sm:h-auto"/>
                <div className="w-full h-7 bg-gradient-to-r from-white via-green-800 to-white"></div>
            </div>
        </div>
    );
};

export default ServiceText;
