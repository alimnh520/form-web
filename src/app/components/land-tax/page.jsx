'use client';
import { useEffect, useState } from 'react';

const page = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [age, setAge] = useState('');
    const [number, setNumber] = useState('');
    const [loader, setLoader] = useState(false);
    const [division, setDivision] = useState('');
    const [district, setDistrict] = useState('');

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
        getDistrict();

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
    }, []);

    const setValue = () => {
        if (setName('') &&
            setEmail('') &&
            setAge('') &&
            setNumber('')) {
            setLoader(false);
        } else {
            setLoader(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('../../api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, age, number }),
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            setMessage('User created successfully!');
        } else {
            setMessage('Error saving user');
        }

        setName('');
        setEmail('');
        setAge('');
        setNumber('')
    };

    return (
        <div className='w-full h-screen flex flex-col items-center bg-white text-black justify-center  transition-all duration-300 scroll-smooth relative'>
            <div className={`size-40 border-8 border-t-8 border-t-transparent border-red-500 rounded-full absolute z-20 bg-transparent animate-spin ${loader ? 'block' : 'hidden'}`}></div>


            <h1 className='text-4xl font-bold border-b border-b-gray-400 py-5'>ভূমি উন্নয়ন কর</h1>
            <form onSubmit={handleSubmit} className='grid grid-cols-3 grid-rows-2 items-center justify-center space-y-5 w-full h-80 px-20 gap-10 bg-transparent backdrop-blur-md rounded-3xl border border-gray-500 p-10 mt-5 sm:grid-cols-1 sm:grid-rows-none'>

                <div className='flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12'>
                    <label htmlFor="" className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>বিভাগ <span className='text-red-500 relative top-1 text-lg '>*</span></label>
                    <select name="" id="" className='bg-transparent w-full relative px-4 outline-none'>
                        {
                            division && division.map((elem) => {
                                return(
                                    <option value="" key={elem.id} className='h-full'>{elem.bn_name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                
                <div className='flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12'>
                    <label htmlFor="" className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>জেলা <span className='text-red-500 relative top-1 text-lg '>*</span></label>
                    <select name="" id="" className='bg-transparent w-full relative px-4 outline-none'>
                        {
                            district && district.map((elem) => {
                                return(
                                    <option value={elem.bn_name} key={elem.id}>{elem.bn_name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className='flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12'>
                    <label htmlFor="" className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>উপজেলা <span className='text-red-500 relative top-1 text-lg '>*</span></label>
                    <select name="" id="" className='bg-transparent w-full relative px-4 outline-none'>
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
                <div className='flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12'>
                    <label htmlFor="" className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>মৌজা <span className='text-red-500 relative top-1 text-lg '>*</span></label>
                    <div name="" id="" className='bg-transparent w-full relative px-4 outline-none'>
                        <input type="text" className='outline-none border-green-500 border' />
                    </div>
                </div>

                <div className='flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12'>
                    <label htmlFor="" className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>খতিয়ান নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></label>
                    <div name="" id="" className='bg-transparent w-full relative px-4 outline-none'>
                        <input type="text" className='outline-none border-green-500 border' />
                    </div>
                </div>

                <div className='flex flex-col items-start w-full border border-green-600 relative py-4 rounded-md h-12'>
                    <label htmlFor="" className=' absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-white text-green-700'>মোবাইল নাম্বার <span className='text-red-500 relative top-1 text-lg '>*</span></label>
                    <div name="" id="" className='bg-transparent w-full relative px-4 outline-none'>
                        <input type="text" className='outline-none border-green-500 border' />
                    </div>
                </div>

                <button type="submit" className='w-full py-3 text-lg font-semibold bg-green-600 hover:bg-transparent border border-green-600 transition-all duration-300 hover:text-green-600 text-white rounded-lg' onClick={() => setValue}>জমা দিন</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default page;
