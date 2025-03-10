'use client'
import React, { useEffect, useState } from 'react'
import { BsFillEyeFill, BsFillEyeSlashFill, BsQuestion } from 'react-icons/bs';

const page = () => {
    const [eyes1, setEyes1] = useState(false);
    const [eyes2, setEyes2] = useState(false);
    const [passLabel, setPassLabel] = useState(false);
    const [confirmPassLabel, setConfirmPassLabel] = useState(false);
    const [passValid, setPassValid] = useState(false);

    const [userPass, setUserPass] = useState({
        password: '',
        confirmPass: ''
    });

    const handlePassChange = (val) => {
        setUserPass({ ...userPass, [val.target.name]: val.target.value });
    }

    // password focus
    const passFocus = () => {
        setPassLabel(true);
    }
    const passBlur = () => {
        if (userPass.password !== '') {
            setPassLabel(true);
        } else {
            setPassLabel(false);
        }
    }

    // confirm password focus
    const confirmPassFocus = () => {
        setConfirmPassLabel(true);
    }
    const confirmPassBlur = () => {
        if (userPass.password !== '') {
            setConfirmPassLabel(true);
        } else {
            setConfirmPassLabel(false);
        }
    }

    // valid password
    const checkValid = [
        userPass.password.length >= 8,
        /[A-Z]/.test(userPass.password),
        /[a-z]/.test(userPass.password),
        /\d/.test(userPass.password),
        /[@#$%^&*]/.test(userPass.password)
    ]
    useEffect(() => {
        const isValid = checkValid.every(Boolean);
        if (isValid) {
            setPassValid(true);
        }
    }, [userPass.password]);


    return (
        <div className="w-full h-screen flex items-center justify-center bg-[url('/bg/lsg-image.webp')] bg-center bg-cover -mt-16">
            <div className="w-[400px] h-auto -mt-16 bg-white p-7 flex flex-col items-center justify-start gap-y-2 relative sm:w-80 sm:bg-[rgba(255,255,255,0.5)]">
                <img src="/logos/logo.png" alt="" className="h-[50px] " />
                <p className='text-2xl'>পাসওয়ার্ড সেট করুন</p>

                <div className="w-full h-10 border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-start px-4 mt-2">
                    <p className={`text-[13px] relative text-gray-500 transition-all duration-300 ${passLabel ? '-top-5 z-20 bg-white' : 'top-0'}`}>পাসওয়ার্ড</p>

                    <input type={eyes1 ? 'text' : 'password'} className='w-full h-full left-0 px-4 absolute outline-none rounded-md bg-transparent z-10 focus:outline-[3px] focus:outline-blue-200 focus:border-[3px] focus:border-blue-300 outline-offset-0 transition-all duration-100' name='password' onChange={(e) => handlePassChange(e)} onBlur={passBlur} onFocus={passFocus} />

                    <div className="absolute right-5 text-gray-600 text-xl cursor-pointer z-10" onClick={() => setEyes1(!eyes1)}>{eyes1 ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}</div>

                </div>

                <div className="w-full h-10 border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-start px-4 mt-2">
                    <p className={`text-[13px] relative text-gray-500 transition-all duration-300 ${confirmPassLabel ? '-top-5 z-20 bg-white' : 'top-0'}`}>পাসওয়ার্ড (পুনরায়)</p>
                    <input type={eyes2 ? 'text' : 'password'} className='w-full h-full left-0 px-4 absolute outline-none rounded-md bg-transparent z-10 focus:outline-[3px] focus:outline-blue-200 focus:border-[3px] focus:border-blue-300 outline-offset-0 transition-all duration-100' name='confirmPass' onChange={(e) => handlePassChange(e)} onBlur={confirmPassBlur} onFocus={confirmPassFocus} />

                    <div className="absolute right-5 text-gray-600 text-xl cursor-pointer z-10" onClick={() => setEyes2(!eyes2)}>{eyes2 ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}</div>

                </div>

                <p className='text-[13px] text-zinc-600'>একই পাসওয়ার্ড ২য় বার লিখে নিশ্চিত করুন।</p>

                <p className='text-sm mt-2 text-red-500'>{(!passValid && (userPass.password !== userPass.confirmPass) && confirmPassLabel) && 'উভয় পাসওয়ার্ড একই নয় ।'}</p>

                <div className="flex flex-col items-start justify-start text-[13px] self-start mt-2">
                    <p className={`${checkValid[0] ? 'text-green-600' : 'text-red-600'}`}>পাসওয়ার্ড সর্বনিম্ন ৮ ডিজিটের হতে হবে ।</p>
                    <p className={`${checkValid[1] ? 'text-green-600' : 'text-red-600'}`}>পাসওয়ার্ডে অন্তত একটি বড় হাতের থাকতে হবে ।</p>
                    <p className={`${checkValid[2] ? 'text-green-600' : 'text-red-600'}`}>পাসওয়ার্ডে অন্তত একটি ছোট হাতের অক্ষর থাকতে হবে ।</p>
                    <p className={`${checkValid[3] ? 'text-green-600' : 'text-red-600'}`}>পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে ।</p>
                    <p className={`${checkValid[4] ? 'text-green-600' : 'text-red-600'}`}>পাসওয়ার্ডে অন্তত একটি বিশেষ অক্ষর থাকতে হবে ।</p>
                </div>

                <button className={`w-full py-2 border rounded-md ${(passValid && (userPass.password === userPass.confirmPass)) ? 'bg-[rgba(22,101,52,1)] border-[rgba(20,83,45,1)] pointer-events-auto' : 'bg-[rgba(22,101,52,0.4)] border-[rgba(20,83,45,0.4)] pointer-events-none'} text-white mt-3`}>পাসওয়ার্ড হালনাগাদ করুন</button>

            </div>
        </div>
    )
}

export default page
