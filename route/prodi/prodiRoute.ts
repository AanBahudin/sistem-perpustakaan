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
    getSingleRequestedUser
} from '../../controllers/prodi/prodiController'
import { createPustakawanValidator } from '../../validator/pustakawanValidator'
import { createAdminValidator } from '../../validator/adminValidators'
import { verifyPenggunaIdMiddleware, verifyPustakawanIdMiddleware } from '../../middleware/utilsMiddleware'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'

const router = express.Router()

router.route('/create/admin')
    .post(createAdminValidator, createAdministrator)

router.route('/create/pustakawan')
    .post(createPustakawanValidator, createPustakawan)

router.route('/pustakawan')
    .get(getAllPustakawan)

router.route('/pustakawan/:id')
    .get(verifyPustakawanIdMiddleware, getSinglePustakawan)

router.route('/pengguna')
    .get(getAllUsers)

router.route('/pengguna/verify/:id')
    .patch(verifyPenggunaIdMiddleware, verifiedUserAccount)

router.route('/pengguna/:id')
    .get(verifyPenggunaIdMiddleware, getSingleUser)

router.route('/requested/user')
    .get(getRequestedUser)

router.route('/requested/user/:id')
    .get(mongooseIdMiddleware, getSingleRequestedUser)

router.route('/profile')
    .get(getProfile)

export default router