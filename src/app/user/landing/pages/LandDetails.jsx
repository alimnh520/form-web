'use client'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { UserProvider } from '../../ChildCom';


export const LandDetails = ({ getNewMoney }) => {
    const { user } = useContext(UserProvider);
    const [landDetailsData, setLandDetailsData] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [nidNum, setNidNum] = useState('');

    const [takaKata, setTakaKata] = useState(false);

    const [activeBalance, setActiveBalance] = useState(false);

    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 2500);
    } else if (activeBalance) {
        setTimeout(() => {
            setActiveBalance(false);
        }, 3500);
    }

    const serverNidCardData = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/land-details", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nidNum, email: user.email })
            });
            const data = await response.json();
            setLandDetailsData(data.message);
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
        } catch (err) {
            console.log(err);
        }
        setNidNum('');
        setLoading(false);
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

            {activeBalance &&
                <div className="max-w-md mx-auto mt-10 p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg shadow-md z-20 absolute top-40">
                    <h2 className="text-xl font-semibold mb-2">⚠️ গুরুত্বপূর্ণ নির্দেশনা</h2>
                    <p className="text-base leading-relaxed">
                        আপনার একাউন্ট সক্রিয় করতে <span className="font-bold text-red-600">৫৫০ টাকা</span> রিচার্জ করুন!
                    </p>
                    <div className="mt-4 text-sm text-gray-700">
                        📞 প্রয়োজনে যোগাযোগ করুন: <span className="font-semibold">+8801850685033</span>
                    </div>
                </div>
            }

            {takaKata &&
                <div className="max-w-md mx-auto mt-10 p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg shadow-md z-20 absolute top-40">
                    <h2 className="text-xl font-semibold mb-2">⚠️ গুরুত্বপূর্ণ নির্দেশনা</h2>
                    <p className="text-base leading-relaxed">
                        আপনার একাউন্ট থেকে <span className="font-bold text-red-600">১৫০ টাকা</span> কেটে নেওয়া হবে।
                    </p>

                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            className="px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-transparent hover:text-red-600 border border-red-600 rounded transition-all duration-300"
                            onClick={() => setTakaKata(false)}
                        >
                            ❌ বাতিল করুন
                        </button>

                        <button
                            className="px-5 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-transparent hover:text-green-600 border border-green-600 rounded transition-all duration-300"
                            onClick={() => {
                                serverNidCardData();
                                setTakaKata(false);
                            }}
                        >
                            ✅ জমা দিন
                        </button>
                    </div>

                    <div className="mt-4 text-sm text-gray-700 text-center">
                        📞 প্রয়োজনে যোগাযোগ করুন: <span className="font-semibold">+8801850685033</span>
                    </div>
                </div>

            }


            <p className="w-10/12 border-b text-center pb-1.5 border-b-gray-300 text-2xl font-semibold">ভূমি নাগরিকের তথ্য</p>

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

                <button
                    className={`w-full py-3 text-lg font-semibold flex items-center justify-center bg-green-600 hover:bg-transparent border border-green-600 transition-all duration-300 hover:text-green-600 text-white rounded-lg ${!nidNum ? 'pointer-events-none' : 'pointer-events-auto'}`}
                    onClick={() => {
                        !user.active_balance ? setActiveBalance(true) : setTakaKata(true);
                    }}
                >
                    যাচাই করুন
                </button>

            </div>


            <div className="w-full h-auto flex flex-col items-center mt-10 gap-y-5">

                <div className="p-6 bg-gray-100 min-h-screen font-sans">
                    <h2 className="text-white bg-gradient-to-r from-green-500 to-green-800 px-6 py-3 rounded-lg shadow-md text-lg font-semibold tracking-wide mb-4">
                        নাগরিকের তথ্য
                    </h2>
                    <div className="overflow-hidden rounded-lg shadow-md bg-white mb-6">
                        <table className="w-full">
                            <tbody>
                                <tr><th className="bg-green-600 text-white text-left px-4 py-3 border-b w-72">নাম</th><td className="px-4 py-3 border-b">{landDetailsData?.citizen_data?.name}</td></tr>
                                <tr><th className="bg-green-600 text-white text-left px-4 py-3 border-b w-72">পিতার নাম</th><td className="px-4 py-3 border-b">{landDetailsData?.citizen_data?.father_name}</td></tr>
                                <tr><th className="bg-green-600 text-white text-left px-4 py-3 border-b w-72">মাতার নাম</th><td className="px-4 py-3 border-b">{landDetailsData?.citizen_data?.mother_name}</td></tr>
                                <tr><th className="bg-green-600 text-white text-left px-4 py-3 border-b w-72">এনআইডি নম্বর</th><td className="px-4 py-3 border-b">{landDetailsData?.citizen_data?.nid}</td></tr>
                                <tr><th className="bg-green-600 text-white text-left px-4 py-3 border-b w-72">জন্ম তারিখ</th><td className="px-4 py-3 border-b">{landDetailsData?.citizen_data?.dob}</td></tr>
                                <tr><th className="bg-green-600 text-white text-left px-4 py-3 border-b w-72">ফোন নম্বর</th><td className="px-4 py-3 border-b">{landDetailsData?.citizen_data?.phone}</td></tr>
                                <tr><th className="bg-green-600 text-white text-left px-4 py-3 border-b w-72">স্থায়ী ঠিকানা</th><td className="px-4 py-3 border-b">{landDetailsData?.citizen_data?.address}</td></tr>
                                <tr><th className="bg-green-600 text-white text-left px-4 py-3 border-b w-72">বর্তমান ঠিকানা</th><td className="px-4 py-3 border-b">{landDetailsData?.citizen_data?.present_address}</td></tr>
                                <tr><th className="bg-green-600 text-white text-left px-4 py-3 border-b w-72">স্ট্যাটাস</th><td className="px-4 py-3 border-b text-green-600 font-bold">{landDetailsData?.citizen_data && 'অনুমোদিত'}</td></tr>
                                <tr><th className="bg-green-600 text-white text-left px-4 py-3 border-b w-72">নিবন্ধনের তারিখ</th><td className="px-4 py-3 border-b">{landDetailsData?.citizen_data?.created_at}</td></tr>
                                <tr><th className="bg-green-600 text-white text-left px-4 py-3 border-b w-72">শেষ আপডেট</th><td className="px-4 py-3 border-b">{landDetailsData?.citizen_data?.updated_at}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 className="text-white bg-gradient-to-r from-green-500 to-green-800 px-6 py-3 rounded-lg shadow-md text-lg font-semibold tracking-wide mb-4">
                        খতিয়ান তথ্য
                    </h2>
                    <div className="overflow-hidden rounded-lg shadow-md bg-white">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-green-700 text-white">
                                    <th className="px-4 py-3 text-left">খতিয়ান নং</th>
                                    <th className="px-4 py-3 text-left">মৌজা</th>
                                    <th className="px-4 py-3 text-left">জে.এল. নং</th>
                                    <th className="px-4 py-3 text-left">উপজেলা</th>
                                    <th className="px-4 py-3 text-left">জেলা</th>
                                    <th className="px-4 py-3 text-left">বিভাগ</th>
                                    <th className="px-4 py-3 text-left">অফিস</th>
                                    <th className="px-4 py-3 text-left">পিডিএফ</th>
                                    <th className="px-4 py-3 text-left">স্ট্যাটাস</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr className="hover:bg-green-50 border-b">
                                    <td className="px-4 py-3">64</td>
                                    <td className="px-4 py-3">বিহিগ্রাম</td>
                                    <td className="px-4 py-3">98</td>
                                    <td className="px-4 py-3">আদমদীঘি</td>
                                    <td className="px-4 py-3">বগুড়া</td>
                                    <td className="px-4 py-3">রাজশাহী</td>
                                    <td className="px-4 py-3">চাঁপাপুর ইউনিয়ন ভূমি অফিস</td>
                                    <td className="px-4 py-3">
                                        <a className="text-blue-600 font-bold hover:underline" href="khotian/IjysT78l9RQnGcgjQ1rEgA40YTzQp6Q9E3jBfdUH.pdf" target="_blank">ডাউনলোড</a>
                                    </td>
                                    <td className="px-4 py-3 text-red-600 font-bold">❌ বাতিল (2024-12-30)</td>
                                </tr> */}
                                {
                                    landDetailsData?.khotiyan_data?.map((elem, index) => {
                                        return (
                                            <tr className="hover:bg-green-50 border-b" key={index}>
                                                <td className="px-4 py-3">{elem.khotian_no}</td>
                                                <td className="px-4 py-3">{elem.moujas?.name_bd}</td>
                                                <td className="px-4 py-3">{elem.moujas?.jl_no}</td>
                                                <td className="px-4 py-3">{elem.upazilas?.name_bd}</td>
                                                <td className="px-4 py-3">{elem.districts?.name_bn}</td>
                                                <td className="px-4 py-3">{elem.division?.name_bn}</td>
                                                <td className="px-4 py-3">{elem.office?.title_bn}</td>
                                                <td className="px-4 py-3">
                                                    <a className="text-blue-600 font-bold hover:underline" href={elem.attachment} target="_blank">ডাউনলোড</a>
                                                </td>
                                                <td className="px-4 py-3 text-red-600 font-bold">{'০'}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}