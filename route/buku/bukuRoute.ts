import express from 'express'

import {
    getAllBuku, 
    getSingleBuku,
    addBuku,
    editBuku,
    hapusBuku,
} from '../../controllers/buku/bukuController'
import { bukuInputValidator, verifyBukuIdValidator } from '../../validator/bukuValidator'
import { pustakawanMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'

const router = express.Router()

router.route('/')
    .get(getAllBuku)
    .post(pustakawanMiddlewareAuthorized, bukuInputValidator, addBuku)

router.route('/:id')
    .get(verifyBukuIdValidator, getSingleBuku)
    .delete(pustakawanMiddlewareAuthorized, verifyBukuIdValidator, hapusBuku)
    .patch(pustakawanMiddlewareAuthorized, verifyBukuIdValidator, bukuInputValidator, editBuku)


export default router