import mongoose from "mongoose";
import withValidationErrors from "./withValidationErrors";
import { body, param } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/errorHandler";
import Buku from "../model/Buku";
import Peminjaman from "../model/Peminjaman";


// validasi untuk req.body pada pengajuan peminjaman
export const inputPengajuanPeminjamanValidator = withValidationErrors([
    body('id')
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
    body('lamaPeminjaman')
        .notEmpty().withMessage('Durasi peminjaman tidak boleh kosong')
        .isISO8601().withMessage('Format tanggal tidak valid')
        .isDate().withMessage('Format tanggal tidak valid')
        .toDate()
        .custom((value) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // atur jam ke 00:00:00
          
            if (value < today) {
              throw new Error('Tanggal peminjaman tidak boleh di masa lalu');
            }
            return true;
          })
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

            // tolak jika data peminjaman sudah diterima
            if (isPeminjamanExist?.disetujui || isPeminjamanExist?.statusPeminjaman !== 'Diajukan') {
                throw new BadRequestError('Data peminjaman tidak berlaku')
            }

            const buku = await Buku.findOne({_id: isPeminjamanExist.buku})
            if (buku?.stok as number <= 0) {
                throw new BadRequestError('Stok buku sudah habis')
            }

            if (!buku) {
                throw new NotFoundError('Buku tidak ditemukan')
            }

            if (!isPeminjamanExist) {
                throw new NotFoundError('Data peminjaman tidak ditemukan')
            }
        }),
    body('status')
        .notEmpty().withMessage('Status penerimaan tidak boleh kosong')
        .isBoolean().withMessage('Data harus boolean')
        .toBoolean()
        
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
]);