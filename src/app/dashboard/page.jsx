"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const logoutPage = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-lime-50 relative gap-y-5">
      <h1>This is Our dash board</h1>
      {loading && (
        <div className="flex items-center justify-center absolute">
          <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
        </div>
      )}
      <button
        className="px-6 py-1 bg-red-600 text-lg font-semibold text-white"
        onClick={logoutPage}
      >
        Logout
      </button>
      <Link href="/components/fill-form" className="px-6 py-1 bg-blue-600 text-lg font-semibold text-white">Go to form page</Link>

      <Link href="/dakhila-print" className="px-6 py-1 bg-blue-600 text-lg font-semibold text-white">Go to Dakhila print</Link>
    </div>
  );
};

export default page;
