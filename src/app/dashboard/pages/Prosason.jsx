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

    async function userLogin() {
        try {
            const res = await fetch('/api/admin/login-user', { method: "GET" });
            const data = await res.json();
            setLoginUser(data.message);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

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
                userLogin();
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="w-full h-full z-20 flex flex-col p-5 items-center">

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

            <p className="w-10/12 border-b text-center pb-1.5 border-b-gray-300 text-2xl font-semibold">প্রশাসনিক তথ্য</p>


            <div className="w-full h-auto flex flex-col items-center mt-10">
                <div className="w-full grid grid-cols-3 bg-green-600 text-white font-bold">
                    <p className="text-center border-r border-l border-b py-3">ক্রঃ</p>
                    <p className="text-center border-r border-b py-3">Username</p>
                    <p className="text-center border-r border-b py-3">Password</p>
                </div>
                {
                    loginUser ? (
                        loginUser.slice().reverse().map((elem, index) => {
                            return (
                                <div className="w-full flex flex-col" key={elem._id}>
                                    <div className="w-full grid grid-cols-3 relative">
                                        <p className="text-center border-r border-l border-b py-3 overflow-x-scroll">{index + 1}</p>
                                        <button className="absolute right-3 bg-red-600 p-1.5 rounded-full text-white top-1/2 -translate-y-1/2 text-xl" onClick={() => userDelete(elem._id)}><MdDeleteForever /></button>
                                        <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.username}</p>
                                        <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.password}</p>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="flex items-center justify-center absolute top-1/3 left-1/2 -translate-x-1/2 z-30 bg-white">
                            <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
