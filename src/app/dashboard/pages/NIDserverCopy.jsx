'use client'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { FaLink } from 'react-icons/fa6';
import { ImCross } from 'react-icons/im';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

export const NIDserverCopy = () => {
    const [serverNidData, setServerNidCard] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [sendLink, setSendLink] = useState(false);
    const [pdfFile, setPdfFile] = useState('');
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [publicUrl, setPublicUrl] = useState('');

    const [nidNum, setNidNum] = useState('');
    const [dob, setDob] = useState('');

    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 1500);
    }

    useEffect(() => {
        const serverNidCardData = async () => {
            try {
                const response = await fetch("/api/user/get-data/land-data/serverNidCard", {
                    method: "GET",
                });
                const data = await response.json();
                setServerNidCard(data.message);
            } catch (err) {
                console.log(err);
            }
        };
        serverNidCardData();
    }, []);

    const serverNidCardStatus = async () => {

        if (pdfFile) {
            if ((pdfFile.size / 1048576) > 5) {
                setMessage('File size is too large');
                return
            }
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', pdfFile);
            formData.append('upload_preset', 'form-submit');
            formData.append('cloud_name', 'dtitguuwt');

            const res = await fetch('https://api.cloudinary.com/v1_1/dtitguuwt/raw/upload', {
                method: 'POST',
                body: formData,
            });
            const cloudData = await res.json();
            const sourceUrl = cloudData.secure_url;
            const publicId = cloudData.public_id;

            const response = await fetch('/api/user/edit-data/editServerNid', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, type, sourceUrl, publicUrl, publicId })
            });
            const data = await response.json();
            setLoading(false);
            setMessage(data.message);
            if (data.success) {
                setSendLink(false);
                const serverNidCardData = async () => {
                    try {
                        const response = await fetch("/api/user/get-data/land-data/serverNidCard", {
                            method: "GET",
                        });
                        const data = await response.json();
                        setServerNidCard(data.message);
                    } catch (err) {
                        console.log(err);
                    }
                };
                serverNidCardData();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleNidStatus = async (id, type, email) => {
        setLoading(true);
        const response = await fetch('/api/user/edit-data/editServerNid', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, type, email })
        });
        const data = await response.json();
        setLoading(false);
        setMessage(data.message);
        if (data.success) {
            const serverNidCardData = async () => {
                try {
                    const response = await fetch("/api/user/get-data/land-data/serverNidCard", {
                        method: "GET",
                    });
                    const data = await response.json();
                    setServerNidCard(data.message);
                } catch (err) {
                    console.log(err);
                }
            };
            serverNidCardData();
        }
    }

    const submitNidData = async () => {
        if (!nidNum || !dob) {
            setMessage('সকল ঘর পূরণ করুন');
            return;
        }
        setLoading(true);
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
            {
                sendLink && (
                    <div className="w-96 h-40 bg-white border border-green-700 rounded-md flex flex-col items-center justify-center p-5 gap-y-5 absolute top-1/3 left-1/2 -translate-x-1/2 z-20">
                        <input type="file" className='w-full py-1.5 px-4 outline-none border border-gray-700 rounded-md' onChange={(e) => setPdfFile(e.target.files[0])} />
                        <div className="w-full flex items-center justify-center gap-x-5">
                            <button className='px-9 py-2 bg-red-700 text-white rounded-md hover:text-red-700 hover:bg-white border border-red-700 transition-all duration-300' onClick={() => {
                                setSendLink(false);
                                setType('');
                                setId('');
                            }}>Cancel</button>
                            <button className='px-9 py-2 bg-green-700 text-white rounded-md hover:text-green-700 hover:bg-white border border-green-700 transition-all duration-300' onClick={serverNidCardStatus}>Send</button>
                        </div>
                    </div>
                )
            }
            <p className="w-10/12 border-b text-center pb-1.5 border-b-gray-300 text-2xl font-semibold">NID সার্ভার কপি</p>

            <div className="w-10/12 gap-x-7 gap-y-5 grid grid-cols-3 items-center justify-center mt-8 relative">

                <div className="flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md">
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 text-green-700">
                        NID নাম্বার <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <div
                        name=""
                        id=""
                        className="bg-transparent w-full relative outline-none"
                    >
                        <input
                            type="text"
                            className="outline-none w-full placeholder:text-sm bg-transparent placeholder:text-neutral-600 text-neutral-600 border-b-green-500 px-4 "
                            value={nidNum}
                            placeholder="NID নাম্বার লিখুন..."
                            onChange={(e) => setNidNum(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md">
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 text-green-700">
                        জন্ম তারিখ <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <div
                        name=""
                        id=""
                        className="bg-transparent w-full relative outline-none"
                    >
                        <input
                            type="text"
                            className="outline-none w-full placeholder:text-sm bg-transparent placeholder:text-neutral-600 text-neutral-600 border-b-green-500 px-4 "
                            value={dob}
                            placeholder="2000-12-20"
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                </div>

                <Link href={`/dashboard/pages/nid-data/${nidNum}/${dob}`}
                    className={`w-full py-3 text-lg font-semibold flex items-center justify-center bg-green-600 hover:bg-transparent border border-green-600 transition-all duration-300 hover:text-green-600 text-white rounded-lg ${!nidNum || !dob ? 'pointer-events-none' : 'pointer-events-auto'}`}
                    onClick={submitNidData}
                >
                    খুজুন
                </Link>

            </div>


            <div className="w-full h-auto flex flex-col items-center mt-10 gap-y-5">
                <h1 className="text-xl font-bold">কাজের বিবরণ</h1>
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full grid grid-cols-7 bg-green-600 text-white font-bold">
                        <p className="text-center border-r border-l border-b py-3">ক্রঃ</p>
                        <p className="text-center border-r border-b py-3">নাম</p>
                        <p className="text-center border-r border-b py-3">ভোটার নাম্বার</p>
                        <p className="text-center border-r border-b py-3">NID নাম্বার</p>
                        <p className="text-center border-r border-b py-3">জন্ম তারিখ</p>
                        <p className="text-center border-r border-b py-3">স্টাটাস</p>
                        <p className="text-center border-r border-b py-3">অ্যাকশন</p>
                    </div>
                    {
                        serverNidData ? (
                            serverNidData.slice().reverse().map((elem, index) => {
                                return (
                                    <div className="w-full flex flex-col" key={elem._id}>
                                        <div className="w-full grid grid-cols-7">
                                            <p className="text-center border-r border-l border-b py-3 overflow-x-scroll">{index + 1}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.username}</p>
                                            <div className="flex items-center justify-center border-r border-b py-3 overflow-x-scroll">{elem.voternum ? <p>{elem.voternum}</p> : <button><ImCross /></button>}</div>
                                            <div className="flex items-center justify-center border-r border-b py-3 overflow-x-scroll">{elem.nidnum ? <p>{elem.nidnum}</p> : <button><ImCross /></button>}</div>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.dob}</p>
                                            {
                                                elem.status !== 'pending' && (
                                                    <p className={`text-center border-r border-b ${elem.status === 'complete' ? 'text-green-700' : 'text-red-600'} py-3`}>{elem.status}</p>
                                                )
                                            }
                                            {
                                                elem.status === 'pending' && (
                                                    <div className="text-center border-r border-b grid grid-cols-2 gap-x-px">
                                                        <button className="bg-green-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                                            handleNidStatus(elem._id, 'accept');
                                                        }}><IoCheckmarkSharp /></button>
                                                        <button className="bg-red-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                                            handleNidStatus(elem._id, 'cancel', elem.email);
                                                        }}><RxCross2 /></button>
                                                    </div>
                                                )
                                            }

                                            <button className="text-center border-r border-b py-3 overflow-x-scroll text-3xl flex items-center justify-center text-red-600" onClick={() => {
                                                elem.status !== 'reject' && (
                                                    setId(elem._id),
                                                    setType('accept'),
                                                    setPublicUrl(elem.pdf_url),
                                                    setSendLink(true)
                                                )
                                            }}>{
                                                    elem.status === 'reject' ? <ImCross /> : <FaLink />
                                                }</button>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
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