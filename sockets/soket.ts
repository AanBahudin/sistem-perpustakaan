import { Server } from 'socket.io'
import * as cookie from 'cookie'
import { verifyToken } from '../utils/jwt'
import { NotFoundError } from '../errors/errorHandler'
import Pengguna from '../model/Pengguna'
import Pustakawan from '../model/Pustakawan'
import Prodi from '../model/Prodi'

let io : null | Server;

const userSockets = new Map()

export const initSocket = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true
        }
    })

    io.use(async (socket: any, next) => {
        try {
            const cookieString = socket.handshake.headers.cookie
            if (!cookieString) {
                return
            }
            
            let cookies;

            try {
                cookies = cookie.parse(cookieString)
            } catch (error) {
                return next(new Error('Cookie tidak valid'));
            }

            const token = cookies.token;
            if (!token) {
                return next(new Error('Token tidak ditemukan di cookie'));
            }

            const {userId, role} = verifyToken(token)
            if (!userId) {
                return
            }

            let userData: any;
            if (role === 'Mahasiswa' || role === 'Dosen') {
                const data = await Pengguna.findOne({_id: userId, statusAkun: 'Aktif', blocked: false, verifikasiEmail: true, verifikasiProdi: true})
                userData = data
            }

            if (role === 'Pustakawan') {
                const data = await Pustakawan.findOne({_id: userId, statusAkun: 'Aktif'})
                userData = data
            }

            if (role === 'Prodi') {
                const data = await Prodi.findOne({_id: userId, statusAkun: 'Aktif'})
                userData = data
            }


            if (!userData) {
                return
            }

            socket.userId = userId
            socket.role = role

            next()
        } catch (error) {
            return;
        }
    })

    io.on('connection', (socket: any) => {
        const userId = socket.userId

        userSockets.set(userId, socket)
        console.log(userSockets.size)
        
        socket.on("disconnect", () => {
            userSockets.delete(userId);
        });
    })
    return io
    
}


export const getIo = () => {
    if (!io) throw new Error('tidak ada koneksi socket')
        return io
}

export const notifyUser = ({userId, event, payload} : {
    userId: string, event: string, payload: Record<string, any>
}) => {

    const socket = userSockets.get(userId);

    if (socket) {
        console.log('Mengirim ke socket id:', socket.id);
        io!.to(socket.id).emit(event, payload);
    } else {
        console.log(`User  ${userId} tidak online`);
    }
}


export const notifyPustakawan = ({event, payload} : {event: string, payload: Record<string, any>}) => {
    if (!io) {
        return;
    }
    for (const [userId, socket] of userSockets.entries()) {
        if (socket.role === 'Pustakawan') {
            socket.emit(event, payload);
            console.log(`Notifikasi dikirim ke Pustakawan userId: ${userId}`);
        }
    } 
}