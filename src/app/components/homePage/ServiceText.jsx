import React from 'react'
import { FaStar } from 'react-icons/fa';

const ServiceText = () => {
    return (
        <div className='flex flex-col items-start justify-start space-y-10'>
            <p className='text-4xl w-1/2 text-start leading-relaxed text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] font-semibold border-b-4 border-b-gray-600 border-dotted sm:w-full sm:text-3xl'>রাজিম ল্যান্ড সার্ভিস এন্ড কনসালটেন্ট (অনলাইন)</p>

            <div className="flex flex-col items-start justify-start space-y-5">
                <p className='flex items-center justify-center text-lg font-bold text-white shadow-[2px_2px_2px_red] py-2 px-5 sm:px-3 sm:justify-start bg-gray-400'>
                    <span className='-mt-2 text-2xl drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] mr-5 sm:mr-3'><FaStar /> </span>
                    ই- নামজারি আবেদন
                </p>
                <p className='flex items-center justify-center text-lg font-bold text-white shadow-[2px_2px_2px_red] py-2 px-5 sm:px-3 sm:justify-start bg-gray-400'>
                    <span className='-mt-2 text-2xl drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] mr-5 sm:mr-3'><FaStar /> </span>
                    ই খতিয়ান উত্তোলন
                </p>
                <p className='flex items-center justify-center text-lg font-bold text-white shadow-[2px_2px_2px_red] py-2 px-5 sm:px-3 sm:justify-start bg-gray-400'>
                    <span className='-mt-2 text-2xl drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] mr-5 sm:mr-3'><FaStar /> </span>
                    মৌজা ম্যাপ উত্তোলন
                </p>
                <p className='flex items-center justify-center text-lg font-bold text-white shadow-[2px_2px_2px_red] py-2 px-5 sm:px-3 sm:justify-start bg-gray-400'>
                    <span className='-mt-2 text-2xl drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] mr-5 sm:mr-3'><FaStar /> </span>
                    ভূমি উন্নয়ন কর সার্ভিস
                </p>
                <p className='flex items-center justify-center text-lg font-bold text-white shadow-[2px_2px_2px_red] py-2 px-5 sm:px-3 sm:justify-start bg-gray-400'>
                    <span className='-mt-2 text-2xl drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] mr-5 sm:mr-3'><FaStar /> </span>
                    এনআইডি/ স্মাট কার্ড উত্তোলন
                </p>
            </div>
        </div>
    )
}

export default ServiceText