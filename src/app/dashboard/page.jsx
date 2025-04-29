"use client";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { UserProvider } from "../ChildCom";
import { LandTax } from "./pages/LandTax";
import { LandTax2 } from "./pages/LandTax2";
import { LandTax3 } from "./pages/LandTax3";
import { SelfLandTax } from "./pages/SelfLandTax";
import { DCRpayment } from "./pages/DCRpayment";
import { Uddokta } from "./pages/uddokta";
import { Prosason } from "./pages/prosason";

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

  const [isUddokta, setUddokta] = useState(false);
  const [prosason, setProsason] = useState(false);
  const [landTax, setLandTax] = useState(false);
  const [landTax2, setLandTax2] = useState(false);
  const [landTax3, setLandTax3] = useState(false);
  const [landTaxSelf, setLandTaxSelf] = useState(false);
  const [dcrPayment, setDcrPayment] = useState(false);

  if (message) {
    setTimeout(() => {
      setMessage('');
    }, 1500);
  }


  // admin logout

  const logoutPage = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/admin-logout", { method: "POST" });
      const data = await response.json();
      if (data.success) {
        setLoading(false);
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    }
  };

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

      <div className="w-full h-12 bg-red-400 flex items-center justify-between">

      </div>

      <div className="h-full w-full flex items-start justify-between gap-x-5 sm:relative">

        <div className="hidden sm:block absolute left-2 top-[16px] text-green-700 text-3xl cursor-pointer z-10" onClick={() => setProfile(true)}>
          <FaUserCircle />
        </div>

        <div className={`w-1/4 h-auto flex items-center justify-start sm:absolute sm:z-10 transition-all duration-300 ${profile ? 'sm:left-0' : 'sm:-left-full'} sm:w-full`}>

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
                  <img src={admin.image_url ? admin.image_url : '/user/user-icon-on-transparent-background-free-png.webp'} alt="" className="w-full h-full object-cover object-center rounded-full" />
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
            }}>উদ্যোক্তা <span className={`absolute right-5 ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false)
              setUddokta(false);
              setDcrPayment(false);
              setProsason(!prosason);
            }}>প্রশাসনিক <span className={`absolute right-5 ${prosason ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false)
              setProsason(false);
              setUddokta(false);
              setDcrPayment(!dcrPayment);
            }}>ডি,সি,আর পেমেন্ট <span className={`absolute right-5 ${dcrPayment ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(!landTax3);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
            }}>মিউটেশন <span className={`absolute right-5 ${landTax3 ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(false);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(!landTaxSelf);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
            }}>প্রতিনিধি ভূমি উন্নয়ন কর <span className={`absolute right-5 ${landTaxSelf ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(false);
              setLandTax2(!landTax2);
              setLandTax3(false);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
            }}>ভূমি উন্নয়ন কর <span className={`absolute right-5 ${landTax2 ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg" onClick={() => {
              setLandTax(!landTax);
              setLandTax2(false);
              setLandTax3(false);
              setLandTaxSelf(false);
              setDcrPayment(false);
              setProsason(false);
              setUddokta(false);
            }}>ভূমি রেকর্ড ও ম্যাপ
              <span className={`absolute right-5 ${landTax ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg">NID সার্ভার কপি <span className={`absolute right-5 ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg">জন্ম নিবন্ধন অনলাইন কপি <span className={`absolute right-5 ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg">নতুন জন্ম নিবন্ধন আবেদন কপি <span className={`absolute right-5 ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
            <button className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative text-lg">নতুন পাসপোর্ট আবেদন <span className={`absolute right-5 ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span></button>
          </div>


          <div className="hidden sm:block absolute right-2 z-10 opacity-100 top-2 text-3xl cursor-pointer" onClick={() => setProfile(false)}>
            <IoClose />
          </div>
        </div>

        <div className="w-3/4 h-screen p-4 flex flex-col items-center justify-start gap-y-4 sm:w-full sm:h-auto relative">

          {
            isUddokta && <Uddokta/>
          }
          {
            prosason && <Prosason/>
          }
          {
            dcrPayment && <DCRpayment/>
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

          <h1 className="text-4xl sm:text-2xl font-thin">অনলাইন সংক্রান্ত সেবা</h1>
          <div className="flex flex-col items-center justify-start mt-4 gap-y-5">
            <h1 className="text-4xl font-thin sm:text-2xl">ভূমি উন্নয়ন দাখিলার আবেদন</h1>
            <div className="flex items-center justify-center gap-x-6">
              <Link href="/components/fill-form" className="px-6 py-1 bg-blue-600 text-lg font-semibold text-white">দাখিলা ফর্ম</Link>

              <Link href="/dakhila-print" className="px-6 py-1 bg-blue-600 text-lg font-semibold text-white">দাখিলা প্রিন্ট</Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default page;
