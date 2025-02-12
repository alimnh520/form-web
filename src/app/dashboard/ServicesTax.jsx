import Link from 'next/link'
import React from 'react'

const ServicesTax = ({ img, tax, clr, url }) => {
    return (
        <div className='h-full w-full'>
            <Link href={url} className="h-full w-full shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-pointer bg-white rounded-md flex flex-col items-center justify-end pb-3 relative space-y-3">
                <div className={`absolute w-full h-10 rounded-md bg-[${clr}] top-0`}></div>
                <div className="size-20 flex items-center justify-center">
                    {
                        img == 'img1' && (
                            <div className="size-20 flex items-center justify-center border-[6px] border-[#4072b7] bg-[url('/logos/7af26598c5a44fa496e399a83d5393fcc3ffdca60898bc81.jpg')] bg-cover bg-center">
                            </div>
                        ) || img == 'img2' && (
                            <div className="size-20 flex items-center justify-center border-[6px] border-[#007d4d] bg-[url('/logos/images.png')] bg-cover bg-center">
                            </div>
                        ) || img == 'img3' && (
                            <div className="size-20 flex items-center justify-center border-[6px] border-[#365e3c] bg-[url('/logos/BD-1-423x601.webp')] bg-cover bg-center">
                            </div>
                        )
                    }
                    <img src={img} alt="" />

                </div>
                <h1 className='text-2xl font-semibold'>{tax}</h1>

            </Link>
        </div>
    )
}

export default ServicesTax