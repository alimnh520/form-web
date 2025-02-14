'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { RiRefreshLine } from "react-icons/ri";

const page = () => {
    const [value, setValue] = useState('mobile');
    const [nameLabel, setNameLabel] = useState(false);
    const [mailLabel, setMailLabel] = useState(false);
    const [numberLabel, setNumberLabel] = useState(false);
    const [verifyLabel, setVerifyLabel] = useState(false);
    const [checked, setChecked] = useState(true);

    const [verifyLetter, setVerifyLetter] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [changeCode, setChangeCode] = useState(0);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [user, setUser] = useState({
        username: '',
        email: '',
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
        if (user.username !== '') {
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
    //verify focus
    const verifyFocus = () => {
        setVerifyLabel(true);
    }
    const verifyBlur = () => {
        if (verifyLetter !== '') {
            setVerifyLabel(true);
        } else {
            setVerifyLabel(false);
        }
    }

    //verify letter 
    useEffect(() => {
        const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const shortLetter = letter.sort(() => Math.random() - 0.5);
        const fixedLetter = `${shortLetter.slice(0, 6).join("").toString()}`;
        setVerifyCode(fixedLetter);
    }, [changeCode]);

    //submit details

    const handleSubmit = async () => {
        if (user.username === '') {
            setMessage('আপনার নাম প্রদান করুন');
            setTimeout(() => {
                setMessage('');
            }, 2000);
            return
        }
        if (checked) {
            if (user.mobile.length > 10 || user.mobile.length < 10) {
                setMessage('১০ কোডের নাম্বার দিন');
                setTimeout(() => {
                    setMessage('')
                }, 2000);
                return
            }
        } else {
            if (user.email === '') {
                setMessage('আপনার ইমেইল প্রদান করুন');
                setTimeout(() => {
                    setMessage('')
                }, 2000);
                return
            }
        }

        if (verifyCode !== verifyLetter) {
            setMessage('ভেরিফিকেশন কোড ভুল');
            setTimeout(() => {
                setMessage('')
            }, 2000);
            return
        }
        setLoading(true);
        try {
            const response = await fetch('/api/user/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user })
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                setLoading(false)
                setMessage(data.message);
                router.push('/');
                setTimeout(() => {
                    setMessage('');
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="w-full h-screen flex items-start justify-center bg-[url('/bg/lsg-image.webp')] bg-center bg-cover">
            <div className="w-[400px] h-auto bg-white p-7 flex flex-col items-center justify-start mt-10 gap-y-2 relative sm:w-80 sm:bg-[rgba(255,255,255,0.5)]">

                {
                    message && (
                        <p className="px-4 py-2 bg-red-500 text-white absolute top-1/2 -translate-y-1/2 z-30">
                            {message}
                        </p>

                    )
                }
                {
                    loading && (
                        <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-30 bg-white">
                            <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
                        </div>
                    )
                }

                <img src="/logos/logo.png" alt="" className="h-12" />
                <p>নতুন একাউন্ট তৈরি করুন</p>
                <p className="w-full py-2 text-center bg-zinc-300 rounded-md">
                    উদ্যোক্তা
                </p>
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
                <div className="w-full h-10 border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-start px-4 mt-2">
                    <p className={`text-[13px] relative text-gray-500 transition-all duration-300 ${nameLabel ? '-top-5 z-20 bg-white' : 'top-0'}`}>আপনার নাম (ইংরেজিতে)</p>
                    <input type="text" className='w-full h-full left-0 px-4 absolute outline-none rounded-md bg-transparent z-10 focus:outline-[3px] focus:outline-blue-200 focus:border-[3px] focus:border-blue-300 outline-offset-0 transition-all duration-100' name='username' onChange={handleChange} onBlur={nameBlur} onFocus={nameFocus} />
                </div>

                {
                    value === 'mobile' ? (
                        <div className="w-full h-10 flex items-center justify-between mt-4  gap-x-2">
                            <div className="w-3/12 h-full border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-center">
                                <p>+880</p>
                            </div>
                            <div className="w-9/12 h-full border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-start px-4">
                                <p className={`text-[13px] relative text-gray-500 transition-all duration-300 ${numberLabel ? '-top-5 z-20 bg-white' : 'top-0'}`}>মোবাইল নাম্বার (ইংরেজিতে)</p>
                                <input type="text" className={`w-full h-full left-0 px-4 absolute outline-none rounded-md bg-transparent z-10 focus:outline-[3px] focus:outline-blue-200 focus:border-[3px] focus:border-blue-300 outline-offset-0 transition-all duration-100 ${user.mobile.length > 10 && 'focus:border-red-500 border-2 border-red-500 outline-[3px] outline-red-400 focus:outline-red-400'}`} name='mobile' onChange={handleChange} onBlur={numberBlur} onFocus={numberFocus} />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-10 border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-start mt-4 px-4">
                            <p className={`text-[13px] relative text-gray-500 transition-all duration-300 ${mailLabel ? '-top-5 z-20 bg-white' : 'top-0'}`}>ইমেইল</p>
                            <input type="email" className='w-full h-full left-0 px-4 absolute outline-none rounded-md bg-transparent z-10 focus:outline-[3px] focus:outline-blue-200 focus:border-[3px] focus:border-blue-300 outline-offset-0 transition-all duration-100' name='email' onChange={handleChange} onBlur={mailBlur} onFocus={mailFocus} />
                        </div>
                    )
                }
                <div className="w-full h-10 flex items-center justify-between mt-4  gap-x-2">
                    <div className="w-9/12 h-full border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-center tracking-[20px] sm:tracking-[15px] text-lg font-medium">
                        <p>{verifyCode}</p>
                    </div>

                    <div className="w-3/12 h-full border border-gray-300 rounded-md bg-gray-400 text-2xl text-white cursor-pointer relative flex items-center justify-center" onClick={() => {
                        setChangeCode(changeCode + 1);
                        setVerifyLetter('');
                    }}>
                        <RiRefreshLine />
                    </div>
                </div>
                <div className="w-full h-10 border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-start px-4 mt-2">
                    <p className={`text-[13px] relative text-gray-500 transition-all duration-300 ${verifyLabel ? '-top-5 z-20 bg-white' : 'top-0'}`}>ভেরিফিকেশন অক্ষর দিন</p>
                    <input type="text" className='w-full h-full left-0 px-4 absolute outline-none rounded-md bg-transparent z-10 focus:outline-[3px] focus:outline-blue-200 focus:border-[3px] focus:border-blue-300 outline-offset-0 transition-all duration-100' value={verifyLetter} onChange={(e) => setVerifyLetter(e.target.value)} onBlur={verifyBlur} onFocus={verifyFocus} />
                </div>

                <button onClick={handleSubmit} className={`w-full py-2 border border-green-800 rounded-md bg-green-600 text-white mt-7 `}>Submit</button>

            </div>
        </div>
    )
}

export default page