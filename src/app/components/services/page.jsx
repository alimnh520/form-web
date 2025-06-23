import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className="bg-gray-100 h-screen w-full flex flex-col items-center justify-center px-20 bg-fixed bg-center sm:px-5 sm:pb-10 sm:h-auto">
            <div className="w-full h-80 flex flex-col space-y-5 items-center justify-center sm:h-auto sm:justify-start sm:mt-5">
                <h1 className='text-4xl font-semibold sm:text-2xl sm:text-center'>অনলাইন সংক্রান্ত সেবা</h1>
                <div className="w-11/12 h-auto grid grid-rows-2 grid-cols-4 gap-8 sm:gap-4 sm:grid-cols-2 sm:grid-rows-3 sm:h-auto sm:gap-y-5">
                    <Link href='/user/landing' className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-52 h-56 sm:justify-end sm:pb-2">
                        <div className=" absolute w-full h-10 rounded-md bg-[#59b8a0] top-0"></div>
                        <div className="size-20 flex items-center justify-center">
                            <img src="/logos/1732162861.webp" alt="" />
                        </div>
                        <h1 className='text-2xl sm:text-xl text-center font-semibold'>মিউটেশন</h1>

                    </Link>
                    <Link href='/user/landing' className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-52 h-56 sm:justify-end sm:pb-2">
                        <div className=" absolute w-full h-10 rounded-md bg-[#fcb227] top-0"></div>
                        <div className="size-20 flex items-center justify-center">
                            <img src="/logos/1732789801.webp" alt="" />
                        </div>
                        <h1 className='text-2xl sm:text-xl text-center font-semibold'>ভূমি উন্নয়ন কর</h1>

                    </Link>
                    <Link href='/user/landing' className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-52 h-56 sm:justify-end sm:pb-2">
                        <div className=" absolute w-full h-10 rounded-md bg-[#9cbf3d] top-0"></div>
                        <div className="size-20 flex items-center justify-center">
                            <img src="/logos/1732941934.webp" alt="" />
                        </div>
                        <h1 className='text-2xl sm:text-xl text-center font-semibold'>ভূমি রেকর্ড ও ম্যাপ</h1>

                    </Link>

                    <Link href='/user/landing' className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-52 h-56 sm:justify-end sm:pb-2">
                        <div className=" absolute w-full h-10 rounded-md bg-[#9ac867] top-0"></div>
                        <div className="size-20 flex items-center justify-center border-[6px] border-[#9ac867] bg-[url('/logos/unnamed.png')] bg-cover bg-center">
                        </div>
                        <h1 className='text-2xl sm:text-xl text-center font-semibold'>মৌজা ম্যাপ</h1>

                    </Link>
                    <Link href='/user/landing' className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-52 h-56 sm:justify-end sm:pb-2">
                        <div className=" absolute w-full h-10 rounded-md bg-[#007d4d] top-0"></div>
                        <div className="size-20 flex items-center justify-center border-[6px] border-[#007d4d] bg-[url('/logos/images.png')] bg-cover bg-center">
                        </div>
                        <h1 className='text-2xl sm:text-xl text-center font-semibold'>NID সংক্রান্ত সেবা</h1>

                    </Link>
                    <Link href='/user/landing' className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-52 h-56 sm:justify-end sm:pb-2">
                        <div className=" absolute w-full h-10 rounded-md bg-[#365e3c] top-0"></div>
                        <div className="size-20 flex items-center justify-center border-[6px] border-[#365e3c] bg-[url('/logos/BD-1-423x601.webp')] bg-cover bg-center">
                        </div>
                        <h1 className='text-2xl sm:text-xl text-center font-semibold'>পাসপোর্ট সংক্রান্ত সেবা</h1>

                    </Link>

                    <Link href='/user/landing' className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-52 h-56 sm:justify-end sm:pb-2">
                        <div className=" absolute w-full h-10 rounded-md bg-[#4072b7] top-0"></div>
                        <div className="size-20 flex items-center justify-center border-[6px] border-[#4072b7] bg-[url('/logos/7af26598c5a44fa496e399a83d5393fcc3ffdca60898bc81.jpg')] bg-cover bg-center">
                        </div>
                        <h1 className='text-2xl sm:text-xl text-center font-semibold'>জন্মনিবন্ধন সেবা</h1>

                    </Link>

                    <Link href='/user/landing' className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-52 h-56 sm:justify-end sm:pb-2">
                        <div className=" absolute w-full h-10 rounded-md bg-[#f60100] top-0"></div>
                        <div className="size-20 flex items-center justify-center border-[6px] border-[#0b5400] bg-[url('/logos/Emblem_of_Bangladesh_Road_Transport_Authority_(BRTA).svg.png')] bg-cover bg-center">
                        </div>
                        <h1 className='text-2xl sm:text-xl text-center font-semibold'>BRTA সংক্রান্ত সেবা</h1>

                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page