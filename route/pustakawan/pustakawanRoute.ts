import express from 'express'
import { getAllUsers, getSingleUser } from '../../controllers/pustakawan/pustakawanController'
import {getProfile } from '../../controllers/pustakawan/pustakawanController'
import { verifyPenggunaIdMiddleware } from '../../middleware/utilsMiddleware'
import { getStats } from '../../controllers/pustakawan/pustakawanController'

const router = express.Router()

router.route('/users')
    .get(getAllUsers)

router.route('/stats')
    .get(getStats)

router.route('/users/:id')
    .get(verifyPenggunaIdMiddleware, getSingleUser)

router.route('/profile')
    .get(getProfile)

export default router