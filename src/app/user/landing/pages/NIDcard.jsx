'use client'
import { UserProvider } from '@/app/ChildCom';
import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineArrowDropDownCircle } from 'react-icons/md'

export const NIDcard = () => {
    const { user } = useContext(UserProvider);

    const [nidNum, setNidNum] = useState('');
    const [dobNum, setDobNum] = useState('');
    const [voterNum, setVoterNum] = useState('');

    const [nidCard, setNidCard] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 1500);
    }

    useEffect(() => {
        const nidCardData = async () => {
            try {
                const response = await fetch("/api/user/get-data/land-data/land-tax2", {
                    method: "GET",
                });
                const data = await response.json();
                setNidCard(data.message);
            } catch (err) {
                console.log(err);
            }
        };
        nidCardData();
    }, []);

    const submitNidData = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('/api/user/submit-data/nidCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nidNum, voterNum, dobNum, email: user.email, username: user.username }),
        });
        setLoading(false);
        const data = await res.json();
        setMessage(data.message);
        if (data.success) {
            window.location.reload();
        }
    };

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

            <h1 className='text-4xl w-full text-center font-bold border-b border-b-gray-400 py-5 sm:text-2xl'>NID কার্ড</h1>

            <div className='w-10/12 space-y-6 gap-x-7 grid grid-cols-4 items-center justify-center mt-5 sm:w-full sm:gap-x-0 sm:flex sm:flex-col relative'>

                <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>ভোটার নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="text" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 appearance-none border-b-green-500 px-4' value={voterNum} placeholder='মোবাইল নাম্বার লিখুন...'
                            onChange={(e) => setVoterNum(e.target.value)} />
                    </div>
                </div>

                <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>NID নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="text" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 appearance-none border-b-green-500 px-4' value={nidNum} placeholder='NID নাম্বার লিখুন...'
                            onChange={(e) => setNidNum(e.target.value)} />
                    </div>
                </div>

                <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>জন্ম তারিখ<span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="date" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 appearance-none border-b-green-500 px-4' value={dobNum} placeholder='জন্ম তারিখ লিখুন...'
                            onChange={(e) => setDobNum(e.target.value)} />
                    </div>
                </div>

                <button type="submit" className='w-full py-3 text-lg col-start-2 col-span-2 font-semibold bg-green-600 hover:bg-transparent border border-green-600 transition-all duration-300 hover:text-green-600 text-white rounded-lg' onClick={submitLandTax2}>জমা দিন</button>
            </div>

            <div className="w-full h-auto flex flex-col items-center mt-10 gap-y-5">
                <h1 className="text-xl font-bold">কাজের বিবরণ</h1>
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full gap-x-1 grid grid-cols-6 bg-green-600 text-white font-bold">
                        <p className="text-center border-r border-l border-b py-3">ক্রঃ</p>
                        <p className="text-center border-r py-3">ভোটার নাম্বার</p>
                        <p className="text-center border-r py-3">NID নাম্বার</p>
                        <p className="text-center border-r py-3">জন্ম তারিখ</p>
                        <p className="text-center border-r py-3">স্টাটাস</p>
                        <p className="text-center border-r py-3">অ্যাকশন</p>
                    </div>
                    {
                        LandTax2 ? (
                            LandTax2.slice().reverse().filter((currElm) => currElm.email === user.email).map((elem, index) => {
                                return (
                                    <div className="w-full flex flex-col" key={elem._id}>
                                        <div className="w-full grid grid-cols-6">
                                            <p className="text-center border-r border-l border-b py-3 overflow-x-scroll">{index + 1}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.voterNum}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.nidNum}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.dobNum}</p>
                                            <p className={`text-center border-r border-b ${elem.status === 'complete' ? 'text-green-700' : 'text-red-600'} py-3 overflow-x-scroll`}>{elem.status}</p>
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