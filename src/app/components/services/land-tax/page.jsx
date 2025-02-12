'use client';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import Animation from '../Animation';

const page = () => {
    const [divisionName, setDivisionName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [upazilaName, setUpazilaName] = useState('');
    const [mouzaName, setMouzaName] = useState('');
    const [khatianName, setKhatianNumber] = useState('');
    const [mobile, setMobile] = useState('');
    const [division, setDivision] = useState('');
    const [district, setDistrict] = useState('');
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState('');
    const [submit, setSubmit] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function getDistrict() {
            try {
                const response = await fetch("https://bdapi.vercel.app/api/v.1/district");
                const result = await response.json();
                setDistrict(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        async function getDivision() {
            try {
                const response = await fetch("https://bdapi.vercel.app/api/v.1/division");
                const result = await response.json();
                setDivision(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getDivision();
        getDistrict();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/post/submit-landtax/landTex', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ divisionName, districtName, upazilaName, mouzaName, khatianName, mobile }),
        });
        setLoader(true);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
            setTimeout(() => {
                setLoader(false);
                setSubmit(true);
            }, 1000);
            setTimeout(() => {
                setSubmit(false);
            }, 3000);
        } else {
            setMessage('Error saving user');
            setTimeout(() => {
                setMessage('');
            }, 1500);
            setLoader(false);
        }
        setDivisionName('');
        setDistrictName('');
        setUpazilaName('');
        setMouzaName('');
        setKhatianNumber('');
        setMobile('');
    };

    return (
        <div className='w-full h-screen flex flex-col items-center bg-white text-black justify-center relative px-20 sm:px-10 sm:justify-start sm:pt-5'>

            <Animation loader={loader} />

            {submit && <p className=' absolute text-lg top-1/2 -translate-y-1/2 bg-red-500 px-10 py-2 text-white rounded-md z-20'>আবেদনটি জমা হয়েছে</p>}

            <h1 className='text-4xl font-bold border-b border-b-gray-400 py-5 sm:text-2xl'>খতিয়ান অনুসন্ধান করুন</h1>

            <form onSubmit={handleSubmit} className='w-10/12 sm:w-full space-y-6 gap-x-7 grid grid-cols-4 items-center justify-center mt-5 sm:grid-cols-1 sm:grid-rows-none'>

                <div className='flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12 mt-6'>

                    <div className=" absolute right-4 text-xl text-neutral-500 flex items-center justify-center space-x-3 top-1/2 -translate-y-1/2">
                        <div className="w-0.5 h-6 bg-neutral-300"></div>
                        <MdOutlineArrowDropDownCircle />
                    </div>

                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>বিভাগ <span className='text-red-500 relative top-1 text-lg '>*</span></p>

                    <select id="" className='w-full relative px-4 appearance-none cursor-pointer text-neutral-600 outline-none bg-transparent' value={divisionName} onChange={(e) => setDivisionName(e.target.value)}>
                        <option value="">নির্বাচন করুন</option>
                        {
                            division && division.map((elem) => {
                                return (
                                    <option value={elem.bn_name} key={elem.id} className='h-full'>{elem.bn_name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className='flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12'>
                    <div className=" absolute right-4 text-xl text-neutral-500 flex items-center justify-center space-x-3 top-1/2 -translate-y-1/2">
                        <div className="w-0.5 h-6 bg-neutral-300"></div>
                        <MdOutlineArrowDropDownCircle />
                    </div>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>জেলা <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <select name="" id="" className='bg-transparent w-full relative px-4 appearance-none cursor-pointer text-neutral-600 outline-none' value={districtName} onChange={(e) => setDistrictName(e.target.value)}>
                        <option value="">নির্বাচন করুন</option>
                        {
                            district && district.map((elem) => {
                                return (
                                    <option value={elem.bn_name} key={elem.id}>{elem.bn_name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className='flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12'>
                    <div className=" absolute right-4 text-xl text-neutral-500 flex items-center justify-center space-x-3 top-1/2 -translate-y-1/2">
                        <div className="w-0.5 h-6 bg-neutral-300"></div>
                        <MdOutlineArrowDropDownCircle />
                    </div>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>উপজেলা <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <select name="" id="" className='bg-transparent w-full relative px-4 appearance-none cursor-pointer text-neutral-600 outline-none' value={upazilaName} onChange={(e) => setUpazilaName(e.target.value)}>
                        <option value="">নির্বাচন করুন</option>
                        <option value="বগুড়া সদর">বগুড়া সদর</option>
                        <option value="আদমদীঘি">আদমদীঘি</option>
                        <option value="দুপচাঁচিয়া">দুপচাঁচিয়া</option>
                        <option value="নন্দীগ্রাম">নন্দীগ্রাম</option>
                        <option value="কাহালু">কাহালু</option>
                        <option value="শেরপুর">শেরপুর</option>
                        <option value="শাজাহানপুর">শাজাহানপুর</option>
                        <option value="ধুনট">ধুনট</option>
                        <option value="সারিয়াকান্দি">সারিয়াকান্দি</option>
                        <option value="গাবতলী">গাবতলী</option>
                        <option value="শিবগঞ্জ">শিবগঞ্জ</option>
                        <option value="সোনাতলা">সোনাতলা</option>
                    </select>
                </div>
                <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>মৌজা <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="text" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 border-b-green-500 px-4 ' value={mouzaName} placeholder='মৌজার নাম লিখুন...'
                            onChange={(e) => setMouzaName(e.target.value)} />
                    </div>
                </div>

                <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>খতিয়ান নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="text" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 border-b-green-500 px-4' value={khatianName} placeholder='খতিয়ান নাম্বার লিখুন...'
                            onChange={(e) => setKhatianNumber(e.target.value)} />
                    </div>
                </div>

                <div className='flex flex-col items-start w-full relative py-4 h-12 border border-green-500 rounded-md'>
                    <p className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>মোবাইল নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></p>
                    <div name="" id="" className='bg-transparent w-full relative outline-none'>
                        <input type="text" className='outline-none w-full placeholder:text-sm placeholder:text-neutral-600 text-neutral-600 appearance-none border-b-green-500 px-4' value={mobile} placeholder='মোবাইল নাম্বার লিখুন...'
                            onChange={(e) => setMobile(e.target.value)} />
                    </div>
                </div>

                <button type="submit" className='w-full py-3 text-lg font-semibold bg-green-600 hover:bg-transparent border border-green-600 transition-all duration-300 hover:text-green-600 text-white rounded-lg'>জমা দিন</button>
            </form>

            {message && <p className='text-lg font-semibold text-red-500'>{message}</p>}

            <button className='bg-blue-600 mt-10 px-10 py-2 text-lg text-white rounded-md ' onClick={() => router.back()}>Back</button>
        </div>
    );
};

export default page;
