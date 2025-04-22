import { BadRequestError, NotFoundError } from "../errors/errorHandler";
import Buku from "../model/Buku";
import DurasiPeminjaman from "../model/DurasiPeminjaman";
import Peminjaman from "../model/Peminjaman";
import { isValidMongooseId } from "../utils/checker";
import withValidationErrors from "./withValidationErrors";
import { body } from "express-validator";


export const perpanjanganInputValidator = withValidationErrors([
    body('idPeminjaman')
        .notEmpty().withMessage('Id Peminjaman tidak boleh kosong')
        .custom((idPeminjaman) => {
            return isValidMongooseId(idPeminjaman)
        }),
    body('idBuku')
        .notEmpty().withMessage('Id Buku tidak boleh kosong')
        .custom((idBuku) => {
            return isValidMongooseId(idBuku)
        }),
    body('durasi')
        .notEmpty().withMessage('Durasi tidak boleh kosong')
        .isInt().withMessage('Durasi hanya boleh berupa angka')
        .toInt(),
    body('alasan')
        .notEmpty().withMessage('Alasan perpanjangan tidak boleh kosong')
        .isString().withMessage('Alasan hanya boleh berupa string')
        .isLength({min: 10, max: 250}).withMessage('Alasan 10 - 250 karakter'),

])

export const editPerpanjanganInputValidator = withValidationErrors([
    body('durasi')
        .notEmpty().withMessage('Durasi tidak boleh kosong')
        .isInt().withMessage('Durasi hanya boleh berupa angka')
        .toInt(),
    body('alasan')
        .notEmpty().withMessage('Alasan perpanjangan tidak boleh kosong')
        .isString().withMessage('Alasan hanya boleh berupa string')
        .isLength({min: 10, max: 250}).withMessage('Alasan 10 - 250 karakter')
])

export const terimaPerpanjanganValidator = withValidationErrors([
    body("idPerpanjangan")
        .notEmpty().withMessage('Id Perpanjangan tidak boleh kosong')
        .custom(async(perpanjanganId) => {
            return isValidMongooseId(perpanjanganId)
        }),
    body("disetujui")
        .notEmpty().withMessage('Status pengajuan tidak tersedia')
        .isBoolean().withMessage('Status harus boolean')
        .toBoolean()
])