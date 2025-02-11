"use client";
import { useParams, useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";

const page = () => {
    const route = useRouter();
    const params = useParams();
    const [hidePrint, setHidePrint] = useState(false);
    const [fetchData, setFetchData] = useState("");
    const printBtn = () => {
        setHidePrint(true);
        setTimeout(() => {
            window.print();
            setHidePrint(false);
        }, 100);
    };

    useEffect(() => {
        const userData = async () => {
            try {
                const res = await fetch("/api/form-data", {
                    method: "GET",
                });
                const data = await res.json();
                if (data.success) {
                    setFetchData(data.message);
                }
            } catch (error) {
                console.log(error);
            }
        };
        userData();
    }, []);

    const url = `https://ldtax.gov.bdl.tax/dakhila-print/${params.id}`;

    return fetchData ? (
        fetchData
            .filter((currElm) => currElm._id == params.id)
            .map((elem) => {
                return (
                    <div
                        className="w-full flex flex-col items-center justify-center p-4 bg-lime-50 sm:overflow-x-scroll"
                        key={elem._id}
                    >
                        <div
                            className={`w-full h-16 ${hidePrint ? "hidden" : "flex"
                                } items-center justify-center relative before:absolute before:content-[''] before:w-full before:h-6 before:bg-white before:bottom-0 bg-blue-600 border border-blue-600 rounded-md overflow-hidden`}
                        >
                            <button
                                className="text-white text-sm absolute top-0 px-3 py-1 shadow-[2px_2px_2px_rgba(0,0,0,0.6)] hover:shadow-[-2px_-2px_2px_rgba(0,0,0,0.6)] bg-blue-800 rounded"
                                onClick={printBtn}
                            >
                                প্রিন্ট
                            </button>
                        </div>

                        <div
                            className={`w-[765px] sm:w-[700px] h-auto pb-40 mt-10 flex flex-col items-start text-[12px] p-4 border-[1.5px] border-dotted border-black text-zinc-800 text- rounded-md bg-white gap-y-[5px] relative`}
                        >
                            <div className="w-full flex items-center justify-between">
                                <p>
                                    বাংলাদেশ ফরম নং ১০৭৭ <br /> (সংশোধিত)
                                </p>
                                <div className="flex flex-col items-end">
                                    <p>(পরিশিষ্ট: ৩৮)</p>
                                    <p>ক্রমিক নং {elem.topCrokimNmbr}</p>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-center">
                                <p className="text-center">
                                    ভূমি উন্নয়ন কর পরিশোধ রসিদ <br /> (অনুচ্ছেদ ৩৯২ দ্রষ্টব্য)
                                </p>
                            </div>

                            <div className="w-full flex justify-start items-center mt-2">
                                <p className="w-[43%]">
                                    সিটি কর্পোরেশন/পৌর/ ইউনিয়ন ভূমি অফিসের নাম:
                                </p>
                                <p className="w-[57%] border-b-[1.5px] border-dotted border-b-black">
                                    {elem.unionNum}
                                </p>
                            </div>

                            <div className="w-full flex items-start justify-start">
                                <div className="w-[45%] flex items-center justify-start">
                                    <p className="w-[50%]">মৌজার নাম ও জে. এল, নং:</p>
                                    <p className=" w-[50%] border-b-[1.5px] border-dotted border-b-black">
                                        {elem.moujarNam}
                                    </p>
                                </div>
                                <div className="w-[55%] flex items-center justify-start">
                                    <div className="flex items-center justify-start space-x-0 w-7/12">
                                        <p className="w-5/12">উপজেলা/থানা:</p>
                                        <p className="border-b-[1.5px] border-dotted border-b-black w-7/12">
                                            {elem.thana}
                                        </p>
                                    </div>
                                    <div className="w-5/12 flex items-center justify-start space-x-2">
                                        <p>জেলা:</p>
                                        <p className="border-b-[1.5px] border-dotted border-b-black w-full">
                                            {elem.district}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex justify-between items-center">
                                <p className="w-[31%]">
                                    ২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:{" "}
                                </p>
                                <p className="w-[69%] border-b-[1.5px] border-dotted border-b-black">
                                    {elem.holdingNmbr}
                                </p>
                            </div>

                            <div className="w-full flex space-x-1 justify-start items-center">
                                <p className="w-[10%]">খতিয়ান নং:</p>
                                <p className="w-[90%] border-b-[1.5px] border-dotted border-b-black mb-1">
                                    {elem.khatianNmbr}
                                </p>
                            </div>

                            <div className="w-full flex flex-col items-center justify-center mt-2  text-[12px]">
                                <p className="border-b border-b-black  font-semibold">
                                    মালিকের বিবরণ
                                </p>

                                <div className="w-full flex items-start justify-between space-x-3 mt-3 text-[12px]">
                                    <div
                                        className={`${elem.ownerData.length < 2 ? "w-full" : "w-1/2"
                                            } flex items-center justify-center`}
                                    >
                                        <table className="w-full mt-3 border-t-[1.5px] border-t-black border-l-[1.5px] border-l-black border-r-[1.5px] border-r-black border-dotted flex flex-col items-center justify-center">
                                            <thead className="w-full border-b-[1.5px] border-dotted border-b-black">
                                                <tr className="w-full flex items-center justify-center">
                                                    <th className="w-[15%] border-r-[1.5px] border-dotted border-r-black font-semibold">
                                                        ক্রমঃ
                                                    </th>
                                                    <th className="w-[55%] font-semibold">
                                                        মালিকের নাম{" "}
                                                    </th>
                                                    <th className="w-[30%] border-l-[1.5px] border-dotted border-l-black font-semibold">
                                                        মালিকের অংশ
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="w-full">
                                                {elem.ownerData
                                                    .filter((elem, index) => index % 2 === 0)
                                                    .map((elem) => {
                                                        return (
                                                            <tr
                                                                className="w-full flex items-center justify-center border-dotted border-b-[1.5px] border-b-black"
                                                                key={elem.ownerCromik}
                                                            >
                                                                <td className="w-[15%] border-r-[1.5px] border-dotted border-r-black text-center">
                                                                    {elem.ownerCromik}
                                                                </td>
                                                                <td className="w-[55%] px-1">
                                                                    {elem.ownerName}
                                                                </td>
                                                                <td className="w-[30%] border-l-[1.5px] border-dotted border-l-black text-center">
                                                                    {elem.ownerProperty}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div
                                        className={`w-1/2 ${elem.ownerData.length >= 2 ? "flex" : "hidden"
                                            } items-center justify-center`}
                                    >
                                        <table className="w-full mt-3 border-t-[1.5px] border-t-black border-l-[1.5px] border-l-black border-r-[1.5px] border-r-black border-dotted flex flex-col items-center justify-center">
                                            <thead className="w-full border-b-[1.5px] border-dotted border-b-black">
                                                <tr className="w-full flex items-center justify-center">
                                                    <th className="w-[15%] border-r-[1.5px] border-dotted border-r-black font-semibold">
                                                        ক্রমঃ
                                                    </th>
                                                    <th className="w-[55%] font-semibold">
                                                        মালিকের নাম{" "}
                                                    </th>
                                                    <th className="w-[30%] border-l-[1.5px] border-dotted border-l-black font-semibold">
                                                        মালিকের অংশ
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="w-full">
                                                {elem.ownerData
                                                    .filter((elem, index) => index % 2 === 1)
                                                    .map((elem) => {
                                                        return (
                                                            <tr
                                                                className="w-full flex items-center justify-center border-dotted border-b-[1.5px] border-b-black"
                                                                key={elem.ownerCromik}
                                                            >
                                                                <td className="w-[15%] border-r-[1.5px] border-dotted border-r-black text-center">
                                                                    {elem.ownerCromik}
                                                                </td>
                                                                <td className="w-[55%] px-5">
                                                                    {elem.ownerName}
                                                                </td>
                                                                <td className="w-[30%] border-l-[1.5px] border-dotted border-l-black text-center">
                                                                    {elem.ownerProperty}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex flex-col items-center justify-center mt-2 ">
                                <p className="border-b border-b-black  font-semibold text-[12px]">
                                    জমির বিবরণ
                                </p>

                                <div className="w-full flex items-start justify-between space-x-3 mt-3 text-[12px]">
                                    <div
                                        className={`${elem.landData.length < 2 ? "w-full" : "w-1/2"
                                            } flex items-center justify-center`}
                                    >
                                        <table className="w-full border-dotted border-t-[1.5px] border-t-black border-l-[1.5px] border-l-black border-r-[1.5px] border-r-black flex flex-col items-center justify-center">
                                            <thead className="w-full border-b-[1.5px] border-dotted border-b-black">
                                                <tr className="w-full flex items-center justify-center">
                                                    <th className="w-[15%] border-r-[1.5px] border-dotted border-r-black font-semibold">
                                                        ক্রম{" "}
                                                    </th>
                                                    <th className="w-[20%] border-r-[1.5px] border-dotted border-r-black font-semibold">
                                                        দাগ নং
                                                    </th>
                                                    <th className="w-[25%] border-r-[1.5px] border-dotted border-r-black font-semibold">
                                                        জমির শ্রেণি
                                                    </th>
                                                    <th className="w-[40%] font-semibold">
                                                        জমির পরিমাণ (শতাংশ)
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="w-full">
                                                {elem.landData.length < 2 &&
                                                    elem.landData.map((elem, index) => {
                                                        return (
                                                            <tr
                                                                className="w-full flex items-center justify-center border-dotted border-b-[1.5px] border-b-black"
                                                                key={index}
                                                            >
                                                                <td className="w-[15%] border-r-[1.5px] border-dotted border-r-black text-center">
                                                                    {elem.landCromik}
                                                                </td>
                                                                <td className="w-[20%] border-r-[1.5px] border-dotted border-r-black px-0.5">
                                                                    {elem.dagNum}
                                                                </td>
                                                                <td className="w-[25%] border-r-[1.5px] border-dotted border-r-black px-0.5">
                                                                    {elem.landClass}
                                                                </td>
                                                                <td className="w-[40%] px-0.5">
                                                                    {elem.landSize}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                {elem.landData
                                                    .slice(0, elem.landData.length / 2)
                                                    .map((elem, index) => {
                                                        return (
                                                            <tr
                                                                className="w-full flex items-center justify-center border-dotted border-b-[1.5px] border-b-black"
                                                                key={index}
                                                            >
                                                                <td className="w-[15%] border-r-[1.5px] border-dotted border-r-black text-center">
                                                                    {elem.landCromik}
                                                                </td>
                                                                <td className="w-[20%] border-r-[1.5px] border-dotted border-r-black px-0.5">
                                                                    {elem.dagNum}
                                                                </td>
                                                                <td className="w-[25%] border-r-[1.5px] border-dotted border-r-black px-0.5">
                                                                    {elem.landClass}
                                                                </td>
                                                                <td className="w-[40%] px-0.5">
                                                                    {elem.landSize}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div
                                        className={`w-1/2 ${elem.landData.length < 2 ? "hidden" : "flex"
                                            } items-center justify-center`}
                                    >
                                        <table className="w-full border-dotted border-t-[1.5px] border-t-black border-l-[1.5px] border-l-black border-r-[1.5px] border-r-black flex flex-col items-center justify-center">
                                            <thead className="w-full border-b-[1.5px] border-dotted border-b-black">
                                                <tr className="w-full flex items-center justify-center">
                                                    <th className="w-[15%] border-r-[1.5px] border-dotted border-r-black font-semibold">
                                                        ক্রম{" "}
                                                    </th>
                                                    <th className="w-[20%] border-r-[1.5px] border-dotted border-r-black font-semibold">
                                                        দাগ নং
                                                    </th>
                                                    <th className="w-[25%] border-r-[1.5px] border-dotted border-r-black font-semibold">
                                                        জমির শ্রেণি
                                                    </th>
                                                    <th className="w-[40%] font-semibold">
                                                        জমির পরিমাণ (শতাংশ)
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="w-full">
                                                {elem.landData
                                                    .slice(
                                                        elem.landData.length / 2,
                                                        elem.landData.length - 1
                                                    )
                                                    .map((elem, index) => {
                                                        return (
                                                            <tr
                                                                className="w-full flex items-center justify-center border-dotted border-b-[1.5px] border-b-black"
                                                                key={index}
                                                            >
                                                                <td className="w-[15%] border-r-[1.5px] border-dotted border-r-black text-center">
                                                                    {elem.landCromik}
                                                                </td>
                                                                <td className="w-[20%] border-r-[1.5px] border-dotted border-r-black px-0.5">
                                                                    {elem.dagNum}
                                                                </td>
                                                                <td className="w-[25%] border-r-[1.5px] border-dotted border-r-black px-0.5">
                                                                    {elem.landClass}
                                                                </td>
                                                                <td className="w-[40%] px-0.5">
                                                                    {elem.landSize}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between border-[1.5px] border-dotted border-black mt-2">
                                <p className="text-center mt-0.5 w-1/2 border-r-[1.5px] border-dotted border-r-black">
                                    সর্বমোট জমি (শতাংশ)
                                </p>
                                <p className="px-0.5 mt-0.5 w-1/2">{elem.totalLand}</p>
                            </div>

                            <div className="w-full flex items-center justify-center flex-col border-[1.5px] mt-6 border-zinc-200 text-[12px]">
                                <p className="text-[12px] font-semibold w-full text-center p-2 bg-slate-100">
                                    আদায়ের বিবরণ
                                </p>

                                <table className="w-full flex flex-col items-center justify-center">
                                    <thead className="w-full border-t-[1.5px] border-t-zinc-200 border-b-[1.5px] border-b-zinc-200">
                                        <tr className="w-full flex items-center justify-center">
                                            <th className="w-[20%] font-medium border-r-[1.5px] border-r-zinc-200 py-2">
                                                তিন বৎসরের <br /> উর্ধ্বের বকেয়া{" "}
                                            </th>
                                            <th className="w-[19%] font-medium border-r-[1.5px] border-r-zinc-200 py-2">
                                                গত তিন বৎসরের <br /> বকেয়া
                                            </th>
                                            <th className="w-[20%] font-medium border-r-[1.5px] border-r-zinc-200 py-2">
                                                বকেয়ার জরিমানা ও <br /> ক্ষতিপূরণ
                                            </th>
                                            <th className="w-[8%] font-medium border-r-[1.5px] border-r-zinc-200 py-2">
                                                হাল <br /> দাবি{" "}
                                            </th>
                                            <th className="w-[8%] font-medium border-r-[1.5px] border-r-zinc-200 py-2">
                                                মোট <br /> দাবি
                                            </th>
                                            <th className="w-[8%] font-medium border-r-[1.5px] border-r-zinc-200 py-2">
                                                মোট <br /> আদায়{" "}
                                            </th>
                                            <th className="w-[10%] font-medium border-r-[1.5px] border-r-zinc-200 py-2">
                                                মোট <br /> বকেয়া{" "}
                                            </th>
                                            <th className="w-[6%] font-medium mb-5"> মন্তব্য </th>
                                        </tr>
                                    </thead>
                                    <tbody className="w-full">
                                        <tr className="w-full bg-slate-100 flex items-center justify-center">
                                            <td className="w-[20%] text-center border-r-[1.5px] border-r-zinc-200 p-2">
                                                {elem.loanPlus}
                                            </td>
                                            <td className="w-[19%] text-center border-r-[1.5px] border-r-zinc-200 p-2">
                                                {elem.loan}
                                            </td>
                                            <td className="w-[20%] text-center border-r-[1.5px] border-r-zinc-200 p-2">
                                                {elem.loanFine}
                                            </td>
                                            <td className="w-[8%] text-center border-r-[1.5px] border-r-zinc-200 p-2">
                                                {elem.halDabi}
                                            </td>
                                            <td className="w-[8%] text-center border-r-[1.5px] border-r-zinc-200 p-2">
                                                {elem.totalDabi}
                                            </td>
                                            <td className="w-[8%] text-center border-r-[1.5px] border-r-zinc-200 p-2">
                                                {elem.totalAdai}
                                            </td>
                                            <td className="w-[10%] text-center border-r-[1.5px] border-r-zinc-200 p-2">
                                                ০
                                            </td>
                                            <td className="w-[6%] text-center"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="w-full flex items-center justify-start space-x-1.5 border-b-[1.5px] border-b-black text-[12px] h-5 pt-1 border-dotted">
                                <p>সর্বমোট (কথায়):</p>
                                <p> {elem.totalAmount} </p>
                            </div>

                            <div className="w-full flex items-start mt-1.5 justify-between text-[12px]">
                                <div className="flex items-start justify-start flex-col">
                                    <p>
                                        নোট: সর্বশেষ কর পরিশোধের সাল - <span>{elem.year}</span>{" "}
                                        (অর্থবছর)
                                    </p>
                                    <p>চালান নংঃ {elem.calanNumber}</p>
                                    <div className="flex items-center justify-between space-x-1">
                                        <p>তারিখ:</p>
                                        <div className="flex flex-col items-start justify-center w-fit">
                                            <p className="">{elem.banglaDate}</p>
                                            <p className="border-t border-t-gray-900 pt-1 w-full">
                                                {elem.englishDate}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <QRCodeCanvas value={url} size={67} className="" />
                                </div>

                                <p className="text-center">
                                    {" "}
                                    এই দাখিলা ইলেক্ট্রনিকভাবে তৈরি করা হয়েছে, <br /> কোনো স্বাক্ষর
                                    প্রয়োজন নেই।
                                </p>
                            </div>
                            <p className="w-[98%] self-center bottom-0 font-medium text-end absolute border-t border-t-black border-dotted">
                                1/1
                            </p>
                        </div>
                    </div>
                );
            })
    ) : (
        <div className="w-full h-screen flex items-center justify-center">
            <img src="/loader/images.png" className=" animate-pulse" alt="" />
        </div>
    );
};

export default page;
