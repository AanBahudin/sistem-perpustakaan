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
import { createPustakawanValidator } from '../../validator/adminValidator'
import { createAdminValidator } from '../../validator/adminValidator'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'

const router = express.Router()

router.route('/create/admin')
    .post(createAdminValidator, createAdministrator)

router.route('/create/pustakawan')
    .post(createPustakawanValidator, createPustakawan)

router.route('/pustakawan')
    .get(getAllPustakawan)

router.route('/pustakawan/:id')
    .get(mongooseIdMiddleware, getSinglePustakawan)

router.route('/pengguna')
    .get(getAllUsers)

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

export default router