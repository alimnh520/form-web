'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const page = () => {
    const { nidNum, dob } = useParams();
    // const [nidData, setNidData] = useState('');
    const nidRef = useRef();

    const nidPrint = () => {

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


    const nidData = {
        "Owner": "digital sheba bd",
        "nameBangla": "মোঃ রাজিম উদ্দিন",
        "nameEnglish": "MD. RAZIM UDDIN",
        "nationalId": "6023902676",
        "dateOfBirth": "20 Apr 2003",
        "dateOfToday": "23 May 2025",
        "pin": "20031010627000371",
        "gender": "male",
        "religion": "Islam",
        "occupation": null,
        "bloodGroup": null,
        "fatherName": "মোঃ জাকির হোসেন",
        "nidFather": "N/A",
        "motherName": "নার্গিস",
        "nidMother": "N/A",
        "spouseName": "N/A",
        "birthPlace": "বগুড়া",

        "presentHomeOrHoldingNo": "০",
        "presentAdditionalVillageOrRoad": "বিহিগ্রাম পশ্চিমপাড়া",
        "presentMouzaOrMoholla": "বিহিগ্রাম",
        "presentAdditionalMouzaOrMoholla": "",
        "presentUnionOrWard": "চাঁপাপুর",
        "presentWardForUnionPorishod": 4,
        "presentPostOffice": "বিহিগ্রাম",
        "presentPostalCode": "৫৮৯০",
        "presentCityCorporationOrMunicipality": "",
        "presentUpozila": "আদমদিঘী",
        "presentRmo": "1",
        "presentDistrict": "বগুড়া",
        "presentDivision": "রাজশাহী",
        "presentRegion": "রাজশাহী",

        "permanentHomeOrHoldingNo": "০",
        "permanentAdditionalVillageOrRoad": "বিহিগ্রাম পশ্চিমপাড়া",
        "permanentMouzaOrMoholla": "বিহিগ্রাম",
        "permanentAdditionalMouzaOrMoholla": "",
        "permanentUnionOrWard": "চাঁপাপুর",
        "permanentWardForUnionPorishod": 4,
        "permanentPostOffice": "বিহিগ্রাম",
        "permanentPostalCode": "৫৮৯০",
        "permanentCityCorporationOrMunicipality": "",
        "permanentUpozila": "আদমদিঘী",
        "permanentRmo": "1",
        "permanentDistrict": "বগুড়া",
        "permanentDivision": "রাজশাহী",
        "permanentRegion": "রাজশাহী",
        "photo": "https://api.e-sheba24.com/uploads/photo_6023902676.jpg"
    }





    return (
        <div className='w-full h-auto flex flex-col items-center justify-center p-7 -mt-16'>
            <div className="w-[793.92px] h-[1122.24px] flex flex-col relative" ref={nidRef} onClick={nidPrint}>
                <img src="/nid/Server-copy.jpg" alt="" className='w-full h-full absolute top-0 left-0 object-center object-cover' />
                <div className="absolute flex flex-col gap-y-[6px] top-[360px] left-[437px]">
                    <p className=''>{nidData.nationalId}</p>
                    <p>{nidData.pin}</p>
                    <p>{nidData.pin}</p>
                    <p>{nidData.birthPlace}</p>
                </div>

                <div className="absolute flex flex-col gap-y-[6px] top-[512px] left-[437px]">
                    <p>{nidData.nameBangla}</p>
                    <p>{nidData.nameEnglish}</p>
                    <p>{nidData.dateOfBirth}</p>
                    <p>{nidData.fatherName}</p>
                    <p>{nidData.motherName}</p>
                    <p>{nidData.spouseName}</p>
                </div>

                <div className="absolute flex flex-col gap-y-[6px] top-[725px] left-[437px]">
                    <p>{nidData.gender}</p>
                    <p>{nidData.religion}</p>
                    <p>{nidData.bloodGroup}</p>
                    <p>{nidData.birthPlace}</p>
                </div>

                <p className="w-[390px] absolute flex flex-col gap-y-[6px] top-[872px] left-[293px] text-sm">বাসা/হোল্ডিংঃ {nidData.presentHomeOrHoldingNo}, গ্রাম/রাস্তাঃ {nidData.presentAdditionalVillageOrRoad}, ডাকঘরঃ {nidData.presentPostOffice}, মৌজা/মহল্লাঃ {nidData.permanentAdditionalMouzaOrMoholla}, ইউনিয়ন/ওয়ার্ডঃ {nidData.presentUnionOrWard} , ইউনিয়ন/ওয়ার্ড নংঃ {nidData.presentWardForUnionPorishod}, সিটি কর্পোরেশন/পৌরসভাঃ {nidData.presentCityCorporationOrMunicipality}, উপজেলাঃ {nidData.presentUpozila}, আরএমওঃ {nidData.presentRmo}, জেলাঃ {nidData.presentDistrict}, অঞ্চলঃ {nidData.presentRegion}, বিভাগঃ {nidData.presentDivision}।</p>

                <p className="w-[390px] absolute flex flex-col gap-y-[6px] top-[972px] left-[293px] text-sm">
                    বাসা/হোল্ডিংঃ {nidData.permanentHomeOrHoldingNo}, গ্রাম/রাস্তাঃ {nidData.permanentAdditionalVillageOrRoad}, ডাকঘরঃ {nidData.permanentPostOffice}, মৌজা/মহল্লাঃ {nidData.permanentAdditionalMouzaOrMoholla}, ইউনিয়ন/ওয়ার্ডঃ {nidData.permanentUnionOrWard} , ইউনিয়ন/ওয়ার্ড নংঃ {nidData.permanentWardForUnionPorishod}, সিটি কর্পোরেশন/পৌরসভাঃ {nidData.permanentCityCorporationOrMunicipality}, উপজেলাঃ {nidData.permanentUpozila}, আরএমওঃ {nidData.permanentRmo}, জেলাঃ {nidData.permanentDistrict}, অঞ্চলঃ {nidData.permanentRegion}, বিভাগঃ {nidData.permanentDivision}।
                </p>

                {/* image add */}

                <div className="w-60 h-auto absolute flex flex-col items-center gap-y-[13px] top-[314px] left-[65px]">
                    <img src={nidData.photo} alt='Loading...' className=" w-[120px] h-[140px] rounded-xl object-cover object-center"></img>

                    <p className='font-serif font-semibold text-[11px] z-10'>
                        {nidData.nameEnglish}
                    </p>

                    <div className="size-[100px] mt-2.5 bg-red-700 z-10"></div>

                </div>
                <div className="size-24 bg-white absolute top-[463px] left-[148px]"></div>


            </div>
        </div>
    )
}

export default page