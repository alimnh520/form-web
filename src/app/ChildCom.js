'use client'
import React, { useEffect } from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import { usePathname } from 'next/navigation'

const ChildCom = ({ children }) => {
    const pathName = usePathname();
    const routePath = /^\/dakhila-print\/\w+$/i.test(pathName) || /^\/user\/\w+$/i.test(pathName);
    const hiddenPath = ['/office'];
    const setHiddenPath = hiddenPath.includes(pathName);

    useEffect(() => {
        document.title = 'your server is down'
    },[]);

    return (
        // <div className='w-full h-screen scroll-smooth'>
        //     {(!routePath && !setHiddenPath) && <Header />}
        //     <div className='mt-16'>{children}</div>
        //     {(!routePath && !setHiddenPath) &&  <Footer />}
        // </div>
        <div className='w-full h-screen flex flex-col gap-y-4 items-center justify-center bg-[#000211]'>
            {/* <Home/> */}
            <img src='/404-error-page-animation-download-in-lottie-json-gif-static-svg-file-formats--loading-not-found-the-ultimate-pack-design-development-animations-3299952.webp' alt='not found' />
            <h1 className='text-4xl font-semibold text-blue-800'>Your server is down</h1>
        </div>
    )
}

export default ChildCom