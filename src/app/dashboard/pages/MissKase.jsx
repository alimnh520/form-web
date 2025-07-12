'use client'
import React, { useContext, useEffect, useState } from 'react'
import { FaLink } from 'react-icons/fa6';
import { ImCross } from 'react-icons/im';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

export const LandTax3 = () => {
    const [LandTax3, setLandTax3] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [sendLink, setSendLink] = useState(false);
    const [pdfFile, setPdfFile] = useState('');
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [publicUrl, setPublicUrl] = useState('');

    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 1500);
    }

    useEffect(() => {
        const selfLandTaxData = async () => {
            try {
                const response = await fetch("/api/user/get-data/land-data/misskase", {
                    method: "GET",
                });
                const data = await response.json();
                setLandTax3(data.message);
            } catch (err) {
                console.log(err);
            }
        };
        selfLandTaxData();
    }, []);


    const landTaxStatus3 = async (id, type, email) => {
        setLoading(true);
        try {
            const response = await fetch('/api/user/edit-data/editLandTax3', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, type, email })
            });
            const data = await response.json();
            setLoading(false);
            setMessage(data.message);
            if (data.success) {
                const selfLandTaxData = async () => {
                    try {
                        const response = await fetch("/api/user/get-data/land-data/misskase", {
                            method: "GET",
                        });
                        const data = await response.json();
                        setLandTax3(data.message);
                    } catch (err) {
                        console.log(err);
                    }
                };
                selfLandTaxData();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSendLink = async () => {
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
            formData.append("folder", "user");

            const res = await fetch('https://api.cloudinary.com/v1_1/dtitguuwt/raw/upload', {
                method: 'POST',
                body: formData,
            });
            const cloudData = await res.json();
            const sourceUrl = cloudData.secure_url;
            const publicId = cloudData.public_id;

            const response = await fetch('/api/user/edit-data/editLandTax3', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, type, sourceUrl, publicUrl, publicId })
            });
            const data = await response.json();
            setLoading(false);
            setMessage(data.message);
            if (data.success) {
                setSendLink(false);
                const selfLandTaxData = async () => {
                    try {
                        const response = await fetch("/api/user/get-data/land-data/misskase", {
                            method: "GET",
                        });
                        const data = await response.json();
                        setLandTax3(data.message);
                    } catch (err) {
                        console.log(err);
                    }
                };
                selfLandTaxData();
            }
        } catch (error) {
            console.log(error)
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
                            <button className='px-9 py-2 bg-green-700 text-white rounded-md hover:text-green-700 hover:bg-white border border-green-700 transition-all duration-300' onClick={handleSendLink}>Send</button>
                        </div>
                    </div>
                )
            }

            <p className="w-10/12 border-b text-center pb-1.5 border-b-gray-300 text-2xl font-semibold">মিউটেশন</p>

            <div className="w-full h-auto flex flex-col items-center mt-10 gap-y-5">
                <h1 className="text-xl font-bold">কাজের বিবরণ</h1>
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full grid grid-cols-12 bg-green-600 text-white font-bold">
                        <p className="text-center border-r border-l border-b py-3">নাম</p>
                        <p className="text-center border-r border-b py-3">বিভাগ</p>
                        <p className="text-center border-r border-b py-3">জেলা</p>
                        <p className="text-center border-r border-b py-3">উপজেলা</p>
                        <p className="text-center border-r border-b py-3">মৌজা</p>
                        <p className="text-center border-r border-b py-3">খতিয়ান নং</p>
                        <p className="text-center border-r border-b py-3">মোবাইল নং</p>
                        <p className="text-center border-r border-b py-3">খতিয়ান</p>
                        <p className="text-center border-r border-b py-3">দলিল</p>
                        <p className="text-center border-r border-b py-3">ছবি</p>
                        <p className="text-center border-r border-b py-3">দাখিলা</p>
                        <p className="text-center border-r border-b py-3">স্টাটাস</p>
                    </div>
                    {
                        LandTax3 ? (
                            LandTax3.slice().reverse().map((elem, index) => {
                                return (
                                    <div className="w-full flex flex-col" key={elem._id}>
                                        <div className="w-full grid grid-cols-12">
                                            <p className="text-center border-r border-l border-b py-3 overflow-x-scroll">{elem.username}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.divisionName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.districtName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.upazilaName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.mouzaName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.khatianName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.mobile}</p>
                                            <a href={elem.status === 'reject' ? '' : elem.khatian_url?.replace('/upload/', '/upload/fl_attachment/')} rel="noopener noreferrer" className={`text-center text-sm border-r border-b py-3 overflow-x-scroll flex items-center text-red-600 justify-center ${elem.status === 'reject' ? 'pointer-events-none' : 'pointer-events-auto'}`}>{elem.status === 'reject' ? <ImCross /> : <span className='bg-green-700 text-white w-fit p-1 rounded-md'>Download</span>}</a>
                                            <a href={elem.status === 'reject' ? '' : elem.dolil_url?.replace('/upload/', '/upload/fl_attachment/')} rel="noopener noreferrer" className={`text-center text-sm border-r border-b py-3 overflow-x-scroll flex items-center text-red-600 justify-center ${elem.status === 'reject' ? 'pointer-events-none' : 'pointer-events-auto'}`}>{elem.status === 'reject' ? <ImCross /> : <span className='bg-green-700 text-white w-fit p-1 rounded-md'>Download</span>}</a>
                                            <a href={elem.status === 'reject' ? '' : elem.photo_url?.replace('/upload/', '/upload/fl_attachment/')} rel="noopener noreferrer" className={`text-center text-sm border-r border-b py-3 overflow-x-scroll flex items-center text-red-600 justify-center ${elem.status === 'reject' ? 'pointer-events-none' : 'pointer-events-auto'}`}>{elem.status === 'reject' ? <ImCross /> : <span className='bg-green-700 text-white w-fit p-1 rounded-md'>Download</span>}</a>
                                            <a href={elem.status === 'reject' ? '' : elem.dakhila_url?.replace('/upload/', '/upload/fl_attachment/')} rel="noopener noreferrer" className={`text-center text-sm border-r border-b py-3 overflow-x-scroll flex items-center text-red-600 justify-center ${elem.status === 'reject' ? 'pointer-events-none' : 'pointer-events-auto'}`}>{elem.status === 'reject' ? <ImCross /> : <span className='bg-green-700 text-white w-fit p-1 rounded-md'>Download</span>}</a>

                                            {
                                                elem.status === 'pending' && (
                                                    <div className="text-center border-r border-b grid grid-cols-2 gap-x-px">
                                                        <button className='flex items-center justify-center text-2xl border-r text-red-600' onClick={() => {
                                                            landTaxStatus3(elem._id, 'cancel', elem.email);
                                                        }}>
                                                            <ImCross />
                                                        </button>
                                                        <button className='flex items-center justify-center text-3xl text-green-700' onClick={() => {
                                                            setId(elem._id);
                                                            setType('accept');
                                                            setSendLink(true);
                                                            setPublicUrl(elem.pdf_url);
                                                        }}>
                                                            <FaLink />
                                                        </button>
                                                    </div>
                                                )
                                            }
                                            {
                                                elem.status === 'complete' && (
                                                    <button className='flex items-center justify-center border-r border-b py-3 text-3xl text-green-700' onClick={() => {
                                                        setId(elem._id);
                                                        setType('accept');
                                                        setSendLink(true);
                                                        setPublicUrl(elem.pdf_url);
                                                    }}>
                                                        <FaLink />
                                                    </button>
                                                )
                                            }

                                            {
                                                elem.status === 'reject' && (
                                                    <p className="text-center border-r border-b py-3 overflow-x-scroll text-red-600">{elem.status}</p>
                                                )
                                            }

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