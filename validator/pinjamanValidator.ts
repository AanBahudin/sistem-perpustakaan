import mongoose from "mongoose";
import withValidationErrors from "./withValidationErrors";
import { body, param } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/errorHandler";
import Buku from "../model/Buku";
import getDurasiPeminjaman from '../services/durasiServices'
import Peminjaman from "../model/Peminjaman";
import { isValidMongooseId } from "../utils/checker";
import Pengguna from "../model/Pengguna";
import { kondisiBuku } from "../utils/constants";


// validasi untuk req.body pada pengajuan peminjaman
export const inputPengajuanPeminjamanValidator = withValidationErrors([
    body('idBuku')
        .notEmpty().withMessage('Id Buku tidak boleh kosong')
        .custom(async(id) => {
            const isValidId = mongoose.Types.ObjectId.isValid(id)
            if (!isValidId) {
                throw new BadRequestError('ID Buku tidak valid')
            }

            const isBukuExists = await Buku.findOne({_id: id})
            if (!isBukuExists) {
                throw new NotFoundError('Buku yang anda pinjma tidak tersedia')
            } else if (isBukuExists.stok <= 0) {
                throw new BadRequestError('Buku telah habis')
            } else if (isBukuExists.status === 'Tidak Tersedia') {
                throw new NotFoundError('Buku tidak tersedia')
            }
        }),
    body('durasiPeminjaman')
        .notEmpty().withMessage('Durasi peminjaman tidak boleh kosong')
        .isInt({min: 0}).withMessage('Durasi harus berupa angka')
        .custom(async(durasiPeminjaman) => {
            const durasiTersedia = (await getDurasiPeminjaman()).map(item => {
                return item.durasi
            })

            if (!durasiTersedia.includes(durasiPeminjaman)) {
                throw new BadRequestError('Durasi peminjaman tidak tersedia')
            }

            return durasiPeminjaman;
        })
])

// validasi untuk req.body pada pembatalan peminjaman oleh user
export const inputPembatalanPeminjamanUserValidator = withValidationErrors([
    body("idPeminjaman")
        .notEmpty().withMessage('Data Peminjaman tidak ada')
        .custom(idPeminjaman => {
            isValidMongooseId(idPeminjaman)
        })
])


export const idPinjamanValidator = withValidationErrors([
    param('id')
        .notEmpty().withMessage('Parameter tidak boleh kosong')
        .custom(async(id) => {
            const isValidId = mongoose.Types.ObjectId.isValid(id)
            if (!isValidId) {
                throw new BadRequestError('Id Peminjaman tidak valid')
            }

            const pinjaman = await Peminjaman.findOne({_id: id})
            if (!pinjaman) {
                throw new NotFoundError('Data pemiinjaman tidak ditemuka')
            }
        })
])

// validasi untuk req.body pada pembuatan data peminjaman oleh pustakawan
export const tambahPinjamanInputValidator = withValidationErrors([
    body("idBuku")
        .notEmpty().withMessage('Data buku tidak boleh kosong')
        .custom(async(id) => {
            isValidMongooseId(id)

            const isBukuExist = await Buku.findOne({_id: id})
            if (!isBukuExist) {
                throw new NotFoundError('Data buku tidak ditemukan!')
            }
        }),
    body("idPengguna")
        .notEmpty().withMessage('Data peminjam tidak boleh kosong')
        .custom(async(id) => {
            isValidMongooseId(id)

            const isPenggunaExist = await Pengguna.findOne({_id: id})
            if (!isPenggunaExist) {
                throw new NotFoundError('Pengguna tidak ditemukan !')
            }
        }),
    body("durasiPeminjaman")
        .notEmpty().withMessage('Durasi peminjaman tidak boleh kosong')
        .isInt().withMessage('Durasi harus bertipe angka')
        .toInt()
        .custom(async(durasi) => {
            const durasiPeminjaman = (await getDurasiPeminjaman()).map(item => item.durasi)

            if (!durasiPeminjaman.includes(durasi)) {
                throw new BadRequestError('Durasi tidak tersedia')
            }
        }),
    body("kondisi")
        .notEmpty().withMessage('Kondisi buku tidak boleh kosong')
        .isIn(kondisiBuku).withMessage('Kondisi buku tidak tersedia'),
])

export const terimaPinjamanValidator = withValidationErrors([
    body('id')
        .notEmpty().withMessage('ID Pinjaman tidak boleh kosong')
        .custom(async(id) => {
            const isValidId = mongoose.Types.ObjectId.isValid(id)
            if (!isValidId) {
                throw new BadRequestError('Id Pinjaman tidak valid')
            }

            const isPeminjamanExist = await Peminjaman.findOne({_id: id})

            if (!isPeminjamanExist) {
                throw new NotFoundError('Data peminjaman tidak ditemukan')
            }

            // tolak jika data peminjaman sudah diterima
            if (isPeminjamanExist.disetujui || isPeminjamanExist.statusPeminjaman !== 'Diajukan' || isPeminjamanExist.berakhirPada) {
                throw new BadRequestError('Data peminjaman tidak berlaku')
            }

            const buku = await Buku.findOne({_id: isPeminjamanExist.buku})
            if (buku?.stok as number <= 0) {
                throw new BadRequestError('Stok buku sudah habis')
            }

            if (!buku) {
                throw new NotFoundError('Buku tidak ditemukan')
            }
        }),
    body('statusPeminjaman')
        .notEmpty().withMessage('Status penerimaan tidak boleh kosong')
        .isBoolean().withMessage('Data harus boolean')
        .toBoolean()
        
])