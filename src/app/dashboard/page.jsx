"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ServicesTax from "./ServicesTax";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const page = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(false);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-start bg-green-100 relative">

      <div className="w-full h-12 bg-red-400 flex items-center justify-between">

      </div>

      <div className="h-full w-full flex items-center justify-between gap-x-5 sm:items-start sm:relative">

        <div className="hidden sm:block absolute left-2 top-[16px] text-green-700 text-3xl cursor-pointer" onClick={() => setProfile(true)}>
          <FaUserCircle />
        </div>

        <div className={`w-1/4 h-screen flex items-center justify-start sm:absolute sm:z-10 transition-all duration-300 ${profile ? 'sm:left-0' : 'sm:-left-full'} sm:w-full`}>
          <div className="bg-yellow-400 w-full flex flex-col items-center p-5 sm:w-7/12 h-full">
            <h1>Hello I'm Razim</h1>
          </div>
          <div className="bg-gray-400 opacity-80 relative hidden sm:block w-5/12 h-full" onClick={() => setProfile(false)}>
            <div className="hidden sm:block absolute right-2 z-10 opacity-100 top-2 text-3xl cursor-pointer" onClick={() => setProfile(false)}>
              <IoClose />
            </div>
          </div>
        </div>

        <div className="w-3/4 h-screen p-4 flex flex-col items-center justify-start gap-y-4 sm:w-full sm:h-auto">
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
