'use client'
import { IoIosArrowDropdownCircle, IoMdLogOut } from "react-icons/io";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const userToken = async () => {
      try {
        const response = await fetch('/api/admin/admin-data', { method: 'GET' });
        const data = await response.json();
        if (data.success) {
          setToken(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    userToken();
  }, []);

  const logoutPage = async () => {
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
  };


  let date = new Date();
  // 📅 বাংলা মাসের নাম
  const banglaMonths = [
    'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন',
    'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
  ];

  // 🔢 ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর
  const convertToBanglaNumber = (num) => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(d => banglaDigits[+d] || d).join('');
  };

  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    numberingSystem: "beng",
  };
  const banglaDate = new Intl.DateTimeFormat("bn-BD", option).format(date);

  const splitDate = banglaDate.split(',');

  // 🎯 বাংলা তারিখ বের করা (সাধারণ নিয়মে, নিখুঁত নয় কিন্তু ইউজার ফ্রেন্ডলি)
  function getBanglaDate() {
    const engDate = new Date();
    const day = engDate.getDate();
    const month = engDate.getMonth(); // 0 index
    const year = engDate.getFullYear();

    // একটা রাফ অনুমান ভিত্তিক হিসাব (বাংলা মাস সাধারণত ইংরেজি মাসের মাঝামাঝি শুরু হয়)
    const banglaDay = convertToBanglaNumber((day + 16) % 30 || 1);
    const banglaMonth = banglaMonths[(month + 9) % 12];
    const banglaYear = convertToBanglaNumber(year - 593); // Approx Bengali Year

    return `${splitDate[0]}, ${banglaDay} ${banglaMonth} ${banglaYear} , ${splitDate[1]} ${splitDate[2]}`;
  }


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
        <div className="w-full h-[50%] bg-gradient-to-l text-white from-white via-green-800 to-white flex items-center justify-center text-sm font-[500]">

          <p className="left-1/2 text-[15px] -translate-x-1/2 sm:left-0 sm:translate-x-0">{getBanglaDate()}</p>

        </div>

        <div className={`absolute hidden size-10 p-2 bg-green-700 right-5 top-1 items-center justify-between cursor-pointer flex-col sm:flex`} onClick={() => setHideMenu(!hideMenu)}>
          <div className={`w-full transition-all duration-300 h-1 bg-white relative ${hideMenu ? 'rotate-45 top-[10px]' : 'rotate-0 top-0'}`}></div>
          <div className={`transition-all duration-300 h-1 bg-white ${hideMenu ? 'w-0' : 'w-full'}`}></div>
          <div className={`w-full transition-all duration-300 h-1 bg-white relative ${hideMenu ? '-rotate-45 bottom-[10px]' : '-rotate-0 bottom-0'}`}></div>
        </div>

        <nav className={`w-full h-[50%] flex items-center justify-end gap-x-5 sm:flex-col sm:items-start sm:gap-y-3 sm:justify-center transition-all duration-300 sm:overflow-hidden ${hideMenu ? ' sm:h-56' : ' sm:h-0'}`}>
          <Link href="/" className={`text-lg font-medium px-2 rounded-2xl py-0.5 hover:text-green-700 ${path === '/' ? 'text-green-700' : 'text-black'} transition-all duration-300`} onClick={() => setHideMenu(!hideMenu)}>হোম</Link>
          <Link href="/components/services" className={`text-lg font-medium px-2 rounded-2xl py-0.5 hover:text-green-700 ${path === '/components/services' ? 'text-green-700' : 'text-black'} transition-all duration-300`} onClick={() => setHideMenu(!hideMenu)}>সার্ভিস</Link>
          <Link href="/components/probashi" className={`text-lg font-medium px-2 rounded-2xl py-0.5 hover:text-green-700 ${path === '/components/probashi' ? 'text-green-700' : 'text-black'} transition-all duration-300`} onClick={() => setHideMenu(!hideMenu)}>প্রবাসী সেবা</Link>
          <Link href="/components/contact" className={`text-lg font-medium px-2 rounded-2xl py-0.5 hover:text-green-700 ${path === '/components/contact' ? 'text-green-700' : 'text-black'} transition-all duration-300`} onClick={() => setHideMenu(!hideMenu)}>যোগাযোগ</Link>
          {
            token && (
              <button className="text-xl bg-green-700 text-white rounded-full p-0.5 font-medium px-2 py-0.5 hover:text-green-700 hover:bg-transparent transition-all duration-300 sm:ml-5" onClick={logoutPage}>
                <IoMdLogOut />
              </button>
            )
          }
          <div className="relative flex items-center justify-center gap-x-2 bg-green-700 text-white px-3 rounded-3xl cursor-pointer group">
            <p className="mt-0.5">{token ? 'ইউজার' : 'লগইন'}</p>
            <IoIosArrowDropdownCircle className="text-xl" />
            <div className={`hidden flex-col items-start justify-center space-y-2 absolute  -bottom-[100px] sm:left-24 shadow-2xl bg-white text-green-700 py-4 rounded-md px-1.5 group-hover:flex sm:-top-1 sm:flex-row sm:h-fit sm:items-center sm:space-y-0 sm:py-0 sm:px-0 sm:mt-0.5 sm:gap-x-2`}>
              <Link href="/user/login" className='w-full px-2 py-0.5 border border-green-700 rounded-md hover:text-white hover:bg-green-700 transition-all duration-300' onClick={() => setHideMenu(!hideMenu)}>উদ্যোক্তা</Link>
              <Link href="/office" className='w-full px-2 py-0.5 border border-green-700 rounded-md hover:text-white hover:bg-green-700 transition-all duration-300' onClick={() => setHideMenu(!hideMenu)}>{token ? 'ড্যাসবোর্ড' : 'প্রশাসনিক'}</Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;