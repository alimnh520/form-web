'use client'
import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';

export const Prosason = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [loginUser, setLoginUser] = useState('');

    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 1500);
    }

    useEffect(() => {
        async function userLogin() {
            try {
                const res = await fetch('/api/admin/login-user', { method: "GET" });
                const data = await res.json();
                setLoginUser(data.message);
            } catch (error) {
                console.log(error);
            }
        }
        userLogin();

    }, []);

    const userDelete = async (userId) => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/del-data/user-delete', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });
            const data = await res.json();
            setLoading(false);
            setMessage(data.message);
            if (data.success) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="w-full h-full sm:w-80 sm:h-auto z-20 flex flex-col p-5 items-center">

            {
                loading && (
                    <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30 bg-white">
                        <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
                    </div>
                )
            }

            {
                message && (
                    <p className="px-10 py-1.5 bg-[rgba(239,68,68,0.9)] text-white text-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30">
                        {message}
                    </p>

                )
            }

            <p className="w-10/12 border-b text-center pb-1.5 border-b-gray-300 text-xl font-semibold">প্রশাসনিক তথ্য</p>
            <div className="w-full grid grid-cols-2 text-lg font-semibold mt-3 border-b border-b-gray-300">
                <p>Username</p>
                <p>Password</p>
            </div>
            {
                loginUser && (
                    loginUser.length === 0 && (
                        <div className="w-full grid grid-cols-2 border-b border-b-gray-300">
                            <p className="py-0.5">No Data</p>
                            <p className="py-0.5">No Data</p>
                        </div>
                    )
                )
            }
            {
                loginUser ? (
                    loginUser.slice().reverse().map((elem) => {
                        return (
                            <div className="w-full grid grid-cols-2 gap-x-2 border-b border-b-gray-300 relative" key={elem._id}>
                                <button className="absolute right-1 top-1/2 -translate-y-1/2 text-lg" onClick={() => userDelete(elem._id)}><MdDeleteForever /></button>
                                <p className="py-1 overflow-x-scroll">{elem.username}</p>
                                <p className="py-1 overflow-x-scroll">{elem.password}</p>
                            </div>
                        )
                    })
                ) : (
                    <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30 bg-white">
                        <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
                    </div>)
            }
        </div>
    )
}
