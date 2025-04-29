'use client'
import React, { useContext, useEffect, useState } from 'react'
import { IoCheckmarkSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

export const DCRpayment = () => {
    const [dcrData, setDcrData] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 1500);
    }

    useEffect(() => {
        async function handleDcrData() {
            try {
                const res = await fetch('/api/user/submit-data/dcr-payment', { method: 'GET' });
                const data = await res.json();
                setDcrData(data.message);
            } catch (error) {
                console.log(error);
            }
        }
        handleDcrData();

    }, []);

    const handleDcrStatus = async (id, type) => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/edit-data/dcr-accept', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, type })
            });
            const data = await res.json();
            setLoading(false);
            setMessage(data.message);
            if (data.success) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="w-full h-full flex flex-col items-center p-7">

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

            <h1 className="self-start text-2xl font-bold">ডি,সি,আর পেমেন্ট</h1>

            <div className="w-full h-auto flex flex-col items-center mt-10 gap-y-5">
                <h1 className="text-xl font-bold">কাজের বিবরণ</h1>
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full gap-x-1 grid grid-cols-7 bg-green-600 text-white font-bold">
                        <p className="text-center border-r border-l border-b py-3">ক্রঃ</p>
                        <p className="text-center border-r py-3">নাম</p>
                        <p className="text-center border-r py-3">বিভাগ</p>
                        <p className="text-center border-r py-3">ডি,সি,আর পেমেন্ট</p>
                        <p className="text-center border-r py-3">তথ্যের ধরণ</p>
                        <p className="text-center border-r py-3">স্টাটাস</p>
                        <p className="text-center border-r py-3">অ্যাকশন</p>
                    </div>
                    {
                        dcrData ? (
                            dcrData.slice().reverse().map((elem, index) => {
                                return (
                                    <div className="w-full flex flex-col" key={elem._id}>
                                        <div className="w-full grid grid-cols-7">
                                            <p className="text-center border-r border-l border-b py-3 overflow-x-scroll">{index + 1}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.username}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.divisionName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.dcrPayment}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">ডি,সি,আর পেমেন্ট</p>
                                            {
                                                elem.status !== 'pending' && (
                                                    <p className={`text-center border-r border-b ${elem.status === 'complete' ? 'text-green-700' : 'text-red-600'} py-3`}>{elem.status}</p>
                                                )
                                            }
                                            {
                                                elem.status === 'pending' && (
                                                    <div className="text-center border-r border-b grid grid-cols-2 gap-x-px">
                                                        <button className="bg-green-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                                            handleDcrStatus(elem._id, 'accept');
                                                        }}><IoCheckmarkSharp /></button>
                                                        <button className="bg-red-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                                            handleDcrStatus(elem._id, 'cancel');
                                                        }}><RxCross2 /></button>
                                                    </div>
                                                )
                                            }
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.action}</p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30 bg-white">
                                <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}