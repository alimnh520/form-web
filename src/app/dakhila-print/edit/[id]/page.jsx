"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    const params = useParams();
    const [fetchData, setFetchData] = useState('');
    const matchId = fetchData && fetchData.filter((currElm) => currElm._id === params.id);

    const [topCrokimNmbr, setTopCromikNmbr] = useState("");
    const [moujarNam, setMoujarNum] = useState("");
    const [unionNum, setUnionNum] = useState("");
    const [thana, setThana] = useState("");
    const [district, setDistrict] = useState("");
    const [holdingNmbr, setHoldingNmbr] = useState("");
    const [khatianNmbr, setKhatianNmbr] = useState("");



    const [ownerData, setOwnerData] = useState([]);
    const [landData, setLandData] = useState([]);

    //owner details
    const [ownerDetails, setOwnerDetails] = useState({
        ownerCromik: "",
        ownerName: "",
        ownerProperty: "",
    });

    const ownerHandleChange = (val) => {
        setOwnerDetails({ ...ownerDetails, [val.target.name]: val.target.value });
    };
    const addOwner = () => {
        setOwnerData([...ownerData, ownerDetails]);
        setOwnerDetails({
            ownerCromik: "",
            ownerName: "",
            ownerProperty: "",
        });
    };
    // land details
    const [landDetails, setLandDetails] = useState({
        landCromik: "",
        dagNum: "",
        landClass: "",
        landSize: "",
    });
    const landHandleChange = (val) => {
        setLandDetails({ ...landDetails, [val.target.name]: val.target.value });
    }

    const addLand = () => {
        setLandData([...landData, landDetails]);
        setLandDetails({
            landCromik: "",
            dagNum: "",
            landClass: "",
            landSize: "",
        });
    };

    console.log(ownerData.length)

    const deleteHandleChange = async (id, type) => {
        // setLoading(true);
        if (ownerData.length > 0 && type === 'owner') {
            setOwnerData(ownerData.slice(0, ownerData.length - 1));
            return
        }
        if (landData.length > 0 && type === 'land') {
            setLandData(landData.slice(0, landData.length - 1));
            return
        }

        if (ownerData.length === 0 && landData.length === 0) {
            try {
                const response = await fetch('/api/get/form-data/edit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id, type })
                });
                const data = await response.json();
                setMessage(data.message);
                if (data.success) {
                    setLoading(false);
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };


    const [totalLand, setTotalLand] = useState("");
    const [loanPlus, setLoanPlus] = useState("");
    const [loan, setLoan] = useState("");
    const [loanFine, setLoanFine] = useState("");
    const [halDabi, setHalDabi] = useState("");
    const [totalDabi, setTotalDabi] = useState("");
    const [totalAdai, setTotalAdai] = useState("");
    const [totalLoan, setTotalLoan] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [year, setYear] = useState("");
    const [calanNumber, setCalanNumber] = useState("");
    const [banglaDate, setBanglaDate] = useState("");
    const [englishDate, setEnglishDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOk, setIsOk] = useState(false);
    const [message, setMessage] = useState('');

    const handleSUbmit = async (id) => {
        setLoading(true);
        try {
            const response = await fetch('/api/get/form-data/edit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, ownerData, landData })
            });
            const data = await response.json();
            setMessage(data.message);
            if (data.success) {
                setLoading(false);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getFormData = async () => {
            try {
                const response = await fetch('/api/get/form-data', { method: 'GET' });
                const data = await response.json();
                if (data.success) {
                    setFetchData(data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getFormData();
    }, []);



    const send = [topCrokimNmbr,unionNum,moujarNam,thana,district,holdingNmbr,khatianNmbr,totalLand,loanPlus,loan,loanFine,halDabi,totalDabi,totalAdai,totalLoan,totalAmount,year,calanNumber,banglaDate,englishDate]

    return (
        <div className="w-full h-auto flex flex-col items-center justify-center space-y-10 px-20 py-10 relative sm:px-5 dakhila">
            <h1 className="px-16 text-3xl text-center font-semibold bg-blue-600 text-white rounded-lg py-2 animate-pulse">
                ভূমি উন্নয়ন দাখিলার আবেদন
            </h1>

            {loading && (
                <div className="absolute bottom-60 rounded-full bg-red-400 size-40 flex items-center justify-center">
                    <div className="container">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
            )}
            {message && (
                <p className="absolute bottom-60 bg-red-600 px-5 py-2 flex items-center justify-center text-white">
                    {message}
                </p>
            )}


            <div className="w-full h-auto grid grid-cols-2 grid-rows-1 gap-x-5">
                <div className="h-auto flex flex-col items-start justify-center p-4 bg-gray-300 space-y-3">
                    <input
                        type="text"
                        placeholder="ক্রমিক নং : "
                        className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                        value={topCrokimNmbr}
                        onChange={(e) => setTopCromikNmbr(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="সিটি কর্পোরেশন/পৌর/ ইউনিয়ন ভূমি অফিসের নাম:"
                        className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                        value={unionNum}
                        onChange={(e) => setUnionNum(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="মৌজার নাম ও জে. এল, নং:"
                        className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                        value={moujarNam}
                        onChange={(e) => setMoujarNum(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="উপজেলা/থানা:"
                        className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                        value={thana}
                        onChange={(e) => setThana(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="জেলা:"
                        className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:"
                        className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                        value={holdingNmbr}
                        onChange={(e) => setHoldingNmbr(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="খতিয়ান নং:"
                        className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                        value={khatianNmbr}
                        onChange={(e) => setKhatianNmbr(e.target.value)}
                    />

                    <p className="w-full text-center border-b border-gray-500 py-2 mt-5">
                        মালিকের বিবরণ
                    </p>

                    <div className="w-full flex items-center justify-center space-x-1">
                        <input
                            type="text"
                            placeholder="ক্রম: "
                            className="w-1/3 px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700"
                            value={ownerDetails.ownerCromik}
                            name="ownerCromik"
                            onChange={(e) => ownerHandleChange(e)}
                        />

                        <input
                            type="text"
                            placeholder="মালিকের নাম:"
                            className="w-1/3 px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700"
                            value={ownerDetails.ownerName}
                            name="ownerName"
                            onChange={(e) => ownerHandleChange(e)}
                        />

                        <input
                            type="text"
                            placeholder="মালিকের অংশ:"
                            className="w-1/3 px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700"
                            value={ownerDetails.ownerProperty}
                            name="ownerProperty"
                            onChange={(e) => ownerHandleChange(e)}
                        />
                    </div>

                    <div className="w-full flex items-center justify-center space-x-4">
                        <button
                            className={`px-5 py-2 text-sm ${!ownerDetails.ownerCromik || !ownerDetails.ownerName || !ownerDetails.ownerProperty ? ' bg-blue-300 pointer-events-none' : ' bg-blue-600 pointer-events-auto'} text-white rounded-md`}
                            onClick={addOwner}
                        >
                            ADD
                        </button>

                        <button
                            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-md"
                            onClick={() => deleteHandleChange(params.id, 'owner')}
                        >
                            DELETE
                        </button>
                    </div>

                    <p className="w-full text-center border-b border-gray-500 py-2 mt-5">
                        জমির বিবরণ
                    </p>

                    <div className="w-full flex items-center justify-center space-x-1">
                        <input
                            type="text"
                            placeholder="ক্রম: "
                            className="w-1/3 px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700"
                            value={landDetails.landCromik}
                            name="landCromik"
                            onChange={(e) => landHandleChange(e)}
                        />

                        <input
                            type="text"
                            placeholder="দাগ নং"
                            className="w-1/3 px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700"
                            value={landDetails.dagNum}
                            name="dagNum"
                            onChange={(e) => landHandleChange(e)}
                        />

                        <input
                            type="text"
                            placeholder="জমির শ্রেণি"
                            className="w-1/3 px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700"
                            value={landDetails.landClass}
                            name="landClass"
                            onChange={(e) => landHandleChange(e)}
                        />

                        <input
                            type="text"
                            placeholder="জমির পরিমাণ (শতাংশ)"
                            className="w-1/3 px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700"
                            value={landDetails.landSize}
                            name="landSize"
                            onChange={(e) => landHandleChange(e)}
                        />
                    </div>

                    <div className="w-full flex items-center justify-center space-x-4">
                        <button
                            className={`px-5 py-2 text-sm ${!landDetails.landCromik || !landDetails.dagNum || !landDetails.landClass || !landDetails.landSize ? ' bg-blue-300 pointer-events-none' : ' bg-blue-600 pointer-events-auto'} text-white rounded-md`}
                            onClick={addLand}
                        >
                            ADD
                        </button>

                        <button
                            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-md"
                            onClick={() => deleteHandleChange(params.id, 'land')}
                        >
                            DELETE
                        </button>
                    </div>

                    <input
                        type="text"
                        placeholder="সর্বমোট জমি (শতাংশ)"
                        className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                        value={totalLand}
                        onChange={(e) => setTotalLand(e.target.value)}
                    />

                    <div className="w-full flex flex-col space-y-2 items-center justify-center">
                        <div className="w-full flex space-x-1">
                            <input
                                type="text"
                                placeholder="তিন বৎসরের ঊর্ধ্বের বকেয়া"
                                className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                                value={loanPlus}
                                onChange={(e) => setLoanPlus(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="গত তিন বৎসরের বকেয়া"
                                className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                                value={loan}
                                onChange={(e) => setLoan(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="বকেয়ার জরিমানা ও ক্ষতিপূরণ"
                                className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                                value={loanFine}
                                onChange={(e) => setLoanFine(e.target.value)}
                            />
                        </div>
                        <div className="w-full flex space-x-1">
                            <input
                                type="text"
                                placeholder="হাল দাবি"
                                className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                                value={halDabi}
                                onChange={(e) => setHalDabi(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="মোট দাবি"
                                className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                                value={totalDabi}
                                onChange={(e) => setTotalDabi(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="মোট আদায়"
                                className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                                value={totalAdai}
                                onChange={(e) => setTotalAdai(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="মোট বকেয়া"
                                className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                                value={totalLoan}
                                onChange={(e) => setTotalLoan(e.target.value)}
                            />
                        </div>
                    </div>

                    <input
                        type="text"
                        placeholder="সর্বমোট (কথায়):"
                        className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="অর্থবছরঃ"
                        className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="চালান নংঃ"
                        className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                        value={calanNumber}
                        onChange={(e) => setCalanNumber(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="তারিখ বাংলাঃ"
                        className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                        value={banglaDate}
                        onChange={(e) => setBanglaDate(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="তারিখ ইংরেজিঃ"
                        className="w-full px-4 py-2 rounded-md outline-none border-2 border-blue-400 focus:border-blue-700 "
                        value={englishDate}
                        onChange={(e) => setEnglishDate(e.target.value)}
                    />
                </div>

                {
                    fetchData ? matchId.map((elem) => {
                        return (
                            <div className="h-auto bg-gray-400 flex flex-col gap-y-2 items-start justify-normal p-4" key={elem._id}>
                                <div className="w-full flex flex-col items-start justify-start gap-y-8 mt-4">
                                    <p>ক্রমিক নং: {topCrokimNmbr === '' ? elem.topCrokimNmbr : topCrokimNmbr}</p>
                                    <p>ইউনিয়ন ভূমি অফিসের নাম: {unionNum === '' ? elem.unionNum : unionNum}</p>
                                    <p>মৌজার নাম ও জে. এল. নং: {moujarNam === '' ? elem.moujarNam : moujarNam}</p>
                                    <p>উপজেলা/থানা: {thana === '' ? elem.thana : thana}</p>
                                    <p> জেলা: {district === '' ? elem.district : district}</p>
                                    <p>হোল্ডিং নম্বর: {holdingNmbr === '' ? elem.holdingNmbr : holdingNmbr}</p>
                                    <p>খতিয়ান নং: {khatianNmbr === '' ? elem.khatianNmbr : khatianNmbr}</p>
                                </div>
                                <div className="w-full flex flex-col items-start justify-center mt-4">
                                    <p className=" self-center border-b-[1.5px] border-b-black">
                                        মালিকের বিবরণ
                                    </p>
                                    <div className="w-full flex items-start justify-between mt-2 h-40 overflow-y-scroll border border-gray-300">
                                        <table className="w-full">
                                            <thead className="w-full bg-gray-800 text-white">
                                                <tr className="w-full grid grid-cols-3 items-center justify-center px-5">
                                                    <th className="text-start">ক্রমঃ</th>
                                                    <th className="text-center">মালিকের নাম:</th>
                                                    <th className="text-end">মালিকের অংশ</th>
                                                </tr>
                                            </thead>
                                            <tbody className="w-full">
                                                {elem.ownerData.map((elem, index) => {
                                                    return (
                                                        <tr
                                                            className="w-full grid grid-cols-3 items-center justify-center px-5"
                                                            key={index}
                                                        >
                                                            <td className="text-start cursor-pointer">{elem.ownerCromik}</td>
                                                            <td className="text-center cursor-pointer">{elem.ownerName}</td>
                                                            <td className="text-end cursor-pointer">{elem.ownerProperty}</td>
                                                        </tr>
                                                    );
                                                })}
                                                {ownerData.map((elem, index) => {
                                                    return (
                                                        <tr
                                                            className="w-full grid grid-cols-3 items-center justify-center px-5"
                                                            key={index}
                                                        >
                                                            <td className="text-start cursor-pointer">{elem.ownerCromik}</td>
                                                            <td className="text-center cursor-pointer">{elem.ownerName}</td>
                                                            <td className="text-end cursor-pointer">{elem.ownerProperty}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col items-start justify-center">
                                    <p className=" self-center border-b-[1.5px] border-b-black">
                                        জমির বিবরণ
                                    </p>
                                    <div className="w-full flex items-start justify-center mt-2 h-40 overflow-y-scroll border border-gray-300">
                                        <table className="w-full">
                                            <thead className="w-full bg-gray-800 text-white">
                                                <tr className="w-full grid grid-cols-4 items-center justify-center px-5">
                                                    <th className="text-start">ক্রমঃ</th>
                                                    <th className="text-start">দাগ নং:</th>
                                                    <th className="text-start">জমির শ্রেণি:</th>
                                                    <th className="text-end">জমির পরিমাণ:</th>
                                                </tr>
                                            </thead>
                                            <tbody className="w-full">
                                                {elem.landData.map((elem, index) => {
                                                    return (
                                                        <tr
                                                            className="w-full grid grid-cols-4 items-center justify-center px-5"
                                                            key={index}
                                                        >
                                                            <td className="text-start cursor-pointer">{elem.landCromik}</td>
                                                            <td className="text-start cursor-pointer">{elem.dagNum}</td>
                                                            <td className="text-start cursor-pointer">{elem.landClass}</td>
                                                            <td className="text-end cursor-pointer">{elem.landSize}</td>
                                                        </tr>
                                                    );
                                                })}
                                                {landData.map((elem, index) => {
                                                    return (
                                                        <tr
                                                            className="w-full grid grid-cols-4 items-center justify-center px-5"
                                                            key={index}
                                                        >
                                                            <td className="text-start cursor-pointer">{elem.landCromik}</td>
                                                            <td className="text-start cursor-pointer">{elem.dagNum}</td>
                                                            <td className="text-start cursor-pointer">{elem.landClass}</td>
                                                            <td className="text-end cursor-pointer">{elem.landSize}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <p>সর্বমোট জমি (শতাংশ): {totalLand === '' ? elem.totalLand : totalLand}</p>
                                <div className="w-full flex flex-col items-center justify-center mt-5 gap-y-3">
                                    <p className=" self-center border-b-[1.5px] border-b-black">
                                        আদায়ের বিবরণ
                                    </p>
                                    <div className="w-full flex items-center justify-between">
                                        <p>ঊর্ধ্বের বকেয়া: {loanPlus === '' ? elem.loanPlus : loanPlus}</p>
                                        <p>বকেয়া: {loan === '' ? elem.loan : loan}</p>
                                        <p>জরিমানা ও ক্ষতিপূরণ: {loanFine === '' ? elem.loanFine : loanFine}</p>
                                    </div>

                                    <div className="w-full flex items-center justify-between">
                                        <p>হাল দাবি: {halDabi === '' ? elem.halDabi : halDabi}</p>
                                        <p>মোট দাবি: {totalDabi === '' ? elem.totalDabi : totalDabi}</p>
                                        <p>মোট আদায়: {totalAdai === '' ? elem.totalAdai : totalAdai}</p>
                                        <p>মোট বকেয়া: {totalLoan === '' ? elem.totalLoan : totalLoan}</p>
                                    </div>
                                </div>
                                <p className="mt-5">সর্বমোট (কথায়): {totalAmount === '' ? elem.totalAmount : totalAmount}</p>
                                <p className="mt-5">
                                    নোট: সর্বশেষ কর পরিশোধের সাল - {year === '' ? elem.year : year} (অর্থবছর)
                                </p>
                                <p className="mt-5">চালান নং : {calanNumber === '' ? elem.calanNumber : calanNumber}</p>
                                <p className="mt-5">তারিখ বাংলাঃ {banglaDate === '' ? elem.banglaDate : banglaDate}</p>
                                <p className="mt-5">তারিখ ইংরেজিঃ : {englishDate === '' ? elem.englishDate : englishDate}</p>
                            </div>
                        )
                    }) : (
                        <div className="w-full h-60 flex items-center justify-center">
                            <img src="/loader/images.png" className=" animate-pulse" alt="" />
                        </div>
                    )
                }
            </div>

            <button
                className={`px-10 py-2 self-center rounded-md text-white text-lg bg-blue-600`}
                onClick={() => handleSUbmit(params.id)}
            >
                Update
            </button>
        </div>
    );
};

export default page;
