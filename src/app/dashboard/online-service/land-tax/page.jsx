'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [isDelete, setDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const landTaxData = async () => {
            try {
                const response = await fetch('/api/get/land-data/land-tax2', { method: 'GET' });
                const data = await response.json();
                setUser(data.message);
            } catch (err) {
                console.log(err);
            }
        }
        landTaxData();
    }, []);
    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/delete/deleta-tax/land-tax2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });
            const data = await response.json();
            if (data.success) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='w-full h-auto flex flex-col items-center justify-start p-5 gap-y-12 sm:gap-y-5'>

            <h1 className='text-4xl font-bold border-b border-b-gray-400 py-5 sm:text-2xl'>ভূমি উন্নয়ন কর</h1>

            <div className="flex flex-col items-center justify-center gap-y-5 mt-10 relative sm:mt-5 sm:gap-y-4 sm:justify-start">
                {
                    isDelete && (
                        <div className="w-60 h-28 bg-gray-500 border border-blue-600 rounded-md absolute z-20 flex items-center justify-center gap-x-5">
                            <button className="px-5 py-1 bg-red-600 text-lg rounded-lg font-semibold text-white" onClick={() => {
                                handleDelete();
                                setDelete(false);
                            }}>
                                delete
                            </button>
                            <button className="px-5 py-1 bg-blue-600 text-lg rounded-lg font-semibold text-white" onClick={() => setDelete(false)}>
                                cancel
                            </button>
                        </div>
                    )
                }
                {
                    loading && (
                        <div className="w-full h-60 flex items-center justify-center z-10 absolute">
                            <img src="/loader/images.png" className=" animate-pulse" alt="" />
                        </div>
                    )
                }
                {
                    user ? user.map((elem) => {
                        return (
                            <div className="flex items-center justify-center gap-x-5 sm:gap-x-3" key={elem._id}>
                                <p className="flex items-center justify-center h-full border border-gray-500 rounded-lg w-28 py-1">
                                    {elem.mobile}
                                </p>
                                <Link href={`/dashboard/online-service/land-tax/${elem._id}`} className="px-5 py-1 bg-blue-600 text-lg rounded-lg font-semibold text-white sm:text-sm sm:px-2 sm:py-2">
                                    See details
                                </Link>

                                <button className="px-5 py-1 bg-red-600 text-lg rounded-lg font-semibold text-white sm:text-sm sm:px-2 sm:py-2" onClick={() => {
                                    setDelete(true);
                                    setUserId(elem._id);
                                }
                                }>
                                    Delete
                                </button>
                            </div>
                        )
                    }) : (
                        <div className="w-full h-60 flex items-center justify-center">
                            <img src="/loader/images.png" className=" animate-pulse" alt="" />
                        </div>
                    )
                }
            </div>

            <button className="px-5 py-1 bg-blue-600 text-lg rounded-lg font-semibold text-white" onClick={() => router.back()}>
                Back
            </button>

        </div>
    )
}

export default page