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
  const [missKase, setMissKase] = useState(false);


  const [landSeba, setLandSeba] = useState(false);
  const [nidSeba, setNidSeba] = useState(false);
  const [probasiSeba, setProbasiSeba] = useState(false);
  const [dobSeba, setDobSeba] = useState(false);
  const [customerSeba, setCustomerSeba] = useState(false);

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
      case recharge:
        document.title = 'রিচার্জ'
        break;
      case prosason:
        document.title = 'প্রশাসনিক'
        break;
      case subAdmin:
        document.title = 'সহকারী কর্মকর্তা'
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
      case mouzamap:
        document.title = 'মৌজা ম্যাপ'
        break;
      case serverNidCard:
        document.title = 'NID সার্ভার কপি'
        break;
      case nidCard:
        document.title = 'NID কার্ড'
        break;
      // case nidCard:
      //   document.title = 'জন্ম নিবন্ধন অনলাইন কপি'
      //   break;
      // case nidCard:
      //   document.title = 'নতুন জন্ম নিবন্ধন আবেদন কপি'
      //   break;
      // case driving:
      //   document.title = 'নতুন পাসপোর্ট আবেদন'
      //   break;
      case driving:
        document.title = 'ড্রাইভিং লাইসেন্স'
        break;
      default:
        document.title = 'ড্যাশবোর্ড'
        break;
    }

    if (path === '/dashboard') {
      document.body.style.background = 'rgb(220,252,231)'
    }

  }, [dcrPayment, subAdmin, landTax, landTax2, landTax3, landTaxSelf, nidCard, serverNidCard, prosason, isUddokta, mouzamap, recharge, driving]);

  useEffect(() => {
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
  }, []);

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
        setNoticeBtn(false);
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
    <div className="w-full flex flex-col items-center justify-start bg-green-100 relative sm-device">

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

      <div className="w-full flex items-start justify-between gap-x-5 border-t border-t-green-700">

        <div className={`bg-white p-3 scroll-smooth gap-y-5 shadow-[4px_0px_8px_rgba(0,0,0,0.5)] h-screen overflow-y-scroll flex flex-col items-center justify-start transition-all duration-300 ${hideMenu ? 'w-0 overflow-hidden px-0 opacity-0' : 'w-1/4 opacity-100'}`}>

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


          {/* set new image */}

          <div className="w-10/12 h-auto transition-all duration-300 flex flex-col items-center justify-center p5-5 border border-[#59b8a0]">
            <div className="size-40 rounded-full self-center relative">
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
                  <img src={admin ? admin.image_url : '/use'} alt="" className="w-full h-full object-cover object-center rounded-full" />
                )
              }
            </div>
            <div className={`w-full ${image ? 'h-10' : 'h-0'} transition-all duration-300 overflow-hidden flex items-center justify-between`}>
              <input type="file" className="w-3/4 outline-none border border-gray-400 px-4 py-1" onChange={(e) => {
                setNewImage(e.target.files[0]);
                setDisplayImage(URL.createObjectURL(e.target.files[0]));
              }} />
              <button className="w-1/4 py-[7px] text-white bg-green-700 border border-green-700" onClick={handleEditPhoto}>set</button>
            </div>

            {/* set new name */}

            <div className="w-full flex items-center mt-4 text-white justify-center py-1 relative bg-[#59b8a0]">
              <p className="text-2xl font-semibold">{admin ? admin.username : 'loading...'}</p>
              <button className="text-lg bg-red-700 p-1.5 absolute right-3" onClick={() => {
                setName(!name);
                setImage(false);
              }}>
                <FaEdit />
              </button>
            </div>
            <div className={`w-full ${name ? 'h-10' : 'h-0'} transition-all duration-300 overflow-hidden flex items-center justify-between`}>
              <input type="text" className="w-3/4 outline-none border border-gray-400 px-4 py-1.5" value={newName} onChange={(e) => setNewName(e.target.value)} />
              <button className="w-1/4 py-1.5 text-white bg-green-700 border border-green-700" onClick={handleNameEdit}>set</button>
            </div>
          </div>

          {/* options */}


          <div className="w-full flex flex-col items-center justify-start gap-y-5">

            <div className={`w-full transition-all duration-300 bg-white overflow-y-hidden ${customerSeba ? 'h-[290px]' : 'h-12'} flex flex-col items-center gap-y-5`}>

              <button className={`py-1.5 w-10/12 h-12 border ${customerSeba ? 'text-black bg-white' : 'bg-[#59b8a0] text-white'} hover:text-black hover:bg-white transition-all duration-300 group border-[#59b8a0] bg-[#59b8a0] items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
                setLandSeba(false);
                setNidSeba(false);
                setProbasiSeba(false);
                setDobSeba(false);
                setCustomerSeba(!customerSeba);
              }}>উদ্যোক্তা সেবা<span className={`absolute group-hover:bg-[#59b8a0] group-hover:text-white right-2 p-1.5 rounded-full ${customerSeba ? 'rotate-180 text-white bg-[#59b8a0]' : 'rotate-0 bg-white text-black'} transition-all duration-300`}><IoIosArrowDown /></span></button>

              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
                setLandTax(false);
                setLandTax2(false);
                setLandTax3(false);
                setLandTaxSelf(false);
                setDcrPayment(false);
                setProsason(false);
                setUddokta(!isUddokta);
                setNidCard(false);
                setMouzaMap(false);
                setMissKase(false);
                setDriving(false);
                setServerNidCard(false);
                setSubAdmin(false);
                setRecharge(false);
              }}>উদ্যোক্তা <span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
                setLandTax(false);
                setLandTax2(false);
                setLandTax3(false);
                setLandTaxSelf(false)
                setDcrPayment(false);
                setProsason(false);
                setUddokta(false);
                setNidCard(false);
                setMouzaMap(false);
                setMissKase(false);
                setDriving(false);
                setServerNidCard(false);
                setSubAdmin(false);
                setRecharge(!recharge);
              }}>রিচার্জ <span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${recharge ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
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
                setMissKase(false);
                setDriving(false);
                setServerNidCard(false);
                setSubAdmin(false);
              }}>প্রশাসনিক <span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${prosason ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
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
                setMissKase(false);
                setDriving(false);
                setServerNidCard(false);
                setSubAdmin(!subAdmin);
              }}>সহকারী কর্মকর্তা <span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${subAdmin ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>

            </div>


            <div className={`w-full transition-all duration-300 overflow-y-hidden bg-white ${landSeba ? 'h-[480px]' : 'h-12'} flex flex-col items-center gap-y-5`}>

              <button className={`py-1.5 w-10/12 h-12 border ${landSeba ? 'text-black bg-white' : 'bg-[#59b8a0] text-white'} hover:text-black hover:bg-white transition-all duration-300 group border-[#59b8a0] bg-[#59b8a0] items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
                setLandSeba(!landSeba);
                setNidSeba(false);
                setProbasiSeba(false);
                setDobSeba(false);
                setCustomerSeba(false);
              }}>ভূমি সেবা<span className={`absolute group-hover:bg-[#59b8a0] group-hover:text-white right-2 p-1.5 rounded-full ${landSeba ? 'rotate-180 text-white bg-[#59b8a0]' : 'rotate-0 bg-white text-black'} transition-all duration-300`}><IoIosArrowDown /></span></button>

              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('ডি,সি,আর পেমেন্ট') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
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
                setMissKase(false);
                setDriving(false);
                setServerNidCard(false);
                setSubAdmin(false);
              }}>ডি,সি,আর পেমেন্ট <span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${dcrPayment ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('মিউটেশন') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
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
                setMissKase(false);
                setDriving(false);
                setServerNidCard(false);
                setSubAdmin(false);
              }}>মিউটেশন <span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${landTax3 ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('প্রতিনিধি ভূমি উন্নয়ন কর') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
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
                setMissKase(false);
                setDriving(false);
                setServerNidCard(false);
                setSubAdmin(false);
              }}>প্রতিনিধি ভূমি উন্নয়ন কর <span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${landTaxSelf ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('ভূমি উন্নয়ন কর') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
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
                setMissKase(false);
                setDriving(false);
                setServerNidCard(false);
                setSubAdmin(false);
              }}>ভূমি উন্নয়ন কর <span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${landTax2 ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('ভূমি রেকর্ড ও ম্যাপ') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
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
                setMissKase(false);
                setDriving(false);
                setServerNidCard(false);
                setSubAdmin(false);
              }}>ভূমি রেকর্ড ও ম্যাপ
                <span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${landTax ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>

              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('মৌজা ম্যাপ') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
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
                setMissKase(false);
              }}>মৌজা ম্যাপ<span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${mouzamap ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>

              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('খতিয়ান সংসোধন') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
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
                setMouzaMap(false);
                setMissKase(!missKase);
              }}>খতিয়ান সংসোধন<span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${missKase ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>

            </div>


            <div className={`w-full transition-all duration-300 bg-white overflow-y-hidden ${nidSeba ? 'h-[175px]' : 'h-12'} flex flex-col items-center gap-y-5`}>

              <button className={`py-1.5 w-10/12 h-12 border ${nidSeba ? 'text-black bg-white' : 'bg-[#59b8a0] text-white'} hover:text-black hover:bg-white transition-all duration-300 group border-[#59b8a0] bg-[#59b8a0] items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
                setLandSeba(false);
                setNidSeba(!nidSeba);
                setProbasiSeba(false);
                setDobSeba(false);
                setCustomerSeba(false);
              }}>NID কার্ড সেবা<span className={`absolute group-hover:bg-[#59b8a0] group-hover:text-white right-2 p-1.5 rounded-full ${nidSeba ? 'rotate-180 text-white bg-[#59b8a0]' : 'rotate-0 bg-white text-black'} transition-all duration-300`}><IoIosArrowDown /></span></button>

              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('NID সার্ভার কপি') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
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
                setMissKase(false);
                setDriving(false);
                setServerNidCard(!serverNidCard);
                setSubAdmin(false);
              }}>NID সার্ভার কপি <span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${serverNidCard ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('NID কার্ড') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
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
                setMissKase(false);
                setDriving(false);
              }}>NID কার্ড<span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${nidCard ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>

            </div>



            <div className={`w-full transition-all duration-300 overflow-y-hidden bg-white ${dobSeba ? 'h-[175px]' : 'h-12'} flex flex-col items-center gap-y-5`}>

              <button className={`py-1.5 w-10/12 h-12 border ${dobSeba ? 'text-black bg-white' : 'bg-[#59b8a0] text-white'} hover:text-black hover:bg-white transition-all duration-300 group border-[#59b8a0] bg-[#59b8a0] items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
                setLandSeba(false);
                setNidSeba(false);
                setProbasiSeba(false);
                setDobSeba(!dobSeba);
                setCustomerSeba(false);
              }}>জন্ম নিবন্ধন সেবা<span className={`absolute group-hover:bg-[#59b8a0] group-hover:text-white right-2 p-1.5 rounded-full ${dobSeba ? 'rotate-180 text-white bg-[#59b8a0]' : 'rotate-0 bg-white text-black'} transition-all duration-300`}><IoIosArrowDown /></span></button>

              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('জন্ম নিবন্ধন অনলাইন কপি') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`}>জন্ম নিবন্ধন অনলাইন কপি <span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>

              <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('নতুন জন্ম নিবন্ধন আবেদন কপি') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`}>নতুন জন্ম নিবন্ধন আবেদন কপি <span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>


            </div>


            <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('নতুন পাসপোর্ট আবেদন') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`}>নতুন পাসপোর্ট আবেদন <span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>

            <button className={`py-1.5 w-10/12 h-12 text-white border border-[#6cb859] bg-[#6cb859] ${admin?._id === '67b9c9b18529900963e44adf' || admin?.workList?.includes('ড্রাইভিং লাইসেন্স BRTA') ? 'flex' : 'hidden'} items-center justify-center cursor-pointer relative text-lg`} onClick={() => {
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
              setMissKase(false);
              setDriving(!driving);
            }}>ড্রাইভিং লাইসেন্স BRTA<span className={`absolute right-2 bg-white p-1.5 rounded-full text-black ${driving ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
          </div>

        </div>

        <button className="text-3xl text-green-700 mt-5" onClick={() => setHideMenu(!hideMenu)}>
          <LuMenu />
        </button>

        <div className={`h-screen overflow-y-scroll transition-all duration-300 ${hideMenu ? 'w-11/12' : 'w-3/4'} p-4 flex flex-col items-center justify-start gap-y-4 relative`}>

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
            driving && <Driving />
          }

          {
            !isUddokta && !prosason && !dcrPayment && !landTax && !landTax2 && !landTax3 && !landTaxSelf && !nidCard && !serverNidCard && !subAdmin && !mouzamap && !recharge && !driving && !missKase && (
              <div className="bg-green-100 w-full flex flex-col items-center justify-center px-4 py-10 space-y-6">
                <h2 className="text-xl font-semibold text-black">
                  রাজিম ল্যান্ড সার্ভিস এন্ড কনসালটেন্ট <span className="text-green-700">(অনলাইন)</span>
                </h2>

                <h1 className="text-3xl font-bold text-green-800">ড্যাশবোর্ডে আপনাকে স্বাগতম !</h1>


                <div className="bg-white rounded-md p-4 border border-green-300 shadow-md w-full max-w-sm text-center space-y-2">
                  <p className="text-gray-700">জরুরী প্রয়োজনে কল বা ইমেইল করুন</p>
                  <p className="text-green-800 font-semibold">
                    মোবাইল নম্বর: 📞 01850685033
                  </p>
                  <p className="text-green-800 font-semibold">
                    ইমেইল: 📧 uddokta@bdl.tax
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-black mt-4">
                  ভূমি উন্নয়ন দাখিলার আবেদন
                </h2>

                <div className="flex gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold">
                    দাখিলা ফর্ম
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold">
                    দাখিলা প্রিন্ট
                  </button>
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
