import { body, param } from "express-validator";
import withValidationErrors from "./withValidationErrors";

export const kategoriInputValidator = withValidationErrors([
    body('kategoriBaru')
        .notEmpty().withMessage('Judul kategori tidak boleh kosong')
        .isLength({min: 3, max: 100}).withMessage('Kategori 3 - 100 karakter')
        .trim()
])
