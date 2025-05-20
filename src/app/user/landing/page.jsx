'use client'
import { IoMdLogOut } from "react-icons/io";
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";
import { LuMenu } from "react-icons/lu";
import { FaMailBulk, FaUserCircle } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { UserProvider } from '@/app/ChildCom';
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

const page = () => {
    const router = useRouter();
    const { user } = useContext(UserProvider);
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

    // tax form hidden & show
    const [landTax, setLandTax] = useState(false);
    const [landTax2, setLandTax2] = useState(false);
    const [landTax3, setLandTax3] = useState(false);
    const [landTaxSelf, setLandTaxSelf] = useState(false);
    const [dcrPayment, setDcrPayment] = useState(false);
    const [nidCard, setNidCard] = useState(false);
    const [ServerNidCard, setServerNidCard] = useState(false);

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

    }, [dcrPayment,landTax,landTax2,landTax3,landTaxSelf,nidCard,ServerNidCard]);

    return (
        <div className="w-full h-auto flex flex-col items-center -mt-16 justify-start bg-[#eff9f1] relative sm-device">

            {
                loading && (
                    <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30 bg-white">
                        <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
                    </div>
                )
            }

            {
                message && (
                    <p className="px-10 py-1.5 bg-[rgba(239,68,68,0.9)] text-white text-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30">
                        {message}
                    </p>

                )
            }

            <div className="w-full h-20 bg-white px-20 flex justify-between items-center shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-10 gap-x-5">
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
                    <button className="text-[34px] justify-self-start" onClick={handleLogout}>
                        <IoMdLogOut />
                    </button>
                    <p className="text-black flex items-center justify-center gap-x-0.5 text-3xl mt-1.5 pl-5">{user && user.balance}<span className="-mt-1"><HiOutlineCurrencyBangladeshi /></span></p>
                </div>
            </div>

            <div className="w-full h-full flex items-start justify-center relative mt-3 gap-x-2">

                <div className={`h-full relative ${hideMenu ? 'w-0 overflow-hidden px-0 opacity-0' : 'w-3/12 px-10 opacity-100'} transition-all duration-300 bg-white flex flex-col pt-5 items-start gap-y-5`}>

                    {/* set user image */}

                    <div className="size-40 rounded-full self-center relative">
                        <button className="absolute bottom-2 right-2 text-xl text-white bg-red-700 rounded-full p-2" onClick={() => setImage(!image)}>
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

                    {
                        image && (
                            <div className="flex items-center justify-center gap-x-3">
                                <input type="file" className="outline-none border border-gray-400 px-4 py-1 w-52 rounded-xl" onChange={(e) => {
                                    setNewImage(e.target.files[0]);
                                    setDisplayImage(URL.createObjectURL(e.target.files[0]));
                                }} />
                                <button className="px-5 py-1.5 text-white bg-green-700 border border-green-700" onClick={handleEditPhoto}>set</button>
                            </div>
                        )
                    }

                    {/* set user name */}

                    <div className="w-full flex items-center justify-center gap-x-2">
                        <p className="text-2xl font-semibold text-center">{user ? user.username : 'Loading...'}</p>
                        <button className="text-lg text-white bg-red-700 rounded-full p-1.5" onClick={() => setName(!name)}>
                            <FaEdit />
                        </button>
                    </div>

                    {
                        name && (
                            <div className="flex items-center justify-center">
                                <input type="text" className="outline-none border border-gray-400 px-4 py-1.5" value={newName} onChange={(e) => setNewName(e.target.value)} />
                                <button className="px-5 py-1.5 text-white bg-green-700 border border-green-700" onClick={handleNameEdit}>set</button>
                            </div>
                        )
                    }

                    {/* tag option */}

                    <div className="w-full flex text-lg flex-col gap-y-3">
                        <button className={`w-full border ${dcrPayment ? 'bg-green-600 text-white' : 'bg-white'} border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                            setLandTax(false);
                            setLandTax2(false);
                            setLandTax3(false);
                            setLandTaxSelf(false)
                            setDcrPayment(!dcrPayment);
                            setServerNidCard(false);
                            setNidCard(false);
                        }}>ডি,সি,আর পেমেন্ট</button>
                        <button className={`w-full border ${landTax3 ? 'bg-green-600 text-white' : 'bg-white'} border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                            setLandTax(false);
                            setLandTax2(false);
                            setLandTax3(!landTax3);
                            setLandTaxSelf(false);
                            setDcrPayment(false);
                            setServerNidCard(false);
                            setNidCard(false);
                        }}>মিউটেশন</button>
                        <button className={`w-full border ${landTaxSelf ? 'bg-green-600 text-white' : 'bg-white'} border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                            setLandTax(false);
                            setLandTax2(false);
                            setLandTax3(false);
                            setLandTaxSelf(!landTaxSelf);
                            setDcrPayment(false);
                            setServerNidCard(false);
                            setNidCard(false);
                        }}>প্রতিনিধি ভূমি উন্নয়ন কর</button>
                        <button className={`w-full border ${landTax2 ? 'bg-green-600 text-white' : 'bg-white'} border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                            setLandTax(false);
                            setLandTax2(!landTax2);
                            setLandTax3(false);
                            setLandTaxSelf(false);
                            setDcrPayment(false);
                            setServerNidCard(false);
                            setNidCard(false);
                        }}>ভূমি উন্নয়ন কর</button>
                        <button className={`w-full border ${landTax ? 'bg-green-600 text-white' : 'bg-white'} border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                            setLandTax(!landTax);
                            setLandTax2(false);
                            setLandTax3(false);
                            setLandTaxSelf(false);
                            setDcrPayment(false);
                            setServerNidCard(false);
                            setNidCard(false);
                        }}>ভূমি রেকর্ড ও ম্যাপ
                        </button>
                        <button className={`w-full border ${ServerNidCard ? 'bg-green-600 text-white' : 'bg-white'} border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                            setLandTax(false);
                            setLandTax2(false);
                            setLandTax3(false);
                            setLandTaxSelf(false);
                            setDcrPayment(false);
                            setNidCard(false);
                            setServerNidCard(!ServerNidCard);
                        }}>NID সার্ভার কপি</button>
                        <button className={`w-full border ${nidCard ? 'bg-green-600 text-white' : 'bg-white'} border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`} onClick={() => {
                            setLandTax(false);
                            setLandTax2(false);
                            setLandTax3(false);
                            setLandTaxSelf(false);
                            setDcrPayment(false);
                            setServerNidCard(false);
                            setNidCard(!nidCard);
                        }}>NID কার্ড</button>
                        <button className={`w-full border ${ false ? 'bg-green-600 text-white' : 'bg-white'} border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`}>জন্ম নিবন্ধন অনলাইন কপি</button>
                        <button className={`w-full border ${ false ? 'bg-green-600 text-white' : 'bg-white'} border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`}>নতুন জন্ম নিবন্ধন আবেদন কপি</button>
                        <button className={`w-full border ${ false ? 'bg-green-600 text-white' : 'bg-white'} border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`}>নতুন পাসপোর্ট আবেদন</button>
                        <button className={`w-full border ${ false ? 'bg-green-600 text-white' : 'bg-white'} border-green-600 rounded-md px-4 py-1.5 hover:bg-green-600 hover:text-white transition-all duration-300`}>বিবরণ</button>
                    </div>

                </div>

                {/* middle width slide */}

                <button className="text-3xl text-green-700 mt-5" onClick={() => setHideMenu(!hideMenu)}>
                    <LuMenu />
                </button>

                {/* display tax data */}

                <div className={`h-screen ${hideMenu ? 'w-11/12' : 'w-9/12'} bg-white transition-all duration-300`}>
                    {
                        !dcrPayment && !landTax && !landTax2 && !landTax3 && !landTaxSelf && !nidCard && !ServerNidCard && (
                            <div className="w-full flex flex-col items-center gap-y-4 mt-16">
                                <h1 className="text-xl font-semibold text-center">রাজিম ল্যান্ড সার্ভিস এন্ড কনসালটেন্ট <span className="text-green-700">(অনলাইন)</span></h1>
                                <h1 className="text-3xl font-light text-center text-green-700">আপনাকে স্বাগতম !</h1>

                                <div className="flex flex-col items-center gap-y-3 mt-10 text-green-700 w-80">
                                    <Link href="/office" className="text-3xl flex items-center justify-center gap-x-2 font-semibold text-center text-green-700">ড্যাশবোর্ড <span><FaArrowRight /></span></Link>
                                    <p className="text-xl">জরুরী প্রয়োজনে কল বা ইমেইল করুন</p>

                                    <div className="w-full h-24 rounded-lg border border-green-700 p-5 flex flex-col gap-y-1 items-start justify-center">
                                        <p className="flex items-center text-lg justify-center gap-x-2">মোবাইল নম্বর: <span><IoCall /></span> 01850685033</p>
                                        <p className="flex items-center text-lg justify-center gap-x-2">ইমেইল: <span><FaMailBulk /></span> uddokta@bdl.tax</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {
                        dcrPayment && <DCRpayment />
                    }
                    {
                        landTax && <LandTax />
                    }
                    {
                        landTax2 && <LandTax2 />
                    }
                    {
                        landTax3 && <LandTax3 />
                    }
                    {
                        landTaxSelf && <SelfLandTax />
                    }
                    {
                        nidCard && <NIDcard />
                    }
                    {
                        ServerNidCard && <NIDserverCopy />
                    }
                </div>
            </div>
        </div>
    )
}

export default page
