import { Request, Response, NextFunction } from "express";
import Pengguna, { IPengguna } from "../model/Pengguna";
import { BadRequestError, NotAuthorized, NotFoundError } from "../errors/errorHandler";
import withValidationErrors from "../validator/withValidationErrors";
import { param } from "express-validator";
import mongoose, { isValidObjectId } from "mongoose";
import Pustakawan from "../model/Pustakawan";

export const UpdateEmailPermissionMiddleware = async (req : any | Request, res : Response, next: NextFunction) => {
    const { userId } = req.user

    // cek informasi akun user
    const currentUser = await Pengguna.findOne({_id: userId}) as IPengguna

    /*
        middleware ini dibuat untuk mengecek status aktifiasi akun pengguna

        hal yang dicek : 
            status akun (harus aktif)
            verifikasiEmail (harus true)
            verifikasiProdi (harus true)
            blocked         (harus false)
    */

    const { statusAkun, verifikasiEmail, verifikasiProdi, blocked } = currentUser
    if (statusAkun !== 'Aktif') throw new NotAuthorized('Akun anda belum aktif')
    if (!verifikasiEmail) throw new NotAuthorized('Akun anda belum diverifikasi')
    if (!verifikasiProdi) throw new NotAuthorized('Akun anda belum disetujui program studi')
    if (blocked) throw new NotAuthorized('Akun anda diblokir!')

    next()
}

export const verifyPustakawanIdMiddleware = withValidationErrors([
    param('id')
        .custom(async(id) => {
            const isIdValid = mongoose.Types.ObjectId.isValid(id)
            
            if (!isIdValid) throw new BadRequestError('id pustakawan tidak valid')

            const pustakawan = await Pustakawan.findOne({_id: id})
            if (!pustakawan) throw new NotFoundError('Pustakawan tidak ditemukan')
        })
])

export const verifyPenggunaIdMiddleware = withValidationErrors([
    param('id')
        .custom(async(id) => {
            const isIdValid = mongoose.Types.ObjectId.isValid(id)
            if (!isIdValid) throw new BadRequestError('id pengguna tidak valid')

            const pustakawan = await Pengguna.findOne({_id: id})
            if (!pustakawan) throw new NotFoundError('Pengguna tidak ditemukan')
        })
])

