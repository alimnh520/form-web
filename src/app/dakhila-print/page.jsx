'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [userData, setUserData] = useState('');
    useEffect(() => {
        const userData = async () => {
            try {
                const res = await fetch('/api/form-data', {
                    method: 'GET',
                })
                const data = await res.json();
                if (data.success) {
                    setUserData(data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
        userData();
    }, []);
    const deleteData = async (userId) => {
        try {
            const response = await fetch('/api/delete-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId})
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <h1>See User Data</h1>
            {
                userData && userData.map((elem) => {
                    return (
                        <div className="" key={elem._id}>
                            <div className="flex items-center justify-center gap-x-4">
                                <p> {elem.topCrokimNmbr}</p>
                                <Link href={`/dakhila-print/${elem._id}`}>See</Link>
                                <button onClick={() => deleteData(elem._id)}>delete</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default page