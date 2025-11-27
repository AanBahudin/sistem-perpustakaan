import { Outlet } from 'react-router-dom'
import Navbar from '../../components/pengguna/Navbar'
import { useSocket } from '@/sockets/useSockets';
import useGetAllBukuPenggunaDisimpan from '@/hooks/fetchHooks/penggunaHooks/simpanHooks/useGetAllBukuPenggunaDisimpan';
import useGetAllBukuPenggunaDisuka from '@/hooks/fetchHooks/penggunaHooks/sukaHooks/useGetAllBukuPenggunaDisuka';
import useFetchProfilPengguna from '@/hooks/fetchHooks/penggunaHooks/profil/useFetchProfilPengguna';

const DashboardLayout = () => {

  // SOCKET NOTIFIKASI
  useSocket()

  // LOAD DATA YANG SELALU DIGUNAKAN DI SELURUH APLIKASI
  useGetAllBukuPenggunaDisimpan()
  useGetAllBukuPenggunaDisuka()
  useFetchProfilPengguna()
 
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default DashboardLayout