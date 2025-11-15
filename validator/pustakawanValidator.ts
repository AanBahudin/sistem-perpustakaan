import withValidationErrors from "./withValidationErrors";
import { body } from "express-validator";

export const updatePasswordValidator = withValidationErrors([
    body('passwordLama')
        .notEmpty().withMessage('Password lama tidak boleh kosong')
        .trim()
        .isLength({min: 8, max: 20}).withMessage('Password 8 - 20 karakter'),
    body('passwordBaru')
        .notEmpty().withMessage('Password baru tidak boleh kosong')
        .trim()
        .isLength({min: 8, max: 20}).withMessage('Password baru 8 - 20 karakter')
])

export const updateEmailValidator = withValidationErrors([
    body('emailLama')
        .notEmpty().withMessage('Email lama tidak boleh kosong')
        .trim()
        .isEmail().withMessage('Format email tidak valid'),
        body('emailBaru')
        .notEmpty().withMessage('Email baru tidak boleh kosong')
        .trim()
        .isEmail().withMessage('Format email tidak valid'),
])