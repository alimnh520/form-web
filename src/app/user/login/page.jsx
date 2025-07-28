'use client'
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useRef, useState } from 'react'
import { RiRefreshLine } from "react-icons/ri";
import { BsQuestion } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import Link from 'next/link';

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
    const [eyes, setEyes] = useState(false);
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
            setNumberLabel(false)
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
        if (checked) {
            if (user.mobile.length > 10 || user.mobile.length < 10) {
                setMessage('আপনার নাম্বার প্রদান করুন');
                setTimeout(() => {
                    setMessage('')
                }, 2000);
                return
            }
        } else {
            if (user.email === '') {
                setMessage('আপনার ইমেইল প্রদান করুন');
                setTimeout(() => {
                    setMessage('');
                }, 2000);
                return
            }
        }
        if (user.username === '') {
            setMessage('আপনার পাসওয়ার্ড প্রদান করুন');
            setTimeout(() => {
                setMessage('');
            }, 2000);
            return
        }

        if (verifyCode !== verifyLetter) {
            setMessage('ছবিতে প্রদর্শিত কোডটি প্রদান করুন');
            setTimeout(() => {
                setMessage('')
            }, 2000);
            return
        }
        setLoading(true);
        try {
            const response = await fetch('/api/user/user-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user, type: checked })
            });
            setLoading(false);
            const data = await response.json();
            setMessage(data.message);
            setTimeout(() => {
                setMessage('');
            }, 2000);
            if (data.type === 'pending') {
                router.push('/user/approve');
            }
            if (data.success) {
                router.push("/user/landing");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                handleSubmit();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [user, checked, verifyLetter]);


    return (
        <div className="w-full h-screen flex items-start justify-center bg-[url('/bg/lsg-image.webp')] bg-center bg-cover -mt-16">
            <div className="w-[400px] h-auto bg-white p-7 flex flex-col items-center justify-start mt-4 gap-y-2 relative sm:w-80 sm:bg-[rgba(255,255,255,0.5)]">
                {
                    loading && (
                        <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-30 bg-white">
                            <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
                        </div>
                    )
                }

                <img src="/logos/logo.png" alt="" className="h-12" />
                <p>লগইন করুন</p>
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

                {
                    value === 'mobile' ? (
                        <div className="w-full h-10 flex items-center justify-between mt-4  gap-x-2">
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

                <div className="w-full h-10 border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-start px-4 mt-2">
                    <p className={`text-[13px] relative text-gray-500 transition-all duration-300 ${nameLabel ? '-top-5 z-20 bg-white' : 'top-0'}`}>পাসওয়ার্ড</p>
                    <input type={eyes ? 'text' : 'password'} className='w-full h-full left-0 px-4 absolute outline-none rounded-md bg-transparent z-10 focus:outline-[3px] focus:outline-blue-200 focus:border-[3px] focus:border-blue-300 outline-offset-0 transition-all duration-100' name='username' onChange={handleChange} onBlur={nameBlur} onFocus={nameFocus} />

                    <div className="absolute right-14 text-gray-600 text-xl cursor-pointer z-10" onClick={() => setEyes(!eyes)}>{eyes ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}</div>

                    <div className="absolute right-3 bg-zinc-400 rounded-full text-gray-600 text-xl p-1.5 cursor-pointer z-10"><BsQuestion /></div>

                </div>

                <div className="w-full h-10 flex items-center justify-between mt-4  gap-x-2">
                    <div className="w-9/12 h-full border border-gray-300 rounded-md bg-gray-100 relative flex items-center justify-center tracking-[20px] sm:tracking-[15px] text-lg font-medium no-copy">
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
                    <p className={`text-[13px] relative text-gray-500 transition-all duration-300 ${verifyLabel ? '-top-5 z-20 bg-white' : 'top-0'}`}>ছবিতে প্রদর্শিত কোডটি প্রদান করুন</p>
                    <input type="text" className='w-full h-full left-0 px-4 absolute outline-none rounded-md bg-transparent z-10 focus:outline-[3px] focus:outline-blue-200 focus:border-[3px] focus:border-blue-300 outline-offset-0 transition-all duration-100' value={verifyLetter} onChange={(e) => setVerifyLetter(e.target.value)} onBlur={verifyBlur} onFocus={verifyFocus} />
                </div>

                <Link href="/user/forget" className='hover:underline decoration-blue-600 self-start ml-5 hover:text-blue-600 mt-3 text-[13px]'>পাসওয়ার্ড ভুলে গেছেন?</Link>

                {
                    message && (
                        <p className="w-full px-4 py-1.5 bg-[rgba(239,68,68,0.5)] text-white z-30 text-center">
                            {message}
                        </p>

                    )
                }

                <button onClick={handleSubmit} className={`w-full py-2 border border-green-900 rounded-md bg-green-800 text-white mt-3`}>লগইন করুন</button>

                <p className='text-sm mt-3'>একাউন্ট নেই? <Link href="/user/registration" className='underline decoration-blue-600 text-blue-600'>রেজিস্ট্রেশন করুন</Link></p>

            </div>
        </div >
    )
}

export default page