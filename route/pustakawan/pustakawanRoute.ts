import express from 'express'
import { getAllUsers, getSingleUser } from '../../controllers/prodi/prodiController'
import {getProfile } from '../../controllers/pustakawan/pustakawanController'
import { verifyPenggunaIdMiddleware } from '../../middleware/utilsMiddleware'

const router = express.Router()

router.route('/users')
    .get(getAllUsers)

router.route('/users/:id')
    .get(verifyPenggunaIdMiddleware, getSingleUser)

router.route('/profile')
    .get(getProfile)

export default router