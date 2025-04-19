import { BadRequestError } from "../errors/errorHandler";
import Pengguna from "../model/Pengguna";
import formatPhoneNumber from "../utils/formatPhoneNumber";
import withValidationErrors from "./withValidationErrors";
import { body } from "express-validator";


export const validateUpdateInputPengguna = withValidationErrors([
    body('kelas')
        .notEmpty()
        .withMessage('Kelas tidak boleh kosong'),
    body('no_hp')
        .customSanitizer((no_hp : string | null) => {
            if (no_hp && no_hp.startsWith('08')) {

                if (no_hp.length !== 12) {
                    throw new BadRequestError('Nomor hp harus 12 karakter')
                }
                
                const formatted = formatPhoneNumber(no_hp)
                return formatted
            }

            return no_hp
        }),
])

export const validateUpdateEmailPengguna = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('Alamat email tidak boleh kosong')
        .isEmail()
        .withMessage('Format email tidak didukung')
        .custom(async(email, {req}) => {
            const user = await Pengguna.findOne({ email })
            /*
                jika user yang didapat dengan email baru ini, 
                memilki Id yang tidak sama sama dengan id saya. 
                maka email ini sudah digunakan
            */
            if (user && user._id.toString() !== req.user.userId) {
                throw new BadRequestError('Email sudah digunakan')
            }

        })
])

export const validateUpdatePasswordPengguna = withValidationErrors([
    body('oldPassword')
        .notEmpty().withMessage('password lama tidak boleh kosong')
        .isLength({min: 6, max: 25}).withMessage('password 6-25 karakter'),
    body('newPassword')
    .notEmpty().withMessage('password lama tidak boleh kosong')
    .isLength({min: 6, max: 25}).withMessage('password 6-25 karakter')
])