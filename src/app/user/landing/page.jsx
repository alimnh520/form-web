'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(false);
    const [newName, setNewName] = useState(false);
    const [image, setImage] = useState(false);
    const [newImage, setNewImage] = useState(false);

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
        <div className="w-full h-screen flex flex-col bg-[url('/bg/lsg-image.webp')] bg-center bg-cover -mt-16">
            <div className="w-full h-24 bg-white"></div>
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
            <div className="h-full w-3/12 bg-red-500 flex flex-col px-10 pt-20 items-start gap-y-5">
                <div className="size-40 rounded-full bg-green-600 self-center"></div>
                <h1>Name</h1>
            </div>

            <div className="h-full w-9/12 bg-blue-500">

            </div>
        </div>
    )
}

export default page