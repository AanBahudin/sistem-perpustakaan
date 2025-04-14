import express from 'express'
import { getAllUsers, getSingleUser } from '../../controllers/prodi/prodiController'
import { 

    createKategori,
    getAllKategori,
    hapusKategori,
    getProfile } from '../../controllers/pustakawan/pustakawanController'
import { verifyPenggunaIdMiddleware } from '../../middleware/utilsMiddleware'
import { kategoriIdValidator, kategoriInputValidator } from '../../validator/kategoriValidator'

const router = express.Router()

router.route('/kategori')
    .get(getAllKategori)
    .post(kategoriInputValidator, createKategori)

router.route('/kategori/:id')
    .delete(kategoriIdValidator, hapusKategori)

router.route('/users')
    .get(getAllUsers)

router.route('/users/:id')
    .get(verifyPenggunaIdMiddleware, getSingleUser)

router.route('/profile')
    .get(getProfile)

export default router