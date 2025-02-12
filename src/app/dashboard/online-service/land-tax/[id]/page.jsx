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
                const response = await fetch('/api/get/land-data/land-tax2', { method: 'GET' });
                const data = await response.json();
                setUserData(data.message);
            } catch (error) {
                console.log(error);
            }
        }
        childData();
    }, []);

    return (
        <div className='w-full h-auto flex flex-col items-center justify-start p-10 gap-y-10'>
            <div className="shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-center relative space-y-5 h-56 w-[480px]">
                <div className=" absolute w-full h-10 rounded-md bg-[#fcb227] top-0"></div>
                <div className="size-20 flex items-center justify-center">
                    <img src="/logos/1732789801.webp" alt="" />
                </div>
                <h1 className='text-2xl font-semibold'>ভূমি উন্নয়ন কর</h1>
            </div>
            <h1 className='text-4xl font-bold border-b border-b-gray-400 py-5 sm:text-2xl'>খতিয়ান অনুসন্ধান করুন</h1>
            <div className="flex items-center justify-center flex-col">
                {
                    userData ? userData.filter((id) => params.id === id._id).map((currElm) => {
                        return (
                            <div className="flex flex-col items-start justify-center" key={currElm._id}>
                                <table className="table-auto">
                                    <thead>
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">বিভাগ</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">জেলা</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">উপজেলা</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.divisionName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.districtName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.upazilaName}</td>
                                        </tr>
                                    </tbody>
                                    <thead className="">
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">মৌজা</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">খতিয়ান নাম</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">NID নাম্বার</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.mouzaName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.khatianName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.nidNum}</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">জন্ম তারিখ</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">মোবাইল</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.dobNum.slice(0, 10)}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">0{currElm.mobile}</td>
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