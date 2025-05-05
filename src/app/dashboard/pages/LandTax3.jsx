'use client'
import React, { useContext, useEffect, useState } from 'react'
import { IoCheckmarkSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

export const LandTax3 = () => {
    const [LandTax3, setLandTax3] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 1500);
    }

    useEffect(() => {
        const selfLandTaxData = async () => {
            try {
                const response = await fetch("/api/user/get-data/land-data/land-tax3", {
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


    const landTaxStatus3 = async (id, type) => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/edit-data/editLandTax3', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, type })
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

            <p className="w-10/12 border-b text-center pb-1.5 border-b-gray-300 text-2xl font-semibold">মিউটেশন</p>

            <div className="w-full h-auto flex flex-col items-center mt-10 gap-y-5">
                <h1 className="text-xl font-bold">কাজের বিবরণ</h1>
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full gap-x-1 grid grid-cols-12 bg-green-600 text-white font-bold">
                        <p className="text-center border-r border-l border-b py-3">ক্রঃ</p>
                        <p className="text-center border-r py-3">বিভাগ</p>
                        <p className="text-center border-r py-3">জেলা</p>
                        <p className="text-center border-r py-3">উপজেলা</p>
                        <p className="text-center border-r py-3">মৌজা</p>
                        <p className="text-center border-r py-3">খতিয়ান নং</p>
                        <p className="text-center border-r py-3">মোবাইল নং</p>
                        <p className="text-center border-r py-3">খতিয়ান</p>
                        <p className="text-center border-r py-3">দলিল</p>
                        <p className="text-center border-r py-3">ছবি</p>
                        <p className="text-center border-r py-3">দাখিলা</p>
                        <p className="text-center border-r py-3">স্টাটাস</p>
                    </div>
                    {
                        LandTax3 ? (
                            LandTax3.slice().reverse().map((elem, index) => {
                                return (
                                    <div className="w-full flex flex-col" key={elem._id}>
                                        <div className="w-full grid grid-cols-12">
                                            <p className="text-center border-r border-l border-b py-3 overflow-x-scroll">{index + 1}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.divisionName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.districtName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.upazilaName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.mouzaName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.khatianName}</p>
                                            <p className="text-center border-r border-b py-3 overflow-x-scroll">{elem.mobile}</p>
                                            <a href={`${elem.khatian_url?.replace('/upload/', '/upload/fl_attachment/')}`} rel="noopener noreferrer" className="text-center text-sm border-r border-b py-3 overflow-x-scroll flex items-center justify-center"><p className='bg-green-700 text-white w-fit p-1 rounded-md'>Download</p></a>
                                            <a href={`${elem.dolil_url?.replace('/upload/', '/upload/fl_attachment/')}`} rel="noopener noreferrer" className="text-center text-sm border-r border-b py-3 overflow-x-scroll flex items-center justify-center"><p className='bg-green-700 text-white w-fit p-1 rounded-md'>Download</p></a>
                                            <a href={`${elem.photo_url?.replace('/upload/', '/upload/fl_attachment/')}`} rel="noopener noreferrer" className="text-center text-sm border-r border-b py-3 overflow-x-scroll flex items-center justify-center"><p className='bg-green-700 text-white w-fit p-1 rounded-md'>Download</p></a>
                                            <a href={`${elem.dakhila_url?.replace('/upload/', '/upload/fl_attachment/')}`} rel="noopener noreferrer" className="text-center text-sm border-r border-b py-3 overflow-x-scroll flex items-center justify-center"><p className='bg-green-700 text-white w-fit p-1 rounded-md'>Download</p></a>
                                            {
                                                elem.status !== 'pending' && (
                                                    <p className={`text-center border-r border-b ${elem.status === 'complete' ? 'text-green-700' : 'text-red-600'} py-3`}>{elem.status}</p>
                                                )
                                            }
                                            {
                                                elem.status === 'pending' && (
                                                    <div className="text-center border-r border-b grid grid-cols-2 gap-x-px">
                                                        <button className="bg-green-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                                            landTaxStatus3(elem._id, 'accept');
                                                        }}><IoCheckmarkSharp /></button>
                                                        <button className="bg-red-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                                            landTaxStatus3(elem._id, 'cancel');
                                                        }}><RxCross2 /></button>
                                                    </div>
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