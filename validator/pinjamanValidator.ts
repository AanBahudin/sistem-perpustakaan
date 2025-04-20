import withValidationErrors from "./withValidationErrors";
import { body } from "express-validator";
import { isValidMongooseId } from "../utils/checker";
import { kondisiBuku } from "../utils/constants";


// validasi untuk req.body pada pengajuan peminjaman
export const inputPengajuanPeminjamanValidator = withValidationErrors([
    body('idBuku')
        .notEmpty().withMessage('Id Buku tidak boleh kosong')
        .custom(idBuku => {
            isValidMongooseId(idBuku)
        }),
    body('durasiPeminjaman')
        .notEmpty().withMessage('Durasi peminjaman tidak boleh kosong')
        .isInt({min: 0}).withMessage('Durasi harus berupa angka')
])

// validasi untuk req.body pada pembatalan peminjaman oleh user
export const inputPembatalanPeminjamanUserValidator = withValidationErrors([
    body("idPeminjaman")
        .notEmpty().withMessage('Data Peminjaman tidak ada')
        .custom(idPeminjaman => {
           isValidMongooseId(idPeminjaman)
        })
])

// validasi untuk req.body pada pembuatan data peminjaman oleh pustakawan
export const terimaPinjamanValidator = withValidationErrors([
    body('idPeminjaman')
        .notEmpty().withMessage('ID Pinjaman tidak boleh kosong')
        .custom(async(id) => {
            isValidMongooseId(id)
        }),
    body('statusPeminjaman')
        .notEmpty().withMessage('Status penerimaan tidak boleh kosong')
        .isBoolean().withMessage('Data harus boolean')
        .toBoolean()
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
