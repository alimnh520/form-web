"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
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
  const deleteData = async (userId) => {
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
      <h1 className="text-3xl text-center font-semibold w-full border-b border-gray-500 border-dotted px-20">
        See User Data
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
      <div className="flex flex-col items-center justify-center space-y-5">
        {userData ? (
          userData.map((elem) => {
            return (
              <div
                className="grid grid-cols-3 grid-rows-1 border border-gray-500 items-center justify-center"
                key={elem._id}
              >
                <p className="flex items-center justify-center h-full border-r border-r-white">
                  {" "}
                  {elem.topCrokimNmbr}
                </p>
                <Link
                  href={`/dakhila-print/${elem._id}`}
                  className="px-5 py-1 bg-blue-600 text-lg font-semibold text-white border-r border-r-gray-500"
                >
                  See
                </Link>
                <button
                  onClick={() => deleteData(elem._id)}
                  className="px-5 py-1 bg-red-600 text-lg font-semibold text-white"
                >
                  delete
                </button>
              </div>
            );
          })
        ) : (
          <div className="bottom-60 rounded-full flex flex-col items-center justify-center">
            <div className="container">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
