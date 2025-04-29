'use client'
import { UserProvider } from '@/app/ChildCom';
import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineArrowDropDownCircle } from 'react-icons/md'

export const DCRpayment = () => {
    const { user } = useContext(UserProvider);
    const [abedon, setAbedon] = useState('');
    const [dcrData, setDcrData] = useState('');
    const [divisionName, setDivisionName] = useState('');
    const [division, setDivision] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 1500);
    }

    useEffect(() => {
        async function getDivision() {
            try {
                const response = await fetch("https://bdapi.vercel.app/api/v.1/division");
                const result = await response.json();
                setDivision(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getDivision();

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

    const handleDcrPayment = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/submit-data/dcr-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, username: user.username, mobile: user.mobile, divisionName, abedon })
            });
            setLoading(false);
            const data = await res.json();
            setMessage(data.message);
            if (data.success) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
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

            <div className='w-10/12 sm:w-full space-y-6 gap-x-7 grid grid-cols-4 items-center justify-center mt-5 sm:grid-cols-1 sm:grid-rows-none relative'>

                <div className='flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12 mt-6'>

                    <div className=" absolute right-4 text-xl text-neutral-500 flex items-center justify-center space-x-3 top-1/2 -translate-y-1/2">
                        <div className="w-0.5 h-6 bg-neutral-300"></div>
                        <MdOutlineArrowDropDownCircle />
                    </div>

                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>বিভাগ <span className='text-red-500 relative top-1 text-lg '>*</span></p>

                    <select id="" className='w-full relative px-4 appearance-none cursor-pointer text-neutral-600 outline-none bg-transparent' value={divisionName} onChange={(e) => setDivisionName(e.target.value)}>
                        <option value="">নির্বাচন করুন</option>
                        {
                            division && division.map((elem) => {
                                return (
                                    <option value={elem.bn_name} key={elem.id} className='h-full'>{elem.bn_name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>আবেদন নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="text" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 appearance-none border-b-green-500 px-4' value={abedon} placeholder='আবেদন নাম্বার লিখুন...'
                            onChange={(e) => setAbedon(e.target.value)} />
                    </div>
                </div>
                <button className="w-full relative py-4 h-12 flex items-center justify-center bg-green-500 text-white transition-all hover:bg-green-700 duration-300 border border-green-500 rounded-md" onClick={handleDcrPayment}>
                    সাবমিট করুন
                </button>
            </div>
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
                            dcrData.slice().reverse().filter((currElm) => currElm.email === user.email).map((elem, index) => {
                                return (
                                    <div className="w-full flex flex-col" key={elem._id}>
                                        <div className="w-full grid grid-cols-7">
                                            <p className="text-center border-r border-l border-b py-3 overflow-x-scroll">{index + 1}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.username}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.divisionName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.dcrPayment}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">ডি,সি,আর পেমেন্ট</p>
                                            <p className={`text-center border-r border-b ${elem.status === 'complete' ? 'text-green-700' : 'text-red-600'} py-3 overflow-x-scroll`}>{elem.status}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.action}</p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : <p>Loading...</p>
                    }
                </div>
            </div>
        </div>
    )
}