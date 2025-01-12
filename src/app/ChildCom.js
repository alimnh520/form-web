import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'

const ChildCom = ({children}) => {
    return (
        <div className=' bg-[url("/bg/6600674_3334896.jpg")] bg-cover bg-center bg-fixed scroll-smooth'>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}

export default ChildCom