import express from 'express'
import {
    getAllPengembalianUser,
    getSinglePengembalianUser,
    getDataPengembalian,
    getSingleDataPengembalian,
    buatDataPengembalian,
    terimaDataPengembalian,
    editDataPengembalian
} from '../../controllers/pengembalian/pengembalianController'

import { userMiddlewareAuthorized, pustakawanMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'
import { dataPengembalianValidator, editDataPengembalianValidator } from '../../validator/pengembalianValidator'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'

const router = express.Router()

// user
router.route('/user')
    .get(userMiddlewareAuthorized, getAllPengembalianUser)

router.route('/user/:id')
    .get(userMiddlewareAuthorized, mongooseIdMiddleware, getSinglePengembalianUser)


// pustakawan
router.route('/')
    .get(pustakawanMiddlewareAuthorized, getDataPengembalian)

router.route('/create')
    .post(pustakawanMiddlewareAuthorized, dataPengembalianValidator, buatDataPengembalian)

router.route('/accept/:id')
    .post(pustakawanMiddlewareAuthorized, mongooseIdMiddleware, terimaDataPengembalian)

router.route('/:id')
    .get(pustakawanMiddlewareAuthorized, mongooseIdMiddleware, getSingleDataPengembalian)
    .patch(pustakawanMiddlewareAuthorized, mongooseIdMiddleware, editDataPengembalianValidator, editDataPengembalian)

export default router