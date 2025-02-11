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
        const res = await fetch("/api/form-data", {
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
      const response = await fetch("/api/delete-form", {
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
    <div className="w-full h-screen px-20 flex flex-col items-center justify-center relative gap-y-5">
      <div
        className={`w-60 absolute bg-gray-500 border border-gray-700 ${
          deleteBtn ? "flex" : "hidden"
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
      <h1 className="w-80 text-3xl text-center font-semibold bg-blue-600 text-white rounded-lg py-2">
        ভূমি উন্নয়ন দাখিলা
      </h1>
      {loading && (
        <div className="absolute bottom-60 rounded-full bg-red-400 size-40 flex items-center justify-center z-10">
          <div className="container">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-between space-y-5">
        {userData ? (
          userData.map((elem) => {
            return (
              <div
                className="w-80 flex items-center justify-between relative"
                key={elem._id}
              >
                <p className="flex items-center justify-center h-full border border-gray-500 rounded-lg w-28 py-1">
                  {elem.khatianNmbr}
                </p>
                <div className="flex items-center justify-center gap-x-5">
                  <Link
                    href={`/dakhila-print/${elem._id}`}
                    className="px-5 py-1 bg-blue-600 text-lg rounded-lg font-semibold text-white text-center"
                  >
                    See
                  </Link>
                  <button
                    className="px-5 py-1 bg-red-600 text-lg rounded-lg font-semibold text-white"
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
