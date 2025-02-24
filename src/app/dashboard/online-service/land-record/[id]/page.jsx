'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const params = useParams();
    const router = useRouter();
    const [userData, setUserData] = useState('');

    useEffect(() => {
        const childData = async () => {
            try {
                const response = await fetch('/api/get/land-data/land-tax3', { method: 'GET' });
                const data = await response.json();
                setUserData(data.message);
            } catch (error) {
                console.log(error);
            }
        }
        childData();
    }, []);

    const handleDownload = async(url, name) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${name}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full h-auto flex flex-col items-center justify-start p-10 gap-y-10 sm:gap-y-5'>
            <div href="/components/land-tax" className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 sm:space-y-2 sm:h-48 h-56 w-96 sm:w-72 sm:justify-end">
                <div className=" absolute w-full h-10 rounded-md bg-[#9cbf3d] top-0"></div>
                <div className="size-20 flex items-center justify-center">
                    <img src="/logos/1732941934.webp" alt="" />
                </div>
                <h1 className='text-2xl font-semibold sm:text-2xl sm:py-3'>ভূমি রেকর্ড ও ম্যাপ</h1>
            </div>
            <h1 className='text-4xl font-bold border-b border-b-gray-400 py-5 sm:text-2xl'>খতিয়ান অনুসন্ধান করুন</h1>

            <div className="flex items-center justify-center flex-col sm:w-full">
                {
                    userData ? userData.filter((id) => params.id === id._id).map((currElm) => {
                        return (
                            <div className="flex flex-col items-start justify-center sm:w-full" key={currElm._id}>
                                <table className="table-auto sm:hidden">
                                    <thead>
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">বিভাগ</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">জেলা</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">উপজেলা</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">মৌজা</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.divisionName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.districtName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.upazilaName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.mouzaName}</td>
                                        </tr>
                                    </tbody>
                                    <thead className="">
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">খতিয়ান নাম</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">মোবাইল</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">দাখিলা</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">দলিল</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.khatianName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">0{currElm.mobile}</td>
                                            <td className="text-center py-2 px-2 border-r border-r-gray-400 space-x-3">
                                                <a href={currElm.dakhila} target='blank' className='bg-red-500 text-white px-2 rounded-md py-0.5'>See</a>
                                                <button className='bg-green-700 rounded-md text-white px-2 py-0.5' onClick={() => handleDownload(currElm.dakhila, `${currElm.mobile}-dakhila`)}>Download</button>
                                            </td>
                                            <td className="text-center py-2 px-2 border-r border-r-gray-400 space-x-3">
                                                <a href={currElm.dolil} target='blank' className='bg-red-500 text-white px-2 rounded-md py-0.5'>See</a>
                                                <button className='bg-green-700 rounded-md text-white px-2 py-0.5' onClick={() => handleDownload(currElm.dolil, `${currElm.mobile}-dolil`)}>Download</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">খতিয়ান</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">ছবি</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-2 space-x-3 border-r border-r-gray-400">
                                                <a href={currElm.khatian} target='blank' className='bg-red-500 text-white px-2 rounded-md py-0.5'>See</a>
                                                <button className='bg-green-700 rounded-md text-white px-2 py-0.5' onClick={() => handleDownload(currElm.khatian, `${currElm.mobile}-khatian`)}>Download</button>
                                            </td>
                                            <td className="text-center py-2 px-2 space-x-3 border-r border-r-gray-400">
                                                <a href={currElm.photo} target='blank' className='bg-red-500 text-white px-2 rounded-md py-0.5'>See</a>
                                                <button className='bg-green-700 rounded-md text-white px-2 py-0.5' onClick={() => handleDownload(currElm.photo, `${currElm.mobile}-photo`)}>Download</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="table-auto hidden sm:inline-table w-full">
                                    <thead>
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">বিভাগ</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">জেলা</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.divisionName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.districtName}</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">উপজেলা</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">মৌজা</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.upazilaName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.mouzaName}</td>
                                        </tr>
                                    </tbody>
                                    <thead className="">
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">খতিয়ান নাম</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">মোবাইল</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.khatianName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">0{currElm.mobile}</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">দাখিলা</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">দলিল</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-2 space-x-3 border-r border-r-gray-400">
                                                <a href={currElm.dakhila} target='blank' className='bg-red-500 text-white px-2 rounded-md py-0.5'>See</a>
                                                <button className='bg-green-700 rounded-md text-white px-2 py-0.5' onClick={() => handleDownload(currElm.dakhila, `${currElm.mobile}-dakhila`)}>Download</button>
                                            </td>
                                            <td className="text-center py-2 px-2 space-x-3 border-r border-r-gray-400">
                                                <a href={currElm.dolil} target='blank' className='bg-red-500 text-white px-2 rounded-md py-0.5'>See</a>
                                                <button className='bg-green-700 rounded-md text-white px-2 py-0.5' onClick={() => handleDownload(currElm.dolil, `${currElm.mobile}-dolil`)}>Download</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">খতিয়ান</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">ছবি</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-2 space-x-3 border-r border-r-gray-400">
                                                <a href={currElm.khatian} target='blank' className='bg-red-500 text-white px-2 rounded-md py-0.5'>See</a>
                                                <button className='bg-green-700 rounded-md text-white px-2 py-0.5' onClick={() => handleDownload(currElm.khatian, `${currElm.mobile}-khatian`)}>Download</button>
                                            </td>
                                            <td className="text-center py-2 px-2 space-x-3 border-r border-r-gray-400">
                                                <a href={currElm.photo} target='blank' className='bg-red-500 text-white px-2 rounded-md py-0.5'>See</a>
                                                <button className='bg-green-700 rounded-md text-white px-2 py-0.5' onClick={() => handleDownload(currElm.photo, `${currElm.mobile}-photo`)}>Download</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    }) : (
                        <div className="w-full h-60 flex items-center justify-center">
                            <img src="/loader/images.png" className=" animate-pulse" alt="" />
                        </div>
                    )
                }
            </div>

            <button className="px-5 py-1 bg-blue-600 text-lg rounded-lg font-semibold text-white" onClick={() => router.back()}>
                Back
            </button>
        </div>
    )
}

export default page