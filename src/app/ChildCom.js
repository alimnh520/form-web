'use client'
import React, { useEffect } from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import { usePathname } from 'next/navigation'

const ChildCom = ({ children }) => {
    const pathName = usePathname();
    const isPathName = '/components/land-form'
    return (
        <div className='w-full h-screen scroll-smooth'>
            {isPathName == !pathName && <Header />}
            {children}
            {isPathName == !pathName && <Footer />}
        </div>
    )
}

export default ChildCom