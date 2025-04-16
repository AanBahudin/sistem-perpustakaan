import express from 'express'
import { hapusDurasi, semuaDurasi, tambahDurasi } from '../../controllers/durasi/durasiController'
import { pustakawanMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'
import { durasiInputValidator } from '../../validator/durasiValidator'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'

const router = express.Router()

router.route('/')
    .get(semuaDurasi)
    .post(pustakawanMiddlewareAuthorized, durasiInputValidator, tambahDurasi)

router.route('/:id')
    .delete(pustakawanMiddlewareAuthorized, mongooseIdMiddleware, hapusDurasi)


export default router