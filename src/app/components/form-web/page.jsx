'use client';
import { useState } from 'react';

const page = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [age, setAge] = useState('');
    const [number, setNumber] = useState('');
    const [loader, setLoader] = useState(false);

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
        <div className='w-full h-screen flex flex-col items-center justify-center text-white transition-all duration-300 scroll-smooth relative'>
            <div className={`size-40 border-8 border-t-8 border-t-transparent border-red-500 rounded-full absolute z-20 bg-transparent animate-spin ${loader ? 'block' : 'hidden'}`}></div>


            <h1 className='text-4xl font-bold border-b border-b-gray-400 py-5'>Submit User Data</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-start space-y-5 w-80 bg-transparent backdrop-blur-md rounded-3xl border border-gray-500 p-10 mt-5'>
                <div className='flex flex-col items-start w-full'>
                    <label htmlFor="name">Name :</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='outline-none w-full px-4 py-2 bg-gray-400 text-lg'
                    />
                </div>
                <div className='flex flex-col items-start w-full'>
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='outline-none w-full px-4 py-2 bg-gray-400 text-lg'
                    />
                </div>
                <div className='flex flex-col items-start w-full'>
                    <label htmlFor="age">Age :</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        className='outline-none w-full px-4 py-2 bg-gray-400 text-lg'
                    />
                </div>
                <div className='flex flex-col items-start w-full'>
                    <label htmlFor="number">Number :</label>
                    <input
                        type="number"
                        id="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                        className='outline-none w-full px-4 py-2 bg-gray-400 text-lg'
                    />
                </div>
                <button type="submit" className='w-full py-3 text-lg font-semibold bg-blue-400 hover:bg-transparent border border-blue-400 transition-all duration-300 hover:text-blue-400 rounded-lg' onClick={() => setValue}>Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default page;
