import { capitalizeWords } from "../utils/formatText";
import withValidationErrors from "./withValidationErrors";
import { body } from "express-validator";

export const kondisiValidator = withValidationErrors([
    body('kondisi')
        .notEmpty().withMessage('Kondisi tidak boleh kosong')
        .customSanitizer(kondisi => {
            const newText = capitalizeWords(kondisi)
            return newText
        }),
    body('denda')
        .notEmpty().withMessage('Denda tidak boleh kosong')
        .isInt({min: 1000}).withMessage('Denda tidak boleh kurang dari 1000')
        .toInt(),
    body('deskripsi')
        .notEmpty().withMessage('Deskripsi tidak boleh kosong')
        .isLength({min: 10, max: 100}).withMessage('Deskripsi 10 - 100 karakter')
])