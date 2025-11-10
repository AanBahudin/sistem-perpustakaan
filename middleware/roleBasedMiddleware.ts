import { NextFunction, Response } from "express";

import Pengguna, {IPengguna} from "../model/Pengguna";
import Pustakawan from "../model/Pustakawan";
import Prodi from "../model/Prodi";
import { BadRequestError, NotAuthenticated, NotAuthorized, NotFoundError } from "../errors/errorHandler";

export const userMiddlewareAuthorized = async (req: any, res: Response, next: NextFunction) => {
    const { role, userId } = req.user

    // pengecekkan apabila role tidak sesuai dengan Mahasiswa dan Dosen
    if (role !== 'Mahasiswa' && role !== 'Dosen') {
        throw new NotAuthorized('Silahkan login terlebih dahulu')
    }

    // mencari data user terkait
    const {blocked, statusAkun, verifikasiEmail, verifikasiProdi} = await Pengguna.findOne({_id: userId}) as IPengguna
    
    // pengecekkan status akun
    if (statusAkun !== 'Aktif') {
        throw new BadRequestError('Akun anda belum diverifikasi')
    }

    // pengecekkan status ACC prodi
    if (!verifikasiProdi) {
        throw new BadRequestError('Harap menunggu aktivasi dari program studi')
    }
    
    // pengecekkan apabila akun telah diblokir
    if (blocked) {
        throw new NotAuthenticated('Akun anda diblokir oleh program studi')
    }

    next()
}

export const pustakawanMiddlewareAuthorized = async (req: any | Request, res: Response, next: NextFunction) => {
    const { role, userId } = req.user

    // pengecekkan apa bila role tidak sesuai dengan Pustakawan
    if (role !== 'Pustakawan') {
        throw new NotAuthorized('Not authorized to access this route')
    }

    // pengecekkan ulang pustakawan ke database
    const pustakawan = await Pustakawan.findOne({_id: userId})
    if (!pustakawan) {
            throw new NotFoundError('Pengguna tidak ditemukan!')
    }

    next()
}

export const prodiMiddlewareAuthorized = async (req: any | Request, res: Response, next: NextFunction) => {
    const { role, userId } = req.user

    // pengecekkan apabila role tidak sesuai dengan Prodi
    if (role !== 'Prodi') {
        throw new NotAuthorized('Not authorized to access this route')
    }

    // pengecekkan ulang administrator ke database
    const prodi = await Prodi.findOne({_id: userId})
    if (!prodi) {
        throw new NotFoundError('Pengguna tidak ditemukan!')
    }

    next()
}