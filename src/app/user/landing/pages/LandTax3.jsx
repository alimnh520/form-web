'use client'
import { UserProvider } from '@/app/user/ChildCom';
import React, { useContext, useEffect, useState } from 'react'
import { ImCross, ImFolderDownload } from 'react-icons/im';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md'

export const LandTax3 = ({ getNewMoney }) => {
    const { user } = useContext(UserProvider);

    const [divisionName, setDivisionName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [upazilaName, setUpazilaName] = useState("");
    const [mouzaName, setMouzaName] = useState("");
    const [khatianNumber, setKhatianNumber] = useState("");
    const [mobile, setMobile] = useState("");
    const [khatian, setKhatian] = useState("");
    const [dolil, setDolil] = useState("");
    const [photo, setPhoto] = useState("");
    const [dakhila, setDakhila] = useState("");

    const [division, setDivision] = useState("");
    const [district, setDistrict] = useState("");
    const [upazilla, setUpazilla] = useState("");
    const [divId, setDivId] = useState('');
    const [disId, setDisId] = useState('');

    const [LandTax3, setLandTax3] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
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

    const submitLandTax3 = async (e) => {
        if (!mobile || !khatianNumber || !mouzaName || !upazilaName || !districtName || !divisionName || !dakhila || !photo || !dolil || !khatian) {
            setMessage('Fill up all');
            return
        }
        setLoading(true);
        const files = [dakhila, photo, dolil, khatian];
        const uploadedUrls = [];
        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "form-submit");
            formData.append("folder", "user");
            const resourceType = file.type === "application/pdf" ? "raw" : "image";
            const response = await fetch(`https://api.cloudinary.com/v1_1/dtitguuwt/${resourceType}/upload`, {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            uploadedUrls.push(result.secure_url, result.public_id);
        }
        const res = await fetch('/api/user/submit-data/landTex3', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, username: user.username, mobile, khatianNumber, mouzaName, upazilaName, districtName, divisionName, dakhila_url: uploadedUrls[0], dakhila_id: uploadedUrls[1], photo_url: uploadedUrls[2], photo_id: uploadedUrls[3], dolil_url: uploadedUrls[4], dolil_id: uploadedUrls[5], khatian_url: uploadedUrls[6], khatian_id: uploadedUrls[7], }),
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
            setKhatian('');
            setDakhila('');
            setDolil('');
            setPhoto('');
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
                <div className="max-w-md mx-auto mt-10 p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg shadow-md z-30 absolute top-40">
                    <h2 className="text-xl font-semibold mb-2">⚠️ গুরুত্বপূর্ণ নির্দেশনা</h2>
                    <p className="text-base leading-relaxed">
                        আপনার একাউন্ট থেকে <span className="font-bold text-red-600">৩৭০ টাকা</span> কেটে নেওয়া হবে।
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
                                submitLandTax3();
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


            <h1 className="text-4xl text-center w-full font-bold border-b border-b-gray-400 py-5">
                মিউটেশন
            </h1>

            <div className="w-10/12 space-y-6 gap-x-7 grid grid-cols-4 items-center justify-center mt-5 relative">

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
                <div className="flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md">
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700">
                        মৌজা <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <div
                        name=""
                        id=""
                        className="bg-transparent w-full relative outline-none"
                    >
                        <input
                            type="text"
                            className="outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 border-b-green-500 px-4 "
                            value={mouzaName}
                            placeholder="মৌজার নাম লিখুন..."
                            onChange={(e) => setMouzaName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md">
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700">
                        খতিয়ান নাম্বার{" "}
                        <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <div
                        name=""
                        id=""
                        className="bg-transparent w-full relative outline-none"
                    >
                        <input
                            type="text"
                            className="outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 border-b-green-500 px-4"
                            value={khatianNumber}
                            placeholder="খতিয়ান নাম্বার লিখুন..."
                            onChange={(e) => setKhatianNumber(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md">
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700">
                        মোবাইল নাম্বার{" "}
                        <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <div
                        name=""
                        id=""
                        className="bg-transparent w-full relative outline-none"
                    >
                        <input
                            type="text"
                            className="outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 appearance-none border-b-green-500 px-4"
                            value={mobile}
                            placeholder="মোবাইল নাম্বার লিখুন..."
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md">
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700">
                        খতিয়ান PDF <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <div
                        name=""
                        id=""
                        className="bg-transparent w-full relative outline-none flex items-center justify-center"
                    >
                        <p className="text-white text-center py-1 absolute -top-1.5 w-10/12 bg-green-600 rounded-md cursor-pointer truncate">
                            {khatian == "" ? "Select File" : `${khatian.name}`}
                        </p>
                        <input
                            type="file"
                            className="w-full opacity-0 z-20 cursor-pointer h-full py-2"
                            onChange={(e) => setKhatian(e.target.files[0])}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md">
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700">
                        দলিল PDF <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <div
                        name=""
                        id=""
                        className="bg-transparent w-full relative outline-none flex items-center justify-center"
                    >
                        <p className="text-white text-center py-1 absolute -top-1.5 w-10/12 bg-green-600 rounded-md cursor-pointer truncate">
                            {dolil == "" ? "Select File" : `${dolil.name}`}
                        </p>
                        <input
                            type="file"
                            className="w-full opacity-0 z-20 cursor-pointer h-full py-2"
                            onChange={(e) => setDolil(e.target.files[0])}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md">
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700">
                        ছবি <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <div
                        name=""
                        id=""
                        className="bg-transparent w-full relative outline-none flex items-center justify-center"
                    >
                        <p className="text-white text-center py-1 absolute -top-1.5 w-10/12 bg-green-600 rounded-md cursor-pointer truncate">
                            {photo == "" ? "Select File" : `${photo.name}`}
                        </p>
                        <input
                            type="file"
                            className="w-full opacity-0 z-20 cursor-pointer h-full py-2"
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md">
                    <p className=" absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700">
                        দাখিলা PDF <span className="text-red-500 relative top-1 text-lg ">*</span>
                    </p>
                    <div
                        name=""
                        id=""
                        className="bg-transparent w-full relative outline-none flex items-center justify-center"
                    >
                        <p className="text-white text-center py-1 absolute -top-1.5 w-10/12 bg-green-600 rounded-md cursor-pointer truncate">
                            {dakhila == "" ? "Select File" : `${dakhila.name}`}
                        </p>
                        <input
                            type="file"
                            className="w-full opacity-0 z-20 cursor-pointer h-full py-2"
                            onChange={(e) => setDakhila(e.target.files[0])}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 text-lg font-semibold bg-green-600 hover:bg-transparent border border-green-600 transition-all duration-300 hover:text-green-600 text-white rounded-lg" onClick={() => {
                        !user.active_balance ? setActiveBalance(true) : setTakaKata(true);
                        // setMessage('সার্ভারে কাজ চলছে!');
                    }}
                >
                    জমা দিন
                </button>
            </div>

            <div className="w-full h-auto flex flex-col items-center mt-10 gap-y-5">
                <h1 className="text-xl font-bold">কাজের বিবরণ</h1>
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full grid grid-cols-12 bg-green-600 text-white font-bold">
                        <p className="text-center border-r border-l border-b py-3">ক্রঃ</p>
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
                            LandTax3.slice().reverse().filter((currElm) => currElm.email === user.email).map((elem, index) => {
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
                                            <a href={elem.status === 'reject' ? '' : elem.khatian_url?.replace('/upload/', '/upload/fl_attachment/')} rel="noopener noreferrer" className={`text-center text-sm border-r border-b py-3 overflow-x-scroll flex items-center text-red-600 justify-center ${elem.status === 'reject' ? 'pointer-events-none' : 'pointer-events-auto'}`}>{elem.status === 'reject' ? <ImCross /> : <span className='bg-green-700 text-white w-fit p-1 rounded-md'>Download</span>}</a>
                                            <a href={elem.status === 'reject' ? '' : elem.dolil_url?.replace('/upload/', '/upload/fl_attachment/')} rel="noopener noreferrer" className={`text-center text-sm border-r border-b py-3 overflow-x-scroll flex items-center text-red-600 justify-center ${elem.status === 'reject' ? 'pointer-events-none' : 'pointer-events-auto'}`}>{elem.status === 'reject' ? <ImCross /> : <span className='bg-green-700 text-white w-fit p-1 rounded-md'>Download</span>}</a>
                                            <a href={elem.status === 'reject' ? '' : elem.photo_url?.replace('/upload/', '/upload/fl_attachment/')} rel="noopener noreferrer" className={`text-center text-sm border-r border-b py-3 overflow-x-scroll flex items-center text-red-600 justify-center ${elem.status === 'reject' ? 'pointer-events-none' : 'pointer-events-auto'}`}>{elem.status === 'reject' ? <ImCross /> : <span className='bg-green-700 text-white w-fit p-1 rounded-md'>Download</span>}</a>
                                            <a href={elem.status === 'reject' ? '' : elem.dakhila_url?.replace('/upload/', '/upload/fl_attachment/')} rel="noopener noreferrer" className={`text-center text-sm border-r border-b py-3 overflow-x-scroll flex items-center text-red-600 justify-center ${elem.status === 'reject' ? 'pointer-events-none' : 'pointer-events-auto'}`}>{elem.status === 'reject' ? <ImCross /> : <span className='bg-green-700 text-white w-fit p-1 rounded-md'>Download</span>}</a>

                                            <div className={`text-center border-r border-b ${elem.status === 'complete' ? 'text-green-700' : 'text-red-600'} py-3 overflow-x-scroll`}>{elem.status === 'complete' ? (
                                                <a href={elem.action?.replace("/upload/", "/upload/fl_attachment/")} className="text-3xl flex items-center justify-center"><ImFolderDownload /></a>
                                            ) : <span className="text-3xl flex items-center justify-center">{elem.status === 'reject' ? <ImCross /> : <span className='text-lg'>{elem.status}</span>}</span>}</div>
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