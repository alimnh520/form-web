import Link from 'next/link';
import React from 'react'
import { FaFingerprint } from "react-icons/fa";

const page = () => {
    return (
        <div className="bg-gray-100 h-screen w-full flex flex-col items-center justify-center px-20 bg-fixed bg-center sm:px-5 sm:pb-10">
            <div className="w-full h-80 flex flex-col space-y-5 items-center justify-center sm:h-auto sm:justify-start sm:mt-5">
                <h1 className='text-4xl font-semibold sm:text-2xl'>ভূমি সংক্রান্ত সেবা</h1>
                <div className="w-10/12 h-60 grid grid-rows-1 grid-cols-3 gap-x-10 sm:gap-x-0 sm:grid-cols-1 sm:grid-rows-3 sm:h-auto sm:gap-y-5">
                    <Link href="/components/services/land-tax3" className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:h-52">
                        <div className=" absolute w-full h-10 rounded-md bg-blue-950 top-0"></div>
                        <div className="size-20 flex items-center justify-center">
                            <img src="/logos/1732162861.webp" alt="" />
                        </div>
                        <h1 className='text-2xl font-semibold'>মিউটেশন</h1>

                    </Link>
                    <Link href="/components/services/land-tax2" className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:h-52">
                        <div className=" absolute w-full h-10 rounded-md bg-purple-600 top-0"></div>
                        <div className="size-20 flex items-center justify-center">
                            <img src="/logos/1732789801.webp" alt="" />
                        </div>
                        <h1 className='text-2xl font-semibold'>ভূমি উন্নয়ন কর</h1>

                    </Link>
                    <Link href="/components/services/land-tax" className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-end pb-5 relative space-y-5 sm:h-52">
                        <div className=" absolute w-full h-10 rounded-md bg-teal-500 top-0"></div>
                        <div className="size-20 flex items-center justify-center">
                            <img src="/logos/1732941934.webp" alt="" />
                        </div>
                        <h1 className='text-2xl text-center font-semibold'>ভূমি রেকর্ড ও ম্যাপ</h1>

                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page