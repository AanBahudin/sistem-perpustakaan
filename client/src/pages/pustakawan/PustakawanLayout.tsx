import Container from '@/globals/Container'
import PustakawanNavbar from '@/components/Pustakawan/Navbar/PustakawanNavbar'
import PustakawanSidebar from '@/components/Pustakawan/Sidebar/PustakawanSidebar'
import { Outlet } from 'react-router-dom'
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

const DashboardLayout = () => {

  const SOCKET_SERVER_URL = "http://localhost:4000";
  const socketRef = useRef<Socket | null>(null);


  useEffect(() => {
    // Inisialisasi socket hanya sekali
    socketRef.current = io(SOCKET_SERVER_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'] // typo 'pooling' diperbaiki
    });
    // Contoh listen event custom dari server
    socketRef.current.on('PENGGUNA_MENGAJUKAN_PEMINJAMAN', (data) => {
      const {tipe, data: dataPeminjaman, title, deskripsi} = data

      const detailURL = `/pustakawan/pengajuan/${tipe.toLowerCase()}/${dataPeminjaman._id}`

      toast(title, {
        description: deskripsi,
        action: {
          label: "Lihat",
          onClick: () =>
            (window.location.href = detailURL),
        }
      })
    });
    socketRef.current.on('connect', () => {
      console.log('Socket connected with id:', socketRef.current?.id);
    });
    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected:');
    });
    // Cleanup saat komponen unmount
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);


  return (
    <Container className='w-full h-[100vh] flex items-start'>
      {/* sidebar */}
      <PustakawanSidebar />
      
      <section className='flex-1 max-h-[100vh] flex flex-col'>
        <PustakawanNavbar />
        <section className='w-full min-h-[88vh] relative overflow-y-auto scroll-custom p-10'>
          <Outlet />
        </section>
      </section>
    </Container>
  )
}

export default DashboardLayout