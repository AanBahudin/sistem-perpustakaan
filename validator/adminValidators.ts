import { BadRequestError } from "../errors/errorHandler";
import Prodi from "../model/Prodi";
import withValidationErrors from "./withValidationErrors";
import formatPhoneNumber from "../utils/formatPhoneNumber";
import { NotFoundError } from "../errors/errorHandler";
import { body } from "express-validator";


export const adminLoginValidator = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('Email tidak boleh kosong')
        .isEmail()
        .withMessage('Format email tidak didukung')
        .custom(async(email, {req}) => {
            const isEmailAlredyExist = await Prodi.findOne({email})
            if (!isEmailAlredyExist) {
                throw new NotFoundError('Email tidak ditemukan')
            }
            req.user = isEmailAlredyExist

        }),
    body('password')
        .notEmpty()
        .withMessage('Password tidak boleh kosong')
        .isLength({ min: 6, max: 10 })
        .withMessage('Password minimal 6 dan maksimal 10 karakter')
])

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