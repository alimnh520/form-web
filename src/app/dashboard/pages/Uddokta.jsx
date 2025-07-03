'use client'
import React, { useEffect, useState } from 'react'
import { HiCurrencyBangladeshi } from 'react-icons/hi';
import { IoCheckmarkSharp, IoClose } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

export const Uddokta = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [uddoktaId, setUddoktaId] = useState('');
    const [uddoktaData, setUddoktaData] = useState(false);
    const [deleteUddokta, setDeleteUddokta] = useState(false);

    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 1500);
    }

    async function handleUddokta() {
        try {
            const res = await fetch('/api/user/edit-data/uddokta', { method: 'GET' });
            const data = await res.json();
            setUddoktaData(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const convertTaka = (taka) => {
        const engToBangla = {
            '1': '১',
            '2': '২',
            '3': '৩',
            '4': '৪',
            '5': '৫',
            '6': '৬',
            '7': '৭',
            '8': '৮',
            '9': '৯',
            '0': '০',
        }
        return taka.toString().replace(/[0-9]/g, digit => engToBangla[digit]);
    }

    useEffect(() => {
        handleUddokta();

    }, [])

    const handleDeleteUddokta = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/del-data/del-uddokta', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: uddoktaId })
            });
            const data = await res.json();
            setLoading(false);
            setMessage(data.message);
            if (data.success) {
                handleUddokta();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAcceptUddokta = async (id, type) => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/edit-data/uddokta', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, type })
            });
            const data = await res.json();
            setLoading(false);
            setMessage(data.message);
            if (data.success) {
                handleUddokta();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full h-full z-20 flex flex-col p-5 items-center">

            {
                loading && (
                    <div className="flex items-center justify-center absolute top-1/3 lef  t-1/2 -translate-x-1/2 z-30 bg-white">
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

            {
                deleteUddokta && (
                    <div className="w-60 h-28 bg-white border border-blue-600 rounded-md absolute z-20 flex items-center justify-center gap-x-5 top-1/3">
                        <button className="px-5 py-1 bg-red-600 text-lg rounded-lg font-semibold text-white" onClick={() => {
                            handleDeleteUddokta();
                            setDeleteUddokta(false);
                        }}>
                            delete
                        </button>
                        <button className="px-5 py-1 bg-blue-600 text-lg rounded-lg font-semibold text-white" onClick={() => setDeleteUddokta(false)}>
                            cancel
                        </button>
                    </div>
                )
            }

            <div className="w-full h-auto flex flex-col items-center gap-y-5">
                <p className="w-10/12 border-b text-center pb-1.5 border-b-gray-300 text-2xl font-semibold">উদ্যোক্তা একাউন্ট</p>
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr] bg-green-600 text-white font-bold">
                        <p className="text-center border-r border-l border-b py-3">ক্রঃ</p>
                        <p className="text-center border-r py-3 border-b">ইউজার নেম</p>
                        <p className="text-center border-r py-3 border-b">ইমেইল</p>
                        <p className="text-center border-r py-3 border-b">ব্যালেন্স (টাকা)</p>
                        <p className="text-center border-r py-3 border-b">স্টাটাস</p>
                        <p className="text-center border-r py-3 border-b">ঠিকানা</p>
                    </div>
                    {
                        uddoktaData ? (
                            uddoktaData.slice().reverse().map((elem, index) => {
                                const reverseIndex = uddoktaData?.length - 1 - index
                                return (
                                    <div className="w-full flex flex-col relative " key={elem._id}>
                                        <div className="w-full grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr]">
                                            <p className="text-center border-r overflow-x-scroll border-l border-b py-3">{reverseIndex + 1}</p>
                                            <p className="text-center border-r overflow-x-scroll border-b py-3">{elem.username}</p>
                                            <p className="text-center border-r overflow-x-scroll border-b py-3">{elem.email}</p>
                                            <p className="text-center border-r overflow-x-scroll border-b py-3 flex items-center justify-center gap-x-0.5 text-lg">{convertTaka(elem.balance)}</p>
                                            {
                                                elem.status !== 'pending' && (
                                                    <div className={`text-center border-r border-b grid grid-cols-2 gap-x-px ${elem.status === 'accept' ? 'text-green-700' : 'text-red-600'}`}>
                                                        <p className="py-3">{elem.status}</p>
                                                        <button className="bg-red-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                                            setDeleteUddokta(true);
                                                            setUddoktaId(elem._id);
                                                        }}><MdDeleteForever /></button>
                                                    </div>
                                                )
                                            }
                                            {
                                                elem.status === 'pending' && (
                                                    <div className="text-center border-r border-b grid grid-cols-2 gap-x-px">
                                                        <button className="bg-green-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                                            handleAcceptUddokta(elem._id, 'accept');
                                                        }}><IoCheckmarkSharp /></button>
                                                        <button className="bg-red-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                                            handleAcceptUddokta(elem._id, 'cancel');
                                                        }}><RxCross2 /></button>
                                                    </div>
                                                )
                                            }
                                            <p className="text-center border-r overflow-x-scroll border-b py-3">{elem.address}</p>
                                        </div>
                                    </div>
                                )
                            }
                            )) : (

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