'use client'
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";
import { LuMenu } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { UserProvider } from '@/app/ChildCom';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import Link from "next/link";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

const page = () => {
    const router = useRouter();
    const user = useContext(UserProvider);
    const [name, setName] = useState(false);
    const [newName, setNewName] = useState('');
    const [image, setImage] = useState(false);
    const [newImage, setNewImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [profile, setProfile] = useState(false);
    const [hideMenu, setHideMenu] = useState(false);
    const [dcrPayment, setDcrPayment] = useState(false);
    const [division, setDivision] = useState('');
    const [divisionName, setDivisionName] = useState('');
    const [abedon, setAbedon] = useState('');
    const [dcrData, setDcrData] = useState('');

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
    }, [])

    const handleNameEdit = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/editname', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, newName })
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

    const handleNamePhoto = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/editname', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, newImage })
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

    return (
        <div className="w-full h-auto flex flex-col bg-center bg-cover -mt-16 bg-[#eff9f1] ">

            <div className="w-full h-20 bg-white px-20 flex justify-between items-center shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-10 sm:px-5 sm:h-auto sm:flex-col sm:justify-center sm:py-2">
                <h1 className="text-xl font-bold drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] ">অনলাইন সংক্রান্ত সেবা</h1>
                <div className="flex items-center justify-center gap-x-3 text-green-600 sm:w-full">
                    <Link href='/' className="text-4xl justify-self-start">
                        <IoMdHome />
                    </Link>
                    {
                        user && (
                            user.image_url ? (
                                <img src={user.image_url} alt="" />
                            ) : (
                                <span className="text-3xl">
                                    <FaUserCircle />
                                </span>
                            )
                        )
                    }
                    <p className="text-black flex items-center justify-center gap-x-0.5 text-2xl mt-1.5 pl-5">{user && user.balance}<span className="-mt-1"><HiOutlineCurrencyBangladeshi /></span></p>
                </div>
            </div>

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
            <div className="w-full h-full flex items-start justify-center relative mt-3 gap-x-2">

                <button className='absolute hidden sm:block right-5 top-5 size-16 rounded-full z-20 bg-red-700' onClick={() => setProfile(!profile)}>

                </button>

                <div className={`h-full relative sm:absolute sm:w-full ${profile ? 'sm:left-0' : 'sm:-left-full'} ${hideMenu ? 'w-0 overflow-hidden px-0' : 'w-3/12 px-10'} transition-all duration-300 bg-white flex flex-col pt-5 items-start gap-y-5`}>
                    <div className="size-40 rounded-full bg-green-600 self-center relative">
                        <button className="absolute bottom-2 right-2 text-xl text-white bg-red-700 rounded-full p-2" onClick={() => setImage(!image)}>
                            <FaEdit />
                        </button>
                    </div>

                    {
                        image && (
                            <div className="flex items-center justify-center gap-x-3">
                                <input type="file" className="outline-none border border-gray-400 px-4 py-1 w-52 rounded-xl" onChange={(e) => setNewImage(e.target.files[0])} />
                                <button className="px-5 py-1.5 text-white bg-green-700 border border-green-700" onClick={handleNamePhoto}>set</button>
                            </div>
                        )
                    }

                    {/* set new name */}

                    <div className="w-full flex items-center justify-center gap-x-2">
                        <p className="text-2xl font-semibold text-center">{user ? user.username : 'Loading...'}</p>
                        <button className="text-lg text-white bg-red-700 rounded-full p-1.5" onClick={() => setName(!name)}>
                            <FaEdit />
                        </button>
                    </div>
                    {
                        name && (
                            <div className="flex items-center justify-center">
                                <input type="text" className="outline-none border border-gray-400 px-4 py-1.5" value={newName} onChange={(e) => setNewName(e.target.value)} />
                                <button className="px-5 py-1.5 text-white bg-green-700 border border-green-700" onClick={handleNameEdit}>set</button>
                            </div>
                        )
                    }
                    <div className="w-full flex text-lg flex-col gap-y-3">
                        <button className="w-full border border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300" onClick={() => setDcrPayment(!dcrPayment)}>ডি,সি,আর পেমেন্ট</button>
                        <button className="w-full border border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300">মিউটেশন</button>
                        <button className="w-full border border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300">ভূমি উন্নয়ন কর</button>
                        <button className="w-full border border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300">NID সার্ভার কপি</button>
                        <button className="w-full border border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300">জন্ম নিবন্ধন অনলাইন কপি</button>
                        <button className="w-full border border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300">নতুন জন্ম নিবন্ধন আবেদন কপি</button>
                        <button className="w-full border border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300">নতুন পাসপোর্ট আবেদন</button>
                        <button className="w-full border border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300">বিবরণ</button>
                    </div>

                </div>

                <button className="text-3xl text-green-700 mt-5 sm:hidden" onClick={() => setHideMenu(!hideMenu)}>
                    <LuMenu />
                </button>

                <div className={`h-screen ${hideMenu ? 'w-11/12' : 'w-9/12'} sm:w-full bg-white transition-all duration-300`}>
                    {
                        dcrPayment && (
                            <div className="w-full h-full flex flex-col items-center p-7">
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
                                                                <p className="text-center border-r border-l border-b py-3">{index+1}</p>
                                                                <p className="text-center border-r border-b py-3">{elem.username}</p>
                                                                <p className="text-center border-r border-b py-3">{elem.divisionName}</p>
                                                                <p className="text-center border-r border-b py-3">{elem.dcrPayment}</p>
                                                                <p className="text-center border-r border-b py-3">ডি,সি,আর পেমেন্ট</p>
                                                                <p className={`text-center border-r border-b ${elem.status === 'complete' ? 'text-green-700':'text-red-600'} py-3`}>{elem.status}</p>
                                                                <p className="text-center border-r border-b py-3">{elem.action}</p>
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
                </div>
            </div>
        </div>
    )
}

export default page