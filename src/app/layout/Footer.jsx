import Link from 'next/link';
import React from 'react'
import { MdArrowRight } from "react-icons/md";
import { FaFacebookSquare, FaTwitterSquare, FaWhatsappSquare, FaYoutubeSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='w-full h-96 bg-green-100 text-black mt-7 pt-16 px-10 flex items-center justify-between gap-x-8'>
            <div className="h-full w-auto flex flex-col items-center justify-start gap-y-4">
                <p className='text-2xl text-green-800 self-start ml-10'>গুরুত্বপূর্ণ লিঙ্ক</p>
                <div className="w-full h-auto flex items-start justify-between gap-x-5">
                    <div className="flex flex-col items-start">
                        <p className='flex items-center justify-start'><span className='text-4xl text-green-800'><MdArrowRight /></span>বাংলাদেশ জাতীয় তথ্য বাতায়ন</p>
                        <p className='flex items-center justify-start'><span className='text-4xl text-green-800'><MdArrowRight /></span>ভূমি মন্ত্রণালয়</p>
                        <p className='flex items-center justify-start'><span className='text-4xl text-green-800'><MdArrowRight /></span>তথ্য অধিদপ্তর (পিআইডি)</p>
                        <p className='flex items-center justify-start'><span className='text-4xl text-green-800'><MdArrowRight /></span>অভিযোগ প্রতিকার ব্যবস্থা</p>
                    </div>
                    <div className="flex flex-col items-start">
                        <p className='flex items-center justify-start'><span className='text-4xl text-green-800'><MdArrowRight /></span>গোপনীয়তা নীতি</p>
                        <p className='flex items-center justify-start'><span className='text-4xl text-green-800'><MdArrowRight /></span>সাধারণ জিজ্ঞাসা</p>
                        <p className='flex items-center justify-start'><span className='text-4xl text-green-800'><MdArrowRight /></span>যোগাযোগ</p>
                    </div>
                </div>
            </div>
            <div className="w-auto h-full flex items-center justify-center gap-x-8">
                <div className="w-auto h-full flex flex-col items-center justify-start gap-y-5">
                    <p className='text-xl'>পরিকল্পনা ও বাস্তবায়নে</p>
                    <div className="flex flex-col items-center justify-center gap-y-4">
                        <p>রাজিম ল্যান্ড সার্ভিস এন্ড কনসালটেন্ট (অনলাইন)</p>
                        <img src="/logos/logo2-1024x259.jpg" alt="" className='h-28' />
                    </div>
                </div>
                <div className="w-auto h-full flex flex-col items-center justify-start gap-y-5">
                    <p className='text-xl'>অ্যাপ ডাউনলোড করুন</p>
                    <div className="flex items-center justify-center gap-x-5 ">
                        <Link href="">
                            <img src="/logos/play_store.webp" alt="" className='w-32 h-10'/>
                        </Link>
                        <Link href="">
                            <img src="/logos/ios_store.webp" alt="" className='w-32 h-10'/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-auto h-full flex flex-col items-center justify-start gap-y-4">
                <p className='text-xl'>সামাজিক যোগাযোগ</p>
                <div className="flex items-center justify-center gap-x-3">
                    <Link href="" className='text-4xl text-blue-700'><FaFacebookSquare /></Link>
                    <Link href="" className='text-4xl text-green-700'><FaWhatsappSquare /></Link>
                    <Link href="" className='text-4xl text-red-600'><FaYoutubeSquare /></Link>
                    <Link href="" className='text-4xl text-blue-900'><FaTwitterSquare /></Link>
                </div>
                <p className='text-xl mt-10'>আমাদের সহায়তায়</p>
            </div>
        </div>
    )
}

export default Footer