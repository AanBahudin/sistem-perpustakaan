import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/landing/Navbar/Navbar'

const LandingLayout = () => {
  return (
    <div className='w-full h-[100%] flex flex-col'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default LandingLayout