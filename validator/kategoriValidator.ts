import { body, param } from "express-validator";
import withValidationErrors from "./withValidationErrors";
import Kategori from "../model/Kategori";
import { capitalizeWords } from "../utils/formatText";
import { BadRequestError } from "../errors/errorHandler";

export const kategoriInputValidator = withValidationErrors([
    body('kategoriBaru')
        .notEmpty().withMessage('Judul kategori tidak boleh kosong')
        .isLength({min: 2, max: 100}).withMessage('Kategori 2 - 100 karakter')
        .trim()
        .customSanitizer((kategoriBaru) => {
            return capitalizeWords(kategoriBaru)
        })
        .custom( async (kategoriBaru: string) => {
            const kategori = await Kategori.findOne({nama: kategoriBaru})
            if (kategori) throw new BadRequestError('Kategori sudah ada')
        })
])
