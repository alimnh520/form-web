'use client'
import React, { useEffect } from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'

const ChildCom = ({ children }) => {
    return (
        <div className='w-full h-screen scroll-smooth'>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default ChildCom