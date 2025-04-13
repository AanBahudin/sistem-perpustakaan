import { body, param } from "express-validator";
import withValidationErrors from "./withValidationErrors";
import Kategori from "../model/Kategori";
import { BadRequestError, NotFoundError } from "../errors/errorHandler";
import mongoose from "mongoose";

export const kategoriInputValidator = withValidationErrors([
    body('nama')
        .notEmpty().withMessage('Judul kategori tidak boleh kosong')
        .isLength({min: 3, max: 100}).withMessage('Kategori 3 - 100 karakter')
        .trim()
        .custom(async(nama) => {
            const kategoriExist = await Kategori.findOne({
                nama: { $regex: new RegExp('^' + nama + '$', 'i') }
            })

            if (kategoriExist) {
                throw new BadRequestError('Kategori sudah ada')
            }

        })
])

export const kategoriIdValidator = withValidationErrors([
    param('id')
        .custom(async(id) => {
            const isValidId = mongoose.Types.ObjectId.isValid(id)
            if (!isValidId) {
                throw new BadRequestError('ID tidak valid')
            }
            
            const kategoriExist = await Kategori.findOne({_id: id})
            if (!kategoriExist) {
                throw new NotFoundError('Kategori tidak ditemukan')
            }
        })
])