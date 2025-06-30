'use client'

import React, { useEffect, useState } from 'react'
import { IoCheckmarkSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

const Recharge = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [userBalance, setUserBalance] = useState('');

    useEffect(() => {
        async function getBalance() {
            try {
                const res = await fetch('/api/user/payment', { method: 'GET' });
                const data = await res.json();
                setUserBalance(data.message);
            } catch (error) {
                console.log(error);
            }
        }
        getBalance();
    }, []);

    const handleBalance = async (id, type, balance, email) => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/edit-data/editBalance', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, type, balance, email })
            });
            const data = await res.json();
            setLoading(false);
            setMessage(data.message);
            if (data.success) {
                async function getBalance() {
                    try {
                        const res = await fetch('/api/user/payment', { method: 'GET' });
                        const data = await res.json();
                        setUserBalance(data.message);
                    } catch (error) {
                        console.log(error);
                    }
                }
                getBalance();
            }
        } catch (error) {
            console.log(error)
        }
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

            <p className="w-10/12 border-b text-center pb-1.5 border-b-gray-300 text-2xl font-semibold">রিচার্জের বিবরণ</p>

            <div className="w-full h-auto flex flex-col items-center mt-5 gap-y-5">
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full grid grid-cols-[50px_1fr_1fr_1fr_1fr] bg-green-600 text-white font-bold">
                        <p className="text-center border-r border-l border-b py-3">ক্রঃ</p>
                        <p className="text-center border-r py-3 border-b">নাম</p>
                        <p className="text-center border-r py-3 border-b">টাকার পরিমান</p>
                        <p className="text-center border-r py-3 border-b">ট্রানজেকশন নাম্বার</p>
                        <p className="text-center border-r py-3 border-b">অ্যাকশন</p>
                    </div>
                    {
                        userBalance ? userBalance.slice().reverse().map((elem, index) => {
                            return (
                                <div className="w-full flex flex-col" key={elem._id}>
                                    <div className="w-full grid grid-cols-[50px_1fr_1fr_1fr_1fr]">
                                        <p className="text-center border-r border-l border-b py-3 overflow-x-scroll">{index + 1}</p>
                                        <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.username}</p>
                                        <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.pending_balance}</p>
                                        <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.trx_num}</p>
                                        {
                                            elem.status !== 'pending' && (
                                                <p className={`text-center border-r border-b ${elem.status === 'complete' ? 'text-green-700' : 'text-red-600'} py-3`}>{elem.status}</p>
                                            )
                                        }
                                        {
                                            elem.status === 'pending' && (
                                                <div className="text-center border-r border-b grid grid-cols-2 gap-x-px">
                                                    <button className="bg-green-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                                        handleBalance(elem._id, 'accept', elem.pending_balance, elem.email);
                                                    }}><IoCheckmarkSharp /></button>
                                                    <button className="bg-red-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                                        handleBalance(elem._id, 'cancel');
                                                    }}><RxCross2 /></button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }) : (
                            <div className="flex items-center justify-center absolute top-1/3 left-1/2 -translate-x-1/2 z-30 bg-white">
                                <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
                            </div>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Recharge