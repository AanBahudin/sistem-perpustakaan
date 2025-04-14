import express from 'express'

import {
    getAllBukuPustakawan, 
    getSingleBukuPustakawan,
    getAllBukuUser,
    getSingleBukuUser,
    addBuku,
    editBuku,
    hapusBuku,
} from '../../controllers/buku/bukuController'
import { bukuInputValidator, verifyBukuIdValidator } from '../../validator/bukuValidator'
import { pustakawanMiddlewareAuthorized, userMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'

const router = express.Router()

router.route('/user')
    .get(userMiddlewareAuthorized, getAllBukuUser)

router.route('/user/:id')
    .get(userMiddlewareAuthorized, verifyBukuIdValidator, getSingleBukuUser)

router.route('/pustakawan')
    .get(pustakawanMiddlewareAuthorized, getAllBukuPustakawan)
    .post(pustakawanMiddlewareAuthorized, bukuInputValidator, addBuku)

router.route('/pustakawan/:id')
    .get(pustakawanMiddlewareAuthorized, verifyBukuIdValidator, getSingleBukuPustakawan)
    .delete(pustakawanMiddlewareAuthorized, verifyBukuIdValidator, hapusBuku)
    .patch(pustakawanMiddlewareAuthorized, verifyBukuIdValidator, bukuInputValidator, editBuku)


export default router