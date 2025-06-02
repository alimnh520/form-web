'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [isApprove, setIsApprove] = useState('');

    useEffect(() => {
        async function approveData(params) {
            try {
                const res = await fetch('/api/user/verify/approve', { method: 'GET' });
                const data = await res.json();
                setIsApprove(data.success);
            } catch (error) {
                console.log(error);
            }
        }
        approveData();
    }, []);

    console.log(isApprove);

    return (
        <div className="w-full h-screen flex items-start justify-center bg-[url('/bg/lsg-image.webp')] bg-center bg-cover -mt-16">
            <div className="w-[400px] h-80 bg-white p-7 flex flex-col items-center justify-center mt-4 gap-y-3 relative sm:w-80 sm:bg-[rgba(255,255,255,0.5)]">
                <h1 className='text-3xl font-semibold text-center'>Waiting for approve by Admin</h1>
                <p>For help please contact: 01850685033</p>
                <p>পেজ রিফ্রেস করুন!</p>

                {isApprove === true && <Link href="/user/login" className='px-10 py-0.5 border border-green-700 rounded-md hover:text-white hover:bg-green-700 transition-all duration-300'>লগইন</Link>}
            </div>
        </div>
    )
}

export default page