import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/pengguna/Navbar'

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default DashboardLayout