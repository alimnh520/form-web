'use client'
import React, { useEffect } from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import { usePathname } from 'next/navigation'

const ChildCom = ({ children }) => {
    const pathName = usePathname();
    const routePath = /^\/dakhila-print\/\w+$/i.test(pathName);
    const hiddenPath = ['/office','/user/registration'];
    const setHiddenPath = hiddenPath.includes(pathName);

    return (
        <div className='w-full h-screen scroll-smooth'>
            {(!routePath && !setHiddenPath) && <Header />}
            <div className='mt-16'>{children}</div>
            {(!routePath && !setHiddenPath) &&  <Footer />}
        </div>
    )
}

export default ChildCom