import { body } from "express-validator";
import withValidationErrors from "./withValidationErrors";

export const durasiInputValidator = withValidationErrors([
    body('durasi')
        .notEmpty().withMessage('Durasi tidak boleh kosong')
        .isInt({min: 1}).withMessage('Durasi harus bertipe integer')
        .toInt()
])