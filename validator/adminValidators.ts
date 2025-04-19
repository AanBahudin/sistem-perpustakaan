import { BadRequestError } from "../errors/errorHandler";
import Prodi from "../model/Prodi";
import withValidationErrors from "./withValidationErrors";
import formatPhoneNumber from "../utils/formatPhoneNumber";
import { NotFoundError } from "../errors/errorHandler";
import { body } from "express-validator";


export const createAdminValidator = withValidationErrors([
    body('nama')
        .notEmpty()
        .withMessage('Nama tidak boleh kosong')
        .isLength({min: 3, max: 50})
        .withMessage('nama 3 - 50 karakter'),
    body('email')
        .notEmpty()
        .withMessage('Email tidak boleh kosong')
        .isEmail()
        .withMessage('Format email salah')
        .custom(async(email) => {
            const isEmailExist = await Prodi.findOne({email})
            if (isEmailExist) {
                throw new BadRequestError('Email sudah digunakan')
            }
        }),
    body('noHp')
        .notEmpty().withMessage('Nomor hp tidak boleh kosong')
        .customSanitizer((noHp) => {
            if (noHp && noHp.startsWith('08')) {
                if (noHp.length !== 12) {
                    throw new BadRequestError('Nomor hp harus 12 karakter')
                }                
                const formatted = formatPhoneNumber(noHp)
                return formatted
            }
            return noHp
        }),
])