'use client'
import { BsPrinterFill } from "react-icons/bs";
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { QRCodeCanvas } from "qrcode.react";

const page = () => {
    const { nidNum, dob } = useParams();
    const [nidData, setNidData] = useState('');
    const nidRef = useRef();

    console.log(nidData)

    const nidPrint = () => {
        window.print();
    }

    useEffect(() => {
        const getNidData = async () => {
            try {
                const res = await fetch(`/api/nid-data`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nidNum, dob })
                });
                const data = await res.json();
                setNidData(data.message);
            } catch (error) {
                console.log(error);
            }
        }
        getNidData();
    }, []);

    if (nidData.error === 'Invalid API key.') {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p>Invalid API key.</p>
            </div>
        )
    }


    const url = `https://ldtax.gov.bdl.tax/dashboard/pages/nid-data/${nidNum}/${dob}`;

    return (
        <div className='w-full h-auto flex flex-col gap-y-6 items-center justify-center p-7 -mt-24 no-copy'>
            <div className="w-[793.92px] h-[1122.24px] font-[600] text-[#3f3f3f] text-[14px] flex flex-col relative" ref={nidRef}>
                <img src="/nid/Server-copy.jpg" alt="" className='w-full h-full absolute top-0 left-0 object-center object-cover' />
                <div className="absolute flex flex-col gap-y-[9px] top-[360px] left-[437px]">
                    <p className='english'>{nidData.nationalId}</p>
                    <p className='english'>{nidData.pin}</p>
                    <p className='english'>{nidData.pin}</p>
                    <p className=''>{nidData.birthPlace}</p>
                </div>

                <div className="absolute flex flex-col gap-y-[9px] top-[512px] left-[437px]">
                    <p className='text-black text-[16px]'>{nidData.nameBangla}</p>
                    <p className='english text-[12px]'>{nidData.nameEnglish}</p>
                    <p className='english'>{nidData.dateOfBirth}</p>
                    <p className='text-[15px]'>{nidData.fatherName}</p>
                    <p className='text-[15px]'>{nidData.motherName}</p>
                    <p className='english'>{nidData.spouseName}</p>
                </div>

                <div className="absolute flex flex-col gap-y-[9px] top-[725px] left-[437px]">
                    <p className='english'>{nidData.gender}</p>
                    <p className='english'>{nidData.religion}</p>
                    <p className={`english whitespace-pre-wrap `}>{nidData.bloodGroup ? nidData.bloodGroup : ' '}</p>
                    <p className=''>{nidData.birthPlace}</p>
                </div>

                <p className="w-[390px] absolute top-[872px] left-[293px] font-[500] text-[14px] leading-4 text-black">বাসা/হোল্ডিংঃ {nidData.presentHomeOrHoldingNo}, গ্রাম/রাস্তাঃ {nidData.presentAdditionalVillageOrRoad}, ডাকঘরঃ {nidData.presentPostOffice}, মৌজা/মহল্লাঃ {nidData.permanentAdditionalMouzaOrMoholla}, ইউনিয়ন/ওয়ার্ডঃ {nidData.presentUnionOrWard} , ইউনিয়ন/ওয়ার্ড নংঃ {nidData.presentWardForUnionPorishod}, সিটি কর্পোরেশন/পৌরসভাঃ {nidData.presentCityCorporationOrMunicipality}, উপজেলাঃ {nidData.presentUpozila}, আরএমওঃ {nidData.presentRmo}, জেলাঃ {nidData.presentDistrict}, অঞ্চলঃ {nidData.presentRegion}, বিভাগঃ {nidData.presentDivision}।</p>

                <p className="w-[390px] absolute top-[972px] left-[293px] font-[500] text-[14px] leading-4 text-black">
                    বাসা/হোল্ডিংঃ {nidData.permanentHomeOrHoldingNo}, গ্রাম/রাস্তাঃ {nidData.permanentAdditionalVillageOrRoad}, ডাকঘরঃ {nidData.permanentPostOffice}, মৌজা/মহল্লাঃ {nidData.permanentAdditionalMouzaOrMoholla}, ইউনিয়ন/ওয়ার্ডঃ {nidData.permanentUnionOrWard} , ইউনিয়ন/ওয়ার্ড নংঃ {nidData.permanentWardForUnionPorishod}, সিটি কর্পোরেশন/পৌরসভাঃ {nidData.permanentCityCorporationOrMunicipality}, উপজেলাঃ {nidData.permanentUpozila}, আরএমওঃ {nidData.permanentRmo}, জেলাঃ {nidData.permanentDistrict}, অঞ্চলঃ {nidData.permanentRegion}, বিভাগঃ {nidData.permanentDivision}।
                </p>

                {/* image add */}

                <div className="w-60 h-auto absolute flex flex-col items-center gap-y-[13px] top-[314px] left-[73px]">
                    <img src={nidData.photo} alt='Loading...' className=" w-[120px] h-[140px] rounded-xl object-cover object-center"></img>

                    <p className='font-serif font-semibold text-[11px] z-10'>
                        {nidData.nameEnglish}
                    </p>

                    <div className="mt-2.5 z-10">
                        <QRCodeCanvas value={url} size={95} className="w-full h-full" />
                    </div>

                </div>
                <div className="size-24 bg-white absolute top-[463px] left-[148px]"></div>

            </div>

            <button className='bg-blue-600 border border-blue-600 transition-all duration-300 hover:bg-white rounded-md text-white hover:text-blue-600 text-xl px-8 py-1' onClick={nidPrint}><BsPrinterFill /></button>
        </div>
    )
}

export default page