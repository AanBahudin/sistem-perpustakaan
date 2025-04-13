import { body } from "express-validator";
import Pengguna from "../model/Pengguna";
import { Request } from "express";
import { BadRequestError, NotFoundError } from "../errors/errorHandler";
import withValidationErrors from "./withValidationErrors";

export const loginInputValidator = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('Email tidak boleh kosong')
        .isEmail()
        .withMessage('Format email tidak didukung')
        .custom(async(email, {req}) => {
            const isEmailAlredyExist = await Pengguna.findOne({email})
            if (!isEmailAlredyExist) {
                throw new NotFoundError('Email tidak ditemukan')
            }

            if (!isEmailAlredyExist.verifikasiEmail) {
                throw new NotFoundError('Akun anda belum diverifikasi, Harap verifikasi terlebih dahulu')
            }
            req.user = isEmailAlredyExist

        }),
    body('password')
        .notEmpty()
        .withMessage('Password tidak boleh kosong')
        .isLength({ min: 6, max: 10 })
        .withMessage('Password minimal 6 dan maksimal 10 karakter')
])

export const registerInputValidator = withValidationErrors([
    body('nama')
        .notEmpty()
        .withMessage('Nama tidak boleh kosong')
        .isLength({min: 3, max: 50})
        .withMessage('Nama minimal 3 dan maksimal 50 karakter'),
    body('email')
        .notEmpty()
        .withMessage('Email tidak boleh kosong')
        .isEmail()
        .withMessage('Format email tidak didukung')
        .custom(async(email) => {
            const isEmailAlredyExist = await Pengguna.findOne({email})
            if (isEmailAlredyExist) {
                throw new BadRequestError('Email sudah digunakan')
            }
        }),
    body('nim')
        .notEmpty()
        .withMessage('id kampus tidak boleh kosong')
        .isLength({min: 8, max: 10})
        .withMessage('nim / nidn harus 8 - 10 karakter'),
    body('password')
        .notEmpty()
        .withMessage('password tidak boleh kosong')
        .isLength({min: 6, max: 20})
        .withMessage('Password minimal 6 dan maksimal 20 karakter'),
    body('role')
        .notEmpty()
        .withMessage('Jenis pengguna tidak boleh kosong')
        .isIn(['Mahasiswa', 'Dosen'])
        .withMessage('Jenis pengguna tidak tersedia')
])