'use client'
import React, { useContext, useEffect, useState } from 'react'

export const MouzaMap = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 1500);
    }

    return (
        <div className="w-full h-full flex flex-col items-center p-7">

            {
                loading && (
                    <div className="flex items-center justify-center absolute top-1/3 left-1/2 -translate-x-1/2 z-30 bg-white">
                        <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
                    </div>
                )
            }

            {
                message && (
                    <p className="px-10 py-1.5 bg-[rgba(239,68,68,0.9)] text-white text-center absolute top-1/3 left-1/2 -translate-x-1/2 z-30">
                        {message}
                    </p>

                )
            }

            <p className="w-10/12 border-b text-center pb-1.5 border-b-gray-300 text-2xl font-semibold">মৌজা ম্যাপ</p>
            
        </div>
    )
}