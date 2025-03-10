'use client'
import React, { useEffect, useState } from 'react'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

const page = () => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(2 * 60);
    const [loading, setLoading] = useState(false);

    // timer
    useEffect(() => {
        if (timer === 0) {
            setTimer(0);
            return
        }
        const interVal = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interVal);
    }, [timer]);
    const minute = Math.floor(timer / 60);
    const second = timer % 60;

    const resendCode = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/user/verify/resend', { method: 'GET' });
            setLoading(false);
            const data = await response.json();
            console.log(data);
            if (data.success) {
                setTimer(2 * 60);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const submitOtp = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/user/verify/verify-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ verifyOtp: otp })
            });
            setLoading(false);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="w-full h-screen flex items-center justify-center bg-[url('/bg/lsg-image.webp')] bg-center bg-cover -mt-16">
            <div className="w-[400px] h-[360px] -mt-16 bg-white p-7 flex flex-col items-center justify-start gap-y-2 relative sm:w-80 sm:bg-[rgba(255,255,255,0.5)]">

                {
                    loading && (
                        <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-30 bg-white">
                            <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
                        </div>
                    )
                }

                <img src="/logos/logo.png" alt="" className="h-[50px] " />
                <p className='text-2xl'>OTP নাম্বার নিশ্চিত করুন</p>
                <p className='text-center text-gray-600 text-sm py-2'>আপনার মোবাইল/ইমেইলে পাঠানো ৬ সংখ্যার কোডটি <br /> লিখুন।</p>

                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={otp} onChange={(e) => setOtp(e)}>
                    <InputOTPGroup className='flex gap-x-2'>
                        <InputOTPSlot className='rounded-md text-xl font-semibold' index={0} />
                        <InputOTPSlot className='rounded-md text-xl font-semibold' index={1} />
                        <InputOTPSlot className='rounded-md text-xl font-semibold' index={2} />
                        <InputOTPSlot className='rounded-md text-xl font-semibold' index={3} />
                        <InputOTPSlot className='rounded-md text-xl font-semibold' index={4} />
                        <InputOTPSlot className='rounded-md text-xl font-semibold' index={5} />
                    </InputOTPGroup>
                </InputOTP>

                <div className="w-full flex items-center justify-between mt-5">
                    <button className='font-semibold underline decoration-green-800 text-green-800'>পিছনে</button>

                    {
                        timer === 0 ? (
                            <button className='font-semibold' onClick={resendCode}>আবার কোড পাঠান</button>
                        ) : (
                            <p className='text-xs'>আবার OTP পাঠান 0{minute}:{second < 10 ? '0' + second : second} মিনিট পরে</p>
                        )
                    }

                </div>
                <button className={`w-full py-2 border border-green-900 mt-2 bg-green-800 text-white`} onClick={submitOtp}>সাবমিট করুন</button>
            </div>
        </div>
    )
}

export default page