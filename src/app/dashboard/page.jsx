"use client";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ServicesTax from "./ServicesTax";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const page = () => {
  const [name, setName] = useState(false);
  const [newName, setNewName] = useState(false);
  const [image, setImage] = useState(false);
  const [newImage, setNewImage] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(false);

  const [isUddokta, setUddokta] = useState(false);
  const [prosason, setProsason] = useState(false);
  const [loginUser, setLoginUser] = useState('');

  useEffect(() => {
    async function userLogin() {
      try {
        const res = await fetch('/api/admin/login-user', { method: "GET" });
        const data = await res.json();
        setLoginUser(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    userLogin();
  }, []);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-start bg-green-100 relative">

      <div className="w-full h-12 bg-red-400 flex items-center justify-between">

      </div>

      <div className="h-full w-full flex items-center justify-between gap-x-5 sm:items-start sm:relative">

        <div className="hidden sm:block absolute left-2 top-[16px] text-green-700 text-3xl cursor-pointer" onClick={() => setProfile(true)}>
          <FaUserCircle />
        </div>

        <div className={`w-1/4 h-screen flex items-center justify-start sm:absolute sm:z-10 transition-all duration-300 ${profile ? 'sm:left-0' : 'sm:-left-full'} sm:w-full`}>
          <div className="bg-white border-r-2 w-full flex flex-col items-center p-5 gap-y-5 sm:w-7/12 h-full shadow-[4px_0px_8px_rgba(0,0,0,0.5)]">
            <div className="size-40 rounded-full bg-green-600 self-center"></div>
            <h1>Name</h1>
            <div className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative" onClick={() => {
              setUddokta(!isUddokta);
              setProsason(false);
            }}>
              <p className="text-3xl font-semibold mt-2">উদ্যোক্তা</p>
              <span className={`absolute right-5 ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span>
            </div>
            <div className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative" onClick={() => {
              setUddokta(false);
              setProsason(!prosason);
            }}>
              <p className="text-3xl font-semibold mt-2">প্রশাসনিক</p>
              <span className={`absolute right-5 ${prosason ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span>
            </div>
          </div>
          <div className="bg-gray-400 opacity-80 relative hidden sm:block w-5/12 h-full" onClick={() => setProfile(false)}>
            <div className="hidden sm:block absolute right-2 z-10 opacity-100 top-2 text-3xl cursor-pointer" onClick={() => setProfile(false)}>
              <IoClose />
            </div>
          </div>
        </div>

        <div className="w-3/4 h-screen p-4 flex flex-col items-center justify-start gap-y-4 sm:w-full sm:h-auto relative">

          {
            isUddokta && (
              <div className="w-10/12 left-0 top-1/2 -translate-y-1/2 h-96 bg-white rounded absolute z-20">

              </div>
            )
          }
          {
            prosason &&
            (
              <div className="w-96 left-0 top-1/2 -translate-y-1/2 h-auto bg-white border border-red-400 rounded absolute z-20 flex flex-col p-5 items-center">
                <p className="w-10/12 border-b text-center pb-1.5 border-b-gray-300 text-xl font-semibold">প্রশাসনিক তথ্য</p>
                <div className="w-full grid grid-cols-2 text-lg font-semibold mt-3 border-b border-b-gray-300">
                  <p>Username</p>
                  <p>Password</p>
                </div>
                {
                  loginUser && (
                    loginUser.length === 0 && (
                      <div className="w-full grid grid-cols-2 border-b border-b-gray-300">
                        <p className="py-0.5">No Data</p>
                        <p className="py-0.5">No Data</p>
                      </div>
                    )
                  )
                }
                {
                  loginUser ? (
                    loginUser.slice().reverse().map((elem) => {
                      return (
                        <div className="w-full grid grid-cols-2 border-b border-b-gray-300" key={elem._id}>
                          <p className="py-0.5">{elem.username}</p>
                          <p className="py-0.5">{elem.password}</p>
                        </div>
                      )
                    })
                  ) : (<p>Loading</p>)
                }
              </div>
            )
          }

          <h1 className="text-4xl sm:text-2xl font-thin">অনলাইন সংক্রান্ত সেবা</h1>
          <div className="w-full h-2/3 grid grid-cols-4 grid-rows-2 gap-3 sm:grid-cols-2 sm:grid-rows-3">
            <ServicesTax url="/dashboard/online-service/mutation" clr="#59b8a0" img="/logos/1732162861.webp" tax="মিউটেশন" />
            <ServicesTax url="/dashboard/online-service/land-tax" clr="#fcb227" img="/logos/1732789801.webp" tax="ভূমি উন্নয়ন কর" />
            <ServicesTax url="/dashboard/online-service/land-record" clr="#9cbf3d" img="/logos/1732941934.webp" tax="ভূমি রেকর্ড ও ম্যাপ" />
            <ServicesTax url="hello" clr="#4072b7" img="img1" tax="জন্মনিবন্ধন সেবা" />
            <ServicesTax url="hello" clr="#007d4d" img="img2" tax="NID সংক্রান্ত সেবা" />
            <ServicesTax url="hello" clr="#365e3c" img="img3" tax="পাসপোর্ট সংক্রান্ত সেবা" />
          </div>
          <div className="flex flex-col items-center justify-start mt-4 gap-y-5">
            <h1 className="text-4xl font-thin sm:text-2xl">ভূমি উন্নয়ন দাখিলার আবেদন</h1>
            <div className="flex items-center justify-center gap-x-6">
              <Link href="/components/fill-form" className="px-6 py-1 bg-blue-600 text-lg font-semibold text-white">দাখিলা ফর্ম</Link>

              <Link href="/dakhila-print" className="px-6 py-1 bg-blue-600 text-lg font-semibold text-white">দাখিলা প্রিন্ট</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
