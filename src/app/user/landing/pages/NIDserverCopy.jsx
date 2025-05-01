'use client'
import { UserProvider } from '@/app/ChildCom';
import React, { useContext, useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im';
import { ImFolderDownload } from "react-icons/im";

export const NIDserverCopy = () => {
    const { user } = useContext(UserProvider);

    const [nidNum, setNidNum] = useState('');
    const [dobNum, setDobNum] = useState('');
    const [voterNum, setVoterNum] = useState('');

    const [serverNidCard, setNidCard] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [select, setSelect] = useState(true);

    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 1500);
    }

    useEffect(() => {
        const nidCardData = async () => {
            try {
                const response = await fetch("/api/user/get-data/land-data/serverNidCard", {
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

    const submitServerNidData = async (e) => {
        e.preventDefault();
        if (select && !nidNum) {
            setMessage('Fill up all');
            return
        }
        if (!select && !voterNum) {
            setMessage('Fill up all');
            return
        }
        setLoading(true);
        const res = await fetch('/api/user/submit-data/serverNidCard', {
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

            <div className='w-10/12 gap-x-3 grid grid-cols-4 items-center justify-center mt-5 sm:w-full sm:gap-x-0 sm:flex sm:flex-col relative'>

                <div className="flex flex-col items-start justify-center ">
                    <div className="flex items-center justify-center cursor-pointer gap-x-2" onClick={() => setSelect(true)}>
                        <input type="radio" id='nidNum' name='select' className='-mt-0.5' /><label htmlFor="nidNum">NID নাম্বার</label>
                    </div>
                    <div className="flex items-center justify-center cursor-pointer gap-x-2" onClick={() => setSelect(false)}>
                        <input type="radio" id='voterNum' name='select' className='-mt-0.5' /><label htmlFor="voterNum">ভোটার নাম্বার</label>
                    </div>
                </div>

                {!select && (
                    <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                        <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>ভোটার নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                        <div name="" id="" className='bg-transparent w-full relative outline-none'>
                            <input type="text" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 appearance-none border-b-green-500 px-4' value={voterNum} placeholder='ভোটার নাম্বার লিখুন...'
                                onChange={(e) => setVoterNum(e.target.value)} />
                        </div>
                    </div>
                )
                }

                {
                    select && (
                        <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                            <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>NID নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                            <div name="" id="" className='bg-transparent w-full relative outline-none'>
                                <input type="text" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 appearance-none border-b-green-500 px-4' value={nidNum} placeholder='NID নাম্বার লিখুন...'
                                    onChange={(e) => setNidNum(e.target.value)} />
                            </div>
                        </div>
                    )
                }

                <div className='flex flex-col items-start relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>জন্ম তারিখ<span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="date" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 appearance-none border-b-green-500 px-4' value={dobNum} placeholder='জন্ম তারিখ লিখুন...'
                            onChange={(e) => setDobNum(e.target.value)} />
                    </div>
                </div>

                <button type="submit" className='w-full py-3 text-lg font-semibold bg-green-600 hover:bg-transparent border border-green-600 transition-all duration-300 hover:text-green-600 text-white rounded-lg' onClick={submitServerNidData}>জমা দিন</button>
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
                        serverNidCard ? (
                            serverNidCard.slice().reverse().filter((currElm) => currElm.email === user.email).map((elem, index) => {
                                return (
                                    <div className="w-full flex flex-col" key={elem._id}>
                                        <div className="w-full grid grid-cols-6">
                                            <p className="text-center border-r border-l border-b py-3 overflow-x-scroll">{index + 1}</p>
                                            <div className="flex items-center justify-center border-r border-b py-3 overflow-x-scroll">{elem.voternum ? <p>{elem.voternum}</p> : <button><ImCross /></button>}</div>
                                            <div className="flex items-center justify-center border-r border-b py-3 overflow-x-scroll">{elem.nidnum ? <p>{elem.nidnum}</p> : <button><ImCross /></button>}</div>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.dob}</p>
                                            <p className={`text-center border-r border-b ${elem.status === 'complete' ? 'text-green-700' : 'text-red-600'} py-3 overflow-x-scroll`}>{elem.status}</p>
                                            <a href={elem.action} className="text-center border-r border-b py-3 overflow-x-scroll text-3xl flex items-center justify-center text-red-600">{
                                                elem.status === 'complete' ? <ImFolderDownload /> : <ImCross />
                                            }</a>
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