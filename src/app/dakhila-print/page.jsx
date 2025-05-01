"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [isDelete, setIsDelate] = useState(false);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const userData = async () => {
      try {
        const res = await fetch("/api/user/get-data/form-data", {
          method: "GET",
        });
        const data = await res.json();
        if (data.success) {
          setUserData(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, []);

  const deleteData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/del-data/delete-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const result = await response.json();
      if (result.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen px-20 flex flex-col items-center justify-center relative gap-y-5 sm:h-auto sm:px-2 sm:mt-20 bg-white">
      <div
        className={`w-60 absolute bg-gray-500 border border-gray-700 ${deleteBtn ? "flex" : "hidden"
          } flex-col items-center justify-center gap-y-5 z-10 py-5 rounded-md`}
      >
        <p>Are you sure to delete</p>
        <div className="flex items-center justify-center gap-x-4">
          <button
            className="px-6 py-1 bg-red-600 text-lg font-semibold text-white"
            onClick={() => {
              deleteData();
              setDeleteBtn(false);
            }}
          >
            Yes
          </button>
          <button
            className="px-6 py-1 bg-red-600 text-lg font-semibold text-white"
            onClick={() => setDeleteBtn(false)}
          >
            No
          </button>
        </div>
      </div>
      <h1 className="w-[415px] text-3xl sm:text-2xl text-center font-semibold bg-blue-600 text-white rounded-lg py-2 mt-5 animate-pulse sm:w-80">
        ভূমি উন্নয়ন দাখিলা
      </h1>
      {loading && (
        <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30 bg-white">
          <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
        </div>)}
      <div className="flex flex-col items-center justify-between space-y-5 h-screen w-full overflow-y-scroll">
        {userData ? (
          userData.map((elem) => {
            return (
              <div
                className="w-[415px] flex items-center justify-between relative sm:w-80 sm:gap-x-2 sm:justify-center"
                key={elem._id}
              >
                <p className="flex items-center justify-center h-full border border-gray-500 rounded-lg w-28 py-1 sm:w-24">
                  {elem.khatianNmbr}
                </p>
                <div className="flex items-center justify-center gap-x-5 sm:gap-x-2">
                  <Link
                    href={`/dakhila-print/${elem._id}`}
                    className="px-5 py-1 bg-blue-600 text-lg rounded-lg font-semibold text-white text-center sm:px-3"
                  >
                    See
                  </Link>
                  <Link
                    href={`/dakhila-print/edit/${elem._id}`}
                    className="px-5 py-1 bg-blue-600 text-lg rounded-lg font-semibold text-white text-center sm:px-3"
                  >
                    Edit
                  </Link>
                  <button
                    className="px-5 py-1 bg-red-600 text-lg rounded-lg font-semibold text-white sm:px-3"
                    onClick={() => {
                      setDeleteBtn(true);
                      setUserId(elem._id);
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full h-60 flex items-center justify-center">
            <img src="/loader/images.png" className=" animate-pulse" alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
