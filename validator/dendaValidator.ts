import { body } from "express-validator";
import withValidationErrors from "./withValidationErrors";

export const createDendaValidator = withValidationErrors([
    body('denda')
        .notEmpty().withMessage('Nominal denda tidak boleh kosong')
        .isInt({min: 0}).withMessage('Nominal harus berupa angka dan dan bilangan positif')
])