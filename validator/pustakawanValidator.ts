import { BadRequestError } from "../errors/errorHandler";
import Pustakawan from "../model/Pustakawan";
import formatPhoneNumber from "../utils/formatPhoneNumber";
import withValidationErrors from "./withValidationErrors";
import { NotFoundError } from "../errors/errorHandler";
import { body } from "express-validator";

export const createPustakawanValidator = withValidationErrors([
    body('nama')
        .notEmpty()
        .withMessage('Nama tidak boleh kosong')
        .isLength({min: 3, max: 50})
        .withMessage('Nama harus 3 sampai 50 karakter'),
    body('email')
        .notEmpty()
        .withMessage('Email tidak boleh kosong')
        .isEmail()
        .withMessage('Format email tidak benar')
        .custom(async(email) => {
            const isEmailExist = await Pustakawan.findOne({email})
            if (isEmailExist) {
                throw new BadRequestError('Email sudah digunakan')
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('Password tidak boleh kosong')
        .isLength({min : 6, max: 15})
        .withMessage('password harus 6 - 15 karakter'),
    body('no_hp')
        .customSanitizer((no_hp) => {
            if (no_hp && no_hp.startsWith('08')) {
                const formatted = formatPhoneNumber(no_hp)
                return formatted
            }
            return no_hp
        })
    ,
])