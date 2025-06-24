"use client";
import { MdSend } from "react-icons/md";
import { FaEdit, FaMailBulk } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { IoCall, IoClose } from "react-icons/io5";
import { UserProvider } from "../user/ChildCom";
import { LandTax } from "./pages/LandTax";
import { LandTax2 } from "./pages/LandTax2";
import { LandTax3 } from "./pages/LandTax3";
import { SelfLandTax } from "./pages/SelfLandTax";
import { DCRpayment } from "./pages/DCRpayment";
import { FaArrowRight } from "react-icons/fa6";
import { LuMenu } from "react-icons/lu";
import { Uddokta } from "./pages/Uddokta";
import { Prosason } from "./pages/Prosason";
import { NIDcard } from "./pages/NIDcard";
import { NIDserverCopy } from "./pages/NIDserverCopy";
import SubAdmin from "./pages/SubAdmin";
import { MouzaMap } from "./pages/MouzaMap";
import Recharge from "./pages/Recharge";
import { Driving } from "./pages/Driving";

const page = () => {
  const [name, setName] = useState(false);
  const [newName, setNewName] = useState('');
  const [image, setImage] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [displayImage, setDisplayImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();
  const { admin } = useContext(UserProvider);
  const path = usePathname();
  const [hideMenu, setHideMenu] = useState(false);

  const [isUddokta, setUddokta] = useState(false);
  const [prosason, setProsason] = useState(false);
  const [landTax, setLandTax] = useState(false);
  const [landTax2, setLandTax2] = useState(false);
  const [landTax3, setLandTax3] = useState(false);
  const [landTaxSelf, setLandTaxSelf] = useState(false);
  const [dcrPayment, setDcrPayment] = useState(false);
  const [nidCard, setNidCard] = useState(false);
  const [serverNidCard, setServerNidCard] = useState(false);
  const [subAdmin, setSubAdmin] = useState(false);
  const [mouzamap, setMouzaMap] = useState(false);
  const [recharge, setRecharge] = useState(false);
  const [driving, setDriving] = useState(false);

  if (message) {
    setTimeout(() => {
      setMessage('');
    }, 1500);
  }

  const [notice, setNotice] = useState('');
  const [noticeMessage, setNoticeMessage] = useState('');
  const [noticeBtn, setNoticeBtn] = useState(false);

  useEffect(() => {
    switch (true) {
      case isUddokta:
        document.title = 'উদ্যোক্তা'
        break;
      case prosason:
        document.title = 'প্রশাসনিক'
        break;
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
      case serverNidCard:
        document.title = 'NID সার্ভার কপি'
        break;
      case nidCard:
        document.title = 'NID কার্ড'
        break;
      default:
        document.title = 'ড্যাশবোর্ড'
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

    if (path === '/dashboard') {
      document.body.style.background = 'rgb(220,252,231)'
    }

  }, [dcrPayment, landTax, landTax2, landTax3, landTaxSelf, nidCard, serverNidCard, prosason, isUddokta]);

  const submitNotice = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/notice', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: noticeMessage })
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
  // admin edit name

  const handleNameEdit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/edit-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: admin.username, newName })
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

  // admin edit photo

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
      formData.append('username', admin.username);
      formData.append('newImage', newImage);
      formData.append('public_url', admin.public_url);
      const res = await fetch('/api/admin/edit-photo', {
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

  return (
    <div className="w-full h-auto flex flex-col items-center justify-start bg-green-100 relative sm-device">

      <div className="w-full h-12 flex gap-3 items-center justify-between px-10">
        <img src="/user/notice-icon-png.webp" alt="" className="h-10 justify-self-start" />
        <div className="w-full h-full rounded-md flex items-center justify-end">
          <marquee behavior="smooth" direction="rtl" className="font-semibold text-lg">
            {!noticeBtn && (
              notice ? notice[0].message : 'Loading......'
            )}
          </marquee>
          {
            noticeBtn && (
              <div className="flex items-center justify-center w-full h-full justify-self-center">
                <input type="text" className="w-full h-full outline-none px-4 text-lg" value={noticeMessage} onChange={(e) => setNoticeMessage(e.target.value)} />
                <button className="w-20 h-full text-3xl flex items-center justify-center bg-green-700 text-white" onClick={submitNotice}><MdSend /></button>
              </div>
            )
          }
        </div>
        {admin?._id === '67b9c9b18529900963e44adf' &&
          <button className="bg-green-700 text-white w-40 h-full" onClick={() => setNoticeBtn(!noticeBtn)}>SET NOTICE</button>}
      </div>

      <div className="h-full w-full flex items-start justify-between gap-x-5 border-t border-t-green-700">

        <div className={`h-auto flex items-center justify-start transition-all duration-300 ${hideMenu ? 'w-0 overflow-hidden px-0 opacity-0' : 'w-1/4 opacity-100'}`}>

          {
            loading && (
              <div className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 z-30 bg-white">
                <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
              </div>
            )
          }
          {
            message && (
              <p className="w-80 px-4 py-1.5 bg-[rgba(239,68,68,0.5)] text-white z-30 text-center flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2">
                {message}
              </p>

            )
          }

          <div className="bg-white border-r-2 w-full flex flex-col items-center p-5 gap-y-5 h-screen shadow-[4px_0px_8px_rgba(0,0,0,0.5)] overflow-y-scroll">

            {/* set new image */}

            <div className="size-40 rounded-full self-center relative">
              <button className="absolute bottom-2 right-2 text-xl text-white bg-red-700 rounded-full p-2" onClick={() => setImage(!image)}>
                <FaEdit />
              </button>

              {
                displayImage ? (
                  <img src={displayImage} alt="" className="w-full h-full object-cover object-center rounded-full" />
                ) : (
                  <img src={admin ? admin.image_url : '/use'} alt="" className="w-full h-full object-cover object-center rounded-full" />
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

            {/* set new name */}

            <div className="flex items-center justify-center gap-x-2">
              <p className="text-2xl font-semibold">{admin ? admin.username : 'loading...'}</p>
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

            {/* options */}

            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false)
              setDcrPayment(false);
              setProsason(false);
              setUddokta(!isUddokta);
              setNidCard(false);
              setMouzaMap(false);
              setDriving(false);
              setServerNidCard(false);
              setSubAdmin(false);
              setRecharge(false);
            }}>উদ্যোক্তা <span className={`absolute right-5 bg-white p-1.5 rounded-full ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false)
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
              setNidCard(false);
              setMouzaMap(false);
              setDriving(false);
              setServerNidCard(false);
              setSubAdmin(false);
              setRecharge(!recharge);
            }}>রিচার্জ <span className={`absolute right-5 bg-white p-1.5 rounded-full ${recharge ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false)
              setUddokta(false);
              setRecharge(false);
              setDcrPayment(false);
              setProsason(!prosason);
              setNidCard(false);
              setMouzaMap(false);
              setDriving(false);
              setServerNidCard(false);
              setSubAdmin(false);
            }}>প্রশাসনিক <span className={`absolute right-5 bg-white p-1.5 rounded-full ${prosason ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false)
              setUddokta(false);
              setRecharge(false);
              setDcrPayment(false);
              setProsason(false);
              setNidCard(false);
              setMouzaMap(false);
              setDriving(false);
              setServerNidCard(false);
              setSubAdmin(!subAdmin);
            }}>সহকারী কর্মকর্তা <span className={`absolute right-5 bg-white p-1.5 rounded-full ${subAdmin ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('ডি,সি,আর পেমেন্ট') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false)
              setProsason(false);
              setUddokta(false);
              setRecharge(false);
              setDcrPayment(!dcrPayment);
              setNidCard(false);
              setMouzaMap(false);
              setDriving(false);
              setServerNidCard(false);
              setSubAdmin(false);
            }}>ডি,সি,আর পেমেন্ট <span className={`absolute right-5 bg-white p-1.5 rounded-full ${dcrPayment ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('মিউটেশন') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(!landTax3);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
              setRecharge(false);
              setNidCard(false);
              setMouzaMap(false);
              setDriving(false);
              setServerNidCard(false);
              setSubAdmin(false);
            }}>মিউটেশন <span className={`absolute right-5 bg-white p-1.5 rounded-full ${landTax3 ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('প্রতিনিধি ভূমি উন্নয়ন কর') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(!landTaxSelf);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
              setRecharge(false);
              setNidCard(false);
              setMouzaMap(false);
              setDriving(false);
              setServerNidCard(false);
              setSubAdmin(false);
            }}>প্রতিনিধি ভূমি উন্নয়ন কর <span className={`absolute right-5 bg-white p-1.5 rounded-full ${landTaxSelf ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('ভূমি উন্নয়ন কর') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
              setLandTax(false);
              setLandTax2(!landTax2);
              setLandTax3(false);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
              setRecharge(false);
              setNidCard(false);
              setMouzaMap(false);
              setDriving(false);
              setServerNidCard(false);
              setSubAdmin(false);
            }}>ভূমি উন্নয়ন কর <span className={`absolute right-5 bg-white p-1.5 rounded-full ${landTax2 ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('ভূমি রেকর্ড ও ম্যাপ') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
              setLandTax(!landTax);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
              setRecharge(false);
              setNidCard(false);
              setMouzaMap(false);
              setDriving(false);
              setServerNidCard(false);
              setSubAdmin(false);
            }}>ভূমি রেকর্ড ও ম্যাপ
              <span className={`absolute right-5 bg-white p-1.5 rounded-full ${landTax ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('NID সার্ভার কপি') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
              setRecharge(false);
              setNidCard(false);
              setMouzaMap(false);
              setDriving(false);
              setServerNidCard(!serverNidCard);
              setSubAdmin(false);
            }}>NID সার্ভার কপি <span className={`absolute right-5 bg-white p-1.5 rounded-full ${serverNidCard ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('NID কার্ড') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
              setRecharge(false);
              setServerNidCard(false);
              setSubAdmin(false);
              setNidCard(!nidCard);
              setMouzaMap(false);
              setDriving(false);
            }}>NID কার্ড<span className={`absolute right-5 bg-white p-1.5 rounded-full ${nidCard ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('মৌজা ম্যাপ') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
              setRecharge(false);
              setServerNidCard(false);
              setSubAdmin(false);
              setNidCard(false);
              setDriving(false);
              setMouzaMap(!mouzamap);
            }}>মৌজা ম্যাপ<span className={`absolute right-5 bg-white p-1.5 rounded-full ${mouzamap ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('ড্রাইভিং লাইসেন্স BRTA') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
              setRecharge(false);
              setServerNidCard(false);
              setSubAdmin(false);
              setNidCard(false);
              setMouzaMap(false);
              setDriving(!driving);
            }}>ড্রাইভিং লাইসেন্স BRTA<span className={`absolute right-5 bg-white p-1.5 rounded-full ${driving ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('জন্ম নিবন্ধন অনলাইন কপি') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`}>জন্ম নিবন্ধন অনলাইন কপি <span className={`absolute right-5 bg-white p-1.5 rounded-full ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('নতুন জন্ম নিবন্ধন আবেদন কপি') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`}>নতুন জন্ম নিবন্ধন আবেদন কপি <span className={`absolute right-5 bg-white p-1.5 rounded-full ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            <button className={`py-1.5 w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('নতুন পাসপোর্ট আবেদন') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`}>নতুন পাসপোর্ট আবেদন <span className={`absolute right-5 bg-white p-1.5 rounded-full ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
          </div>
        </div>

        <button className="text-3xl text-green-700 mt-5" onClick={() => setHideMenu(!hideMenu)}>
          <LuMenu />
        </button>

        <div className={`h-screen overflow-y-scroll ${hideMenu ? 'w-11/12' : 'w-3/4'} p-4 flex flex-col items-center justify-start gap-y-4 relative`}>

          {
            isUddokta && <Uddokta />
          }
          {
            recharge && <Recharge />
          }
          {
            prosason && <Prosason />
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
            serverNidCard && <NIDserverCopy />
          }
          {
            subAdmin && <SubAdmin />
          }
          {
            mouzamap && <MouzaMap />
          }
          {
            driving && <Driving/>
          }

          {
            !isUddokta && !prosason && !dcrPayment && !landTax && !landTax2 && !landTax3 && !landTaxSelf && !nidCard && !serverNidCard && !subAdmin && !mouzamap && !recharge && !driving && (
              <div className="w-full flex flex-col items-center gap-y-4 mt-16">
                <h1 className="text-xl font-semibold text-center">রাজিম ল্যান্ড সার্ভিস এন্ড কনসালটেন্ট <span className="text-green-700">(অনলাইন)</span></h1>
                <h1 className="text-3xl font-light text-center text-green-700">আপনাকে স্বাগতম !</h1>

                <div className="flex flex-col items-center gap-y-3 mt-10 text-green-700 w-80">
                  <Link href="" className="text-3xl flex items-center justify-center gap-x-2 font-semibold text-center text-green-700">ড্যাশবোর্ড <span><FaArrowRight /></span></Link>
                  <p className="text-xl">জরুরী প্রয়োজনে কল বা ইমেইল করুন</p>

                  <div className="w-full h-24 rounded-lg border border-green-700 p-5 flex flex-col gap-y-1 items-start justify-center">
                    <p className="flex items-center text-lg justify-center gap-x-2">মোবাইল নম্বর: <span><IoCall /></span> 01850685033</p>
                    <p className="flex items-center text-lg justify-center gap-x-2">ইমেইল: <span><FaMailBulk /></span> uddokta@bdl.tax</p>
                  </div>
                </div>

                <h1 className="text-4xl font-thin">ভূমি উন্নয়ন দাখিলার আবেদন</h1>
                <div className="flex items-center justify-center gap-x-6">
                  <Link href="/components/fill-form" className="px-6 py-1 bg-blue-600 text-lg font-semibold text-white">দাখিলা ফর্ম</Link>

                  <Link href="/dakhila-print" className="px-6 py-1 bg-blue-600 text-lg font-semibold text-white">দাখিলা প্রিন্ট</Link>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div >
  );
};

export default page;
