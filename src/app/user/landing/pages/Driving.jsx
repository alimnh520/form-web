'use client'
import { UserProvider } from '@/app/user/ChildCom';
import React, { useContext, useEffect, useState } from 'react'
import { FaLink } from 'react-icons/fa6';
import { ImCross, ImFolderDownload } from 'react-icons/im';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md'

export const Driving = ({ getNewMoney }) => {
    const { user } = useContext(UserProvider);

    const [drivingData, setDrivingData] = useState('');
    const [nid, setNid] = useState('');
    const [motherNid, setMotherNid] = useState('');
    const [fatherNid, setFatherNid] = useState('');
    const [bill, setBill] = useState('');

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [takaKata, setTakaKata] = useState(false);
    const [activeBalance, setActiveBalance] = useState(false);

    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 2500);
    } else if (activeBalance) {
        setTimeout(() => {
            setActiveBalance(false);
        }, 3500);
    }

    useEffect(() => {

        async function handleDrivingData() {
            try {
                const res = await fetch('/api/user/submit-data/driving', { method: 'GET' });
                const data = await res.json();
                setDrivingData(data.message);
            } catch (error) {
                console.log(error);
            }
        }
        handleDrivingData();
    }, []);

    const handleDrivingStatus = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/submit-data/driving', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, username: user.username, nid, fatherNid, motherNid, bill })
            });
            setLoading(false);
            const data = await res.json();
            setMessage(data.message);
            if (data.success) {
                setBill('');
                setFatherNid('');
                setMotherNid('');
                setBill('');
                async function handleDrivingData() {
                    try {
                        const res = await fetch('/api/user/submit-data/driving', { method: 'GET' });
                        const data = await res.json();
                        setDrivingData(data.message);
                    } catch (error) {
                        console.log(error);
                    }
                }
                handleDrivingData();
                async function userData() {
                    try {
                        const res = await fetch('/api/user/userdata', { method: 'GET' });
                        const data = await res.json();
                        if (data.success) {
                            getNewMoney(data.message?.balance);
                        } else setUser('');
                    } catch (error) {
                        console.log(error);
                    }
                }
                userData();
            }
        } catch (error) {
            console.log(error);
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
            {activeBalance &&
                <div className="max-w-md mx-auto mt-10 p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg shadow-md z-20 absolute top-40">
                    <h2 className="text-xl font-semibold mb-2">⚠️ গুরুত্বপূর্ণ নির্দেশনা</h2>
                    <p className="text-base leading-relaxed">
                        আপনার একাউন্ট সক্রিয় করতে <span className="font-bold text-red-600">৫৫০ টাকা</span> রিচার্জ করুন!
                    </p>
                    <div className="mt-4 text-sm text-gray-700">
                        📞 প্রয়োজনে যোগাযোগ করুন: <span className="font-semibold">+8801850685033</span>
                    </div>
                </div>
            }

            {takaKata &&
                <div className="max-w-md mx-auto mt-10 p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg shadow-md z-20 absolute top-40">
                    <h2 className="text-xl font-semibold mb-2">⚠️ গুরুত্বপূর্ণ নির্দেশনা</h2>
                    <p className="text-base leading-relaxed">
                        আপনার একাউন্ট থেকে <span className="font-bold text-red-600">১০০০ টাকা</span> কেটে নেওয়া হবে।
                    </p>

                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            className="px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-transparent hover:text-red-600 border border-red-600 rounded transition-all duration-300"
                            onClick={() => setTakaKata(false)}
                        >
                            ❌ বাতিল করুন
                        </button>

                        <button
                            className="px-5 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-transparent hover:text-green-600 border border-green-600 rounded transition-all duration-300"
                            onClick={() => {
                                handleDrivingStatus();
                                setTakaKata(false);
                            }}
                        >
                            ✅ জমা দিন
                        </button>
                    </div>

                    <div className="mt-4 text-sm text-gray-700 text-center">
                        📞 প্রয়োজনে যোগাযোগ করুন: <span className="font-semibold">+8801850685033</span>
                    </div>
                </div>


            }

            <h1 className="text-4xl text-center w-full font-bold border-b border-b-gray-400 py-5">
                ডি,সি,আর পেমেন্ট
            </h1>

            <div className='w-10/12 gap-7 grid grid-cols-4 grid-rows-2 items-center justify-center mt-5 relative'>

                <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>NID নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="number" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 appearance-none border-b-green-500 px-4' value={nid} placeholder='NID নাম্বার লিখুন...'
                            onChange={(e) => setNid(e.target.value)} />
                    </div>
                </div>
                <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>পিতার NID নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="number" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 appearance-none border-b-green-500 px-4' value={fatherNid} placeholder='পিতার NID নাম্বার লিখুন...'
                            onChange={(e) => setFatherNid(e.target.value)} />
                    </div>
                </div>
                <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>মাতার NID নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="number" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 appearance-none border-b-green-500 px-4' value={motherNid} placeholder='মাতার NID নাম্বার লিখুন...'
                            onChange={(e) => setMotherNid(e.target.value)} />
                    </div>
                </div>
                <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>বিল নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="number" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 appearance-none border-b-green-500 px-4' value={bill} placeholder='বিল নাম্বার লিখুন...'
                            onChange={(e) => setBill(e.target.value)} />
                    </div>
                </div>
                <button className="w-full col-span-2 col-start-2 relative py-4 h-12 flex items-center justify-center bg-green-500 text-white transition-all hover:bg-green-700 duration-300 border border-green-500 rounded-md" onClick={() => {
                    !user.active_balance ? setActiveBalance(true) : setTakaKata(true);
                }}>
                    সাবমিট করুন
                </button>
            </div>
            <div className="w-full h-auto flex flex-col items-center mt-10 gap-y-5">
                <h1 className="text-xl font-bold">কাজের বিবরণ</h1>
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full grid grid-cols-7 bg-green-600 text-white font-bold">
                        <p className="text-center border-r border-l border-b py-3">ক্রঃ</p>
                        <p className="text-center border-r border-b py-3">নাম</p>
                        <p className="text-center border-r border-b py-3">পিতার NID নাম্বার</p>
                        <p className="text-center border-r border-b py-3">মাতার NID নাম্বার</p>
                        <p className="text-center border-r border-b py-3">বিল নাম্বার</p>
                        <p className="text-center border-r border-b py-3">স্টাটাস</p>
                        <p className="text-center border-r border-b py-3">অ্যাকশন</p>
                    </div>
                    {
                        drivingData ? (
                            drivingData.slice().reverse().filter((currElm) => currElm.email === user.email).map((elem, index) => {
                                return (
                                    <div className="w-full flex flex-col" key={elem._id}>
                                        <div className="w-full grid grid-cols-7">
                                            <p className="text-center border-r border-l border-b py-3 overflow-x-scroll">{index + 1}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.username}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.fatherNid}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.motherNid}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.bill}</p>
                                            <p className={`text-center border-r border-b ${elem.status === 'complete' ? 'text-green-700' : 'text-red-600'} py-3 overflow-x-scroll`}>{elem.status}</p>
                                            <div className={`text-center border-r border-b ${elem.status === 'complete' ? 'text-green-700' : 'text-red-600'} py-3 overflow-x-scroll`}>{elem.status === 'complete' ? (
                                                <a href={elem.action?.replace("/upload/", "/upload/fl_attachment/")} className="text-3xl flex items-center justify-center"><ImFolderDownload /></a>
                                            ) : <span className="text-3xl flex items-center justify-center"><ImCross /></span>}</div>
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