import withValidationErrors from "./withValidationErrors";
import { body, param } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/errorHandler";
import { isValidMongooseId } from "../utils/checker";
import Peminjaman from "../model/Peminjaman";
import { getDataKondisi } from "../services/kondisiServices";

export const dataPengembalianValidator = withValidationErrors([
    body("idPeminjaman")
        .notEmpty().withMessage('Data peminjaman tidak disediakan')
        .custom(idPeminjaman => {
            return isValidMongooseId(idPeminjaman)
        }),
    body('kondisiBuku')
        .optional()
        .custom(async(kondisiBuku) => {
            const {data} = await getDataKondisi()
            const dataKondisi = data.map(item => item.kondisi)

            if (!dataKondisi.includes(kondisiBuku)) throw new BadRequestError('Kondisi tidak tersedia')
        }),
    body('statusHilang')
        .optional()
        .toBoolean()
        .isBoolean().withMessage('Data harus berupa boolean'),
    body('catatan')
        .optional()
])

export const editDataPengembalianValidator = withValidationErrors([
    body('kondisiBuku')
        .notEmpty().withMessage('Kondisi buku tidak boleh kosong')
        .custom(async(kondisiBuku) => {
            const {data} = await getDataKondisi()
            const dataKondisi = data.map(item => item.kondisi)
            if (!dataKondisi.includes(kondisiBuku)) throw new BadRequestError('Kondisi tidak tersedia')
        }),
    body('statusHilang')
        .notEmpty().withMessage('status kehilangan tidak boleh kosong')
        .toBoolean()
        .isBoolean().withMessage('Data harus berupa boolean')
])