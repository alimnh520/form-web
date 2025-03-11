'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const logoutUser = async () => {
        setLoading(true);

        const response = await fetch('/api/user/logout', { method: 'GET' });

        const data = await response.json();
        setLoading(false);
        setMessage(data.message);
        setTimeout(() => {
            setMessage('');
        }, 2000);

        if (data.success) {
            setLoading(true);
            router.push('/');
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-[url('/bg/lsg-image.webp')] bg-center bg-cover -mt-16">
            <div className="w-[400px] h-80 bg-white p-7 flex flex-col items-center justify-center mt-4 gap-y-2 relative sm:w-80 sm:bg-[rgba(255,255,255,0.5)]">

                {
                    loading && (
                        <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-30 bg-white">
                            <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
                        </div>
                    )
                }

                {
                    message && (
                        <p className="w-full px-4 py-1.5 bg-[rgba(239,68,68,0.5)] text-white z-30 text-center">
                            {message}
                        </p>

                    )
                }

                <button className='px-8 py-2 bg-red-500 text-lg font-semibold rounded-md text-white' onClick={logoutUser}>Logout</button>
            </div>
        </div>
    )
}

export default page