import express from 'express'
import {
    pengajuanPerpanjangan,
    getAllPerpanjangan,
    getSinglePerpanjangan,
    terimaPerpanjangan
} from '../../controllers/perpanjangan/perpanjanganController'
import { idPerpanjanganValidator } from '../../validator/peminjamanValidator'
import { pustakawanMiddlewareAuthorized, userMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'

const router = express.Router()

router.route('/')
    .get(pustakawanMiddlewareAuthorized, getAllPerpanjangan)
    .post(pengajuanPerpanjangan)

router.route('/:id')
    .get(pustakawanMiddlewareAuthorized, idPerpanjanganValidator, getSinglePerpanjangan)
    .post(pustakawanMiddlewareAuthorized, idPerpanjanganValidator, terimaPerpanjangan)

export default router