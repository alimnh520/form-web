'use client';

import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-100 pb-10">
            {/* Header */}
            <header className="bg-green-800 text-white py-16 text-center">
                <h1 className="text-3xl font-bold">যোগাযোগ করুন</h1>
                <p className="text-lg mt-2">আপনার যেকোনো প্রশ্ন বা সহায়তার জন্য আমরা প্রস্তুত</p>
            </header>

            {/* Contact Form */}
            <div className="max-w-4xl mx-auto bg-white p-6 shadow-md -mt-10 rounded-md z-10 relative">
                <form className="flex flex-col items-start justify-start gap-y-6">
                    <div className="w-full gap-6 grid grid-cols-3">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="font-medium">আপনার নাম</label>
                            <input type="text" id="name" placeholder="পূর্ণ নাম লিখুন" required className="mt-1 p-2 focus:outline focus:outline-green-600 border rounded" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="font-medium">ইমেইল</label>
                            <input type="email" id="email" placeholder="আপনার ইমেইল" required className="mt-1 p-2 focus:outline focus:outline-green-600 border rounded" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="country" className="font-medium">আপনার দেশ</label>
                            <select id="country" className="mt-1 p-2 focus:outline focus:outline-green-600 border rounded">
                                <option>সৌদি আরব</option>
                                <option>আমিরাত</option>
                                <option>মালয়েশিয়া</option>
                                <option>ইতালি</option>
                                <option>বাংলাদেশ</option>
                                <option>অন্যান্য</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex flex-col col-span-3">
                        <label htmlFor="message" className="font-medium">বার্তা</label>
                        <textarea id="message" rows="5" placeholder="আপনার বার্তা লিখুন..." required className="mt-1 p-2 border rounded focus:outline focus:outline-green-600"></textarea>
                    </div>
                    <div className="mt-5">
                        <button type="submit" className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700">পাঠিয়ে দিন</button>
                    </div>
                </form>

                {/* Contact Info */}
                <div className="bg-green-50 flex flex-col mt-10 p-4 space-y-2 rounded shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">যোগাযোগ তথ্য</h3>
                    <Link target='_blank' className="hover:text-green-600" href="https://wa.link/1sjqhm">📞 হোয়াটসঅ্যাপ: +8801850685033</Link>
                    <Link href='' target="_blank" className="hover:text-green-600">✉️ ইমেইল: support@bdl.tax</Link>
                    <p>📍 ঠিকানা: খুলনা সদর, খুলনা, বাংলাদেশ</p>
                    <Link href="https://www.facebook.com/profile.php?id=61577212335030" target="_blank" className="hover:text-green-600">🌐 Facebook: Razim Land Service & Consultant - Digital BD </Link>
                </div>
            </div>
        </div>
    );
}
