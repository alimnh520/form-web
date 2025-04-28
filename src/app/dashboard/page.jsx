"use client";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ServicesTax from "./ServicesTax";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { UserProvider } from "../ChildCom";

const page = () => {
  const [name, setName] = useState(false);
  const [newName, setNewName] = useState('');
  const [image, setImage] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [displayImage, setDisplayImage] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState(false);

  const [isUddokta, setUddokta] = useState(false);
  const [prosason, setProsason] = useState(false);
  const [dcrPayment, setDcrPayment] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [dcrData, setDcrData] = useState('');
  const [uddoktaData, setUddoktaData] = useState('');
  const [deleteUddokta, setDeleteUddokta] = useState(false);

  const { admin } = useContext(UserProvider);

  if (message) {
    setTimeout(() => {
      setMessage('');
    }, 1500);
  }

  useEffect(() => {
    async function userLogin() {
      try {
        const res = await fetch('/api/admin/login-user', { method: "GET" });
        const data = await res.json();
        setLoginUser(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    userLogin();

    async function handleDcrData() {
      try {
        const res = await fetch('/api/user/submit-data/dcr-payment', { method: 'GET' });
        const data = await res.json();
        setDcrData(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    handleDcrData();
    async function handleUddokta() {
      try {
        const res = await fetch('/api/user/uddokta', { method: 'GET' });
        const data = await res.json();
        setUddoktaData(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    handleUddokta();
  }, []);

  const userDelete = async (userId) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/user-delete', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      setLoading(false);
      setMessage(data.message);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDcrStatus = async (id, type) => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/submit-data/dcr-accept', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type })
      });
      const data = await res.json();
      setLoading(false);
      setMessage(data.message);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAcceptUddokta = async (id, type) => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/uddokta', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type })
      });
      const data = await res.json();
      setLoading(false);
      setMessage(data.message);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [uddoktaId, setUddoktaId] = useState('');
  const handleDeleteUddokta = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/del-uddokta', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: uddoktaId })
      });
      const data = await res.json();
      setLoading(false);
      setMessage(data.message);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }


  const logoutPage = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/admin-logout", { method: "POST" });
      const data = await response.json();
      if (data.success) {
        setLoading(false);
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameEdit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/edit-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: admin.username, newName })
      });
      setLoading(false);
      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditPhoto = async () => {
    if (newImage) {
      if ((newImage.size / 1048576) > 3) {
        setMessage('File size is too large');
        return
      }
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', admin.username);
      formData.append('newImage', newImage);
      formData.append('public_url', admin.public_url);
      const res = await fetch('/api/admin/edit-photo', {
        method: 'POST',
        body: formData
      });
      setLoading(false);
      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="w-full h-auto flex flex-col items-center justify-start bg-green-100 relative">

      <div className="w-full h-12 bg-red-400 flex items-center justify-between">

      </div>

      <div className="h-full w-full flex items-center justify-between gap-x-5 sm:items-start sm:relative">

        <div className="hidden sm:block absolute left-2 top-[16px] text-green-700 text-3xl cursor-pointer z-10" onClick={() => setProfile(true)}>
          <FaUserCircle />
        </div>

        <div className={`w-1/4 h-screen flex items-center justify-start sm:absolute sm:z-10 transition-all duration-300 ${profile ? 'sm:left-0' : 'sm:-left-full'} sm:w-full`}>

          {
            loading && (
              <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30 bg-white">
                <img src="/loader/images.png" className="h-20 animate-pulse" alt="" />
              </div>
            )
          }
          {
            message && (
              <p className="w-80 px-4 py-1.5 bg-[rgba(239,68,68,0.5)] text-white z-30 text-center flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                {message}
              </p>

            )
          }

          <div className="bg-white border-r-2 w-full flex flex-col items-center p-5 gap-y-5 h-full shadow-[4px_0px_8px_rgba(0,0,0,0.5)]">

            {/* set new image */}

            <div className="size-40 rounded-full self-center relative">
              <button className="absolute bottom-2 right-2 text-xl text-white bg-red-700 rounded-full p-2" onClick={() => setImage(!image)}>
                <FaEdit />
              </button>

              {
                displayImage ? (
                  <img src={displayImage} alt="" className="w-full h-full object-cover object-center rounded-full" />
                ) : (
                  <img src={admin.image_url ? admin.image_url : '/user/user-icon-on-transparent-background-free-png.webp'} alt="" className="w-full h-full object-cover object-center rounded-full" />
                )
              }
            </div>
            {
              image && (
                <div className="flex items-center justify-center gap-x-3">
                  <input type="file" className="outline-none border border-gray-400 px-4 py-1 w-52 rounded-xl" onChange={(e) => {
                    setNewImage(e.target.files[0]);
                    setDisplayImage(URL.createObjectURL(e.target.files[0]));
                  }} />
                  <button className="px-5 py-1.5 text-white bg-green-700 border border-green-700" onClick={handleEditPhoto}>set</button>
                </div>
              )
            }

            {/* set new name */}

            <div className="flex items-center justify-center gap-x-2">
              <p className="text-2xl font-semibold">{admin ? admin.username : 'loading...'}</p>
              <button className="text-lg text-white bg-red-700 rounded-full p-1.5" onClick={() => setName(!name)}>
                <FaEdit />
              </button>
            </div>
            {
              name && (
                <div className="flex items-center justify-center">
                  <input type="text" className="outline-none border border-gray-400 px-4 py-1.5" value={newName} onChange={(e) => setNewName(e.target.value)} />
                  <button className="px-5 py-1.5 text-white bg-green-700 border border-green-700" onClick={handleNameEdit}>set</button>
                </div>
              )
            }

            {/* options */}

            <div className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative" onClick={() => {
              setUddokta(!isUddokta);
              setDcrPayment(false);
              setProsason(false);
            }}>
              <p className="text-xl sm:text-xl font-semibold mt-2">উদ্যোক্তা</p>
              <span className={`absolute right-5 ${isUddokta ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span>
            </div>

            <div className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative" onClick={() => {
              setUddokta(false);
              setDcrPayment(false);
              setProsason(!prosason);
            }}>
              <p className="text-xl sm:text-xl font-semibold mt-2">প্রশাসনিক</p>
              <span className={`absolute right-5 ${prosason ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span>
            </div>

            <div className="w-10/12 h-12 rounded-md animate-pulse border border-[#59b8a0] bg-[#59b8a0] flex items-center justify-center cursor-pointer relative" onClick={() => {
              setUddokta(false);
              setProsason(false);
              setDcrPayment(!dcrPayment);
            }}>
              <p className="text-xl sm:text-xl font-semibold mt-2">ডি,সি,আর পেমেন্ট</p>
              <span className={`absolute right-5 ${prosason ? 'rotate-180' : 'rotate-0'} mt-1 transition-all duration-300`}><IoIosArrowDown /></span>
            </div>
          </div>


          <div className="hidden sm:block absolute right-2 z-10 opacity-100 top-2 text-3xl cursor-pointer" onClick={() => setProfile(false)}>
            <IoClose />
          </div>
        </div>

        <div className="w-3/4 h-screen p-4 flex flex-col items-center justify-start gap-y-4 sm:w-full sm:h-auto relative">

          {
            isUddokta && (
              <div className="w-full h-full sm:w-80 sm:h-auto left-0 top-1/2 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1/2  bg-white border border-red-400 rounded absolute z-20 flex flex-col p-5 items-center">
                <div className="absolute right-2 z-10 opacity-100 top-2 text-3xl cursor-pointer" onClick={() => setUddokta(false)}>
                  <IoClose />
                </div>

                {
                  deleteUddokta && (
                    <div className="w-60 h-28 bg-gray-500 border border-blue-600 rounded-md absolute z-20 flex items-center justify-center gap-x-5 top-1/2 -translate-y-1/2">
                      <button className="px-5 py-1 bg-red-600 text-lg rounded-lg font-semibold text-white" onClick={() => {
                        handleDeleteUddokta();
                        setDeleteUddokta(false);
                      }}>
                        delete
                      </button>
                      <button className="px-5 py-1 bg-blue-600 text-lg rounded-lg font-semibold text-white" onClick={() => setDeleteUddokta(false)}>
                        cancel
                      </button>
                    </div>
                  )
                }

                <div className="w-full h-auto flex flex-col items-center gap-y-5 sm:overflow-x-scroll sm:items-start">
                  <h1 className="text-xl font-bold self-center">উদ্যোক্তা একাউন্ট</h1>
                  <div className="w-full gap-x-1 grid grid-cols-6 bg-green-600 text-white font-bold">
                    <p className="text-center border-r border-l border-b py-3">ক্রঃ</p>
                    <p className="text-center border-r py-3">ইউজার নেম</p>
                    <p className="text-center border-r py-3">ইমেইল</p>
                    <p className="text-center border-r py-3">মোবাইল</p>
                    <p className="text-center border-r py-3">স্টাটাস</p>
                    <p className="text-center border-r py-3">ঠিকানা</p>
                  </div>
                </div>
                {
                  uddoktaData ? (
                    uddoktaData.slice().reverse().map((elem, index) => {
                      return (
                        <div className="w-full flex flex-col relative" key={elem._id}>
                          <div className="w-full grid grid-cols-6">
                            <p className="text-center border-r overflow-x-scroll border-l border-b py-3">{index + 1}</p>
                            <p className="text-center border-r overflow-x-scroll border-b py-3">{elem.username}</p>
                            <p className="text-center border-r overflow-x-scroll border-b py-3">{elem.email}</p>
                            <p className="text-center border-r overflow-x-scroll border-b py-3">{elem.mobile}</p>
                            {
                              elem.status !== 'pending' && (
                                <div className={`text-center border-r border-b grid grid-cols-2 gap-x-px ${elem.status === 'accept' ? 'text-green-700' : 'text-red-600'}`}>
                                  <p className="py-3">{elem.status}</p>
                                  <button className="bg-red-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                    setDeleteUddokta(true);
                                    setUddoktaId(elem._id);
                                  }}><MdDeleteForever /></button>
                                </div>
                              )
                            }
                            {
                              elem.status === 'pending' && (
                                <div className="text-center border-r border-b grid grid-cols-2 gap-x-px">
                                  <button className="bg-green-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                    handleAcceptUddokta(elem._id, 'accept');
                                  }}><IoCheckmarkSharp /></button>
                                  <button className="bg-red-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                    handleAcceptUddokta(elem._id, 'cancel');
                                  }}><RxCross2 /></button>
                                </div>
                              )
                            }
                            <p className="text-center border-r overflow-x-scroll border-b py-3">{elem.address}</p>
                          </div>
                        </div>
                      )
                    }
                    )) : (
                    <p>Loading...</p>
                  )
                }
              </div>
            )
          }

          {
            dcrPayment && (
              <div className="w-full h-full sm:w-80 sm:h-auto left-0 top-1/2 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1/2  bg-white border border-red-400 rounded absolute z-20 flex flex-col p-5 items-center">
                <div className="absolute right-2 z-10 opacity-100 top-2 text-3xl cursor-pointer" onClick={() => setDcrPayment(false)}>
                  <IoClose />
                </div>
                <div className="w-full h-auto flex flex-col items-center gap-y-5 sm:overflow-x-scroll sm:items-start">
                  <h1 className="text-xl font-bold self-center">ডি,সি,আর পেমেন্ট</h1>
                  <div className="w-full h-auto flex flex-col sm:w-[1200px]">
                    <div className="w-full gap-x-1 grid grid-cols-7 bg-green-600 text-white font-bold">
                      <p className="text-center border-r border-l border-b py-3">ক্রঃ</p>
                      <p className="text-center border-r py-3">নাম</p>
                      <p className="text-center border-r py-3">বিভাগ</p>
                      <p className="text-center border-r py-3">ডি,সি,আর পেমেন্ট</p>
                      <p className="text-center border-r py-3">তথ্যের ধরণ</p>
                      <p className="text-center border-r py-3">স্টাটাস</p>
                      <p className="text-center border-r py-3">অ্যাকশন</p>
                    </div>
                    {
                      dcrData ? (
                        dcrData.slice().reverse().map((elem, index) => {
                          return (
                            <div className="w-full flex flex-col" key={elem._id}>
                              <div className="w-full grid grid-cols-7">
                                <p className="text-center border-r border-l border-b py-3">{index + 1}</p>
                                <p className="text-center border-r border-b py-3">{elem.username}</p>
                                <p className="text-center border-r border-b py-3">{elem.divisionName}</p>
                                <p className="text-center border-r border-b py-3">{elem.dcrPayment}</p>
                                <p className="text-center border-r border-b py-3">ডি,সি,আর পেমেন্ট</p>
                                {
                                  elem.status !== 'pending' && (
                                    <p className={`text-center border-r border-b ${elem.status === 'complete' ? 'text-green-700' : 'text-red-600'} py-3`}>{elem.status}</p>
                                  )
                                }
                                {
                                  elem.status === 'pending' && (
                                    <div className="text-center border-r border-b grid grid-cols-2 gap-x-px">
                                      <button className="bg-green-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                        handleDcrStatus(elem._id, 'accept');
                                      }}><IoCheckmarkSharp /></button>
                                      <button className="bg-red-700 flex items-center justify-center text-white text-2xl h-full font-semibold" onClick={() => {
                                        handleDcrStatus(elem._id, 'cancel');
                                      }}><RxCross2 /></button>
                                    </div>
                                  )
                                }
                                <div className="text-center border-r border-b py-3 relative group">
                                  <div className="absolute w-full h-20 bg-red-600 top-12 hidden group-hover:grid grid-cols-1 grid-rows-3">

                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      ) : <p>Loading...</p>
                    }
                  </div>
                </div>
              </div>
            )
          }

          {
            prosason &&
            (
              <div className="w-full h-full sm:w-80 sm:h-auto left-0 top-1/2 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1/2  bg-white border border-red-400 rounded absolute z-20 flex flex-col p-5 items-center">
                <div className="absolute right-2 z-10 opacity-100 top-2 text-3xl cursor-pointer" onClick={() => setProsason(false)}>
                  <IoClose />
                </div>

                <p className="w-10/12 border-b text-center pb-1.5 border-b-gray-300 text-xl font-semibold">প্রশাসনিক তথ্য</p>
                <div className="w-full grid grid-cols-2 text-lg font-semibold mt-3 border-b border-b-gray-300">
                  <p>Username</p>
                  <p>Password</p>
                </div>
                {
                  loginUser && (
                    loginUser.length === 0 && (
                      <div className="w-full grid grid-cols-2 border-b border-b-gray-300">
                        <p className="py-0.5">No Data</p>
                        <p className="py-0.5">No Data</p>
                      </div>
                    )
                  )
                }
                {
                  loginUser ? (
                    loginUser.slice().reverse().map((elem) => {
                      return (
                        <div className="w-full grid grid-cols-2 gap-x-2 border-b border-b-gray-300 relative" key={elem._id}>
                          <button className="absolute right-1 top-1/2 -translate-y-1/2 text-lg" onClick={() => userDelete(elem._id)}><MdDeleteForever /></button>
                          <p className="py-1 overflow-x-scroll">{elem.username}</p>
                          <p className="py-1 overflow-x-scroll">{elem.password}</p>
                        </div>
                      )
                    })
                  ) : (<p>Loading</p>)
                }
              </div>
            )
          }

          <h1 className="text-4xl sm:text-2xl font-thin">অনলাইন সংক্রান্ত সেবা</h1>
          <div className="w-full h-2/3 grid grid-cols-4 grid-rows-2 gap-3 sm:grid-cols-2 sm:grid-rows-3">
            <ServicesTax url="/dashboard/online-service/land-record" clr="#59b8a0" img="/logos/1732162861.webp" tax="মিউটেশন" />
            <ServicesTax url="/dashboard/online-service/land-tax" clr="#fcb227" img="/logos/1732789801.webp" tax="ভূমি উন্নয়ন কর" />
            <ServicesTax url="/dashboard/online-service/mutation" clr="#9cbf3d" img="/logos/1732941934.webp" tax="ভূমি রেকর্ড ও ম্যাপ" />
            <ServicesTax url="hello" clr="#4072b7" img="img1" tax="জন্মনিবন্ধন সেবা" />
            <ServicesTax url="hello" clr="#007d4d" img="img2" tax="NID সংক্রান্ত সেবা" />
            <ServicesTax url="hello" clr="#365e3c" img="img3" tax="পাসপোর্ট সংক্রান্ত সেবা" />
          </div>
          <div className="flex flex-col items-center justify-start mt-4 gap-y-5">
            <h1 className="text-4xl font-thin sm:text-2xl">ভূমি উন্নয়ন দাখিলার আবেদন</h1>
            <div className="flex items-center justify-center gap-x-6">
              <Link href="/components/fill-form" className="px-6 py-1 bg-blue-600 text-lg font-semibold text-white">দাখিলা ফর্ম</Link>

              <Link href="/dakhila-print" className="px-6 py-1 bg-blue-600 text-lg font-semibold text-white">দাখিলা প্রিন্ট</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
