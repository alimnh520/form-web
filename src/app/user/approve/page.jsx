import React from 'react'

const page = () => {
    return (
        <div className="w-full h-screen flex items-start justify-center bg-[url('/bg/lsg-image.webp')] bg-center bg-cover -mt-16">
            <div className="w-[400px] h-80 bg-white p-7 flex flex-col items-center justify-center mt-4 gap-y-3 relative sm:w-80 sm:bg-[rgba(255,255,255,0.5)]">
                <h1 className='text-3xl font-semibold text-center'>Waiting for approve by Admin</h1>
                <p>For help please contact: 01850685033</p>
            </div>
        </div>
    )
}

export default page