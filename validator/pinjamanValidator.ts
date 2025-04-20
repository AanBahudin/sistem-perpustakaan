import withValidationErrors from "./withValidationErrors";
import { body } from "express-validator";
import { isValidMongooseId } from "../utils/checker";
import { kondisiBuku } from "../utils/constants";
import { getDataKondisi } from "../services/kondisiServices";
import { BadRequestError } from "../errors/errorHandler";


// validasi untuk req.body pada pengajuan peminjaman

export const pengajuanPeminjamanValidator = withValidationErrors([
    body('idBuku')
        .notEmpty().withMessage('Id buku tidak boleh kosong')
        .custom((idBuku) => {
            return isValidMongooseId(idBuku)
        }),
    body('durasiPeminjaman')
        .notEmpty().withMessage('Durasi peminjaman tidak boleh kosong')
        .isInt({min: 0}).withMessage('Durasi harus angka positif')
        .toInt()
])

// validasi untuk req.body pada pembatalan peminjaman oleh user
export const inputPembatalanPeminjamanUserValidator = withValidationErrors([
    body("idPeminjaman")
        .notEmpty().withMessage('Data Peminjaman tidak ada')
        .custom(idPeminjaman => {
           return isValidMongooseId(idPeminjaman)
        })
])

// validasi untuk req.body pada pembuatan data peminjaman oleh pustakawan
export const terimaPinjamanValidator = withValidationErrors([
    body('idPeminjaman')
        .notEmpty().withMessage('ID Pinjaman tidak boleh kosong')
        .custom(async(id) => {
            return isValidMongooseId(id)
        }),
    body('statusPeminjaman')
        .notEmpty().withMessage('Status penerimaan tidak boleh kosong')
        .isBoolean().withMessage('Data harus boolean')
        .toBoolean(),
    body('kondisiBuku')
        .notEmpty().withMessage('Kondisi buku tidak boleh kosong')
        .custom(async(kondisiBuku) => {
            const {data} = await getDataKondisi()
            const dataKondisi = data.map(item => item.kondisi)
            if (!dataKondisi.includes(kondisiBuku)) throw new BadRequestError('Kondisi buku tidak tersedia')
        })
])

export const tambahPinjamanInputValidator = withValidationErrors([
    body("idBuku")
        .notEmpty().withMessage('Data buku tidak boleh kosong')
        .custom(async(id) => {
            isValidMongooseId(id)
        }),
    body("idPengguna")
        .notEmpty().withMessage('Data peminjam tidak boleh kosong')
        .custom(async(id) => {
            isValidMongooseId(id)
        }),
    body("durasiPeminjaman")
        .notEmpty().withMessage('Durasi peminjaman tidak boleh kosong')
        .isInt().withMessage('Durasi harus bertipe angka')
        .toInt(),
    body("kondisi")
        .notEmpty().withMessage('Kondisi buku tidak boleh kosong')
        .isIn(kondisiBuku).withMessage('Kondisi buku tidak tersedia'),
])
