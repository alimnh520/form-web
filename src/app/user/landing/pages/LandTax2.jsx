'use client'
import { UserProvider } from '@/app/user/ChildCom';
import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineArrowDropDownCircle } from 'react-icons/md'

export const LandTax2 = () => {
    const { user } = useContext(UserProvider);

    const [divisionName, setDivisionName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [upazilaName, setUpazilaName] = useState('');
    const [mouzaName, setMouzaName] = useState('');
    const [khatianName, setKhatianNumber] = useState('');
    const [mobile, setMobile] = useState('');
    const [nidNum, setNidNum] = useState('');
    const [dobNum, setDobNum] = useState('');
    const [division, setDivision] = useState('');
    const [district, setDistrict] = useState('');

    const [LandTax2, setLandTax2] = useState('');
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

        async function getDistrict() {
            try {
                const response = await fetch("https://bdapi.vercel.app/api/v.1/district");
                const result = await response.json();
                setDistrict(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getDistrict();

        const landTax2 = async () => {
            try {
                const response = await fetch("/api/user/get-data/land-data/land-tax2", {
                    method: "GET",
                });
                const data = await response.json();
                setLandTax2(data.message);
            } catch (err) {
                console.log(err);
            }
        };
        landTax2();
    }, []);

    const submitLandTax2 = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('/api/user/submit-data/landTex2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ divisionName, districtName, upazilaName, mouzaName, khatianName, mobile, nidNum, dobNum, email: user.email, username: user.username }),
        });
        setLoading(false);
        const data = await res.json();
        setMessage(data.message);
        if (data.success) {
            window.location.reload();
        }
        setDivisionName('');
        setDistrictName('');
        setUpazilaName('');
        setMouzaName('');
        setKhatianNumber('');
    };

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

            <h1 className='text-4xl w-full text-center font-bold border-b border-b-gray-400 py-5'>ভূমি উন্নয়ন কর দিন</h1>

            <div className='w-10/12 space-y-6 gap-x-7 grid grid-cols-4 items-center justify-center mt-5 relative'>

                <div className='flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12 mt-6 sm:mt-0'>

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

                <div className='flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12'>
                    <div className=" absolute right-4 text-xl text-neutral-500 flex items-center justify-center space-x-3 top-1/2 -translate-y-1/2">
                        <div className="w-0.5 h-6 bg-neutral-300"></div>
                        <MdOutlineArrowDropDownCircle />
                    </div>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>জেলা <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <select name="" id="" className='bg-transparent w-full relative px-4 appearance-none cursor-pointer text-neutral-600 outline-none' value={districtName} onChange={(e) => setDistrictName(e.target.value)}>
                        <option value="">নির্বাচন করুন</option>
                        {
                            district && district.map((elem) => {
                                return (
                                    <option value={elem.bn_name} key={elem.id}>{elem.bn_name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className='flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12'>
                    <div className=" absolute right-4 text-xl text-neutral-500 flex items-center justify-center space-x-3 top-1/2 -translate-y-1/2">
                        <div className="w-0.5 h-6 bg-neutral-300"></div>
                        <MdOutlineArrowDropDownCircle />
                    </div>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>উপজেলা <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <select name="" id="" className='bg-transparent w-full relative px-4 appearance-none cursor-pointer text-neutral-600 outline-none' value={upazilaName} onChange={(e) => setUpazilaName(e.target.value)}>
                        <option value="">নির্বাচন করুন</option>
                        <option value="বগুড়া সদর">বগুড়া সদর</option>
                        <option value="আদমদীঘি">আদমদীঘি</option>
                        <option value="দুপচাঁচিয়া">দুপচাঁচিয়া</option>
                        <option value="নন্দীগ্রাম">নন্দীগ্রাম</option>
                        <option value="কাহালু">কাহালু</option>
                        <option value="শেরপুর">শেরপুর</option>
                        <option value="শাজাহানপুর">শাজাহানপুর</option>
                        <option value="ধুনট">ধুনট</option>
                        <option value="সারিয়াকান্দি">সারিয়াকান্দি</option>
                        <option value="গাবতলী">গাবতলী</option>
                        <option value="শিবগঞ্জ">শিবগঞ্জ</option>
                        <option value="সোনাতলা">সোনাতলা</option>
                        <option value="রানীনগর">রানীনগর</option>
                    </select>
                </div>
                <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>মৌজা <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="text" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 border-b-green-500 px-4 ' value={mouzaName} placeholder='মৌজার নাম লিখুন...'
                            onChange={(e) => setMouzaName(e.target.value)} />
                    </div>
                </div>

                <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>খতিয়ান নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="text" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 border-b-green-500 px-4' value={khatianName} placeholder='খতিয়ান নাম্বার লিখুন...'
                            onChange={(e) => setKhatianNumber(e.target.value)} />
                    </div>
                </div>

                <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>মোবাইল নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="text" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 appearance-none border-b-green-500 px-4' value={mobile} placeholder='মোবাইল নাম্বার লিখুন...'
                            onChange={(e) => setMobile(e.target.value)} />
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
                    <div className="w-full gap-x-1 grid grid-cols-11 bg-green-600 text-white font-bold">
                        <p className="text-center border-r border-l border-b py-3">ক্রঃ</p>
                        <p className="text-center border-r py-3">বিভাগ</p>
                        <p className="text-center border-r py-3">জেলা</p>
                        <p className="text-center border-r py-3">উপজেলা</p>
                        <p className="text-center border-r py-3">মৌজা</p>
                        <p className="text-center border-r py-3">খতিয়ান</p>
                        <p className="text-center border-r py-3">মোবাইল</p>
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
                                        <div className="w-full grid grid-cols-11">
                                            <p className="text-center border-r border-l border-b py-3 overflow-x-scroll">{index + 1}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.divisionName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.districtName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.upazilaName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.mouzaName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.khatianName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.mobile}</p>
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