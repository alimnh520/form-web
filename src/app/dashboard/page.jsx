'use client'
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const logoutPage = async () => {
    try {
      const response = await fetch('/api/logout', {method: 'POST'});
      const data = await response.json();
      console.log(data);
      if (data.success) {
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-lime-300">
      <h1>This is Our dash board</h1>
      <button
        className="px-6 py-1 bg-red-600 text-lg font-semibold text-white"
        onClick={logoutPage}
      >
        Logout
      </button>
    </div>
  );
};

export default page;
