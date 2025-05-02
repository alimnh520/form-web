"use client";
import { MdSend } from "react-icons/md";
import { FaEdit, FaMailBulk } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoCall, IoClose } from "react-icons/io5";
import { UserProvider } from "../ChildCom";
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

const page = () => {
  const [name, setName] = useState(false);
  const [newName, setNewName] = useState('');
  const [image, setImage] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [displayImage, setDisplayImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState(false);

  const router = useRouter();
  const { admin } = useContext(UserProvider);
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
    getAdminNotice()
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
    <div className="w-full h-auto flex flex-col items-center justify-start bg-green-100 relative">

      <div className="w-full h-12 flex gap-3 items-center justify-between px-10 sm:px-5">
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
        <button className="bg-green-700 text-white w-40 h-full" onClick={() => setNoticeBtn(!noticeBtn)}>SET NOTICE</button>
      </div>

      <div className="h-full w-full flex items-start justify-between gap-x-5 sm:relative border-t border-t-green-700">

        <div className="hidden sm:block absolute left-2 top-[16px] text-green-700 text-3xl cursor-pointer z-10" onClick={() => setProfile(true)}>
          <FaUserCircle />
        </div>

        <div className={`h-auto flex items-center justify-start sm:absolute sm:z-10 transition-all duration-300 ${profile ? 'sm:left-0' : 'sm:-left-full'} ${hideMenu ? 'w-0 overflow-hidden px-0 opacity-0' : 'w-1/4 opacity-100'} sm:w-full`}>

          {
            loading && (
              <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30 bg-white">
                <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
              </div>
            )
          }
          {
            message && (
              <p className="w-80 px-4 py-1.5 bg-[rgba(239,68,68,0.5)] text-white z-30 text-center flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                {message}
              </p>

            )
          }

          <div className="bg-white border-r-2 w-full flex flex-col items-center p-5 gap-y-5 h-full shadow-[4px_0px_8px_rgba(0,0,0,0.5)]">

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

            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false)
              setDcrPayment(false);
              setProsason(false);
              setUddokta(!isUddokta);
            }}>উদ্যোক্তা <span className={`absolute right-5 bg-white p-1.5 rounded-full ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false)
              setUddokta(false);
              setDcrPayment(false);
              setProsason(!prosason);
            }}>প্রশাসনিক <span className={`absolute right-5 bg-white p-1.5 rounded-full ${prosason ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false)
              setProsason(false);
              setUddokta(false);
              setDcrPayment(!dcrPayment);
            }}>ডি,সি,আর পেমেন্ট <span className={`absolute right-5 bg-white p-1.5 rounded-full ${dcrPayment ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(!landTax3);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
            }}>মিউটেশন <span className={`absolute right-5 bg-white p-1.5 rounded-full ${landTax3 ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(!landTaxSelf);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
            }}>প্রতিনিধি ভূমি উন্নয়ন কর <span className={`absolute right-5 bg-white p-1.5 rounded-full ${landTaxSelf ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(false);
              setLandTax2(!landTax2);
              setLandTax3(false);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
            }}>ভূমি উন্নয়ন কর <span className={`absolute right-5 bg-white p-1.5 rounded-full ${landTax2 ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(!landTax);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
            }}>ভূমি রেকর্ড ও ম্যাপ
              <span className={`absolute right-5 bg-white p-1.5 rounded-full ${landTax ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
              setNidCard(false);
              setServerNidCard(!serverNidCard);
            }}>NID সার্ভার কপি <span className={`absolute right-5 bg-white p-1.5 rounded-full ${serverNidCard ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
              setServerNidCard(false);
              setNidCard(!nidCard);
            }}>NID কার্ড<span className={`absolute right-5 bg-white p-1.5 rounded-full ${nidCard ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg">জন্ম নিবন্ধন অনলাইন কপি <span className={`absolute right-5 bg-white p-1.5 rounded-full ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg">নতুন জন্ম নিবন্ধন আবেদন কপি <span className={`absolute right-5 bg-white p-1.5 rounded-full ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg">নতুন পাসপোর্ট আবেদন <span className={`absolute right-5 bg-white p-1.5 rounded-full ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
          </div>


          <div className="hidden sm:block absolute right-2 z-10 opacity-100 top-2 text-3xl cursor-pointer" onClick={() => setProfile(false)}>
            <IoClose />
          </div>
        </div>

        <button className="text-3xl text-green-700 mt-5 sm:hidden" onClick={() => setHideMenu(!hideMenu)}>
          <LuMenu />
        </button>

        <div className={`h-screen ${hideMenu ? 'w-11/12' : 'w-3/4'} p-4 flex flex-col items-center justify-start gap-y-4 sm:w-full sm:h-auto relative`}>

          {
            isUddokta && <Uddokta />
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
            !isUddokta && !prosason && !dcrPayment && !landTax && !landTax2 && !landTax3 && !landTaxSelf && !nidCard && !serverNidCard && (
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

                <h1 className="text-4xl font-thin sm:text-2xl">ভূমি উন্নয়ন দাখিলার আবেদন</h1>
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
