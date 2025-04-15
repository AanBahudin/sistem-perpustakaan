import withValidationErrors from "./withValidationErrors";
import { body } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/errorHandler";
import { isValidMongooseId } from "../utils/checker";
import Peminjaman from "../model/Peminjaman";

export const pengembalianInputValidator = withValidationErrors([
    body("idPeminjaman")
        .notEmpty().withMessage('Data peminjaman tidak disediakan')
        .custom(async(idPeminjaman) => {
            isValidMongooseId(idPeminjaman)

            const dataPeminjaman = await Peminjaman.findOne({_id: idPeminjaman})
            if (!dataPeminjaman) {
                throw new NotFoundError('Data peminjaman tidak ditemukan!')
            }

            const statusDiizinkan = ['Dipinjam', 'Terlambat', 'Diajukan']
            const { statusPeminjaman } = dataPeminjaman
            if (!statusDiizinkan.includes(statusPeminjaman)) {
                throw new BadRequestError('Tidak dapat memproses pengembalian')
            }
        })
])