import { body, param } from "express-validator";
import mongoose from "mongoose";
import Buku from "../model/Buku";
import withValidationErrors from "./withValidationErrors";
import { capitalizeWords } from "../utils/formatText";
import Kategori from "../model/Kategori";
import { BadRequestError, NotFoundError } from "../errors/errorHandler";

export const bukuInputValidator = withValidationErrors([
    body('judul')
        .notEmpty()
        .withMessage('Judul tidak boleh kosong')
        .isLength({min: 3, max: 100})
        .withMessage('Judul 3 sampai 100 Karakter')
        .customSanitizer((judul : string) => {
            return capitalizeWords(judul)
        }),
    body('penulis')
        .optional()
        .customSanitizer((penulis) => {
            if (penulis) {
                return capitalizeWords(penulis)
            }
            return penulis
        }),
    body('penerbit')
        .optional()
        .customSanitizer((penerbit : string) => {
            if (penerbit) {
                return capitalizeWords(penerbit)
            }
            return penerbit
        }),
    body('tahunTerbit')
        .optional()
        .isLength({ min: 4, max: 4 }).withMessage('Tahun terbit harus terdiri dari 4 digit')
        .isInt({ min: 1000, max: new Date().getFullYear() })
        .withMessage('Tahun terbit tidak valid'),
    body('deskripsi')
        .notEmpty().withMessage('Deskripsi tidak boleh kosong')
        .isLength({min: 15, max: 1000}).withMessage('Deskripsi 15 - 1000 karakter'),
    body('cover')
        .optional(),
    body('ISBN')
        .notEmpty().withMessage('Kode ISBN tidak boleh kosong')
        .isLength({min: 10, max: 13}).withMessage('kode ISBN 10 - 13 karakter'),
    body('stok')
        .optional()
        .isInt({min: 0}).withMessage('Stok harus berupa angka'),
    body('kategori')
        .isArray({min: 1}).withMessage('Kategori minimal 1')
        .custom(async(kategori : string[]) => {
            const dbKategori = await Kategori.find().lean()

            const allowedKategori = dbKategori.map(item => item.nama)
            kategori.forEach(item => {
                if (!allowedKategori.includes(item)) {
                    throw new BadRequestError(`Kategori ${item} tidak tersedia`)
                }
            })
        })
        .withMessage('Kategori tidak tersedia'), 
    body('status')
        .notEmpty().withMessage('Status tidak boleh kosong')
        .isIn(['Tidak Tersedia', 'Tersedia']).withMessage('status buku tidak tersedia'),
    body('totalPinjam')
        .optional()
        .customSanitizer(() => 0),
    body('totalDilihat')
        .optional()
        .customSanitizer(() => 0),
    body('totalDisukai')
        .optional()
        .customSanitizer(() => 0),
])