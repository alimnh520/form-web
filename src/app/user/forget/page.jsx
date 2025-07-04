'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BsQuestion } from 'react-icons/bs';

const page = () => {
    const [checked, setChecked] = useState(true);
    const [value, setValue] = useState('mobile');
    const [mailLabel, setMailLabel] = useState(false);
    const [numberLabel, setNumberLabel] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        mobile: '',
    });
    const handleChange = (val) => {
        setUser({ ...user, [val.target.name]: val.target.value });
    }
    // mail focus
    const mailFocus = () => {
        setMailLabel(true);
    }
    const mailBlur = () => {
        if (user.email !== '') {
            setMailLabel(true);
        } else {
            setMailLabel(false);
        }
    }
    // number focus
    const numberFocus = () => {
        setNumberLabel(true);
    }
    const numberBlur = () => {
        if (user.mobile !== '') {
            setNumberLabel(true);
        } else {
            setNumberLabel(false);
        }
    }

    const handleForget = async() => {
        setLoading(true);
        try {
            const response = await fetch('/api/user/forget', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ user, type: checked })
            });
            setLoading(false);
            const data = await response.json();
            setMessage(data.message);
            setTimeout(() => {
                setMessage('');
            }, 1500);
            if (data.success) {
                router.push('/user/otpverify');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full h-screen flex items-start justify-center bg-[url('/bg/lsg-image.webp')] bg-center bg-cover -mt-16 pb-5">
            <div className="w-[400px] h-auto mt-16 bg-white p-7 flex flex-col items-center justify-start gap-y-2 relative sm:w-80 sm:bg-[rgba(255,255,255,0.5)]">

                {
                    loading && (
                        <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-30 bg-white">
                            <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
                        </div>
                    )
                }

                <img src="/logos/logo.png" alt="" className="h-12" />
                <p className="-mt-2">
                    নতুন পাসওয়ার্ড সেট করুন
                </p>
                <p className='text-zinc-500 text-center text-[13px]'>নতুন পাসওয়ার্ড সেট করার জন্য আপনার ফোন নাম্বার/ইমেইলে একটি কোড পাঠানো হবে ।</p>

                <div className="w-full flex items-center justify-start gap-x-4">
                    <div className="flex items-center justify-start gap-x-1">
                        <input type="radio" name="select" id='mobile' value="mobile" onChange={(e) => setValue(e.target.value)} checked={checked} onClick={() => setChecked(true)} />
                        <label htmlFor="mobile" className='mt-1 cursor-pointer'>মোবাইল</label>
                    </div>

                    <div className="flex items-center justify-start gap-x-1">
                        <input type="radio" name="select" id="email" value="email" onChange={(e) => setValue(e.target.value)} />
                        <label htmlFor="email" className='mt-1 cursor-pointer' onClick={() => setChecked(false)}>ইমেইল</label>
                    </div>
                </div>
                {
                    value === 'mobile' ? (
                        <div className="w-full h-10 flex items-center justify-between mt-1  gap-x-2">
                            <div className="w-3/12 h-full border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-center">
                                <p>+880</p>
                            </div>
                            <div className="w-9/12 h-full border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-start px-4">
                                <p className={`text-[13px] relative text-gray-500 transition-all duration-300 ${numberLabel ? '-top-5 z-20 bg-white' : 'top-0'}`}>মোবাইল নাম্বার (ইংরেজিতে)</p>
                                <input type="text" className={`w-full h-full left-0 px-4 absolute outline-none rounded-md bg-transparent z-10 focus:outline-[3px] focus:outline-blue-200 focus:border-[3px] focus:border-blue-300 outline-offset-0 transition-all duration-100 ${user.mobile.length > 10 && 'focus:border-red-500 border-2 border-red-500 outline-[3px] outline-red-400 focus:outline-red-400'}`} name='mobile' onChange={handleChange} onBlur={numberBlur} onFocus={numberFocus} />

                                <div className="absolute right-3 bg-zinc-400 rounded-full text-gray-600 text-xl p-1.5 cursor-pointer z-10"><BsQuestion /></div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-10 border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-start mt-4 px-4">
                            <p className={`text-[13px] relative text-gray-500 transition-all duration-300 ${mailLabel ? '-top-5 z-20 bg-white' : 'top-0'}`}>ইমেইল</p>
                            <input type="email" className='w-full h-full left-0 px-4 absolute outline-none rounded-md bg-transparent z-10 focus:outline-[3px] focus:outline-blue-200 focus:border-[3px] focus:border-blue-300 outline-offset-0 transition-all duration-100' name='email' onChange={handleChange} onBlur={mailBlur} onFocus={mailFocus} />

                            <div className="absolute right-3 bg-zinc-400 rounded-full text-gray-600 text-xl p-1.5 cursor-pointer z-10"><BsQuestion /></div>
                        </div>
                    )
                }
                {
                    message && (
                        <p className="w-full px-4 py-1.5 bg-[rgba(239,68,68,0.5)] text-white z-30 text-center">
                            {message}
                        </p>

                    )
                }
                <button className={`w-full py-2 border border-green-900 bg-green-800 text-white mt-5`} onClick={handleForget}>এগিয়ে যান</button>

                <p className='text-[12px] mt-5'>একাউন্ট নেই? <Link href="/user/registration" className='underline decoration-blue-600 text-blue-600'>রেজিস্ট্রেশন করুন</Link></p>
            </div>
        </div>
    )
}

export default page