import { BadRequestError } from "../errors/errorHandler";
import withValidationErrors from "./withValidationErrors";
import formatPhoneNumber from "../utils/formatPhoneNumber";
import { body } from "express-validator";

export const createAdminValidator = withValidationErrors([
    body('nama')
        .notEmpty().withMessage('Nama tidak boleh kosong')
        .isLength({min: 3, max: 50}).withMessage('nama 3 - 50 karakter'),
    body('email')
        .notEmpty().withMessage('Email tidak boleh kosong')
        .isEmail().withMessage('Format email salah'),
    body('password')
        .notEmpty().withMessage('Password tidak boleh kosong')
        .isLength({min: 6, max: 25}).withMessage('Password harus 6-25 karakter'),
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

export const createPustakawanValidator = withValidationErrors([
    body('nama')
        .notEmpty().withMessage('Nama tidak boleh kosong')
        .isLength({min: 3, max: 50}).withMessage('Nama harus 3 sampai 50 karakter'),
    body('email')
        .notEmpty().withMessage('Email tidak boleh kosong')
        .isEmail().withMessage('Format email tidak benar'),
    body('password')
        .notEmpty().withMessage('Password tidak boleh kosong')
        .isLength({min : 6, max: 25}).withMessage('password harus 6 - 25 karakter'),
    body('no_hp')
        .notEmpty().withMessage('Nomor hp tidak boleh kosong')
        .customSanitizer((no_hp) => {
            if (no_hp && no_hp.startsWith('08')) {
                const formatted = formatPhoneNumber(no_hp)
                return formatted
            }
            return no_hp
        })
])

export const createPenggunaValidator = withValidationErrors([
    body('nama')
        .notEmpty().withMessage('Nama tidak boleh kosong')
        .isLength({min: 3, max: 100}).withMessage('Nama 3 - 100 karakter'),
    body('idKampus')
        .notEmpty().withMessage('NIM atau NIDN tidak boleh kosong'),
    body('jurusan')
        .notEmpty().withMessage('Jurusan tidak boleh kosong'),
    body('angkatan')
        .notEmpty().withMessage('Angkatan tidak boleh ksoong'),
    body('email')
        .notEmpty().withMessage('Email tidak boleh kosong')
        .isEmail().withMessage('Format email tidak didukung'),
    body('no_hp')
        .notEmpty().withMessage('Nomor telepon tidak boleh kosong')
        .isLength({min: 11, max: 12}).withMessage('Nomor telepon 11 - 12 karakter')
        .customSanitizer((noHP : string) => {
            if (!noHP.startsWith('8')) {
                throw new BadRequestError('Nomor telepon harus diawali dengan 8')
            }
        }),
    body('password')
        .notEmpty().withMessage('Password tidak boleh kosong')
        .isLength({min: 8, max: 25}).withMessage('Password 8 - 25 karakter'),
    body('role')
        .notEmpty().withMessage('Jenis pengguna tidak boleh kosong')
        .isIn(['Dosen', 'Mahasiswa']),
])