'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ImMenu } from "react-icons/im";

const Header = () => {
    const[showNav, setShowNav] = useState(false);
    const pathName = usePathname();
    const [scroll, setScroll] = useState(0);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScroll(window.scrollY);
        });
    }, []);

    const linkCls = "relative h-full flex items-center justify-center gap-x-1 font-bold before:absolute before:content-[''] before:h-[3px] before:hover:w-full before:bg-red5text-red-500 before:bottom-0 before:transition-all before:duration-300 transition-all duration-300 hover:text-red-500 uppercase text-sm"
    return (
        <div className={`w-full sticky top-0 transition-all duration-300 ${scroll > 5 ? 'h-10' : 'h-16'} flex items-center justify-center bg-transparent scroll-smooth z-50 backdrop-blur-md text-white border-b border-b-gray-500 sm:h-auto sm:relative`}>

            <div className="w-24 rounded-md h-8 hidden sm:flex items-center justify-between absolute top-5 right-5 z-20 px-2.5 border border-purple-800 shadow-[inset_0_0_5px_rgb(107,33,168)]" onClick={() => setShowNav(!showNav)}>
                <p>MENU</p>
                <ImMenu className='mb-1 text-lg'/>
            </div>

            <nav className='w-full px-20 h-full flex items-center justify-between sm:px-10 sm:mt-5 sm:flex-col sm:h-fit sm:items-start'>
                <h1 className='text-2xl'>logo</h1>

                <ul className={`h-full flex items-center justify-center space-x-5 sm:flex-col sm:space-x-0 sm:space-y-4 sm:items-start sm:mt-5 sm:overflow-hidden transition-all duration-300 ${showNav ? 'sm:h-[166px]' : 'sm:h-0'}`}>
                    <li className={`${linkCls} ${pathName == '/' ? 'before:w-full text-red-500':'before:w-0'}`} onClick={() => setShowNav(!showNav)}><Link href="/">Home</Link></li>

                    <li className={`${linkCls} ${pathName == '/components/services' ? 'before:w-full text-red-500':'before:w-0'}`} onClick={() => setShowNav(!showNav)}><Link href="/components/services">Services</Link></li>

                    <li className={`${linkCls} ${pathName == '/components/form' ? 'before:w-full text-red-500':'before:w-0'}`} onClick={() => setShowNav(!showNav)}><Link href="/components/form">Forms</Link></li>

                    <li className={`${linkCls} ${pathName == '/components/about' ? 'before:w-full text-red-500':'before:w-0'}`} onClick={() => setShowNav(!showNav)}><Link href="/components/about">About us</Link></li>

                    <li className={`${linkCls} ${pathName == '/components/contact' ? 'before:w-full text-red-500':'before:w-0'}`} onClick={() => setShowNav(!showNav)}><Link href="/components/contact">Contact</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header