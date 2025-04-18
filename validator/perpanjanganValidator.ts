import { BadRequestError, NotAuthorized, NotFoundError } from "../errors/errorHandler";
import { Request } from "express";
import Buku from "../model/Buku";
import DurasiPeminjaman from "../model/DurasiPeminjaman";
import Peminjaman from "../model/Peminjaman";
import Perpanjangan from "../model/Perpanjangan";
import { isValidMongooseId } from "../utils/checker";
import withValidationErrors from "./withValidationErrors";
import { body, param } from "express-validator";


export const perpanjanganInputValidator = withValidationErrors([
    body('idPeminjaman')
        .notEmpty().withMessage('Id Peminjaman tidak boleh kosong')
        .custom(async(idPeminjaman) => {
            isValidMongooseId(idPeminjaman)

            const isPeminjamanExist = await Peminjaman.findOne({_id: idPeminjaman})
            if (!isPeminjamanExist) {
                throw new NotFoundError('Data peminjaman tidak ditemukan')
            }

            const { statusPeminjaman, disetujui, diprosesOleh } = isPeminjamanExist
            if (statusPeminjaman !== "Dipinjam" || !disetujui || !diprosesOleh) {
                throw new BadRequestError('Tidak bisa melakukan pengajuan')
            }
        }),
    body('idBuku')
        .notEmpty().withMessage('Id Buku tidak boleh kosong')
        .custom(async(idBuku) => {
            isValidMongooseId(idBuku)

            const isBukuExist = await Buku.findOne({_id: idBuku})
            if (!isBukuExist) {
                throw new NotFoundError('Data buku tidak ditemukan')
            }
        }),
    body('durasi')
        .notEmpty().withMessage('Durasi tidak boleh kosong')
        .isInt().withMessage('Durasi hanya boleh berupa angka')
        .toInt()
        .custom(async(durasi) => {
            const durasiTersedia = (await DurasiPeminjaman.find()).map(item => item.durasi)
            if (!durasiTersedia.includes(durasi)) {
                throw new BadRequestError('Durasi perpanjangan tidak tersedia')
            }
        }),
    body('alasan')
        .notEmpty().withMessage('Alasan perpanjangan tidak boleh kosong')
        .isString().withMessage('Alasan hanya boleh berupa string')
        .isLength({min: 10, max: 250}).withMessage('Alasan 10 - 250 karakter'),

])

export const idPerpanjanganValidator = withValidationErrors([
    param('id')
        .notEmpty().withMessage('Id tidak boleh kosong')
        .custom(async(id) => {

            // cek id mongoose
            isValidMongooseId(id)

            const isPerpanjanganExist = await Perpanjangan.findOne({_id: id})
            if (!isPerpanjanganExist) {
                throw new NotFoundError('Data Perpanjangant tidak ditemukan')
            }
        })
])

export const userValidator = withValidationErrors([
    param('id')
        .custom(async(id, {req}) => {
            const {userId} = req.user

            const perpanjangan = await Perpanjangan.findOne({_id: id})
            const {idPengguna} = perpanjangan!

            if (idPengguna.toString() !== userId) {
                throw new NotAuthorized('Tidak dapat melihat pengajuan ini')
            }
        })
])

export const editPerpanjanganInputValidator = withValidationErrors([
    param('id')
        .custom(async(id) => {
            isValidMongooseId(id)
            const perpanjangan = await Perpanjangan.findOne({_id: id})

            if (perpanjangan?.disetujui !== 'Pending' || perpanjangan.diprosesOleh) {
                throw new BadRequestError('Pengajuan perpanjangan tidak berlaku')
            }
        })
        ,
    body('durasi')
        .notEmpty().withMessage('Durasi tidak boleh kosong')
        .isInt().withMessage('Durasi hanya boleh berupa angka')
        .toInt()
        .custom(async(durasi) => {
            const durasiTersedia = await DurasiPeminjaman.find()
            
            durasiTersedia.forEach(item => {
                if (durasi !== durasi) {
                    throw new BadRequestError('Durasi perpanjangan tidak tersedia')
                }
            })
        }),
    body('alasan')
        .notEmpty().withMessage('Alasan perpanjangan tidak boleh kosong')
        .isString().withMessage('Alasan hanya boleh berupa string')
        .isLength({min: 10, max: 250}).withMessage('Alasan 10 - 250 karakter')
])

export const deletePerpanjanganValidator = withValidationErrors([
    param('id')
        .custom(async(id, {req}) => {
            const {userId} = req.user
            const perpanjangan = await Perpanjangan.findOne({_id: id, idPengguna: userId})

            if (perpanjangan?.disetujui !== 'Pending' || perpanjangan.diprosesOleh) {
                throw new BadRequestError('Perpanjangan tidak dapat dibatalkan!')
            }
        })
])

export const terimaPerpanjanganValidator = withValidationErrors([
    body("perpanjanganId")
        .notEmpty().withMessage('Id Perpanjangan tidak boleh kosong')
        .custom(async(perpanjanganId) => {
            isValidMongooseId(perpanjanganId)

            const isPerpanjanganExist = await Perpanjangan.findOne({_id: perpanjanganId})
            if (!isPerpanjanganExist) {
                throw new NotFoundError('Data Perpanjangan tidak ditemukan')
            }

            // ini yg dikerja
            const { idPeminjaman, disetujui} = isPerpanjanganExist
            if (disetujui !== 'Pending') {
                throw new BadRequestError('Data perpanjangan tidak dapat diproses')
            }

            // cari peminjaman
            const dataPeminjaman = await Peminjaman.findOne({_id: idPeminjaman})
            if (!dataPeminjaman) {
                throw new NotFoundError('Data Peminjaman tidak ditemukan')
            }

            // mencegah pustakawan menerima perpanjangan dari pinjaman yang sedang tidak dalam status 'Dipinjam'
            const { statusPeminjaman, disetujui:persetujuanPinjaman, diprosesOleh } = dataPeminjaman
            if (statusPeminjaman !== "Dipinjam" || !persetujuanPinjaman || !diprosesOleh) {
                throw new BadRequestError('Tidak bisa melakukan pengajuan')
            }
        })
    ,
    body("disetujui")
        .notEmpty().withMessage('Status pengajuan tidak tersedia')
        .isBoolean().withMessage('Status harus boolean')
        .toBoolean()
])