import { Outlet } from 'react-router-dom'
import Navbar from '../../components/pengguna/Navbar'
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';


const DashboardLayout = () => {

  const SOCKET_SERVER_URL = "http://localhost:4000";
  const socketRef = useRef<Socket | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {

    // Siapkan audio sekali
    audioRef.current = new Audio("/sound/notification.wav");
      
    // Inisialisasi socket hanya sekali
    socketRef.current = io(SOCKET_SERVER_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'] // typo 'pooling' diperbaiki
    });

    socketRef.current.on('PEMINJAMAN_DITOLAK', (data) => {
      const {tipe, data: dataPeminjaman, title, deskripsi} = data

      const detailURL = `/my/${tipe.toLowerCase()}/${dataPeminjaman._id}/${dataPeminjaman.buku}`

      toast(title, {
        description: deskripsi,
        action: {
          label: "Lihat",
          onClick: () =>
            (window.location.href = detailURL),
        }
      })
    });

    socketRef.current.on('PEMINJAMAN_DITERIMA', (data) => {
      const {tipe, data: dataPeminjaman, title, deskripsi} = data

      const detailURL = `/my/${tipe.toLowerCase()}/${dataPeminjaman._id}/${dataPeminjaman.buku}`

      playSound(audioRef)
      toast(title, {
        description: deskripsi,
        action: {
          label: "Lihat",
          onClick: () =>
            (window.location.href = detailURL),
        }
      })
    });

    socketRef.current.on('PERPANJANGAN_DITERIMA', (response) => {
      const {tipe, data, title, deskripsi} = response

      const detailURL = `/my/${tipe.toLowerCase()}/${data._id}/${data.idBuku}`

      toast(title, {
        description: deskripsi,
        action: {
          label: "Lihat",
          onClick: () =>
            (window.location.href = detailURL),
        }
      })
    });

    socketRef.current.on('PERPANJANGAN_DITOLAK', (response) => {
      const {tipe, data, title, deskripsi} = response

      const detailURL = `/my/${tipe.toLowerCase()}/${data._id}/${data.idBuku}`
      
      toast(title, {
        description: deskripsi,
        action: {
          label: "Lihat",
          onClick: () =>
            (window.location.href = detailURL),
        }
      })
    });
    
    socketRef.current.on("PENGEMBALIAN_PEMINJAMAN", (response) => {
      const {tipe, data, title, deskripsi} = response
      
      const detailURL = `/my/${tipe.toLowerCase()}/${data._id}/${data.idBuku}`
      
      toast(title, {
        description: deskripsi,
        duration: 10000,
        action: {
          label: 'Lihat',
          onClick: () => {
            (window.location.href = detailURL)
          }
        }
      })
    })

    socketRef.current.on('connect', () => {
      return
    });
    socketRef.current.on('disconnect', () => {
      return
    });
    // Cleanup saat komponen unmount
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

const playSound = (audioRef: any) => {
  if (audioRef.current) {
      audioRef.current.currentTime = 0; // restart dari awal
      audioRef.current.load();          // pastikan ke-load
      audioRef.current.play().catch((err: any) => {
      console.error("Error play sound:", err);
    });
  }
}

export default DashboardLayout