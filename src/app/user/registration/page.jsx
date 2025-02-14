'use client'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [value, setValue] = useState('mobile');
    const [nameLabel, setNameLabel] = useState(false);
    const [mailLabel, setMailLabel] = useState(false);
    const [numberLabel, setNumberLabel] = useState(false);
    const [user, setUser] = useState({
        name: '',
        mobile: '',
    });
    const handleChange = (val) => {
        setUser({ ...user, [val.target.name]: val.target.value });
    }
    // name focus
    const nameFocus = () => {
        setNameLabel(true);
    }
    const nameBlur = () => {
        if (user.name !== '') {
            setNameLabel(true);
        } else {
            setNameLabel(false);
        }
    }
    // mail focus
    const mailFocus = () => {
        setMailLabel(true);
    }
    const mailBlur = () => {
        if (user.name !== '') {
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
        if (user.name !== '') {
            setNumberLabel(true);
        } else {
            setNumberLabel(false);
        }
    }

    return (
        <div className="w-full h-screen flex items-start justify-center bg-[url('/bg/lsg-image.webp')] bg-center bg-cover sm:h-auto">
            <div className="w-[400px] h-96 bg-white p-7 flex flex-col items-center justify-start mt-10 gap-y-2">
                <img src="/logos/logo.png" alt="" className="h-12" />
                <p>নতুন একাউন্ট তৈরি করুন</p>
                <p className="w-full py-2 text-center bg-zinc-300 rounded-md">
                    উদ্যোক্তা
                </p>
                <div className="w-full flex items-center justify-start gap-x-4">
                    <div className="flex items-center justify-start gap-x-1">
                        <input type="radio" name="select" id='mobile' value="mobile" onChange={(e) => setValue(e.target.value)} />
                        <label htmlFor="mobile" className='mt-1 cursor-pointer'>মোবাইল</label>
                    </div>

                    <div className="flex items-center justify-start gap-x-1">
                        <input type="radio" name="select" id="email" value="email" onChange={(e) => setValue(e.target.value)} />
                        <label htmlFor="email" className='mt-1 cursor-pointer'>ইমেইল</label>
                    </div>
                </div>
                <div className="w-full h-10 border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-start px-4 mt-2">
                    <p className={`text-[13px] relative text-gray-500 transition-all duration-300 ${nameLabel ? '-top-5 z-20 bg-white' : 'top-0'}`}>আপনার নাম (ইংরেজিতে)</p>
                    <input type="text" className='w-full h-full left-0 px-4 absolute outline-none rounded-md bg-transparent z-10 focus:outline-[3px] focus:outline-blue-200 focus:border-[3px] focus:border-blue-300 outline-offset-0 transition-all duration-100' name='name' onChange={handleChange} onBlur={nameBlur} onFocus={nameFocus} />
                </div>

                {
                    value === 'mobile' ? (
                        <div className="w-full h-10 flex items-center justify-between mt-4  gap-x-2">
                            <div className="w-3/12 h-full border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-start">

                            </div>
                            <div className="w-9/12 h-full border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-start px-4">
                                <p className={`text-[13px] relative text-gray-500 transition-all duration-300 ${numberLabel ? '-top-5 z-20 bg-white' : 'top-0'}`}>মোবাইল নাম্বার (ইংরেজিতে)</p>
                                <input type="text" className='w-full h-full left-0 px-4 absolute outline-none rounded-md bg-transparent z-10 focus:outline-[3px] focus:outline-blue-200 focus:border-[3px] focus:border-blue-300 outline-offset-0 transition-all duration-100' name='name' onChange={handleChange} onBlur={numberBlur} onFocus={numberFocus} />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-10 border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-start mt-4 px-4">
                            <p className={`text-[13px] relative text-gray-500 transition-all duration-300 ${mailLabel ? '-top-5 z-20 bg-white' : 'top-0'}`}>ইমেইল</p>
                            <input type="email" className='w-full h-full left-0 px-4 absolute outline-none rounded-md bg-transparent z-10 focus:outline-[3px] focus:outline-blue-200 focus:border-[3px] focus:border-blue-300 outline-offset-0 transition-all duration-100' name='name' onChange={handleChange} onBlur={mailBlur} onFocus={mailFocus} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default page