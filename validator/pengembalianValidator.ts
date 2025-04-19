import withValidationErrors from "./withValidationErrors";
import { body, param } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/errorHandler";
import { isValidMongooseId } from "../utils/checker";
import Peminjaman from "../model/Peminjaman";

export const dataPengembalianValidator = withValidationErrors([
    body("idPeminjaman")
        .notEmpty().withMessage('Data peminjaman tidak disediakan')
        .custom(async(idPeminjaman) => {
            isValidMongooseId(idPeminjaman)

            const dataPeminjaman = await Peminjaman.findOne({_id: idPeminjaman})
            if (!dataPeminjaman) {
                throw new NotFoundError('Data peminjaman tidak ditemukan!')
            }

            const statusDiizinkan = ['Dipinjam', 'Terlambat']
            const { statusPeminjaman } = dataPeminjaman
            if (!statusDiizinkan.includes(statusPeminjaman)) {
                throw new BadRequestError('Tidak dapat memproses pengembalian')
            }
        }),
    body('kondisiBuku')
        .notEmpty().withMessage('Kondisi buku tidak boleh kosong')
        .isIn([
            'Normal',    // Buku dalam kondisi baik
            'Rusak',     // Buku rusak secara fisik
            'Hilang',    // Buku hilang
            'Baik',      // Buku dalam kondisi fisik yang baik
            'Luntur',    // Buku dengan warna pudar
            'Kusam',     // Sampul buku yang kusam
            'Terpotong', // Buku yang terpotong sebagian
            'Kotor',     // Buku yang kotor atau bernoda
            'Tidak Lengkap' // Buku yang beberapa bagiannya hilang
        ]).withMessage('Kondisi buku tidak tersedia'),
    body('statusPengembalian')
        .notEmpty().withMessage('status pengembalian tidak boleh kosong')
        .isIn(['Pending', 'Dihilangkan']).withMessage('Status pengembalian tidak tersedia')
])

export const pengembalianIdValidator = withValidationErrors([
    param('id')
        .notEmpty().withMessage('Id pengembalian tidak ditemukan')
        .custom(async(id) => {
            isValidMongooseId(id)
        })
])