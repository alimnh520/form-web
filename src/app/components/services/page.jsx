import Link from 'next/link';
import React from 'react'
import { FaFingerprint } from "react-icons/fa";

const page = () => {
    return (
        <div className="bg-gray-100 h-screen w-full flex flex-col items-center justify-center px-20 bg-fixed bg-center sm:px-5 sm:pb-10">
            <div className="w-full h-80 flex flex-col space-y-5 items-center justify-center sm:h-auto sm:justify-start sm:mt-5">
                <h1 className='text-4xl font-semibold sm:text-2xl'>ভূমি সংক্রান্ত সেবা</h1>
                <div className="w-11/12 h-auto grid grid-rows-2 grid-cols-4 gap-8 sm:gap-x-0 sm:grid-cols-1 sm:grid-rows-3 sm:h-auto sm:gap-y-5">
                    <Link href="components/services/land-tax" className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:h-52 h-56">
                        <div className=" absolute w-full h-10 rounded-md bg-[#59b8a0] top-0"></div>
                        <div className="size-20 flex items-center justify-center">
                            <img src="/logos/1732162861.webp" alt="" />
                        </div>
                        <h1 className='text-2xl font-semibold'>মিউটেশন</h1>

                    </Link>
                    <Link href="/components/services/land-tax2" className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:h-52 h-56">
                        <div className=" absolute w-full h-10 rounded-md bg-[#fcb227] top-0"></div>
                        <div className="size-20 flex items-center justify-center">
                            <img src="/logos/1732789801.webp" alt="" />
                        </div>
                        <h1 className='text-2xl font-semibold'>ভূমি উন্নয়ন কর</h1>

                    </Link>
                    <Link href="/components/services/land-tax3" className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:h-52 h-56">
                        <div className=" absolute w-full h-10 rounded-md bg-[#9cbf3d] top-0"></div>
                        <div className="size-20 flex items-center justify-center">
                            <img src="/logos/1732941934.webp" alt="" />
                        </div>
                        <h1 className='text-2xl font-semibold'>ভূমি রেকর্ড ও ম্যাপ</h1>

                    </Link>

                    <Link href="" className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:h-52 h-56">
                        <div className=" absolute w-full h-10 rounded-md bg-[#4072b7] top-0"></div>
                        <div className="size-20 flex items-center justify-center border-[6px] border-[#4072b7] bg-[url('/logos/7af26598c5a44fa496e399a83d5393fcc3ffdca60898bc81.jpg')] bg-cover bg-center">
                        </div>
                        <h1 className='text-2xl font-semibold'>জন্মনিবন্ধন সেবা</h1>

                    </Link>
                    <Link href="" className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:h-52 h-56">
                        <div className=" absolute w-full h-10 rounded-md bg-[#007d4d] top-0"></div>
                        <div className="size-20 flex items-center justify-center border-[6px] border-[#007d4d] bg-[url('/logos/images.png')] bg-cover bg-center">
                        </div>
                        <h1 className='text-2xl font-semibold'>NID সংক্রান্ত সেবা</h1>

                    </Link>
                    <Link href="" className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:h-52 h-56">
                        <div className=" absolute w-full h-10 rounded-md bg-[#365e3c] top-0"></div>
                        <div className="size-20 flex items-center justify-center border-[6px] border-[#365e3c] bg-[url('/logos/BD-1-423x601.webp')] bg-cover bg-center">
                        </div>
                        <h1 className='text-2xl font-semibold'>পাসপোর্ট সংক্রান্ত সেবা</h1>

                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page