import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Import semua handlers
import { handlePeminjamanDitolak, handlePeminjamanDiterima } from './handlers/Pengguna/PeminjamanSockets';
import { handlePengembalianPeminjaman } from './handlers/Pengguna/PengembalianSockets'
import { handlePerpanjanganDiterima, handlePerpanjanganDitolak } from './handlers/Pengguna/PerpanjanganSockets';

export const useSocket = () => {
  const SOCKET_SERVER_URL = "http://localhost:4000";
  const socketRef = useRef<Socket | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate(); // Untuk navigasi SPA

  useEffect(() => {
    // Siapkan audio sekali
    audioRef.current = new Audio("/sound/notication.wav"); // Fix typo: "notication" -> "notification" jika nama file benar

    // Inisialisasi socket hanya sekali
    socketRef.current = io(SOCKET_SERVER_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    const socket = socketRef.current;

    // Event connect/disconnect (opsional: tambah feedback)
    socket.on('connect', () => { return });
    socket.on('disconnect', () => { return });


    // PEMINJAMAN HANDLERS
    socket.on('PEMINJAMAN_DITOLAK', (data) => handlePeminjamanDitolak(data, navigate, toast));
    socket.on('PEMINJAMAN_DITERIMA', (data) => handlePeminjamanDiterima(data, navigate, toast));
   
    // PERPANJANGAN HANDLERS
    socket.on('PERPANJANGAN_DITERIMA', (response) => handlePerpanjanganDiterima(response, navigate, toast));
    socket.on('PERPANJANGAN_DITOLAK', (response) => handlePerpanjanganDitolak(response, navigate, toast) );

    // PENGEMBALIAN HANDLERS
    socket.on('PENGEMBALIAN_PEMINJAMAN', (response) => handlePengembalianPeminjaman(response, navigate, toast));

    // Cleanup saat komponen unmount
    return () => { socket.disconnect(); };
  }, [navigate]); // navigate sebagai dependency
};
