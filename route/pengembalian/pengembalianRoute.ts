import express from 'express'
import {
    getAllPengembalianUser,
    getSinglePengembalianUser,
    getDataPengembalian,
    getSingleDataPengembalian,
    terimaPengembalian
} from '../../controllers/pengembalian/pengembalianController'

import { userMiddlewareAuthorized, pustakawanMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'
import { pengembalianInputValidator } from '../../validator/pengembalianValidators'

const router = express.Router()

// user
router.route('/user')
    .get(userMiddlewareAuthorized, getAllPengembalianUser)

router.route('/user/:id')
    .get(userMiddlewareAuthorized, getSinglePengembalianUser)


// pustakawan
router.route('/')
    .get(pustakawanMiddlewareAuthorized, getDataPengembalian)

router.route('/accept')
    .post(pustakawanMiddlewareAuthorized, pengembalianInputValidator, terimaPengembalian)

router.route('/:id')
    .get(pustakawanMiddlewareAuthorized, getSingleDataPengembalian)

export default router