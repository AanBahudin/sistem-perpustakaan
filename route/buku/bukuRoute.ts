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
import { bukuInputValidator } from '../../validator/bukuValidator'
import { pustakawanMiddlewareAuthorized, userMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'
import mongoIdMiddleware from '../../middleware/validateMongoIdMiddleware'

const router = express.Router()

router.route('/user')
    .get(userMiddlewareAuthorized, getAllBukuUser)

router.route('/user/:id')
    .get(userMiddlewareAuthorized, mongoIdMiddleware, getSingleBukuUser)

router.route('/pustakawan')
    .get(pustakawanMiddlewareAuthorized, getAllBukuPustakawan)
    .post(pustakawanMiddlewareAuthorized, bukuInputValidator, addBuku)

router.route('/pustakawan/:id')
    .get(pustakawanMiddlewareAuthorized, mongoIdMiddleware, getSingleBukuPustakawan)
    .delete(pustakawanMiddlewareAuthorized, mongoIdMiddleware, hapusBuku)
    .patch(pustakawanMiddlewareAuthorized, mongoIdMiddleware, editBuku)


export default router