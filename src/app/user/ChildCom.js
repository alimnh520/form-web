'use client'
import React, { createContext, useEffect, useState } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { usePathname } from 'next/navigation'

export const UserProvider = createContext();

const ChildCom = ({ children }) => {
    const [user, setUser] = useState('');
    const [admin, setAdmin] = useState('');
    const pathName = usePathname();
    const routePath = /^\/dakhila-print\/\w+$/i.test(pathName) || /^\/user\/\w+$/i.test(pathName);
    const hiddenPath = ['/office'];
    const setHiddenPath = hiddenPath.includes(pathName);
    const nidPath = pathName.startsWith('/dashboard/pages');

    useEffect(() => {
        async function userData(params) {
            try {
                const res = await fetch('/api/user/userdata', { method: 'GET' });
                const data = await res.json();
                if (data.success) {
                    setUser(data.message);
                } else setUser('');
            } catch (error) {
                console.log(error);
            }
        }
        userData();

        async function adminData(params) {
            try {
                const res = await fetch('/api/admin/admin-data', { method: 'GET' });
                const data = await res.json();
                if (data.success) {
                    setAdmin(data.message);
                } else setAdmin('');
            } catch (error) {
                console.log(error);
            }
        }
        adminData();
    }, []);

    return (
        <UserProvider className='w-full h-auto scroll-smooth' value={{user, admin}} >
            {(!routePath && !setHiddenPath && !nidPath) && <Header />}
            <div className='mt-16'>{children}</div>
            {(!routePath && !setHiddenPath && !nidPath) && <Footer />}
        </UserProvider>
    )
}

export default ChildCom