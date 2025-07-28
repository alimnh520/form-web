'use client'
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown, IoMdLogOut } from "react-icons/io";
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";
import { LuMenu } from "react-icons/lu";
import { FaMailBulk, FaUserCircle } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { UserProvider } from '@/app/user/ChildCom';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import Link from "next/link";
import { DCRpayment } from "./pages/DCRpayment";
import { LandTax } from "./pages/LandTax";
import { LandTax2 } from "./pages/LandTax2";
import { LandTax3 } from "./pages/LandTax3";
import { SelfLandTax } from "./pages/SelfLandTax";
import { FaArrowRight } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { NIDcard } from "./pages/NIDcard";
import { NIDserverCopy } from "./pages/NIDserverCopy";
import { Driving } from "./pages/Driving";
import { MouzaMap } from "./pages/Mouza";
import { MissKase } from "./pages/MissKase";

const page = () => {
    const router = useRouter();
    const { user, admin } = useContext(UserProvider);

    console.log('Admin is : ', admin);

    const path = usePathname();

    // edit name
    const [name, setName] = useState(false);
    const [newName, setNewName] = useState('');
    // edit image
    const [image, setImage] = useState(false);
    const [newImage, setNewImage] = useState('');
    // display profile photo
    const [displayImage, setDisplayImage] = useState('');

    const [notice, setNotice] = useState('');

    // loading and message animation
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    if (message) {
        setTimeout(() => {
            setMessage('');
        }, 1500);
    }

    // mobile view
    // slide width
    const [hideMenu, setHideMenu] = useState(false);

    const [landSeba, setLandSeba] = useState(false);
    const [nidSeba, setNidSeba] = useState(false);
    const [probasiSeba, setProbasiSeba] = useState(false);
    const [dobSeba, setDobSeba] = useState(false);

    // tax form hidden & show
    const [landTax, setLandTax] = useState(false);
    const [landTax2, setLandTax2] = useState(false);
    const [landTax3, setLandTax3] = useState(false);
    const [landTaxSelf, setLandTaxSelf] = useState(false);
    const [dcrPayment, setDcrPayment] = useState(false);
    const [nidCard, setNidCard] = useState(false);
    const [ServerNidCard, setServerNidCard] = useState(false);
    const [balance, setBalance] = useState(false);
    const [driving, setDriving] = useState(false);
    const [mouzaMap, setMouzaMap] = useState(false);
    const [missKase, setMissKase] = useState(false);

    const [amount, setAmount] = useState('');
    const [trxnum, setTrxnum] = useState('');

    const [newMoney, setNewMoney] = useState('');

    // edit user name
    const handleNameEdit = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/edit-data/editname', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, newName })
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
    // edit user image
    const handleEditPhoto = async () => {
        if (newImage) {
            if ((newImage.size / 1048576) > 3) {
                setMessage('File size is too large');
                return
            }
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('email', user.email);
            formData.append('newImage', newImage);
            formData.append('public_url', user.public_url);
            const res = await fetch('/api/user/edit-data/editphoto', {
                method: 'POST',
                body: formData
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

    // handle logout
    const handleLogout = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email })
            });
            setLoading(false);
            const data = await res.json();
            setMessage(data.message);
            if (data.success) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        switch (true) {
            case dcrPayment:
                document.title = 'ডি,সি,আর পেমেন্ট'
                break;
            case landTax3:
                document.title = 'মিউটেশন'
                break;
            case landTaxSelf:
                document.title = 'প্রতিনিধি ভূমি উন্নয়ন কর'
                break;
            case landTax2:
                document.title = 'ভূমি উন্নয়ন কর'
                break;
            case landTax:
                document.title = 'ভূমি রেকর্ড ও ম্যাপ'
                break;
            case ServerNidCard:
                document.title = 'NID সার্ভার কপি'
                break;
            case nidCard:
                document.title = 'NID কার্ড'
                break;
            default:
                break;
        }

        async function getAdminNotice() {
            try {
                const res = await fetch('/api/admin/notice', { method: 'GET' });
                const data = await res.json();
                setNotice(data.message);
            } catch (error) {
                console.log(error);
            }
        }
        getAdminNotice();

        if (path === '/user/landing') {
            document.body.style.background = '#eff9f1'
        }

    }, [dcrPayment, landTax, landTax2, landTax3, landTaxSelf, nidCard, ServerNidCard]);


    const addPayment = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, username: user.username, amount, trxnum })
            });
            setLoading(false);
            const data = await res.json();
            setMessage(data.message);
            if (data.success) {
                setBalance(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const convertTaka = (taka) => {
        const engToBangla = {
            '1': '১',
            '2': '২',
            '3': '৩',
            '4': '৪',
            '5': '৫',
            '6': '৬',
            '7': '৭',
            '8': '৮',
            '9': '৯',
            '0': '০',
        }
        return taka.toString().replace(/[0-9]/g, digit => engToBangla[digit]);
    }


    return (
        <div className="w-full h-auto flex flex-col items-center -mt-16 justify-start bg-[#eff9f1] relative sm-device">

            {
                loading && (
                    <div className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 z-30 bg-white">
                        <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
                    </div>
                )
            }

            {
                message && (
                    <p className="px-10 py-1.5 bg-[rgba(239,68,68,0.9)] text-white text-center absolute top-1/2 left-1/2 -translate-x-1/2 z-30">
                        {message}
                    </p>

                )
            }



            {balance &&
                <div className="absolute size-96 bg-[#de1d6e] top-40 border z-10 flex flex-col items-center px-1 py-3 gap-y-3 text-white">
                    <div className="w-full relative h-24 px-8 bg-white flex items-center justify-center">

                        <button className="absolute top-0 right-0 bg-[#df1e6f] text-white text-2xl" onClick={() => setBalance(false)}><RxCross2 /></button>

                        <div className="h-12 w-full flex items-center justify-center border-[#de1d6e] border-2 rounded-tl-xl rounded-bl-xl rounded-br-xl">
                            <img src="/logos/1656227518bkash-logo-png.webp" alt="" className="h-16 -mt-2" />
                            <p className="text-2xl mt-2 text-[#de1d6e]">Payment</p>
                        </div>
                    </div>

                    <p className="text-lg text-center">সর্বনিম্ন ১০০ টাকা পেমেন্ট করে ৫ মিনিট অপেক্ষা করুন!</p>
                    {/* <p>Merchant : <span></span> </p> */}
                    <div className="flex items-center justify-center  gap-x-2"><p>মার্সেন্ট নাম্বার : </p> <p className="text-lg mt-0.5"> 01850685033</p> </div>

                    <div className="flex items-center justify-center  gap-x-2"><p>ট্রানজেকশন নাম্বার : </p> <input type="text" className="w-40 bg-white text-black outline-none p-1 rounded" value={trxnum} onChange={(e) => setTrxnum(e.target.value)} /> </div>

                    <div className="flex items-center justify-center  gap-x-2"><p>টাকার পরিমান  : </p> <input type="number" className="w-20 font-semibold bg-white text-black outline-none p-1 rounded" value={amount} onChange={(e) => setAmount(e.target.value)} /> </div>

                    <button className="bg-white font-semibold transition-all duration-300 hover:shadow-[inset_0_0_5px_#de1d6e] px-4 py-1.5 text-lg rounded mt-5 text-[#de1d6e]" onClick={addPayment}>পেমেন্ট করুন</button>

                </div>
            }


            <div className="w-full h-20 bg-white px-12 flex justify-between items-center shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-10 gap-x-5">
                <h1 className="text-[25px] text-green-700 font-bold animate-pulse">অনলাইন সংক্রান্ত সেবা</h1>

                <div className="w-7/12 h-12 flex items-center justify-center gap-x-1">
                    <img src="/user/notice-icon-png.webp" alt="" className="h-full justify-self-start" />
                    <div className="w-full h-full border border-green-700 rounded-md flex items-center justify-end">
                        <marquee behavior="smooth" direction="rtl" className="font-semibold text-lg">
                            {
                                notice ? notice[0].message : 'Loading......'
                            }
                        </marquee>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-x-3 text-green-600">
                    <Link href='/' className="text-4xl justify-self-start">
                        <IoMdHome />
                    </Link>
                    {
                        user && (
                            user?.image_url ? (
                                <img src={user?.image_url} alt="" className="size-8 rounded-full object-cover object-center mt-0.5" />
                            ) : (
                                <span className="text-3xl">
                                    <FaUserCircle />
                                </span>
                            )
                        )
                    }

                    <div className="text-white bg-green-600 flex items-center justify-center gap-x-0.5 text-xl mt-0.5 ml-5 px-4 py-1 rounded-3xl cursor-pointer" onClick={() => setBalance(true)}>
                        <p>{user && convertTaka(newMoney ? newMoney : user?.balance)}</p>
                        <span className="-mt-[3px]">
                            <HiOutlineCurrencyBangladeshi />
                        </span>
                        {/* <span className="-mt-[3px]">
                            <IoIosAddCircleOutline />
                        </span> */}
                    </div>

                    <button className="text-[34px] justify-self-start" onClick={handleLogout}>
                        <IoMdLogOut />
                    </button>

                </div>
            </div>

            <div className="w-full h-full flex items-start justify-center relative mt-3 gap-x-2">

                <div className={`h-screen overflow-y-scroll pb-10 relative ${hideMenu ? 'w-0 overflow-hidden px-0 opacity-0' : 'w-3/12 px-10 opacity-100'} transition-all duration-300 bg-white flex flex-col pt-5 items-start gap-y-5`}>

                    {/* set user image */}

                    <div className={`w-full min-h-56 ${(name || image) && 'min-h-[268px]'} transition-all relative duration-300 pt-2 border overflow-y-hidden bg-white border-green-600 flex flex-col items-center justify-center`}>

                        <div className={`size-40 rounded-full self-center relative transition-all duration-300`}>
                            <button className="absolute bottom-2 right-2 text-xl text-white bg-red-700 rounded-full p-2" onClick={() => {
                                setImage(!image);
                                setName(false);
                            }}>
                                <FaEdit />
                            </button>
                            {
                                displayImage ? (
                                    <img src={displayImage} alt="" className="w-full h-full object-cover object-center rounded-full" />
                                ) : (
                                    <img src={user ? user.image_url : '/user/user-icon-on-transparent-background-free-png.webp'} alt="" className="w-full h-full object-cover object-center rounded-full" />
                                )
                            }
                        </div>

                        <div className={`w-full ${image ? 'h-10' : 'h-0'} transition-all duration-300 overflow-hidden flex items-center justify-between`}>
                            <input type="file" className="w-3/4 outline-none border border-green-600 px-4 py-1" onChange={(e) => {
                                setNewImage(e.target.files[0]);
                                setDisplayImage(URL.createObjectURL(e.target.files[0]));
                            }} />
                            <button className="w-1/4 flex items-center justify-center py-[7px] text-white bg-green-700 border border-green-700" onClick={handleEditPhoto}>set</button>
                        </div>

                        {/* set user name */}

                        <div className="w-full mt-4 transition-all duration-300 bg-green-600 text-white py-1 relative flex items-center justify-center gap-x-2">
                            <p className="text-2xl font-semibold text-center">{user ? user.username : 'Loading...'}</p>
                            <button className="text-lg text-white absolute right-2 bg-red-700 rounded-full p-1.5" onClick={() => {
                                setName(!name);
                                setImage(false);
                            }}>
                                <FaEdit />
                            </button>
                        </div>

                        <div className={`w-full ${name ? 'h-10' : 'h-0'} transition-all duration-300 overflow-hidden flex items-center justify-between`}>
                            <input type="text" className="w-3/4 outline-none border border-green-600 px-4 py-1.5" value={newName} onChange={(e) => setNewName(e.target.value)} />
                            <button className="w-1/4 flex items-center justify-center py-1.5 text-white bg-green-700 border border-green-700" onClick={handleNameEdit}>set</button>
                        </div>

                    </div>


                    {/* tag option */}

                    <div className="w-full flex text-lg flex-col gap-y-4">

                        {/* land sheba */}

                        <div className={`w-full flex text-lg flex-col overflow-y-hidden  gap-y-2.5 transition-all duration-300 ${landSeba ? 'h-[410px]' : 'h-12'}`}>

                            <button className={`w-full border border-green-600 ${landSeba ? 'text-black bg-white' : 'text-white bg-green-600'} px-4 py-1.5 hover:bg-white hover:text-black transition-all duration-300`} onClick={() => {
                                setLandSeba(!landSeba);
                                setNidSeba(false);
                                setProbasiSeba(false);
                                setDobSeba(false);
                            }}>
                                <span className="text-xl">🌾</span> ভূমি সেবা <span className={`absolute right-14 p-1.5 rounded-full ${landSeba ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}><IoIosArrowDown /></span>
                            </button>


                            <button className={`w-full border ${dcrPayment ? 'bg-green-600 text-white' : 'bg-white'} border-green-600  px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                                setLandTax(false);
                                setLandTax2(false);
                                setLandTax3(false);
                                setLandTaxSelf(false);
                                setDcrPayment(!dcrPayment);
                                setServerNidCard(false);
                                setNidCard(false);
                                setDriving(false);
                                setMissKase(false);
                                setMouzaMap(false);
                            }}>ডি,সি,আর পেমেন্ট</button>
                            <button className={`w-full border ${landTax3 ? 'bg-green-600 text-white' : 'bg-white'} border-green-600  px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                                setLandTax(false);
                                setLandTax2(false);
                                setLandTax3(!landTax3);
                                setLandTaxSelf(false);
                                setDcrPayment(false);
                                setServerNidCard(false);
                                setNidCard(false);
                                setDriving(false);
                                setMissKase(false);
                                setMouzaMap(false);
                            }}>মিউটেশন</button>
                            <button className={`w-full border ${landTaxSelf ? 'bg-green-600 text-white' : 'bg-white'} border-green-600  px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                                setLandTax(false);
                                setLandTax2(false);
                                setLandTax3(false);
                                setLandTaxSelf(!landTaxSelf);
                                setDcrPayment(false);
                                setServerNidCard(false);
                                setNidCard(false);
                                setDriving(false);
                                setMissKase(false);
                                setMouzaMap(false);
                            }}>প্রতিনিধি ভূমি উন্নয়ন কর</button>
                            <button className={`w-full border ${landTax2 ? 'bg-green-600 text-white' : 'bg-white'} border-green-600  px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                                setLandTax(false);
                                setLandTax2(!landTax2);
                                setLandTax3(false);
                                setLandTaxSelf(false);
                                setDcrPayment(false);
                                setServerNidCard(false);
                                setNidCard(false);
                                setDriving(false);
                                setMissKase(false);
                                setMouzaMap(false);
                            }}>ভূমি উন্নয়ন কর</button>
                            <button className={`w-full border ${landTax ? 'bg-green-600 text-white' : 'bg-white'} border-green-600  px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                                setLandTax(!landTax);
                                setLandTax2(false);
                                setLandTax3(false);
                                setLandTaxSelf(false);
                                setDcrPayment(false);
                                setServerNidCard(false);
                                setNidCard(false);
                                setDriving(false);
                                setMissKase(false);
                                setMouzaMap(false);
                            }}>ভূমি রেকর্ড ও ম্যাপ
                            </button>
                            <button className={`w-full border ${mouzaMap ? 'bg-green-600 text-white' : 'bg-white'} border-green-600  px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                                setLandTax(false);
                                setLandTax2(false);
                                setLandTax3(false);
                                setLandTaxSelf(false);
                                setDcrPayment(false);
                                setServerNidCard(false);
                                setNidCard(false);
                                setDriving(false);
                                setMissKase(false);
                                setMouzaMap(!mouzaMap);
                            }}>মৌজা ম্যাপ
                            </button>
                            <button className={`w-full border ${missKase ? 'bg-green-600 text-white' : 'bg-white'} border-green-600  px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                                setLandTax(false);
                                setLandTax2(false);
                                setLandTax3(false);
                                setLandTaxSelf(false);
                                setDcrPayment(false);
                                setServerNidCard(false);
                                setNidCard(false);
                                setDriving(false);
                                setMissKase(!missKase);
                                setMouzaMap(false);
                            }}>খতিয়ান সংসোধন
                            </button>

                        </div>

                        {/* nid sheba */}

                        <div className={`w-full flex text-lg flex-col overflow-y-hidden  gap-y-2.5 transition-all duration-300 ${nidSeba ? 'h-[150px]' : 'h-12'}`}>

                            <button className={`w-full border border-green-600 ${nidSeba ? 'text-black bg-white' : 'text-white bg-green-600'} px-4 py-1.5 hover:bg-white hover:text-black transition-all duration-300`} onClick={() => {
                                setLandSeba(false);
                                setNidSeba(!nidSeba);
                                setProbasiSeba(false);
                                setDobSeba(false);
                            }}>
                                <span className="text-xl">🆔</span> NID সেবা <span className={`absolute right-14 p-1.5 rounded-full ${nidSeba ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}><IoIosArrowDown /></span>
                            </button>

                            <button className={`w-full border ${ServerNidCard ? 'bg-green-600 text-white' : 'bg-white'} border-green-600  px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                                setLandTax(false);
                                setLandTax2(false);
                                setLandTax3(false);
                                setLandTaxSelf(false);
                                setDcrPayment(false);
                                setNidCard(false);
                                setDriving(false);
                                setMissKase(false);
                                setMouzaMap(false);
                                setServerNidCard(!ServerNidCard);
                            }}>NID সার্ভার কপি</button>
                            <button className={`w-full border ${nidCard ? 'bg-green-600 text-white' : 'bg-white'} border-green-600  px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                                setLandTax(false);
                                setLandTax2(false);
                                setLandTax3(false);
                                setLandTaxSelf(false);
                                setDcrPayment(false);
                                setServerNidCard(false);
                                setNidCard(!nidCard);
                                setDriving(false);
                                setMissKase(false);
                                setMouzaMap(false);
                            }}>NID কার্ড</button>

                        </div>


                        {/* BOB sheba */}

                        <div className={`w-full flex text-lg flex-col overflow-y-hidden  gap-y-2.5 transition-all duration-300 ${dobSeba ? 'h-[175px]' : 'h-12'}`}>

                            <button className={`w-full border border-green-600 ${dobSeba ? 'text-black bg-white' : 'text-white bg-green-600'} px-4 py-1.5 hover:bg-white hover:text-black transition-all duration-300`} onClick={() => {
                                setLandSeba(false);
                                setNidSeba(false);
                                setProbasiSeba(false);
                                setDobSeba(!dobSeba);
                            }}>
                                <span className="text-xl">📝</span> জন্ম নিবন্ধন সেবা <span className={`absolute right-14 p-1.5 rounded-full ${dobSeba ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}><IoIosArrowDown /></span>
                            </button>

                            <button className={`w-full border ${false ? 'bg-green-600 text-white' : 'bg-white'} border-green-600  px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`}>জন্ম নিবন্ধন অনলাইন কপি</button>
                            <button className={`w-full border ${false ? 'bg-green-600 text-white' : 'bg-white'} border-green-600  px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`}>নতুন জন্ম নিবন্ধন আবেদন কপি</button>

                        </div>

                        <div className={`w-full flex text-lg flex-col overflow-y-hidden  gap-y-2.5 transition-all duration-300 ${probasiSeba ? 'h-24' : 'h-12'}`}>

                            <button className={`w-full border border-green-600 ${probasiSeba ? 'text-black bg-white' : 'text-white bg-green-600'} px-4 py-1.5 hover:bg-white hover:text-black transition-all duration-300`} onClick={() => {
                                setLandSeba(false);
                                setNidSeba(false);
                                setProbasiSeba(!probasiSeba);
                                setDobSeba(false);
                            }}>
                                <span className="text-xl">🌍</span> প্রবাসী সেবা <span className={`absolute right-14 p-1.5 rounded-full ${probasiSeba ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}><IoIosArrowDown /></span>
                            </button>

                            <button className={`w-full border ${false ? 'bg-green-600 text-white' : 'bg-white'} border-green-600  px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`}>নতুন পাসপোর্ট আবেদন</button>
                        </div>

                        <button className={`w-full border ${driving ? 'bg-green-600 text-white' : 'bg-white'} border-green-600  px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                            setLandTax(false);
                            setLandTax2(false);
                            setLandTax3(false);
                            setLandTaxSelf(false);
                            setDcrPayment(false);
                            setServerNidCard(false);
                            setNidCard(false);
                            setDriving(!driving);
                            setMouzaMap(false);
                            setMissKase(false);
                        }}>ড্রাইভিং লাইসেন্স BRTA</button>
                    </div>

                </div>

                {/* middle width slide */}

                <button className="text-3xl text-green-700 mt-5" onClick={() => setHideMenu(!hideMenu)}>
                    <LuMenu />
                </button>

                {/* display tax data */}

                <div className={`h-screen overflow-y-scroll ${hideMenu ? 'w-11/12' : 'w-9/12'} bg-white transition-all duration-300`}>
                    {
                        !dcrPayment && !landTax && !landTax2 && !landTax3 && !landTaxSelf && !nidCard && !ServerNidCard && !driving && !mouzaMap && !missKase && (
                            <div className="max-w-md mx-auto my-10 bg-white shadow-lg border-l-4 border-green-600 rounded-lg p-6 space-y-4 top-1/4 -translate-y-1/4 relative">
                                <h2 className="text-2xl font-bold text-green-700 text-center">
                                    রাজিম ল্যান্ড সার্ভিস এন্ড কনসালটেন্ট (অনলাইন)
                                </h2>

                                <p className="text-gray-700 text-center">আপনাকে স্বাগতম!</p>

                                {admin && (
                                    <Link href="/office">
                                        <div className="text-center bg-green-50 p-4 rounded-md border border-green-200 hover:bg-green-100 cursor-pointer transition">
                                            <p className="font-semibold text-green-800">📊 ড্যাশবোর্ড</p>
                                        </div>
                                    </Link>
                                )}

                                <div className="bg-yellow-100 p-4 rounded-md">
                                    <p className="text-lg font-semibold text-yellow-700 mb-2">
                                        📞 জরুরী প্রয়োজনে যোগাযোগ করুন:
                                    </p>
                                    <div className="text-gray-800 space-y-1">
                                        <p>
                                            📱 মোবাইল নম্বর: <span className="font-bold">01850-685033</span>
                                        </p>
                                        <p>
                                            ✉️ ইমেইল: <span className="font-bold">uddokta@bdl.tax</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {
                        dcrPayment && <DCRpayment getNewMoney={setNewMoney} />
                    }
                    {
                        landTax && <LandTax getNewMoney={setNewMoney} />
                    }
                    {
                        landTax2 && <LandTax2 getNewMoney={setNewMoney} />
                    }
                    {
                        landTax3 && <LandTax3 getNewMoney={setNewMoney} />
                    }
                    {
                        landTaxSelf && <SelfLandTax getNewMoney={setNewMoney} />
                    }
                    {
                        nidCard && <NIDcard getNewMoney={setNewMoney} />
                    }
                    {
                        ServerNidCard && <NIDserverCopy getNewMoney={setNewMoney} />
                    }
                    {
                        driving && <Driving getNewMoney={setNewMoney} />
                    }
                    {
                        mouzaMap && <MouzaMap getNewMoney={setNewMoney} />
                    }
                    {
                        missKase && <MissKase getNewMoney={setNewMoney} />
                    }
                </div>
            </div>
        </div>
    )
}

export default page
