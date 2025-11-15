import withValidationErrors from "./withValidationErrors";
import { body } from "express-validator";

export const updateMaksPinjamanValidator = withValidationErrors([
    body('maksimal')
        .notEmpty().withMessage('Maksimal peminjaman tidak boleh kosong')
        .isInt({min: 1}).withMessage('Nilai yang dimasukan tidak valid')
])