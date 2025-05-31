'use client'
import { FaCirclePlus } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import React, { useEffect, useState } from 'react'
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { IoIosArrowDropdownCircle } from "react-icons/io";

const SubAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [workList, setWorkList] = useState([]);
    const [listActive, setListActive] = useState(false);
    const [listBtn, setListBtn] = useState(false);
    const [indexNum, setIndexNum] = useState('');
    const [delAdmin, setDelAdmin] = useState(false);
    const [adminId, setAdminId] = useState('');
    const [publicId, setPublicId] = useState('');

    const [subAdmin, setSubAdmin] = useState('');
    const [newList, setNewList] = useState([]);
    const [newActiveList, setNewActiveList] = useState(false);


    const list = [
        'নির্বাচন করুন',
        'ডি,সি,আর পেমেন্ট',
        'মিউটেশন',
        'প্রতিনিধি ভূমি উন্নয়ন কর',
        'ভূমি উন্নয়ন কর',
        'ভূমি রেকর্ড ও ম্যাপ',
        'NID সার্ভার কপি',
        'NID কার্ড',
        'জন্ম নিবন্ধন অনলাইন কপি',
        'নতুন জন্ম নিবন্ধন আবেদন কপি',
        'নতুন পাসপোর্ট আবেদন'
    ]

    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 1500);
    }

    function valid(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    const addAdmin = async () => {
        if (!username || !email || !password || !workList) {
            setMessage('সকল ঘর পূরণ করুন');
            return;
        }
        if (password.length < 6) {
            setMessage('৬ ডিজিটের পাসওয়ার্ড ব্যবহার করুন');
            return;
        }
        if (!valid(email)) {
            setMessage('ই-মেইল সঠিক নয়!');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('/api/sub-admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, workList })
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
        async function handleAdmin() {
            try {
                const res = await fetch('/api/sub-admin', { method: 'GET' });
                const data = await res.json();
                setSubAdmin(data.message);
            } catch (error) {
                console.log(error);
            }
        }
        handleAdmin();
    }, []);

    const delSubAdmin = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/subadmin-del', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: adminId, public_url: publicId })
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

    const editAdminData = async (username, item) => {
        setLoading(true);
        try {
            const res = await fetch('/api/edit-subadmin', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, newList, item })
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
                    <div className="flex items-center justify-center absolute top-1/3 left-1/2 -translate-x-1/2 z-30">
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
                delAdmin && (
                    <div className="w-60 h-28 bg-white border border-blue-600 rounded-md absolute z-20 flex items-center justify-center gap-x-5 top-1/3">
                        <button className="px-5 py-1 bg-red-600 text-lg rounded-lg font-semibold text-white" onClick={() => {
                            delSubAdmin();
                            setDelAdmin(false);
                        }}>
                            delete
                        </button>
                        <button className="px-5 py-1 bg-blue-600 text-lg rounded-lg font-semibold text-white" onClick={() => setDelAdmin(false)}>
                            cancel
                        </button>
                    </div>
                )
            }

            <p className="w-10/12 border-b text-center pb-1.5 border-b-gray-300 text-2xl font-semibold">সহকারী কর্মকর্তা
            </p>

            <div className="w-10/12 gap-x-7 gap-y-5 grid grid-cols-4 grid-rows-2 items-center justify-center mt-8 relative">

                <div className="flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md">
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 text-green-700">
                        নাম <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <div
                        name=""
                        id=""
                        className="bg-transparent w-full relative outline-none"
                    >
                        <input
                            type="text"
                            className="outline-none w-full placeholder:text-sm bg-transparent placeholder:text-neutral-600 text-neutral-600 border-b-green-500 px-4 "
                            value={username}
                            placeholder="নাম লিখুন..."
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md">
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 text-green-700">
                        ই-মেইল <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <div
                        name=""
                        id=""
                        className="bg-transparent w-full relative outline-none"
                    >
                        <input
                            type="text"
                            className="outline-none w-full placeholder:text-sm bg-transparent placeholder:text-neutral-600 text-neutral-600 border-b-green-500 px-4 "
                            value={email}
                            placeholder="ই-মেইল লিখুন..."
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md">
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 text-green-700">
                        পাসওয়ার্ড <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <div
                        name=""
                        id=""
                        className="bg-transparent w-full relative outline-none"
                    >
                        <input
                            type="text"
                            className="outline-none w-full placeholder:text-sm bg-transparent placeholder:text-neutral-600 text-neutral-600 border-b-green-500 px-4 "
                            value={password}
                            placeholder="পাসওয়ার্ড লিখুন..."
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12" onClick={() => setListActive(!listActive)}>
                    <div className=" absolute right-4 text-xl text-neutral-500 flex items-center justify-center space-x-3 top-1/2 -translate-y-1/2">
                        <div className="w-0.5 h-6 bg-neutral-300"></div>
                        <MdOutlineArrowDropDownCircle />
                    </div>
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 text-green-700">
                        দায়িত্ব
                        <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <p className="bg-transparent w-full relative px-4 appearance-none cursor-pointer text-neutral-600 outline-none">{workList.length <= 0 ? 'নির্বাচন করুন' : workList.length}</p>

                    <div className={`absolute w-72 left-1/2 -translate-x-1/2 ${listActive ? 'flex' : 'hidden'} flex-col items-start justify-start h-auto bg-white top-12 p-4 z-10`}>
                        {
                            list.map((elem, index) => {
                                return (
                                    <div className={`cursor-pointer group py-2 pl-1 w-full relative hover:bg-green-700 hover:text-white flex items-center ${(workList.includes(elem)) ? 'bg-green-700  text-white border-b border-b-white' : 'bg-white text-black'} ${elem === 'নির্বাচন করুন' && 'hover:bg-white hover:text-black'}`} key={index}>
                                        <li className={`w-full ${elem === 'নির্বাচন করুন' && 'border-b'}`} onClick={() => {
                                            elem !== 'নির্বাচন করুন' && !workList.includes(elem) && setWorkList((prev) => [...prev, elem]);
                                        }}>{elem} </li>
                                        {
                                            workList.includes(elem) && (
                                                <button className={`absolute right-0.5 z-10 text-2xl `} onClick={() => {
                                                    setWorkList(workList.filter((match) => match !== elem));
                                                }}><MdDeleteForever /></button>
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

                <button
                    className="w-full py-3 text-lg col-span-2 col-start-2 font-semibold bg-green-600 hover:bg-transparent border border-green-600 transition-all duration-300 hover:text-green-600 text-white rounded-lg"
                    onClick={addAdmin}
                >
                    যোগ করুন
                </button>

            </div>

            <div className="w-full h-auto flex flex-col items-center mt-10 gap-y-5">
                <h1 className="text-xl font-bold">কাজের বিবরণ</h1>
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full gap-x-1 grid grid-cols-[100px_1fr_1fr_1fr_1fr] bg-green-600 text-white font-bold">
                        <p className="text-center border-r border-l border-b py-3">ক্রঃ</p>
                        <p className="text-center border-r py-3">ই-মেইল</p>
                        <p className="text-center border-r py-3">নাম</p>
                        <p className="text-center border-r py-3">পাসওয়ার্ড</p>
                        <p className="text-center border-r py-3">দায়িত্ব</p>
                    </div>
                    {
                        subAdmin ? (
                            subAdmin.slice().reverse().map((elem, index) => {
                                return (
                                    <div className="w-full flex flex-col" key={elem._id}>
                                        <div className="w-full grid grid-cols-[100px_1fr_1fr_1fr_1fr]">
                                            <div className="grid grid-cols-2 items-center justify-center border-r border-l border-b overflow-x-scroll">
                                                <p className="flex py-3 items-center justify-center border-r ">{index + 1}</p>
                                                {elem._id !== '67b9c9b18529900963e44adf' && <button className="flex py-3 items-center text-2xl justify-center text-red-600" onClick={() => {
                                                    setAdminId(elem._id);
                                                    setDelAdmin(true);
                                                    setPublicId(elem.public_url);
                                                }}><MdDeleteForever /></button>}
                                            </div>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.email}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.username}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.password}</p>
                                            <div className="text-center border-r border-b py-3 relative flex items-center justify-center">
                                                {
                                                    elem._id !== '67b9c9b18529900963e44adf' && (
                                                        <p className="w-full relative flex items-center px-3 justify-center">
                                                            <button className="text-3xl absolute left-3" onClick={() => setNewActiveList(!newActiveList)}><FaCirclePlus /></button>
                                                            {elem.workList?.length + newList.length}
                                                            <button className="text-4xl absolute right-3" onClick={() => {
                                                                setListBtn(!listBtn);
                                                                setIndexNum(index);
                                                            }}><IoIosArrowDropdownCircle /></button>
                                                        </p>
                                                    )
                                                }
                                                {
                                                    listBtn || indexNum === index && (
                                                        <div className="absolute w-full h-auto overflow-x-scroll bg-green-700 text-white flex flex-col items-start justify-start pl-2 top-12 z-10 gap-y-0.5 p-1">
                                                            {elem.workList?.map((item, index) => {
                                                                return (
                                                                    <li className="w-full text-start py-2 border-b border-b-white" key={index}>{item}</li>
                                                                )
                                                            })}
                                                        </div>
                                                    )
                                                }
                                                <div className={`absolute  border border-gray-400 w-72 top-12 right-0 ${elem._id === '67b9c9b18529900963e44adf' && 'hidden'} ${newActiveList ? 'flex' : 'hidden'} flex-col items-start justify-start h-auto bg-white top-12 p-4 z-10`}>
                                                    {
                                                        list.filter((rejectItem) => rejectItem !== 'নির্বাচন করুন').map((listItem, index) => {
                                                            return (
                                                                <div className={`cursor-pointer group py-2 pl-1 w-full relative hover:bg-green-700 hover:text-white flex items-center ${(newList.includes(listItem)) || elem.workList?.includes(listItem) ? 'bg-green-700  text-white border-b border-b-white' : 'bg-white text-black'}`} key={index}>
                                                                    <li className={`w-full text-start`} onClick={() => {
                                                                        !elem.workList?.includes(listItem) && !newList.includes(listItem) && setNewList((prev) => [...prev, listItem]);
                                                                    }}>
                                                                        {listItem}
                                                                    </li>

                                                                    {
                                                                        elem.workList?.includes(listItem) && (
                                                                            <button className={`absolute right-0.5 z-20 text-2xl `} onClick={() => editAdminData(elem.username, listItem)}><MdDeleteForever /></button>
                                                                        )
                                                                    }
                                                                    {
                                                                        newList.includes(listItem) && (
                                                                            <button className={`absolute right-0.5 z-20 text-2xl `} onClick={() => {
                                                                                setNewList(newList.filter((match) => match !== listItem));
                                                                            }}><MdDeleteForever /></button>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <button className="bg-green-700 px-7 py-1.5 text-white rounded-md mt-2 hover:bg-white hover:text-green-700 transition-all duration-300 self-center border border-green-700" onClick={() => editAdminData(elem.username)}>Set</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="flex items-center justify-center absolute top-1/3 left-1/2 -translate-x-1/2 z-30 bg-white">
                                <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
                            </div>)
                    }
                </div>
            </div>

        </div>
    )
}

export default SubAdmin