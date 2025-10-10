import { Outlet } from 'react-router-dom'
import Navbar from '../../components/pengguna/Navbar'
import { useSocket } from '@/sockets/useSockets';

const DashboardLayout = () => {

  // SOCKET NOTIFIKASI
  useSocket()
 
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default DashboardLayout