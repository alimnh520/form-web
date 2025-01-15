import React from 'react'
import TextAnimate from './TextAnimate'
import Link from 'next/link'

const Home = () => {
    return (
        <div className='w-full h-screen flex items-center justify-between px-20 space-x-5 scroll-smooth relative sm:px-0'>
            <div className="flex flex-col items-start space-y-4 justify-center text-white">
                <h1 className='px-10 py-4 border-4 rounded-md  text-5xl'>LDTAX Application</h1>

                <ul>
                    <li>
                        <Link href="/components/services">LandTax</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Home