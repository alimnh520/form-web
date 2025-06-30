'use client'
import { UserProvider } from '@/app/user/ChildCom';
import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineArrowDropDownCircle } from 'react-icons/md'

export const LandTax = ({ getNewMoney }) => {
    const { user } = useContext(UserProvider);

    const [LandTax, setLandTax] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [divisionName, setDivisionName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [upazilaName, setUpazilaName] = useState('');
    const [mouzaName, setMouzaName] = useState('');
    const [khatianName, setKhatianNumber] = useState('');
    const [mobile, setMobile] = useState('');

    const [division, setDivision] = useState("");
    const [district, setDistrict] = useState("");
    const [upazilla, setUpazilla] = useState("");
    const [divId, setDivId] = useState('');
    const [disId, setDisId] = useState('');

    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 1500);
    }

    useEffect(() => {
        async function getDivision() {
            try {
                const response = await fetch("https://raw.githubusercontent.com/alimnh520/bd-api/refs/heads/main/Division.json");
                const result = await response.json();
                setDivision(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getDivision();

        async function getDistrict() {
            try {
                const response = await fetch("https://raw.githubusercontent.com/alimnh520/bd-api/refs/heads/main/District.json");
                const result = await response.json();
                setDistrict(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getDistrict();

        async function getUpazilla() {
            try {
                const response = await fetch("https://raw.githubusercontent.com/alimnh520/bd-api/refs/heads/main/Upazilla.json");
                const result = await response.json();
                setUpazilla(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getUpazilla();

        const landTax = async () => {
            try {
                const response = await fetch("/api/user/get-data/land-data/land-tax", {
                    method: "GET",
                });
                const data = await response.json();
                setLandTax(data.message);
            } catch (err) {
                console.log(err);
            }
        };
        landTax();
    }, []);

    const submitLandTax = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('/api/user/submit-data/landTex', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ divisionName, districtName, upazilaName, mouzaName, khatianName, mobile, email: user.email, username: user.username }),
        });
        setLoading(false);
        const data = await res.json();
        setMessage(data.message);
        if (data.success) {
            setDivisionName('');
            setDistrictName('');
            setUpazilaName('');
            setMouzaName('');
            setKhatianNumber('');
            setMobile('');
            const landTax = async () => {
                try {
                    const response = await fetch("/api/user/get-data/land-data/land-tax", {
                        method: "GET",
                    });
                    const data = await response.json();
                    setLandTax(data.message);
                } catch (err) {
                    console.log(err);
                }
            };
            landTax();
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

            <h1 className='text-4xl text-center w-full font-bold border-b border-b-gray-400 py-5'>ভূমি রেকর্ড ও ম্যাপ</h1>

            <div className='w-10/12 space-y-6 gap-x-7 grid grid-cols-4 items-center justify-center mt-5 relative'>

                <div className="flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12 mt-6">
                    <div className=" absolute right-4 text-xl text-neutral-500 flex items-center justify-center space-x-3 top-1/2 -translate-y-1/2">
                        <div className="w-0.5 h-6 bg-neutral-300"></div>
                        <MdOutlineArrowDropDownCircle />
                    </div>

                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700">
                        বিভাগ{" "}
                        <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>

                    <select
                        id=""
                        className="w-full relative px-4 appearance-none cursor-pointer text-neutral-600 outline-none bg-transparent"
                        value={divisionName}
                        onChange={(e) => {
                            setDivisionName(e.target.value);
                            const selectedOption = e.target.options[e.target.selectedIndex];
                            const bbsCode = selectedOption.getAttribute('data-bbs-code');
                            setDivId(bbsCode);
                        }}
                    >
                        <option value="" disabled>নির্বাচন করুন</option>
                        {division &&
                            division.slice().reverse().map((elem) => {
                                return (
                                    <option value={elem.NAME} data-bbs-code={elem.BBS_CODE} key={elem.ID} className="h-full">
                                        {elem.NAME}
                                    </option>
                                );
                            })}
                    </select>
                </div>

                <div className="flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12">
                    <div className=" absolute right-4 text-xl text-neutral-500 flex items-center justify-center space-x-3 top-1/2 -translate-y-1/2">
                        <div className="w-0.5 h-6 bg-neutral-300"></div>
                        <MdOutlineArrowDropDownCircle />
                    </div>
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700">
                        জেলা <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <select
                        name=""
                        id=""
                        className="bg-transparent w-full relative px-4 appearance-none cursor-pointer text-neutral-600 outline-none"
                        value={districtName}
                        onChange={(e) => {
                            setDistrictName(e.target.value);
                            const selectedOption = e.target.options[e.target.selectedIndex];
                            const bbsCode = selectedOption.getAttribute('data-bbs-code');
                            setDisId(bbsCode);
                        }}
                    >
                        <option value="" disabled>নির্বাচন করুন</option>
                        {district &&
                            district?.filter(dis => dis.DIVISION_BBS_CODE === divId).slice().reverse().map((elem) => {
                                return (
                                    <option value={elem.NAME} data-bbs-code={elem.BBS_CODE} key={elem.ID}>
                                        {elem.NAME}
                                    </option>
                                );
                            })
                        }
                    </select>
                </div>

                <div className="flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12">
                    <div className=" absolute right-4 text-xl text-neutral-500 flex items-center justify-center space-x-3 top-1/2 -translate-y-1/2">
                        <div className="w-0.5 h-6 bg-neutral-300"></div>
                        <MdOutlineArrowDropDownCircle />
                    </div>
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700">
                        উপজেলা{" "}
                        <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <select
                        name=""
                        id=""
                        className="bg-transparent w-full relative px-4 appearance-none cursor-pointer text-neutral-600 outline-none"
                        value={upazilaName}
                        onChange={(e) => setUpazilaName(e.target.value)}
                    >
                        <option value="" disabled>নির্বাচন করুন</option>
                        {upazilla &&
                            upazilla?.filter(dis => dis.DISTRICT_BBS_CODE === disId).slice().reverse().map((elem) => {
                                return (
                                    <option value={elem.NAME} key={elem.ID}>
                                        {elem.NAME}
                                    </option>
                                );
                            })
                        }
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

                <button type="submit" className='w-full py-3 text-lg font-semibold bg-green-600 hover:bg-transparent border border-green-600 transition-all duration-300 hover:text-green-600 text-white rounded-lg' onClick={() => {
                    setMessage('সার্ভারে কাজ চলছে!');
                }}>জমা দিন</button>
            </div>

            <div className="w-full h-auto flex flex-col items-center mt-10 gap-y-5">
                <h1 className="text-xl font-bold">কাজের বিবরণ</h1>
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full grid grid-cols-9 bg-green-600 text-white font-bold">
                        <p className="text-center border-r border-l border-b py-3">ক্রঃ</p>
                        <p className="text-center border-r border-b py-3">বিভাগ</p>
                        <p className="text-center border-r border-b py-3">জেলা</p>
                        <p className="text-center border-r border-b py-3">উপজেলা</p>
                        <p className="text-center border-r border-b py-3">মৌজা</p>
                        <p className="text-center border-r border-b py-3">খতিয়ান</p>
                        <p className="text-center border-r border-b py-3">মোবাইল</p>
                        <p className="text-center border-r border-b py-3">স্টাটাস</p>
                        <p className="text-center border-r border-b py-3">অ্যাকশন</p>
                    </div>
                    {
                        LandTax ? (
                            LandTax.slice().reverse().filter((currElm) => currElm.email === user.email).map((elem, index) => {
                                return (
                                    <div className="w-full flex flex-col" key={elem._id}>
                                        <div className="w-full grid grid-cols-9">
                                            <p className="text-center border-r border-l border-b py-3 overflow-x-scroll">{index + 1}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.divisionName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.districtName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.upazilaName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.mouzaName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.khatianName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.mobile}</p>
                                            <p className={`text-center border-r border-b ${elem.status === 'complete' ? 'text-green-700' : 'text-red-600'} py-3`}>{elem.status}</p>
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