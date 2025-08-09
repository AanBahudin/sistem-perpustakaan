import express from 'express'
import { 
    getAllDosenUser, 
    getAllMahasiswaUser, 
    getAllPengajuan, 
    getAllPengajuanPeminjaman, 
    getAllUsers, 
    getSinglePengajuanPeminjaman, 
    getSingleUser } from '../../controllers/pustakawan/pustakawanController'
import {getProfile } from '../../controllers/pustakawan/pustakawanController'
import { verifyPenggunaIdMiddleware } from '../../middleware/utilsMiddleware'
import { getStats } from '../../controllers/pustakawan/pustakawanController'

const router = express.Router()

router.route('/users')
    .get(getAllUsers)

router.route('/dosen')
    .get(getAllDosenUser)

router.route('/mahasiswa')
    .get(getAllMahasiswaUser)

router.route('/pengajuan')
    .get(getAllPengajuan)

router.route('/peminjaman')
    .get(getAllPengajuanPeminjaman)

router.route('/peminjaman/:id')
    .get(getSinglePengajuanPeminjaman)

router.route('/stats')
    .get(getStats)

router.route('/users/:id')
    .get(verifyPenggunaIdMiddleware, getSingleUser)

router.route('/profile')
    .get(getProfile)

export default router