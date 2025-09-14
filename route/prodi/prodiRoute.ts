import express from 'express'
import { 
    createPustakawan, 
    createAdministrator, 
    getProfile, 
    getAllPustakawan, 
    getAllUsers, 
    getSinglePustakawan, 
    getSingleUser, 
    getRequestedUser,
    verifiedUserAccount,
    getSingleRequestedUser,
    blokirPengguna,
    bukaBlokirPengguna,
    prodiCreatePengguna,
    getAllDosen,
    getAllMahasiswa,
    getAllBlockedUser,
    nonaktifkanPustakawan,
    aktifkanPustakawan,
    statsBerandaProdi
} from '../../controllers/prodi/prodiController'
import { createPenggunaValidator, createPustakawanValidator } from '../../validator/adminValidator'
import { createAdminValidator } from '../../validator/adminValidator'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'

const router = express.Router()

router.route('/beranda/stats')
    .get(statsBerandaProdi)

router.route('/create/admin')
    .post(createAdminValidator, createAdministrator)

router.route('/create/pustakawan')
    .post(createPustakawanValidator, createPustakawan)

router.route('/create/pengguna')
    .post(createPenggunaValidator, prodiCreatePengguna)

router.route('/pustakawan')
    .get(getAllPustakawan)

router.route('/pustakawan/nonaktif/:id')
    .patch(mongooseIdMiddleware, nonaktifkanPustakawan)


router.route('/pustakawan/aktifkan/:id')
    .patch(mongooseIdMiddleware, aktifkanPustakawan)

router.route('/pustakawan/:id')
    .get(mongooseIdMiddleware, getSinglePustakawan)


router.route('/pengguna')
    .get(getAllUsers)

router.route('/dosen')
    .get(getAllDosen)

router.route('/mahasiswa')
    .get(getAllMahasiswa)

router.route('/blocked')
    .get(getAllBlockedUser)

router.route('/pengguna/verify/:id')
    .patch(mongooseIdMiddleware, verifiedUserAccount)

router.route('/pengguna/:id')
    .get(mongooseIdMiddleware, getSingleUser)

router.route('/requested/user')
    .get(getRequestedUser)

router.route('/requested/user/:id')
    .get(mongooseIdMiddleware, getSingleRequestedUser)

router.route('/profile')
    .get(getProfile)

router.route('/user/unblocked/:id')
    .patch(mongooseIdMiddleware, bukaBlokirPengguna)
    
router.route('/user/:id')
    .patch(mongooseIdMiddleware, blokirPengguna)


export default router