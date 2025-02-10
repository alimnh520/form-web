import Calendar from "date-bengali-revised";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Link from "next/link";
import React from "react";

const Header = () => {
  const data = new Date();
  let today = new Date();
  let year = today.getFullYear() - 594;
  console.log("year is : ", year);
  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    numberingSystem: "beng",
  };

  const banglaDate = new Intl.DateTimeFormat("bn-BD", option).format(data);
  console.log(banglaDate);

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
  const month = [
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
  console.log(`আজ ${day} ${banglaMonth}, ${year} বঙ্গাব্দ`);

  let cal = new Calendar();
  cal.fromGregorian(2025, 2, 10);
  console.log(cal);

  return (
    <div className="w-full h-16 bg-white flex items-center justify-between px-10 shadow-2xl">
      <div className="w-2/12 h-full py-2.5">
        <img src="/logos/logo2.jpg" alt="" className="h-full" />
      </div>
      <div className="w-[85%] h-full flex flex-col items-center justify-between">
        <div className="w-full h-[50%] bg-gradient-to-l text-white from-white via-green-700 to-white flex items-center justify-center">
          <p>{banglaDate}</p>
        </div>

        <nav className="w-full h-[50%] flex items-center justify-end gap-x-5">
          <Link href="" className="text-lg font-medium px-2 rounded-2xl py-0.5 hover:text-green-700 transition-all duration-300">হোম</Link>
          <Link href="" className="text-lg font-medium px-2 rounded-2xl py-0.5 hover:text-green-700 transition-all duration-300">সার্ভিস</Link>
          <Link href="" className="text-lg font-medium px-2 rounded-2xl py-0.5 hover:text-green-700 transition-all duration-300">যোগাযোগ</Link>
          <div className="relative flex items-center justify-center gap-x-2 bg-green-700 text-white px-3 rounded-3xl cursor-pointer group">
            <p className="mt-0.5">লগইন</p>
            <IoIosArrowDropdownCircle/>
            <div className=" hidden flex-col items-start justify-center space-y-2 absolute -bottom-[100px] z-10 shadow-2xl bg-white text-green-700 py-4 rounded-md px-1.5 group-hover:flex">
                <Link href="" className='w-full px-2 py-0.5 border border-green-700 rounded-md hover:text-white hover:bg-green-700 transition-all duration-300'>নাগরিক</Link>
                <Link href="" className='w-full px-2 py-0.5 border border-green-700 rounded-md hover:text-white hover:bg-green-700 transition-all duration-300'>প্রশাসনিক</Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
