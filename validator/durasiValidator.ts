import { body, param } from "express-validator";
import withValidationErrors from "./withValidationErrors";
import { BadRequestError, NotFoundError } from "../errors/errorHandler";
import DurasiPeminjaman from "../model/DurasiPeminjaman";
import mongoose from "mongoose";

export const durasiInputValidator = withValidationErrors([
    body('durasi')
        .notEmpty().withMessage('Durasi tidak boleh kosong')
        .isInt({min: 1}).withMessage('Durasi harus bertipe integer')
        .custom(async(durasi) => {
            const isDurasiExist = await DurasiPeminjaman.findOne({durasi})
            if (isDurasiExist) {
                throw new BadRequestError('Durasi sudah ada!')
            }
        })
])

export const idDurasiValidator = withValidationErrors([
    param('id')
        .notEmpty().withMessage('Id tidak disediakan')
        .custom(async(id) => {
            const isValidId = mongoose.Types.ObjectId.isValid(id)
            if (!isValidId) {
                throw new BadRequestError('Id Durasi tidak valid')
            }

            const durasi = await DurasiPeminjaman.findOne({_id: id})
            if (!durasi) {
                throw new NotFoundError('Data durasi tidak ditemukan')
            }
        })
])