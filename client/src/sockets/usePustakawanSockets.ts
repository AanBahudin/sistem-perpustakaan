import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

// Import semua handlers

export const usePustakawanSocket = () => {
  const SOCKET_SERVER_URL = "http://localhost:4000";
  const socketRef = useRef<Socket | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate(); // Untuk navigasi SPA

  useEffect(() => {
    // Siapkan audio sekali
    audioRef.current = new Audio("/sound/notication.wav");

    // Inisialisasi socket hanya sekali
    socketRef.current = io(SOCKET_SERVER_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    const socket = socketRef.current;

    // Event connect/disconnect (opsional: tambah feedback)
    socket.on('connect', () => { return });
    socket.on('disconnect', () => { return });


    

    // Cleanup saat komponen unmount
    return () => { socket.disconnect(); };
  }, [navigate]); // navigate sebagai dependency
};
