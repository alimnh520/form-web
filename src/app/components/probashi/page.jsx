'use client';

import React from 'react';

const services = [
    {
        title: 'ভিসা স্ট্যাটাস চেকিং',
        description: 'মধ্যপ্রাচ্যসহ বিভিন্ন দেশের ভিসা যাচাই'
    },
    {
        title: 'টিকিট বুকিং',
        description: 'ফ্লাইট টিকিট বুকিং ও অফার'
    },
    {
        title: 'বিএমইটি রেজিস্ট্রেশন',
        description: 'অনলাইন স্মার্ট কার্ড রেজিস্ট্রেশন'
    },
    {
        title: 'ভোটার আইডি সংশোধন',
        description: 'বিদেশ থেকে NID তথ্য পরিবর্তন'
    },
    {
        title: 'জন্ম নিবন্ধন সংশোধন',
        description: 'জন্মসনদ সংশোধন / উত্তোলন'
    },
    {
        title: 'পাসপোর্ট তথ্য',
        description: 'পাসপোর্ট রিনিউয়াল ও আবেদন সহযোগিতা'
    },
];

export default function ProbashiServices() {
    return (
        <main className="bg-gray-100 min-h-screen">
            <header className="bg-gradient-to-r from-green-700 to-red-700 text-white py-6 text-center">
                <h1 className="text-3xl font-bold">🌍 প্রবাসীদের জন্য অনলাইন সেবা</h1>
                <p className="text-sm mt-1">বিদেশ থেকেও বাংলাদেশের নাগরিক সেবা নিন অনলাইনে</p>
            </header>

            <section className="grid grid-cols-3 grid-rows-2 gap-6 p-6 px-16">
                {services.map((service, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-5 rounded-xl shadow hover:scale-[1.03] transition-transform text-center"
                    >
                        <h3 className="text-xl font-semibold text-green-700 mb-2">{service.title}</h3>
                        <p className="text-gray-700 text-sm">{service.description}</p>
                        <button className="mt-4 bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-md text-sm">
                            আবেদন করুন
                        </button>
                    </div>
                ))}
            </section>
        </main>
    );
}
