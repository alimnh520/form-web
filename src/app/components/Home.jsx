import React from 'react'
import TextAnimate from './TextAnimate'
import Link from 'next/link'

const Home = () => {
    return (
        <div className='w-full h-screen flex items-center justify-between px-20 space-x-5 scroll-smooth relative sm:px-0'>
            <div className="w-1/2 h-full flex flex-col space-y-10 items-start justify-center text-white relative">
                <div className="size-96 absolute bg-gradient-to-b from-blue-900 to-blue-950 opacity-50 path left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="flex items-center justify-center space-x-3 z-10">
                    <h1 className='text-5xl font-bold'>I'm</h1><TextAnimate />
                </div>
                <p className='z-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae facere accusamus natus modi ipsum voluptates voluptatum est tenetur, laboriosam esse nam sint eligendi id consectetur, commodi recusandae doloribus, repellat a ducimus. Non molestiae quibusdam dolorem repudiandae mollitia id, aperiam rerum nihil! Magni, ratione quia cumque sint deserunt officia soluta ipsum.</p>

                <Link href="/components/contact" className='bg-blue-700 border border-blue-700 rounded-md px-5 py-2 text-xl hover:bg-transparent hover:text-blue-300 transition-all duration-300 shadow-[inset_0_0_5px_rgb(29,78,216)] z-10 hover:backdrop-blur-md'>Contact Me</Link>
            </div>
            <div className="w-1/2 h-full flex flex-col items-start justify-center">

            </div>
        </div>
    )
}

export default Home