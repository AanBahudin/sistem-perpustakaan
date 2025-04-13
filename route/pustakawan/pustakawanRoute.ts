import express from 'express'
import { getAllUsers, getSingleUser } from '../../controllers/prodi/prodiController'
import { 
    getAllBuku, 
    getSingleBuku,
    addBuku,
    editBuku,
    hapusBuku,
    createKategori,
    getAllKategori,
    hapusKategori,
    getProfile } from '../../controllers/pustakawan/pustakawanController'
import { verifyBukuIdMiddleware, verifyPenggunaIdMiddleware } from '../../middleware/utilsMiddleware'
import { kategoriIdValidator, kategoriInputValidator } from '../../validator/kategoriValidator'
import { bukuInputValidator } from '../../validator/bukuValidator'

const router = express.Router()

router.route('/kategori')
    .get(getAllKategori)
    .post(kategoriInputValidator, createKategori)

router.route('/kategori/:id')
    .delete(kategoriIdValidator, hapusKategori)

router.route('/buku')
    .get(getAllBuku)
    .post(bukuInputValidator, addBuku)

router.route('/buku/:id')
    .get(verifyBukuIdMiddleware, getSingleBuku)
    .delete(verifyBukuIdMiddleware, hapusBuku)
    .patch(verifyBukuIdMiddleware, bukuInputValidator, editBuku)

router.route('/users')
    .get(getAllUsers)

router.route('/users/:id')
    .get(verifyPenggunaIdMiddleware, getSingleUser)

router.route('/profile')
    .get(getProfile)

export default router