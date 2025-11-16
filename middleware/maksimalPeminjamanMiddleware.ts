import { Request, Response, NextFunction } from 'express'
import MaksPeminjaman from '../model/MaksPeminjaman'
import { getMaksimalPeminjaman } from '../services/maksimalPeminjamanServices'
import Peminjaman from '../model/Peminjaman'
import { BadRequestError } from '../errors/errorHandler'
import { mencegahBukuDiterimaBerulang } from '../utils/checker'

export const maksimalPeminjamanMiddleware = async(req: Request | any, res: Response, next: NextFunction) => {
    const { idBuku } = req.body
    const {userId} = req.user

    // ambil batas maksimal peminjaman
    const batasPeminjaman = await getMaksimalPeminjaman()
    console.log(batasPeminjaman)
    
    // for testing only
    const newBatas : number = batasPeminjaman?.maksimal || 3

    // cari data peminjaman user
    const totalPeminjamanUser = await Peminjaman.find({
        peminjam: userId, 
        $or: [
            {statusPeminjaman: 'Diajukan'},
            {statusPeminjaman: 'Dipinjam'},
            {statusPeminjaman: 'Terlambat'}
        ]
    }).countDocuments()

    if (totalPeminjamanUser >= newBatas) {
        throw new BadRequestError(`Batas peminjaman buku tidak boleh lebih dari ${newBatas}`)
    }

    const alreadyBorrowed = await mencegahBukuDiterimaBerulang(idBuku, userId)
    if (alreadyBorrowed) {
        throw new BadRequestError('Kamu masih memiliki pinjaman aktif atau sedang dalam proses ')
    }

    next()

}