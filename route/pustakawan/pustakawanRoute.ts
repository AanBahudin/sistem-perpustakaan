import express from 'express'
import { 
    getAllDosenUser, 
    getAllMahasiswaUser, 
    getAllPengajuan, 
    getAllPengajuanPeminjaman, 
    getAllPengajuanPengembalian, 
    getAllPengajuanPerpanjangan, 
    getAllUsers, 
    getSinglePengajuanPeminjaman, 
    getSinglePengajuanPengembalian, 
    getSinglePengajuanPerpanjangan, 
    getSingleUser, 
    updateEmailPustakawan, 
    updatePasswordPustakawan} from '../../controllers/pustakawan/pustakawanController'
import {getProfile } from '../../controllers/pustakawan/pustakawanController'
import { verifyPenggunaIdMiddleware } from '../../middleware/utilsMiddleware'
import { getStats } from '../../controllers/pustakawan/pustakawanController'
import { updateEmailValidator, updatePasswordValidator } from '../../validator/pustakawanValidator'

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

router.route('/perpanjangan')
    .get(getAllPengajuanPerpanjangan)

router.route('/perpanjangan/:id')
    .get(getSinglePengajuanPerpanjangan)

router.route('/pengembalian')
    .get(getAllPengajuanPengembalian)

router.route('/pengembalian/:id')
    .get(getSinglePengajuanPengembalian)

router.route('/stats')
    .get(getStats)

router.route('/users/:id')
    .get(verifyPenggunaIdMiddleware, getSingleUser)

router.route('/profile')
    .get(getProfile)

router.route('/auth/password')
    .post(updatePasswordValidator, updatePasswordPustakawan)

router.route('/auth/email')
    .post(updateEmailValidator, updateEmailPustakawan)

export default router