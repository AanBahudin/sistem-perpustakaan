import express from 'express'
import { hapusDurasi, semuaDurasi, tambahDurasi } from '../../controllers/durasi/durasiController'
import { pustakawanMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'
import { durasiInputValidator, idDurasiValidator } from '../../validator/durasiValidator'

const router = express.Router()

router.route('/')
    .get(semuaDurasi)
    .post(pustakawanMiddlewareAuthorized, durasiInputValidator, tambahDurasi)

router.route('/:id')
    .delete(pustakawanMiddlewareAuthorized, idDurasiValidator, hapusDurasi)


export default router