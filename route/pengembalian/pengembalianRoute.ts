import express from 'express'
import {
    getAllPengembalianUser,
    getSinglePengembalianUser,
    getDataPengembalian,
    getSingleDataPengembalian,
    buatDataPengembalian,
    terimaDataPengembalian
} from '../../controllers/pengembalian/pengembalianController'

import { userMiddlewareAuthorized, pustakawanMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'
import { dataPengembalianValidator, pengembalianIdValidator } from '../../validator/pengembalianValidator'

const router = express.Router()

// user
router.route('/user')
    .get(userMiddlewareAuthorized, getAllPengembalianUser)

router.route('/user/:id')
    .get(userMiddlewareAuthorized, pengembalianIdValidator, getSinglePengembalianUser)


// pustakawan
router.route('/')
    .get(pustakawanMiddlewareAuthorized, getDataPengembalian)

router.route('/create')
    .post(pustakawanMiddlewareAuthorized, dataPengembalianValidator, buatDataPengembalian)

router.route('/accept/:id')
    .post(pustakawanMiddlewareAuthorized, pengembalianIdValidator, terimaDataPengembalian)

router.route('/:id')
    .get(pustakawanMiddlewareAuthorized, pengembalianIdValidator, getSingleDataPengembalian)

export default router