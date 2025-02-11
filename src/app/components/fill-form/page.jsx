"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [topCrokimNmbr, setTopCromikNmbr] = useState("");
  const [moujarNam, setMoujarNum] = useState("");
  const [unionNum, setUnionNum] = useState("");
  const [thana, setThana] = useState("");
  const [district, setDistrict] = useState("");
  const [holdingNmbr, setHoldingNmbr] = useState("");
  const [khatianNmbr, setKhatianNmbr] = useState("");

  const [ownerData, setOwnerData] = useState([]);
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
  const deleteOwner = () => {
    setOwnerData(ownerData.slice(0, ownerData.length - 1));
  };
  const [landData, setLandData] = useState([]);
  const [landDetails, setLandDetails] = useState({
    landCromik: "",
    dagNum: "",
    landClass: "",
    landSize: "",
  });
  const landHandleChange = (val) => {
    setLandDetails({ ...landDetails, [val.target.name]: val.target.value });
  };
  const addLand = () => {
    setLandData([...landData, landDetails]);
    setLandDetails({
      landCromik: "",
      dagNum: "",
      landClass: "",
      landSize: "",
    });
  };
  const deleteLand = () => {
    setLandData(landData.slice(0, landData.length - 1));
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

  const handleSUbmit = async (e) => {
    setLoading(true);
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topCrokimNmbr,
          moujarNam,
          unionNum,
          thana,
          district,
          holdingNmbr,
          khatianNmbr,
          ownerData,
          landData,
          totalLand,
          loanPlus,
          loan,
          loanFine,
          halDabi,
          totalDabi,
          totalAdai,
          totalLoan,
          totalAmount,
          calanNumber,
          year,
          banglaDate,
          englishDate,
        }),
      });
      const data = await response.json();
      if (data.message == "form submit successful") {
        setLoading(false);
        setMessage('আবেদন সফল ভাবে জমা হয়েছে!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (topCrokimNmbr.length > 0 &&
      moujarNam.length > 0 &&
      unionNum.length > 0 &&
      thana.length > 0 &&
      district.length > 0 &&
      holdingNmbr.length > 0 &&
      khatianNmbr.length > 0 &&
      ownerData.length > 0 &&
      landData.length > 0 &&
      totalLand.length > 0 &&
      loanPlus.length > 0 &&
      loan.length > 0 &&
      loanFine.length > 0 &&
      halDabi.length > 0 &&
      totalDabi.length > 0 &&
      totalAdai.length > 0 &&
      totalAmount.length > 0 &&
      calanNumber.length > 0 &&
      year.length > 0 &&
      banglaDate.length > 0 &&
      englishDate.length > 0) {
      setIsOk(true);
    } else {
      setIsOk(false);
    }
  }, [topCrokimNmbr, moujarNam, unionNum, thana, district, holdingNmbr, khatianNmbr, ownerData, landData, totalLand, loanPlus, loan, loanFine, halDabi, totalDabi, totalAdai, totalLoan, totalAmount, calanNumber, year, banglaDate, englishDate,]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center space-y-10 px-20 py-10 relative">
      <h1 className="text-2xl w-full text-center border-b-2 border-b-gray-500 border-dotted font-semibold">
        Fill the form
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
              className="px-5 py-2 text-sm bg-blue-600 text-white rounded-md"
              onClick={addOwner}
            >
              ADD
            </button>

            <button
              className="px-5 py-2 text-sm bg-blue-600 text-white rounded-md"
              onClick={deleteOwner}
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
              className="px-5 py-2 text-sm bg-blue-600 text-white rounded-md"
              onClick={addLand}
            >
              ADD
            </button>

            <button
              className="px-5 py-2 text-sm bg-blue-600 text-white rounded-md"
              onClick={deleteLand}
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

        <div className="h-auto bg-gray-400 flex flex-col gap-y-2 items-start justify-normal p-4">
          <div className="w-full flex flex-col items-start justify-start gap-y-8 mt-4">
            <p>ক্রমিক নং: {topCrokimNmbr}</p>
            <p>ইউনিয়ন ভূমি অফিসের নাম: {unionNum}</p>
            <p>মৌজার নাম ও জে. এল. নং: {moujarNam}</p>
            <p>উপজেলা/থানা: {thana}</p>
            <p> জেলা: {district}</p>
            <p>হোল্ডিং নম্বর: {holdingNmbr}</p>
            <p>খতিয়ান নং: {khatianNmbr}</p>
          </div>
          <div className="w-full flex flex-col items-start justify-center mt-4">
            <p className=" self-center border-b-[1.5px] border-b-black">
              মালিকের বিবরণ
            </p>
            <div className="w-full flex items-center justify-between mt-2">
              <table className="w-full">
                <thead className="w-full">
                  <tr className="w-full flex items-center justify-between">
                    <th>ক্রমঃ</th>
                    <th>মালিকের নাম:</th>
                    <th>মালিকের অংশ</th>
                  </tr>
                </thead>
                <tbody className="w-full ">
                  {ownerData.map((elem, index) => {
                    return (
                      <tr
                        className="w-full flex items-center justify-between"
                        key={index}
                      >
                        <td>{elem.ownerCromik}</td>
                        <td>{elem.ownerName}</td>
                        <td>{elem.ownerProperty}</td>
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
            <div className="w-full flex items-center justify-between mt-2">
              <table className="w-full">
                <thead className="w-full">
                  <tr className="w-full flex items-center justify-between">
                    <th>ক্রমঃ</th>
                    <th>দাগ নং:</th>
                    <th>জমির শ্রেণি:</th>
                    <th>জমির পরিমাণ:</th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {landData.map((elem, index) => {
                    return (
                      <tr
                        className="w-full flex items-center justify-between"
                        key={index}
                      >
                        <td>{elem.landCromik}</td>
                        <td>{elem.dagNum}</td>
                        <td>{elem.landClass}</td>
                        <td>{elem.landSize}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p>সর্বমোট জমি (শতাংশ): {totalLand}</p>
          <div className="w-full flex flex-col items-center justify-center mt-5 gap-y-3">
            <p className=" self-center border-b-[1.5px] border-b-black">
              আদায়ের বিবরণ
            </p>
            <div className="w-full flex items-center justify-between">
              <p>ঊর্ধ্বের বকেয়া: {loanPlus}</p>
              <p>বকেয়া: {loan}</p>
              <p>জরিমানা ও ক্ষতিপূরণ: {loanFine}</p>
            </div>

            <div className="w-full flex items-center justify-between">
              <p>হাল দাবি: {halDabi}</p>
              <p>মোট দাবি: {totalDabi}</p>
              <p>মোট আদায়: {totalAdai}</p>
              <p>মোট বকেয়া: {totalLoan}</p>
            </div>
          </div>
          <p className="mt-5">সর্বমোট (কথায়): {totalAmount}</p>
          <p className="mt-5">
            নোট: সর্বশেষ কর পরিশোধের সাল - {year} (অর্থবছর)
          </p>
          <p className="mt-5">চালান নং : {calanNumber}</p>
          <p className="mt-5">তারিখ বাংলাঃ {banglaDate}</p>
          <p className="mt-5">তারিখ ইংরেজিঃ : {englishDate}</p>
        </div>
      </div>

      <button
        className={`px-10 py-2 self-center rounded-md text-white text-lg ${isOk ? 'pointer-events-auto bg-blue-600' : 'pointer-events-none bg-blue-300'}`}
        onClick={handleSUbmit}
      >
        Submit
      </button>
    </div>
  );
};

export default page;
