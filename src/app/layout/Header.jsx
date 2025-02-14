'use client'
import Calendar from "date-bengali-revised";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  useEffect(() => {
    const userToken = async () => {
      try {
        const response = await fetch('/api/admin/active-token', { method: 'GET' });
        const data = await response.json();
        setToken(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    userToken();
  }, []);
  const logoutPage = async () => {
    if (token) {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/admin-logout", { method: "POST" });
        const data = await response.json();
        if (data.success) {
          setLoading(false);
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const data = new Date();
  let today = new Date();
  let year = today.getFullYear() - 594;
  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    numberingSystem: "beng",
  };

  const banglaDate = new Intl.DateTimeFormat("bn-BD", option).format(data);
  const engDate = new Date().toLocaleDateString();
  const cutDate = engDate.split('/');
  const months = [
    "বৈশাখ",
    "জ্যৈষ্ঠ",
    "আষাঢ়",
    "শ্রাবণ",
    "ভাদ্র",
    "আশ্বিন",
    "কার্তিক",
    "অগ্রহায়ণ",
    "পৌষ",
    "মাঘ",
    "ফাল্গুন",
    "চৈত্র",
  ];

  const monthsDate = [
    "১",
    "২",
    "৩",
    "৪",
    "৫",
    "৬",
    "৭",
    "৮",
    "৯",
    "১০",
    "১১",
    "১২",
    "১৩",
    "১৪",
    "১৫",
    "১৬",
    "১৭",
    "১৮",
    "১৯",
    "২০",
    "২১",
    "২২",
    "২৩",
    "২৪",
    "২৫",
    "২৬",
    "২৭",
    "২৮",
    "২৯",
    "৩০",
    "৩১",
  ];
  let monthIndex = today.getMonth();
  let banglaMonth = months[monthIndex];
  let day = today.getDate();
  let cal = new Calendar();
  cal.fromGregorian(2025, 2, 10);

  return (
    <div className="w-full h-16 bg-white flex items-center justify-between px-10 shadow-2xl fixed top-0 z-40 sm:px-5 sm:h-auto sm:flex-col">

      {
        loading && (
          <div className="flex items-center justify-center absolute top-96 left-1/2 -translate-x-1/2 z-20 bg-white">
            <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
          </div>
        )
      }

      <div className="w-2/12 h-full py-2.5 sm:w-full sm:flex sm:items-center sm:justify-start sm:py-1">
        <img src="/logos/logo2.jpg" alt="" className="h-full sm:h-auto sm:w-40" />
      </div>
      <div className="w-[85%] h-full flex flex-col items-center justify-between sm:w-full">
        <div className="w-full h-[50%] bg-gradient-to-l text-white from-white via-green-700 to-white flex items-center justify-center">
          <p>{banglaDate}</p>
        </div>

        <div className={`absolute hidden size-10 p-2 bg-green-700 right-5 top-1 items-center justify-between cursor-pointer flex-col sm:flex`} onClick={() => setHideMenu(!hideMenu)}>
          <div className={`w-full transition-all duration-300 h-1 bg-white relative ${hideMenu ? 'rotate-45 top-[10px]' : 'rotate-0 top-0'}`}></div>
          <div className={`transition-all duration-300 h-1 bg-white ${hideMenu ? 'w-0' : 'w-full'}`}></div>
          <div className={`w-full transition-all duration-300 h-1 bg-white relative ${hideMenu ? '-rotate-45 bottom-[10px]' : '-rotate-0 bottom-0'}`}></div>
        </div>

        <nav className={`w-full h-[50%] flex items-center justify-end gap-x-5 sm:flex-col sm:items-start sm:gap-y-3 sm:justify-center transition-all duration-300 sm:overflow-hidden ${hideMenu ? ' sm:h-44' : ' sm:h-0'}`}>
          <Link href="/" className="text-lg font-medium px-2 rounded-2xl py-0.5 hover:text-green-700 transition-all duration-300" onClick={() => setHideMenu(!hideMenu)}>হোম</Link>
          <Link href="/components/services" className="text-lg font-medium px-2 rounded-2xl py-0.5 hover:text-green-700 transition-all duration-300" onClick={() => setHideMenu(!hideMenu)}>সার্ভিস</Link>
          <Link href="" className="text-lg font-medium px-2 rounded-2xl py-0.5 hover:text-green-700 transition-all duration-300" onClick={() => setHideMenu(!hideMenu)}>যোগাযোগ</Link>
          <div className="relative flex items-center justify-center gap-x-2 bg-green-700 text-white px-3 rounded-3xl cursor-pointer group">
            <p className="mt-0.5" onClick={logoutPage}>{token ? 'লগআউট' : 'লগইন'}</p>
            <IoIosArrowDropdownCircle className="text-xl" />
            <div className={`hidden flex-col items-start justify-center space-y-2 absolute ${token ? '-bottom-[62px] sm:left-28' : '-bottom-[100px]  sm:left-24'} shadow-2xl bg-white text-green-700 py-4 rounded-md px-1.5 group-hover:flex sm:-top-1 sm:flex-row sm:h-fit sm:items-center sm:space-y-0 sm:py-0 sm:px-0 sm:gap-x-2`}>
              {
                !token && (
                  <Link href="/user/registration" className='w-full px-2 py-0.5 border border-green-700 rounded-md hover:text-white hover:bg-green-700 transition-all duration-300' onClick={() => setHideMenu(!hideMenu)}>উদ্যোক্তা</Link>
                )
              }
              <Link href="/office" className='w-full px-2 py-0.5 border border-green-700 rounded-md hover:text-white hover:bg-green-700 transition-all duration-300' onClick={() => setHideMenu(!hideMenu)}>{token ? 'ড্যাসবোর্ড' : 'প্রশাসনিক'}</Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
