'use client'
import React, { useEffect } from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import { usePathname } from 'next/navigation'

const ChildCom = ({ children }) => {
    const pathName = usePathname();
    const routePath = /^\/dakhila-print\/\w+$/i.test(pathName);

    return (
        <div className='w-full h-screen scroll-smooth'>
            {!routePath && <Header />}
            <div className='mt-16'>{children}</div>
            {!routePath &&  <Footer />}
        </div>
    )
}

export default ChildCom