import Calendar from "date-bengali-revised";
import Link from "next/link";
import React from "react";

const Header = () => {
    const data = new Date();
    let today = new Date();
    let year = today.getFullYear() - 594;
    console.log('year is : ', year);
    const option = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        numberingSystem: "beng",
    };

    const banglaDate = new Intl.DateTimeFormat("bn-BD", option).format(data);
    console.log(banglaDate);

    //     const months = [ "বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র",  "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র", ];
    //     const month = ["১","২","৩","৪","৫","৬","৭","৮","৯","১০","১১","১২","১৩","১৪","১৫","১৬","১৭","১৮","১৯","২০","২১","২২","২৩","২৪","২৫","২৬","২৭","২৮","২৯","৩০","৩১"];

    //     let today = new Date();
    //     let year = today.getFullYear() - 593;
    //     let monthIndex = today.getMonth();
    //     let banglaMonth = months[monthIndex];
    //     let day = today.getDate();
    //     console.log(`আজ ${day} ${banglaMonth}, ${year} বঙ্গাব্দ`);

    //   let cal = new Calendar();
    //   cal.fromGregorian(2025, 2, 10);
    //   console.log(cal);

    return (
        <div className="w-full h-16 bg-white flex items-center justify-between px-10 py-1.5">
            <img src="/logos/logo2-1024x259.jpg" alt="" className="h-full" />
            <div className=""></div>
            <nav className="flex items-center justify-center gap-x-5">
                <Link href="">Home</Link>
                <Link href="">Home</Link>
                <Link href="">Home</Link>
                <Link href="">Home</Link>
            </nav>
        </div>
    );
};

export default Header;
